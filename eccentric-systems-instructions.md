# instructions.md — Eccentric Systems Website Build
# For: Antigravity
# Last updated: 2026-08-04

---

## WHAT THIS FILE IS

This is the complete build specification for the Eccentric Systems website. It contains everything needed to build the site from scratch: structure, copy, design system, assets, tracking, forms, SEO, legal pages, and technical requirements.

Follow this file exactly. Do not add, remove, or change any copy, colors, fonts, or structural elements unless explicitly noted as optional.

---

## SITE MAP

```
eccentricsystems.co/                  ← Homepage
eccentricsystems.co/investment-migration  ← Investment Migration service page
eccentricsystems.co/privacy-policy    ← Privacy Policy
eccentricsystems.co/cookie-policy     ← Cookie Policy
eccentricsystems.co/terms             ← Terms of Use
eccentricsystems.co/sitemap.xml       ← Auto-generated sitemap
eccentricsystems.co/robots.txt        ← Crawl permissions
```

---

## ASSETS

Two hero images are provided in the assets folder:
- **hero-main.jpg** — Homepage hero (futuristic office desk with dashboard UI, clock, glassmorphic cards)
- **hero-gold.jpg** — Investment migration service page hero (Santorini Greece, golden hour, "ACCESS" text in sky)

Compress both to WebP format, under 300KB each. Serve as `<img>` with CSS object-fit cover, or as CSS background-image. Provide the original JPG as the `<img>` fallback and use `<picture>` with WebP source preferred.

**Font:** Inter — load from Google Fonts with weights 400, 500, 600, 700. Preload the font file for performance.

**Logo:** Text-only wordmark for now. "ECCENTRIC SYSTEMS" in Inter 500, 13px, letter-spacing 0.15em, color `#1C1C17`. No image logo.

---

## DESIGN SYSTEM

### Colors (strict 60/30/10 ratio across every page)
| Role | Hex | Usage |
|---|---|---|
| Cream (60%) | `#F0EDE8` | Primary background, card fills, text on dark sections |
| Deep ink (30%) | `#1C1C17` | Body text, headings on light, dark section backgrounds |
| Teal (10%) | `#2DC4B0` | CTAs, labels, accents, hover states, links |
| Alt cream | `#E8E4DE` | Optional subtle section separation |

### Typography — Inter only, no other fonts
| Element | Weight | Size (desktop) | Size (mobile) | Color |
|---|---|---|---|---|
| H1 | 700 | 60px | 38px | `#1C1C17` (or cream on dark bg) |
| H2 | 700 | 42px | 32px | `#1C1C17` (or cream on dark bg) |
| H3 | 600 | 20px | 18px | `#1C1C17` |
| Body | 400 | 17-18px | 16px | `#1C1C17` at 75% opacity |
| Labels | 500 | 12px | 12px | `#2DC4B0`, caps, letter-spacing 0.15em |
| Nav wordmark | 500 | 13px | 11px | `#1C1C17` |
| CTA buttons | 600 | 16px | 16px | `#1C1C17` on teal bg |

Line height for body text: 1.75-1.8

### Lighting and Glassmorphism
A single directional light source comes from the upper-left on ALL glass/card elements:
```css
/* Glassmorphic panel */
.glass {
  background: rgba(240, 237, 232, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  border-left: 1px solid rgba(255, 255, 255, 0.3);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  border-right: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 4px 24px rgba(28, 28, 23, 0.08);
  position: relative;
}
.glass::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 50%);
  pointer-events: none;
  border-radius: inherit;
}
```
Apply this to: hero text panel, S3 cards, S4 founder cards.

### No em dashes
Do not use em dashes (—) anywhere in the rendered text. The copy in this file uses them for readability but in the final rendered HTML replace all em dashes with " - " (space-dash-space) or rephrase.

---

## ANIMATIONS

### On scroll (all sections except hero)
```css
.animate-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.4s ease-out, transform 0.4s ease-out;
}
.animate-in.visible {
  opacity: 1;
  transform: translateY(0);
}
```
Trigger: IntersectionObserver fires when element enters viewport.
Stagger children in multi-element sections: 0.1s delay between each.

### Card hover
```css
.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 32px rgba(28, 28, 23, 0.12);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
```

### CTA button hover
```css
.cta:hover {
  background-color: #26a899; /* teal darkened ~10% */
  transition: background-color 0.2s ease;
}
```

### Nav scroll behavior
```css
.nav { background: transparent; transition: background 0.3s ease; }
.nav.scrolled { background: #F0EDE8; }
```
Trigger: add `.scrolled` class when scroll position > 80px.

### What does NOT animate
- Hero section loads fully visible (no fade in)
- No parallax anywhere
- No looping animations
- No auto-playing media
- No exit animations

