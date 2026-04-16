# BetPulse Engineering Workflow

## Purpose

This document defines how BetPulse should be built in a way that balances:

- real learning
- strong engineering ownership
- effective use of AI tools like Codex
- the ability to confidently explain the system in interviews, demos, code reviews, and collaboration

The goal is not just to finish the product.

The goal is to build BetPulse in a way that ensures Victor can say:

> I understand this system, I can explain how it works, and I personally contributed to the architecture and implementation.

---

## Core Principle

**Use AI as force multiplication, not as a replacement for engineering thinking.**

AI can help move faster, reduce repetitive work, generate drafts, and help debug. But the human developer must still own:

- the product direction
- architecture decisions
- data modeling
- API design
- feature decomposition
- implementation review
- final tradeoff decisions

Nothing should be merged into the project if it cannot be clearly explained.

---

## Ownership Standard

Before any meaningful code is kept, the developer should be able to explain:

1. what problem the code solves
2. where it fits into the system
3. how data flows through it
4. why this implementation was chosen
5. what tradeoffs were made
6. what dependencies are involved
7. what edge cases or failure modes exist
8. how it should be tested

If those questions cannot be answered clearly, the code is not truly owned yet.

---

## BetPulse Build Philosophy

BetPulse is not just a coding exercise. It is a portfolio-grade product that should demonstrate:

- mobile engineering skill
- backend and API design ability
- strong TypeScript usage
- architectural thinking
- real-time systems awareness
- product sense
- maintainability
- developer maturity

That means the build process matters just as much as the finished result.

---

## What Must Be Primarily Owned Manually

These areas should be driven directly by the developer, even if AI helps review or refine them.

### Product and system design
- problem framing
- MVP boundaries
- target user definition
- feature prioritization
- technical tradeoff decisions

### Architecture
- monorepo structure
- client/server responsibility boundaries
- BFF design
- service boundaries
- real-time update strategy
- caching strategy
- background job strategy

### Data modeling
- database schema design
- table relationships
- indexing decisions
- event/timeline modeling
- odds movement data shape

### API design
- route purpose
- request and response shapes
- validation rules
- error contracts
- auth boundaries

### Core application logic
- second-screen sync logic
- odds movement detection
- event classification
- alert rules
- feed ranking or prioritization
- state management decisions

### Important UI structure
- screen hierarchy
- navigation design
- information architecture
- major component breakdowns
- UX decisions for live game context

---

## Where AI Can Help Aggressively

AI is encouraged in the following areas, as long as the output is reviewed and understood.

### Scaffolding and boilerplate
- route scaffolds
- component shells
- config files
- environment examples
- Docker setup
- CI setup

### Repetitive engineering work
- CRUD route templates
- validation schema generation
- TypeScript type generation
- test skeletons
- mock data creation
- seed scripts

### Review and debugging support
- code review suggestions
- refactor ideas
- edge case spotting
- bug analysis
- explaining compiler or runtime errors
- finding missing branches or failure states

### Documentation support
- README drafting
- endpoint documentation
- architecture diagrams in text form
- changelog formatting
- learning note organization

AI should speed up implementation, not replace decision-making.

---

## What Should Never Be Accepted Blindly

The following should never be pasted in and kept without careful review:

- auth logic
- database migrations
- core business logic
- anything involving money or bankroll calculations
- live event processing logic
- caching or concurrency logic
- infrastructure configuration that affects deployment behavior
- dependencies added without understanding why
- large generated files spanning multiple layers of the app

These are too important to treat as black boxes.

---

## Feature Workflow

Each meaningful feature should follow this workflow.

### Step 1: Define the feature manually
Before asking AI to generate code, write down:

- feature name
- user value
- expected inputs
- expected outputs
- affected screens or endpoints
- database impact
- edge cases
- failure states

Example:

**Feature:** Track a bet on a live NBA game  
**User value:** lets the user monitor open exposure during a game  
**Inputs:** bet type, line, odds, stake, game, sportsbook, timestamp  
**Outputs:** tracked bet entry, exposure summary, game-linked timeline item  
**Edge cases:** duplicate entries, missing game mapping, invalid odds format, postponed game

### Step 2: Predict the implementation
Before AI is used, describe how the feature should probably work.

Example:

- mobile form submits bet data to API
- API validates payload
- service creates tracked bet record
- database links bet to game and user
- response returns normalized tracked bet object
- mobile invalidates bet list query and refreshes dashboard totals

This step forces engineering reasoning before implementation.

### Step 3: Use AI for a narrow task
Use Codex or another AI tool for a specific, bounded request such as:

- generate a route skeleton
- create a Zod schema
- scaffold a React Native screen
- write a SQL migration draft
- create a unit test outline

Avoid asking AI to generate entire systems at once.

### Step 4: Review line by line
Review the code carefully.

Ask:
- are names clear?
- is logic unnecessarily complex?
- is data flowing as expected?
- does the code match the architecture?
- do I understand every dependency being used?
- what would break first?

### Step 5: Rewrite or refine manually
Change the code so it matches your style and understanding.

This may include:
- renaming functions
- simplifying branches
- removing extra abstractions
- clarifying types
- splitting large functions
- adding missing guards
- changing folder placement

