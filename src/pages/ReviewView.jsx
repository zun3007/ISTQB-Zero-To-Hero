import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { chapters, glossary } from '../data/course.js'
import { collectKeyTerms, termId } from '../data/schema.js'
import { isDue } from '../lib/srs.js'
import { useStore } from '../store/store.jsx'
import Icon from '../components/ui/Icon.jsx'
import { Button, Card } from '../components/ui/primitives.jsx'

export default function ReviewView() {
  const { state, gradeCard, ensureCards } = useStore()

  const termMap = useMemo(() => {
    const m = new Map()
    for (const t of [...collectKeyTerms(chapters), ...glossary]) m.set(termId(t.en), t)
    return m
  }, [])

  const dueIds = useMemo(
    () => Object.keys(state.cards).filter((id) => isDue(state.cards[id]) && termMap.has(id)),
    [state.cards, termMap],
  )

  const [revealed, setRevealed] = useState(false)
  const current = dueIds[0]
  const term = current ? termMap.get(current) : null

  const grade = (g) => {
    gradeCard(current, g)
    setRevealed(false)
  }

  const allCardIds = [...termMap.keys()]
  const seeded = allCardIds.filter((id) => state.cards[id]).length

  // Nothing due
  if (!term) {
    return (
      <div className="py-10 text-center">
        <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-success text-white">
          <Icon name="check" size={32} />
        </div>
        <h1 className="mt-4 text-2xl font-bold">Hết thẻ cần ôn! 🎉</h1>
        <p className="mt-1 text-ink-soft">
          {seeded === 0
            ? 'Hoàn thành vài bài học để hệ thống bắt đầu lên lịch ôn tập cách quãng cho bạn.'
            : 'Quay lại sau nhé — các thẻ sẽ xuất hiện đúng lúc bạn sắp quên.'}
        </p>
        <div className="mt-5 flex justify-center gap-2">
          <Button as={Link} to="/" variant="outline">
            <Icon name="home" size={16} /> Trang chủ
          </Button>
          {seeded < allCardIds.length && (
            <Button onClick={() => ensureCards(allCardIds)}>
              <Icon name="zap" size={16} /> Nạp toàn bộ {allCardIds.length} thẻ để ôn ngay
            </Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold">Ôn tập cách quãng</h1>
        <span className="rounded-full bg-accent-100 px-3 py-1 text-sm font-bold text-accent-700 dark:bg-accent-500/15 dark:text-accent-300">
          còn {dueIds.length} thẻ
        </span>
      </div>

      <Card className="p-8 text-center">
        <div className="text-xs font-bold uppercase tracking-wider text-ink-faint">Thuật ngữ</div>
        <div className="mt-2 font-mono text-2xl font-extrabold text-brand-600 dark:text-brand-300">
          {term.en}
        </div>
        {term.vn && <div className="mt-1 text-ink-faint">{term.vn}</div>}

        {revealed ? (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-5">
            <p className="text-ink-soft">{term.def}</p>
            <div className="mt-6 grid grid-cols-3 gap-2">
              <Button variant="danger" onClick={() => grade('again')}>
                Quên
              </Button>
              <Button variant="outline" onClick={() => grade('good')}>
                Nhớ
              </Button>
              <Button variant="solid" onClick={() => grade('easy')}>
                Dễ
              </Button>
            </div>
            <p className="mt-2 text-2xs text-ink-faint">
              Đánh giá độ nhớ để hệ thống xếp lịch lần ôn kế tiếp.
            </p>
          </motion.div>
        ) : (
          <Button className="mt-6" onClick={() => setRevealed(true)}>
            <Icon name="eye" size={16} /> Hiện định nghĩa
          </Button>
        )}
      </Card>
    </div>
  )
}
