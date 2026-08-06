/* ============================================================================
   oneVoice mockup kit — shared chrome, tokens and behaviour for every page.

   A page includes this once in <head> and supplies only its own <main>:

     <script>window.OV = { nav:'news', crumbs:[{label:'News'}] };</script>
     <script src="assets/ov-kit.js"></script>

   Head assets are written during parsing so the Tailwind CDN and its config
   execute in order; chrome is grafted around <main> on DOMContentLoaded.
   Mockup-only technique — the production port renders this from Twig.
   ============================================================================ */
(function(){
  var CFG = window.OV || (window.OV = {});

  document.write(`  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..700&family=Inter:wght@400..700&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            display: ['Fraunces','Georgia','serif'],
            sans: ['Inter','system-ui','-apple-system','sans-serif'],
            /* Logotype face. Closest available match to the outlined wordmark in the
               supplied brand SVG — confirm the real face against the design source. */
            wordmark: ['Poppins','Inter','system-ui','sans-serif'],
          },
          colors: {
            /* Accent = the ONLY per-indication token layer */
            accent: {
              50:'rgb(var(--nv-accent-50) / <alpha-value>)',
              100:'rgb(var(--nv-accent-100) / <alpha-value>)',
              200:'rgb(var(--nv-accent-200) / <alpha-value>)',
              300:'rgb(var(--nv-accent-300) / <alpha-value>)',
              400:'rgb(var(--nv-accent-400) / <alpha-value>)',
              500:'rgb(var(--nv-accent-500) / <alpha-value>)',
              600:'rgb(var(--nv-accent-600) / <alpha-value>)',
              700:'rgb(var(--nv-accent-700) / <alpha-value>)',
              800:'rgb(var(--nv-accent-800) / <alpha-value>)',
              900:'rgb(var(--nv-accent-900) / <alpha-value>)',
              DEFAULT:'rgb(var(--nv-accent-600) / <alpha-value>)',
            },
            /* Warm neutral base — shared by all 100+ indications */
            ink: {
              50:'#F7F5F1',100:'#EEEAE4',200:'#DBD6CE',300:'#B8B2A9',400:'#918B82',
              500:'#6F6A62',600:'#55504A',700:'#3D3934',800:'#2A2723',900:'#1A1815',
            },
          },
          borderRadius: { '4xl':'2rem' },
          boxShadow: {
            card:'0 1px 2px rgba(26,24,21,.05), 0 8px 24px -12px rgba(26,24,21,.14)',
            lift:'0 2px 4px rgba(26,24,21,.06), 0 18px 40px -18px rgba(26,24,21,.24)',
          },
        },
      },
    }
  </script>
  <style>
    /* ---------- TOKENS: neutral base is fixed, accent swaps per tenant ---------- */
    /* Launch pair keeps the established brand maroon #7C1419 (accent-700) so existing
       equity carries over. Communities 3+ get their own hue, proving the token swap. */
    :root, html[data-tenant="amyloidosis"], html[data-tenant="scd"]{
      --nv-accent-50:251 242 242;  --nv-accent-100:247 227 227; --nv-accent-200:239 199 200;
      --nv-accent-300:224 159 161; --nv-accent-400:200 111 114; --nv-accent-500:169 66 71;
      --nv-accent-600:142 36 41;   --nv-accent-700:124 20 25;   --nv-accent-800:102 20 24;
      --nv-accent-900:85 19 23;
    }
    html[data-tenant="ph"]{
      --nv-accent-50:243 244 254;  --nv-accent-100:230 232 253; --nv-accent-200:203 207 250;
      --nv-accent-300:166 171 242; --nv-accent-400:126 132 228; --nv-accent-500:95 100 212;
      --nv-accent-600:74 78 187;   --nv-accent-700:61 63 155;   --nv-accent-800:51 53 125;
      --nv-accent-900:44 46 100;
    }
    html[data-tenant="mg"]{
      --nv-accent-50:253 246 236;  --nv-accent-100:250 235 212; --nv-accent-200:243 213 165;
      --nv-accent-300:232 185 110; --nv-accent-400:217 156 62;  --nv-accent-500:192 128 31;
      --nv-accent-600:158 103 20;  --nv-accent-700:126 81 18;   --nv-accent-800:103 67 20;
      --nv-accent-900:87 57 20;
    }
    html{-webkit-text-size-adjust:100%}
    body{font-family:Inter,system-ui,sans-serif;font-size:16px;line-height:1.6;color:#2A2723;background:#fff}
    .font-display{font-variation-settings:'SOFT' 34,'WONK' 0,'opsz' 64}
    /* Focus visibility — WCAG 2.2 */
    a:focus-visible,button:focus-visible,input:focus-visible,select:focus-visible{
      outline:3px solid rgb(var(--nv-accent-600));outline-offset:2px;border-radius:6px}
    /* Annotation overlay (design-time only) */
    .spec{display:none}
    /* Mobile: notes flow inline above what they describe, so nothing is obscured */
    html[data-notes="on"] .spec{
      display:block;position:static;margin:8px 16px;z-index:40;
      font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:10px;line-height:1.35;
      letter-spacing:.01em;padding:4px 7px;border-radius:5px;
      background:#1A1815;color:#F7F5F1;border:1px dashed #6F6A62;white-space:normal}
    /* Tablet and up: pin them to the edges via each element's inline top/right */
    @media (min-width:768px){
      html[data-notes="on"] .spec{
        display:inline-flex;align-items:center;gap:4px;position:absolute;
        margin:0;max-width:230px;font-size:10px}
    }
    html[data-notes="on"] .spec-target{outline:1px dashed rgba(26,24,21,.35);outline-offset:6px}
    .no-scrollbar::-webkit-scrollbar{display:none}
    .no-scrollbar{scrollbar-width:none}

    /* ---------- Design-time control only. Not part of the component library. ---------- */
    #dt-control{position:fixed;z-index:60;right:12px;bottom:76px;display:flex;align-items:center;gap:6px;
      padding:6px 8px;border-radius:999px;background:rgba(26,24,21,.92);backdrop-filter:blur(6px);
      box-shadow:0 8px 24px -8px rgba(0,0,0,.5)}
    @media (min-width:768px){ #dt-control{bottom:14px} }
    #dt-control button{width:20px;height:20px;border-radius:50%;border:2px solid transparent;cursor:pointer;padding:0}
    #dt-control button[aria-current="true"]{border-color:#fff}
    #dt-control button[data-go="amyloidosis"]{background:#7C1419}
    #dt-control button[data-go="scd"]{background:#7C1419}
    #dt-control button[data-go="ph"]{background:#4A4EBB}
    #dt-control button[data-go="mg"]{background:#9E6714}
    #dt-control label{display:flex;align-items:center;gap:5px;color:#EEEAE4;font-size:11px;
      padding-left:6px;margin-left:2px;border-left:1px solid #55504A;cursor:pointer}
    #dt-control input{width:13px;height:13px;accent-color:#fff;cursor:pointer}
    @media print{ #dt-control{display:none} }
  </style>`);

  var CHROME_TOP = `
  <a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-3 focus:left-3
     focus:bg-ink-900 focus:text-white focus:px-4 focus:py-3 focus:rounded-lg focus:text-[15px] focus:font-medium">
     Skip to main content</a>

  <!-- ============ BRAND MARK — one shared asset, inherits colour from the accent token.
       Paths lifted verbatim from the supplied oneAMYLOIDOSISvoice SVG; fills swapped to
       currentColor so a single mark serves every community. ============ -->
  <svg width="0" height="0" class="absolute" aria-hidden="true" focusable="false">
    <symbol id="ov-mark" viewBox="129.5 9.8 100.9 78.7">
      <path fill="currentColor" d="M175.9,51.4l0,5.7c0,2.7-2.2,4.8-4.8,4.8h-25.6c-1.6,0-2.8-1.3-2.8-2.8V35.2l-5.4-2.7l5.4-2.9v-11 c0-1.6,1.3-2.8,2.8-2.8h27.6c1.6,0,2.8,1.3,2.8,2.8l0,7.2h2l2.1-3.9v-3.2c0-3.9-3.1-7-7-7h-27.6c-3.9,0-7,3.1-7,7v8.9l-8.9,5.1 l8.9,4.7v21.9c0,3.9,3.1,7,7,7h25.6c4.4,0,8-3.1,8.8-7.2V55L175.9,51.4z"/>
      <path fill="currentColor" d="M156.2,72.6c0,3.9,3.1,7,7,7h15.5l5.1,8.9l4.7-8.9h15.3c3.9,0,7-3.1,7-7V47c0-5-4-9-9-9h-13.6v4.2h13.6 c1.7,0,3.1,0.8,4,2.1c0.2,0.3,0.3,0.5,0.4,0.8c0.2,0.6,0.4,1.2,0.4,1.9v25.6c0,1.6-1.3,2.8-2.8,2.8l-17.5,0l-2.5,5.4l-2.9-5.4 h-17.7c-1.6,0-2.8-1.3-2.8-2.8V45c0-1.6,1.3-2.8,2.8-2.8h4.7V38h-4.7c-3.9,0-7,3.1-7,7V72.6z"/>
      <path fill="currentColor" d="M206.6,47c0-0.7-0.2-1.3-0.4-1.9C206.5,45.7,206.6,46.3,206.6,47"/>
      <path fill="currentColor" d="M223.5,18.7h-7.4L211,9.8l-4.7,8.9h-23.4c-1,0-2,0.2-2.8,0.6c-2.4,1.1-4.2,3.5-4.2,6.4v4.2h4.2h0v-4.2 c0-1.6,1.3-2.8,2.8-2.8l25.3,0l2.8-5.4l2.9,5.4h9.5c1.6,0,2.8,1.3,2.8,2.8v27.6c0,1.6-1.3,2.8-2.8,2.8h-38.6c-1.8,0-3.4-1-4.2-2.5 c-0.4-0.7-0.6-1.5-0.6-2.3v-1.2h-4.2l0,1.2c0,3.1,1.6,5.8,4,7.5c1.4,1,3.2,1.5,5,1.5h38.6c3.9,0,7-3.1,7-7V25.8 C230.5,21.9,227.3,18.7,223.5,18.7"/>
      <polygon fill="currentColor" points="175.9,38 175.9,32.7 180.1,32.7 180.1,38 185.4,38 185.4,42.2 180.1,42.2 180.1,47.4 175.9,47.4 175.9,42.2 170.7,42.2 170.7,38"/>
    </symbol>
  </svg>

  <!-- ============ UTILITY BAR: cross-tenant switcher = internal linking at scale ============ -->
  <div class="bg-ink-900 text-ink-200 text-[13px]">
    <div class="mx-auto max-w-[1240px] 2xl:max-w-[1440px] px-4 sm:px-6 lg:px-8 h-11 flex items-center justify-between gap-4">
      <div class="flex items-center gap-2 min-w-0">
        <svg class="w-4 h-4 shrink-0 text-accent-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
        <span class="truncate">Part of Somebody To Talk To — <a href="#" class="underline decoration-ink-500 underline-offset-2 hover:text-white">100+ patient communities</a></span>
      </div>
      <div class="hidden sm:flex items-center gap-5 shrink-0">
        <a href="#" class="hover:text-white py-2">For clinicians</a>
        <a href="#" class="hover:text-white py-2">Español</a>
      </div>
    </div>
  </div>

  <!-- ============ HEADER ============ -->
  <header class="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-ink-200">
    <div class="mx-auto max-w-[1240px] 2xl:max-w-[1440px] px-4 sm:px-6 lg:px-8">
      <div class="h-16 lg:h-20 flex items-center gap-3 lg:gap-8">

        <!-- Logo lockup — the real brand pattern: shared mark + one{CODE}voice wordmark.
             Set as live text rather than artwork, so a new community needs a config entry,
             not a new logo file. The mark inherits the accent token via currentColor. -->
        <a href="#" class="flex items-center gap-2 sm:gap-2.5 min-w-0 py-2 -my-2" data-t-alt="lockupAria" aria-label="Amyloidosis — oneVoice, home">
          <svg class="w-8 h-6 sm:w-9 sm:h-7 lg:w-11 lg:h-[34px] shrink-0 text-accent-600" aria-hidden="true" focusable="false"><use href="#ov-mark"/></svg>
          <!-- Mark-only under 360px: the longest real code (AMYLOIDOSIS) cannot sit beside
               search and menu at a legible size on the narrowest phones. truncate is the
               backstop for codes longer than any config should supply. -->
          <span class="hidden min-[360px]:inline-block max-w-full truncate align-middle
                       font-wordmark text-[16.5px] sm:text-[19px] lg:text-[22px] leading-none
                       whitespace-nowrap text-ink-800">
            <span class="font-light">one</span><span class="font-semibold text-accent-700" data-t="wordmark">AMYLOIDOSIS</span><span class="font-light">voice</span>
          </span>
        </a>

        <!-- Horizontal nav starts at lg. Below that the hamburger + bottom tab bar carry navigation:
             5 items plus a long condition name will not fit at 834px for every indication. -->
        <nav class="hidden lg:flex items-center gap-1 xl:gap-2 ml-auto" aria-label="Main">
          <a href="#" class="shrink-0 whitespace-nowrap px-3 py-2.5 rounded-lg text-[15px] font-medium text-accent-800 bg-accent-50">Clinical trials</a>
          <a href="#" class="shrink-0 whitespace-nowrap px-3 py-2.5 rounded-lg text-[15px] font-medium text-ink-700 hover:bg-ink-100">Learn</a>
          <a href="#" class="shrink-0 whitespace-nowrap px-3 py-2.5 rounded-lg text-[15px] font-medium text-ink-700 hover:bg-ink-100">Community</a>
          <a href="#" class="shrink-0 whitespace-nowrap px-3 py-2.5 rounded-lg text-[15px] font-medium text-ink-700 hover:bg-ink-100">Find an expert</a>
          <a href="#" class="shrink-0 whitespace-nowrap px-3 py-2.5 rounded-lg text-[15px] font-medium text-ink-700 hover:bg-ink-100">About</a>
        </nav>

        <div class="flex items-center gap-1.5 ml-auto lg:ml-0 shrink-0">
          <button class="w-11 h-11 grid place-items-center rounded-full text-ink-600 hover:bg-ink-100" aria-label="Search">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </button>
          <a href="#" class="hidden xl:inline-flex items-center h-11 px-4 rounded-full bg-ink-900 text-white text-[15px] font-semibold whitespace-nowrap hover:bg-ink-800">Get updates</a>
          <button class="lg:hidden w-11 h-11 grid place-items-center rounded-full text-ink-700 hover:bg-ink-100"
                  aria-label="Open menu" aria-expanded="false" aria-controls="menu-sheet" data-menu-open>
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></svg>
          </button>
        </div>
      </div>
    </div>
  </header>

  <!-- ============ BREADCRUMB (tenant home = one level below network root) ============ -->
  <nav aria-label="Breadcrumb" class="relative border-b border-ink-100 bg-ink-50">
    <span class="spec" style="top:6px;right:8px">BreadcrumbList schema · all templates</span>
    <ol class="mx-auto max-w-[1240px] 2xl:max-w-[1440px] px-4 sm:px-6 lg:px-8 py-2.5 flex items-center gap-1.5 text-[13px] text-ink-500 overflow-x-auto no-scrollbar">
      <li><a href="#" class="hover:text-accent-700 py-1 whitespace-nowrap">oneVoice</a></li>
      <li aria-hidden="true"><svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="m9 18 6-6-6-6"/></svg></li>
      <li aria-current="page" class="font-medium text-ink-700 whitespace-nowrap" data-t="name">Amyloidosis</li>
    </ol>
  </nav>
`;

  var CHROME_BOTTOM = `  <!-- ============ FOOTER — SEO surface + cross-tenant internal linking ============ -->
  <footer class="relative bg-ink-50 border-t border-ink-200">
    <span class="spec" style="top:10px;right:10px">Cross-indication links: 100 tenants → network-wide topical authority</span>
    <div class="mx-auto max-w-[1240px] 2xl:max-w-[1440px] px-4 sm:px-6 lg:px-8 py-9 lg:py-10">
      <div class="grid gap-9 sm:grid-cols-2 lg:grid-cols-4">
        <nav aria-labelledby="f1">
          <h2 id="f1" class="text-[13px] font-semibold uppercase tracking-[.1em] text-ink-500" data-t="name">Amyloidosis</h2>
          <ul class="mt-3.5 space-y-1">
            <li><a href="#" class="block py-1.5 text-[15px] text-ink-700 hover:text-accent-700" data-t="fl0">What is amyloidosis?</a></li>
            <li><a href="#" class="block py-1.5 text-[15px] text-ink-700 hover:text-accent-700">Symptoms &amp; diagnosis</a></li>
            <li><a href="#" class="block py-1.5 text-[15px] text-ink-700 hover:text-accent-700">Treatment options</a></li>
            <li><a href="#" class="block py-1.5 text-[15px] text-ink-700 hover:text-accent-700">Clinical trials</a></li>
            <li><a href="#" class="block py-1.5 text-[15px] text-ink-700 hover:text-accent-700">Find a specialist</a></li>
          </ul>
        </nav>
        <nav aria-labelledby="f2">
          <h2 id="f2" class="text-[13px] font-semibold uppercase tracking-[.1em] text-ink-500">Community</h2>
          <ul class="mt-3.5 space-y-1">
            <li><a href="#" class="block py-1.5 text-[15px] text-ink-700 hover:text-accent-700">Patient stories</a></li>
            <li><a href="#" class="block py-1.5 text-[15px] text-ink-700 hover:text-accent-700">Caregiver hub</a></li>
            <li><a href="#" class="block py-1.5 text-[15px] text-ink-700 hover:text-accent-700">Events &amp; webinars</a></li>
            <li><a href="#" class="block py-1.5 text-[15px] text-ink-700 hover:text-accent-700">Support groups</a></li>
          </ul>
        </nav>
        <nav aria-labelledby="f3">
          <h2 id="f3" class="text-[13px] font-semibold uppercase tracking-[.1em] text-ink-500">About oneVoice</h2>
          <ul class="mt-3.5 space-y-1">
            <li><a href="#" class="block py-1.5 text-[15px] text-ink-700 hover:text-accent-700">Who we are</a></li>
            <li><a href="#" class="block py-1.5 text-[15px] text-ink-700 hover:text-accent-700">Editorial policy</a></li>
            <li><a href="#" class="block py-1.5 text-[15px] text-ink-700 hover:text-accent-700">Medical review board</a></li>
            <li><a href="#" class="block py-1.5 text-[15px] text-ink-700 hover:text-accent-700">Funding &amp; partners</a></li>
            <li><a href="#" class="block py-1.5 text-[15px] text-ink-700 hover:text-accent-700">Contact</a></li>
          </ul>
        </nav>
        <div>
          <h2 class="text-[13px] font-semibold uppercase tracking-[.1em] text-ink-500">Other communities</h2>
          <ul class="mt-3.5 flex flex-wrap gap-2" data-others>
            <li><a href="#" class="inline-flex items-center min-h-[36px] px-3 rounded-full bg-white border border-ink-200 text-[14px] text-ink-700 hover:border-accent-400 hover:text-accent-700">Sickle Cell Disease</a></li>
            <li><a href="#" class="inline-flex items-center min-h-[36px] px-3 rounded-full bg-white border border-ink-200 text-[14px] text-ink-700 hover:border-accent-400 hover:text-accent-700">Pulmonary Hypertension</a></li>
            <li><a href="#" class="inline-flex items-center min-h-[36px] px-3 rounded-full bg-white border border-ink-200 text-[14px] text-ink-700 hover:border-accent-400 hover:text-accent-700">Myasthenia Gravis</a></li>
            <li><a href="#" class="inline-flex items-center min-h-[36px] px-3 rounded-full bg-white border border-ink-200 text-[14px] text-ink-700 hover:border-accent-400 hover:text-accent-700">Haemophilia</a></li>
            <li><a href="#" class="inline-flex items-center min-h-[36px] px-3 rounded-full bg-ink-900 text-white text-[14px] font-medium hover:bg-ink-800">All 100+ →</a></li>
          </ul>
        </div>
      </div>

      <div class="mt-11 pt-7 border-t border-ink-200 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div class="flex flex-wrap items-center gap-x-5 gap-y-3">
          <div class="flex items-center gap-2.5">
            <svg class="w-10 h-8 shrink-0 text-accent-600" aria-hidden="true" focusable="false"><use href="#ov-mark"/></svg>
            <span class="font-wordmark text-[19px] leading-none whitespace-nowrap text-ink-800">
              <span class="font-light">one</span><span class="font-semibold text-accent-700" data-t="wordmark">AMYLOIDOSIS</span><span class="font-light">voice</span>
            </span>
          </div>
          <!-- Parent brand: the network these communities belong to -->
          <p class="flex items-center gap-2.5 text-[13px] text-ink-500 border-l border-ink-200 pl-5">
            Part of
            <a href="#" class="inline-flex items-center" aria-label="Somebody To Talk To">
              <!-- Parent-brand artwork from the same partner API (tid 13459) -->
              <span class="flex items-center" data-logo="13459" data-cap="max-h-7 max-w-[148px]">
                <span class="text-[13px] font-semibold text-ink-700" data-logo-fallback>Somebody To Talk To</span>
              </span>
            </a>
          </p>
        </div>
        <p class="text-[13.5px] leading-relaxed text-ink-500 lg:max-w-xl">
          Information on oneVoice is for education only and is not a substitute for advice from your own
          healthcare team. © 2026 oneVoice. <a href="#" class="underline underline-offset-2 hover:text-ink-700">Privacy</a> ·
          <a href="#" class="underline underline-offset-2 hover:text-ink-700">Terms</a> ·
          <a href="#" class="underline underline-offset-2 hover:text-ink-700">Accessibility</a>
        </p>
      </div>
    </div>
  </footer>

  <!-- ============ MENU SHEET — covers mobile and tablet, i.e. everything below lg.
       Slides from the right, traps focus, closes on Esc / backdrop / link. ============ -->
  <div id="menu-sheet" class="lg:hidden fixed inset-0 z-50 hidden" role="dialog" aria-modal="true"
       aria-label="Menu" data-menu-sheet>
    <div class="absolute inset-0 bg-ink-900/50 opacity-0 transition-opacity duration-200"
         data-menu-backdrop></div>

    <div class="absolute inset-y-0 right-0 w-[min(23rem,88vw)] bg-white shadow-lift flex flex-col
                translate-x-full transition-transform duration-200 ease-out" data-menu-panel>

      <div class="flex items-center justify-between gap-3 px-5 h-16 border-b border-ink-200 shrink-0">
        <span class="font-wordmark text-[17px] leading-none text-ink-800">
          <span class="font-light">one</span><span class="font-semibold text-accent-700" data-t="wordmark">AMYLOIDOSIS</span><span class="font-light">voice</span>
        </span>
        <button class="w-11 h-11 -mr-2 grid place-items-center rounded-full text-ink-700 hover:bg-ink-100"
                aria-label="Close menu" data-menu-close>
          <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>

      <div class="flex-1 overflow-y-auto overscroll-contain px-5 py-5">
        <form class="relative" role="search" onsubmit="return false">
          <label for="menu-search" class="sr-only">Search this community</label>
          <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-ink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input id="menu-search" type="search" placeholder="Search trials, articles, experts"
                 class="w-full min-h-[48px] pl-11 pr-4 rounded-full bg-ink-50 border border-ink-200
                        text-[16px] text-ink-900 placeholder:text-ink-400 focus:border-accent-600 focus:ring-0">
        </form>

        <nav class="mt-5" aria-label="Menu">
          <ul class="divide-y divide-ink-100 border-y border-ink-100">
            <li><a href="#" class="flex items-center justify-between gap-3 min-h-[54px] text-[17px] font-medium text-accent-800" data-menu-link>
              Clinical trials
              <svg class="w-4 h-4 text-ink-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></a></li>
            <li><a href="#" class="flex items-center justify-between gap-3 min-h-[54px] text-[17px] font-medium text-ink-800" data-menu-link>
              Learn
              <svg class="w-4 h-4 text-ink-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></a></li>
            <li><a href="#" class="flex items-center justify-between gap-3 min-h-[54px] text-[17px] font-medium text-ink-800" data-menu-link>
              Community
              <svg class="w-4 h-4 text-ink-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></a></li>
            <li><a href="#" class="flex items-center justify-between gap-3 min-h-[54px] text-[17px] font-medium text-ink-800" data-menu-link>
              Find an expert
              <svg class="w-4 h-4 text-ink-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></a></li>
            <li><a href="#" class="flex items-center justify-between gap-3 min-h-[54px] text-[17px] font-medium text-ink-800" data-menu-link>
              About
              <svg class="w-4 h-4 text-ink-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></a></li>
          </ul>
        </nav>

        <a href="#" class="mt-5 flex items-center justify-center min-h-[50px] px-5 rounded-full
                  bg-accent-600 text-white text-[16px] font-semibold hover:bg-accent-700" data-menu-link>Get updates</a>

        <div class="mt-6 pt-5 border-t border-ink-200">
          <p class="text-[12px] font-semibold uppercase tracking-[.12em] text-ink-500">Other communities</p>
          <ul class="mt-3 flex flex-wrap gap-2" data-menu-others></ul>
        </div>

        <ul class="mt-6 pt-5 border-t border-ink-200 space-y-1 text-[15px]">
          <li><a href="#" class="flex items-center min-h-[44px] text-ink-700" data-menu-link>For clinicians</a></li>
          <li><a href="#" class="flex items-center min-h-[44px] text-ink-700" data-menu-link>Español</a></li>
        </ul>
      </div>
    </div>
  </div>

  <!-- ============ THUMB NAV — fixed, 44px+ targets, covers mobile AND tablet (below lg) ============ -->
  <nav class="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/97 backdrop-blur border-t border-ink-200
              pb-[env(safe-area-inset-bottom)]" aria-label="Quick navigation">
    <ul class="grid grid-cols-5">
      <li><a href="#" aria-current="page" class="flex flex-col items-center justify-center gap-1 h-[58px] text-accent-700">
        <svg class="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H10v7H5a1 1 0 0 1-1-1z"/></svg>
        <span class="text-[11px] font-semibold">Home</span></a></li>
      <li><a href="#" class="flex flex-col items-center justify-center gap-1 h-[58px] text-ink-500">
        <svg class="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 2v7.5a2 2 0 0 1-.2.9L4.7 20.6a1 1 0 0 0 .9 1.4h12.8a1 1 0 0 0 .9-1.4l-5.1-10.2a2 2 0 0 1-.2-.9V2"/><path d="M8.5 2h7"/></svg>
        <span class="text-[11px] font-medium">Trials</span></a></li>
      <li><a href="#" class="flex flex-col items-center justify-center gap-1 h-[58px] text-ink-500">
        <svg class="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/></svg>
        <span class="text-[11px] font-medium">Learn</span></a></li>
      <li><a href="#" class="flex flex-col items-center justify-center gap-1 h-[58px] text-ink-500">
        <svg class="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/></svg>
        <span class="text-[11px] font-medium">Community</span></a></li>
      <li><button class="w-full flex flex-col items-center justify-center gap-1 h-[58px] text-ink-500"
                  aria-label="Open menu" aria-expanded="false" aria-controls="menu-sheet" data-menu-open>
        <svg class="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></svg>
        <span class="text-[11px] font-medium">More</span></button></li>
    </ul>
  </nav>
</div>
`;


  /* Graft the shared chrome around whatever <main> the page supplied. */
  function mountChrome(){
    if (document.querySelector('[data-ov-chrome]')) return;
    var main = document.querySelector('main');
    if (!main) return;
    var wrap = document.createElement('div');
    wrap.setAttribute('data-ov-chrome','');
    wrap.className = 'antialiased text-ink-800 bg-white pb-16 lg:pb-0';
    main.parentNode.insertBefore(wrap, main);
    wrap.insertAdjacentHTML('afterbegin', CHROME_TOP);
    wrap.appendChild(main);
    wrap.insertAdjacentHTML('beforeend', CHROME_BOTTOM);
    markActiveNav();
    buildCrumbs();
  }

  /* Highlight the current section in both the desktop nav and the menu sheet. */
  function markActiveNav(){
    var key = CFG.nav;
    if (!key) return;
    var MAP = { trials:'Clinical trials', learn:'Learn', community:'Community',
                experts:'Find an expert', about:'About' };
    var label = MAP[key];
    Array.prototype.forEach.call(document.querySelectorAll('nav[aria-label="Main"] a, [data-menu-sheet] nav a'), function(a){
      var on = a.textContent.trim() === label;
      a.classList.toggle('bg-accent-50', on && a.closest('nav[aria-label="Main"]') !== null);
      a.classList.toggle('text-accent-800', on);
      a.classList.toggle('text-ink-700', !on);
      if (on) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current');
    });
  }

  /* Breadcrumb from CFG.crumbs; the community name is injected by the tenant layer. */
  function buildCrumbs(){
    var ol = document.querySelector('nav[aria-label="Breadcrumb"] ol');
    if (!ol) return;
    var sep = '<li aria-hidden="true"><svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="m9 18 6-6-6-6"/></svg></li>';
    var html = '<li><a href="#" class="hover:text-accent-700 py-1 whitespace-nowrap">oneVoice</a></li>' + sep +
               '<li><a href="onevoice-homepage.mockup.html" class="hover:text-accent-700 py-1 whitespace-nowrap" data-t="name">Amyloidosis</a></li>';
    (CFG.crumbs || []).forEach(function(c, i, arr){
      var last = i === arr.length - 1;
      html += sep + '<li' + (last ? ' aria-current="page" class="font-medium text-ink-700 whitespace-nowrap"' : ' class="whitespace-nowrap"') + '>' +
              (last ? c.label : '<a href="' + (c.href || '#') + '" class="hover:text-accent-700 py-1">' + c.label + '</a>') + '</li>';
    });
    ol.innerHTML = html;
  }

  document.addEventListener('DOMContentLoaded', mountChrome);

    /* =====================================================================
       TENANT LAYER — everything below is data, not markup.
       In production this is config/tenants/*.ts (identity + counts) plus
       JSON:API responses filtered by domain_access (editorial content).
       No component, template or class name changes per indication.
       ===================================================================== */
    var TENANTS = {
      amyloidosis: {
        wordmark:'AMYLOIDOSIS', name:'Amyloidosis', nameLower:'amyloidosis', shortName:'Amyloidosis', domainId:'oneamyloidosisvoice', hostname:'oneamyloidosisvoice.com',
        subtypes:'ATTR and AL amyloidosis', specialists:'amyloidosis specialists',
        trials:'42', articles:'186', centres:'26',
        heroAlt:'A woman in her sixties talking with her adult daughter in a bright kitchen',
        heroCaption:'Marta, living with ATTR-CM since 2019, and her daughter Elena.',
        a1tag:'Diagnosis', a1read:'6 min read',
        a1t:'The 5 tests used to confirm ATTR amyloidosis',
        a1d:'What each test looks for, what to expect on the day, and the questions worth asking.',
        a2tag:'Treatment', a2read:'9 min read',
        a2t:'Living with a stabiliser: side effects and daily routine',
        a2d:'Practical strategies from people two or more years into treatment.',
        pop:['Is amyloidosis hereditary? What families should know',
             'Questions to ask at your first cardiology appointment',
             'AL vs ATTR amyloidosis: how they differ',
             'Travelling with a rare disease: a checklist'],
        r1:'Dr A. Okafor, MD', r2:'Dr L. Haugen, PhD',
        quote:'“It took four years and six doctors to get my diagnosis. I want the next person to find it in four weeks.”',
        quoteBy:'Marta R.', quoteMeta:'— living with ATTR-CM, Valencia', firstName:'Marta',
        /* Real taxonomy terms from the STTT partner API */
        partnerTids:[{tid:11,    name:'Pfizer'},
                     {tid:12740, name:'Amyloidosis Foundation'},
                     {tid:12353, name:'Amyloidosis Support Groups'},
                     {tid:12352, name:'Amyloidosis Army'}],
        hcp:'Filter 42 open studies by phase and site, download the 2026 diagnostic pathway, or refer a patient to a specialist centre.',
        /* Spotlight Series — partner programmes featured month by month.
           Newest first. `partners` are keys resolved against the STTT logo API,
           never hardcoded image URLs. A community with no series renders nothing. */
        spotlight:[
          {month:'August 2026', name:'Vanderbilt Amyloidosis Multidisciplinary Program',
           blurb:'Meet the multidisciplinary team and watch the recorded sessions.',
           partners:[{tid:12351, name:'Vanderbilt Health'}], slug:'vanderbilt'},
          {month:'July 2026', name:'City of Hope Amyloidosis Program',
           blurb:'Meet the programme team, explore its sessions and patient resources.',
           partners:[{tid:12759, name:'City of Hope'}], slug:'cityofhope'},
          {month:'June 2026', name:'University of Chicago & Endeavor Health',
           blurb:'Two partner centres, one shared spotlight — sessions from both teams.',
           partners:[{tid:12758, name:'University of Chicago'},
                     {tid:12761, name:'Endeavor Health'}], slug:'uchicago'}
        ],
        news:[
          {k:'Research', d:'2026-07-28', dl:'28 Jul 2026', t:'ATTR-CM trial reports 30% fewer hospitalisations at 30 months'},
          {k:'Access',   d:'2026-07-21', dl:'21 Jul 2026', t:'NICE opens consultation on wider access to tafamidis'},
          {k:'Community',d:'2026-07-14', dl:'14 Jul 2026', t:'Amyloidosis Awareness Month: what the community achieved'},
          {k:'Living well', d:'2026-07-07', dl:'7 Jul 2026', t:'Fatigue and pacing: what actually helped our members'}
        ],
        sessions:[
          {d:'2026-08-12', dd:'12', mm:'Aug', t:'Ask the specialist: living with cardiac amyloidosis', w:'19:00–20:00 BST', m:'Online'},
          {d:'2026-09-03', dd:'3',  mm:'Sep', t:'Newly diagnosed? A starter session for patients and carers', w:'18:30–19:30 BST', m:'Online'},
          {d:'2026-09-24', dd:'24', mm:'Sep', t:'Family screening and genetic counselling Q&A', w:'17:00–18:00 BST', m:'Online + Manchester'}
        ]
      },
      scd: {
        wordmark:'SCD', name:'Sickle Cell Disease', nameLower:'sickle cell disease', shortName:'Sickle Cell', domainId:'onescdvoice', hostname:'onescdvoice.com',
        subtypes:'HbSS, HbSC and sickle beta thalassaemia', specialists:'haematology specialists',
        trials:'58', articles:'204', centres:'41',
        heroAlt:'A young man laughing with his mother on a sofa at home',
        heroCaption:'Daniel, living with HbSS since birth, and his mother Grace.',
        a1tag:'Living well', a1read:'7 min read',
        a1t:'What to do when a pain crisis starts at home',
        a1d:'A step-by-step plan you can share with family, your school or your employer.',
        a2tag:'Treatment', a2read:'11 min read',
        a2t:'Hydroxyurea, voxelotor and gene therapy: how treatments compare',
        a2d:'What each option does, who it suits, and the questions to ask your haematologist.',
        pop:['Sickle cell trait: what it means for your children',
             'Getting proper pain relief in A&E: know your rights',
             'Newborn screening, explained',
             'Travelling with sickle cell: a checklist'],
        r1:'Dr N. Mensah, MD', r2:'Dr P. Iyer, PhD',
        quote:'“For eleven years I was told my pain was exaggerated. Now I bring a written care plan to every visit.”',
        quoteBy:'Daniel A.', quoteMeta:'— living with HbSS, Birmingham', firstName:'Daniel',
        /* The API holds no SCD-specific advocacy partners yet — the grid takes any count */
        partnerTids:[{tid:11,    name:'Pfizer'},
                     {tid:13459, name:'Somebody To Talk To'}],
        hcp:'Filter 58 open studies by phase and site, download the 2026 acute pain pathway, or refer a patient to a specialist centre.',
        news:[
          {k:'Treatment', d:'2026-07-29', dl:'29 Jul 2026', t:'Gene therapy approved for severe sickle cell disease in under-18s'},
          {k:'Care',      d:'2026-07-22', dl:'22 Jul 2026', t:'New A&E pain pathway rolls out across 40 NHS trusts'},
          {k:'Community', d:'2026-07-15', dl:'15 Jul 2026', t:'Donor drive doubles matched blood units for sickle cell patients'},
          {k:'Living well', d:'2026-07-08', dl:'8 Jul 2026', t:'Staying hydrated in a heatwave: what members recommend'}
        ],
        sessions:[
          {d:'2026-08-14', dd:'14', mm:'Aug', t:'Managing a pain crisis: building your care plan', w:'18:00–19:00 BST', m:'Online'},
          {d:'2026-09-05', dd:'5',  mm:'Sep', t:'Transition clinic: moving from paediatric to adult care', w:'17:30–18:30 BST', m:'Online'},
          {d:'2026-09-26', dd:'26', mm:'Sep', t:'Sickle cell and work: your rights explained', w:'12:30–13:30 BST', m:'Online + Birmingham'}
        ]
      },
      ph: {
        wordmark:'PH', name:'Pulmonary Hypertension', nameLower:'pulmonary hypertension', shortName:'Pulmonary Hypertension',
        subtypes:'PAH and CTEPH', specialists:'PH specialists',
        trials:'31', articles:'142', centres:'19',
        heroAlt:'A woman resting on a park bench with her partner after a short walk',
        heroCaption:'Aisha, living with PAH since 2021, and her partner Ben.',
        a1tag:'Diagnosis', a1read:'8 min read',
        a1t:'The right-heart catheter test: what to expect',
        a1d:'Why it is still the gold standard, how long it takes, and recovery on the day.',
        a2tag:'Treatment', a2read:'10 min read',
        a2t:'Combination therapy in PAH: how treatment escalates',
        a2d:'How clinicians decide when to add a second or third drug, and what to watch for.',
        pop:['Breathlessness diary: how to track your symptoms',
             'Oxygen and flying: planning a trip',
             'PAH vs CTEPH: how they differ',
             'Exercise with PH: what is safe'],
        r1:'Dr M. Duarte, MD', r2:'Dr S. Volkov, PhD',
        quote:'“Two years of being told it was asthma. One test changed everything about my care.”',
        quoteBy:'Aisha K.', quoteMeta:'— living with PAH, Manchester', firstName:'Aisha',
        partnerTids:[{tid:11, name:'Pfizer'}],
        hcp:'Filter 31 open studies by phase and site, download the 2026 diagnostic algorithm, or refer a patient to a specialist centre.',
        news:[
          {k:'Research',  d:'2026-07-27', dl:'27 Jul 2026', t:'Triple therapy improves six-minute walk distance in PAH'},
          {k:'Access',    d:'2026-07-20', dl:'20 Jul 2026', t:'Home oxygen assessment waits halve in pilot regions'},
          {k:'Community', d:'2026-07-13', dl:'13 Jul 2026', t:'PH awareness walk raises £180,000 for specialist nursing'},
          {k:'Living well', d:'2026-07-06', dl:'6 Jul 2026', t:'Pacing on stairs and hills: small changes that helped'}
        ],
        sessions:[
          {d:'2026-08-11', dd:'11', mm:'Aug', t:'Breathlessness and pacing: a practical workshop', w:'18:00–19:00 BST', m:'Online'},
          {d:'2026-09-02', dd:'2',  mm:'Sep', t:'Understanding your right-heart catheter results', w:'19:00–20:00 BST', m:'Online'},
          {d:'2026-09-23', dd:'23', mm:'Sep', t:'Travel, altitude and oxygen: planning ahead', w:'17:00–18:00 BST', m:'Online + Manchester'}
        ]
      },
      mg: {
        wordmark:'MG', name:'Myasthenia Gravis', nameLower:'myasthenia gravis', shortName:'Myasthenia Gravis',
        subtypes:'AChR- and MuSK-antibody myasthenia', specialists:'neuromuscular specialists',
        trials:'24', articles:'118', centres:'22',
        heroAlt:'A man reading with his young son at the end of the afternoon',
        heroCaption:'Tomas, living with generalised MG since 2020, and his son Piotr.',
        a1tag:'Symptoms', a1read:'5 min read',
        a1t:'Why symptoms get worse as the day goes on',
        a1d:'Fatigable weakness explained, and how to plan your day around it.',
        a2tag:'Treatment', a2read:'12 min read',
        a2t:'Thymectomy, steroids and FcRn blockers: comparing options',
        a2d:'What the evidence shows for each, and the order treatments are usually tried.',
        pop:['Myasthenic crisis: the warning signs to act on',
             'Medicines to avoid with myasthenia gravis',
             'Ocular vs generalised MG: how they differ',
             'Heat, stress and flare-ups: practical tips'],
        r1:'Dr R. Adeyemi, MD', r2:'Dr K. Larsen, PhD',
        quote:'“My eyelid drooped for a year before anyone joined the dots. I want that year back for someone else.”',
        quoteBy:'Tomas L.', quoteMeta:'— living with generalised MG, Kraków', firstName:'Tomas',
        partnerTids:[{tid:11, name:'Pfizer'}],
        hcp:'Filter 24 open studies by phase and site, download the 2026 treatment pathway, or refer a patient to a specialist centre.',
        news:[
          {k:'Treatment', d:'2026-07-30', dl:'30 Jul 2026', t:'Second FcRn blocker recommended for generalised myasthenia gravis'},
          {k:'Research',  d:'2026-07-23', dl:'23 Jul 2026', t:'Registry data links earlier thymectomy to lower steroid burden'},
          {k:'Community', d:'2026-07-16', dl:'16 Jul 2026', t:'Myasthenia awareness campaign reaches two million people'},
          {k:'Living well', d:'2026-07-09', dl:'9 Jul 2026', t:'Eyelid crutches and prisms: what members found useful'}
        ],
        sessions:[
          {d:'2026-08-13', dd:'13', mm:'Aug', t:'Fatigue, heat and flare-ups: managing daily energy', w:'18:00–19:00 BST', m:'Online'},
          {d:'2026-09-04', dd:'4',  mm:'Sep', t:'Medicines to avoid: a pharmacist Q&A', w:'19:00–20:00 BST', m:'Online'},
          {d:'2026-09-25', dd:'25', mm:'Sep', t:'Living with MG: a session for carers', w:'17:30–18:30 BST', m:'Online + Kraków'}
        ]
      }
    };

    /* Derived strings — the SEO/copy patterns every indication inherits */
    var DERIVED = {
      h1:        function(t){ return t.name + ': information, clinical trials and community support'; },
      eyebrow:   function(t){ return 'Reviewed by ' + t.specialists; },
      cardTrials:function(t){ return 'Search ' + t.trials + ' active ' + t.nameLower + ' studies by location, phase and eligibility.'; },
      cardExpert:function(t){ return t.centres + ' specialist centres and clinicians, searchable by country.'; },
      trust:     function(t){ return 'oneVoice ' + t.name + ' is supported by an independent medical education grant from '; },
      fl0:       function(t){ return 'What is ' + t.nameLower + '?'; },
      /* Chrome label: shortName when config supplies one, else the full name */
      lockup:    function(t){ return t.shortName || t.name; },
      /* Spoken label: the wordmark reads badly letter-by-letter to a screen reader */
      lockupAria:function(t){ return t.name + ' — oneVoice, home'; },
      newsH2:    function(t){ return 'Latest ' + t.nameLower + ' news'; },
      sessionsH2:function(t){ return 'Upcoming ' + t.nameLower + ' sessions'; },
      newsIntro: function(t){ return 'Research, access and community updates, dated and clinician-checked.'; },
      spotlightH2:function(t){ return 'Learn more about our ' + t.name + ' Program Spotlight Series'; },
      /* While the imagery is stock, alt text and captions must describe the actual
         photograph rather than a named patient — the models are not those people.
         Delete these three once commissioned photography lands and the per-tenant
         heroAlt / videoAlt / heroCaption values take over again. */
      heroAlt:    function(t){ return 'A patient discussing her test results with her consultant'; },
      videoAlt:   function(t){ return 'A patient talking with her care team during an appointment'; },
      heroCaption:function(t){ return 'Appointments go better with your questions written down first.'; },
      watch:     function(t){ return 'Watch ' + t.firstName + '’s story'; }
      /* videoAlt intentionally lives above with the other stock-photo overrides —
         a second definition here would silently win, since later keys shadow earlier ones. */
    };

    (function(){
      var ORDER = ['amyloidosis','scd','ph','mg'];

      function value(t, key){
        if (key.indexOf('pop') === 0)     return t.pop[+key.slice(3)];
        if (DERIVED[key])                 return DERIVED[key](t);
        if (key.indexOf('.') > -1) {      /* e.g. news.0.t, sessions.2.mm */
          return key.split('.').reduce(function(o, k){ return o == null ? null : o[k]; }, t);
        }
        return t[key];
      }

      function apply(slug){
        var t = TENANTS[slug]; if (!t) return;
        document.documentElement.dataset.tenant = slug;
        document.title = DERIVED.h1(t) + ' | oneVoice';

        Array.prototype.forEach.call(document.querySelectorAll('[data-t]'), function(el){
          var v = value(t, el.getAttribute('data-t'));
          if (v != null) el.textContent = v;
        });
        Array.prototype.forEach.call(document.querySelectorAll('[data-t-alt]'), function(el){
          var v = value(t, el.getAttribute('data-t-alt'));
          if (v == null) return;
          /* Images take alt; everything else takes aria-label */
          if (el.tagName === 'IMG') el.alt = v; else el.setAttribute('aria-label', v);
        });
        /* Machine-readable dates stay in sync with the visible label */
        Array.prototype.forEach.call(document.querySelectorAll('[data-t-dt]'), function(el){
          var v = value(t, el.getAttribute('data-t-dt'));
          if (v != null) el.setAttribute('datetime', v);
        });

        renderSpotlight(t);
        renderTrustPartners(t);
        resolveLogos(document);   /* picks up standalone slots, e.g. the footer parent brand */

        /* Page hook: internal pages re-render their own lists on a community switch.
           Receives the resolved tenant record and its slug. */
        if (typeof CFG.onTenant === 'function') {
          try { CFG.onTenant(t, slug); } catch (e) { console.error('OV.onTenant', e); }
        }

        /* Same chip list inside the menu sheet */
        var menuOthers = document.querySelector('[data-menu-others]');
        if (menuOthers) {
          menuOthers.innerHTML = ORDER.filter(function(s){ return s !== slug; }).map(function(s){
            return '<li><a href="#" data-menu-link class="inline-flex items-center min-h-[38px] px-3 rounded-full ' +
                   'bg-ink-50 border border-ink-200 text-[14px] text-ink-700">' + TENANTS[s].name + '</a></li>';
          }).join('');
        }

        /* Cross-tenant internal links: every other community in the network */
        var host = document.querySelector('[data-others]');
        if (host) {
          host.innerHTML = ORDER.filter(function(s){ return s !== slug; }).map(function(s){
            return '<li><a href="#" class="inline-flex items-center min-h-[36px] px-3 rounded-full bg-white ' +
                   'border border-ink-200 text-[14px] text-ink-700 hover:border-accent-400 hover:text-accent-700">' +
                   TENANTS[s].name + '</a></li>';
          }).join('') +
          '<li><a href="#" class="inline-flex items-center min-h-[36px] px-3 rounded-full bg-white border ' +
          'border-ink-200 text-[14px] text-ink-700 hover:border-accent-400 hover:text-accent-700">Haemophilia</a></li>' +
          '<li><a href="#" class="inline-flex items-center min-h-[36px] px-3 rounded-full bg-ink-900 text-white ' +
          'text-[14px] font-medium hover:bg-ink-800">All 100+ →</a></li>';
        }
      }

      /* ---------------- Spotlight Series ----------------
         Logos come from the STTT partner API. Local dev talks to the local base,
         everything else to production. Nothing about a partner's artwork is baked in:
         if the API is unreachable the well keeps a neutral name plate rather than
         inventing a logo. */
      var STTT_API_BASE = /localhost|127\.0\.0\.1|local-sttt/.test(location.hostname)
        ? 'https://local-sttt.somebodytotalkto.com:8443'
        : 'https://somebodytotalkto.com';

      /* Response shape (verified against the live endpoint):
         { data: [ { tid, uuid, name, field_employer_site_url,
                     logo: { url, alt, filename, mime, width, height } } ] }
         Indexed by tid — stable — with name as a secondary key for readability. */
      var logoIndex = null;

      function fetchPartnerLogos(){
        if (logoIndex) return Promise.resolve(logoIndex);
        return fetch(STTT_API_BASE + '/api/session-editor/partners/logos', { mode:'cors', credentials:'omit' })
          .then(function(r){ return r.ok ? r.json() : null; })
          .then(function(json){
            var rows = json && Array.isArray(json.data) ? json.data : null;
            if (!rows) return null;
            var idx = {};
            rows.forEach(function(p){
              if (!p.logo || !p.logo.url) return;
              if (p.tid != null) idx[String(p.tid)] = p.logo;
              if (p.name) idx[p.name] = p.logo;
            });
            logoIndex = idx;
            return idx;
          })
          .catch(function(){ return null; });   /* offline: name plates stay */
      }

      function logoWell(partners){
        /* Partner artwork ranges from 1:1 to 9.5:1, so cap width as well as height
           and let object-contain do the rest. Two-partner months get a tighter cap. */
        var cap = partners.length > 1 ? 'max-h-9 max-w-[122px]' : 'max-h-11 max-w-[196px]';
        return partners.map(function(p, i){
          return (i ? '<span class="w-px h-7 bg-ink-200 shrink-0" aria-hidden="true"></span>' : '') +
            '<span class="flex items-center justify-start min-w-0" data-logo="' + p.tid + '" data-cap="' + cap + '">' +
              '<span class="text-[12.5px] font-semibold leading-tight text-ink-400" data-logo-fallback>' +
                p.name + '</span>' +
            '</span>';
        }).join('');
      }

      function renderSpotlight(t){
        var section = document.querySelector('[data-spotlight]');
        var list = document.querySelector('[data-spotlight-list]');
        if (!section || !list) return;
        var items = t.spotlight || [];
        /* Reusable means it disappears cleanly when there is nothing to show */
        if (!items.length) { section.hidden = true; list.innerHTML = ''; return; }
        section.hidden = false;

        list.innerHTML = items.map(function(s){
          /* Microsites live at {slug}.{community hostname}, e.g.
             vanderbilt.oneamyloidosisvoice.com — so a new month needs a slug, not a URL.
             An explicit `microsite` still wins if one ever sits off-pattern. */
          var href = s.microsite || ('https://' + s.slug + '.' + t.hostname + '/');
          return '' +
          '<li>' +
            '<a href="' + href + '" target="_blank" rel="noopener noreferrer" ' +
               'class="group h-full flex flex-col rounded-2xl bg-white border border-ink-200 p-5 shadow-card ' +
               'hover:border-accent-400 hover:shadow-lift focus-visible:border-accent-600 transition">' +
              /* Fixed-height logo well keeps every card on the same scan line, however */
              /* many partners a month has and whatever proportions their artwork is */
              '<span class="h-12 flex items-center justify-start gap-3.5">' + logoWell(s.partners) + '</span>' +
              '<span class="mt-5 inline-flex self-start items-center rounded-full bg-accent-50 text-accent-800 ' +
                    'text-[12px] font-semibold uppercase tracking-[.09em] px-2.5 py-1">' + s.month + '</span>' +
              '<h3 class="mt-2.5 text-[18px] font-semibold leading-snug text-ink-900 group-hover:text-accent-800">' +
                s.name + '</h3>' +
              '<p class="mt-1.5 text-[14.5px] leading-relaxed text-ink-600">' + s.blurb + '</p>' +
              '<span class="mt-auto pt-4 flex items-center gap-1.5 text-[15px] font-semibold text-accent-700">' +
                'Visit microsite' +
                '<svg class="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" viewBox="0 0 24 24" ' +
                     'fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
                  '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/>' +
                '</svg>' +
                '<span class="sr-only">(opens in a new tab)</span>' +
              '</span>' +
            '</a>' +
          '</li>';
        }).join('');

        resolveLogos(list);
      }

      /* Trust bar — funder and advocacy partners, same endpoint as the Spotlight Series.
         Name plate first, real artwork swapped in when the API answers. */
      function renderTrustPartners(t){
        var host = document.querySelector('[data-trust-partners]');
        if (!host) return;
        var tids = t.partnerTids || [];
        host.innerHTML = tids.map(function(p){
          /* Partner wordmarks run up to 1462px wide; too small a cap turns them into
             illegible smudges, so give the tile real height and the logo most of it. */
          return '<li class="h-20 rounded-xl bg-white border border-ink-200 flex items-center justify-center px-4" ' +
                     'data-logo="' + p.tid + '" data-cap="max-h-12 max-w-[150px]">' +
                   '<span class="text-[12px] font-semibold tracking-wide text-ink-400 text-center" data-logo-fallback>' +
                     p.name + '</span>' +
                 '</li>';
        }).join('');
        resolveLogos(host);
      }

      /* Shared logo resolver: any container holding [data-logo] slots */
      function resolveLogos(scope){
        fetchPartnerLogos().then(function(idx){
          if (!idx) return;   /* leave the name plates — never fabricate a logo */
          Array.prototype.forEach.call(scope.querySelectorAll('[data-logo]'), function(slot){
            var logo = idx[slot.getAttribute('data-logo')];
            if (!logo || !logo.url) return;
            var img = document.createElement('img');
            img.src = logo.url;
            /* Intrinsic dimensions from the API give the browser an aspect ratio
               up front, so swapping the name plate for artwork costs no layout shift */
            if (logo.width)  img.width  = logo.width;
            if (logo.height) img.height = logo.height;
            img.loading = 'lazy';
            img.decoding = 'async';
            img.alt = logo.alt || slot.querySelector('[data-logo-fallback]').textContent.trim();
            img.className = slot.getAttribute('data-cap') + ' w-auto h-auto object-contain';
            img.onload = function(){ slot.textContent = ''; slot.appendChild(img); };
          });
        });
      }

      /* ---------------- Menu sheet ---------------- */
      function initMenu(){
        var sheet = document.querySelector('[data-menu-sheet]');
        if (!sheet || sheet.dataset.ready) return;
        sheet.dataset.ready = '1';
        var panel = sheet.querySelector('[data-menu-panel]');
        var backdrop = sheet.querySelector('[data-menu-backdrop]');
        var lastFocus = null;

        function focusables(){
          return Array.prototype.filter.call(
            panel.querySelectorAll('a[href], button, input, [tabindex]:not([tabindex="-1"])'),
            function(el){ return el.offsetParent !== null; });
        }
        function setExpanded(v){
          Array.prototype.forEach.call(document.querySelectorAll('[data-menu-open]'), function(b){
            b.setAttribute('aria-expanded', String(v));
          });
        }
        function open(trigger){
          lastFocus = trigger || document.activeElement;
          sheet.classList.remove('hidden');
          document.body.style.overflow = 'hidden';
          requestAnimationFrame(function(){
            backdrop.classList.replace('opacity-0','opacity-100');
            panel.classList.remove('translate-x-full');
          });
          setExpanded(true);
          var f = focusables(); if (f.length) f[0].focus();
        }
        function close(){
          backdrop.classList.replace('opacity-100','opacity-0');
          panel.classList.add('translate-x-full');
          document.body.style.overflow = '';
          setExpanded(false);
          setTimeout(function(){ sheet.classList.add('hidden'); }, 200);
          if (lastFocus && lastFocus.focus) lastFocus.focus();
        }

        Array.prototype.forEach.call(document.querySelectorAll('[data-menu-open]'), function(b){
          b.addEventListener('click', function(){ open(b); });
        });
        sheet.querySelector('[data-menu-close]').addEventListener('click', close);
        backdrop.addEventListener('click', close);
        Array.prototype.forEach.call(panel.querySelectorAll('[data-menu-link]'), function(a){
          a.addEventListener('click', close);
        });
        document.addEventListener('keydown', function(e){
          if (sheet.classList.contains('hidden')) return;
          if (e.key === 'Escape') { close(); return; }
          if (e.key !== 'Tab') return;
          /* Keep focus inside the sheet while it is modal */
          var f = focusables(); if (!f.length) return;
          var first = f[0], last = f[f.length - 1];
          if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        });
      }

      function post(){ parent.postMessage({ h: document.documentElement.scrollHeight }, '*'); }

      window.addEventListener('message', function(e){
        var d = e.data || {};
        if (d.tenant) apply(d.tenant);
        if (typeof d.notes === 'boolean') document.documentElement.dataset.notes = d.notes ? 'on' : 'off';
        setTimeout(post, 60);
      });

      /* ?tenant=scd&notes=on — lets the responsive view and deep links pick a tenant */
      var qs = new URLSearchParams(location.search);
      var startTenant = qs.get('tenant') || document.documentElement.dataset.tenant || 'amyloidosis';
      if (qs.get('notes') === 'on') document.documentElement.dataset.notes = 'on';
      var embedded = window.parent !== window;

      /* Design-time control — never ships; hidden when embedded in the responsive view */
      function buildControl(){
        if (embedded || document.getElementById('dt-control')) return;
        var bar = document.createElement('div');
        bar.id = 'dt-control';
        bar.innerHTML = ORDER.map(function(s){
          return '<button data-go="' + s + '" title="' + TENANTS[s].name + '" aria-label="' + TENANTS[s].name + '"></button>';
        }).join('') + '<label><input type="checkbox" id="dt-notes"> specs</label>';
        document.body.appendChild(bar);
        bar.addEventListener('click', function(e){
          var b = e.target.closest('[data-go]'); if (!b) return;
          apply(b.getAttribute('data-go')); mark();
        });
        bar.querySelector('#dt-notes').addEventListener('change', function(){
          document.documentElement.dataset.notes = this.checked ? 'on' : 'off';
        });
        bar.querySelector('#dt-notes').checked = document.documentElement.dataset.notes === 'on';
        mark();
      }
      function mark(){
        var cur = document.documentElement.dataset.tenant;
        Array.prototype.forEach.call(document.querySelectorAll('#dt-control [data-go]'), function(b){
          b.setAttribute('aria-current', String(b.getAttribute('data-go') === cur));
        });
      }

      apply(startTenant);
      document.addEventListener('DOMContentLoaded', function(){ apply(startTenant); buildControl(); initMenu(); post(); });
      window.addEventListener('load', function(){
        buildControl(); initMenu();
        post(); setTimeout(post, 250); setTimeout(post, 900); setTimeout(post, 2000);
        if (window.ResizeObserver) new ResizeObserver(post).observe(document.documentElement);
      });
    })();

})();
