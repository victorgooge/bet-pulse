# BetPulse Implementation Plan

## 1. Project Summary

**BetPulse** is a second-screen sports intelligence app that helps users follow live games, track wagers, monitor odds movement, and understand how game events affect markets in real time.

This is **not** a sportsbook. It is a **sports-tech / wagering-intelligence product** built for fans and sports-betting-adjacent users who want better context, better tracking, and better live insight.

The project is designed to showcase:
- React Native mobile development
- TypeScript across the stack
- Node.js backend-for-frontend design
- SQL data modeling
- AWS/serverless architecture
- real-time data handling
- polished UI and strong product thinking
- CI/CD, testing, and maintainable engineering practices

---

## 2. Product Goal

Build a polished, production-style MVP that proves strong engineering skill and product sense in a category relevant to modern sports technology.

BetPulse should feel like:
- a live game companion
- a wagering-intelligence layer
- a second-screen mobile product
- a deployable, measurable, extensible application

---

## 3. MVP Product Scope

### Core MVP Capabilities
1. User authentication and profile setup
2. Dashboard for tracked bets and live games
3. Manual bet entry and wager tracking
4. Live game detail screen
5. Odds movement feed / chart
6. Second-screen event timeline
7. Alerts for tracked games and market changes
8. Basic exposure summary by game / team / sport

### MVP Constraints
To keep scope realistic, the MVP should:
- support **one sport first** (recommended: NBA)
- support a limited set of market types:
  - Moneyline
  - Spread
  - Total
  - 2-3 player prop categories
- start with **manual tracking** instead of sportsbook account syncing
- use one primary live data provider / API integration layer
- use simple rules-based explanations before adding AI-generated summaries

---

## 4. Target Users

### Primary User
A sports fan who follows games closely and wants a smarter way to track wagers and understand live changes.

### Secondary User
A sports-betting-adjacent user who may not even place bets regularly, but wants real-time context, market movement, and game-state intelligence.

### Early Adopter Profile
- follows NBA or NFL closely
- watches games live
- uses multiple apps/sites for sports info
- values fast, clean mobile experiences
- wants context, not just raw odds

---

## 5. User Flows

### Flow A: First-Time User
1. User signs up
2. Selects favorite sports / teams
3. Enables notifications
4. Lands on dashboard with tracked games and market feed

### Flow B: Track a Bet
1. User selects a live or upcoming game
2. Enters wager details manually
3. Bet appears in the dashboard and game detail screen
4. User receives updates as odds or game events change

### Flow C: Live Second-Screen Use
1. User opens a game detail screen while watching live
2. App shows score, game state, recent events, and tracked markets
3. App highlights changes in odds and explains what may have caused them
4. User monitors exposure and tracked positions in real time

### Flow D: Alerts
1. User sets alert preferences
2. Backend detects event or odds threshold condition
3. User receives push or in-app notification
4. Notification deep-links to game detail view

---

## 6. Proposed Tech Stack

## Frontend (Mobile)
- React Native
- TypeScript
- Expo Router or React Navigation
- React Query / TanStack Query
- Zustand or Redux Toolkit
- NativeWind or custom theming system
- Victory / Recharts equivalent for charting if needed in web admin; mobile chart library for odds graphs

## Backend
- Node.js
- TypeScript
- Fastify or Express
- Backend-for-frontend (BFF) architecture
- WebSocket or Server-Sent Events for live updates

## Database / Data Layer
- PostgreSQL
- Prisma or Drizzle ORM
- Redis for caching / live snapshot support / throttling

## Cloud / Infrastructure
- AWS API Gateway
- AWS Lambda for scheduled/event-driven jobs
- AWS RDS PostgreSQL or hosted Postgres equivalent for MVP
- AWS S3 for static assets / exports
- CloudWatch for logs and monitoring

## DevOps / Tooling
- Docker / Docker Compose
- GitHub Actions for CI/CD
- ESLint, Prettier, Husky, lint-staged
- Jest / Vitest for unit testing
- Playwright or Detox for end-to-end flows
- OpenAPI / Swagger docs

---

## 7. High-Level Architecture

```text
[React Native App]
        |
        v
[Node.js BFF API]
        |
        +--> [PostgreSQL]
        +--> [Redis Cache]
        +--> [Sports Data / Odds Provider APIs]
        +--> [Live Event Stream / Polling Workers]
        +--> [Notification Service]
        +--> [Analytics / Logging]
```

### Architecture Notes
- The **mobile app** should never talk directly to third-party data providers.
- The **BFF** will aggregate and normalize data into a mobile-friendly shape.
- Live data updates can begin with **polling + cache refresh**, then evolve into streaming / WebSocket updates.
- Alert evaluation should be separated into background jobs so the API stays responsive.

---

## 8. Monorepo / Repo Structure

Recommended structure:

```text
betpulse/
  apps/
    mobile/
    api/
  packages/
    ui/
    types/
    config/
    utils/
    eslint-config/
    tsconfig/
  infra/
    docker/
    aws/
    github-actions/
  docs/
    product/
    architecture/
    api/
  scripts/
```

