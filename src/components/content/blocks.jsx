import { useState } from 'react'
import { motion } from 'motion/react'
import Icon from '../ui/Icon.jsx'
import { cn } from '../../lib/cn.js'
import { renderInline } from './MD.jsx'

/* ── Callout ───────────────────────────────────────────────────────────────── */
const CALLOUT = {
  tip: { icon: 'lightbulb', label: 'Mẹo', cls: 'border-success/40 bg-success-soft/50 dark:bg-success/10', ic: 'text-success' },
  info: { icon: 'info', label: 'Lưu ý', cls: 'border-info/40 bg-info-soft/50 dark:bg-info/10', ic: 'text-info' },
  warn: { icon: 'warn', label: 'Cẩn thận', cls: 'border-warn/40 bg-warn-soft/50 dark:bg-warn/10', ic: 'text-warn' },
  'exam-trap': {
    icon: 'target',
    label: 'Bẫy thi',
    cls: 'border-danger/50 bg-danger-soft/50 dark:bg-danger/10',
    ic: 'text-danger',
  },
  principle: {
    icon: 'star',
    label: 'Nguyên lý',
    cls: 'border-brand-300 bg-brand-50/70 dark:border-brand-500/30 dark:bg-brand-500/10',
    ic: 'text-brand-500',
  },
  definition: {
    icon: 'book',
    label: 'Định nghĩa',
    cls: 'border-accent-300 bg-accent-50/60 dark:border-accent-500/30 dark:bg-accent-500/10',
    ic: 'text-accent-500',
  },
}
export function Callout({ variant = 'info', title, md }) {
  const c = CALLOUT[variant] || CALLOUT.info
  return (
    <div className={cn('my-5 rounded-2xl border p-4 sm:p-5', c.cls)}>
      <div className="mb-1.5 flex items-center gap-2">
        <Icon name={c.icon} size={18} className={c.ic} />
        <span className="text-sm font-bold text-ink">{title || c.label}</span>
      </div>
      <div className="text-[0.95rem] leading-relaxed text-ink-soft">{renderInline(md)}</div>
    </div>
  )
}

/* ── Analogy ───────────────────────────────────────────────────────────────── */
export function Analogy({ emoji = '💡', title, md }) {
  return (
    <div className="my-5 overflow-hidden rounded-2xl border border-accent-200 bg-gradient-to-br from-accent-50 to-brand-50 dark:border-accent-500/30 dark:from-accent-500/10 dark:to-brand-500/10">
      <div className="flex gap-4 p-5">
        <div className="text-3xl leading-none">{emoji}</div>
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-accent-600 dark:text-accent-300">
            Ví von dễ nhớ
          </div>
          {title && <div className="font-bold text-ink">{title}</div>}
          <div className="mt-1 text-[0.95rem] text-ink-soft">{renderInline(md)}</div>
        </div>
      </div>
    </div>
  )
}

/* ── Key term ──────────────────────────────────────────────────────────────── */
export function KeyTerm({ en, vn, def }) {
  return (
    <div className="my-5 rounded-2xl border border-line bg-surface-2 p-4">
      <div className="flex flex-wrap items-baseline gap-2">
        <span className="font-mono text-base font-bold text-brand-600 dark:text-brand-300">{en}</span>
        {vn && <span className="text-sm text-ink-faint">· {vn}</span>}
      </div>
      <p className="mt-1.5 text-[0.95rem] text-ink-soft">{renderInline(def)}</p>
    </div>
  )
}

/* ── Example ───────────────────────────────────────────────────────────────── */
export function Example({ title, md }) {
  return (
    <div className="my-5 rounded-2xl border border-line bg-surface p-5">
      <div className="mb-1.5 flex items-center gap-2 text-sm font-bold text-ink">
        <Icon name="flask" size={16} className="text-brand-500" />
        {title || 'Ví dụ'}
      </div>
      <div className="text-[0.95rem] text-ink-soft">{renderInline(md)}</div>
    </div>
  )
}

