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
  rotatingWords: ["Design", "Advertising", "Fashion", "Photography"],

  // The filter buttons above your work.
  disciplines: ["Art direction", "AI", "Design", "Advertising", "Photography"],

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
    { name: "Golden Penny", logo: "images/brands/golden-penny.png", originalColour: true },
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
       discipline:  must match one of the disciplines above (for the filters).
                    For more than one, use a list: ["Art direction", "AI"]
       image:       the cover picture, e.g. "images/delana/cover.jpg"
       video:       optional. A video that plays silently on the tile when
                    hovered, e.g. "videos/chupa-chups.mp4"
       headline:    the big sentence at the top of the project page
       description: a short paragraph about the project (who it was for, what it was)
       role:        what you did, e.g. "Art director", "Motion designer"
       objective, insight, direction, concept:
                    optional. Short lines shown on the project page under
                    "Objective", "Insight", "Creative direction" and "Concept".
                    Leave any of them out and that heading simply won’t show.
       media:       the pictures and videos shown on the project page, in order.
                    Any file ending in .mp4 is shown as a video with sound.
                    You can also paste a YouTube or Vimeo link here, e.g.
                    "https://youtu.be/abc123XYZ00" or "https://vimeo.com/123456789".
                    Use this for big films (over about 20 MB).

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
      objective: "Create digital motion assets to run throughout the campaign.",
      insight: "Ummm… Share a Coke is BACKKKK.",
      direction: "A Gen Z focused design style.",
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
      role: "Assistant editor",
      media: ["videos/chupa-chups/jellies-tvc.mp4"]
    },
    {
      title: "Delana Reigns, Issue 01",
      discipline: "Photography",
      image: "images/delana/camp1.jpg",
      headline: "Denim & Leather. Issue 01 for Delana Reigns.",
      description: "Campaign and lookbook for the Delana Reigns Issue 01 drop: cross-panel leather polos and wide-leg denim, shot against hard black and white walls. Plus the poster for the Delana pop-up in Lekki.",
      role: "Photographer and editor (campaign), art director (pop-up poster)",
      objective: "Show the clothing naturally: simple and raw, worn rather than displayed, with the focus on details and texture instead of clean product shots.",
      direction: "Hard light against raw black and red-taped walls, then bright daylight on rough white plaster and concrete. Tight crops pull the eye to the stitching, the croc-embossed leather and the weight of the denim, while loose, everyday poses keep the pieces feeling lived-in.",
      media: [
        "images/delana/sep.jpg",
        "images/delana/camp1.jpg",
        "images/delana/camp-2.jpg",
        "images/delana/black-look.jpg",
        "images/delana/flat-lay.jpg",
        "images/delana/red-top-ffront-web.jpg",
        "images/delana/red-top-backweb.jpg",
        "images/delana/red-bottom-front-web.jpg",
        "images/delana/red-bottom-web.jpg",
        "images/delana/white-red-look.jpg",
        "images/delana/white-top-front-web.jpg",
        "images/delana/white-top-web.jpg",
        "images/delana/white-bottom-web.jpg",
        "images/delana/cross-shoot-july-1cross-shoot-july-2-2.jpg",
        "images/delana/cross-shoot-july-1cross-shoot-july-2-3.jpg",
        "images/delana/pop-up-poster.jpg"
      ]
    },
    {
      title: "Delana Cross Cheetah, 2025",
      discipline: "Photography",
      image: "images/delana/cheetah-standing.jpg",
      headline: "Cross Cheetah. Out in the wild.",
      description: "Campaign for the Delana Cross Cheetah Print piece, made in house by the Delana team and shot outdoors in tall grass.",
      role: "Photographer and editor",
      objective: "Show the clothing naturally: simple and raw, worn rather than displayed, with the focus on details and texture instead of clean product shots.",
      direction: "Taken out of the studio and into tall grass under full midday sun. No set, no styling props, just natural light, skin and greenery, so the cheetah print and the texture of the fabric speak for themselves.",
      media: [
        "images/delana/cheetah-standing.jpg",
        "images/delana/cheetah-crouch.jpg"
      ]
    },
    {
      title: "Baru, Age of Bronze",
      discipline: ["Art direction", "AI"],
      image: "images/baru/matriarch.jpg",
      headline: "A world where bronze rules all.",
      description: "Baru is a conceptual world I built from scratch: its people, its armour, its rituals and its rulers, all forged in bronze.",
      role: "Creator and art director",
      media: [
        "https://youtu.be/A4w8fdO0Ly8",
        "https://youtu.be/vQe8UAiq6A4",
        "https://youtu.be/JgaHpFG1LNs",
        "images/baru/matriarch.jpg",
        "images/baru/mask.jpg",
        "images/baru/warrior.jpg",
        "images/baru/tunic.jpg"
      ]
    },
    {
      title: "Don’t Hang Up",
      discipline: "AI",
      image: "https://i.ytimg.com/vi/n7QcQwitiE0/maxresdefault.jpg",
      headline: "Don’t Hang Up.",
      description: "A 30-second short film made with AI, directed by me.",
      role: "Director",
      media: ["https://youtu.be/n7QcQwitiE0"]
    },
    {
      title: "To Love Is To Die",
      discipline: "AI",
      image: "https://i.ytimg.com/vi/HUwlKbKBORs/maxresdefault.jpg",
      headline: "To Love Is To Die.",
      description: "A 45-second short film made with AI. Written by Kay Ugwuzor, directed by me.",
      role: "Director",
      media: ["https://youtu.be/HUwlKbKBORs"]
    },
    {
      title: "9–5",
      discipline: "Photography",
      image: "images/9-5/9-5-01.jpg",
      headline: "Humankind cannot gain anything without first giving something in return.",
      description: "A personal photo series on the everyday hustler at work in Lagos: hawkers weaving through traffic, passengers packed into the back of a bus, riders and roadside workers keeping the city moving.",
      role: "Photographer and editor (personal project)",
      direction: "Shot on the move from inside traffic, through windscreens and side mirrors. Grain, warm faded colour and split-frame collages lay two moments side by side, so each frame feels like the pace of a commute.",
      media: [
        "images/9-5/9-5-01.jpg",
        "images/9-5/9-5-02.jpg",
        "images/9-5/9-5-03.jpg",
        "images/9-5/9-5-04.jpg",
        "images/9-5/9-5-05.jpg",
        "images/9-5/9-5-06.jpg"
      ]
    },
    {
      title: "Golden Penny Food Fest 2026 (Proposal)",
      discipline: "Art direction",
      image: "images/golden-penny/foodfest-poster.jpg",
      headline: "A louder, hungrier look for Food Fest.",
      description: "Proposed work: a new masthead and visual identity pitched for Golden Penny Food Fest 2026 in Victoria Island, Lagos, shown across posters, web banners, the event gazebo, parasols and wristbands.",
      role: "Art director (proposal)",
      objective: "Create a new expressive masthead and visual direction for the upcoming Food Fest.",
      direction: "Using colour as the basis to excite the audience and build anticipation for the day.",
      media: [
        "images/golden-penny/foodfest-masthead.jpg",
        "images/golden-penny/foodfest-poster.jpg",
        "images/golden-penny/foodfest-gazebo.jpg",
        "images/golden-penny/foodfest-banner.jpg",
        "images/golden-penny/foodfest-wristband.jpg",
        "images/golden-penny/foodfest-parasol.jpg"
      ]
    },
    {
      title: "Cowbell (Proposal)",
      discipline: "Art direction",
      image: "images/cowbell/poster.jpg",
      headline: "Greatness in progress. Watch them shine.",
      description: "Proposed work: a campaign pitched for Cowbell milk, shown across a poster, a BRT bus wrap, a street billboard and an in-store shelf unit.",
      role: "Art director (proposal)",
      media: [
        "images/cowbell/poster.jpg",
        "images/cowbell/billboard.jpg",
        "images/cowbell/brt.jpg",
        "images/cowbell/shelf.jpg"
      ]
    },
    {
      title: "The North Brick",
      discipline: "Advertising",
      image: "images/north-brick/puffer.jpg",
      headline: "What if LEGO and The North Face made a collection together?",
      description: "A spec ad imagining The North Brick: one logo built from both brands, carried across a puffer, a range of backpacks and a buildable mountain set.",
      role: "Art director",
      concept: "Combining two global brands that have nothing to do with each other into one cohesive brand, then expanding it.",
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
      description: "Social content for The Place: the Pepper Chicken promo, the Pepperlicious combos, Your Month, Your Meal, and a Workers’ Day series celebrating the staff behind the counter.",
      role: "Art director (static) and motion designer (video)",
      media: [
        "images/the-place/spida.jpg",
        "videos/the-place/pepper-chicken.mp4",
        "videos/the-place/pepperlicious.mp4",
        "videos/the-place/month-meal.mp4",
        "images/the-place/workers-day-blessing.jpg",
        "images/the-place/workers-day-emeka.jpg",
        "images/the-place/workers-day-tinuke.jpg"
      ]
    },
    {
      title: "Golden Penny Semovita",
      discipline: "Advertising",
      image: "videos/golden-penny/semovita.jpg",
      video: "videos/golden-penny/semovita.mp4",
      headline: "One product. Many possibilities.",
      description: "Motion piece for Golden Penny Semovita, setting one pack against a spread of everyday meals.",
      role: "Art director and motion designer",
      objective: "Reinforce Golden Penny Semo as a flexible staple suitable across multiple meals and households.",
      insight: "Versatility increases everyday relevance and long-term brand recall.",
      direction: "Visual storytelling showcased multiple serving possibilities while keeping strong product dominance and appetite appeal.",
      concept: "One product. Many possibilities: a dependable foundation across diverse cultural contexts.",
      media: ["videos/golden-penny/semovita.mp4"]
    },
    {
      title: "Golden Penny",
      discipline: "Advertising",
      image: "images/golden-penny/eid-fasts-to-feasts.jpg",
      video: "videos/golden-penny/pasta-squeezeback.mp4",
      headline: "Everyday staples, made worth sharing.",
      description: "Brand communication across the Golden Penny range: Eid el-Fitr posts, broadcast squeezebacks for Golden Penny pasta and food-cart branding for Amaizing Day Cereal.",
      role: "Art director and motion designer",
      objective: "Build strong visual consistency across executions while adapting the message to each product category and campaign.",
      direction: "Working within established brand guidelines, elevating product storytelling through culturally relevant messaging, real pain points and appetite appeal, balancing commercial clarity with visual engagement.",
      media: [
        "images/golden-penny/eid-fasts-to-feasts.jpg",
        "videos/golden-penny/pasta-squeezeback.mp4",
        "videos/golden-penny/pasta-squeezeback-short.mp4",
        "images/golden-penny/eid-reason-to-share.jpg",
        "images/golden-penny/foodcart-front.jpg",
        "images/golden-penny/foodcart-side.jpg"
      ]
    },
    {
      title: "Right to Protein",
      discipline: "Advertising",
      image: "images/right-to-protein/unto-bigger-meat.jpg",
      headline: "The Eagles hunt the rest.",
      description: "AFCON social posts for Right to Protein, putting the brand right in the middle of the football banter.",
      role: "Art director",
      objective: "Seamlessly include the brand in AFCON banter.",
      insight: "Nothing stays in the minds of Nigerians like football.",
      direction: "Maintaining strong ties to the brand while using team symbolism as the connecting factor.",
      concept: "The Eagles hunt the rest: positioning the Nigerian team as the top dog, not the underdog.",
      media: [
        "images/right-to-protein/unto-bigger-meat.jpg",
        "images/right-to-protein/eagles-vs-foxes.jpg"
      ]
    },
    {
      title: "Hollandia",
      discipline: "Advertising",
      image: "videos/hollandia/one-pack.jpg",
      video: "videos/hollandia/one-pack.mp4",
      headline: "1 pack, 3 servings. Made to share.",
      description: "Evap campaign for Hollandia Evaporated Milk: animated digital banners and digital billboards across Lagos, at Jakande 5th Roundabout in Lekki and at Allen Roundabout, FTF Toyin, Agidingbi and Aromire Avenue in Ikeja.",
      role: "Motion designer",
      media: ["videos/hollandia/one-pack.mp4", "videos/hollandia/allen-billboard.mp4", "videos/hollandia/jakande-billboard.mp4"]
    },
    {
      title: "Ogilvy, Proactive Social",
      discipline: "Art direction",
      image: "images/ogilvy/fathers-day-1.jpg",
      headline: "They fit in differently.",
      description: "Proactive social posts for Ogilvy Nigeria: an Autism Awareness Day post and a Father’s Day series, “To the men managing the toughest clients on Earth.”",
      role: "Art director and copywriter",
      objective: "Debunk the misconception that autism is an intellectual deficiency.",
      insight: "Misconceptions label autism as intellectual deficiency. In truth, autistic thinking is not less. It is different, often equal or superior in pattern recognition, depth and honesty.",
      direction: "Balanced adherence to brand guidelines with scroll-optimised layouts tailored for social platforms.",
      concept: "The shape sorter is a metaphor for society: neurotypical figures pass through the matching mould, while the autistic figure creates their own.",
      media: [
        "images/ogilvy/autism-awareness.jpg",
        "images/ogilvy/fathers-day-1.jpg",
        "images/ogilvy/fathers-day-2.jpg",
        "images/ogilvy/fathers-day-3.jpg",
        "images/ogilvy/fathers-day-4.jpg"
      ]
    },
    {
      title: "SmartCash",
      discipline: "Design",
      image: "videos/smartcash/how-to.jpg",
      video: "videos/smartcash/how-to.mp4",
      headline: "Funding your wallet, in four simple steps.",
      description: "How-to explainer for SmartCash showing customers how to fund their wallet from any banking app.",
      role: "Motion designer",
      objective: "Position SmartCash as a relatable, trustworthy financial companion, especially during high-spend festive periods.",
      insight: "Financial brands often feel distant; familiarity builds trust.",
      direction: "Human-centred visuals, a softened brand tone and warm festive cues reinforced approachability.",
      concept: "Finance without intimidation: a friendly neighbour simplifying everyday transactions.",
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
      objective: "Entertain and educate the audience on the features of each product, seamlessly.",
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
      objective: "Entertain and educate the audience on the features of each product, seamlessly.",
      media: ["videos/daisy/film.mp4"]
    },
    {
      title: "Ogilvy Group",
      discipline: "Design",
      image: "videos/ogilvy/leadership.jpg",
      video: "videos/ogilvy/leadership.mp4",
      headline: "Meet the people behind the work.",
      description: "Films for the Ogilvy group in Nigeria: a leadership introduction film, plus a video series I co-edited and designed the intro for.",
      role: "Motion designer (leadership film); co-video editor and intro designer (video series)",
      media: [
        "videos/ogilvy/leadership.mp4",
        "https://youtu.be/Es_wJTJUp2Y",
        "https://youtu.be/bIruIh3F5Yg",
        "https://youtu.be/772g1Bhk5oo"
      ]
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
