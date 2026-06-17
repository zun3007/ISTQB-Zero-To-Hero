import { Link, useParams } from 'react-router-dom'
import { chapters } from '../data/course.js'
import { findChapter } from '../data/schema.js'
import { useStore } from '../store/store.jsx'
import Icon from '../components/ui/Icon.jsx'
import { Button, Card, KLevelBadge } from '../components/ui/primitives.jsx'
import NotFound from './NotFound.jsx'

export default function ChapterView() {
  const { slug } = useParams()
  const { state } = useStore()
  const chapter = findChapter(chapters, slug)
  if (!chapter) return <NotFound />

  const idx = chapters.indexOf(chapter)
  const prev = chapters[idx - 1]
  const next = chapters[idx + 1]

  return (
    <div className="space-y-8">
      <header>
        <Link to="/" className="mb-3 inline-flex items-center gap-1 text-sm text-ink-faint hover:text-ink">
          <Icon name="arrow-left" size={15} /> Trang chủ
        </Link>
        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-brand-600 dark:text-brand-300">
          <Icon name={chapter.icon} size={18} /> Chương {chapter.number}
        </div>
        <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">{chapter.title.vn}</h1>
        <p className="mt-1 font-mono text-sm text-ink-faint">{chapter.title.en}</p>
        <p className="mt-3 text-lg text-ink-soft">{chapter.tagline}</p>
      </header>

      <Card className="border-brand-200 bg-brand-50/50 p-5 dark:border-brand-500/30 dark:bg-brand-500/10">
        <div className="flex items-center gap-2 text-sm font-bold text-brand-700 dark:text-brand-200">
          <Icon name="target" size={16} /> Ý tưởng cốt lõi
        </div>
        <p className="mt-1 text-ink-soft">{chapter.bigIdea}</p>
      </Card>

      <section>
        <h2 className="mb-3 text-xl font-bold">Mục tiêu học tập</h2>
        <div className="space-y-2">
          {chapter.objectives.map((o) => (
            <div key={o.code} className="flex items-start gap-3 rounded-xl border border-line bg-surface p-3">
              <KLevelBadge k={o.k} withLabel={false} className="mt-0.5" />
              <div>
                <span className="font-mono text-xs text-ink-faint">{o.code}</span>
                <p className="text-sm text-ink">{o.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-bold">Bài học</h2>
        <div className="space-y-2">
          {chapter.lessons.map((l, i) => {
            const done = state.lessons[l.id]
            return (
              <Card key={l.id} interactive className="p-0">
                <Link to={`/lesson/${l.id}`} className="flex items-center gap-4 p-4">
                  <span
                    className={`grid size-9 shrink-0 place-items-center rounded-xl text-sm font-bold ${
                      done ? 'bg-success text-white' : 'bg-surface-3 text-ink-soft'
                    }`}
                  >
                    {done ? <Icon name="check" size={18} /> : i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-semibold text-ink">{l.title.vn}</h3>
                    <p className="text-xs text-ink-faint">
                      {l.estMinutes} phút · {l.objectives.length || '—'} mục tiêu
                    </p>
                  </div>
                  <Icon name="chevron-right" size={18} className="shrink-0 text-ink-faint" />
                </Link>
              </Card>
            )
          })}
        </div>
      </section>

      {chapter.quiz?.length > 0 && (
        <Card className="flex flex-wrap items-center gap-4 p-5">
          <div className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-accent-500 to-brand-500 text-white">
            <Icon name="checks" size={24} />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-ink">Quiz tổng kết chương</h3>
            <p className="text-sm text-ink-soft">{chapter.quiz.length} câu hỏi sát đề thi thật</p>
          </div>
          <Button as={Link} to={`/quiz/${chapter.slug}`}>
            Làm quiz <Icon name="arrow-right" size={16} />
          </Button>
        </Card>
      )}

      <div className="flex justify-between border-t border-line pt-6">
        {prev ? (
          <Button as={Link} to={`/chapter/${prev.slug}`} variant="ghost" size="sm">
            <Icon name="arrow-left" size={16} /> {prev.title.vn}
          </Button>
        ) : (
          <span />
        )}
        {next && (
          <Button as={Link} to={`/chapter/${next.slug}`} variant="ghost" size="sm">
            {next.title.vn} <Icon name="arrow-right" size={16} />
          </Button>
        )}
      </div>
    </div>
  )
}