---

## NAVIGATION (shared on all pages)

```html
<nav class="nav" aria-label="Main navigation">
  <a href="/" class="nav-wordmark">ECCENTRIC SYSTEMS</a>
  <a href="#form" class="nav-cta">Get started</a>
</nav>
```
- Position: fixed top, full width, z-index 100, height 64px
- Wordmark links to eccentricsystems.co (homepage)
- "Get started" links to the form section on the current page
- On the service page, "Get started" triggers Form 2; on homepage, Form 1
- No hamburger menu needed (only two elements)

---

## PAGE 1: HOMEPAGE — eccentricsystems.co

### S1 — Hero
Full viewport height (100vh). Hero image (hero-main.jpg/webp) covers entire section, object-fit cover.

```html
<section aria-label="Hero" class="hero">
  <img src="hero-main.webp" alt="Business growth dashboard with analytics and workflow system" class="hero-img" />
  <div class="hero-content glass">
    <h1>More clients. Smoother operations.</h1>
    <p class="subline">We build the systems that get the right clients to your door - and make sure your business is ready for every single one of them.</p>
    <div class="cta-row">
      <a href="#form" class="cta cta-primary">Get started</a>
      <a href="#what-we-do" class="cta cta-secondary">See how it works</a>
    </div>
  </div>
</section>
```

- Text positioned left side, vertically centered
- Behind text: glassmorphic panel
- CTA Primary: teal pill button
- CTA Secondary: teal text link with arrow, smooth scrolls to S2
- Mobile: text centered, full width, add 30% cream overlay on image for readability

---

### S2 — What We Do
```html
<section id="what-we-do" aria-label="What We Do">
  <span class="label">THE SYSTEM</span>
  <h2>One system. Two outcomes.</h2>
  <p>We help businesses do two things at once. Get found and chosen by the right clients. Then manage every client, task, and tool from one place. Everything connects. You focus on what you are best at.</p>
  <a href="#form" class="cta cta-primary">Get started</a>
</section>
```
- Background: `#F0EDE8`
- Max-width 760px, centered
- Padding: 120px top/bottom desktop, 80px mobile

---

### S3 — Who This Is For
```html
<section aria-label="Who This Is For" class="dark-section">
  <span class="label">WHO THIS IS FOR</span>
  <h2>Built for business owners ready to grow.</h2>
  <p>We build custom systems that get you the right attention from the right people - and funnel them into workflows that handle every stage. From first impression to closed deal to delivery. You focus on what you do best. The system handles the rest.</p>

  <div class="cards-row">
    <article class="card glass-dark">
      <h3>Investment Migration and Golden Visa</h3>
      <p>We help brokers get in front of high-net-worth individuals looking for residency and citizenship options - and manage every client through a structured pipeline.</p>
      <a href="/investment-migration" class="card-cta">See how</a>
    </article>

    <article class="card glass-dark">
      <h3>Other Industries</h3>
      <p>We build for any business. Tell us what you do and we will show you what a system would look like.</p>
      <a href="#form" class="card-cta">Tell us about your business</a>
    </article>
  </div>
</section>
```
- Background: `#1C1C17`
- All text: cream (`#F0EDE8`)
- Cards: glassmorphic dark variant (darker glass, same lighting principle)
- Cards side by side desktop, stacked mobile
- Max-width 800px centered
- Padding: 120px vertical desktop, 80px mobile

---

### S4 — About
```html
<section aria-label="About">
  <div class="about-grid">
    <div class="about-copy">
      <span class="label">WHO WE ARE</span>
      <h2>So you can focus on what you do best.</h2>
      <p>Running a business means keeping a lot of plates spinning. Different tools. Different processes. All of it pulling your attention away from the part that actually makes you money. We take the heavy lifting off your plate - getting the right clients to your door and making sure your operations run without friction. So your business grows steadily, profits stay healthy, and you spend your time on what only you can do.</p>
    </div>
    <div class="founders">
      <article class="founder-card glass">
        <h3>Umar Fahm</h3>
        <p>Founder</p>
        <a href="https://linkedin.com/in/farouqfahm" target="_blank" rel="noopener" aria-label="Umar Fahm LinkedIn">LinkedIn</a>
      </article>
      <article class="founder-card glass">
        <h3>Abdulmujib Aliu Abdulmalik</h3>
        <p>Co-Founder</p>
        <a href="https://linkedin.com/in/abdulmalikabdulmujib" target="_blank" rel="noopener" aria-label="Abdulmujib LinkedIn">LinkedIn</a>
      </article>
    </div>
  </div>
</section>
```
- Background: `#F0EDE8`
- Two columns desktop (copy left, founders right), single column mobile (copy first, founders below)
- Founder cards: cream bg, glassmorphic border, no photos
- Padding: 120px vertical desktop, 80px mobile

