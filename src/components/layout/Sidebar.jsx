import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { chapters } from '../../data/course.js'
import { useStore } from '../../store/store.jsx'
import Icon from '../ui/Icon.jsx'
import { ProgressRing } from '../ui/primitives.jsx'
import { cn } from '../../lib/cn.js'

function chapterProgress(chapter, lessons) {
  const total = chapter.lessons.length
  const done = chapter.lessons.filter((l) => lessons[l.id]).length
  return total ? Math.round((done / total) * 100) : 0
}

export default function Sidebar({ onNavigate }) {
  const { state } = useStore()
  const loc = useLocation()
  const currentChapter = chapters.find((c) =>
    loc.pathname.includes(`/chapter/${c.slug}`) ||
    c.lessons.some((l) => loc.pathname.includes(`/lesson/${l.id}`)),
  )
  const [open, setOpen] = useState(() => (currentChapter ? { [currentChapter.id]: true } : {}))

  return (
    <nav className="flex h-full flex-col">
      <div className="space-y-1 p-3">
        {[
          { to: '/', icon: 'home', label: 'Trang chủ' },
          { to: '/review', icon: 'repeat', label: 'Ôn tập (SRS)' },
          { to: '/exam', icon: 'cap', label: 'Thi thử' },
          { to: '/glossary', icon: 'book', label: 'Thuật ngữ' },
          { to: '/progress', icon: 'chart', label: 'Tiến độ' },
        ].map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            end={it.to === '/'}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition',
                isActive
                  ? 'bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-200'
                  : 'text-ink-soft hover:bg-surface-2 hover:text-ink',
              )
            }
          >
            <Icon name={it.icon} size={18} />
            {it.label}
          </NavLink>
        ))}
      </div>

      <div className="px-5 pb-2 pt-3 text-2xs font-bold uppercase tracking-wider text-ink-faint">
        Giáo trình · CTFL v4.0
      </div>

      <div className="flex-1 space-y-1 overflow-y-auto px-3 pb-6">
        {chapters.map((c) => {
          const pct = chapterProgress(c, state.lessons)
          const isOpen = open[c.id]
          return (
            <div key={c.id}>
              <button
                onClick={() => setOpen((o) => ({ ...o, [c.id]: !o[c.id] }))}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left hover:bg-surface-2"
              >
                <ProgressRing value={pct} size={32} stroke={3}>
                  <Icon name={c.icon} size={14} className="text-ink-soft" />
                </ProgressRing>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-ink">
                    {c.number}. {c.title.vn}
                  </span>
                  <span className="block text-2xs text-ink-faint">{pct}% hoàn thành</span>
                </span>
                <Icon
                  name="chevron-down"
                  size={16}
                  className={cn('shrink-0 text-ink-faint transition', isOpen && 'rotate-180')}
                />
              </button>
              {isOpen && (
                <div className="ml-6 mt-0.5 space-y-0.5 border-l border-line pl-3">
                  <NavLink
                    to={`/chapter/${c.slug}`}
                    onClick={onNavigate}
                    className={({ isActive }) =>
                      cn(
                        'block rounded-lg px-2 py-1.5 text-xs font-medium',
                        isActive ? 'text-brand-600 dark:text-brand-300' : 'text-ink-faint hover:text-ink',
                      )
                    }
                  >
                    Tổng quan chương
                  </NavLink>
                  {c.lessons.map((l) => (
                    <NavLink
                      key={l.id}
                      to={`/lesson/${l.id}`}
                      onClick={onNavigate}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs',
                          isActive
                            ? 'bg-brand-50 font-semibold text-brand-700 dark:bg-brand-500/10 dark:text-brand-200'
                            : 'text-ink-soft hover:bg-surface-2',
                        )
                      }
                    >
                      <Icon
                        name={state.lessons[l.id] ? 'check' : 'dot'}
                        size={14}
                        className={cn('shrink-0', state.lessons[l.id] ? 'text-success' : 'text-ink-faint')}
                      />
                      <span className="truncate">{l.title.vn}</span>
                    </NavLink>
                  ))}
                  {c.quiz?.length > 0 && (
                    <NavLink
                      to={`/quiz/${c.slug}`}
                      onClick={onNavigate}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs',
                          isActive ? 'font-semibold text-accent-600 dark:text-accent-300' : 'text-ink-soft hover:bg-surface-2',
                        )
                      }
                    >
                      <Icon name="checks" size={14} className="shrink-0 text-accent-500" />
                      Quiz chương ({c.quiz.length})
                    </NavLink>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </nav>
  )
}
