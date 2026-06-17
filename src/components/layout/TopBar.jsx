import { Link } from 'react-router-dom'
import { useStore } from '../../store/store.jsx'
import { dueCount } from '../../lib/srs.js'
import Icon from '../ui/Icon.jsx'
import { cn } from '../../lib/cn.js'

function ThemeToggle() {
  const { theme, setTheme } = useStore()
  const order = ['system', 'light', 'dark']
  const icon = { system: 'monitor', light: 'sun', dark: 'moon' }[theme]
  const next = order[(order.indexOf(theme) + 1) % order.length]
  return (
    <button
      onClick={() => setTheme(next)}
      title={`Giao diện: ${theme}`}
      className="grid size-9 place-items-center rounded-xl text-ink-soft transition hover:bg-surface-2 hover:text-ink"
    >
      <Icon name={icon} size={18} />
    </button>
  )
}

export default function TopBar({ onMenu }) {
  const { state } = useStore()
  const due = dueCount(state.cards)

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line bg-bg/80 px-4 backdrop-blur-lg sm:px-6">
      <button
        onClick={onMenu}
        className="grid size-9 place-items-center rounded-xl text-ink-soft hover:bg-surface-2 lg:hidden"
      >
        <Icon name="menu" size={20} />
      </button>

      <Link to="/" className="flex items-center gap-2">
        <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 text-white shadow-lg shadow-brand-600/25">
          <Icon name="cap" size={20} />
        </span>
        <span className="hidden font-display text-lg font-extrabold tracking-tight text-ink sm:block">
          ISTQB <span className="text-gradient">Zero→Hero</span>
        </span>
      </Link>

      <div className="ml-auto flex items-center gap-1.5">
        <Link
          to="/review"
          className={cn(
            'flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-semibold transition',
            due > 0
              ? 'bg-accent-100 text-accent-700 hover:bg-accent-200 dark:bg-accent-500/15 dark:text-accent-300'
              : 'text-ink-faint hover:bg-surface-2',
          )}
          title="Thẻ cần ôn hôm nay"
        >
          <Icon name="repeat" size={16} />
          {due > 0 ? due : '—'}
        </Link>

        <div
          className="flex items-center gap-1.5 rounded-xl bg-surface-2 px-3 py-1.5 text-sm font-bold text-ink"
          title="Chuỗi ngày học liên tiếp"
        >
          <Icon name="flame" size={16} className="text-accent-500" />
          {state.streak.current}
        </div>

        <div
          className="hidden items-center gap-1.5 rounded-xl bg-surface-2 px-3 py-1.5 text-sm font-bold text-ink sm:flex"
          title="Điểm kinh nghiệm"
        >
          <Icon name="zap" size={16} className="text-brand-500" />
          {state.xp} XP
        </div>

        <ThemeToggle />
      </div>
    </header>
  )
}
