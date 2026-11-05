# Shaghayegh Mastalipour — Bilingual Portfolio

A redesigned, responsive English/Persian portfolio with **local case-study pages** and two one-page PDF summaries. Project cards and primary writing links go to pages inside the portfolio, so the work remains browsable when outside publishers are slow. The site requires no build step, npm packages, external fonts, or remote images. Four editorial visuals are AI-generated. The case studies also include cropped screenshots of the user’s own Search Console data, Homat Academy workflows, and public author pages, saved locally as optimized WebP images. Screenshot crops remove browser chrome and private admin URLs. It can be hosted on GitHub Pages, Vercel, or Netlify.

## Preview

Open `index.html` for English or `fa.html` for Persian. For a local server run `python3 -m http.server 8001` in this directory.

## Publish

Upload the **contents** of this directory to the repository root (`index.html`, `fa.html`, all eight case-study pages, `styles.css`, `script.js`, `assets/`, and the two PDFs). On GitHub Pages choose Settings → Pages → Deploy from a branch → main / root. Or import the GitHub repository in Vercel/Netlify as a static site with no build command. `build.py` and `make_pdfs.py` are workspace generation scripts and are not required for deployment.

## Before sharing publicly

- Confirm the preferred Roman spelling of the name and contact email.
- The hero and project images are illustrative AI-generated visuals; project descriptions and public links document the work.
- Review the displayed SEO metrics and dates against your GSC exports. The site **does not claim** that SEO changes alone caused the traffic difference.
- The automation case study distinguishes the earlier documentation (475 prepared items and 29 checks) from a later dashboard capture (516 content-bank items, four channels active).
- The author profile links point to published work. The Korean embassy general notices link was deliberately omitted because it does not identify an individual byline.
- This ZIP is ready to host as-is. Edit the HTML/CSS directly for copy and styling changes. The PDFs are static downloads; replace them if your experience or contact details change.
- Canonical and hreflang tags use the published GitHub Pages URL `https://shagha-m.github.io/`. Change them if the site moves to another domain.
