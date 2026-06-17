import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { chapters, course } from '../data/course.js'
import { allLessons, lessonSequence, countQuestions } from '../data/schema.js'
import { useStore } from '../store/store.jsx'
import Icon from '../components/ui/Icon.jsx'
import { Button, Card, ProgressBar, ProgressRing } from '../components/ui/primitives.jsx'
import { cn } from '../lib/cn.js'

const ACCENT_BG = {
  brand: 'from-brand-500 to-brand-400',
  accent: 'from-accent-500 to-accent-400',
  info: 'from-sky-500 to-cyan-400',
  success: 'from-emerald-500 to-green-400',
  warn: 'from-amber-500 to-orange-400',
  danger: 'from-rose-500 to-red-400',
}

export default function Home() {
  const { state } = useStore()
  const lessons = allLessons(chapters)
  const totalLessons = lessons.length
  const doneLessons = lessons.filter((l) => state.lessons[l.id]).length
  const pct = totalLessons ? Math.round((doneLessons / totalLessons) * 100) : 0

  const seq = lessonSequence(chapters)
  const nextUp = seq.find(({ lesson }) => !state.lessons[lesson.id]) || seq[0]

  const stats = [
    { icon: 'flame', label: 'Chuỗi ngày', value: state.streak.current, tone: 'text-accent-500' },
    { icon: 'zap', label: 'Điểm XP', value: state.xp, tone: 'text-brand-500' },
    { icon: 'check', label: 'Bài đã xong', value: `${doneLessons}/${totalLessons}`, tone: 'text-success' },
    { icon: 'puzzle', label: 'Câu hỏi luyện', value: countQuestions(chapters), tone: 'text-info' },
  ]

  return (
    <div className="space-y-10">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl border border-line bg-surface p-7 sm:p-9 bg-dotgrid"
      >
        {/* Decorative glow orbs */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full bg-brand-500/25 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 right-24 size-56 rounded-full bg-accent-500/20 blur-3xl"
        />
        <div className="relative">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-200">
            <Icon name="sparkles" size={14} /> {course.subtitle}
          </div>
          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
            Từ <span className="text-gradient">con số 0</span> đến{' '}
            <span className="text-gradient">ace kỳ thi ISTQB</span>
          </h1>
          <p className="mt-3 max-w-xl text-lg text-ink-soft">{course.blurb}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button as={Link} to={`/lesson/${nextUp.lesson.id}`} size="lg">
              <Icon name="play" size={18} />
              {doneLessons === 0 ? 'Bắt đầu học' : 'Tiếp tục học'}
            </Button>
            <Button as={Link} to="/exam" variant="outline" size="lg">
              <Icon name="cap" size={18} /> Thi thử 40 câu
            </Button>
          </div>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {[
              { v: `${chapters.length}`, l: 'chương' },
              { v: `${totalLessons}`, l: 'bài học' },
              { v: `${countQuestions(chapters)}+`, l: 'câu hỏi' },
              { v: '100%', l: 'offline' },
            ].map((s) => (
              <span key={s.l} className="flex items-baseline gap-1.5">
                <span className="text-lg font-extrabold text-ink">{s.v}</span>
                <span className="text-ink-faint">{s.l}</span>
              </span>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Overall progress */}
      <Card className="flex items-center gap-5 p-6">
        <ProgressRing value={pct} size={88} stroke={8}>
          <span className="text-xl font-extrabold text-ink">{pct}%</span>
        </ProgressRing>
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-ink">Tiến độ tổng thể</h3>
          <p className="text-sm text-ink-soft">
            Bạn đã hoàn thành {doneLessons}/{totalLessons} bài học. Tiếp theo:{' '}
            <Link to={`/lesson/${nextUp.lesson.id}`} className="font-semibold text-brand-600 dark:text-brand-300">
              {nextUp.lesson.title.vn}
            </Link>
          </p>
          <div className="mt-3">
            <ProgressBar value={pct} />
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-4">
            <Icon name={s.icon} size={20} className={s.tone} />
            <div className="mt-2 text-2xl font-extrabold text-ink">{s.value}</div>
            <div className="text-xs text-ink-faint">{s.label}</div>
          </Card>
        ))}
      </div>

      {/* Chapters */}
      <section>
        <h2 className="mb-4 text-2xl font-bold">Lộ trình 6 chương</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {chapters.map((c, i) => {
            const done = c.lessons.filter((l) => state.lessons[l.id]).length
            const cp = c.lessons.length ? Math.round((done / c.lessons.length) * 100) : 0
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card interactive className="p-5">
                  <Link to={`/chapter/${c.slug}`} className="block">
                    <div className="flex items-start gap-4">
                      <span
                        className={cn(
                          'grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg',
                          ACCENT_BG[c.accent] || ACCENT_BG.brand,
                        )}
                      >
                        <Icon name={c.icon} size={24} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold uppercase tracking-wider text-ink-faint">
                          Chương {c.number}
                        </div>
                        <h3 className="truncate font-bold text-ink">{c.title.vn}</h3>
                        <p className="mt-0.5 line-clamp-2 text-sm text-ink-soft">{c.tagline}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-3">
                      <ProgressBar value={cp} className="flex-1" />
                      <span className="text-xs font-semibold text-ink-faint">{cp}%</span>
                    </div>
                  </Link>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
