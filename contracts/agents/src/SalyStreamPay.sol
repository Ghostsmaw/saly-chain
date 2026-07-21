// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.24;

import { ReentrancyGuard } from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title SalyStreamPay
 * @notice L3 micropayment stream — payer deposits; recipient withdraws accrued amount by elapsed time.
 */
contract SalyStreamPay is ReentrancyGuard {
    struct Stream {
        address payer;
        address recipient;
        uint256 deposit;
        uint256 ratePerSecond;
        uint64 startTime;
        uint64 stopTime;
        uint256 withdrawn;
        bool active;
    }

    mapping(bytes32 streamId => Stream) public streams;
    uint256 public constant MIN_DURATION = 60;

    event StreamCreated(bytes32 indexed streamId, address indexed payer, address indexed recipient, uint256 deposit);
    event StreamWithdrawn(bytes32 indexed streamId, address indexed recipient, uint256 amount);
    event StreamCancelled(bytes32 indexed streamId, address indexed payer, uint256 refund);

    error ZeroId();
    error ZeroAddress();
    error InvalidDuration();
    error ZeroDeposit();
    error StreamExists(bytes32 streamId);
    error UnknownStream(bytes32 streamId);
    error InactiveStream(bytes32 streamId);
    error NotPayer(bytes32 streamId, address caller);
    error NotRecipient(bytes32 streamId, address caller);
    error NothingToWithdraw(bytes32 streamId);

    function createStream(
        bytes32 streamId,
        address recipient,
        uint64 stopTime
    ) external payable nonReentrant {
        if (streamId == bytes32(0)) revert ZeroId();
        if (recipient == address(0)) revert ZeroAddress();
        if (msg.value == 0) revert ZeroDeposit();
        if (stopTime <= block.timestamp) revert InvalidDuration();
        if (stopTime - block.timestamp < MIN_DURATION) revert InvalidDuration();
        if (streams[streamId].active) revert StreamExists(streamId);

        uint256 duration = stopTime - block.timestamp;
        uint256 rate = msg.value / duration;

        streams[streamId] = Stream({
            payer: msg.sender,
            recipient: recipient,
            deposit: msg.value,
            ratePerSecond: rate,
            startTime: uint64(block.timestamp),
            stopTime: stopTime,
            withdrawn: 0,
            active: true
        });

        emit StreamCreated(streamId, msg.sender, recipient, msg.value);
    }

    function withdraw(bytes32 streamId) external nonReentrant returns (uint256 amount) {
        Stream storage s = streams[streamId];
        if (s.deposit == 0) revert UnknownStream(streamId);
        if (s.recipient != msg.sender) revert NotRecipient(streamId, msg.sender);

        // Pull-payment: recipient withdraws accrued funds whether the stream is
        // still active or was cancelled (owed balance remains claimable).
        amount = _accrued(s) - s.withdrawn;
        if (amount == 0) revert NothingToWithdraw(streamId);

        s.withdrawn += amount;
        (bool ok,) = msg.sender.call{ value: amount }("");
        require(ok, "transfer failed");

        emit StreamWithdrawn(streamId, msg.sender, amount);
    }

    function cancel(bytes32 streamId) external nonReentrant {
        Stream storage s = _requireActive(streamId);
        if (s.payer != msg.sender) revert NotPayer(streamId, msg.sender);

        // Freeze accrual at cancel time; recipient pulls via withdraw (no push).
        if (uint64(block.timestamp) < s.stopTime) {
            s.stopTime = uint64(block.timestamp);
        }

        uint256 accrued = _accrued(s);
        uint256 owed = accrued > s.withdrawn ? accrued - s.withdrawn : 0;
        uint256 refund = s.deposit > (s.withdrawn + owed) ? s.deposit - (s.withdrawn + owed) : 0;

        s.active = false;

        if (refund > 0) {
            (bool okPayer,) = msg.sender.call{ value: refund }("");
            require(okPayer, "refund failed");
        }

        emit StreamCancelled(streamId, msg.sender, refund);
    }

    function balanceOf(bytes32 streamId) external view returns (uint256) {
        Stream storage s = streams[streamId];
        if (s.deposit == 0) revert UnknownStream(streamId);
        uint256 accrued = _accrued(s);
        return accrued > s.withdrawn ? accrued - s.withdrawn : 0;
    }

    function _accrued(Stream storage s) private view returns (uint256) {
        uint64 end = uint64(block.timestamp) < s.stopTime ? uint64(block.timestamp) : s.stopTime;
        if (end <= s.startTime) return 0;
        return uint256(end - s.startTime) * s.ratePerSecond;
    }

    function _requireActive(bytes32 streamId) private view returns (Stream storage s) {
        s = streams[streamId];
        if (s.deposit == 0) revert UnknownStream(streamId);
        if (!s.active) revert InactiveStream(streamId);
    }
}
