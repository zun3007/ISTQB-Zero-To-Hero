import { useState } from 'react'
import { chapters } from '../data/course.js'
import { allLessons } from '../data/schema.js'
import { useStore } from '../store/store.jsx'
import Icon from '../components/ui/Icon.jsx'
import { Button, Card, ProgressBar } from '../components/ui/primitives.jsx'

export default function ProgressView() {
  const { state, resetAll } = useStore()
  const [confirm, setConfirm] = useState(false)

  const lessons = allLessons(chapters)
  const done = lessons.filter((l) => state.lessons[l.id]).length
  const overall = lessons.length ? Math.round((done / lessons.length) * 100) : 0

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-extrabold">Tiến độ của bạn</h1>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { icon: 'flame', l: 'Chuỗi hiện tại', v: state.streak.current },
          { icon: 'trophy', l: 'Chuỗi dài nhất', v: state.streak.longest },
          { icon: 'zap', l: 'Tổng XP', v: state.xp },
          { icon: 'check', l: 'Hoàn thành', v: `${overall}%` },
        ].map((s) => (
          <Card key={s.l} className="p-4">
            <Icon name={s.icon} size={20} className="text-brand-500" />
            <div className="mt-2 text-2xl font-extrabold text-ink">{s.v}</div>
            <div className="text-xs text-ink-faint">{s.l}</div>
          </Card>
        ))}
      </div>

      <section>
        <h2 className="mb-3 text-xl font-bold">Theo chương</h2>
        <div className="space-y-3">
          {chapters.map((c) => {
            const cdone = c.lessons.filter((l) => state.lessons[l.id]).length
            const cp = c.lessons.length ? Math.round((cdone / c.lessons.length) * 100) : 0
            const quiz = state.quizzes[`chapter:${c.slug}`]
            return (
              <Card key={c.id} className="p-4">
                <div className="mb-2 flex items-center gap-3">
                  <Icon name={c.icon} size={18} className="text-brand-500" />
                  <span className="flex-1 font-semibold text-ink">
                    {c.number}. {c.title.vn}
                  </span>
                  {quiz && (
                    <span className="text-xs font-bold text-accent-600 dark:text-accent-300">
                      Quiz tốt nhất: {quiz.best}%
                    </span>
                  )}
                  <span className="text-sm font-bold text-ink-faint">{cp}%</span>
                </div>
                <ProgressBar value={cp} />
              </Card>
            )
          })}
        </div>
      </section>

      {state.exams.length > 0 && (
        <section>
          <h2 className="mb-3 text-xl font-bold">Lịch sử thi thử</h2>
          <div className="space-y-2">
            {[...state.exams].reverse().map((e, i) => (
              <Card key={i} className="flex items-center gap-3 p-3">
                <Icon
                  name={e.passed ? 'trophy' : 'repeat'}
                  size={18}
                  className={e.passed ? 'text-success' : 'text-warn'}
                />
                <span className="flex-1 text-sm text-ink-soft">
                  {new Date(e.at).toLocaleDateString('vi-VN')} · {e.score}/{e.total} câu
                </span>
                <span className={`font-bold ${e.passed ? 'text-success' : 'text-warn'}`}>{e.pct}%</span>
              </Card>
            ))}
          </div>
        </section>
      )}

      <section className="border-t border-line pt-6">
        <h2 className="mb-1 text-lg font-bold">Dữ liệu</h2>
        <p className="mb-3 text-sm text-ink-soft">
          Toàn bộ tiến độ được lưu cục bộ trên trình duyệt này (localStorage) — không gửi đi đâu cả.
        </p>
        {confirm ? (
          <div className="flex items-center gap-2">
            <Button variant="danger" size="sm" onClick={() => { resetAll(); setConfirm(false) }}>
              Xác nhận xoá toàn bộ
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setConfirm(false)}>
              Huỷ
            </Button>
          </div>
        ) : (
          <Button variant="outline" size="sm" onClick={() => setConfirm(true)}>
            <Icon name="reset" size={15} /> Đặt lại tiến độ
          </Button>
        )}
      </section>
    </div>
  )
}
