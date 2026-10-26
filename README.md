# Portfolio

A single-page portfolio. Plain HTML, CSS and JavaScript, no build step.

**Live site:** https://sola-creativeportfolio.vercel.app/

## Editing (no coding needed)

1. Open **`content.js`**. All the text on the site lives there: name, role, bio, projects, services, email and social links.
2. Put your pictures in the **`images`** folder.
3. In `content.js`, change each image to point at your file, for example `image: "images/project-1.jpg"`.
4. Save, then open `index.html` in your browser (or refresh it) to see the changes.

Tips:
- Only change text inside the quote marks, and keep the commas.
- Each project is a `{ ... },` block in the `work` list. Copy a whole block to add one. Each project gets its own page (headline, description, then its `media` pictures and videos).
- `discipline` must match one of the words in `disciplines` (Design, Advertising, Fashion, Photography) so the filter buttons work. Add a new discipline to that list and it gets its own filter button and joins the rotating word at the top.
- Brands in the strip under the intro live in the `brands` list. Add a `logo` file to show a logo instead of the name.
- Switch between dark and light with `theme: "dark"` or `theme: "light"`.
- Change the accent colour with `accent: "#ff6b3d"` (any hex colour).
- Images look best around 1600px wide, saved as .jpg and under 500 KB each.

## Files

| File | What it is |
|---|---|
| `content.js` | All your words and image paths. **Edit this one.** |
| `index.html` | Page structure |
| `style.css` | Look and layout |
| `main.js` | Builds the page from `content.js` |
| `images/` | Your pictures |

## Putting it online

The site is live on Vercel at https://sola-creativeportfolio.vercel.app/, connected to this repo's `main` branch — any push to `main` deploys automatically, usually within a minute or two.

GitHub Pages is also set up as a backup at `https://solaadedaniel-spec.github.io/PORTFOLIO/`, building from the same `main` branch, but Vercel is the address to share.