### Folder Breakdown

#### `apps/mobile`
React Native client.

Contains:
- screens / routes
- components
- feature modules
- API client hooks
- local state / global state
- notification handling

#### `apps/api`
Node.js BFF.

Contains:
- route handlers
- services
- domain logic
- provider integrations
- background jobs
- auth
- analytics
- alerting

#### `packages/ui`
Shared design system pieces, reusable UI helpers, tokens, icons, and common components.

#### `packages/types`
Shared TypeScript types for API contracts, domain objects, events, and DTOs.

#### `packages/config`
Shared config utilities, environment parsing, constants, feature flags.

#### `infra/aws`
Infrastructure-as-code or environment config for serverless deployment and services.

#### `docs`
Markdown docs for product, architecture, API design, onboarding, and deployment.

---

## 9. Core Domain Model

## Main Entities
- User
- UserPreference
- Team
- League
- Game
- GameEvent
- Market
- OddsSnapshot
- TrackedBet
- BetLeg
- AlertRule
- AlertEvent
- Notification
- UserSession

---

## 10. Suggested Database Schema

### `users`
- id
- email
- password_hash
- display_name
- created_at
- updated_at

### `user_preferences`
- id
- user_id
- favorite_sports
- favorite_teams
- notification_settings
- timezone
- created_at
- updated_at

### `leagues`
- id
- name
- sport
- created_at

### `teams`
- id
- league_id
- name
- abbreviation
- city
- created_at

### `games`
- id
- external_game_id
- league_id
- home_team_id
- away_team_id
- start_time
- status
- home_score
- away_score
- period
- clock
- created_at
- updated_at

### `game_events`
- id
- game_id
- external_event_id
- event_type
- event_time
- team_id
- player_name
- description
- metadata_json
- created_at

### `markets`
- id
- game_id
- market_type
- label
- selection_a
- selection_b
- is_live
- created_at
- updated_at

### `odds_snapshots`
- id
- market_id
- price_a
- price_b
- line_value
- implied_probability_a
- implied_probability_b
- captured_at

### `tracked_bets`
- id
- user_id
- game_id
- market_id
- sportsbook_name
- stake_amount
- odds_taken
- line_taken
- selection
- status
- potential_payout
- placed_at
- created_at
- updated_at

### `bet_legs`
- id
- tracked_bet_id
- market_id
- selection
- odds_taken
- line_taken
- created_at

### `alert_rules`
- id
- user_id
- game_id
- market_id
- alert_type
- threshold_json
- is_enabled
- created_at
- updated_at

### `alert_events`
- id
- alert_rule_id
- user_id
- game_id
- market_id
- trigger_reason
- payload_json
- triggered_at

### `notifications`
- id
- user_id
- type
- title
- body
- deep_link
- delivered_at
- read_at
- created_at

---

## 11. API Design

The API should follow a **mobile-first BFF** style.