---

### S5 — FAQ
```html
<section aria-label="FAQ">
  <h2>Common questions</h2>

  <div class="faq-item">
    <h3>What does Eccentric Systems do?</h3>
    <p>We build growth and operations systems for businesses. On the growth side we make sure the right people find you and choose you - through organic content that shows who you are, SEO, paid ads, and AI optimisation so tools like ChatGPT and Gemini recommend you. On the operations side we make sure your business can handle every client without things falling apart - through automated pipelines, structured workflows, and connected tools so nothing relies on memory. Both connect into one dashboard so you always know what is happening.</p>
  </div>

  <div class="faq-item">
    <h3>How do you get us more clients?</h3>
    <p>We start with your positioning - making sure it is clear who you are and why you are the right choice. From there we build your visibility to make sure you get the attention of your ideal clients. We use organic content to distribute your vision - whether through social media, articles, or podcasts. We use SEO and AI optimisation to make sure your message is attached to your brand and seen by Google and AI tools when people search for what you offer. With every lead source tracked so you always know what is working.</p>
  </div>

  <div class="faq-item">
    <h3>How do you improve our operations?</h3>
    <p>We map how your business works today then automate the parts that slow you down. Leads get followed up automatically. Clients move through a clear pipeline from first contact to completion. Repetitive tasks run without anyone having to remember them. Your team focuses on the work that actually needs a human. Everything connects so nothing falls through the cracks.</p>
  </div>

  <div class="faq-item">
    <h3>What types of businesses do you work with?</h3>
    <p>We work with most business types regardless of industry and size.</p>
  </div>

  <div class="faq-item">
    <h3>How is this different from a marketing agency or software?</h3>
    <p>A marketing agency or software requires either extra time and effort to function or are disjointed from the rest of your business. This is fully integrated and fits right into how your business already operates. Growth and operations connected in one place, running without you having to manage it.</p>
  </div>

  <div class="faq-item">
    <h3>How long does it take?</h3>
    <p>Most systems are live within 30 days. The full build - with every layer tested and running - is typically complete within 60 to 90 days. The first 30 days are always the clearest - you will see exactly what is changing and why.</p>
  </div>
</section>
```
- Background: `#F0EDE8`
- Max-width 800px, centered
- All Q/A visible at all times (NO accordion, NO collapse)
- Thin divider lines between items: `border-bottom: 1px solid rgba(28,28,23,0.1)`
- Padding: 120px vertical desktop, 80px mobile

---

### S6 — Form (Homepage)
This section appears when any "Get started" or "Tell us about your business" CTA is triggered. It can be a full-screen modal or a dedicated page section with id="form".

**Formspree endpoint:** https://formspree.io/f/xojgggjn

**UX:** One question per screen. Large centered text. Input below the question. No labels (question IS the label). Progress dots at top. Back arrow to go back. Fade transition (0.3s) between questions.

**Questions in order:**
1. "Name" — text input
2. "Email" — email input
3. "Business name" — text input
4. "What does your business do?" — text input
5. "What is your biggest challenge right now?" — textarea
6. "What have you tried and what were the results?" — textarea
7. "What do you hope to get right with us?" — textarea

**After submission:**
Show completion screen: "Would you like to book a call?"
- Button: "Yes, book a call" → opens https://cal.com/abdulmujib-aliu-abdulmalik-r3aqhn in new tab
- Text link: "No thanks" → shows message: "We will reach out within 24 hours."

**Integration code:**
```html
<script>
  window.formspree = window.formspree || function () { (formspree.q = formspree.q || []).push(arguments); };
  formspree('initForm', { formElement: '#es-form-general', formId: 'xojgggjn' });
</script>
<script src="https://unpkg.com/@formspree/ajax@1" defer></script>
```

---

### Footer (Homepage)
```html
<footer role="contentinfo">
  <div class="footer-content">
    <a href="/" class="footer-wordmark">ECCENTRIC SYSTEMS</a>
    <p class="footer-copy">2026 Eccentric Systems. All rights reserved.</p>
    <div class="footer-links">
      <a href="https://linkedin.com/in/farouqfahm" target="_blank" rel="noopener" aria-label="Umar Fahm LinkedIn">LinkedIn</a>
      <a href="https://linkedin.com/in/abdulmalikabdulmujib" target="_blank" rel="noopener" aria-label="Abdulmujib LinkedIn">LinkedIn</a>
    </div>
    <div class="footer-legal">
      <a href="/privacy-policy">Privacy Policy</a>
      <a href="/cookie-policy">Cookie Policy</a>
      <a href="/terms">Terms</a>
    </div>
  </div>
</footer>
```
- Background: `#1C1C17`
- All text: cream at varying opacities (wordmark 100%, copy 40%, legal links 30%)
- Padding: 40px vertical

