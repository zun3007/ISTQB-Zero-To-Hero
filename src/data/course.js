import ch1 from './chapters/ch1-fundamentals.js'
import ch2 from './chapters/ch2-sdlc.js'
import ch3 from './chapters/ch3-static-testing.js'
import ch4 from './chapters/ch4-test-techniques.js'
import ch5 from './chapters/ch5-managing.js'
import ch6 from './chapters/ch6-tools.js'
import { glossary } from './glossary.js'
import { mockExam as mockBase } from './mockExam.js'

// Additive supplementary question banks (authored separately, merged here so the
// large chapter files stay untouched).
import ch1x from './quizzes/ch1-extra.js'
import ch2x from './quizzes/ch2-extra.js'
import ch3x from './quizzes/ch3-extra.js'
import ch4x from './quizzes/ch4-extra.js'
import ch5x from './quizzes/ch5-extra.js'
import ch6x from './quizzes/ch6-extra.js'
import mockExtra from './quizzes/mock-extra.js'

const extra = { ch1: ch1x, ch2: ch2x, ch3: ch3x, ch4: ch4x, ch5: ch5x, ch6: ch6x }

export const chapters = [ch1, ch2, ch3, ch4, ch5, ch6].map((c) => ({
  ...c,
  quiz: [...(c.quiz || []), ...(extra[c.id] || [])],
}))

export const mockExam = [...mockBase, ...mockExtra]

export const course = {
  title: 'ISTQB Zero → Hero',
  subtitle: 'Certified Tester Foundation Level · CTFL v4.0',
  blurb:
    'Lộ trình micro-learning đưa bạn từ con số 0 đến tự tin ace kỳ thi ISTQB Foundation — song ngữ, tương tác, hoàn toàn offline.',
  exam: { questions: 40, minutes: 60, passPct: 65 },
}

export { glossary }
