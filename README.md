# 🍛 Ananda — Fine Indian Cuisine Website

A fully responsive, single-page restaurant website for **Ananda**, a fictional fine-dining Indian restaurant. Built with vanilla HTML, CSS, and JavaScript — no frameworks, no dependencies.

## ✨ Features

- **Sticky Navigation** — shrinks and changes colour on scroll; hamburger menu on mobile
- **Hero Section** — full-viewport parallax background with animated floating spice particles
- **Scroll-Reveal Animations** — IntersectionObserver-powered fade/slide-in for every section
- **Interactive Menu** — dish cards with hover zoom, veg/non-veg indicators, and spice-level icons
- **Regional Cuisine** — alternating two-column layout highlighting North, South, and West Indian cuisine
- **3D Tilt Cards** — mouse-tracked CSS `rotateX/Y` perspective effect on the Experiences section
- **Gallery + Lightbox** — masonry-style grid; click any photo to open a full-screen lightbox (Esc or outside-click to close)
- **Reservation Form** — client-side validation with regex for email and phone, simulated async submission
- **Merchandise / Pantry** — add-to-cart toast notification
- **Google Maps Embed** — location section with address, hours, and phone
- **Footer** — newsletter sign-up, social links, quick links

## 🗂️ Project Structure

```
ananda-restaurant/
├── index.html          # Main HTML — all sections
├── css/
│   └── styles.css      # All styles, CSS variables, responsive breakpoints
├── js/
│   └── main.js         # All interactivity (nav, reveal, particles, tilt, lightbox, form)
├── assets/             # Place any local images here (currently using Unsplash CDN)
├── .gitignore
└── README.md
```

## 🚀 Getting Started

No build step needed — just open the file in your browser:

```bash
# Clone the repo
git clone https://github.com/<your-username>/ananda-restaurant.git
cd ananda-restaurant

# Open directly
open index.html       # macOS
start index.html      # Windows
xdg-open index.html   # Linux
```

Or serve it locally for a better experience (avoids `background-attachment: fixed` quirks on some browsers):

```bash
# Python 3
python -m http.server 8000

# Node (npx)
npx serve .
```

Then visit `http://localhost:8000`.

## 🛠️ Customisation

| What to change | Where |
|---|---|
| Restaurant name, copy | `index.html` |
| Colours, fonts | `css/styles.css` → `:root` CSS variables |
| Menu items / prices | `index.html` — Menu section |
| Google Maps location | `index.html` — `<iframe src="...">` in the Location section |
| Reservation logic (real API) | `js/main.js` → `handleReservation()` |
| Add local images | Drop files in `assets/` and update `src` attributes in `index.html` |

## 🌐 Deployment

The site is a static bundle — deploy anywhere for free:

- **GitHub Pages** — push to `main`, enable Pages in repo Settings → Pages → `/ (root)`
- **Netlify** — drag-and-drop the folder at netlify.com/drop
- **Vercel** — `npx vercel` from the project directory

## 📸 Image Credits

All photos are sourced from [Unsplash](https://unsplash.com) and used under the [Unsplash License](https://unsplash.com/license).

## 📄 License

MIT — free to use, modify, and distribute.
