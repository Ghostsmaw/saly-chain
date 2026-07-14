// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.24;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title SalyEscrow
 * @notice Conditional ERC-20 escrow. A `payer` funds a deal addressed to a
 *         `payee`; a trusted `resolver` (SalyChain operator) decides whether
 *         to release to the payee or refund to the payer. After `deadline`
 *         anyone can trigger a refund — protects payers if the resolver is
 *         compromised or unavailable.
 *
 * @dev    Design intent (S3 starter):
 *           - Single canonical contract per (chain, token) — operators address
 *             individual deals by a 32-byte `dealId`. Off-chain (the
 *             `salychain/execution` service) is the source of truth; this contract just locks
 *             value and resolves it deterministically.
 *           - `resolver` is set at construction (the SalyChain operator key /
 *             a small multisig in prod). Rotating requires a redeploy or an
 *             upgrade path — out of scope for the starter.
 *           - No tokens minted, burnt, or rebased. The contract assumes
 *             well-behaved ERC-20 semantics (fee-on-transfer is rejected by
 *             SafeERC20 returning unexpected balances; we additionally diff
 *             balances on deposit to catch it explicitly).
 *           - Re-entrancy guarded on every state-mutating external entry.
 */
contract SalyEscrow is ReentrancyGuard {
    using SafeERC20 for IERC20;

    enum DealStatus {
        NONE, // unused — explicit zero
        FUNDED, // payer has deposited; awaiting resolution
        RELEASED, // resolver released to payee
        REFUNDED // resolver or anyone-after-deadline refunded to payer
    }

    struct Deal {
        address payer;
        address payee;
        address token;
        uint128 amount;
        uint64 deadline; // unix seconds; 0 = no deadline
        DealStatus status;
    }

    /// @notice Operator authorized to release / refund before the deadline.
    address public immutable resolver;

    /// @dev dealId is computed off-chain (typically ULID-derived) and supplied
    ///      by the caller, allowing the SalyChain backend to correlate
    ///      on-chain deals with internal transaction IDs without storing extra
    ///      state on-chain.
    mapping(bytes32 => Deal) public deals;

    event DealFunded(
        bytes32 indexed dealId,
        address indexed payer,
        address indexed payee,
        address token,
        uint128 amount,
        uint64 deadline
    );
    event DealReleased(bytes32 indexed dealId, address indexed payee, uint128 amount);
    event DealRefunded(bytes32 indexed dealId, address indexed payer, uint128 amount);

    error Escrow__InvalidResolver();
    error Escrow__InvalidParticipant();
    error Escrow__InvalidAmount();
    error Escrow__DealAlreadyExists();
    error Escrow__DealNotFunded();
    error Escrow__NotResolver();
    error Escrow__DeadlineNotPassed();
    error Escrow__FeeOnTransferUnsupported();

    modifier onlyResolver() {
        if (msg.sender != resolver) revert Escrow__NotResolver();
        _;
    }

    constructor(address _resolver) {
        if (_resolver == address(0)) revert Escrow__InvalidResolver();
        resolver = _resolver;
    }

    /**
     * @notice Lock funds against a new deal id. Caller is the payer; they
     *         must have approved this contract for at least `amount`.
     *
     * @param dealId   Off-chain-generated 32-byte identifier. MUST be unique.
     * @param payee    Address that receives funds on a successful release.
     * @param token    ERC-20 token contract.
     * @param amount   Amount in the token's minor units. Must be > 0.
     * @param deadline Unix seconds after which anyone can trigger a refund.
     *                 Pass 0 to disable the auto-refund path (resolver-only).
     */
    function fundDeal(bytes32 dealId, address payee, address token, uint128 amount, uint64 deadline)
        external
        nonReentrant
    {
        if (payee == address(0) || token == address(0)) revert Escrow__InvalidParticipant();
        if (amount == 0) revert Escrow__InvalidAmount();
        if (deals[dealId].status != DealStatus.NONE) revert Escrow__DealAlreadyExists();

        // Balance-diff guard against fee-on-transfer tokens. We refuse to deal
        // with tokens that don't credit us the full amount, because that breaks
        // the resolver's accounting assumption.
        uint256 before_ = IERC20(token).balanceOf(address(this));
        IERC20(token).safeTransferFrom(msg.sender, address(this), amount);
        uint256 received = IERC20(token).balanceOf(address(this)) - before_;
        if (received != amount) revert Escrow__FeeOnTransferUnsupported();

        deals[dealId] = Deal({
            payer: msg.sender,
            payee: payee,
            token: token,
            amount: amount,
            deadline: deadline,
            status: DealStatus.FUNDED
        });

        emit DealFunded(dealId, msg.sender, payee, token, amount, deadline);
    }

    /**
     * @notice Release the locked funds to the payee. Resolver-only.
     */
    function release(bytes32 dealId) external nonReentrant onlyResolver {
        Deal storage d = deals[dealId];
        if (d.status != DealStatus.FUNDED) revert Escrow__DealNotFunded();
        d.status = DealStatus.RELEASED;
        IERC20(d.token).safeTransfer(d.payee, d.amount);
        emit DealReleased(dealId, d.payee, d.amount);
    }

    /**
     * @notice Refund the locked funds to the payer. Callable either:
     *         - by the resolver at any time, OR
     *         - by anyone once `block.timestamp >= deadline` (and deadline > 0).
     */
    function refund(bytes32 dealId) external nonReentrant {
        Deal storage d = deals[dealId];
        if (d.status != DealStatus.FUNDED) revert Escrow__DealNotFunded();
        if (msg.sender != resolver) {
            if (d.deadline == 0 || block.timestamp < d.deadline) revert Escrow__DeadlineNotPassed();
        }
        d.status = DealStatus.REFUNDED;
        IERC20(d.token).safeTransfer(d.payer, d.amount);
        emit DealRefunded(dealId, d.payer, d.amount);
    }
}
