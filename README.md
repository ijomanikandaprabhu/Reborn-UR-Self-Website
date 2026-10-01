# Rebornurself Website

The website for **Rebornurself**, a permanent makeup studio in Chennai offering microblading, powder brows, lip blushing and more, for women and men.

**Live site:** https://www.rebornurself.com

## Built with

- [Next.js](https://nextjs.org) (App Router, static pages) and React
- [Tailwind CSS](https://tailwindcss.com) v4
- [GSAP](https://gsap.com) and [Lenis](https://lenis.darkroom.engineering) for animation and smooth scrolling
- Hosted on [Vercel](https://vercel.com)

## Run it on your computer

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

To check the finished version, as visitors see it:

```bash
npm run build
npm start
```

## Where to change things

| What | File |
| --- | --- |
| Phone, email, address, opening hours, social links, founder details | `src/lib/site.ts` |
| Treatment pages (text, photos, journey steps) | `src/data/services.generated.json` |
| Treatment FAQs | `src/data/services.ts` |
| Comparison tables and aftercare steps | `src/data/guides.ts` |
| Hero slides, gallery photos, client reviews | `src/data/content.ts` |
| Home, About, Contact, Gallery and Privacy pages | `src/app/` |
| Header, footer, buttons and other shared parts | `src/components/` |
| Colours, fonts and button styles | `src/app/globals.css` |
| Images | `public/assets/img/` |

The date shown as "Last updated" on treatment pages is `updated` in `src/lib/site.ts`.

## Search engines

The site creates its own `sitemap.xml`, `robots.txt`, `llms.txt` and structured data (business details, services, FAQs) from the files above, so there is nothing extra to update when content changes. Old `.html` addresses from the previous site redirect to the new pages (see `next.config.ts`).

## Publishing

Every push to the `main` branch is published to the live site automatically by Vercel, usually within a couple of minutes. Check your changes with `npm run build` before pushing.

---

Website by [Ijo Creations](https://ijocreations.com/).
