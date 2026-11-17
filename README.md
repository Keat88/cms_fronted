# Connectly — Contact Management System (Frontend)

A static, responsive frontend for a contact management system. It provides separate admin and user workspaces, authentication screens, and contact/category/notes management views built with plain HTML, CSS, and JavaScript.

## Tech Stack

- HTML5, CSS3, vanilla JavaScript (ES modules)
- Bootstrap 5.3.3 and Bootstrap Icons 1.11.3 (via CDN)
- No build step or package manager required

## Project Structure

```
cms_fronted/
├── index.html                 # Admin dashboard (entry page)
├── pages/
│   ├── auth/                  # Login and registration screens
│   ├── admin/                 # Admin dashboard, users, profile, settings
│   └── user/                  # User dashboard, contacts, categories, favorites, notes, profile, settings
├── assets/
│   ├── css/                   # Global + per-page stylesheets
│   ├── js/                    # Theme, sidebar, auth, feedback modal, mock data
│   ├── images/                # Local images
│   └── svg/                   # Loading, success, and error icons
└── common/                    # Shared/placeholder resources
```

## Features

- **Admin workspace** — platform overview with statistics, registration chart, recent activity, and a registered-users table (`index.html`, `pages/admin/`).
- **User workspace** — dashboard, contacts, favorites, categories, notes, and account pages (`pages/user/`).
- **Authentication UI** — sign-in and registration forms with password visibility toggle, client-side validation, and feedback modals (`pages/auth/`).
- **Dark/light theme** — persisted in `localStorage` under `connectly-theme`; exposed via `window.ConnectlyTheme` (`assets/js/theme.js`).
- **Reusable sidebar** — shared navigation config with active-link detection (`assets/js/sidebar.js`).
- **Feedback modal** — reusable loading/success/error dialog with `show`, `loading`, `success`, `error`, `promise`, and `close` helpers (`assets/js/feedback-modal.js`).
- **Mock data** — sample contacts/categories (`assets/js/mockU.js`) and admin users (`assets/js/mockAd.js`) render the pages without a backend.
- **Responsive layout** — sidebar collapses into a Bootstrap offcanvas on small screens.

## Integration Notes

- `assets/js/api.js` is reserved for backend API calls and is currently empty.
- `assets/js/auth.js` contains token/role helper functions that are currently commented out.
- Authentication forms are a design preview only; wire them to your API when the backend is available.
- Pages currently consume mock data from `mockU.js` / `mockAd.js`; replace those imports with real API responses as needed.
