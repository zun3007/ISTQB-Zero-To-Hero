import { useEffect, useMemo, useState } from 'react'
import { motion } from 'motion/react'
import Icon from '../ui/Icon.jsx'
import { Button, KLevelBadge, ProgressBar } from '../ui/primitives.jsx'
import { cn } from '../../lib/cn.js'
import { renderInline } from '../content/MD.jsx'

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']

function optionsFor(q) {
  if (q.type === 'truefalse')
    return [
      { id: 'true', text: 'True · Đúng' },
      { id: 'false', text: 'False · Sai' },
    ]
  return q.options || []
}

/* ── One question, fully stateful display ──────────────────────────────────── */
export function QuestionCard({ q, selected = [], onChange, revealed, locked }) {
  const opts = optionsFor(q)
  const multi = q.type === 'multi'
  const correct = q.correct || []

  const toggle = (id) => {
    if (locked) return
    if (multi) {
      onChange(selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id])
    } else {
      onChange([id])
    }
  }

  return (
    <div>
      <div className="mb-3 flex items-start gap-2">
        <KLevelBadge k={q.k} withLabel={false} />
        {multi && (
          <span className="rounded-full bg-surface-2 px-2 py-0.5 text-2xs font-semibold text-ink-faint">
            Chọn nhiều
          </span>
        )}
        {q.lo && <span className="ml-auto text-2xs text-ink-faint">{q.lo}</span>}
      </div>
      <p className="text-lg font-semibold leading-snug text-ink">{renderInline(q.stem, q.id)}</p>

      <div className="mt-4 space-y-2">
        {opts.map((o, i) => {
          const isSel = selected.includes(o.id)
          const isCorrect = correct.includes(o.id)
          let state = 'idle'
          if (revealed) {
            if (isCorrect) state = 'correct'
            else if (isSel) state = 'wrong'
          } else if (isSel) state = 'selected'

          return (
            <button
              key={o.id}
              onClick={() => toggle(o.id)}
              disabled={locked}
              className={cn(
                'flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition',
                state === 'idle' && 'border-line hover:border-brand-300 hover:bg-surface-2',
                state === 'selected' && 'border-brand-400 bg-brand-50 dark:bg-brand-500/15',
                state === 'correct' && 'border-success/60 bg-success-soft dark:bg-success/15',
                state === 'wrong' && 'border-danger/60 bg-danger-soft dark:bg-danger/15',
                locked && 'cursor-default',
              )}
            >
              <span
                className={cn(
                  'grid size-7 shrink-0 place-items-center rounded-lg border text-sm font-bold',
                  state === 'correct' && 'border-success bg-success text-white',
                  state === 'wrong' && 'border-danger bg-danger text-white',
                  (state === 'idle' || state === 'selected') && 'border-line-strong text-ink-soft',
                )}
              >
                {state === 'correct' ? '✓' : state === 'wrong' ? '✕' : LETTERS[i]}
              </span>
              <span className="text-sm text-ink">{renderInline(o.text, `${q.id}o${i}`)}</span>
            </button>
          )
        })}
      </div>

      {revealed && q.explanation && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 rounded-xl border border-brand-200 bg-brand-50/70 p-4 dark:border-brand-500/30 dark:bg-brand-500/10"
        >
          <div className="mb-1 flex items-center gap-2 text-sm font-bold text-brand-700 dark:text-brand-200">
            <Icon name="lightbulb" size={16} /> Giải thích
          </div>
          <p className="text-sm text-ink-soft">{renderInline(q.explanation, `${q.id}exp`)}</p>
        </motion.div>
      )}
    </div>
  )
}

function isRight(q, selected) {
  const c = [...(q.correct || [])].sort().join(',')
  const s = [...selected].sort().join(',')
  return c === s && selected.length > 0
}

