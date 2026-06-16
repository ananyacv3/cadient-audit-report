// ============================================================================
// Growth Intelligence — data layer
// EVERY figure below is transcribed verbatim from the CommerceV3 research
// screenshots for cadienttalent.com. Conversion-tab findings come from a live
// heuristic walkthrough of the cadienttalent.com homepage. Nothing is
// estimated, rounded, or invented.
// ============================================================================

export type Tone = 'good' | 'warn' | 'bad' | 'neutral'
export type Severity =
  | 'CRITICAL'
  | 'EMERGENCY'
  | 'DECLINING'
  | 'NOT PRESENT'
  | 'BELOW AVERAGE'

export interface Kpi {
  label: string
  value: string
  sub?: string
  change?: string
  changeTone?: Tone
  tone: Tone
  severity?: Severity
  note?: string
}

export interface Issue {
  severity: Severity
  title: string
  detail: string
  fix?: string
}

export const company = {
  name: 'Cadient Talent',
  domain: 'cadienttalent.com',
  category: 'Nonprofit Organizations',
}

// ---------------------------------------------------------------------------
// OVERVIEW
// ---------------------------------------------------------------------------
export const heroKpis: Kpi[] = [
  {
    label: 'Authority Score',
    value: '39',
    sub: 'Rated “Very good”',
    tone: 'good',
  },
  {
    label: 'Organic Traffic',
    value: '19.2K',
    change: '+3.8%',
    changeTone: 'good',
    tone: 'good',
  },
  {
    label: 'Organic Keywords',
    value: '12.8K',
    change: '-15%',
    changeTone: 'bad',
    tone: 'bad',
    severity: 'DECLINING',
    note: 'Keyword footprint shrank 15%.',
  },
  {
    label: 'Backlinks',
    value: '36.1K',
    change: '-7%',
    changeTone: 'bad',
    tone: 'warn',
    severity: 'DECLINING',
    note: 'Net backlinks down 7%.',
  },
]

export const execKpis: Kpi[] = [
  {
    label: 'Authority Score',
    value: '39',
    tone: 'good',
    note: 'Rated “Very good” in the analysis.',
  },
  {
    label: 'AI Visibility',
    value: '26',
    sub: '83 mentions · 568 cited pages',
    tone: 'neutral',
    note: 'Cited across ChatGPT, AI Overview, AI Mode and Gemini.',
  },
  {
    label: 'Organic Traffic',
    value: '19.2K',
    change: '+3.8%',
    changeTone: 'good',
    tone: 'good',
    note: 'One of the few metrics still growing.',
  },
  {
    label: 'Organic Keywords',
    value: '12.8K',
    change: '-15%',
    changeTone: 'bad',
    tone: 'bad',
    severity: 'DECLINING',
    note: 'Ranking keyword set is contracting.',
  },
  {
    label: 'Site Health',
    value: '74%',
    sub: 'Top-tier sites: 92%',
    tone: 'bad',
    severity: 'BELOW AVERAGE',
    note: '18 points below the top-10% benchmark.',
  },
  {
    label: 'AI Search Health',
    value: '75%',
    sub: 'Threshold: 80%',
    tone: 'warn',
    severity: 'BELOW AVERAGE',
    note: 'Below the 80% optimization threshold.',
  },
  {
    label: 'Backlinks',
    value: '36.1K',
    change: '-7%',
    changeTone: 'bad',
    tone: 'warn',
    severity: 'DECLINING',
    note: 'Referring domains also down 2%.',
  },
  {
    label: 'Paid Search',
    value: '$0',
    sub: '0 paid keywords',
    tone: 'bad',
    severity: 'NOT PRESENT',
    note: 'No paid coverage running.',
  },
]

export const overviewExplainers: { term: string; meaning: string }[] = [
  {
    term: 'Authority Score 39',
    meaning:
      'A 0–100 measure of overall domain strength. 39 is rated “Very good” in the analysis — the brand’s most solid asset.',
  },
  {
    term: 'AI Visibility 26',
    meaning:
      'How present the domain is across AI search surfaces. 83 mentions across 568 cited pages, split over ChatGPT, Google AI Overview, AI Mode and Gemini.',
  },
  {
    term: 'Organic Keywords −15%',
    meaning:
      'The number of search terms the site ranks for fell 15%. Combined with a −7% backlink trend, organic reach is contracting.',
  },
  {
    term: 'Site Health 74%',
    meaning:
      'Technical SEO soundness from the site crawl. The site sits at 74% against a 92% top-tier benchmark, dragged by 97 errors and 7,198 warnings.',
  },
]