---

## PAGE 2: INVESTMENT MIGRATION — eccentricsystems.co/investment-migration

### S1 — Hero
Full viewport height. Hero image (hero-gold.jpg/webp) covers entire section.

```html
<section aria-label="Hero" class="hero hero-service">
  <img src="hero-gold.webp" alt="Santorini Greece golden hour - investment migration and residency" class="hero-img" />
  <div class="hero-overlay-left"></div>
  <div class="hero-content">
    <span class="label">INVESTMENT MIGRATION</span>
    <h1>More qualified investors. Less chasing.</h1>
    <p class="subline">We build the system that gets high-net-worth investors to your door and manages every application from first enquiry to approval.</p>
    <div class="cta-row">
      <a href="#form" class="cta cta-primary">Get started</a>
      <a href="#block-01" class="cta cta-secondary">See how it works</a>
    </div>
  </div>
</section>
```
- Text: left side, vertically centered
- CSS gradient overlay on left third: `linear-gradient(to right, rgba(240,237,232,0.2) 0%, transparent 33%)`
- CTA Primary: teal pill, links to Form 2 section
- CTA Secondary: smooth scrolls to Block 01
- Mobile: text centered, full width, stronger overlay (40% cream)

---

### S2 — Block 01: Getting You Clients
```html
<section id="block-01" aria-label="Getting You Clients" class="numbered-section">
  <span class="bg-number">01</span>
  <span class="label">GETTING YOU CLIENTS</span>
  <h2>High-net-worth investors find you first.</h2>
  <p>We position your firm as the obvious choice when investors search for residency and citizenship options. Your website ranks on Google for the searches that matter. AI tools like ChatGPT and Gemini recommend you by name. You get featured on podcasts, publications, and industry registries that your ideal clients already trust. Your content builds authority so when someone is ready to invest, your name is the one they already know. You always know where your best clients are coming from.</p>
  <a href="#form" class="cta cta-primary">Get started</a>
</section>
```
- Background: `#F0EDE8`
- `.bg-number`: Inter 700, ~280px, `#1C1C17` at 7% opacity, positioned absolutely behind text
- Max-width 760px centered
- Padding: 140px vertical desktop, 90px mobile

---

### S3 — Block 02: Managing Your Clients
```html
<section aria-label="Managing Your Clients" class="numbered-section">
  <span class="bg-number">02</span>
  <span class="label">MANAGING YOUR CLIENTS</span>
  <h2>Every client handled. Every deadline met.</h2>
  <p>Every enquiry enters one system. Leads are qualified automatically so you only spend time with investors who meet your minimums. From there, each client moves through a structured pipeline - document collection, application stages, government timelines, follow-ups - all tracked and managed without manual chasing. Your team knows exactly what needs doing and when. Nothing relies on memory. Nothing gets missed. Whether you handle one country or five, it all runs from one place.</p>
  <a href="#form" class="cta cta-primary">Get started</a>
</section>
```
- Same layout and styling as Block 01 with "02" instead of "01"

---

### S4 — FAQ
```html
<section aria-label="FAQ">
  <h2>Common questions</h2>

  <div class="faq-item">
    <h3>How do you get us in front of serious investors?</h3>
    <p>We build your visibility where serious investors already look. That means ranking on Google for the searches they actually use, getting you recommended by AI tools when they ask about residency options, and placing you in publications and registries they trust. We also qualify every lead automatically so only investors who meet your minimums get through. You spend your time on the right conversations, not sifting through people who cannot afford your programs.</p>
  </div>

  <div class="faq-item">
    <h3>We get most clients through referrals. Why do we need this?</h3>
    <p>Referrals are your best leads. But they are not consistent and you cannot control them. What happens in a slow month? What happens when a referral partner goes quiet? We build the infrastructure that generates enquiries independently of who you know. Your referral network stays intact. You just stop depending on it entirely.</p>
  </div>

  <div class="faq-item">
    <h3>How do you handle the compliance and sensitivity around this industry?</h3>
    <p>We build your presence around your expertise and credibility, not aggressive sales tactics. Content, positioning, and visibility that reflects the serious nature of what you do. Nothing that puts your reputation or your clients at risk. Everything we build is designed to attract the right people and reinforce trust before a single conversation happens.</p>
  </div>

  <div class="faq-item">
    <h3>What does the operations system actually look like for our process?</h3>
    <p>We map your exact process and build around it. Document collection, application stages, country-specific timelines, client communication, deadline tracking - all of it structured into one pipeline. Your team sees exactly where every client is and what needs to happen next. No chasing. No missed deadlines. No relying on spreadsheets or memory.</p>
  </div>

  <div class="faq-item">
    <h3>How long until we see results?</h3>
    <p>The system is live within 30 days. Visibility from SEO and content builds over 60 to 90 days. Publication placements and registry listings can drive enquiries faster. Operations improvements are immediate once the pipeline is active. We scope exactly what to prioritise on your discovery call.</p>
  </div>
</section>
```
- Same styling as homepage FAQ
- Fully visible, no accordion

