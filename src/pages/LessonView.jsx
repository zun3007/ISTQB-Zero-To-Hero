import { useMemo } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'motion/react'
import { chapters } from '../data/course.js'
import { findLesson, lessonSequence, termId } from '../data/schema.js'
import { useStore } from '../store/store.jsx'
import Icon from '../components/ui/Icon.jsx'
import { Button, KLevelBadge } from '../components/ui/primitives.jsx'
import LessonRenderer from '../components/content/LessonRenderer.jsx'
import NotFound from './NotFound.jsx'

export default function LessonView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state, completeLesson, recordCheckpoint, ensureCards, toggleBookmark } = useStore()

  const found = findLesson(chapters, id)
  const seq = useMemo(() => lessonSequence(chapters), [])

  // Scroll-linked reading progress (hooks must run before any early return).
  const { scrollYProgress } = useScroll()
  const readProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  if (!found) return <NotFound />
  const { lesson, chapter } = found
  const done = !!state.lessons[lesson.id]
  const bookmarked = !!state.bookmarks[lesson.id]

  const pos = seq.findIndex((s) => s.lesson.id === lesson.id)
  const prev = seq[pos - 1]
  const next = seq[pos + 1]

  const objectives = (chapter.objectives || []).filter((o) => lesson.objectives?.includes(o.code))

  const finish = () => {
    completeLesson(lesson.id)
    if (lesson.keyTerms?.length) ensureCards(lesson.keyTerms.map((t) => termId(t.en)))
    if (next) navigate(`/lesson/${next.lesson.id}`)
    else navigate(`/quiz/${chapter.slug}`)
  }

  return (
    <article>
      <motion.div
        style={{ scaleX: readProgress }}
        className="fixed inset-x-0 top-16 z-40 h-1 origin-left bg-gradient-to-r from-brand-500 to-accent-500"
      />
      <Link
        to={`/chapter/${chapter.slug}`}
        className="mb-3 inline-flex items-center gap-1 text-sm text-ink-faint hover:text-ink"
      >
        <Icon name="arrow-left" size={15} /> Chương {chapter.number}: {chapter.title.vn}
      </Link>

      <header className="mb-6">
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-3xl font-extrabold leading-tight">{lesson.title.vn}</h1>
          <button
            onClick={() => toggleBookmark(lesson.id)}
            title="Đánh dấu"
            className={`grid size-10 shrink-0 place-items-center rounded-xl border transition ${
              bookmarked
                ? 'border-accent-300 bg-accent-50 text-accent-600 dark:bg-accent-500/15 dark:text-accent-300'
                : 'border-line text-ink-faint hover:bg-surface-2'
            }`}
          >
            <Icon name="bookmark" size={18} />
          </button>
        </div>
        <p className="mt-1 font-mono text-sm text-ink-faint">{lesson.title.en}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-ink-faint">
          <span className="flex items-center gap-1">
            <Icon name="clock" size={14} /> {lesson.estMinutes} phút
          </span>
          {objectives.map((o) => (
            <KLevelBadge key={o.code} k={o.k} withLabel={false} />
          ))}
        </div>
      </header>

      {lesson.hook && (
        <div className="mb-6 rounded-2xl border-l-4 border-brand-400 bg-surface-2 py-3 pl-4 pr-3 text-ink-soft italic">
          {lesson.hook}
        </div>
      )}

      <LessonRenderer
        blocks={lesson.blocks}
        onCheckpoint={(c, t) => recordCheckpoint(lesson.id, c, t)}
      />

      {lesson.keyTerms?.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-3 flex items-center gap-2 text-xl font-bold">
            <Icon name="book" size={20} className="text-brand-500" /> Thuật ngữ chính
          </h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {lesson.keyTerms.map((t) => (
              <div key={t.en} className="rounded-xl border border-line bg-surface p-3">
                <div className="font-mono text-sm font-bold text-brand-600 dark:text-brand-300">{t.en}</div>
                <div className="text-2xs text-ink-faint">{t.vn}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="mt-10 flex items-center justify-between gap-3 border-t border-line pt-6">
        {prev ? (
          <Button as={Link} to={`/lesson/${prev.lesson.id}`} variant="ghost" size="sm" className="min-w-0">
            <Icon name="arrow-left" size={16} />
            <span className="truncate">Bài trước</span>
          </Button>
        ) : (
          <span />
        )}
        <Button onClick={finish} size="lg">
          {done ? 'Đã xong' : 'Hoàn thành'}
          <Icon name={done ? 'check' : 'arrow-right'} size={18} />
        </Button>
      </div>
    </article>
  )
}
