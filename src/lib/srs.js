/*
  Lightweight spaced-repetition scheduler (SM-2 family, simplified to a
  3-grade interface: "again" / "good" / "easy"). Used by the Review queue so
  key ISTQB terms resurface right before you'd forget them.

  A card: { id, ease, intervalDays, reps, lapses, due }  (due = epoch ms)
*/

const DAY = 24 * 60 * 60 * 1000

export function newCard(id, now = Date.now()) {
  return { id, ease: 2.5, intervalDays: 0, reps: 0, lapses: 0, due: now }
}

/** grade: 'again' | 'good' | 'easy' */
export function schedule(card, grade, now = Date.now()) {
  let { ease, intervalDays, reps, lapses } = card

  if (grade === 'again') {
    lapses += 1
    reps = 0
    intervalDays = 0 // see again in this session (~10 min)
    ease = Math.max(1.3, ease - 0.2)
    return { ...card, ease, intervalDays, reps, lapses, due: now + 10 * 60 * 1000 }
  }

  reps += 1
  if (grade === 'easy') ease = ease + 0.15
  if (reps === 1) intervalDays = grade === 'easy' ? 4 : 1
  else if (reps === 2) intervalDays = grade === 'easy' ? 7 : 3
  else intervalDays = Math.round(intervalDays * ease * (grade === 'easy' ? 1.3 : 1))

  ease = Math.min(3.2, Math.max(1.3, ease))
  return { ...card, ease, intervalDays, reps, lapses, due: now + intervalDays * DAY }
}

export function isDue(card, now = Date.now()) {
  return !card || card.due <= now
}

export function dueCount(cards, now = Date.now()) {
  return Object.values(cards || {}).filter((c) => isDue(c, now)).length
}
