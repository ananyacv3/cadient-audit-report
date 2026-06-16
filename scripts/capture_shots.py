"""
Capture annotated screenshots of cadienttalent.com homepage problem areas
for the "Homepage Recommendations" tab of the Cadient growth report.

Each shot is cropped to the relevant section and the problem element is
highlighted with a red outline (baked in by the browser for perfect alignment).
Uses the system Chrome via Playwright (no chromium download needed).
"""
from playwright.sync_api import sync_playwright
import os, time, json

# public/screenshots relative to this script (scripts/ -> ../public/screenshots)
OUT = os.path.normpath(os.path.join(os.path.dirname(__file__), "..", "public", "screenshots"))
os.makedirs(OUT, exist_ok=True)

STYLE = """
*{animation:none !important; transition:none !important; scroll-behavior:auto !important;}
[data-hl]{ outline:3px solid #EF4444 !important; outline-offset:2px !important;
           box-shadow:0 0 0 7px rgba(239,68,68,.20) !important; border-radius:4px !important; }
#masthead.__hide{ display:none !important; }
"""

CLEAR = """() => {
  document.querySelectorAll('[data-shot]').forEach(e=>e.removeAttribute('data-shot'));
  document.querySelectorAll('[data-hl]').forEach(e=>e.removeAttribute('data-hl'));
}"""

# hide chat iframe, reCAPTCHA, cookie/consent banners, and ALL iframes
# (none of the target shots rely on iframe content)
HIDE_WIDGETS = """() => {
  let n=0;
  document.querySelectorAll('iframe').forEach(f=>{ f.style.setProperty('display','none','important'); n++; });
  const sels=['[id*="chat" i]','[class*="chat" i]','[id*="caddy" i]','[class*="caddy" i]',
    '.grecaptcha-badge','[id*="cookie" i]','[class*="cookie" i]','[class*="consent" i]','#onetrust-banner-sdk'];
  sels.forEach(s=>document.querySelectorAll(s).forEach(e=>{ e.style.setProperty('display','none','important'); n++; }));
  return n;
}"""

results = {}

with sync_playwright() as p:
    browser = p.chromium.launch(channel="chrome", headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 1000}, device_scale_factor=2)
    page.goto("https://cadienttalent.com/", wait_until="domcontentloaded", timeout=60000)
    page.add_style_tag(content=STYLE)
    page.wait_for_selector("h2", timeout=30000)
    page.evaluate(HIDE_WIDGETS)
    time.sleep(2.0)

    def element_shot(name, mark_js, freeze0=False):
        page.evaluate(CLEAR)
        page.evaluate(HIDE_WIDGETS)
        info = page.evaluate(mark_js)
        page.wait_for_timeout(400)
        loc = page.locator('[data-shot]').first
        loc.scroll_into_view_if_needed()
        page.wait_for_timeout(400)
        page.evaluate(HIDE_WIDGETS)
        if freeze0:
            page.evaluate("""() => { document.querySelectorAll('[data-shot] .elementor-counter-number')
                .forEach(c=>{ c.textContent='0'; }); }""")
            page.wait_for_timeout(150)
        loc.screenshot(path=os.path.join(OUT, name))
        results[name] = info
        return info

    # 1) Crowded navigation — force the 17-item SmartSuite mega-menu open, clip header+dropdown
    page.evaluate(CLEAR); page.evaluate(HIDE_WIDGETS)
    nav_info = page.evaluate("""() => {
      window.scrollTo(0,0);
      const h=document.querySelector('#masthead'); h.classList.remove('__hide'); h.setAttribute('data-shot','nav');
      const ss=[...h.querySelectorAll('a')].find(a=>/SmartSuite/i.test(a.textContent));
      const li=ss.closest('li'); const sub=li.querySelector('ul');
      li.classList.add('activemenu');
      if(sub){ sub.style.cssText += ';display:grid !important;visibility:visible !important;opacity:1 !important;pointer-events:auto !important;';
        sub.setAttribute('data-hl','1'); }
      const r = sub ? sub.getBoundingClientRect() : h.getBoundingClientRect();
      return { links:h.querySelectorAll('a').length, subItems: sub?sub.querySelectorAll('a').length:0, bottom: Math.round(r.bottom) };
    }""")
    page.wait_for_timeout(400); page.evaluate(HIDE_WIDGETS)
    clip_h = min(nav_info.get("bottom", 120) + 24, 1400)
    page.screenshot(path=os.path.join(OUT, "crowded-nav.png"), clip={"x":0,"y":0,"width":1440,"height":clip_h})
    results["crowded-nav.png"] = nav_info

    # 2) Proof, Not Promises counters stuck at 0
    element_shot("proof-counters.png", """() => {
      document.querySelector('#masthead')?.classList.add('__hide');
      const h2 = [...document.querySelectorAll('h2')].find(h=>/Proof, Not Promises/i.test(h.textContent));
      const sec = h2.closest('section'); sec.setAttribute('data-shot','proof');
      sec.querySelectorAll('.elementor-counter-number').forEach(c=>c.setAttribute('data-to-value','0'));
      const counters = [...sec.querySelectorAll('.elementor-counter')];
      (counters.length ? counters : [...sec.querySelectorAll('.elementor-counter-number')])
        .forEach(t=>t.setAttribute('data-hl','1'));
      return { vals: [...sec.querySelectorAll('.elementor-counter-number')].map(c=>c.textContent.trim()) };
    }""", freeze0=True)

    # 3) Case-study results render as 0 (numbers only in JS) — first results row
    element_shot("case-study-zeros.png", """() => {
      document.querySelector('#masthead')?.classList.add('__hide');
      const rows=[...document.querySelectorAll('.elementor-inner-section')];
      let card = rows.find(r=>r.querySelector('.elementor-counter-number') && /Results|turnover/i.test(r.innerText));
      if(!card){ const lbl=[...document.querySelectorAll('*')].find(e=>e.children.length===0 && /Reduction in turnover/i.test(e.textContent)); card=lbl.closest('section'); }
      card.setAttribute('data-shot','casestudy');
      card.querySelectorAll('.elementor-counter-number').forEach(c=>{
        c.setAttribute('data-to-value','0'); c.closest('.elementor-counter')?.setAttribute('data-hl','1'); });
      return { txt: card.innerText.replace(/\\s+/g,' ').trim().slice(0,140) };
    }""", freeze0=True)

    # 4) Identical testimonial repeated across all carousel slides
    element_shot("testimonials-duplicate.png", """() => {
      document.querySelector('#masthead')?.classList.add('__hide');
      const h2 = [...document.querySelectorAll('h2')].find(h=>/What Our Customers Say/i.test(h.textContent));
      const sec = h2.closest('section'); sec.setAttribute('data-shot','testimonials');
      const wrap = sec.querySelector('.swiper-wrapper');
      if (wrap){ wrap.style.cssText += ';transform:none !important;display:block !important;height:auto !important;'; }
      sec.querySelectorAll('.swiper').forEach(s=>{ s.style.cssText += ';height:auto !important;overflow:visible !important;'; });
      const slides=[...sec.querySelectorAll('.swiper-slide')];
      let shown=0;
      slides.forEach((s,i)=>{
        if (i>4){ s.style.setProperty('display','none','important'); return; }
        s.style.cssText += ';width:100% !important;margin:0 0 14px 0 !important;float:none !important;left:auto !important;';
        s.setAttribute('data-hl','1'); shown++;
      });
      return { totalSlides: slides.length, shown };
    }""")

    browser.close()

print(json.dumps(results, indent=2))