// Site-health dimensions captured in the crawl (real per-dimension scores).
export const siteHealthRadar: { axis: string; value: number; display: string }[] =
  [
    { axis: 'Crawlability', value: 89, display: '89%' },
    { axis: 'HTTPS', value: 98, display: '98%' },
    { axis: 'Site Performance', value: 93, display: '93%' },
    { axis: 'Internal Linking', value: 71, display: '71%' },
    { axis: 'Markup', value: 100, display: '100%' },
    { axis: 'Core Web Vitals', value: 0, display: '0%' },
  ]
// The only cross-cutting benchmark present in the research.
export const siteHealthBenchmark = { label: 'Top-tier sites — 92% overall health', value: 92 }

export const snapshot: { label: string; value: string; tone: Tone }[] = [
  { label: 'Authority Score', value: '39 · Very good', tone: 'good' },
  { label: 'Organic Traffic (worldwide)', value: '19.2K · +3.8%', tone: 'good' },
  { label: 'Organic Keywords (worldwide)', value: '12.8K · −15%', tone: 'bad' },
  { label: 'Backlinks', value: '36.1K · −7%', tone: 'warn' },
  { label: 'Referring Domains', value: '2K · −2%', tone: 'warn' },
  { label: 'Monthly Visits', value: '1.1M', tone: 'neutral' },
  { label: 'AI Visibility', value: '26 · 83 mentions', tone: 'neutral' },
  { label: 'Cited Pages (AI)', value: '568', tone: 'neutral' },
  { label: 'Paid Traffic / Paid Keywords', value: '$0 · 0', tone: 'bad' },
  { label: 'Site Health', value: '74% (vs 92%)', tone: 'bad' },
  { label: 'AI Search Health', value: '75% (threshold 80%)', tone: 'warn' },
  { label: 'Top cited source', value: 'cadienttalent.com · 40', tone: 'neutral' },
]

// ---------------------------------------------------------------------------
// GAP ANALYSIS — SEO (technical health)
// ---------------------------------------------------------------------------
export const seoKpis: Kpi[] = [
  {
    label: 'Site Health',
    value: '74%',
    sub: 'Top-tier sites: 92%',
    tone: 'bad',
    severity: 'BELOW AVERAGE',
    note: 'Your site 74% vs 92%.',
  },
  { label: 'Errors', value: '97', tone: 'bad', severity: 'CRITICAL', note: 'No change vs prior crawl.' },
  { label: 'Warnings', value: '7,198', change: '+6', changeTone: 'bad', tone: 'bad', severity: 'CRITICAL' },
  { label: 'Crawled Pages', value: '362', sub: '306 have issues · 7 broken', tone: 'warn' },
  { label: 'HTTPS', value: '98%', tone: 'good' },
  { label: 'Markup', value: '100%', tone: 'good' },
  { label: 'Site Performance', value: '93%', tone: 'good' },
  { label: 'Crawlability', value: '89%', tone: 'warn', severity: 'BELOW AVERAGE' },
  { label: 'Internal Linking', value: '71%', tone: 'warn', severity: 'BELOW AVERAGE' },
  {
    label: 'Core Web Vitals',
    value: '0%',
    tone: 'bad',
    severity: 'CRITICAL',
    note: 'Reported at 0% — no passing data.',
  },
  {
    label: 'International SEO',
    value: 'Not implemented',
    tone: 'bad',
    severity: 'NOT PRESENT',
    note: 'Flagged as not implemented on the site.',
  },
]

export const seoIssues: Issue[] = [
  {
    severity: 'CRITICAL',
    title: 'Core Web Vitals reported at 0%',
    detail:
      'The crawl returns a 0% Core Web Vitals score — no pages are recorded as passing Google’s loading, interactivity and stability thresholds.',
    fix: 'Audit LCP/INP/CLS on key templates, compress hero media, and defer non-critical scripts until vitals register a passing score.',
  },
  {
    severity: 'CRITICAL',
    title: '97 errors and 7,198 warnings open',
    detail:
      'The site carries 97 unresolved errors (no change since the prior crawl) and 7,198 warnings (up 6), keeping Site Health at 74% against a 92% top-tier benchmark.',
    fix: 'Work the error queue first (highest ranking impact), then batch-clear the warning backlog by template.',
  },
  {
    severity: 'CRITICAL',
    title: '2,420 pages block internal resources in robots.txt',
    detail:
      'robots.txt is blocking internal resources on 2,420 pages, preventing search engines from rendering those pages fully.',
    fix: 'Unblock CSS/JS and required internal resources in robots.txt so pages render and index correctly.',
  },
  {
    severity: 'BELOW AVERAGE',
    title: '1,303 pages use non-descriptive anchor text',
    detail:
      'Internal links on 1,303 pages use non-descriptive anchor text (e.g. “click here”), weakening internal-link signals and accessibility.',
    fix: 'Replace generic anchors with descriptive, keyword-relevant link text across templates.',
  },
  {
    severity: 'BELOW AVERAGE',
    title: '28 duplicate title tags + 2 duplicate content pages',
    detail:
      '28 pages share duplicate title tags and 2 pages have duplicate content, splitting relevance signals between near-identical URLs.',
    fix: 'Write unique titles per page and canonicalise or consolidate the duplicated content.',
  },
  {
    severity: 'NOT PRESENT',
    title: 'International SEO not implemented',
    detail:
      'The crawl flags International SEO as not implemented — there is no hreflang / localisation layer despite referring domains in Singapore, the UK, France, Canada and Germany.',
    fix: 'Add hreflang and localised landing pages where non-US demand already exists.',
  },
]

