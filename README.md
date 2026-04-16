# BetPulse

**BetPulse** is a real-time sports intelligence companion for live game tracking, odds movement awareness, wager tracking, and second-screen explanations.

It is **not** a sportsbook. It is a **second-screen sports-tech product** that helps users understand what is happening in a live game, how betting markets are reacting, and how their tracked wagers or exposure may be affected.

## Why this project exists

Sports fans and wagering-adjacent users often have to juggle multiple apps, tabs, and sources during live games:
- one place for scores
- another for odds
- another for tracked wagers
- another for injury/news context
- no clean place to understand *why* the market is moving

BetPulse aims to solve that by combining:
- **bet tracking**
- **live game intelligence**
- **odds movement visibility**
- **second-screen explanations**
- **event-driven alerts**

## Core product pillars

### 1. Bet Tracking
Users can manually log or simulate tracked wagers, group them by game, and monitor open exposure.

### 2. Live Game Intelligence
Users can follow live games, game-state changes, player trends, and key events that matter to the sports-tech / wagering ecosystem.

### 3. Second Screen Sync
Users get a live “what changed?” layer that explains how game events and momentum shifts may relate to market movement.

## MVP goals

The MVP focuses on:
- mobile-first experience
- NBA-first scope
- tracked bets and watchlists
- live game detail screen
- odds movement timeline
- second-screen event feed
- notifications for meaningful movement
- clear, polished, performant UI

## Tech direction

### Frontend
- React Native
- TypeScript
- Expo
- React Query
- Zustand

### Backend
- Node.js
- TypeScript
- Express
- Backend-for-Frontend (BFF) pattern
- WebSocket or Server-Sent Events for live updates

### Data + Infra
- PostgreSQL
- Redis
- Docker
- AWS API Gateway + Lambda (planned)
- GitHub Actions

## Monorepo layout

```text
BetPulse/
├── apps/
│   ├── mobile/
│   └── api/
├── packages/
│   ├── config/
│   ├── shared/
│   └── types/
├── docs/
└── .github/workflows/
```

## Getting started

This repository is currently scaffolded for planning and initial development.

### Suggested order of work
1. Finalize data model and API contracts
2. Stand up the API with health/auth/game routes
3. Stand up the mobile app shell and navigation
4. Add mock/live data ingestion layer
5. Build dashboard and game detail screens
6. Add odds movement feed and alerts
7. Add second-screen explanation engine

## Key documents

- [`docs/product-brief.md`](./docs/product-brief.md)
- [`docs/implementation-plan.md`](./docs/implementation-plan.md)
- [`docs/mvp-roadmap.md`](./docs/mvp-roadmap.md)
- [`docs/api-contracts.md`](./docs/api-contracts.md)

## Resume framing

Built a cross-platform real-time sports intelligence companion in React Native and TypeScript with a Node.js BFF, PostgreSQL, Docker, and event-driven live data flows. The product helps users track wagers, monitor odds movement, and receive second-screen explanations during live games.
