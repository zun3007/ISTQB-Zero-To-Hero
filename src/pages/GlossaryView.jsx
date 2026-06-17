import { useEffect, useMemo, useState } from 'react'
import { chapters, glossary } from '../data/course.js'
import { collectKeyTerms, termId } from '../data/schema.js'
import Icon from '../components/ui/Icon.jsx'

export default function GlossaryView() {
  const [q, setQ] = useState('')

  const terms = useMemo(() => {
    const map = new Map()
    for (const t of [...glossary, ...collectKeyTerms(chapters)]) {
      if (!map.has(t.en)) map.set(t.en, t)
    }
    return [...map.values()].sort((a, b) => a.en.localeCompare(b.en))
  }, [])

  const filtered = terms.filter(
    (t) =>
      t.en.toLowerCase().includes(q.toLowerCase()) ||
      (t.vn || '').toLowerCase().includes(q.toLowerCase()),
  )

  // Scroll to hash target (from [[term]] links)
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.replace('#', ''))
    if (!id) return
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      el.classList.add('ring-2', 'ring-brand-400')
      const t = setTimeout(() => el.classList.remove('ring-2', 'ring-brand-400'), 1800)
      return () => clearTimeout(t)
    }
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-extrabold">Thuật ngữ ISTQB</h1>
      <p className="mt-1 text-ink-soft">
        {terms.length} thuật ngữ song ngữ. Bấm vào bất kỳ <code className="rounded bg-surface-3 px-1 text-xs">[[term]]</code> trong bài để nhảy tới đây.
      </p>

      <div className="sticky top-16 z-10 -mx-1 my-5 bg-bg/80 px-1 py-2 backdrop-blur">
        <div className="flex items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2">
          <Icon name="search-check" size={18} className="text-ink-faint" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Tìm thuật ngữ… (vd: defect, regression)"
            className="w-full bg-transparent text-sm outline-none placeholder:text-ink-faint"
          />
          {q && (
            <button onClick={() => setQ('')} className="text-ink-faint hover:text-ink">
              <Icon name="close" size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-2">
        {filtered.map((t) => (
          <div
            key={t.en}
            id={termId(t.en)}
            className="scroll-mt-32 rounded-xl border border-line bg-surface p-4 transition"
          >
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="font-mono font-bold text-brand-600 dark:text-brand-300">{t.en}</span>
              {t.vn && <span className="text-sm text-ink-faint">· {t.vn}</span>}
            </div>
            <p className="mt-1 text-sm text-ink-soft">{t.def}</p>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="py-10 text-center text-ink-faint">Không có thuật ngữ khớp “{q}”.</p>
        )}
      </div>
    </div>
  )
}