// ---------------------------------------------------------------------------
// GAP ANALYSIS — KEYWORDS
// ---------------------------------------------------------------------------
export const keywordKpis: Kpi[] = [
  {
    label: 'Organic Keywords (US)',
    value: '7.2K',
    change: '-16.11%',
    changeTone: 'bad',
    tone: 'bad',
    severity: 'DECLINING',
  },
  {
    label: 'Organic Traffic (US)',
    value: '12.1K',
    change: '-10.33%',
    changeTone: 'bad',
    tone: 'bad',
    severity: 'DECLINING',
  },
  {
    label: 'Non-Branded Traffic',
    value: '11K',
    change: '-11.42%',
    changeTone: 'bad',
    tone: 'bad',
    severity: 'DECLINING',
  },
  {
    label: 'Branded Traffic',
    value: '1.2K',
    change: '+1.49%',
    changeTone: 'good',
    tone: 'good',
  },
  { label: 'Traffic Cost', value: '$15.9K', change: '+25.2%', changeTone: 'good', tone: 'neutral' },
  {
    label: 'Transactional Intent',
    value: '13.7%',
    sub: '1.2K kw · 1.8K traffic',
    tone: 'warn',
    severity: 'BELOW AVERAGE',
    note: 'Smallest intent segment.',
  },
]

export const keywordIntent: { label: string; pct: number; keywords: string; traffic: string }[] = [
  { label: 'Informational', pct: 34.4, keywords: '3K', traffic: '4.9K' },
  { label: 'Navigational', pct: 27.6, keywords: '2.4K', traffic: '3.4K' },
  { label: 'Commercial', pct: 24.3, keywords: '2.1K', traffic: '4K' },
  { label: 'Transactional', pct: 13.7, keywords: '1.2K', traffic: '1.8K' },
]

export const topKeywords: {
  keyword: string
  intent: string
  position: string
  volume: string
  cpc: string
  trafficPct: string
}[] = [
  { keyword: 'cadient talent', intent: 'N', position: '1', volume: '720', cpc: '$5.74', trafficPct: '4.74%' },
  { keyword: 'shoprite careers', intent: 'C', position: '2', volume: '14.8K', cpc: '$0.44', trafficPct: '3.16%' },
  { keyword: 'shoprite hiring positions', intent: 'C · I', position: '2', volume: '2.4K', cpc: '$0.45', trafficPct: '2.60%' },
  { keyword: 'shoprite evesham rd nj', intent: 'I', position: '3', volume: '2.9K', cpc: '$0.75', trafficPct: '1.95%' },
  { keyword: 'shoprite glassboro', intent: 'I · T', position: '4', volume: '3.6K', cpc: '$1.00', trafficPct: '1.92%' },
]

export const subdomainSplit: { name: string; trafficPct: string; keywords: string; pct: number }[] = [
  { name: 'cta.cadienttalent.com', trafficPct: '89.93%', keywords: '5,952', pct: 89.93 },
  { name: 'cadienttalent.com', trafficPct: '10.07%', keywords: '1,267', pct: 10.07 },
]

export const newRankingKeywords: { keyword: string; position: string; volume: string }[] = [
  { keyword: 'shoprite hazlet nj', position: '4', volume: '2.9K' },
  { keyword: 'shoprite kingston ny', position: '7', volume: '3.6K' },
  { keyword: 'shoprite application', position: '5', volume: '3.6K' },
  { keyword: 'costco application', position: '12', volume: '18.1K' },
  { keyword: 'shoprite jersey city', position: '8', volume: '2.4K' },
]

