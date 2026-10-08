# Hotel Booking – Playwright Test Automation

[![Playwright Tests](https://github.com/emrekrt1655/playwright-hotel-booking-tests/actions/workflows/playwright.yml/badge.svg)](https://github.com/emrekrt1655/playwright-hotel-booking-tests/actions/workflows/playwright.yml)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?logo=githubactions&logoColor=white)

End-to-end test automation for a hotel booking platform, built with **Playwright** and **TypeScript**.

The application under test is [automationintesting.online](https://automationintesting.online) (Restful Booker Platform). It is a demo hotel website built for practising test automation. It has a public booking site, an admin panel and a REST API.

The project is planned and tracked like a real QA team's work: features are broken into [GitHub Issues](https://github.com/emrekrt1655/playwright-hotel-booking-tests/issues), grouped into sprints as [milestones](https://github.com/emrekrt1655/playwright-hotel-booking-tests/milestones), and delivered through reviewed pull requests.

---

## Tech stack

| Area | Tool |
|---|---|
| Test framework | [Playwright Test](https://playwright.dev) |
| Language | TypeScript |
| Design pattern | Page Object Model (POM) |
| Configuration | `dotenv` for environment variables |
| CI/CD | GitHub Actions |
| Reporting | Playwright HTML report |

## Test coverage

| Area | Type | Scenarios | Status |
|---|---|---|---|
| Home page | UI | Smoke test: page loads, hotel info and rooms are visible | ✅ |
| Contact form | UI | Valid submission, empty form, invalid email format | ✅ |
| Admin login | UI | Valid login, wrong password, empty credentials | ✅ |
| Admin session | Setup | Log in once and reuse the session (`storageState`) | 🚧 Planned |
| Admin rooms | UI | Create and delete a room, validation errors | 🚧 Planned |
| Rooms & auth | API | Login, list rooms, create/delete room, unauthorised access | 🚧 Planned |
| Room booking | UI | Select dates, book a room, confirmation | 🚧 Planned |

## Project structure

```
.
├── .github/workflows/
│   └── playwright.yml      # CI pipeline: runs all tests on every push and PR
├── pages/                  # Page Objects: locators and actions for each page
│   ├── HomePage.ts
│   ├── ContactForm.ts
│   └── AdminLoginPage.ts
├── tests/
│   ├── ui/                 # Browser-based end-to-end tests
│   │   ├── home.spec.ts
│   │   ├── contact.spec.ts
│   │   └── admin-login.spec.ts
│   └── api/                # API tests (no browser)
├── test-data/              # Test data kept separate from test logic
│   └── contact.ts
├── .env.example            # Template for required environment variables
└── playwright.config.ts    # Base URL, browsers, retries, reporter
```

### Design decisions

- **Page Object Model:** Tests describe *what* is tested. Page Objects know *how* to interact with the page. When the UI changes, only the Page Object needs updating.
- **User-facing locators:** `getByRole`, `getByLabel` and `getByTestId` are preferred over brittle CSS/XPath selectors.
- **No hard-coded waits:** The suite relies on Playwright's auto-waiting and web-first assertions (`expect(...).toBeVisible()`) instead of `waitForTimeout`.
- **Independent tests:** Each test starts from a fresh page and creates its own data, so tests can run in any order and in parallel.
- **No secrets in code:** Credentials are read from environment variables. Locally they come from `.env`, and in CI from GitHub Secrets.

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org) 18 or newer
- npm

### Installation

```bash
git clone https://github.com/emrekrt1655/playwright-hotel-booking-tests.git
cd playwright-hotel-booking-tests
npm install
npx playwright install --with-deps chromium
```

### Environment variables

Copy the template and fill in the admin credentials. The demo credentials are published on the application's own website.

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `ADMIN_USERNAME` | Admin panel username |
| `ADMIN_PASSWORD` | Admin panel password |

`.env` is listed in `.gitignore` and must never be committed.

## Running the tests

```bash
# Run the whole suite (headless)
npm test

# Run a single file
npx playwright test tests/ui/contact.spec.ts

# Watch the browser while tests run
npx playwright test --headed

# Interactive UI mode: time-travel through each step
npx playwright test --ui

# Open the HTML report of the last run
npm run report
```

## Continuous integration

Every push and pull request to `main` triggers the [GitHub Actions workflow](.github/workflows/playwright.yml), which:

1. Installs dependencies and the Playwright browsers
2. Runs the full suite with admin credentials injected from **repository secrets**
3. Retries failed tests up to 2 times and records a trace on the first retry
4. Uploads the HTML report as a build artifact (kept for 30 days)

To view a report: **Actions** → select a run → **Artifacts** → download `playwright-report` → open `index.html`.

## Roadmap

- [x] **Sprint 1:** Project setup, Page Object structure, home page, contact form and admin login tests
- [ ] **Sprint 2:** Stronger assertions, CI secrets, reusable admin session, admin room management, first API tests
- [ ] **Sprint 3:** Room booking flow, cross-browser runs (Firefox, WebKit), HTML report published on GitHub Pages

## Author

**Your Name**: [GitHub](https://github.com/emrekrt1655) · [LinkedIn](https://www.linkedin.com/in/emrekrt16/ )
