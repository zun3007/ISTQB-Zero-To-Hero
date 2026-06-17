import Icon from '../ui/Icon.jsx'
import { cn } from '../../lib/cn.js'

/* Reusable atoms ─────────────────────────────────────────────────────────── */
function Pill({ children, tone = 'brand', className }) {
  const tones = {
    brand: 'bg-brand-100 text-brand-800 border-brand-200 dark:bg-brand-500/15 dark:text-brand-100 dark:border-brand-500/30',
    accent:
      'bg-accent-100 text-accent-800 border-accent-200 dark:bg-accent-500/15 dark:text-accent-100 dark:border-accent-500/30',
    danger:
      'bg-danger-soft text-danger border-rose-200 dark:bg-danger/15 dark:text-rose-200 dark:border-danger/30',
    neutral: 'bg-surface-2 text-ink border-line',
  }
  return (
    <div
      className={cn(
        'rounded-xl border px-4 py-3 text-center font-semibold',
        tones[tone],
        className,
      )}
    >
      {children}
    </div>
  )
}

function Arrow({ vertical = false }) {
  return (
    <div className="grid place-items-center text-ink-faint shrink-0">
      <Icon name={vertical ? 'chevron-down' : 'arrow-right'} size={22} />
    </div>
  )
}

/* error → defect → failure ───────────────────────────────────────────────── */
function ErrorDefectFailure() {
  const steps = [
    { t: 'Error (Mistake)', d: 'Con người mắc lỗi', tone: 'neutral', icon: 'brain', vn: 'Sai lầm của con người' },
    { t: 'Defect (Bug/Fault)', d: 'Lỗi nằm trong sản phẩm', tone: 'brand', icon: 'bug', vn: 'Khiếm khuyết trong code/tài liệu' },
    { t: 'Failure', d: 'Hệ thống chạy sai', tone: 'danger', icon: 'warn', vn: 'Hành vi sai khi thực thi' },
  ]
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
      {steps.map((s, i) => (
        <div key={s.t} className="contents">
          <div className="flex-1">
            <Pill tone={s.tone} className="h-full flex flex-col items-center gap-1">
              <Icon name={s.icon} size={22} />
              <span>{s.t}</span>
              <span className="text-xs font-medium opacity-80">{s.vn}</span>
            </Pill>
          </div>
          {i < steps.length - 1 && (
            <>
              <div className="hidden sm:block">
                <Arrow />
              </div>
              <div className="sm:hidden">
                <Arrow vertical />
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

/* defect cost escalation ──────────────────────────────────────────────────── */
function DefectCost() {
  const phases = [
    { p: 'Requirements', c: 1 },
    { p: 'Design', c: 3 },
    { p: 'Code', c: 8 },
    { p: 'Test', c: 20 },
    { p: 'Production', c: 60 },
  ]
  const max = 60
  return (
    <div>
      <div className="flex items-end gap-2 sm:gap-4 h-52">
        {phases.map((x) => (
          <div key={x.p} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
            <span className="text-xs font-bold text-ink">{x.c}×</span>
            <div
              className="w-full rounded-t-lg bg-gradient-to-t from-brand-500 to-accent-500"
              style={{ height: `${(x.c / max) * 100}%` }}
            />
            <span className="text-2xs sm:text-xs text-ink-faint text-center leading-tight">
              {x.p}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-xs text-ink-faint">
        Chi phí sửa một defect tăng theo cấp số nhân nếu phát hiện muộn → tìm
        defect càng sớm càng rẻ.
      </p>
    </div>
  )
}

/* V-model ─────────────────────────────────────────────────────────────────── */
function VModel() {
  const left = ['Requirements', 'Functional spec', 'System design', 'Component design']
  const right = ['Acceptance testing', 'System testing', 'Integration testing', 'Component testing']
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-2">
      <div className="space-y-2">
        {left.map((x, i) => (
          <Pill key={x} tone="brand" style={{ marginLeft: `${i * 14}px` }}>
            {x}
          </Pill>
        ))}
      </div>
      <div className="space-y-2">
        {right.map((x, i) => (
          <Pill key={x} tone="accent" style={{ marginRight: `${(3 - i) * 14}px` }}>
            {x}
          </Pill>
        ))}
      </div>
      <p className="col-span-2 mt-2 text-center text-xs text-ink-faint">
        Mỗi pha phát triển (trái) gắn với một mức kiểm thử (phải) — test được
        thiết kế song song, không phải sau cùng.
      </p>
    </div>
  )
}

/* Test pyramid ────────────────────────────────────────────────────────────── */
function TestPyramid() {
  const tiers = [
    { t: 'UI / E2E', w: 'w-1/3', tone: 'from-accent-500 to-accent-400', note: 'Ít, chậm, đắt' },
    { t: 'Integration / Service', w: 'w-2/3', tone: 'from-brand-500 to-accent-500', note: 'Vừa phải' },
    { t: 'Unit / Component', w: 'w-full', tone: 'from-brand-600 to-brand-500', note: 'Nhiều, nhanh, rẻ' },
  ]
  return (
    <div className="flex flex-col items-center gap-1.5">
      {tiers.map((x) => (
        <div key={x.t} className={cn('flex items-center justify-center', x.w)}>
          <div
            className={cn(
              'w-full rounded-lg bg-gradient-to-r px-4 py-3 text-center text-white font-semibold',
              x.tone,
            )}
          >
            {x.t}
            <span className="block text-2xs font-medium opacity-90">{x.note}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

/* Verification vs Validation ──────────────────────────────────────────────── */
function VerificationValidation() {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <div className="rounded-xl border border-brand-200 bg-brand-50/60 dark:bg-brand-500/10 dark:border-brand-500/30 p-4">
        <div className="flex items-center gap-2 font-bold text-brand-700 dark:text-brand-200">
          <Icon name="shield" size={20} /> Verification
        </div>
        <p className="mt-1 text-sm">“Building the product <strong>right</strong>?”</p>
        <p className="mt-2 text-xs text-ink-soft">
          Có đúng spec không? Review, static analysis, kiểm tra tài liệu.
        </p>
      </div>
      <div className="rounded-xl border border-accent-200 bg-accent-50/60 dark:bg-accent-500/10 dark:border-accent-500/30 p-4">
        <div className="flex items-center gap-2 font-bold text-accent-700 dark:text-accent-200">
          <Icon name="target" size={20} /> Validation
        </div>
        <p className="mt-1 text-sm">“Building the <strong>right</strong> product?”</p>
        <p className="mt-2 text-xs text-ink-soft">
          Có đáp ứng nhu cầu thật của người dùng không? Thường cần chạy thật.
        </p>
      </div>
    </div>
  )
}

/* Test levels ─────────────────────────────────────────────────────────────── */
function TestLevels() {
  const levels = [
    { t: 'Component testing', d: 'Kiểm thử từng module/đơn vị riêng lẻ', icon: 'boxes' },
    { t: 'Integration testing', d: 'Kiểm thử tương tác giữa các thành phần', icon: 'network' },
    { t: 'System testing', d: 'Kiểm thử toàn hệ thống end-to-end', icon: 'layers' },
    { t: 'Acceptance testing', d: 'Xác nhận sẵn sàng bàn giao / đáp ứng nhu cầu', icon: 'check' },
  ]
  return (
    <div className="space-y-2">
      {levels.map((x, i) => (
        <div
          key={x.t}
          className="flex items-center gap-3 rounded-xl border border-line bg-surface-2 px-4 py-3"
        >
          <div className="grid size-9 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 text-white font-bold text-sm shrink-0">
            {i + 1}
          </div>
          <Icon name={x.icon} size={20} className="text-brand-500 shrink-0" />
          <div>
            <div className="font-semibold text-ink">{x.t}</div>
            <div className="text-xs text-ink-faint">{x.d}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

/* Static fallbacks for test-process / seven-principles (interactive versions
   live in Interactive.jsx) ─────────────────────────────────────────────────── */
function TestProcessStatic() {
  const acts = [
    'Test planning',
    'Monitoring & control',
    'Test analysis',
    'Test design',
    'Test implementation',
    'Test execution',
    'Test completion',
  ]
  return (
    <div className="flex flex-wrap gap-2">
      {acts.map((a, i) => (
        <div key={a} className="flex items-center gap-2">
          <Pill tone={i % 2 ? 'accent' : 'brand'} className="text-sm">
            {i + 1}. {a}
          </Pill>
        </div>
      ))}
    </div>
  )
}

const REGISTRY = {
  'error-defect-failure': ErrorDefectFailure,
  'defect-cost': DefectCost,
  'v-model': VModel,
  'test-pyramid': TestPyramid,
  'verification-validation': VerificationValidation,
  'test-levels': TestLevels,
  'test-process': TestProcessStatic,
}

export default function Diagram({ kind, caption }) {
  const C = REGISTRY[kind]
  return (
    <figure className="surface-card my-6 p-5 sm:p-6">
      {C ? (
        <C />
      ) : (
        <div className="text-sm text-ink-faint">[diagram: {kind}]</div>
      )}
      {caption && (
        <figcaption className="mt-4 text-center text-xs text-ink-faint">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