export const keywordIssues: Issue[] = [
  {
    severity: 'DECLINING',
    title: 'Keyword footprint and non-branded traffic are eroding',
    detail:
      'US organic keywords fell 16.11% and organic traffic 10.33%, with non-branded traffic down 11.42%. The contraction is concentrated in the non-branded segment — the part that brings in new audiences.',
    fix: 'Stabilise the highest-traffic non-branded pages first, then rebuild lost rankings with refreshed content.',
  },
  {
    severity: 'BELOW AVERAGE',
    title: 'Only 13.7% of keywords are transactional',
    detail:
      'Transactional intent is the smallest segment (13.7%, 1.2K keywords) while informational + navigational make up 62%. The conversion-ready end of the funnel is under-covered.',
    fix: 'Build and optimise pages for purchase-intent queries to grow the transactional share.',
  },
  {
    severity: 'CRITICAL',
    title: 'Rankings depend on the applicant-portal subdomain, not the brand site',
    detail:
      'cta.cadienttalent.com (the applicant portal) holds 89.93% of organic traffic and 5,952 keywords, while the brand site cadienttalent.com holds just 10.07% and 1,267. Nearly all top keywords and new rankings are Shoprite/Costco hiring queries served by client portals — not Cadient brand or product demand.',
    fix: 'Treat the brand/product site as a separate growth track: expand commercial content on cadienttalent.com so brand demand isn’t masked by portal traffic.',
  },
]

// ---------------------------------------------------------------------------
// GAP ANALYSIS — BACKLINKS
// ---------------------------------------------------------------------------
export const backlinkKpis: Kpi[] = [
  { label: 'Backlinks', value: '36.1K', change: '-7%', changeTone: 'bad', tone: 'warn', severity: 'DECLINING' },
  { label: 'Referring Domains', value: '2K', change: '-2%', changeTone: 'bad', tone: 'warn', severity: 'DECLINING' },
  { label: 'Outbound Domains', value: '493', tone: 'neutral' },
  { label: 'New backlinks today', value: '39', tone: 'good' },
  { label: 'Ref. IPs', value: '2.1K', tone: 'neutral' },
  { label: 'Ref. Subnets', value: '1.1K', tone: 'neutral' },
]

export const backlinkTypes: { label: string; pct: string; count: string; width: number }[] = [
  { label: 'Text', pct: '91%', count: '32.8K', width: 91 },
  { label: 'Image', pct: '8%', count: '3K', width: 8 },
  { label: 'Form', pct: '<1%', count: '1', width: 1 },
  { label: 'Frame', pct: '<1%', count: '1', width: 1 },
]

export const linkAttributes: { label: string; pct: string; count: string; width: number; tone: Tone }[] = [
  { label: 'Follow', pct: '81%', count: '29.3K', width: 81, tone: 'good' },
  { label: 'Nofollow', pct: '19%', count: '6.7K', width: 19, tone: 'neutral' },
]

export const referringCategories: { label: string; pct: string; count: string; width: number }[] = [
  { label: 'Online Services', pct: '8%', count: '155', width: 100 },
  { label: 'Mass Media', pct: '6%', count: '117', width: 75 },
  { label: 'Education', pct: '4%', count: '78', width: 50 },
  { label: 'Information Technology', pct: '4%', count: '70', width: 45 },
  { label: 'Healthcare', pct: '2%', count: '46', width: 30 },
]

export const topAnchors: string[] = [
  'apply',
  'Empty Anchor',
  'apply at website',
  'job openings',
  'https://www.efdir.com/',
  'cadienttalent.com',
  'apply now',
  'search job openings',
  'interview scheduling software',
  'apply now ➜',
]

export const tldDistribution: { tld: string; pct: string; count: string }[] = [
  { tld: '.com', pct: '54%', count: '1,088' },
  { tld: '.org', pct: '7%', count: '141' },
  { tld: '.online', pct: '6%', count: '120' },
  { tld: '.edu', pct: '<1%', count: '19' },
  { tld: '.gov', pct: '<1%', count: '8' },
  { tld: 'other', pct: '31%', count: '631' },
]

export const topCountriesBacklinks: { country: string; pct: string; count: string }[] = [
  { country: 'United States', pct: '40%', count: '841' },
  { country: 'Singapore', pct: '10%', count: '212' },
  { country: 'United Kingdom', pct: '2%', count: '49' },
  { country: 'France', pct: '1%', count: '31' },
  { country: 'Canada', pct: '1%', count: '30' },
  { country: 'Germany', pct: '1%', count: '25' },
]

export const similarProfiles: { domain: string; level: string }[] = [
  { domain: 'uline.jobs', level: '9%' },
  { domain: 'up.jobs', level: '8%' },
  { domain: 'joveo.com', level: '8%' },
  { domain: 'hiringthing.com', level: '7%' },
  { domain: 'burlingtonstores.jobs', level: '7%' },
]

