# Initial API Contracts

## Health
- `GET /health`

## Auth
- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`

## Bets
- `GET /bets`
- `POST /bets`
- `GET /bets/:id`
- `PATCH /bets/:id`
- `DELETE /bets/:id`

## Games
- `GET /games/live`
- `GET /games/:id`
- `GET /games/:id/timeline`
- `GET /games/:id/markets`

## Watchlists
- `GET /watchlist`
- `POST /watchlist`
- `DELETE /watchlist/:id`

## Alerts
- `GET /alerts`
- `POST /alerts/preferences`
