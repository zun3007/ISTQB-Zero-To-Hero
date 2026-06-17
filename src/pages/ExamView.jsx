import { useState } from 'react'
import { chapters, course, mockExam } from '../data/course.js'
import { useStore } from '../store/store.jsx'
import Icon from '../components/ui/Icon.jsx'
import { Button, Card } from '../components/ui/primitives.jsx'
import { QuizRunner } from '../components/quiz/Quiz.jsx'

// Official-ish CTFL v4.0 weighting (questions per chapter → 40 total)
const WEIGHTS = { 1: 8, 2: 5, 3: 5, 4: 11, 5: 9, 6: 2 }

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function chapterOf(q) {
  const m = /FL-(\d)/.exec(q.lo || '')
  return m ? Number(m[1]) : 0
}

function buildExam() {
  // Pool per chapter from chapter quizzes
  const byCh = {}
  for (const c of chapters) byCh[c.number] = shuffle(c.quiz || [])
  // Mock bank grouped by derived chapter, used to top up
  const mockByCh = {}
  for (const q of mockExam) {
    const n = chapterOf(q)
    ;(mockByCh[n] ||= []).push(q)
  }

  const picked = []
  const seen = new Set()
  const take = (q) => {
    if (q && !seen.has(q.id)) {
      seen.add(q.id)
      picked.push(q)
    }
  }

  for (const num of Object.keys(WEIGHTS)) {
    const target = WEIGHTS[num]
    const pool = [...(byCh[num] || []), ...shuffle(mockByCh[num] || [])]
    pool.slice(0, target).forEach(take)
  }

  // Top up to 40 from everything left over
  if (picked.length < 40) {
    const rest = shuffle([
      ...chapters.flatMap((c) => c.quiz || []),
      ...mockExam,
    ]).filter((q) => !seen.has(q.id))
    rest.slice(0, 40 - picked.length).forEach(take)
  }

  return shuffle(picked).slice(0, 40)
}

export default function ExamView() {
  const { recordExam } = useStore()
  const [questions, setQuestions] = useState(null)

  if (!questions) {
    return (
      <div>
        <h1 className="text-3xl font-extrabold">Thi thử ISTQB</h1>
        <p className="mt-2 text-ink-soft">Mô phỏng kỳ thi CTFL Foundation thật.</p>

        <Card className="mt-6 p-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { icon: 'checks', v: course.exam.questions, l: 'câu hỏi' },
              { icon: 'clock', v: `${course.exam.minutes}'`, l: 'thời gian' },
              { icon: 'trophy', v: `${course.exam.passPct}%`, l: 'ngưỡng đạt' },
            ].map((x) => (
              <div key={x.l}>
                <Icon name={x.icon} size={22} className="mx-auto text-brand-500" />
                <div className="mt-1 text-2xl font-extrabold text-ink">{x.v}</div>
                <div className="text-xs text-ink-faint">{x.l}</div>
              </div>
            ))}
          </div>
          <ul className="mt-6 space-y-2 text-sm text-ink-soft">
            <li className="flex gap-2"><Icon name="dot" size={16} className="mt-1 shrink-0 text-brand-400" /> Đề lấy ngẫu nhiên theo phân bố sát kỳ thi thật (Chương 4 & 5 nhiều câu nhất).</li>
            <li className="flex gap-2"><Icon name="dot" size={16} className="mt-1 shrink-0 text-brand-400" /> Không hiện đáp án cho tới khi nộp bài — đúng như thi thật.</li>
            <li className="flex gap-2"><Icon name="dot" size={16} className="mt-1 shrink-0 text-brand-400" /> Hết giờ sẽ tự nộp. Bạn có thể xem lại toàn bộ sau khi nộp.</li>
          </ul>
          <Button size="lg" className="mt-6 w-full" onClick={() => setQuestions(buildExam())}>
            <Icon name="play" size={18} /> Bắt đầu thi
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div>
      <h1 className="mb-4 text-2xl font-extrabold">Đề thi thử · {questions.length} câu</h1>
      <QuizRunner
        title="Thi thử ISTQB"
        questions={questions}
        mode="deferred"
        passPct={course.exam.passPct}
        timerSeconds={course.exam.minutes * 60}
        onFinish={(r) => recordExam({ score: r.correct, total: r.total, pct: r.pct, passed: r.pct >= course.exam.passPct })}
      />
    </div>
  )
}