export const backlinkIssues: Issue[] = [
  {
    severity: 'DECLINING',
    title: 'Backlinks and referring domains are both shrinking',
    detail:
      'Backlinks are down 7% (36.1K) and referring domains down 2% (2K). The link profile is contracting rather than compounding, which caps ranking growth.',
    fix: 'Launch a steady outreach + reclamation programme to replace lost links and grow referring domains.',
  },
  {
    severity: 'BELOW AVERAGE',
    title: 'Anchor text is concentrated on “apply” / job phrases',
    detail:
      'Top anchors are dominated by “apply”, “apply now”, “job openings”, “search job openings” and a notable share of empty anchors — reflecting applicant-portal links rather than brand or product authority.',
    fix: 'Earn editorial links with brand- and product-relevant anchors, and clean up empty-anchor links.',
  },
  {
    severity: 'BELOW AVERAGE',
    title: 'Toxicity is unmonitored',
    detail:
      'The Overall Toxicity Score is not set up, so harmful or spammy links would currently go undetected.',
    fix: 'Run a backlink audit to baseline toxicity and disavow harmful domains.',
  },
]

// ---------------------------------------------------------------------------
// GAP ANALYSIS — CONVERSION  (live homepage walkthrough)
// ---------------------------------------------------------------------------
export const conversionStrengths: { title: string; detail: string }[] = [
  {
    title: 'Clear hero value proposition',
    detail:
      '“Hire Fast. Score Smart. Retain the Best.” states the offer immediately, paired with a single primary action: “Schedule a Demo / Talk to an Expert.”',
  },
  {
    title: 'Low-friction inline demo form',
    detail:
      'The primary CTA opens an inline 2-step lead form (6 fields; only email and company website required) — no redirect to a separate page, which keeps the demo path short.',
  },
  {
    title: 'Quantified ROI hook',
    detail:
      'A savings calculator surfaces $482,400 estimated yearly savings, 342% first-year ROI and 26% cost reduction, with a “Calculate Your Savings” CTA. These figures render correctly.',
  },
  {
    title: 'Social-proof assets present',
    detail:
      'Named case studies, a testimonials section, partner logos and a 2025 Global Recognition Award badge are all in place to build trust.',
  },
]

export const conversionIssues: Issue[] = [
  {
    severity: 'CRITICAL',
    title: 'Proof stats render as “0” across the page',
    detail:
      'The “Proof, Not Promises” counters (Reduction in 90-day attrition, Hiring hours saved, Faster manager decisions) and every case-study “Results” figure display 0% / 0+ / 0x. They are animated counter widgets whose markup stores the real target value (for example, a target of 40) but never counts up — so the site’s strongest proof points read as zero, while the true figures (e.g. 20%, 41%, 64%, 50%) sit only inside the case-study prose.',
    fix: 'Repair the counter trigger and add a static numeric fallback so the real values always display, even if the animation does not fire.',
  },
  {
    severity: 'DECLINING',
    title: 'The same testimonial is repeated three times',
    detail:
      'The “What Our Customers Say” block shows one identical quote — “Before SmartSource™, we threw job posts everywhere…” attributed to “Director of TA, National Logistics Group” — duplicated three times, which undercuts credibility.',
    fix: 'Replace the duplicates with distinct, attributed testimonials (name, title, company, ideally logo or photo).',
  },
  {
    severity: 'BELOW AVERAGE',
    title: 'Proof numbers live only in JavaScript, not the HTML',
    detail:
      'Because the stats are JS-animated counters that start at 0, the real numbers are absent from the initial HTML — so crawlers, AI engines and screen readers see “0”. This compounds the AI-visibility and llms.txt gaps found in the crawl.',
    fix: 'Render the real proof values as static text in the markup so they are machine-readable and citable.',
  },
  {
    severity: 'BELOW AVERAGE',
    title: 'Primary CTA competes with a crowded navigation',
    detail:
      'The header carries 39 links and the page stacks several secondary CTAs (Watch Webinar, Watch Now, Calculate Your Savings, plus 9 “Learn More” module links), diluting attention on the one high-intent action — “Schedule a Demo.”',
    fix: 'Streamline the navigation and foreground a single primary CTA throughout the page.',
  },
]

