import type { ReactNode } from 'react'
import type { Kpi, Severity, Tone } from './data'

// --- palette helpers --------------------------------------------------------
export const C = {
  cyan: '#3AC2FC',
  emerald: '#4CCD79',
  orange: '#FF7A1A',
  danger: '#EF4444',
  amber: '#F59E0B',
}

export function toneText(t: Tone): string {
  switch (t) {
    case 'good':
      return 'text-[#4CCD79]'
    case 'warn':
      return 'text-[#F59E0B]'
    case 'bad':
      return 'text-[#EF4444]'
    default:
      return 'text-[#3AC2FC]'
  }
}

const SEV: Record<Severity, string> = {
  CRITICAL: 'bg-[#EF4444]/15 text-[#EF4444] ring-1 ring-[#EF4444]/30',
  EMERGENCY: 'bg-[#EF4444]/20 text-[#FCA5A5] ring-1 ring-[#EF4444]/40',
  'NOT PRESENT': 'bg-[#EF4444]/10 text-[#F87171] ring-1 ring-[#EF4444]/25',
  DECLINING: 'bg-[#FF7A1A]/15 text-[#FF7A1A] ring-1 ring-[#FF7A1A]/30',
  'BELOW AVERAGE': 'bg-[#F59E0B]/15 text-[#F59E0B] ring-1 ring-[#F59E0B]/30',
}

export function SeverityPill({ severity }: { severity: Severity }) {
  return <span className={`pill ${SEV[severity]}`}>{severity}</span>
}

// --- layout -----------------------------------------------------------------
export function Panel({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={`panel p-5 sm:p-6 ${className}`}>{children}</div>
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3AC2FC]">
      {children}
    </p>
  )
}

export function SectionTitle({
  kicker,
  title,
  intro,
}: {
  kicker: string
  title: ReactNode
  intro?: string
}) {
  return (
    <header className="mb-7">
      <SectionLabel>{kicker}</SectionLabel>
      <h2 className="font-display mt-1 text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {intro && <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-400">{intro}</p>}
    </header>
  )
}

// --- KPI card ---------------------------------------------------------------
export function KpiCard({ kpi }: { kpi: Kpi }) {
  return (
    <Panel className="flex flex-col">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        {kpi.label}
      </p>
      <div className="mt-2 flex items-end gap-2">
        <span className={`kpi-num text-3xl sm:text-4xl ${toneText(kpi.tone)}`}>{kpi.value}</span>
        {kpi.change && (
          <span className={`mb-1 text-xs font-semibold ${toneText(kpi.changeTone ?? 'neutral')}`}>
            {kpi.change}
          </span>
        )}
      </div>
      {kpi.sub && <p className="mt-1 text-xs text-slate-500">{kpi.sub}</p>}
      {kpi.severity && (
        <div className="mt-3">
          <SeverityPill severity={kpi.severity} />
        </div>
      )}
      {kpi.note && <p className="mt-2 text-xs leading-relaxed text-slate-400">{kpi.note}</p>}
    </Panel>
  )
}

// --- issue card -------------------------------------------------------------
export function IssueCard({
  severity,
  title,
  detail,
  fix,
  shot,
}: {
  severity: Severity
  title: string
  detail: string
  fix?: string
  shot?: { src: string; caption: string }
}) {
  return (
    <Panel className="border-l-2 border-l-[#EF4444]/40">
      <div className="flex flex-wrap items-center gap-3">
        <SeverityPill severity={severity} />
        <h4 className="font-display text-base font-semibold text-white">{title}</h4>
      </div>
      <p className="mt-2.5 text-sm leading-relaxed text-slate-400">{detail}</p>
      {fix && (
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          <span className="font-semibold text-[#4CCD79]">Fix: </span>
          {fix}
        </p>
      )}
      {shot && (
        <figure className="mt-4">
          <img
            src={shot.src}
            alt={shot.caption}
            loading="lazy"
            className="w-full rounded-lg border border-white/10 bg-white"
          />
          <figcaption className="mt-2 text-xs italic leading-relaxed text-slate-500">
            {shot.caption}
          </figcaption>
        </figure>
      )}
    </Panel>
  )
}

