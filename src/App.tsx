import { useState } from 'react'
import * as D from './data'
import {
  BarRows,
  C,
  CompareBars,
  FootprintBars,
  IssueCard,
  KpiCard,
  Panel,
  RadarChart,
  SectionLabel,
  SectionTitle,
  SeverityPill,
  toneText,
  VBars,
} from './components'

type Tab = 'overview' | 'gap' | 'ai' | 'competitors' | 'revenue' | 'homepage' | 'action'
type Sub = 'seo' | 'keywords' | 'backlinks'

const TABS: [Tab, string][] = [
  ['overview', 'Overview'],
  ['gap', 'Gap Analysis'],
  ['ai', 'AI Visibility'],
  ['competitors', 'Competitors'],
  ['revenue', 'Revenue Gaps'],
  ['homepage', 'Homepage Recommendations'],
  ['action', 'Action Plan'],
]

const SUBS: [Sub, string][] = [
  ['seo', 'SEO'],
  ['keywords', 'Keywords'],
  ['backlinks', 'Backlinks'],
]

function Grid({ cols, children }: { cols: string; children: React.ReactNode }) {
  return <div className={`grid gap-4 ${cols}`}>{children}</div>
}

export default function App() {
  const [tab, setTab] = useState<Tab>('overview')
  const [sub, setSub] = useState<Sub>('seo')

  return (
    <div className="min-h-screen">
      {/* ---- Header ---- */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0A0F1E]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span
              className="flex h-7 w-7 items-center justify-center rounded-lg text-sm font-bold text-[#0A0F1E]"
              style={{ background: `linear-gradient(135deg, ${C.cyan}, ${C.emerald})` }}
            >
              C
            </span>
            <div className="leading-tight">
              <p className="font-display text-sm font-semibold text-white">Growth Intelligence</p>
              <p className="text-[11px] text-slate-500">{D.company.domain}</p>
            </div>
          </div>
          <div className="text-right text-sm font-semibold">
            <span className="text-[#3AC2FC]">CommerceV3</span>
            <span className="mx-1.5 text-slate-500">×</span>
            <span className="text-white">{D.company.name}</span>
          </div>
        </div>
        {/* ---- Tab nav ---- */}
        <nav className="mx-auto max-w-6xl px-2 sm:px-5">
          <div className="no-scrollbar flex gap-1 overflow-x-auto pb-2">
            {TABS.map(([id, label]) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                aria-current={tab === id}
                className={`tab-link ${tab === id ? 'tab-link-active' : ''}`}
              >
                {label}
                {tab === id && (
                  <span
                    className="absolute -bottom-2 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full"
                    style={{ background: C.cyan }}
                  />
                )}
              </button>
            ))}
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {/* ===================== OVERVIEW ===================== */}
        <section hidden={tab !== 'overview'}>
          <div className="mb-9">
            <SectionLabel>Snapshot · {D.company.name}</SectionLabel>
            <h1 className="font-display mt-2 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              Solid authority,{' '}
              <span
                style={{
                  background: `linear-gradient(90deg, ${C.orange}, #FFB070)`,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                a shrinking organic engine
              </span>
              .
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-400">
              {D.company.name} holds a “Very good” Authority Score and still-growing organic
              traffic, but its keyword footprint, backlinks and site health are all moving the wrong
              way — and nearly all organic reach comes from client applicant portals rather than the
              brand site.
            </p>
          </div>

          <Grid cols="grid-cols-2 lg:grid-cols-4">
            {D.heroKpis.map((k) => (
              <KpiCard key={k.label} kpi={k} />
            ))}
          </Grid>

          <h3 className="font-display mb-4 mt-12 text-lg font-semibold text-white">
            Executive summary
          </h3>
          <Grid cols="grid-cols-2 lg:grid-cols-4">
            {D.execKpis.map((k) => (
              <KpiCard key={k.label} kpi={k} />
            ))}
          </Grid>

          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            <Panel>
              <h3 className="font-display text-lg font-semibold text-white">What these scores mean</h3>
              <dl className="mt-4 space-y-4">
                {D.overviewExplainers.map((e) => (
                  <div key={e.term}>
                    <dt className="text-sm font-semibold text-[#3AC2FC]">{e.term}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-slate-400">{e.meaning}</dd>
                  </div>
                ))}
              </dl>
            </Panel>
            <Panel>
              <h3 className="font-display text-lg font-semibold text-white">
                Site-health dimensions vs top-tier benchmark
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Cyan = your crawl scores · dashed emerald ring = {D.siteHealthBenchmark.label}.
              </p>
              <RadarChart data={D.siteHealthRadar} benchmark={D.siteHealthBenchmark} />
            </Panel>
          </div>

          <Panel className="mt-4">
            <h3 className="font-display text-lg font-semibold text-white">Live data snapshot</h3>
            <div className="mt-4 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
              {D.snapshot.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center justify-between border-b border-white/5 py-1.5"
                >
                  <span className="text-sm text-slate-400">{s.label}</span>
                  <span className={`text-sm font-semibold ${toneText(s.tone)}`}>{s.value}</span>
                </div>
              ))}
            </div>
          </Panel>
        </section>

        {/* ===================== GAP ANALYSIS ===================== */}
        <section hidden={tab !== 'gap'}>
          <SectionTitle
            kicker="Section 2"
            title="Gap Analysis"
            intro="A diagnostic of what is underperforming across technical SEO, keyword coverage, backlink quality, and on-site conversion. Each issue is filed under its single most relevant category."
          />

          <div className="no-scrollbar -mt-2 mb-7 flex gap-2 overflow-x-auto">
            {SUBS.map(([id, label]) => (
              <button
                key={id}
                onClick={() => setSub(id)}
                aria-current={sub === id}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                  sub === id
                    ? 'bg-[#3AC2FC] text-[#0A0F1E]'
                    : 'bg-white/[0.05] text-slate-300 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* --- SEO --- */}
          <div hidden={sub !== 'seo'}>
            <SectionLabel>A · Technical SEO health</SectionLabel>
            <h3 className="font-display mb-5 mt-1 text-2xl font-bold text-white">
              Crawl, errors and on-page signals
            </h3>
            <Grid cols="grid-cols-2 lg:grid-cols-4">
              {D.seoKpis.map((k) => (
                <KpiCard key={k.label} kpi={k} />
              ))}
            </Grid>
            <h4 className="font-display mb-4 mt-9 text-lg font-semibold text-white">
              Critical issues — SEO
            </h4>
            <div className="grid gap-4">
              {D.seoIssues.map((i) => (
                <IssueCard key={i.title} {...i} />
              ))}
            </div>
          </div>

          {/* --- KEYWORDS --- */}
          <div hidden={sub !== 'keywords'}>
            <SectionLabel>B · Keyword coverage & intent</SectionLabel>
            <h3 className="font-display mb-5 mt-1 text-2xl font-bold text-white">
              A contracting, portal-dependent footprint
            </h3>
            <Grid cols="grid-cols-2 lg:grid-cols-3">
              {D.keywordKpis.map((k) => (
                <KpiCard key={k.label} kpi={k} />
              ))}
            </Grid>

            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <Panel>
                <h4 className="font-display text-base font-semibold text-white">Keywords by intent</h4>
                <p className="mb-4 mt-1 text-xs text-slate-500">
                  Transactional is the smallest segment at 13.7%.
                </p>
                <BarRows
                  rows={D.keywordIntent.map((k) => ({
                    label: k.label,
                    pct: `${k.pct}%`,
                    count: `${k.keywords} kw · ${k.traffic} traffic`,
                    width: k.pct,
                  }))}
                />
              </Panel>
              <Panel>
                <h4 className="font-display text-base font-semibold text-white">
                  Where the rankings live
                </h4>
                <p className="mb-4 mt-1 text-xs text-slate-500">
                  Organic traffic by subdomain — the applicant portal vs the brand site.
                </p>
                <BarRows
                  color={C.orange}
                  rows={D.subdomainSplit.map((s) => ({
                    label: s.name,
                    pct: s.trafficPct,
                    count: `${s.keywords} kw`,
                    width: s.pct,
                  }))}
                />
                <p className="mt-4 text-xs leading-relaxed text-slate-400">
                  The brand/product site holds only 10.07% of organic traffic; the rest is
                  client-portal job demand.
                </p>
              </Panel>
            </div>

            <Panel className="mt-4">
              <h4 className="font-display text-base font-semibold text-white">Top organic keywords (US)</h4>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-[11px] uppercase tracking-wider text-slate-500">
                      <th className="pb-2 pr-4 font-semibold">Keyword</th>
                      <th className="pb-2 pr-4 font-semibold">Intent</th>
                      <th className="pb-2 pr-4 font-semibold">Pos.</th>
                      <th className="pb-2 pr-4 font-semibold">Volume</th>
                      <th className="pb-2 pr-4 font-semibold">CPC</th>
                      <th className="pb-2 font-semibold">Traffic %</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    {D.topKeywords.map((k) => (
                      <tr key={k.keyword} className="border-t border-white/5">
                        <td className="py-2.5 pr-4 font-medium text-white">{k.keyword}</td>
                        <td className="py-2.5 pr-4 text-slate-400">{k.intent}</td>
                        <td className="py-2.5 pr-4">{k.position}</td>
                        <td className="py-2.5 pr-4">{k.volume}</td>
                        <td className="py-2.5 pr-4">{k.cpc}</td>
                        <td className="py-2.5">{k.trafficPct}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-slate-500">
                Newly ranking terms include {D.newRankingKeywords.map((k) => k.keyword).join(', ')} —
                all hiring queries served via client portals.
              </p>
            </Panel>

            <h4 className="font-display mb-4 mt-9 text-lg font-semibold text-white">
              Critical issues — Keywords
            </h4>
            <div className="grid gap-4">
              {D.keywordIssues.map((i) => (
                <IssueCard key={i.title} {...i} />
              ))}
            </div>
          </div>

          {/* --- BACKLINKS --- */}
          <div hidden={sub !== 'backlinks'}>
            <SectionLabel>C · Backlink quality</SectionLabel>
            <h3 className="font-display mb-5 mt-1 text-2xl font-bold text-white">
              Where authority comes from
            </h3>
            <Grid cols="grid-cols-2 lg:grid-cols-3">
              {D.backlinkKpis.map((k) => (
                <KpiCard key={k.label} kpi={k} />
              ))}
            </Grid>

            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <Panel>
                <h4 className="font-display text-base font-semibold text-white">Backlink types</h4>
                <div className="mt-4">
                  <BarRows rows={D.backlinkTypes} />
                </div>
                <h4 className="font-display mt-6 text-base font-semibold text-white">Link attributes</h4>
                <div className="mt-4">
                  <BarRows
                    rows={D.linkAttributes.map((l) => ({ label: l.label, pct: l.pct, count: l.count, width: l.width }))}
                    color={C.emerald}
                  />
                </div>
              </Panel>
              <Panel>
                <h4 className="font-display text-base font-semibold text-white">
                  Referring-domain categories
                </h4>
                <div className="mt-4">
                  <BarRows rows={D.referringCategories} />
                </div>
                <h4 className="font-display mt-6 text-base font-semibold text-white">Top anchors</h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {D.topAnchors.map((a) => (
                    <span
                      key={a}
                      className="rounded-md bg-white/[0.05] px-2.5 py-1 text-xs text-slate-300"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </Panel>
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-3">
              <Panel>
                <h4 className="font-display text-base font-semibold text-white">TLD distribution</h4>
                <table className="mt-3 w-full text-sm">
                  <tbody className="text-slate-300">
                    {D.tldDistribution.map((t) => (
                      <tr key={t.tld} className="border-t border-white/5">
                        <td className="py-2 text-slate-400">{t.tld}</td>
                        <td className="py-2 text-right font-semibold text-white">{t.pct}</td>
                        <td className="py-2 pl-3 text-right text-xs text-slate-500">{t.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Panel>
              <Panel>
                <h4 className="font-display text-base font-semibold text-white">Top countries</h4>
                <table className="mt-3 w-full text-sm">
                  <tbody className="text-slate-300">
                    {D.topCountriesBacklinks.map((t) => (
                      <tr key={t.country} className="border-t border-white/5">
                        <td className="py-2 text-slate-400">{t.country}</td>
                        <td className="py-2 text-right font-semibold text-white">{t.pct}</td>
                        <td className="py-2 pl-3 text-right text-xs text-slate-500">{t.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Panel>
              <Panel>
                <h4 className="font-display text-base font-semibold text-white">Similar profiles</h4>
                <table className="mt-3 w-full text-sm">
                  <tbody className="text-slate-300">
                    {D.similarProfiles.map((t) => (
                      <tr key={t.domain} className="border-t border-white/5">
                        <td className="py-2 text-slate-400">{t.domain}</td>
                        <td className="py-2 text-right font-semibold text-white">{t.level}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Panel>
            </div>

            <h4 className="font-display mb-4 mt-9 text-lg font-semibold text-white">
              Critical issues — Backlinks
            </h4>
            <div className="grid gap-4">
              {D.backlinkIssues.map((i) => (
                <IssueCard key={i.title} {...i} />
              ))}
            </div>
          </div>

        </section>

        {/* ===================== HOMEPAGE IMPROVEMENT RECOMMENDATIONS ===================== */}
        <section hidden={tab !== 'homepage'}>
          <SectionTitle
            kicker="Section 6"
            title="Homepage Improvement Recommendations"
            intro="A heuristic walkthrough of the live cadienttalent.com homepage and its primary demo-request path — identifying what converts and what leaks, with prioritised, evidence-based improvements."
          />

          <Grid cols="sm:grid-cols-2">
            {D.conversionStrengths.map((s) => (
              <Panel key={s.title} className="border-l-2 border-l-[#4CCD79]/40">
                <div className="flex items-center gap-2">
                  <span className="text-[#4CCD79]">✓</span>
                  <h4 className="font-display text-base font-semibold text-white">{s.title}</h4>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.detail}</p>
              </Panel>
            ))}
          </Grid>

          <h4 className="font-display mb-4 mt-9 text-lg font-semibold text-white">
            Critical issues — Conversion
          </h4>
          <div className="grid gap-4">
            {D.conversionIssues.map((i) => (
              <IssueCard key={i.title} {...i} />
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-[#3AC2FC]/25 bg-[#3AC2FC]/[0.04] p-5 sm:p-7">
            <SectionLabel>Action focus</SectionLabel>
            <h3 className="font-display mt-1 text-2xl font-bold text-white">
              How we can improve the homepage to get better conversions
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-400">
              Prioritised, evidence-based changes drawn from the live homepage walkthrough —
              ordered by conversion impact.
            </p>
            <div className="mt-6 grid gap-4">
              {D.homepageImprovements.map((h) => (
                <Panel key={h.priority} className="flex gap-4">
                  <span className={`kpi-num text-xl ${toneText(h.tone)}`}>{h.priority}</span>
                  <div>
                    <h4 className="font-display text-base font-semibold text-white">{h.title}</h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{h.detail}</p>
                  </div>
                </Panel>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== AI VISIBILITY ===================== */}
        <section hidden={tab !== 'ai'}>
          <SectionTitle
            kicker="Section 3"
            title="AI Visibility"
            intro="How often AI search and chat platforms cite cadienttalent.com as a source, and how AI-ready the site is."
          />

          <Grid cols="grid-cols-3">
            <KpiCard kpi={{ label: 'AI Visibility', value: D.aiHeadline.visibility, tone: 'neutral' }} />
            <KpiCard kpi={{ label: 'Total AI Mentions', value: D.aiHeadline.mentions, tone: 'neutral' }} />
            <KpiCard kpi={{ label: 'Cited Pages', value: D.aiHeadline.citedPages, tone: 'neutral' }} />
          </Grid>

          <h3 className="font-display mb-4 mt-10 text-lg font-semibold text-white">By platform</h3>
          <Grid cols="grid-cols-2 lg:grid-cols-4">
            {D.aiPlatforms.map((p) => (
              <Panel key={p.platform}>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  {p.platform}
                </p>
                <p className="kpi-num mt-2 text-3xl text-[#3AC2FC]">{p.mentions}</p>
                <p className="text-xs text-slate-500">mentions</p>
                <p className="mt-3 text-sm text-slate-300">
                  <span className="font-semibold text-white">{p.citedPages}</span> cited pages
                </p>
              </Panel>
            ))}
          </Grid>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <Panel>
              <h3 className="font-display text-lg font-semibold text-white">
                AI Search Health vs optimization threshold
              </h3>
              <p className="mb-5 mt-1 text-xs text-slate-500">
                {D.aiSearchHealth.issues} issues flagged. Red = your site · emerald = the 80% threshold
                cited in the analysis.
              </p>
              <CompareBars
                companyLabel="cadienttalent.com — AI Search Health"
                companyValue={D.aiSearchHealth.company}
                benchLabel="Optimization threshold"
                benchValue={D.aiSearchHealth.threshold}
              />
            </Panel>
            <Panel>
              <h3 className="font-display text-lg font-semibold text-white">Mentions by platform</h3>
              <div className="mt-5">
                <VBars
                  data={D.aiPlatforms.map((p) => ({
                    label: p.platform,
                    value: Number(p.mentions),
                    display: p.mentions,
                  }))}
                />
              </div>
            </Panel>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <Panel>
              <h4 className="font-display text-base font-semibold text-white">Visibility by country</h4>
              <table className="mt-3 w-full text-sm">
                <thead>
                  <tr className="text-[11px] uppercase tracking-wider text-slate-500">
                    <th className="pb-2 text-left font-semibold">Country</th>
                    <th className="pb-2 text-right font-semibold">Vis.</th>
                    <th className="pb-2 text-right font-semibold">Mentions</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  {D.aiCountries.map((c) => (
                    <tr key={c.country} className="border-t border-white/5">
                      <td className="py-2 text-slate-400">{c.country}</td>
                      <td className="py-2 text-right font-semibold text-white">{c.visibility}</td>
                      <td className="py-2 text-right">{c.mentions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Panel>
            <Panel>
              <h4 className="font-display text-base font-semibold text-white">Top cited sources</h4>
              <table className="mt-3 w-full text-sm">
                <tbody className="text-slate-300">
                  {D.aiCitedSources.map((s) => (
                    <tr key={s.domain} className="border-t border-white/5">
                      <td className={`py-2 ${s.isYou ? 'font-semibold text-[#3AC2FC]' : 'text-slate-400'}`}>
                        {s.domain}
                        {s.isYou && <span className="ml-2 text-[10px] uppercase text-slate-500">you</span>}
                      </td>
                      <td className="py-2 text-right font-semibold text-white">{s.mentions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-4 text-xs leading-relaxed text-slate-500">
                SERP positions: {D.serpPositions.organic} organic · {D.serpPositions.otherFeatures}{' '}
                other SERP features.
              </p>
            </Panel>
            <Panel>
              <h4 className="font-display text-base font-semibold text-white">AI crawler access</h4>
              <ul className="mt-3 space-y-2 text-sm">
                {D.aiBlockedStatus.map((b) => (
                  <li key={b.bot} className="flex items-center justify-between border-t border-white/5 py-1.5">
                    <span className="text-slate-400">{b.bot}</span>
                    <span className="font-semibold text-[#4CCD79]">✓ {b.status}</span>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>

          <h4 className="font-display mb-4 mt-9 text-lg font-semibold text-white">
            Critical issues — AI Visibility
          </h4>
          <div className="grid gap-4">
            {D.aiIssues.map((i) => (
              <IssueCard key={i.title} {...i} />
            ))}
          </div>
        </section>

        {/* ===================== COMPETITORS ===================== */}
        <section hidden={tab !== 'competitors'}>
          <SectionTitle
            kicker="Section 4"
            title="Competitors"
            intro={`Out of ${D.competitorTotal} competing domains identified by keyword overlap, five primary organic competitors stand out.`}
          />

          <Panel>
            <h3 className="font-display text-lg font-semibold text-white">Total keyword footprint</h3>
            <p className="mb-5 mt-1 text-xs text-slate-500">
              Search-engine keywords each domain ranks for, with {D.company.domain} for reference.
            </p>
            <FootprintBars data={D.footprint} />
          </Panel>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {D.competitors.map((c) => (
              <Panel key={c.domain}>
                <div className="flex items-center justify-between">
                  <h4 className="font-display text-base font-semibold text-white">{c.domain}</h4>
                  <span className="pill bg-white/[0.06] text-slate-300">Comp. level {c.level}</span>
                </div>
                <div className="mt-3 flex gap-6">
                  <div>
                    <p className="kpi-num text-2xl text-[#3AC2FC]">{c.seKeywords}</p>
                    <p className="text-[11px] uppercase tracking-wider text-slate-500">SE keywords</p>
                  </div>
                  <div>
                    <p className="kpi-num text-2xl text-white">{c.commonKeywords}</p>
                    <p className="text-[11px] uppercase tracking-wider text-slate-500">Shared with you</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  <p className="text-slate-400">
                    <span className="font-semibold text-[#FF7A1A]">Where they lead: </span>
                    {c.leads}
                  </p>
                  <p className="text-slate-400">
                    <span className="font-semibold text-[#4CCD79]">Where you hold ground: </span>
                    {c.youHold}
                  </p>
                </div>
              </Panel>
            ))}
          </div>

          <Panel className="mt-4 border-l-2 border-l-[#3AC2FC]/40">
            <h4 className="font-display text-base font-semibold text-white">Reading the competitor set</h4>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{D.competitorInsight}</p>
          </Panel>
        </section>

        {/* ===================== REVENUE GAPS ===================== */}
        <section hidden={tab !== 'revenue'}>
          <SectionTitle
            kicker="Section 5"
            title="Revenue Gaps"
            intro="Concrete places where the current strategy leaves growth on the table — each tied directly to a measured figure in the research."
          />
          <div className="grid gap-4">
            {D.revenueGaps.map((g) => (
              <Panel key={g.n}>
                <div className="flex items-start gap-4">
                  <span className="kpi-num text-2xl text-slate-600">{g.n}</span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h4 className="font-display text-lg font-semibold text-white">{g.title}</h4>
                      <SeverityPill severity={g.severity} />
                    </div>
                    <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
                      {g.metrics.map((m) => (
                        <div key={m.label}>
                          <p className={`kpi-num text-xl ${toneText(m.tone)}`}>{m.value}</p>
                          <p className="text-[11px] uppercase tracking-wider text-slate-500">
                            {m.label}
                          </p>
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-slate-400">{g.opportunity}</p>
                  </div>
                </div>
              </Panel>
            ))}
          </div>
        </section>

        {/* ===================== ACTION PLAN ===================== */}
        <section hidden={tab !== 'action'}>
          <SectionTitle
            kicker="Section 6"
            title="Action Plan"
            intro="A phased roadmap to stabilise the technical base, reverse the organic and backlink decline, and build owned brand-site and AI presence. Every item maps to a documented gap above."
          />

          <div className="grid gap-4 lg:grid-cols-3">
            {D.actionPlan.map((p) => (
              <Panel key={p.phase} className="flex flex-col">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-display text-lg font-semibold text-white">{p.phase}</p>
                    <p className="text-xs text-slate-500">{p.window}</p>
                  </div>
                  <span className="pill bg-[#3AC2FC]/15 text-[#3AC2FC]">{p.priority}</span>
                </div>
                <ul className="mt-4 space-y-3">
                  {p.items.map((it, idx) => (
                    <li key={idx} className="flex gap-2.5 text-sm leading-relaxed text-slate-300">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#3AC2FC]" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </Panel>
            ))}
          </div>

          <Panel className="mt-4">
            <h3 className="font-display text-lg font-semibold text-white">Focus scorecard</h3>
            <p className="mb-4 mt-1 text-xs text-slate-500">
              Current measured values and the direction to move. Targets are shown only where the
              research states an explicit benchmark or threshold.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-[11px] uppercase tracking-wider text-slate-500">
                    <th className="pb-2 pr-4 font-semibold">Metric</th>
                    <th className="pb-2 pr-4 font-semibold">Current</th>
                    <th className="pb-2 font-semibold">Target / direction</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  {D.scorecard.map((s) => (
                    <tr key={s.metric} className="border-t border-white/5">
                      <td className="py-2.5 pr-4 font-medium text-white">{s.metric}</td>
                      <td className="py-2.5 pr-4">{s.current}</td>
                      <td className="py-2.5 text-[#4CCD79]">{s.target}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        </section>
      </main>

      <footer className="border-t border-white/10 py-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 text-xs text-slate-500 sm:flex-row">
          <span>Confidential — Prepared for {D.company.name}</span>
          <span>CommerceV3 · In-House Research</span>
        </div>
      </footer>
    </div>
  )
}