/* ── Inline checkpoint (immediate feedback, per question) ──────────────────── */
export function CheckpointQuiz({ questions = [], onComplete }) {
  const [answers, setAnswers] = useState({})
  const [checked, setChecked] = useState({})

  const allChecked = questions.every((q) => checked[q.id])
  const correctCount = questions.filter((q) => checked[q.id] && isRight(q, answers[q.id] || [])).length

  const check = (q) => {
    const next = { ...checked, [q.id]: true }
    setChecked(next)
    if (questions.every((x) => next[x.id])) {
      const cc = questions.filter((x) => isRight(x, answers[x.id] || [])).length
      onComplete?.(cc, questions.length)
    }
  }

  return (
    <div className="surface-card my-6 p-5">
      <div className="mb-4 flex items-center gap-2">
        <Icon name="checks" size={18} className="text-accent-500" />
        <span className="font-bold text-ink">Kiểm tra nhanh</span>
        {allChecked && (
          <span className="ml-auto text-sm font-bold text-brand-600 dark:text-brand-300">
            {correctCount}/{questions.length}
          </span>
        )}
      </div>
      <div className="space-y-6 divide-y divide-line [&>*:not(:first-child)]:pt-6">
        {questions.map((q) => (
          <div key={q.id}>
            <QuestionCard
              q={q}
              selected={answers[q.id] || []}
              onChange={(v) => setAnswers((a) => ({ ...a, [q.id]: v }))}
              revealed={!!checked[q.id]}
              locked={!!checked[q.id]}
            />
            {!checked[q.id] && (
              <Button
                size="sm"
                className="mt-3"
                disabled={!(answers[q.id] || []).length}
                onClick={() => check(q)}
              >
                Kiểm tra
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Full quiz / exam runner ───────────────────────────────────────────────── */
export function QuizRunner({
  title,
  questions = [],
  mode = 'immediate', // 'immediate' (practice) | 'deferred' (exam)
  passPct = 65,
  onFinish,
  timerSeconds,
}) {
  const [i, setI] = useState(0)
  const [answers, setAnswers] = useState({})
  const [checked, setChecked] = useState({})
  const [finished, setFinished] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(timerSeconds ?? null)

  const q = questions[i]
  const revealed = mode === 'immediate' && !!checked[q?.id]
  const selected = answers[q?.id] || []

  const results = useMemo(() => {
    const correct = questions.filter((x) => isRight(x, answers[x.id] || []))
    return {
      correct: correct.length,
      total: questions.length,
      pct: Math.round((correct.length / questions.length) * 100),
    }
  }, [answers, questions])

  // Countdown timer (exam mode). Auto-submits when it reaches zero.
  useEffect(() => {
    if (timerSeconds == null || finished) return
    if (secondsLeft <= 0) {
      // Auto-submit when the wall-clock timer expires — a legitimate
      // synchronisation with elapsed real time, not a render-derived update.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFinished(true)
      onFinish?.(results)
      return
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [secondsLeft, finished, timerSeconds, onFinish, results])

  if (finished) {
    return (
      <ResultScreen
        title={title}
        questions={questions}
        answers={answers}
        passPct={passPct}
        onRetry={() => {
          setI(0)
          setAnswers({})
          setChecked({})
          setFinished(false)
        }}
      />
    )
  }

  const next = () => {
    if (i < questions.length - 1) setI(i + 1)
    else {
      setFinished(true)
      onFinish?.(results)
    }
  }

  return (
    <div>
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between text-sm text-ink-faint">
          <span>
            Câu {i + 1}/{questions.length}
          </span>
          {secondsLeft != null && (
            <span
              className={cn(
                'flex items-center gap-1 font-mono font-semibold',
                secondsLeft < 60 ? 'text-danger' : 'text-ink',
              )}
            >
              <Icon name="clock" size={14} /> {fmt(secondsLeft)}
            </span>
          )}
        </div>
        <ProgressBar value={((i + (revealed ? 1 : 0)) / questions.length) * 100} />
      </div>

      <div className="surface-card p-5 sm:p-6">
        <QuestionCard
          q={q}
          selected={selected}
          onChange={(v) => setAnswers((a) => ({ ...a, [q.id]: v }))}
          revealed={revealed}
          locked={revealed}
        />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => setI(Math.max(0, i - 1))} disabled={i === 0}>
          <Icon name="arrow-left" size={16} /> Câu trước
        </Button>

        {mode === 'immediate' && !revealed ? (
          <Button onClick={() => setChecked((c) => ({ ...c, [q.id]: true }))} disabled={!selected.length}>
            Kiểm tra
          </Button>
        ) : (
          <Button onClick={next} disabled={mode === 'deferred' && !selected.length}>
            {i < questions.length - 1 ? 'Câu tiếp' : 'Nộp bài'}
            <Icon name="arrow-right" size={16} />
          </Button>
        )}
      </div>
    </div>
  )
}

function fmt(s) {
  const m = Math.floor(s / 60)
  const ss = s % 60
  return `${m}:${ss.toString().padStart(2, '0')}`
}

/* ── Result screen with review ─────────────────────────────────────────────── */
export function ResultScreen({ questions, answers, passPct = 65, onRetry }) {
  const correct = questions.filter((q) => isRight(q, answers[q.id] || []))
  const pct = Math.round((correct.length / questions.length) * 100)
  const passed = pct >= passPct
  const [review, setReview] = useState(false)

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          'surface-card p-8 text-center',
          passed ? 'border-success/40' : 'border-warn/40',
        )}
      >
        <div
          className={cn(
            'mx-auto grid size-16 place-items-center rounded-2xl text-white',
            passed ? 'bg-success' : 'bg-warn',
          )}
        >
          <Icon name={passed ? 'trophy' : 'repeat'} size={32} />
        </div>
        <h3 className="mt-4 text-2xl font-bold text-ink">
          {passed ? 'Đạt! 🎉' : 'Chưa đạt — cố thêm nhé'}
        </h3>
        <p className="mt-1 text-ink-soft">
          {correct.length}/{questions.length} câu đúng ·{' '}
          <span className={cn('font-bold', passed ? 'text-success' : 'text-warn')}>{pct}%</span>{' '}
          (ngưỡng đạt {passPct}%)
        </p>
        <div className="mx-auto mt-4 max-w-xs">
          <ProgressBar value={pct} tone={passed ? 'success' : 'gradient'} />
        </div>
        <div className="mt-6 flex justify-center gap-2">
          <Button variant="outline" onClick={() => setReview((r) => !r)}>
            <Icon name="eye" size={16} /> {review ? 'Ẩn' : 'Xem lại'} đáp án
          </Button>
          <Button onClick={onRetry}>
            <Icon name="reset" size={16} /> Làm lại
          </Button>
        </div>
      </motion.div>

      {review && (
        <div className="mt-6 space-y-4">
          {questions.map((q) => (
            <div key={q.id} className="surface-card p-5">
              <QuestionCard q={q} selected={answers[q.id] || []} revealed locked />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
