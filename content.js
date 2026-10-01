/* =====================================================================
   EDIT YOUR WEBSITE HERE
   =====================================================================
   This is the ONLY file you need to change. Everything you see on the
   website (your name, bio, projects, services, links) comes from here.

   How to edit safely:
   - Only change the text BETWEEN the quote marks "like this".
   - Keep the commas at the end of each line.
   - If your text contains a quote mark, use a curly one (’ or ”) instead.
   - Save the file, then refresh the website in your browser.
   ===================================================================== */

const SITE = {

  /* ---------- LOOK ---------- */
  theme: "dark",          // "dark" or "light"
  accent: "#8ec5ff",      // your one accent colour (light blue)

  /* ---------- INTRO (top of the page) ---------- */
  name: "Sola",
  role: "Multidisciplinary art director",
  welcome: "Welcome",

  // The big sentence at the top reads: name + statement + rotating word.
  statement: "is a multidisciplinary art director shaping brands across",
  tagline: "Nothing much, just real good stuff.",

  // The last word of the big sentence rotates through these.
  // They are also the filter buttons above your work.
  disciplines: ["Design", "Advertising", "Fashion", "Photography"],

  location: "Based in Nigeria",
  email: "solaadedaniel@gmail.com",
  linkedin: "https://www.linkedin.com/in/oluwasolabomi-adeboyejo-1291b2229/",

  /* ---------- BRANDS I'VE WORKED WITH ----------
     The strip of names under the intro.
     name: the brand name (shown as text if there is no logo)
     logo: optional. A logo file, e.g. "images/brands/coca-cola.svg".
           Use a transparent PNG or SVG; it is shown in white automatically.
     originalColour: true keeps the logo's own colours instead of white
           (for logos that turn into a blank shape when made white). */
  brands: [
    { name: "Coca-Cola",    logo: "images/brands/coca-cola.svg" },
    { name: "Chupa Chups",  logo: "images/brands/chupa-chups.svg" },
    { name: "Hollandia",    logo: "images/brands/hollandia.svg" },
    { name: "Golden Penny", logo: "images/brands/golden-penny.svg" },
    { name: "TVS",          logo: "images/brands/tvs.svg" },
    { name: "SmartCash",    logo: "images/brands/smartcash.svg" },
    { name: "Mr Chef",      logo: "images/brands/mr-chef.png", originalColour: true },
    { name: "The Place",    logo: "images/brands/the-place.png", originalColour: true },
    { name: "Delana",       logo: "images/brands/delana.png" }
  ],

  // Your portrait for the About section, e.g. "images/sola.jpg"
  // Leave it as "" to hide the photo until you have one.
  portrait: "",

  // Your bio. Each line in quotes becomes its own paragraph (3 or 4 is ideal).
  // This is a draft in your voice. Rewrite it so it sounds exactly like you.
  bio: [
    "I’m Sola. I art direct across design, advertising, fashion and photography, and I don’t believe those are separate things.",
    "Every project starts the same way: find the feeling first, then build everything around it. The type, the light, the styling, the cut.",
    "I like work that is simple on the surface and obsessed over underneath.",
    "Nothing much, just real good stuff."
  ],

  /* ---------- SELECTED WORK ----------
     Each project is a tile in the grid. Clicking it opens its own page.

       title:       short project name (shown when you hover the tile)
       discipline:  must match one of the disciplines above (for the filters)
       image:       the cover picture, e.g. "images/delana/cover.jpg"
       video:       optional. A video that plays silently on the tile when
                    hovered, e.g. "videos/chupa-chups.mp4"
       headline:    the big sentence at the top of the project page
       description: a short paragraph about the project (who it was for, what it was)
       role:        what you did, e.g. "Art director", "Motion designer"
       media:       the pictures and videos shown on the project page, in order.
                    Any file ending in .mp4 is shown as a video with sound.

     Add a project by copying a whole { ... }, block. Delete one the same way. */
  work: [
    {
      title: "Coca-Cola, Share a Coke",
      discipline: "Advertising",
      image: "videos/coca-cola/kindness-day.jpg",
      video: "videos/coca-cola/kindness-day.mp4",
      headline: "Every G has a nickname. What’s yours?",
      description: "Social content for Share a Coke in Nigeria, built around the nickname bottles: My G, Sabi girl, G.O.A.T, Idan. Posts for cultural moments like International Men’s Day and World Kindness Day, plus rooftop, beach and bestie moments.",
      role: "Motion designer",
      media: [
        "videos/coca-cola/kindness-day.mp4",
        "videos/coca-cola/mens-day.mp4",
        "videos/coca-cola/rooftop-1.mp4",
        "videos/coca-cola/rooftop-2.mp4",
        "videos/coca-cola/beach-pair.mp4",
        "videos/coca-cola/beach-squad.mp4",
        "videos/coca-cola/besties.mp4",
        "videos/coca-cola/can-hug.mp4"
      ]
    },
    {
      title: "Chupa Chups Jellies",
      discipline: "Advertising",
      image: "videos/chupa-chups/jellies-tvc.jpg",
      video: "videos/chupa-chups/jellies-tvc.mp4",
      headline: "Forever fun, now in jellies.",
      description: "15-second broadcast commercial for Chupa Chups Jellies.",
      role: "Motion designer",
      media: ["videos/chupa-chups/jellies-tvc.mp4"]
    },
    {
      title: "Delana Reigns, Issue 01",
      discipline: "Fashion",
      image: "images/delana/camp-1.jpg",
      headline: "Denim & Leather. Issue 01 for Delana Reigns.",
      description: "Campaign and lookbook for the Delana Reigns Issue 01 drop: cross-panel leather tops and wide-leg denim, shot against hard black and white walls.",
      role: "Photographer and editor",
      media: [
        "images/delana/sep.jpg",
        "images/delana/camp-1.jpg",
        "images/delana/camp1.jpg",
        "images/delana/camp-2.jpg",
        "images/delana/black-look.jpg",
        "images/delana/flat-lay.jpg",
        "images/delana/cross-shoot-july-1cross-shoot-july-2-2.jpg",
        "images/delana/red-top-ffront-web.jpg",
        "images/delana/red-top-backweb.jpg",
        "images/delana/red-bottom-front-web.jpg",
        "images/delana/red-bottom-web.jpg",
        "images/delana/white-red-look.jpg",
        "images/delana/white-top-front-web.jpg",
        "images/delana/white-top-web.jpg",
        "images/delana/white-bottom-web.jpg",
        "images/delana/cross-shoot-july-1cross-shoot-july-2-3.jpg"
      ]
    },
    {
      title: "The North Brick",
      discipline: "Advertising",
      image: "images/north-brick/puffer.jpg",
      headline: "What if LEGO and The North Face made a collection together?",
      description: "A spec ad imagining The North Brick: one logo built from both brands, carried across a puffer, a range of backpacks and a buildable mountain set.",
      role: "Art director",
      media: [
        "images/north-brick/cover.jpg",
        "images/north-brick/logo.jpg",
        "images/north-brick/puffer.jpg",
        "images/north-brick/bags-1.jpg",
        "images/north-brick/bags-2.jpg",
        "images/north-brick/bags-3.jpg",
        "images/north-brick/end.jpg"
      ]
    },
    {
      title: "The Place",
      discipline: "Advertising",
      image: "images/the-place/spida.jpg",
      video: "videos/the-place/pepper-chicken.mp4",
      headline: "With great cravings, comes great responsibility.",
      description: "Social content for The Place: the Pepper Chicken promo, the Pepperlicious combos and Your Month, Your Meal.",
      role: "Art director (static) and motion designer (video)",
      media: [
        "images/the-place/spida.jpg",
        "videos/the-place/pepper-chicken.mp4",
        "videos/the-place/pepperlicious.mp4",
        "videos/the-place/month-meal.mp4"
      ]
    },
    {
      title: "Hollandia",
      discipline: "Advertising",
      image: "videos/hollandia/one-pack.jpg",
      video: "videos/hollandia/one-pack.mp4",
      headline: "1 pack, 3 servings. Made to share.",
      description: "Animated digital banner for Hollandia Evaporated Milk.",
      role: "Motion designer",
      media: ["videos/hollandia/one-pack.mp4"]
    },
    {
      title: "SmartCash",
      discipline: "Design",
      image: "videos/smartcash/how-to.jpg",
      video: "videos/smartcash/how-to.mp4",
      headline: "Funding your wallet, in four simple steps.",
      description: "How-to explainer for SmartCash showing customers how to fund their wallet from any banking app.",
      role: "Motion designer",
      media: ["videos/smartcash/how-to.mp4"]
    },
    {
      title: "OnBuddy",
      discipline: "Design",
      image: "videos/onbuddy/film.jpg",
      video: "videos/onbuddy/film.mp4",
      headline: "One workspace for everything your team does.",
      description: "Product film for OnBuddy, the work management platform.",
      role: "Motion designer",
      media: ["videos/onbuddy/film.mp4"]
    },
    {
      title: "Daisy",
      discipline: "Design",
      image: "videos/daisy/film.jpg",
      video: "videos/daisy/film.mp4",
      headline: "From idea to app design, faster.",
      description: "Product film for Daisy, showing a prompt turned into a full app design.",
      role: "Motion designer",
      media: ["videos/daisy/film.mp4"]
    },
    {
      title: "Ogilvy Group",
      discipline: "Design",
      image: "videos/ogilvy/leadership.jpg",
      video: "videos/ogilvy/leadership.mp4",
      headline: "Meet the people behind the work.",
      description: "Leadership introduction film for the Ogilvy group in Nigeria.",
      role: "Motion designer",
      media: ["videos/ogilvy/leadership.mp4"]
    }
  ],
  /* ---------- SERVICES ---------- */
  services: [
    { title: "Art direction",          description: "The idea, the look and the feeling, held together from first sketch to final frame." },
    { title: "Brand and design",       description: "Identities, type and visual systems that feel like someone, not something." },
    { title: "Advertising campaigns",  description: "Concepts that stop the scroll and still make sense a year later." },
    { title: "Fashion and photography",description: "Editorials, lookbooks and shoots: styling, casting, light and story." }
  ],

  /* ---------- CONTACT ---------- */
  contactHeadline: "Got something good in mind? Say hello.",

  // Your social links. Add more by copying a line, e.g.
  // { label: "Instagram", url: "https://instagram.com/yourhandle" },
  socials: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/oluwasolabomi-adeboyejo-1291b2229/" }
  ]
};
