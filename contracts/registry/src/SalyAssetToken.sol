// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.24;

import { ERC1155 } from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title SalyAssetToken
 * @notice ERC-1155 template for fractional / serialized real-world assets across verticals.
 *
 * @dev    MINTER_ROLE holders may mint/burn; GOVERNANCE_ROLE sets base URI per class.
 */
contract SalyAssetToken is ERC1155, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant GOVERNANCE_ROLE = keccak256("GOVERNANCE_ROLE");

    mapping(uint256 id => string) private _classUri;

    event ClassUriUpdated(uint256 indexed tokenId, string uri);

    error ZeroAmount();
    error ZeroRecipient();
    error BurnNotApproved();

    constructor(address admin, string memory baseUri) ERC1155(baseUri) {
        if (admin == address(0)) revert ZeroRecipient();
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(GOVERNANCE_ROLE, admin);
        _grantRole(MINTER_ROLE, admin);
    }

    function setClassUri(uint256 tokenId, string calldata classUri) external onlyRole(GOVERNANCE_ROLE) {
        _classUri[tokenId] = classUri;
        emit ClassUriUpdated(tokenId, classUri);
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        string memory classUri = _classUri[tokenId];
        if (bytes(classUri).length > 0) return classUri;
        return super.uri(tokenId);
    }

    function mint(address to, uint256 id, uint256 amount, bytes memory data)
        external
        onlyRole(MINTER_ROLE)
    {
        if (to == address(0)) revert ZeroRecipient();
        if (amount == 0) revert ZeroAmount();
        _mint(to, id, amount, data);
    }

    function mintBatch(
        address to,
        uint256[] calldata ids,
        uint256[] calldata amounts,
        bytes memory data
    ) external onlyRole(MINTER_ROLE) {
        if (to == address(0)) revert ZeroRecipient();
        _mintBatch(to, ids, amounts, data);
    }

    /**
     * @notice Burns `amount` of `id` from `from`.
     * @dev    MINTER_ROLE is necessary but not sufficient: `from` must also have
     *         consented, either by calling this themselves or by granting the
     *         caller `setApprovalForAll` — the same operator model ERC-1155
     *         already uses for transfers. Without this check, any MINTER_ROLE
     *         holder (or a compromised minter key/service) could destroy any
     *         holder's asset tokens with no consent, e.g. for a "redemption"
     *         request the holder never made.
     */
    function burn(address from, uint256 id, uint256 amount) external onlyRole(MINTER_ROLE) {
        if (amount == 0) revert ZeroAmount();
        if (from != _msgSender() && !isApprovedForAll(from, _msgSender())) revert BurnNotApproved();
        _burn(from, id, amount);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC1155, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