// "How we can improve the homepage to get better conversions"
export const homepageImprovements: {
  priority: string
  title: string
  detail: string
  tone: Tone
}[] = [
  {
    priority: 'P1',
    title: 'Fix the zeroed-out proof counters (and add a static fallback)',
    detail:
      'Restore the count-up so “Reduction in 90-day attrition”, case-study results and the other metrics show their real values instead of 0. Hard-code the numbers as text so they never render as zero — this is the single biggest credibility leak above and below the fold.',
    tone: 'bad',
  },
  {
    priority: 'P2',
    title: 'Make every proof number real HTML text',
    detail:
      'Move the stat values out of JS-only counters into the static markup. This lifts on-page trust for human visitors and makes the numbers crawlable and AI-citable — directly addressing the 0-in-DOM and llms.txt findings.',
    tone: 'warn',
  },
  {
    priority: 'P3',
    title: 'Replace the duplicate testimonials with distinct proof',
    detail:
      'Swap the three identical quotes for varied, fully attributed testimonials with measurable outcomes. Pair each with a company name or logo to make the social proof concrete.',
    tone: 'warn',
  },
  {
    priority: 'P4',
    title: 'Bring trust + a headline metric above the fold',
    detail:
      'Surface the “Trusted by” client logos and one quantified proof stat right next to the hero demo form, so visitors see credibility before they scroll.',
    tone: 'neutral',
  },
  {
    priority: 'P5',
    title: 'Focus the page on one primary CTA',
    detail:
      'Trim the 39-link header and de-emphasise competing CTAs so “Schedule a Demo” is the obvious next step on every screen. Keep the inline 2-step form — it is already low-friction — and place supporting ROI / social proof beside it to lift completion.',
    tone: 'neutral',
  },
]

// ---------------------------------------------------------------------------
// AI VISIBILITY
// ---------------------------------------------------------------------------
export const aiHeadline = {
  visibility: '26',
  mentions: '83',
  citedPages: '568',
}

export const aiPlatforms: { platform: string; mentions: string; citedPages: string }[] = [
  { platform: 'ChatGPT', mentions: '12', citedPages: '186' },
  { platform: 'Google AI Overview', mentions: '23', citedPages: '120' },
  { platform: 'Google AI Mode', mentions: '22', citedPages: '282' },
  { platform: 'Gemini', mentions: '26', citedPages: '79' },
]

// Company vs the analysis's stated 80% optimization threshold.
export const aiSearchHealth = { company: 75, threshold: 80, issues: '1,664' }

export const aiCountries: { country: string; visibility: string; mentions: string }[] = [
  { country: 'Worldwide', visibility: '26', mentions: '83' },
  { country: 'United States', visibility: '28', mentions: '55' },
  { country: 'Canada', visibility: '34', mentions: '26' },
  { country: 'Austria', visibility: '14', mentions: '1' },
]

export const aiCitedSources: { domain: string; mentions: string; isYou?: boolean }[] = [
  { domain: 'cadienttalent.com', mentions: '40', isYou: true },
  { domain: 'indeed.com', mentions: '23' },
  { domain: 'ziprecruiter.com', mentions: '14' },
]

export const aiBlockedStatus: { bot: string; status: string }[] = [
  { bot: 'ChatGPT-User', status: 'All good' },
  { bot: 'OAI-SearchBot', status: 'All good' },
  { bot: 'Googlebot', status: 'All good' },
  { bot: 'Google-Extended', status: 'All good' },
]

export const serpPositions = { organic: '97.3%', otherFeatures: '1.6%' }

export const aiIssues: Issue[] = [
  {
    severity: 'BELOW AVERAGE',
    title: 'AI Search Health sits below the optimization threshold',
    detail:
      'AI Search Health is 75% against an 80% threshold, with 1,664 issues flagged — even though no AI crawlers (ChatGPT-User, OAI-SearchBot, Googlebot, Google-Extended) are blocked.',
    fix: 'Clear the 1,664 flagged issues to push AI Search Health to the 80% threshold.',
  },
  {
    severity: 'NOT PRESENT',
    title: 'llms.txt is missing',
    detail:
      'The crawl flags llms.txt as not found. Without it, AI engines have no declared guidance for how to use the site’s content.',
    fix: 'Publish an llms.txt to steer how AI systems crawl and cite the site.',
  },
  {
    severity: 'BELOW AVERAGE',
    title: 'ChatGPT cites the site least',
    detail:
      'ChatGPT accounts for only 12 mentions — the smallest footprint of the four AI surfaces tracked (vs 23 AI Overview, 22 AI Mode, 26 Gemini).',
    fix: 'Strengthen structured, citable content (FAQs, definitions, comparisons) that ChatGPT tends to reference.',
  },
]

// ---------------------------------------------------------------------------
// COMPETITORS
// ---------------------------------------------------------------------------
export interface Competitor {
  domain: string
  commonKeywords: string
  seKeywords: string
  level: string
  seValue: number
  leads: string
  youHold: string
}

