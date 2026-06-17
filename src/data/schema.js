/*
  ════════════════════════════════════════════════════════════════════════════
  CONTENT SCHEMA — the single contract between content files and the renderer.
  Every chapter file MUST conform to this shape. The renderer only knows about
  the block `type`s and interactive `kind`s catalogued below; anything else is
  silently skipped, so author against this list exactly.
  ════════════════════════════════════════════════════════════════════════════

  Chapter = {
    id: 'ch1', number: 1, slug: 'fundamentals-of-testing',
    title: { vn, en },
    tagline: string,            // short inspiring VN line
    bigIdea: string,            // the chapter's "north star" (VN)
    estMinutes: number,
    accent: 'brand' | 'accent' | 'success' | 'info' | 'danger' | 'warn',
    icon: string,               // lucide icon name (see ICONS in Icon.jsx)
    objectives: [ { code: 'FL-1.1.1', k: 'K1'|'K2'|'K3', text: string } ],
    lessons: [ Lesson ],
    quiz: [ Question ],         // 8–15 chapter-review questions
  }

  Lesson = {
    id: 'ch1-l1', slug, title: { vn, en },
    estMinutes: number,
    objectives: [ 'FL-1.1.1' ],     // LO codes covered
    hook: string,                   // 1–2 sentence opening hook (VN)
    blocks: [ Block ],
    keyTerms: [ { en, vn, def } ],  // feeds glossary + spaced repetition
  }

  ── BLOCKS ──────────────────────────────────────────────────────────────────
  Inline markdown subset supported in `md`/`text` fields:
    **bold**  *italic*  `code`  [[Term EN]] (glossary chip)

  { type:'h2', text }                          section heading
  { type:'h3', text }                          sub heading
  { type:'p', md }                             paragraph
  { type:'lead', md }                          larger intro paragraph
  { type:'list', ordered?:bool, items:[md] }   bullet / numbered list
  { type:'callout', variant, title?, md }      variant: 'tip'|'info'|'warn'|'exam-trap'|'principle'|'definition'
  { type:'analogy', emoji, title, md }         relatable real-world analogy
  { type:'keyterm', en, vn, def }              highlighted bilingual term card
  { type:'example', title?, md }               worked example
  { type:'quote', md, who? }                   pull-quote
  { type:'table', headers:[str], rows:[[md]], caption? }
  { type:'flashcards', cards:[{front, back}] } flip-to-reveal deck
  { type:'diagram', kind, caption? }           prebuilt diagram (see DIAGRAMS)
  { type:'interactive', kind, ...props }       interactive widget (see INTERACTIVE)
  { type:'checkpoint', questions:[Question] }  inline 1–3 question knowledge check

  DIAGRAMS (kind):  'test-process' | 'seven-principles' | 'defect-cost'
                    | 'v-model' | 'test-pyramid' | 'verification-validation'
                    | 'error-defect-failure' | 'test-levels'

  INTERACTIVE (kind + props):
    'boundary-value'   { min, max }            explore valid/invalid boundaries
    'equivalence'      { partitions:[{label,range,valid}] }
    'decision-table'   { conditions:[str], actions:[str], rules:[{conditions:[bool|'-'],actions:[bool]}] }
    'state-transition' { states:[str], transitions:[{from,to,event}], start }
    'test-process'     (animated 7-activity walk-through; no props)
    'principles'       (interactive 7 principles cards; no props)
    'match'            { title?, pairs:[{left, right}] }    click-to-pair exercise
    'sort'             { title?, prompt, items:[{label, correctBucket}], buckets:[str] }
    'estimate-slider'  { prompt, min, max, answer, unit?, tolerance? }

  ── QUESTION ────────────────────────────────────────────────────────────────
  Question = {
    id: string,                              // unique across whole course
    type: 'single' | 'multi' | 'truefalse',
    k: 'K1'|'K2'|'K3',
    lo?: 'FL-1.1.1',
    stem: string,                            // EN — exam-realistic wording
    options: [ { id:'a', text } ],           // EN (omit for truefalse)
    correct: [ 'a' ],                        // option id(s); for truefalse use ['true']|['false']
    explanation: string,                     // VN — why right + why others wrong (the gold)
    topic?: string,                          // short tag for review grouping
  }
  ════════════════════════════════════════════════════════════════════════════
*/

/** Flatten all lessons across chapters. */
export function allLessons(chapters) {
  return chapters.flatMap((c) =>
    c.lessons.map((l) => ({ ...l, chapterId: c.id, chapterNumber: c.number })),
  )
}

export function findChapter(chapters, idOrSlug) {
  return chapters.find((c) => c.id === idOrSlug || c.slug === idOrSlug)
}

export function findLesson(chapters, lessonId) {
  for (const c of chapters) {
    const l = c.lessons.find((x) => x.id === lessonId)
    if (l) return { lesson: l, chapter: c }
  }
  return null
}

/** Ordered [{chapter, lesson}] for prev/next navigation. */
export function lessonSequence(chapters) {
  const seq = []
  for (const c of chapters) for (const l of c.lessons) seq.push({ chapter: c, lesson: l })
  return seq
}

export function collectKeyTerms(chapters) {
  const map = new Map()
  for (const c of chapters) {
    for (const l of c.lessons) {
      for (const t of l.keyTerms || []) {
        if (!map.has(t.en)) map.set(t.en, { ...t, lessonId: l.id, chapterId: c.id })
      }
    }
  }
  return [...map.values()]
}

export function termId(en) {
  return 'term:' + en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export function countQuestions(chapters) {
  return chapters.reduce(
    (n, c) =>
      n +
      (c.quiz?.length || 0) +
      c.lessons.reduce(
        (m, l) =>
          m +
          (l.blocks || []).reduce(
            (k, b) => k + (b.type === 'checkpoint' ? b.questions.length : 0),
            0,
          ),
        0,
      ),
    0,
  )
}