---

### S5 — Form (Service Page)
Same UX as homepage form but different endpoint and one extra question.

**Formspree endpoint:** https://formspree.io/f/mykrrrkw

**Questions in order:**
1. "Name" — text input
2. "Email" — email input
3. "Business name" — text input
4. "What does your business do?" — text input
5. "Which countries do you cover?" — text input (placeholder: "e.g. Greece, Portugal, Malta, Cyprus, Hungary")
6. "What is your biggest challenge right now?" — textarea
7. "What have you tried and what were the results?" — textarea
8. "What do you hope to get right with us?" — textarea

**After submission:** Same as homepage (book a call or confirmation).

**Integration code:**
```html
<script>
  window.formspree = window.formspree || function () { (formspree.q = formspree.q || []).push(arguments); };
  formspree('initForm', { formElement: '#es-form-migration', formId: 'mykrrrkw' });
</script>
<script src="https://unpkg.com/@formspree/ajax@1" defer></script>
```

---

### Footer (Service Page)
Same as homepage footer with one addition above it:
```html
<p class="back-link">Part of <a href="/">Eccentric Systems</a></p>
```
Styled: Inter 400, 14px, ink 50%, centered, 24px margin below.

---

## PAGE 3: PRIVACY POLICY — eccentricsystems.co/privacy-policy

Simple text page. Same nav and footer as other pages. Cream background, max-width 700px centered, comfortable reading typography.

**Title tag:** Privacy Policy - Eccentric Systems

**Content:**

### Privacy Policy
Last updated: August 2026

Eccentric Systems ("we", "us", "our") is committed to protecting your personal data. This policy explains what we collect, why, and your rights under UK GDPR.

**Who we are**
Eccentric Systems operates at eccentricsystems.co. Contact: mujeeb@eccentricsystems.co

**What data we collect**
- Name, email address, business name, and responses submitted via our enquiry forms
- Usage data: pages visited, time on site, clicks, scroll depth - collected via Microsoft Clarity and Google Analytics 4
- Cookie data: see our Cookie Policy

**Why we collect it**
- To respond to your enquiry and assess how we can help your business
- To improve our website based on how visitors use it
- We do not sell your data to third parties

**How long we keep it**
- Form submissions: retained for 24 months then deleted
- Analytics data: retained per Google and Clarity default retention settings (up to 26 months)

**Who we share it with**
- Formspree (form processing)
- Microsoft Clarity (session recording and heatmaps)
- Google Analytics (website analytics)
- Cal.com (if you book a call)

All processors are GDPR compliant.

**Your rights**
Under UK GDPR you have the right to access, correct, delete, restrict, or object to processing of your data. Email mujeeb@eccentricsystems.co. You may also complain to the ICO at ico.org.uk.

**Cookies**
See our Cookie Policy for full details.

**Changes**
We may update this policy. The date at the top reflects the latest version.

---

## PAGE 4: COOKIE POLICY — eccentricsystems.co/cookie-policy

**Title tag:** Cookie Policy - Eccentric Systems

**Content:**

### Cookie Policy
Last updated: August 2026

**What are cookies**
Small files stored on your device when you visit a website.

**Cookies we use**

| Cookie | Provider | Purpose | Duration |
|---|---|---|---|
| _ga, _ga_2PPX3V33CG | Google Analytics 4 | Tracks page visits and behaviour anonymously | 2 years |
| _clck, _clsk | Microsoft Clarity | Session recording, heatmaps, click tracking | 1 year / 1 day |
| cookie_consent | Eccentric Systems | Stores your cookie preference | 1 year |

**Your choices**
On first visit we ask for consent before placing analytics or tracking cookies. You can accept all or manage preferences. Change your preference anytime by clearing cookies and revisiting.

**Contact**
mujeeb@eccentricsystems.co

---

## PAGE 5: TERMS OF USE — eccentricsystems.co/terms

**Title tag:** Terms of Use - Eccentric Systems

**Content:**

### Terms of Use
Last updated: August 2026

By using eccentricsystems.co you agree to these terms.

**About this site**
Operated by Eccentric Systems. Provides information about our services and allows prospective clients to get in touch.