export const competitors: Competitor[] = [
  {
    domain: 'shoprite.com',
    commonKeywords: '1,056',
    seKeywords: '357,549',
    level: '7%',
    seValue: 357549,
    leads: 'Ranks for 357,549 keywords — by far the largest footprint in the set.',
    youHold: 'Only 1,056 keywords overlap with your site; the rest of its footprint is uncontested grocery-retail demand.',
  },
  {
    domain: 'wakefern.com',
    commonKeywords: '292',
    seKeywords: '5,457',
    level: '9%',
    seValue: 5457,
    leads: 'Ranks for 5,457 keywords and shares the most overlap with you (292) of the mid-size set.',
    youHold: 'Competition level is 9%; the overlap is narrow relative to its total footprint.',
  },
  {
    domain: 'shopriteholdings.co.za',
    commonKeywords: '133',
    seKeywords: '2,768',
    level: '10%',
    seValue: 2768,
    leads: 'Ranks for 2,768 keywords and carries the highest competition level in the set (10%).',
    youHold: 'Just 133 shared keywords — most of its footprint does not compete with you.',
  },
  {
    domain: 'shopritela.com',
    commonKeywords: '79',
    seKeywords: '1,205',
    level: '7%',
    seValue: 1205,
    leads: 'Ranks for 1,205 keywords.',
    youHold: 'Smallest overlap in the set (79 keywords).',
  },
  {
    domain: 'erecruit.co',
    commonKeywords: '90',
    seKeywords: '1,128',
    level: '8%',
    seValue: 1128,
    leads: 'Ranks for 1,128 keywords — the closest pure recruiting-software peer in the set.',
    youHold: 'Overlap is 90 keywords; a head-to-head worth watching in the recruiting category.',
  },
]

export const competitorTotal = '4,336'
// Footprint comparison (SE keywords) including the subject domain (12.8K worldwide organic keywords).
export const footprint: { domain: string; value: number; display: string; isYou?: boolean }[] = [
  { domain: 'shoprite.com', value: 357549, display: '357,549' },
  { domain: 'cadienttalent.com', value: 12800, display: '12.8K', isYou: true },
  { domain: 'wakefern.com', value: 5457, display: '5,457' },
  { domain: 'shopriteholdings.co.za', value: 2768, display: '2,768' },
  { domain: 'shopritela.com', value: 1205, display: '1,205' },
  { domain: 'erecruit.co', value: 1128, display: '1,128' },
]

export const competitorInsight =
  'The “competitor” set is dominated by Shoprite-owned and grocery-retail domains. That is a direct consequence of the applicant-portal pattern: cta.cadienttalent.com ranks for Shoprite hiring queries, so keyword-overlap analysis surfaces Shoprite entities rather than recruiting-software rivals. erecruit.co is the one clear product peer in the set.'

// ---------------------------------------------------------------------------
// REVENUE GAPS
// ---------------------------------------------------------------------------
export interface RevenueGap {
  n: string
  title: string
  severity: Severity
  metrics: { label: string; value: string; tone: Tone }[]
  opportunity: string
}

export const revenueGaps: RevenueGap[] = [
  {
    n: '01',
    title: 'Zero paid-search coverage',
    severity: 'NOT PRESENT',
    metrics: [
      { label: 'Paid Traffic', value: '$0', tone: 'bad' },
      { label: 'Paid Keywords', value: '0', tone: 'bad' },
      { label: 'Organic Traffic Cost', value: '$15.9K', tone: 'neutral' },
    ],
    opportunity:
      'The brand runs no paid search at all (0 keywords, $0 traffic) while its organic traffic already carries a $15.9K value. High-intent demand is left entirely to organic, with no way to capture buyers who don’t rank organically today.',
  },
  {
    n: '02',
    title: 'Conversion-intent demand is undersized',
    severity: 'BELOW AVERAGE',
    metrics: [
      { label: 'Transactional share', value: '13.7%', tone: 'warn' },
      { label: 'Transactional traffic', value: '1.8K', tone: 'neutral' },
      { label: 'Informational traffic', value: '4.9K', tone: 'neutral' },
    ],
    opportunity:
      'Transactional keywords are just 13.7% of the set (1.8K traffic) versus 4.9K informational. The funnel skews top-of-funnel; growing purchase-intent coverage converts more of the existing audience.',
  },
  {
    n: '03',
    title: 'Organic footprint is eroding',
    severity: 'DECLINING',
    metrics: [
      { label: 'Organic Keywords', value: '−15%', tone: 'bad' },
      { label: 'Organic Traffic (US)', value: '−10.33%', tone: 'bad' },
      { label: 'Non-Branded Traffic', value: '−11.42%', tone: 'bad' },
    ],
    opportunity:
      'Keywords, traffic and especially non-branded traffic are all declining. Every lost non-branded ranking is a visit going to a competitor instead — recovering them restores top-of-funnel reach.',
  },
  {
    n: '04',
    title: 'Authority is contracting',
    severity: 'DECLINING',
    metrics: [
      { label: 'Backlinks', value: '−7%', tone: 'bad' },
      { label: 'Referring Domains', value: '−2%', tone: 'bad' },
      { label: 'Toxicity', value: 'Unmonitored', tone: 'warn' },
    ],
    opportunity:
      'A shrinking link profile caps how high pages can rank. Reversing the backlink decline and baselining toxicity protects and compounds Authority Score (39).',
  },
  {
    n: '05',
    title: 'AI demand arrives without authority',
    severity: 'BELOW AVERAGE',
    metrics: [
      { label: 'AI Visibility', value: '26', tone: 'neutral' },
      { label: 'AI Search Health', value: '75%', tone: 'warn' },
      { label: 'AI issues flagged', value: '1,664', tone: 'warn' },
    ],
    opportunity:
      'AI surfaces already cite the site (83 mentions, 568 pages) but AI Search Health is below the 80% threshold with 1,664 open issues and no llms.txt. Capturing this channel means being cited as an authority, not just appearing.',
  },
  {
    n: '06',
    title: 'Brand site under-built vs the applicant portal',
    severity: 'CRITICAL',
    metrics: [
      { label: 'Portal share', value: '89.93%', tone: 'warn' },
      { label: 'Brand-site share', value: '10.07%', tone: 'bad' },
      { label: 'Brand-site keywords', value: '1,267', tone: 'bad' },
    ],
    opportunity:
      'The applicant portal generates ~90% of organic traffic while the brand/product site cadienttalent.com captures only 10.07% (1,267 keywords). The product story has almost no organic surface area of its own — a large, owned growth opportunity.',
  },
]

