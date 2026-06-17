import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Icon from '../ui/Icon.jsx'
import { Button } from '../ui/primitives.jsx'
import { cn } from '../../lib/cn.js'
import { renderInline } from './MD.jsx'

function Frame({ title, children, hint }) {
  return (
    <div className="surface-card my-6 overflow-hidden">
      <div className="flex items-center gap-2 border-b border-line bg-surface-2 px-4 py-2.5">
        <Icon name="zap" size={16} className="text-accent-500" />
        <span className="text-sm font-bold text-ink">{title || 'Thử tương tác'}</span>
        <span className="ml-auto text-2xs uppercase tracking-wider text-ink-faint">
          interactive
        </span>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
      {hint && <div className="border-t border-line px-4 py-2 text-xs text-ink-faint">{hint}</div>}
    </div>
  )
}

/* ── Boundary Value Analysis ───────────────────────────────────────────────── */
function BoundaryValueLab({ min = 1, max = 100 }) {
  const lo = min - 2
  const hi = max + 2
  const [v, setV] = useState(min)
  const classify = (x) => {
    if (x < min) return { label: 'INVALID (dưới ngưỡng)', tone: 'danger' }
    if (x > max) return { label: 'INVALID (trên ngưỡng)', tone: 'danger' }
    if (x === min || x === max) return { label: 'BIÊN hợp lệ', tone: 'accent' }
    return { label: 'VALID', tone: 'success' }
  }
  const c = classify(v)
  const points = [min - 1, min, min + 1, max - 1, max, max + 1]
  const toneCls = {
    danger: 'text-danger',
    accent: 'text-accent-600 dark:text-accent-300',
    success: 'text-success',
  }
  return (
    <Frame
      title="Boundary Value Analysis"
      hint={`Miền hợp lệ: ${min}–${max}. Giá trị biên cần test: ${min - 1}, ${min}, ${max}, ${max + 1} (2-value BVA).`}
    >
      <div className="mb-3 flex items-baseline justify-between">
        <span className="font-mono text-3xl font-bold text-ink">{v}</span>
        <span className={cn('text-sm font-bold', toneCls[c.tone])}>{c.label}</span>
      </div>
      <input
        type="range"
        min={lo}
        max={hi}
        value={v}
        onChange={(e) => setV(Number(e.target.value))}
        className="w-full accent-[var(--color-brand-500)]"
      />
      <div className="mt-1 flex justify-between text-2xs text-ink-faint">
        <span>{lo}</span>
        <span>{hi}</span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {points.map((p) => (
          <button
            key={p}
            onClick={() => setV(p)}
            className={cn(
              'rounded-lg border px-3 py-1.5 text-sm font-semibold transition',
              v === p
                ? 'border-brand-400 bg-brand-100 text-brand-700 dark:bg-brand-500/20 dark:text-brand-200'
                : 'border-line hover:bg-surface-2',
            )}
          >
            {p}
          </button>
        ))}
      </div>
    </Frame>
  )
}

/* ── Equivalence Partitioning ──────────────────────────────────────────────── */
function EquivalenceLab({ partitions = [] }) {
  const [picked, setPicked] = useState(null)
  return (
    <Frame
      title="Equivalence Partitioning"
      hint="Nguyên tắc: mỗi phân vùng chỉ cần MỘT đại diện — test thêm cùng vùng không tăng độ phủ."
    >
      <div className="flex flex-col gap-2">
        {partitions.map((p, i) => (
          <button
            key={i}
            onClick={() => setPicked(i)}
            className={cn(
              'flex items-center justify-between rounded-xl border px-4 py-3 text-left transition',
              p.valid
                ? 'border-success/40 bg-success-soft/50 dark:bg-success/10'
                : 'border-danger/40 bg-danger-soft/50 dark:bg-danger/10',
              picked === i && 'ring-2 ring-brand-400',
            )}
          >
            <span>
              <span className="font-semibold text-ink">{p.label}</span>
              <span className="ml-2 font-mono text-sm text-ink-soft">{p.range}</span>
            </span>
            <span
              className={cn(
                'text-xs font-bold',
                p.valid ? 'text-success' : 'text-danger',
              )}
            >
              {p.valid ? 'VALID' : 'INVALID'}
              {picked === i && ' ✓ đã chọn đại diện'}
            </span>
          </button>
        ))}
      </div>
      {picked != null && (
        <p className="mt-3 text-sm text-ink-soft">
          Bạn chỉ cần <strong>1 giá trị</strong> trong vùng “{partitions[picked].label}”.
          Tổng cộng cần {partitions.length} test case cho {partitions.length} phân vùng.
        </p>
      )}
    </Frame>
  )
}