The goal is to turn generated code into owned code.

### Step 6: Explain it back
After the feature is working, explain it in your own words.

Use three levels:

- **30 seconds:** recruiter-level summary
- **3 minutes:** engineer-level walkthrough
- **10 minutes:** screen-share deep dive

If you cannot explain it at all three levels, more review is needed.

---

## The Ownership Checkpoint

Before merging any significant feature, confirm:

- I understand what this code does
- I know how data enters and exits the feature
- I know why it lives in these files
- I know the key tradeoffs
- I know at least one alternate approach
- I could debug this without asking AI to re-explain it to me

If not, pause and review.

---

## Recommended Prompting Strategy for Codex

### Good prompts
Good prompts are narrow, structured, and architecture-aware.

Examples:

- Create a TypeScript Express route handler for `POST /tracked-bets` using the following Zod schema and return format.
- Scaffold a React Native screen for a live game detail page with sections for score, tracked bets, and event timeline. Do not add business logic yet.
- Generate a PostgreSQL migration for a `tracked_bets` table with these fields and indexes.
- Help refactor this service function to separate validation, normalization, and persistence.

### Weak prompts
Weak prompts are broad and surrender too much ownership.

Examples:

- Build the backend for BetPulse.
- Create the whole mobile app.
- Make this production ready.
- Add all real-time functionality.

These encourage black-box output and reduce learning.

---

## Coding Session Template

For each session, follow this pattern.

### Before coding
- What am I building?
- Why does it matter?
- What files should change?
- What do I think the design is?
- What part will I do manually?
- What part can AI help with?

### During coding
- Keep AI tasks small
- Review every generated block
- Test each piece before moving on
- Update docs if the architecture changes

### After coding
- Summarize what was built
- Note what you learned
- Record any confusing parts
- Document what AI helped with
- Write down anything you still could not explain clearly

---

## Learning Log Template

Create a file like `docs/dev-log.md` or `docs/learning-log.md` and add entries like this:

```md
## Session: [date]

### What I built
- 

### What I designed myself
- 

### What AI helped with
- 

### What I changed manually after AI output
- 

### What I learned
- 

### What still feels unclear
- 

### What I should be able to explain next time
- 
```

This will help with interviews, demos, and honest self-assessment.

---

## Code Review Checklist

Use this checklist before committing or merging.

### Understanding
- Do I understand every function in this change?
- Do I understand the data flow?
- Do I understand why each dependency exists?

### Architecture
- Does this match the planned system design?
- Is responsibility placed in the correct layer?
- Is business logic leaking into the wrong layer?

### Readability
- Are names clear?
- Is the code simple enough?
- Would another engineer understand this quickly?

### Safety and correctness
- Are inputs validated?
- Are errors handled clearly?
- Are edge cases addressed?
- Is there any hidden coupling?

### Maintainability
- Is this easy to extend?
- Is anything over-engineered?
- Is any abstraction premature?

### Testing
- Is there a unit, integration, or manual test plan?
- What failure paths were verified?

---

## Explanation Standard

For every core feature in BetPulse, be prepared to explain:

### Recruiter version
A high-level summary focused on impact.

Example:

> I built a live sports intelligence feature that tracks user wagers during games and explains how major game events affect market movement.

### Engineer version
A medium-depth explanation focused on architecture.

Example:

> The mobile app calls a BFF endpoint that aggregates live game state, tracked bets, and odds snapshots. The service normalizes that data into a single game detail payload and the client caches it for fast UI updates.

### Deep-dive version
A file and logic walkthrough.

Example:

> The request hits the game detail controller, which calls the game service. The service pulls cached live game data, joins the user’s tracked bets from PostgreSQL, computes exposure summaries, and returns a timeline model that the mobile client renders in three sections.

This multi-level explanation ability is one of the clearest signs of real ownership.

---

## BetPulse-Specific Guidance

### Areas to code mostly by hand
- initial schema and migrations
- API route design
- core service logic
- second-screen explanation rules
- state/query flow in the client
- major screens and navigation structure

### Areas where AI can accelerate heavily
- repetitive route handlers
- DTO and schema scaffolds
- documentation
- tests
- storybook-style component mocks
- CI and Docker boilerplate

### Areas to move carefully on
- real-time updates
- caching
- event timelines
- odds movement calculations
- alert triggers
- synchronization between client state and live backend data

These are likely to become core talking points later.

---

## Anti-Patterns to Avoid

- shipping code you do not understand
- accepting AI abstractions that feel too clever
- adding libraries just because AI suggested them
- generating huge features all at once
- letting AI decide architecture after the architecture is already planned
- hiding confusion instead of documenting it
- prioritizing speed so much that learning drops

---

## Success Criteria for This Workflow

This workflow is working if, by the end of BetPulse, you can:

- explain the entire system confidently
- point to major features you built yourself
- describe where AI accelerated you and where you made the decisions
- modify core code without fear
- discuss tradeoffs like a real engineer
- show both finished code and genuine understanding

---

## Final Rule

**Do not aim to merely finish BetPulse. Aim to become stronger because of BetPulse.**

A finished product is great.

A finished product that you deeply understand, can defend, can extend, and can talk through confidently is far more valuable.
