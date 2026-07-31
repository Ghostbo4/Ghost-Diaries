# Ghost Diaries

A calm, greyscale, nostalgic personal crypto portfolio. Plain HTML/CSS/JS — no build step, no dependencies.

## Structure

```
index.html          Home — hero with floating ghost + preview cards
gallery.html         Circular spinning carousel of NFT pieces + detail modal
about.html            Essay about your crypto journey
communities.html       Cards for each community you run, with platform icons
goals.html             Passcode-locked goals list
contact.html            Credentials + live feedback form/chart
styles.css               All styling (design tokens at the top)
script.js                 Nav, reveal-on-scroll, Ghost Guide (nav assistant)
carousel.js                Gallery carousel + detail modal logic
goals-lock.js                Passcode gate for the Goals page
feedback.js                   Star rating + live session-only chart
assets/ghost-wisp.svg           Recurring drifting ghost motif
assets/ghost-float.png           Floating ghost on the home page
assets/icons/                     telegram.svg, x.svg, discord.svg
assets/nft2/                       Your 15 gallery images (g-01.jpg ... g-15.jpg)
```

## What to edit before you launch

### Gallery (gallery.html)
Every carousel item has placeholder data attributes:
`data-collection`, `data-date`, `data-story`, `data-creator`.
Search for `[Collection name` in the file and fill in the real details
for each of the 15 pieces -- that's what shows in the popup when someone
clicks a piece.

### Goals passcode (goals-lock.js)
The passcode is set in `goals-lock.js`:
```js
const PASSCODE = 'dreams without goals are just dreams';
```
**Honesty note:** this is a soft gate, not real security. The goal
content is base64-encoded inside the page so it isn't plainly
readable via view-source, but anyone who opens devtools and decodes
`window.__goalsPayload` can still read it without the passcode. Don't
put anything here you actually need to keep secret -- true protection
needs a server that only sends the content after checking the code.

### Contact page (contact.html)
Credentials, links, and the feedback form are already wired up. The
feedback chart works live in the browser but **doesn't persist** --
there's no backend. To actually collect responses, either:
- swap the form's submit handler in `feedback.js` for a `fetch()` to
  a service like Formspree, or
- point the `<form>` at a Google Form / Tally endpoint instead.

### Ghost Guide (the bottom-right chat widget)
This is a **rule-based assistant**, not a real AI model -- it matches
keywords in `script.js` (`initAiAgent`) to canned answers about where
things live on the site. To upgrade it to a real AI:
1. Stand up a small backend (a Vercel serverless function works well)
   that holds your Anthropic API key server-side -- never put a real
   API key in this static frontend, it would be public.
2. Have that endpoint call the Claude API and return the reply.
3. In `script.js`, replace the `answer()` function with a `fetch()`
   to your endpoint instead of the keyword matcher.

## Running it locally

```
python3 -m http.server 8000
```
then visit `http://localhost:8000`. (Opening `index.html` by
double-clicking can break relative asset paths in some setups --
a local server avoids that.)

## Deploying for free on Vercel

1. Create a free account at vercel.com (GitHub login is easiest).
2. Push this folder to a new GitHub repo, or drag-and-drop the folder
   into the Vercel dashboard.
3. Framework preset: **Other** (static site, no build command).
4. Deploy -- you'll get a free `your-project.vercel.app` URL.

### Alternative free hosts
- **Netlify** -- drag-and-drop onto app.netlify.com/drop.
- **GitHub Pages** -- push to a repo, enable Pages in settings.
