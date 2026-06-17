import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { newCard, schedule } from '../lib/srs.js'

const KEY = 'istqb.progress.v1'
const THEME_KEY = 'istqb.theme'

const empty = {
  lessons: {}, // { lessonId: completedAt }
  bookmarks: {}, // { lessonId: true }
  quizzes: {}, // { quizId: { best, attempts, lastAt } }
  checkpoints: {}, // { lessonId: { correct, total, at } }
  cards: {}, // { termId: srsCard }
  exams: [], // [{ at, score, total, pct, passed, byChapter }]
  xp: 0,
  streak: { current: 0, longest: 0, lastDay: null },
}

function todayKey(now = Date.now()) {
  const d = new Date(now)
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { ...empty }
    const parsed = JSON.parse(raw)
    return { ...empty, ...parsed, streak: { ...empty.streak, ...parsed.streak } }
  } catch {
    return { ...empty }
  }
}

const StoreCtx = createContext(null)

export function StoreProvider({ children }) {
  const [state, setState] = useState(load)
  const [theme, setThemeState] = useState(
    () => localStorage.getItem(THEME_KEY) || 'system',
  )
  const firstRun = useRef(true)

  // Persist progress
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false
      return
    }
    try {
      localStorage.setItem(KEY, JSON.stringify(state))
    } catch {
      /* storage full / unavailable — degrade silently */
    }
  }, [state])

  // Apply + persist theme
  useEffect(() => {
    const root = document.documentElement
    const sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const dark = theme === 'dark' || (theme === 'system' && sysDark)
    root.classList.toggle('dark', dark)
    if (theme === 'system') localStorage.removeItem(THEME_KEY)
    else localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  // React to OS theme changes while in "system" mode
  useEffect(() => {
    if (theme !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const fn = () => document.documentElement.classList.toggle('dark', mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [theme])

  const actions = useMemo(() => {
    const touchStreak = (s) => {
      const today = todayKey()
      if (s.streak.lastDay === today) return s.streak
      const y = new Date()
      y.setDate(y.getDate() - 1)
      const yKey = todayKey(y.getTime())
      const current = s.streak.lastDay === yKey ? s.streak.current + 1 : 1
      return {
        current,
        longest: Math.max(current, s.streak.longest),
        lastDay: today,
      }
    }

    const addXp = (n) =>
      setState((s) => ({ ...s, xp: s.xp + n, streak: touchStreak(s) }))

    return {
      addXp,

      completeLesson: (lessonId, xp = 20) =>
        setState((s) => {
          const already = !!s.lessons[lessonId]
          return {
            ...s,
            lessons: { ...s.lessons, [lessonId]: Date.now() },
            xp: already ? s.xp : s.xp + xp,
            streak: touchStreak(s),
          }
        }),

      recordCheckpoint: (lessonId, correct, total) =>
        setState((s) => ({
          ...s,
          checkpoints: {
            ...s.checkpoints,
            [lessonId]: { correct, total, at: Date.now() },
          },
          xp: s.xp + correct * 5,
          streak: touchStreak(s),
        })),

      recordQuiz: (quizId, correct, total) =>
        setState((s) => {
          const prev = s.quizzes[quizId] || { best: 0, attempts: 0 }
          const pct = Math.round((correct / total) * 100)
          return {
            ...s,
            quizzes: {
              ...s.quizzes,
              [quizId]: {
                best: Math.max(prev.best, pct),
                last: pct,
                attempts: prev.attempts + 1,
                lastAt: Date.now(),
              },
            },
            xp: s.xp + correct * 5,
            streak: touchStreak(s),
          }
        }),

      recordExam: (result) =>
        setState((s) => ({
          ...s,
          exams: [...s.exams, { ...result, at: Date.now() }].slice(-25),
          xp: s.xp + Math.round(result.pct),
          streak: touchStreak(s),
        })),

      ensureCards: (termIds) =>
        setState((s) => {
          let changed = false
          const cards = { ...s.cards }
          for (const id of termIds) {
            if (!cards[id]) {
              cards[id] = newCard(id)
              changed = true
            }
          }
          return changed ? { ...s, cards } : s
        }),

      gradeCard: (termId, grade) =>
        setState((s) => {
          const card = s.cards[termId] || newCard(termId)
          return {
            ...s,
            cards: { ...s.cards, [termId]: schedule(card, grade) },
            xp: s.xp + (grade === 'again' ? 1 : 3),
            streak: touchStreak(s),
          }
        }),

      toggleBookmark: (lessonId) =>
        setState((s) => {
          const bookmarks = { ...s.bookmarks }
          if (bookmarks[lessonId]) delete bookmarks[lessonId]
          else bookmarks[lessonId] = true
          return { ...s, bookmarks }
        }),

      resetAll: () => setState({ ...empty }),
    }
  }, [])

  const value = useMemo(
    () => ({ state, theme, setTheme: setThemeState, ...actions }),
    [state, theme, actions],
  )

  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>
}

export function useStore() {
  const ctx = useContext(StoreCtx)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
