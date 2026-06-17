import { Link, useParams } from 'react-router-dom'
import { chapters } from '../data/course.js'
import { findChapter } from '../data/schema.js'
import { useStore } from '../store/store.jsx'
import Icon from '../components/ui/Icon.jsx'
import { QuizRunner } from '../components/quiz/Quiz.jsx'
import NotFound from './NotFound.jsx'

export default function QuizView() {
  const { slug } = useParams()
  const { recordQuiz } = useStore()
  const chapter = findChapter(chapters, slug)
  if (!chapter || !chapter.quiz?.length) return <NotFound />

  return (
    <div>
      <Link
        to={`/chapter/${chapter.slug}`}
        className="mb-3 inline-flex items-center gap-1 text-sm text-ink-faint hover:text-ink"
      >
        <Icon name="arrow-left" size={15} /> Chương {chapter.number}
      </Link>
      <h1 className="mb-1 text-2xl font-extrabold">Quiz · {chapter.title.vn}</h1>
      <p className="mb-6 text-sm text-ink-soft">
        Kiểm tra kiến thức chương với phản hồi tức thì sau mỗi câu.
      </p>
      <QuizRunner
        title={`Quiz ${chapter.title.vn}`}
        questions={chapter.quiz}
        mode="immediate"
        onFinish={(r) => recordQuiz(`chapter:${chapter.slug}`, r.correct, r.total)}
      />
    </div>
  )
}
