# Portfolio

A single-page portfolio. Plain HTML, CSS and JavaScript, no build step.

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

## Putting it online (free, with GitHub Pages)

1. On github.com, open your PORTFOLIO repository and click **Add file > Upload files**.
2. Drag in everything from this folder, then click **Commit changes**.
3. Go to **Settings > Pages**, set Source to **Deploy from a branch**, pick `main` and `/ (root)`, then **Save**.
4. After a minute your site will be live at `https://solaadedaniel-spec.github.io/PORTFOLIO/`.
