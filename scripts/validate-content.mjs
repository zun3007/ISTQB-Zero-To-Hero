/*
  Content integrity validator. Imports the real course data and asserts every
  block/interactive/diagram kind is in the renderer's catalog and every question
  has a sound answer key. Run: node scripts/validate-content.mjs
*/
import { chapters, glossary, mockExam } from '../src/data/course.js'
import { countQuestions } from '../src/data/schema.js'

const DIAGRAMS = new Set([
  'error-defect-failure', 'defect-cost', 'v-model', 'test-pyramid',
  'verification-validation', 'test-levels', 'test-process',
])
const INTERACTIVE = new Set([
  'boundary-value', 'equivalence', 'decision-table', 'state-transition',
  'test-process', 'principles', 'match', 'sort', 'estimate-slider',
])
const BLOCKS = new Set([
  'h2', 'h3', 'lead', 'p', 'list', 'callout', 'analogy', 'keyterm', 'example',
  'quote', 'table', 'flashcards', 'diagram', 'interactive', 'checkpoint',
])
const CALLOUTS = new Set(['tip', 'info', 'warn', 'exam-trap', 'principle', 'definition'])

// Official CTFL v4.0 learning-objective master list (per chapter).
const OFFICIAL_LOS = {
  1: ['FL-1.1.1', 'FL-1.1.2', 'FL-1.2.1', 'FL-1.2.2', 'FL-1.2.3', 'FL-1.3.1', 'FL-1.4.1', 'FL-1.4.2', 'FL-1.4.3', 'FL-1.4.4', 'FL-1.4.5', 'FL-1.5.1', 'FL-1.5.2', 'FL-1.5.3'],
  2: ['FL-2.1.1', 'FL-2.1.2', 'FL-2.1.3', 'FL-2.1.4', 'FL-2.1.5', 'FL-2.1.6', 'FL-2.2.1', 'FL-2.2.2', 'FL-2.2.3', 'FL-2.3.1'],
  3: ['FL-3.1.1', 'FL-3.1.2', 'FL-3.1.3', 'FL-3.2.1', 'FL-3.2.2', 'FL-3.2.3', 'FL-3.2.4'],
  4: ['FL-4.2.1', 'FL-4.2.2', 'FL-4.2.3', 'FL-4.2.4', 'FL-4.3.1', 'FL-4.3.2', 'FL-4.3.3', 'FL-4.4.1', 'FL-4.4.2', 'FL-4.4.3', 'FL-4.5.1', 'FL-4.5.2', 'FL-4.5.3'],
  5: ['FL-5.1.1', 'FL-5.1.2', 'FL-5.1.3', 'FL-5.1.4', 'FL-5.1.5', 'FL-5.1.6', 'FL-5.1.7', 'FL-5.2.1', 'FL-5.2.2', 'FL-5.2.3', 'FL-5.3.1', 'FL-5.3.2', 'FL-5.4.1', 'FL-5.5.1'],
  6: ['FL-6.1.1', 'FL-6.2.1'],
}
const ALL_OFFICIAL = new Set(Object.values(OFFICIAL_LOS).flat())

const errors = []
const warnings = []
const ids = new Set()
const loQuestionCount = {}
let totalLessons = 0
let totalQuestions = 0