**Intellectual property**
All content - copy, images, design, brand - is owned by Eccentric Systems. Do not copy, reproduce, or distribute without written permission.

**No professional advice**
Nothing on this site constitutes legal, financial, or regulated advice.

**Accuracy**
We aim to keep information accurate but make no guarantees. We are not liable for decisions made based on information on this site.

**Links**
We are not responsible for third-party sites we link to.

**Liability**
To the fullest extent permitted by law, Eccentric Systems is not liable for any loss or damage from use of this site.

**Governing law**
Laws of England and Wales.

**Changes**
We may update these terms at any time. Continued use means you accept the updated terms.

**Contact**
mujeeb@eccentricsystems.co

---

## TRACKING AND ANALYTICS

### Cookie Consent Banner
Must appear on first visit BEFORE any tracking scripts fire.

```html
<div class="cookie-banner" id="cookie-banner">
  <p>We use cookies to understand how you use our site and improve your experience.</p>
  <div class="cookie-actions">
    <button id="cookie-accept" class="cta cta-primary">Accept all</button>
    <button id="cookie-manage" class="cta cta-secondary">Manage preferences</button>
  </div>
</div>
```
- Style: fixed bottom, cream background, ink text, teal button, subtle shadow above
- On "Accept all": store `cookie_consent=accepted` in localStorage, fire GA4 and Clarity, hide banner
- On "Manage preferences": show options (Analytics: on/off, Session recording: on/off) with a "Save" button
- On reject/decline: store `cookie_consent=rejected`, do NOT fire GA4 or Clarity, hide banner
- Check localStorage on every page load. If consent already stored, either fire scripts or not based on value.

### Google Analytics 4
Only inject AFTER cookie consent is accepted:
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-2PPX3V33CG"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-2PPX3V33CG');
</script>
```

### Microsoft Clarity
Only inject AFTER cookie consent is accepted:
```html
<script type="text/javascript">
  (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "xwsr0lzjpm");
