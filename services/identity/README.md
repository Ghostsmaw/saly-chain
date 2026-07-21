# Identity Service

Consumer identity for the Saly AI surface (S4). Partners continue to use API keys; end users get JWT + agent delegations.

## Responsibilities

- User registration (`usr_*`)
- JWT access token issuance and verification
- Delegation grants linking users to agents they may operate
- JWKS endpoint for token verification metadata

## API surface

| Method | Path | Description |
|---|---|---|
| POST | `/v1/users` | Register user |
| POST | `/v1/auth/token` | Issue JWT for user (internal — requires `IDENTITY_INTERNAL_ADMIN_TOKEN`) |
| POST | `/v1/auth/verify` | Verify JWT (gateway internal) |
| GET | `/v1/.well-known/jwks.json` | JWKS metadata |
| POST | `/v1/delegations` | Grant user → agent delegation |
| GET | `/v1/delegations` | List delegations |

## Security notes

- Dev uses HS256 with `JWT_SECRET`. Production should migrate to asymmetric keys (RS256) backed by KMS.
- Delegation scopes merge with default consumer scopes at token issue time.