## Auth Routes
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout`
- `GET /auth/me`

## User Routes
- `GET /users/me/preferences`
- `PUT /users/me/preferences`
- `GET /users/me/dashboard`

## Games Routes
- `GET /games/live`
- `GET /games/upcoming`
- `GET /games/:gameId`
- `GET /games/:gameId/events`
- `GET /games/:gameId/markets`
- `GET /games/:gameId/odds-history`

## Bet Tracking Routes
- `GET /bets`
- `POST /bets`
- `GET /bets/:betId`
- `PUT /bets/:betId`
- `DELETE /bets/:betId`

## Alerts Routes
- `GET /alerts`
- `POST /alerts`
- `PUT /alerts/:alertId`
- `DELETE /alerts/:alertId`

## Notifications Routes
- `GET /notifications`
- `PATCH /notifications/:notificationId/read`

## Analytics / Insight Routes
- `GET /insights/exposure`
- `GET /insights/game/:gameId`
- `GET /insights/market/:marketId/movement`

## Internal / Worker Routes
- `POST /internal/sync/games`
- `POST /internal/sync/markets`
- `POST /internal/evaluate-alerts`
- `POST /internal/generate-game-summary`

---

## 12. Second Screen Sync Logic

This is the standout product feature.

### What it does
The app should correlate:
- game events
- score changes
- player trends
- market movement
- user tracked bets

Then it should generate simple insight cards like:
- "Spread moved 1.5 points in the last 6 minutes."
- "Total is trending upward after an increase in scoring pace."
- "You have 2 tracked positions affected by this scoring run."
- "This player prop is under pressure due to reduced minutes."

### MVP Implementation Strategy
Start rules-based:
- compare time-windowed odds changes
- compare scoring pace deltas
- detect major game events (injury, foul trouble, scoring run, lead change)
- map affected markets to the user’s tracked bets

### Future Upgrade
Later, generate natural-language summaries using an LLM or templated explanation engine.

---

## 13. Background Jobs / Event Processing

### Initial Jobs
- game sync job
- market sync job
- odds snapshot capture job
- alert evaluation job
- notification dispatch job

### Example Schedule
- live games: every 15-30 seconds for critical data
- pregame: every few minutes
- completed games: stop sync, archive summary

### Queue / Worker Ideas
- BullMQ + Redis
- serverless scheduled Lambda jobs
- event-driven workers for higher scale later

---

## 14. Real-Time Strategy

### MVP Approach
Use polling from the backend plus cached responses.

Why:
- simpler to build
- easier to debug
- good enough for MVP
- still demonstrates real-time product thinking

### V2 Approach
Add WebSocket or SSE layer for:
- live score updates
- odds movement push events
- in-session game event timeline updates

---

## 15. Mobile Screens

### MVP Screens
1. Splash / Auth
2. Onboarding / Preferences
3. Home Dashboard
4. Live Game Detail
5. Track Bet Form
6. Alerts & Notifications
7. Profile / Settings

### Dashboard Modules
- live tracked games
- open bets
- latest market movement
- watchlist / favorites
- recent notifications

### Game Detail Modules
- scoreboard
- key game timeline
- tracked positions
- market movement cards
- odds history chart
- second-screen explanation feed

---

## 16. UI / UX Priorities

BetPulse should feel:
- fast
- clear
- mobile-native
- trustworthy
- sports-centric but not cluttered

### UX Principles
- no overloaded sportsbook-style visual chaos
- concise, clear data hierarchy
- important information visible in 1-2 taps
- strong loading and empty states
- dark mode support
- accessible typography and contrast

---

## 17. CI/CD and Engineering Standards

## Git / Workflow
- protected main branch
- feature branches
- PR reviews
- issue-based workflow

## CI Checks
- typecheck
- lint
- unit tests
- build verification
- API contract validation

## Deployment Targets
- mobile preview builds
- API staging environment
- production deployment pipeline

## Documentation Standards
- README
- setup guide
- architecture doc
- API spec
- env variable reference
- testing guide

---

## 18. Testing Strategy

### Frontend Testing
- component tests
- screen tests
- critical user flow tests

### Backend Testing
- route tests
- service tests
- integration tests for database-backed flows
- provider mocking for sports/odds APIs

### End-to-End Testing
- register/login flow
- add tracked bet
- view live game
- create alert
- receive mock notification

---

## 19. Metrics to Track

These metrics matter both for product quality and portfolio credibility.

### Product Metrics
- users signed up
- tracked bets created
- alerts created
- notification open rate
- average session length during live games
- return rate during game days

### Engineering Metrics
- API latency
- cache hit rate
- mobile crash-free sessions
- test coverage
- build success rate
- deploy frequency

---

## 20. Monetization / Traction Ideas

### Monetization Possibilities
- premium alerts
- advanced market intelligence
- multi-game dashboards
- shareable recaps
- personalized watchlists
- subscription tier for advanced insights

### Traction Plays
- public landing page
- waitlist capture
- demo video
- launch on Product Hunt / Reddit / X
- blog posts about building live sports intelligence systems
- open-source selected packages from the monorepo

---

## 21. Build Phases

## Phase 1: Product Setup
- define brand and design direction
- initialize monorepo
- set up TypeScript, linting, formatting
- create database schema draft
- create wireframes

## Phase 2: Core Backend + Auth
- implement auth
- set up database
- scaffold BFF routes
- create game / market sync layer

## Phase 3: Mobile MVP
- auth flow
- dashboard
- game detail screen
- track bet flow
- basic alert settings

## Phase 4: Second Screen Intelligence
- live event timeline
- odds snapshot history
- simple rules-based insight cards
- exposure summaries

## Phase 5: Quality + Launch
- testing
- CI/CD
- deploy staging
- create landing page
- create demo assets

---

## 22. Immediate Next Tasks

### Product / Planning
1. Finalize app name, brand tone, and one-sentence pitch
2. Decide MVP sport: **NBA recommended**
3. Decide first market types
4. Identify likely sports/odds data sources

### Technical
5. Set up monorepo
6. Create initial database schema
7. Scaffold API routes
8. Scaffold React Native app screens
9. Define shared TypeScript types
10. Create wireframes for dashboard and game detail screen

---

## 23. Suggested First Sprint

### Sprint Goal
Have a functioning skeleton of the product with end-to-end structure in place.

### Sprint Tasks
- initialize repo
- create apps/mobile and apps/api
- set up shared packages
- configure linting / formatting / TypeScript
- create Postgres schema
- implement auth routes
- create dashboard mock screen
- create game detail mock screen
- create seed/mock live game data
- write README and setup docs

### Sprint Deliverable
A developer can clone the project, run mobile + API locally, sign in, and navigate a mocked BetPulse experience.

---

## 24. Resume / Interview Framing

BetPulse should ultimately be describable as:

> Built a cross-platform second-screen sports intelligence platform using React Native, TypeScript, Node.js, PostgreSQL, and AWS-style serverless workflows. Implemented a mobile-first BFF, real-time game and market data handling, wager tracking, odds movement analysis, and live context-aware insight delivery for sports fans.

That is the standard this project should aim for.