function checkQuestion(q, where) {
  totalQuestions++
  if (q.lo) {
    loQuestionCount[q.lo] = (loQuestionCount[q.lo] || 0) + 1
    if (!ALL_OFFICIAL.has(q.lo) && !/^FL-\d\.1\.1$/.test(q.lo))
      warnings.push(`${q.id}: lo "${q.lo}" is not an official v4.0 LO`)
  }
  if (!q.id) errors.push(`${where}: question missing id`)
  if (q.id && ids.has(q.id)) errors.push(`${where}: duplicate question id "${q.id}"`)
  ids.add(q.id)
  if (!['single', 'multi', 'truefalse'].includes(q.type)) errors.push(`${q.id}: bad type "${q.type}"`)
  if (!['K1', 'K2', 'K3'].includes(q.k)) warnings.push(`${q.id}: bad/missing K level "${q.k}"`)
  const correct = q.correct || []
  if (!correct.length) errors.push(`${q.id}: empty correct[]`)
  if (q.type === 'truefalse') {
    if (!correct.every((c) => c === 'true' || c === 'false'))
      errors.push(`${q.id}: truefalse correct must be 'true'/'false', got ${JSON.stringify(correct)}`)
  } else {
    const optIds = new Set((q.options || []).map((o) => o.id))
    if (!q.options || q.options.length < 2) errors.push(`${q.id}: needs >=2 options`)
    for (const c of correct) if (!optIds.has(c)) errors.push(`${q.id}: correct "${c}" not in options`)
    if (q.type === 'single' && correct.length !== 1) errors.push(`${q.id}: single must have exactly 1 correct`)
    if (q.type === 'multi' && correct.length < 2) warnings.push(`${q.id}: multi has <2 correct`)
  }
  if (!q.explanation) warnings.push(`${q.id}: missing explanation`)
}

function checkBlock(b, where) {
  if (!BLOCKS.has(b.type)) { errors.push(`${where}: unknown block type "${b.type}"`); return }
  if (b.type === 'callout' && b.variant && !CALLOUTS.has(b.variant))
    errors.push(`${where}: unknown callout variant "${b.variant}"`)
  if (b.type === 'diagram' && !DIAGRAMS.has(b.kind))
    errors.push(`${where}: unknown diagram kind "${b.kind}"`)
  if (b.type === 'interactive' && !INTERACTIVE.has(b.kind))
    errors.push(`${where}: unknown interactive kind "${b.kind}"`)
  if (b.type === 'checkpoint') (b.questions || []).forEach((q) => checkQuestion(q, where))
}

if (chapters.length !== 6) errors.push(`expected 6 chapters, got ${chapters.length}`)

for (const c of chapters) {
  if (!c.id || !c.slug || !c.title?.vn) errors.push(`chapter ${c.number}: missing meta`)
  if (!c.lessons?.length) errors.push(`${c.id}: no lessons`)
  for (const l of c.lessons || []) {
    totalLessons++
    if (!l.id || !l.title?.vn) errors.push(`${c.id}: lesson missing id/title`)
    if (l.id && ids.has(l.id)) errors.push(`duplicate lesson id "${l.id}"`)
    ids.add(l.id)
    for (const b of l.blocks || []) checkBlock(b, l.id)
  }
  for (const q of c.quiz || []) checkQuestion(q, `${c.id}.quiz`)
}

for (const q of mockExam) checkQuestion(q, 'mockExam')
for (const t of glossary) if (!t.en || !t.def) warnings.push(`glossary term missing en/def: ${JSON.stringify(t).slice(0, 40)}`)

const perChapter = chapters
  .map((c) => `  ch${c.number}: ${c.lessons.length} lessons, ${c.quiz?.length || 0} quiz Q`)
  .join('\n')

console.log('── Content validation ──')
console.log(`Chapters: ${chapters.length}`)
console.log(perChapter)
console.log(`Total lessons: ${totalLessons}`)
console.log(`Total questions (incl. checkpoints): ${countQuestions(chapters) + mockExam.length}`)
console.log(`Glossary terms (curated): ${glossary.length}`)
console.log(`Mock-exam bank: ${mockExam.length}`)
// LO coverage: which official LOs have NO practice question?
const uncovered = []
for (const los of Object.values(OFFICIAL_LOS))
  for (const lo of los) if (!loQuestionCount[lo]) uncovered.push(lo)
console.log(`\nLO coverage (official v4.0): ${ALL_OFFICIAL.size - uncovered.length}/${ALL_OFFICIAL.size} have >=1 question`)
if (uncovered.length) {
  console.log('  LOs with NO question:')
  uncovered.forEach((lo) => console.log('    · ' + lo))
}

console.log(`\nErrors: ${errors.length}`)
errors.forEach((e) => console.log('  ✗ ' + e))
console.log(`Warnings: ${warnings.length}`)
warnings.slice(0, 20).forEach((w) => console.log('  ! ' + w))

process.exit(errors.length ? 1 : 0)