// ---------------------------------------------------------------------------
// ACTION PLAN
// ---------------------------------------------------------------------------
export interface Phase {
  phase: string
  window: string
  priority: string
  items: string[]
}

export const actionPlan: Phase[] = [
  {
    phase: 'Phase 1',
    window: 'Quick wins',
    priority: 'HIGH',
    items: [
      'Repair the homepage proof counters and hard-code static fallback values so no metric renders as 0.',
      'Unblock the internal resources flagged on 2,420 pages in robots.txt so pages render and index.',
      'Publish an llms.txt and begin clearing the 1,664 AI-search issues toward the 80% threshold.',
      'Work down the 97 errors, then the highest-impact slice of the 7,198 warnings.',
      'Replace the three duplicate homepage testimonials with distinct, attributed proof.',
    ],
  },
  {
    phase: 'Phase 2',
    window: 'Authority & content',
    priority: 'HIGH',
    items: [
      'Launch a backlink outreach + reclamation programme to reverse the −7% backlink / −2% referring-domain trend.',
      'Run a backlink audit to baseline the (currently unmonitored) toxicity score and disavow harmful links.',
      'Grow transactional-intent content beyond today’s 13.7% share to deepen the conversion-ready funnel.',
      'Fix Core Web Vitals (currently 0%) on key templates and lift Crawlability (89%) and Internal Linking (71%).',
      'De-duplicate the 28 title tags / 2 content pages and rewrite the 1,303 non-descriptive internal anchors.',
    ],
  },
  {
    phase: 'Phase 3',
    window: 'Expansion',
    priority: 'MEDIUM',
    items: [
      'Build out the brand/product site (cadienttalent.com) so it earns organic surface area beyond the applicant portal’s 89.93% share.',
      'Stand up a paid-search programme to cover high-intent terms the site earns $0 / 0 keywords on today.',
      'Implement International SEO (hreflang + localised pages) where referring-domain demand already exists (Singapore, UK, France, Canada, Germany).',
      'Strengthen citable structured content to grow AI citations — especially ChatGPT, the lowest surface at 12 mentions.',
    ],
  },
]

// Scorecard — current values to move. Targets are only shown where a real
// benchmark/threshold exists in the research; otherwise the direction is given.
export const scorecard: { metric: string; current: string; target: string }[] = [
  { metric: 'Site Health', current: '74%', target: 'Toward 92% (top-tier)' },
  { metric: 'AI Search Health', current: '75%', target: 'Reach 80% threshold' },
  { metric: 'Errors', current: '97', target: 'Reduce' },
  { metric: 'Warnings', current: '7,198', target: 'Reduce' },
  { metric: 'Organic Keywords', current: '12.8K (−15%)', target: 'Reverse decline' },
  { metric: 'Backlinks', current: '36.1K (−7%)', target: 'Reverse decline' },
  { metric: 'Paid Keywords', current: '0', target: 'Launch coverage' },
  { metric: 'Core Web Vitals', current: '0%', target: 'Achieve passing data' },
]
