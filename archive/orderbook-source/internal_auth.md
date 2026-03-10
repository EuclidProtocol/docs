# Internal Auth (Service-to-Service)

This repo uses an **internal JWT** for service-to-service calls. Tokens are **HS256** signed and validated by internal endpoints (e.g., account-service `/settle`, engine `/balances_dump`, db_service endpoints).

## Environment variables
- `INTERNAL_JWT_SECRET` (required): shared secret used to validate internal JWTs.
- `INTERNAL_JWT_TOKEN` (required for callers): a JWT signed with `INTERNAL_JWT_SECRET`.
- `INTERNAL_JWT_AUDIENCE` (optional): if set, internal JWTs must include a matching `aud` claim.
- `INTERNAL_AUTH_ALLOWED_SUBJECTS` (optional): comma-separated allowlist of `sub` values; if set, only listed callers are accepted.
- `ALLOW_INSECURE_INTERNAL_AUTH` (optional): when `true`, bypasses internal auth checks (development only).

## Required JWT claims
- `iss`: must be `"internal"`.
- `exp`: unix timestamp seconds (expiry).
- `sub`: service name (required in production; used for allowlists/audit).

Recommended:
- `iat`: issued-at timestamp.
- `jti`: unique token id.
- `aud`: when `INTERNAL_JWT_AUDIENCE` is set on the server.

## Headers accepted
- `x-internal-auth: <jwt>`
- `Authorization: Bearer <jwt>`

## Generate a token
Use the helper script:
```bash
python3 scripts/gen_internal_jwt.py --sub engine --exp-hours 168
```

### Example .env (local/testing)
```
INTERNAL_JWT_SECRET=your_shared_secret_here
INTERNAL_JWT_TOKEN=your_generated_token_here
# INTERNAL_JWT_AUDIENCE=account-service
# ALLOW_INSECURE_INTERNAL_AUTH=true
```

## Rotation guidance
- For staging/testing, you can rotate tokens on each deploy.
- For production, prefer short-lived tokens with a refresh mechanism or use a service mesh with mTLS plus internal auth.
