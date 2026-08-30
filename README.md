# Russel Santos — Portfolio (React + Vite + Tailwind)

A React recreation of the portfolio design: Hero, Expertise carousel, Featured Work, and a Contact form that emails you directly through Gmail — no server or database required.

## Stack

- React 19 + Vite
- Tailwind CSS v4
- [EmailJS](https://www.emailjs.com/) for the contact form (sends through your Gmail account, entirely client-side)

## 1. Install

```bash
npm install
```

## 2. Add your photo

Drop a photo at `public/profile.jpg`. Until you do, the hero shows your initials as a placeholder.

## 3. Edit your content

Everything is hardcoded in one place: `src/data/content.js` — your name, tagline, skills, projects, and social links. Edit that file, nothing else needs touching for content changes.

## Project detail pages

Each project card on the homepage now links to its own case-study page at `/projects/:id` (e.g. `/projects/bataeno-pass`), matching the "Back to Portfolio" layout with a slideshow, Challenge/Solution writeup, and tech stack card.

To add your screenshots, open `src/data/content.js` and replace the URLs in each project's `screenshots` array with the actual links to your images (e.g. hosted on Imgur, Cloudinary, or dropped in `public/` and referenced as `/your-image.png`):

```js
screenshots: [
  "/screenshots/bataeno-1.png", // <- replace with your image URL
  "/screenshots/bataeno-2.png",
  // ...
],
```

The slideshow supports:
- Prev/next arrows and dot navigation
- Left/right arrow key navigation
- A fullscreen button (native Fullscreen API) to view screenshots edge-to-edge

## 4. Wire up the contact form (Gmail via EmailJS, no backend)

Because browsers can't speak SMTP directly, sending mail from a static site needs *something* in the middle. EmailJS is the zero-backend way to do that — your form calls EmailJS's API from the browser, and EmailJS relays it through your connected Gmail account.

1. Create a free account at [emailjs.com](https://www.emailjs.com/).
2. **Email Services** → Add New Service → choose **Gmail** → connect your Gmail account.
3. **Email Templates** → Create New Template. Use variables `{{from_name}}`, `{{from_email}}`, `{{message}}` in the body (these match what the form sends).
4. **Account** → **General** → copy your **Public Key**.
5. Copy `.env.example` to `.env` and fill in the three values:

```bash
cp .env.example .env
```

```
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
```

The free EmailJS tier is enough for a portfolio contact form (200 emails/month).

## 5. Run locally

```bash
npm run dev
```

## 6. Deploy to Vercel

Push this folder to a GitHub repo, then in Vercel: **Add New Project** → import the repo. Vercel auto-detects Vite — no config needed (a `vercel.json` is included so that direct links like `/projects/bataeno-pass` don't 404 on refresh). Before the first deploy, add the same three `VITE_EMAILJS_*` variables under **Project Settings → Environment Variables**, then redeploy (env vars are baked in at build time).

Or via CLI:

```bash
npm install -g vercel
vercel
```

## Notes

- This is a static frontend-only build (no MongoDB/Express) — the contact form's "backend" is entirely EmailJS + your Gmail account, matching what a Vercel static deploy needs with zero server maintenance.
- If you outgrow EmailJS later, swap `src/components/Contact.jsx`'s submit handler for a call to a Vercel serverless function (`/api/contact`) that uses `nodemailer` with a Gmail app password — happy to scaffold that if you need it.
