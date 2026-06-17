import { cn } from '../../lib/cn.js'

/* ── Button ──────────────────────────────────────────────────────────────── */
const BTN = {
  base: 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 select-none disabled:opacity-50 disabled:pointer-events-none active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
  variants: {
    primary:
      'text-white shadow-lg shadow-brand-600/25 bg-gradient-to-br from-brand-500 to-accent-500 hover:brightness-110 hover:shadow-xl hover:shadow-brand-600/30',
    solid: 'bg-brand-600 text-white hover:bg-brand-700 shadow-sm',
    soft: 'bg-brand-100 text-brand-700 hover:bg-brand-200 dark:bg-brand-500/15 dark:text-brand-200 dark:hover:bg-brand-500/25',
    outline:
      'border border-line-strong text-ink hover:bg-surface-2 hover:border-brand-400',
    ghost: 'text-ink-soft hover:bg-surface-2 hover:text-ink',
    danger: 'bg-danger text-white hover:brightness-110 shadow-sm',
  },
  sizes: {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-sm px-4 py-2.5',
    lg: 'text-base px-6 py-3',
    icon: 'p-2.5',
  },
}

export function Button({
  as: As = 'button',
  variant = 'primary',
  size = 'md',
  className,
  ...rest
}) {
  return (
    <As
      className={cn(BTN.base, BTN.variants[variant], BTN.sizes[size], className)}
      {...rest}
    />
  )
}

/* ── Card ────────────────────────────────────────────────────────────────── */
export function Card({ className, interactive = false, ...rest }) {
  return (
    <div
      className={cn(
        'surface-card',
        interactive &&
          'transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-600/10 hover:border-brand-300/70 cursor-pointer',
        className,
      )}
      {...rest}
    />
  )
}

/* ── Badge / Chip ────────────────────────────────────────────────────────── */
const BADGE = {
  brand: 'bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-200',
  accent: 'bg-accent-100 text-accent-700 dark:bg-accent-500/15 dark:text-accent-300',
  success: 'bg-success-soft text-success dark:bg-success/15 dark:text-emerald-300',
  warn: 'bg-warn-soft text-warn dark:bg-warn/15 dark:text-amber-300',
  danger: 'bg-danger-soft text-danger dark:bg-danger/15 dark:text-rose-300',
  info: 'bg-info-soft text-info dark:bg-info/15 dark:text-sky-300',
  neutral: 'bg-surface-2 text-ink-soft',
}

export function Badge({ tone = 'neutral', className, ...rest }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold',
        BADGE[tone],
        className,
      )}
      {...rest}
    />
  )
}

/* ── K-level badge ───────────────────────────────────────────────────────── */
const KINFO = {
  K1: { tone: 'info', label: 'K1 · Nhớ' },
  K2: { tone: 'brand', label: 'K2 · Hiểu' },
  K3: { tone: 'accent', label: 'K3 · Vận dụng' },
}
export function KLevelBadge({ k, withLabel = true, className }) {
  const info = KINFO[k] || KINFO.K1
  return (
    <Badge tone={info.tone} className={className} title={`Cognitive level ${k}`}>
      {withLabel ? info.label : k}
    </Badge>
  )
}

/* ── ProgressRing ────────────────────────────────────────────────────────── */
export function ProgressRing({
  value = 0,
  size = 44,
  stroke = 4,
  className,
  children,
}) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const pct = Math.max(0, Math.min(100, value))
  return (
    <div className={cn('relative inline-grid place-items-center', className)}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--line)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#ringgrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (pct / 100) * c}
          style={{ transition: 'stroke-dashoffset .6s var(--ease-out-quint)' }}
        />
        <defs>
          <linearGradient id="ringgrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-brand-500)" />
            <stop offset="100%" stopColor="var(--color-accent-500)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  )
}

/* ── ProgressBar ─────────────────────────────────────────────────────────── */
export function ProgressBar({ value = 0, className, tone = 'gradient' }) {
  const pct = Math.max(0, Math.min(100, value))
  return (
    <div className={cn('h-2 w-full rounded-full bg-surface-3 overflow-hidden', className)}>
      <div
        className={cn(
          'h-full rounded-full transition-[width] duration-700 ease-out',
          tone === 'gradient'
            ? 'bg-gradient-to-r from-brand-500 to-accent-500'
            : 'bg-success',
        )}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