</script>
```

### Event Tracking (GA4)
Track these custom events:
- `form_start` — when user opens the form (begins first question)
- `form_complete` — when form is submitted successfully
- `cta_click` — on every "Get started" or "See how" click, with label of which CTA
- `calendar_click` — when user clicks "Book a call" on completion screen

---

## SEO

### Meta Tags (inject in `<head>` of each page)

**Homepage:**
```html
<title>Eccentric Systems | Business Growth and Operations Systems</title>
<meta name="description" content="We build custom growth and operations systems for business owners. Get more clients and run smoother - from one connected platform. Book a discovery call.">
<link rel="canonical" href="https://eccentricsystems.co/">
<meta property="og:title" content="Eccentric Systems | Business Growth and Operations Systems">
<meta property="og:description" content="We build custom growth and operations systems for business owners. Get more clients and run smoother - from one connected platform.">
<meta property="og:image" content="https://eccentricsystems.co/assets/hero-main.webp">
<meta property="og:url" content="https://eccentricsystems.co/">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Eccentric Systems | Business Growth and Operations Systems">
<meta name="twitter:description" content="We build custom growth and operations systems for business owners.">
<meta name="twitter:image" content="https://eccentricsystems.co/assets/hero-main.webp">
```

**Service page:**
```html
<title>Investment Migration Marketing and Client Management | Eccentric Systems</title>
<meta name="description" content="We help Golden Visa and investment migration brokers get in front of qualified investors and manage every application from first enquiry to approval. Book a call.">
<link rel="canonical" href="https://eccentricsystems.co/investment-migration">
<meta property="og:title" content="Investment Migration Marketing and Client Management | Eccentric Systems">
<meta property="og:description" content="We help Golden Visa and investment migration brokers get in front of qualified investors and manage every application from first enquiry to approval.">
<meta property="og:image" content="https://eccentricsystems.co/assets/hero-gold.webp">
<meta property="og:url" content="https://eccentricsystems.co/investment-migration">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Investment Migration Marketing and Client Management | Eccentric Systems">
<meta name="twitter:description" content="We help Golden Visa and investment migration brokers get in front of qualified investors and manage every application.">
<meta name="twitter:image" content="https://eccentricsystems.co/assets/hero-gold.webp">
```

### Schema Markup (JSON-LD)

**Homepage `<head>`:**
```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Eccentric Systems",
  "url": "https://eccentricsystems.co",
  "description": "Custom business growth and operations systems for business owners.",
  "founder": [
    {
      "@type": "Person",
      "name": "Umar Fahm",
      "sameAs": "https://linkedin.com/in/farouqfahm"
    },
    {
      "@type": "Person",
      "name": "Abdulmujib Aliu Abdulmalik",
      "sameAs": "https://linkedin.com/in/abdulmalikabdulmujib"
    }
  ],
  "sameAs": [
    "https://linkedin.com/in/farouqfahm",
    "https://linkedin.com/in/abdulmalikabdulmujib"
  ]
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does Eccentric Systems do?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We build growth and operations systems for businesses. On the growth side we make sure the right people find you and choose you - through organic content that shows who you are, SEO, paid ads, and AI optimisation so tools like ChatGPT and Gemini recommend you. On the operations side we make sure your business can handle every client without things falling apart - through automated pipelines, structured workflows, and connected tools so nothing relies on memory. Both connect into one dashboard so you always know what is happening."
      }
    },
    {
      "@type": "Question",
      "name": "How do you get us more clients?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We start with your positioning - making sure it is clear who you are and why you are the right choice. From there we build your visibility to make sure you get the attention of your ideal clients. We use organic content to distribute your vision - whether through social media, articles, or podcasts. We use SEO and AI optimisation to make sure your message is attached to your brand and seen by Google and AI tools when people search for what you offer. With every lead source tracked so you always know what is working."
      }
    },
    {
      "@type": "Question",
      "name": "How do you improve our operations?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We map how your business works today then automate the parts that slow you down. Leads get followed up automatically. Clients move through a clear pipeline from first contact to completion. Repetitive tasks run without anyone having to remember them. Your team focuses on the work that actually needs a human. Everything connects so nothing falls through the cracks."
      }
    },
    {
      "@type": "Question",
      "name": "What types of businesses do you work with?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We work with most business types regardless of industry and size."
      }
    },
    {
      "@type": "Question",
      "name": "How is this different from a marketing agency or software?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A marketing agency or software requires either extra time and effort to function or are disjointed from the rest of your business. This is fully integrated and fits right into how your business already operates. Growth and operations connected in one place, running without you having to manage it."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most systems are live within 30 days. The full build - with every layer tested and running - is typically complete within 60 to 90 days. The first 30 days are always the clearest - you will see exactly what is changing and why."
      }
    }
  ]
}
</script>
```

**Service page `<head>` (add Service + FAQ schema):**
```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Investment Migration Marketing and Client Management",
  "description": "We help Golden Visa and investment migration brokers get in front of qualified investors and manage every application from first enquiry to approval.",
  "provider": {
    "@type": "Organization",
    "name": "Eccentric Systems",
    "url": "https://eccentricsystems.co"
  },
  "areaServed": ["United Kingdom", "Europe"]
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do you get us in front of serious investors?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We build your visibility where serious investors already look. That means ranking on Google for the searches they actually use, getting you recommended by AI tools when they ask about residency options, and placing you in publications and registries they trust. We also qualify every lead automatically so only investors who meet your minimums get through. You spend your time on the right conversations, not sifting through people who cannot afford your programs."
      }
    },
    {
      "@type": "Question",
      "name": "We get most clients through referrals. Why do we need this?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Referrals are your best leads. But they are not consistent and you cannot control them. What happens in a slow month? What happens when a referral partner goes quiet? We build the infrastructure that generates enquiries independently of who you know. Your referral network stays intact. You just stop depending on it entirely."
      }
    },
    {
      "@type": "Question",
      "name": "How do you handle the compliance and sensitivity around this industry?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We build your presence around your expertise and credibility, not aggressive sales tactics. Content, positioning, and visibility that reflects the serious nature of what you do. Nothing that puts your reputation or your clients at risk. Everything we build is designed to attract the right people and reinforce trust before a single conversation happens."
      }
    },
    {
      "@type": "Question",
      "name": "What does the operations system actually look like for our process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We map your exact process and build around it. Document collection, application stages, country-specific timelines, client communication, deadline tracking - all of it structured into one pipeline. Your team sees exactly where every client is and what needs to happen next. No chasing. No missed deadlines. No relying on spreadsheets or memory."
      }
    },
    {
      "@type": "Question",
      "name": "How long until we see results?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The system is live within 30 days. Visibility from SEO and content builds over 60 to 90 days. Publication placements and registry listings can drive enquiries faster. Operations improvements are immediate once the pipeline is active. We scope exactly what to prioritise on your discovery call."
      }
    }
  ]
}
</script>
```

### Semantic HTML Rules
- Use `<section aria-label="...">` for every content section
- Use `<header role="banner">` for nav area
- Use `<main role="main">` wrapping all content between nav and footer
- Use `<footer role="contentinfo">`
- Use `<article>` for self-contained items (cards, founder entries)
- Use `<h1>` only once per page
- Use `<h2>` for section headings, `<h3>` for sub-items (FAQ questions, card titles)
- Use `<p>` for all body text (not divs with text)
- All `<a>` tags must have descriptive text (never "click here")
- All `<img>` must have descriptive `alt` text
- All `<button>` must have `aria-label` if text is not self-explanatory

---

## TECHNICAL REQUIREMENTS

### Files to generate:

**robots.txt:**
```
User-agent: *
Allow: /
Sitemap: https://eccentricsystems.co/sitemap.xml
```

**sitemap.xml:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://eccentricsystems.co/</loc>
    <lastmod>2026-08-04</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://eccentricsystems.co/investment-migration</loc>
    <lastmod>2026-08-04</lastmod>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://eccentricsystems.co/privacy-policy</loc>
    <lastmod>2026-08-04</lastmod>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://eccentricsystems.co/cookie-policy</loc>
    <lastmod>2026-08-04</lastmod>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://eccentricsystems.co/terms</loc>
    <lastmod>2026-08-04</lastmod>
    <priority>0.3</priority>
  </url>
</urlset>
```

