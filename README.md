# Sabor Caseiro

A polished, responsive restaurant website created as a front-end portfolio project.

Sabor Caseiro is a fictional restaurant concept focused on refined visual design, accessible interaction and a clean, reusable front-end architecture.

## Stack

- HTML5 with semantic structure
- CSS3 with reusable design tokens, components and responsive rules
- Vanilla JavaScript (ES6+)
- Bootstrap 5.3 for layout and navigation primitives
- Font Awesome for interface icons
- WebP image assets for optimized delivery

## Architecture

The project keeps structure, presentation and behavior separate:

- `index.html` contains the semantic page structure and accessibility attributes.
- `css/styles.css` contains the public site visual system, reusable components and responsive rules.
- `css/admin.css` contains styles for the admin and login pages.
- `js/script.js` contains menu data, component rendering and interactive behavior.
- `images/` contains optimized WebP assets organized by content type.

Menu cards are generated from a single JavaScript data collection. Adding a new dish only requires adding one object to `menuItems`; the existing card component automatically supplies the same structure and styling.

## Interactive Features

- Menu category filtering
- Data-driven menu card rendering
- Gallery lightbox
- Sticky navigation with active section state
- Responsive mobile navigation
- Scroll reveal animations
- Back-to-top control
- Client-side form validation
- Reservation message generation for WhatsApp
- Automatic current year
- Reduced-motion support

## Accessibility & Performance

- Semantic HTML landmarks and headings
- Skip-navigation link
- Keyboard-friendly interactive controls
- Visible focus states
- `aria-label`, `aria-live` and `aria-pressed` states where appropriate
- `prefers-reduced-motion` support
- Lazy-loaded content images
- Asynchronous image decoding
- WebP image assets
- Hero image preload
- Responsive layouts across screen sizes
- Basic SEO and social metadata

## Project Structure

```text
sabor-caseiro/
├── index.html              # Public restaurant website
├── dish.html               # Dish details
├── admin.html              # Admin interface
├── login.html              # Admin login
├── css/
│   ├── styles.css          # Public website styles
│   └── admin.css           # Admin and login styles
├── js/
│   ├── script.js           # Public website interactions
│   ├── dish.js             # Dish details interactions
│   ├── admin.js            # Admin interactions
│   ├── recommendations-admin.js
│   └── login.js             # Login interactions
├── images/                 # WebP image assets
├── favicon/
├── backend/                # Fastify API, Prisma schema and tests
├── docker-compose.yml      # Local PostgreSQL service
└── README.md
```

## Notes

The project includes a full-stack API. The public website uses the API for menu and order operations, and reservation requests are persisted by the backend before the WhatsApp flow continues. The contact details and restaurant identity are part of the fictional portfolio concept.

## Local development

1. Copy `backend/.env.example` to `backend/.env` and replace the example values.
2. Start PostgreSQL with `docker compose up -d` from the repository root.
3. In `backend/`, install dependencies with `npm ci`.
4. Generate the Prisma client with `npm run prisma:generate`.
5. Apply the schema using the project's chosen migration workflow.
6. Build and test with `npm run build` and `npm test`.
7. Start the API with `npm run dev`.

The static frontend can be served by a local development server. Configure `CORS_ORIGIN` to match that server's origin. The current frontend API URLs target `http://localhost:3333`; deployment to another host requires an explicit API URL configuration rather than an unreviewed string replacement.

## Portfolio Context

This project was built to demonstrate practical front-end skills including semantic HTML, responsive CSS architecture, reusable UI patterns, DOM manipulation, accessibility, performance-conscious asset handling and polished interaction design.

## Full-stack backend

The project now includes a TypeScript/Fastify API backed by PostgreSQL and Prisma.

- `backend/src/` contains the API and validation logic.
- `backend/prisma/` contains the database schema.
- `docker-compose.yml` provides local PostgreSQL development.
- `POST /api/reservations` validates and persists reservation requests.
- The frontend submits reservations to the API before opening WhatsApp.

The public reservation listing endpoint is intentionally not exposed. An authenticated admin area will be implemented in the next stage.