/* ── Quote ─────────────────────────────────────────────────────────────────── */
export function Quote({ md, who }) {
  return (
    <blockquote className="my-6 border-l-4 border-brand-400 pl-5">
      <p className="text-lg font-medium italic text-ink">“{renderInline(md)}”</p>
      {who && <footer className="mt-1 text-sm text-ink-faint">— {who}</footer>}
    </blockquote>
  )
}

/* ── List ──────────────────────────────────────────────────────────────────── */
export function ListBlock({ ordered, items = [] }) {
  const Tag = ordered ? 'ol' : 'ul'
  return (
    <Tag
      className={cn(
        'my-4 space-y-2 pl-1',
        ordered ? 'list-none counter-reset' : '',
      )}
    >
      {items.map((it, i) => (
        <li key={i} className="flex gap-3 text-[0.97rem] text-ink-soft">
          {ordered ? (
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand-100 text-xs font-bold text-brand-700 dark:bg-brand-500/20 dark:text-brand-200">
              {i + 1}
            </span>
          ) : (
            <Icon name="dot" size={16} className="mt-1 shrink-0 text-brand-400" />
          )}
          <span>{renderInline(it)}</span>
        </li>
      ))}
    </Tag>
  )
}

/* ── Table ─────────────────────────────────────────────────────────────────── */
export function TableBlock({ headers = [], rows = [], caption }) {
  return (
    <figure className="my-6 overflow-x-auto">
      <table className="w-full border-collapse overflow-hidden rounded-xl text-sm">
        <thead>
          <tr className="bg-surface-2">
            {headers.map((h, i) => (
              <th key={i} className="border border-line p-3 text-left font-bold text-ink">
                {renderInline(h)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri} className="even:bg-surface-2/40">
              {r.map((cell, ci) => (
                <td key={ci} className="border border-line p-3 align-top text-ink-soft">
                  {renderInline(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {caption && <figcaption className="mt-2 text-center text-xs text-ink-faint">{caption}</figcaption>}
    </figure>
  )
}

/* ── Flashcards ────────────────────────────────────────────────────────────── */
export function Flashcards({ cards = [] }) {
  const [i, setI] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const card = cards[i]
  const go = (d) => {
    setFlipped(false)
    setI((x) => (x + d + cards.length) % cards.length)
  }
  return (
    <div className="my-6">
      <div className="mb-2 flex items-center justify-between text-xs text-ink-faint">
        <span className="flex items-center gap-1">
          <Icon name="layers" size={14} /> Flashcards
        </span>
        <span>
          {i + 1}/{cards.length}
        </span>
      </div>
      <button
        onClick={() => setFlipped((f) => !f)}
        className="relative block h-44 w-full [perspective:1200px]"
      >
        <motion.div
          className="absolute inset-0 [transform-style:preserve-3d]"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="surface-card absolute inset-0 grid place-items-center p-5 text-center [backface-visibility:hidden]">
            <div>
              <div className="mb-1 text-2xs uppercase tracking-wider text-ink-faint">Mặt trước</div>
              <div className="text-lg font-bold text-ink">{renderInline(card.front)}</div>
              <div className="mt-3 text-xs text-ink-faint">Bấm để lật →</div>
            </div>
          </div>
          <div className="surface-card absolute inset-0 grid place-items-center bg-brand-50 p-5 text-center [backface-visibility:hidden] [transform:rotateY(180deg)] dark:bg-brand-500/10">
            <div>
              <div className="mb-1 text-2xs uppercase tracking-wider text-brand-500">Mặt sau</div>
              <div className="text-[0.97rem] text-ink-soft">{renderInline(card.back)}</div>
            </div>
          </div>
        </motion.div>
      </button>
      <div className="mt-3 flex justify-center gap-2">
        <button onClick={() => go(-1)} className="rounded-lg border border-line p-2 hover:bg-surface-2">
          <Icon name="chevron-left" size={18} />
        </button>
        <button onClick={() => go(1)} className="rounded-lg border border-line p-2 hover:bg-surface-2">
          <Icon name="chevron-right" size={18} />
        </button>
      </div>
    </div>
  )
}