**404 page:**
Simple branded page. Nav at top. Centered text: "This page does not exist." with a link back to homepage. Same footer.

### Performance Requirements
- All pages load under 3 seconds on 4G mobile
- Hero images: serve WebP with JPG fallback via `<picture>`
- Compress hero images to under 300KB
- Preload Inter font
- No render-blocking resources in `<head>`
- GA4 and Clarity scripts: inject dynamically via JS only after cookie consent (not static in HTML)
- Formspree @formspree/ajax: load with `defer` attribute
- Minify CSS and JS for production

### Mobile Responsiveness
- Breakpoints: 768px (tablet), 480px (mobile)
- Below 768px: all sections single column, cards stack vertically
- H1: 38px mobile, H2: 32px mobile
- Body: 16px mobile
- Hero text: centered, full width
- CTAs: full width pill buttons, stacked vertically, 12px gap
- Nav: same two elements, slightly smaller font sizes
- All touch targets: minimum 44x44px
- No horizontal scroll on any device
- Test: iPhone SE, iPhone 14, Samsung Galaxy S23, iPad

### HTTPS
Site must be served over HTTPS. If hosting on Vercel, Netlify, or similar this is automatic. Do not serve over HTTP.

---

## INTERNAL LINK MAP

```
eccentricsystems.co (homepage)
├── Nav wordmark → /
├── Nav "Get started" → #form (Form 1)
├── S1 "Get started" → #form (Form 1)
├── S1 "See how it works" → #what-we-do (smooth scroll)
├── S2 "Get started" → #form (Form 1)
├── S3 Card 1 "See how" → /investment-migration
├── S3 Card 2 "Tell us about your business" → #form (Form 1)
├── S4 LinkedIn (Umar) → linkedin.com/in/farouqfahm (new tab)
├── S4 LinkedIn (Abdulmujib) → linkedin.com/in/abdulmalikabdulmujib (new tab)
├── Footer wordmark → /
├── Footer LinkedIn x2 → external (new tab)
├── Footer Privacy → /privacy-policy
├── Footer Cookie → /cookie-policy
└── Footer Terms → /terms

eccentricsystems.co/investment-migration (service page)
├── Nav wordmark → /
├── Nav "Get started" → #form (Form 2)
├── S1 "Get started" → #form (Form 2)
├── S1 "See how it works" → #block-01 (smooth scroll)
├── S2 "Get started" → #form (Form 2)
├── S3 "Get started" → #form (Form 2)
├── Above footer "Part of Eccentric Systems" → /
├── Footer wordmark → /
├── Footer LinkedIn x2 → external (new tab)
├── Footer Privacy → /privacy-policy
├── Footer Cookie → /cookie-policy
└── Footer Terms → /terms
```

---

## WHAT IS NOT IN SCOPE

Do NOT build any of the following:
- Blog or content section
- Additional service pages
- Case studies or testimonials
- E-commerce or pricing pages
- Dashboard mockup or interactive demo
- Multilingual versions
- Contact page (form replaces this)
- Social media icons (only LinkedIn in footer)

---

## FINAL CHECKLIST BEFORE HANDOFF

Before considering the build complete, verify:
- [ ] Both hero images display correctly at all viewport sizes
- [ ] All forms submit to correct Formspree endpoints
- [ ] Cal.com link opens correctly from form completion
- [ ] Cookie banner appears on first visit
- [ ] GA4 and Clarity only fire after consent
- [ ] All internal links work
- [ ] Schema validates in Google Rich Results Test
- [ ] PageSpeed Insights score 90+
- [ ] Mobile layout correct on 3 device sizes
- [ ] No em dashes in any rendered text
- [ ] sitemap.xml and robots.txt accessible at root
- [ ] 404 page displays correctly
- [ ] All external links open in new tab with rel="noopener"
- [ ] Footer legal links work on all pages