/* ── Decision Table ────────────────────────────────────────────────────────── */
function DecisionTableLab({ conditions = [], actions = [], rules = [] }) {
  const [state, setState] = useState(() => conditions.map(() => true))
  const matchIdx = rules.findIndex((r) =>
    r.conditions.every((c, i) => c === '-' || c === state[i]),
  )
  return (
    <Frame
      title="Decision Table"
      hint="Bật/tắt điều kiện để xem luật (rule) nào kích hoạt và hành động kết quả."
    >
      <div className="mb-4 flex flex-wrap gap-2">
        {conditions.map((c, i) => (
          <button
            key={i}
            onClick={() =>
              setState((s) => s.map((v, j) => (j === i ? !v : v)))
            }
            className={cn(
              'rounded-lg border px-3 py-1.5 text-sm font-semibold transition',
              state[i]
                ? 'border-success/50 bg-success-soft text-success dark:bg-success/15'
                : 'border-danger/50 bg-danger-soft text-danger dark:bg-danger/15',
            )}
          >
            {c}: {state[i] ? 'T' : 'F'}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-center text-sm">
          <thead>
            <tr>
              <th className="p-2 text-left text-xs text-ink-faint">Rule</th>
              {rules.map((_, i) => (
                <th
                  key={i}
                  className={cn(
                    'p-2 font-bold',
                    i === matchIdx ? 'text-brand-600 dark:text-brand-300' : 'text-ink-faint',
                  )}
                >
                  R{i + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {conditions.map((c, ci) => (
              <tr key={ci} className="border-t border-line">
                <td className="p-2 text-left text-ink-soft">{c}</td>
                {rules.map((r, ri) => (
                  <td
                    key={ri}
                    className={cn(
                      'p-2 font-mono',
                      ri === matchIdx && 'bg-brand-100 dark:bg-brand-500/15',
                    )}
                  >
                    {r.conditions[ci] === '-' ? '–' : r.conditions[ci] ? 'T' : 'F'}
                  </td>
                ))}
              </tr>
            ))}
            {actions.map((a, ai) => (
              <tr key={'a' + ai} className="border-t border-line-strong">
                <td className="p-2 text-left font-semibold text-accent-600 dark:text-accent-300">
                  {a}
                </td>
                {rules.map((r, ri) => (
                  <td
                    key={ri}
                    className={cn(
                      'p-2',
                      ri === matchIdx && 'bg-brand-100 dark:bg-brand-500/15',
                    )}
                  >
                    {r.actions[ai] ? (
                      <Icon name="check" size={16} className="mx-auto text-success" />
                    ) : (
                      '–'
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm">
        {matchIdx >= 0 ? (
          <span className="text-ink">
            → Khớp <strong>Rule R{matchIdx + 1}</strong>.
          </span>
        ) : (
          <span className="text-danger">→ Không luật nào khớp (bảng chưa đầy đủ?).</span>
        )}
      </p>
    </Frame>
  )
}

/* ── State Transition ──────────────────────────────────────────────────────── */
function StateTransitionLab({ states = [], transitions = [], start }) {
  const [cur, setCur] = useState(start || states[0])
  const [log, setLog] = useState([])
  const outgoing = transitions.filter((t) => t.from === cur)
  const events = [...new Set(transitions.map((t) => t.event))]
  const fire = (event) => {
    const t = transitions.find((x) => x.from === cur && x.event === event)
    if (t) {
      setCur(t.to)
      setLog((l) => [...l, { event, to: t.to, ok: true }])
    } else {
      setLog((l) => [...l, { event, to: cur, ok: false }])
    }
  }
  return (
    <Frame
      title="State Transition"
      hint="Bấm sự kiện để chuyển trạng thái. Sự kiện không hợp lệ ở trạng thái hiện tại = transition không tồn tại (cần test cả ca âm)."
    >
      <div className="mb-3 flex flex-wrap gap-2">
        {states.map((s) => (
          <div
            key={s}
            className={cn(
              'rounded-lg border px-3 py-1.5 text-sm font-semibold',
              s === cur
                ? 'border-brand-400 bg-brand-100 text-brand-700 dark:bg-brand-500/20 dark:text-brand-200'
                : 'border-line text-ink-faint',
            )}
          >
            {s === cur && '▶ '}
            {s}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {events.map((e) => {
          const valid = outgoing.some((t) => t.event === e)
          return (
            <button
              key={e}
              onClick={() => fire(e)}
              className={cn(
                'rounded-lg border px-3 py-1.5 text-sm font-medium transition',
                valid
                  ? 'border-brand-300 hover:bg-brand-50 dark:hover:bg-brand-500/10'
                  : 'border-line text-ink-faint opacity-60',
              )}
            >
              {e}
            </button>
          )
        })}
      </div>
      {log.length > 0 && (
        <div className="mt-4 space-y-1 text-xs">
          {log.slice(-4).map((l, i) => (
            <div key={i} className={l.ok ? 'text-success' : 'text-danger'}>
              {l.ok ? '✓' : '✗'} {l.event} → {l.to}
              {!l.ok && ' (transition không hợp lệ)'}
            </div>
          ))}
        </div>
      )}
    </Frame>
  )
}

/* ── Test Process Stepper ──────────────────────────────────────────────────── */
const PROCESS = [
  { t: 'Test planning', d: 'Xác định mục tiêu, phạm vi, cách tiếp cận và tiêu chí của hoạt động kiểm thử.' },
  { t: 'Test monitoring & control', d: 'So sánh tiến độ thực tế với kế hoạch, đưa ra hành động điều chỉnh khi cần.' },
  { t: 'Test analysis', d: '“Test gì?” — phân tích test basis để xác định điều kiện kiểm thử (test conditions).' },
  { t: 'Test design', d: '“Test thế nào?” — biến điều kiện thành test case và bộ dữ liệu, thiết kế coverage items.' },
  { t: 'Test implementation', d: 'Chuẩn bị test ware: kịch bản, dữ liệu, môi trường, sắp xếp thành test procedures.' },
  { t: 'Test execution', d: 'Chạy test, ghi nhận kết quả, so sánh actual vs expected, log defect.' },
  { t: 'Test completion', d: 'Tổng kết, lưu test ware tái dùng, viết test summary report, rút bài học.' },
]
function TestProcessStepper() {
  const [i, setI] = useState(0)
  return (
    <Frame title="7 hoạt động trong quy trình kiểm thử" hint="Các hoạt động chồng lấn và lặp, không tuần tự cứng nhắc.">
      <div className="mb-4 flex flex-wrap gap-1.5">
        {PROCESS.map((p, idx) => (
          <button
            key={p.t}
            onClick={() => setI(idx)}
            className={cn(
              'grid size-8 place-items-center rounded-full text-sm font-bold transition',
              idx === i
                ? 'bg-gradient-to-br from-brand-500 to-accent-500 text-white'
                : idx < i
                  ? 'bg-brand-100 text-brand-600 dark:bg-brand-500/20 dark:text-brand-200'
                  : 'bg-surface-3 text-ink-faint',
            )}
          >
            {idx + 1}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.25 }}
        >
          <h4 className="text-lg font-bold text-ink">
            {i + 1}. {PROCESS[i].t}
          </h4>
          <p className="mt-1 text-ink-soft">{PROCESS[i].d}</p>
        </motion.div>
      </AnimatePresence>
      <div className="mt-4 flex gap-2">
        <Button variant="outline" size="sm" onClick={() => setI((x) => Math.max(0, x - 1))} disabled={i === 0}>
          <Icon name="arrow-left" size={16} /> Trước
        </Button>
        <Button
          size="sm"
          onClick={() => setI((x) => Math.min(PROCESS.length - 1, x + 1))}
          disabled={i === PROCESS.length - 1}
        >
          Tiếp <Icon name="arrow-right" size={16} />
        </Button>
      </div>
    </Frame>
  )
}

/* ── 7 Principles ──────────────────────────────────────────────────────────── */
const PRINCIPLES = [
  { t: 'Testing shows the presence of defects, not their absence', d: 'Test tìm thấy bug chứng minh có lỗi, nhưng không bao giờ chứng minh phần mềm hoàn toàn không lỗi.' },
  { t: 'Exhaustive testing is impossible', d: 'Trừ ca cực nhỏ, không thể test mọi tổ hợp đầu vào — phải ưu tiên theo rủi ro.' },
  { t: 'Early testing saves time and money', d: 'Hoạt động test (kể cả review tài liệu) nên bắt đầu càng sớm càng tốt — “shift left”.' },
  { t: 'Defects cluster together', d: 'Một số ít module thường chứa phần lớn defect (Pareto) — tập trung vào điểm nóng.' },
  { t: 'Tests wear out (Pesticide paradox)', d: 'Chạy mãi cùng bộ test sẽ không tìm thêm bug mới — cần rà soát và làm mới test.' },
  { t: 'Testing is context dependent', d: 'Cách test phần mềm y tế khác hẳn app thương mại — không có công thức chung.' },
  { t: 'Absence-of-errors is a fallacy', d: 'Phần mềm không lỗi nhưng không đáp ứng nhu cầu người dùng thì vẫn vô dụng.' },
]
function PrinciplesCards() {
  const [open, setOpen] = useState(0)
  return (
    <Frame title="7 nguyên lý kiểm thử" hint="Bấm để mở từng nguyên lý — đây là kiến thức ‘ruột’ chắc chắn ra thi.">
      <div className="space-y-2">
        {PRINCIPLES.map((p, i) => (
          <div key={i} className="rounded-xl border border-line overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? -1 : i)}
              className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-surface-2"
            >
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-xs font-bold text-white">
                {i + 1}
              </span>
              <span className="font-semibold text-ink">{p.t}</span>
              <Icon
                name="chevron-down"
                size={18}
                className={cn('ml-auto shrink-0 text-ink-faint transition', open === i && 'rotate-180')}
              />
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="px-4 pb-3 pl-14 text-sm text-ink-soft">{p.d}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </Frame>
  )
}

/* ── Match (click-to-pair) ─────────────────────────────────────────────────── */
function MatchExercise({ title, pairs = [] }) {
  const rights = useMemo(
    () => pairs.map((p, i) => ({ text: p.right, key: i })).sort((a, b) => (a.text > b.text ? 1 : -1)),
    [pairs],
  )
  const [selL, setSelL] = useState(null)
  const [links, setLinks] = useState({}) // leftIdx -> rightKey
  const [done, setDone] = useState(false)

  const connect = (rk) => {
    if (selL == null) return
    setLinks((l) => ({ ...l, [selL]: rk }))
    setSelL(null)
  }
  const score = Object.entries(links).filter(([l, r]) => Number(l) === r).length
  return (
    <Frame title={title || 'Nối cặp đúng'} hint="Bấm 1 mục bên trái, rồi bấm mục bên phải tương ứng.">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          {pairs.map((p, i) => (
            <button
              key={i}
              onClick={() => setSelL(i)}
              className={cn(
                'w-full rounded-lg border px-3 py-2 text-left text-sm transition',
                selL === i ? 'border-brand-400 bg-brand-100 dark:bg-brand-500/20' : 'border-line hover:bg-surface-2',
                links[i] != null && 'opacity-60',
              )}
            >
              {renderInline(p.left, `ml${i}`)}
              {links[i] != null && (
                <span className="ml-1 text-xs text-brand-500">→ {pairs[links[i]]?.right}</span>
              )}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          {rights.map((r) => (
            <button
              key={r.key}
              onClick={() => connect(r.key)}
              className="w-full rounded-lg border border-line px-3 py-2 text-left text-sm hover:bg-surface-2"
            >
              {renderInline(r.text, `mr${r.key}`)}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <Button size="sm" onClick={() => setDone(true)} disabled={Object.keys(links).length < pairs.length}>
          Kiểm tra
        </Button>
        <Button size="sm" variant="ghost" onClick={() => { setLinks({}); setDone(false); setSelL(null) }}>
          <Icon name="reset" size={15} /> Làm lại
        </Button>
        {done && (
          <span className={cn('text-sm font-bold', score === pairs.length ? 'text-success' : 'text-warn')}>
            {score}/{pairs.length} đúng
          </span>
        )}
      </div>
    </Frame>
  )
}

/* ── Sort into buckets ─────────────────────────────────────────────────────── */
function SortExercise({ title, prompt, items = [], buckets = [] }) {
  const [placed, setPlaced] = useState({}) // itemIdx -> bucket
  const [sel, setSel] = useState(null)
  const [done, setDone] = useState(false)
  const correct = items.filter((it, i) => placed[i] === it.correctBucket).length
  return (
    <Frame title={title || 'Phân loại'} hint={prompt}>
      <div className="mb-3 flex flex-wrap gap-2">
        {items.map((it, i) =>
          placed[i] ? null : (
            <button
              key={i}
              onClick={() => setSel(i)}
              className={cn(
                'rounded-lg border px-3 py-1.5 text-sm transition',
                sel === i ? 'border-brand-400 bg-brand-100 dark:bg-brand-500/20' : 'border-line hover:bg-surface-2',
              )}
            >
              {it.label}
            </button>
          ),
        )}
      </div>
      <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${buckets.length}, minmax(0,1fr))` }}>
        {buckets.map((b) => (
          <div
            key={b}
            onClick={() => { if (sel != null) { setPlaced((p) => ({ ...p, [sel]: b })); setSel(null) } }}
            className="min-h-24 rounded-xl border-2 border-dashed border-line p-2 hover:border-brand-300"
          >
            <div className="mb-2 text-xs font-bold text-ink-faint">{b}</div>
            <div className="flex flex-wrap gap-1.5">
              {items.map((it, i) =>
                placed[i] === b ? (
                  <span
                    key={i}
                    className={cn(
                      'rounded-md px-2 py-1 text-xs',
                      done
                        ? it.correctBucket === b
                          ? 'bg-success-soft text-success'
                          : 'bg-danger-soft text-danger'
                        : 'bg-surface-3 text-ink',
                    )}
                  >
                    {it.label}
                  </span>
                ) : null,
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2">
        <Button size="sm" onClick={() => setDone(true)} disabled={Object.keys(placed).length < items.length}>
          Kiểm tra
        </Button>
        <Button size="sm" variant="ghost" onClick={() => { setPlaced({}); setDone(false); setSel(null) }}>
          <Icon name="reset" size={15} /> Làm lại
        </Button>
        {done && (
          <span className={cn('text-sm font-bold', correct === items.length ? 'text-success' : 'text-warn')}>
            {correct}/{items.length} đúng
          </span>
        )}
      </div>
    </Frame>
  )
}

/* ── Estimate slider ───────────────────────────────────────────────────────── */
function EstimateSlider({ prompt, min = 0, max = 100, answer, unit = '', tolerance = 0 }) {
  const [v, setV] = useState(Math.round((min + max) / 2))
  const [revealed, setRevealed] = useState(false)
  const ok = Math.abs(v - answer) <= tolerance
  return (
    <Frame title="Ước lượng" hint={prompt}>
      <div className="mb-2 text-center font-mono text-3xl font-bold text-ink">
        {v}
        {unit}
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={v}
        onChange={(e) => setV(Number(e.target.value))}
        className="w-full accent-[var(--color-brand-500)]"
      />
      <div className="mt-3 flex items-center gap-2">
        <Button size="sm" onClick={() => setRevealed(true)}>
          Xem đáp án
        </Button>
        {revealed && (
          <span className={cn('text-sm font-bold', ok ? 'text-success' : 'text-warn')}>
            Đáp án: {answer}
            {unit} {ok ? '· bạn rất sát!' : `· lệch ${Math.abs(v - answer)}${unit}`}
          </span>
        )}
      </div>
    </Frame>
  )
}

/* ── Dispatcher ────────────────────────────────────────────────────────────── */
export default function Interactive(props) {
  switch (props.kind) {
    case 'boundary-value':
      return <BoundaryValueLab {...props} />
    case 'equivalence':
      return <EquivalenceLab {...props} />
    case 'decision-table':
      return <DecisionTableLab {...props} />
    case 'state-transition':
      return <StateTransitionLab {...props} />
    case 'test-process':
      return <TestProcessStepper />
    case 'principles':
      return <PrinciplesCards />
    case 'match':
      return <MatchExercise {...props} />
    case 'sort':
      return <SortExercise {...props} />
    case 'estimate-slider':
      return <EstimateSlider {...props} />
    default:
      return (
        <Frame title="Interactive">
          <div className="text-sm text-ink-faint">[interactive: {props.kind}]</div>
        </Frame>
      )
  }
}