// --- horizontal bar rows ----------------------------------------------------
export function BarRows({
  rows,
  color = C.cyan,
}: {
  rows: { label: string; pct?: string; count?: string; width: number }[]
  color?: string
}) {
  return (
    <div className="space-y-3">
      {rows.map((r) => (
        <div key={r.label}>
          <div className="flex items-baseline justify-between text-sm">
            <span className="text-slate-300">{r.label}</span>
            <span className="text-slate-400">
              {r.pct && <span className="font-semibold text-white">{r.pct}</span>}
              {r.count && <span className="ml-2 text-xs text-slate-500">{r.count}</span>}
            </span>
          </div>
          <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full"
              style={{ width: `${Math.max(2, r.width)}%`, background: color }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

// --- radar chart (site-health dimensions vs one benchmark ring) -------------
export function RadarChart({
  data,
  benchmark,
}: {
  data: { axis: string; value: number; display: string }[]
  benchmark: { label: string; value: number }
}) {
  const size = 360
  const cx = size / 2
  const cy = size / 2
  const R = 120
  const n = data.length
  const pt = (i: number, frac: number) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / n
    return [cx + Math.cos(a) * R * frac, cy + Math.sin(a) * R * frac]
  }
  const poly = (frac: (i: number) => number) =>
    data.map((_, i) => pt(i, frac(i)).join(',')).join(' ')

  const company = poly((i) => data[i].value / 100)
  const bench = poly(() => benchmark.value / 100)

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="mx-auto h-auto w-full max-w-[380px]">
      {[0.25, 0.5, 0.75, 1].map((g) => (
        <polygon
          key={g}
          points={data.map((_, i) => pt(i, g).join(',')).join(' ')}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
        />
      ))}
      {data.map((_, i) => {
        const [x, y] = pt(i, 1)
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(255,255,255,0.07)" />
      })}
      {/* benchmark ring */}
      <polygon
        points={bench}
        fill="none"
        stroke={C.emerald}
        strokeWidth={1.5}
        strokeDasharray="4 4"
      />
      {/* company */}
      <polygon points={company} fill={`${C.cyan}22`} stroke={C.cyan} strokeWidth={2} />
      {data.map((d, i) => {
        const [x, y] = pt(i, d.value / 100)
        return <circle key={i} cx={x} cy={y} r={3} fill={C.cyan} />
      })}
      {data.map((d, i) => {
        const [x, y] = pt(i, 1.16)
        return (
          <text
            key={d.axis}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-slate-400"
            style={{ fontSize: 10 }}
          >
            <tspan>{d.axis}</tspan>
            <tspan x={x} dy={12} className="fill-white" style={{ fontWeight: 600 }}>
              {d.display}
            </tspan>
          </text>
        )
      })}
    </svg>
  )
}

// --- vertical mini bars (e.g. AI mentions per platform) ---------------------
export function VBars({
  data,
  unit = '',
  color = C.cyan,
}: {
  data: { label: string; value: number; display: string }[]
  unit?: string
  color?: string
}) {
  const max = Math.max(...data.map((d) => d.value))
  return (
    <div className="flex items-end justify-between gap-3" style={{ height: 160 }}>
      {data.map((d) => (
        <div key={d.label} className="flex h-full flex-1 flex-col items-center justify-end">
          <span className="mb-1 text-sm font-semibold text-white">{d.display}</span>
          <div
            className="w-full rounded-t-md"
            style={{
              height: `${(d.value / max) * 100}%`,
              minHeight: 6,
              background: `linear-gradient(180deg, ${color}, ${color}66)`,
            }}
          />
          <span className="mt-2 text-center text-[10px] leading-tight text-slate-400">
            {d.label}
            {unit && <span className="block text-slate-600">{unit}</span>}
          </span>
        </div>
      ))}
    </div>
  )
}

// --- log-scale footprint bars ----------------------------------------------
export function FootprintBars({
  data,
}: {
  data: { domain: string; value: number; display: string; isYou?: boolean }[]
}) {
  const maxLog = Math.log10(Math.max(...data.map((d) => d.value)))
  return (
    <div className="space-y-3">
      {data.map((d) => {
        const w = (Math.log10(d.value) / maxLog) * 100
        const color = d.isYou ? C.cyan : 'rgba(148,163,184,0.55)'
        return (
          <div key={d.domain}>
            <div className="flex items-baseline justify-between text-sm">
              <span className={d.isYou ? 'font-semibold text-[#3AC2FC]' : 'text-slate-300'}>
                {d.domain}
                {d.isYou && <span className="ml-2 text-[10px] uppercase text-slate-500">you</span>}
              </span>
              <span className="font-semibold text-white">{d.display}</span>
            </div>
            <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-white/[0.06]">
              <div className="h-full rounded-full" style={{ width: `${w}%`, background: color }} />
            </div>
          </div>
        )
      })}
      <p className="pt-1 text-[11px] text-slate-500">
        Bar length uses a logarithmic scale; labels show the actual keyword counts.
      </p>
    </div>
  )
}

// --- two-bar comparison (company vs threshold) ------------------------------
export function CompareBars({
  companyLabel,
  companyValue,
  benchLabel,
  benchValue,
}: {
  companyLabel: string
  companyValue: number
  benchLabel: string
  benchValue: number
}) {
  const max = Math.max(companyValue, benchValue, 100)
  const Row = ({ label, value, color }: { label: string; value: number; color: string }) => (
    <div>
      <div className="flex items-baseline justify-between text-sm">
        <span className="text-slate-300">{label}</span>
        <span className="kpi-num text-lg" style={{ color }}>
          {value}%
        </span>
      </div>
      <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-white/[0.06]">
        <div className="h-full rounded-full" style={{ width: `${(value / max) * 100}%`, background: color }} />
      </div>
    </div>
  )
  return (
    <div className="space-y-4">
      <Row label={companyLabel} value={companyValue} color={C.danger} />
      <Row label={benchLabel} value={benchValue} color={C.emerald} />
    </div>
  )
}
