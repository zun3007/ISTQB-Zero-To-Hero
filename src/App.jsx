import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import AppShell from './components/layout/AppShell.jsx'
import Home from './pages/Home.jsx'

// Route-level code splitting: each page (and its heavy renderer / quiz / widget
// code) loads on demand, keeping the initial bundle lean. Suspense lives in
// AppShell, wrapping the <Outlet>.
const ChapterView = lazy(() => import('./pages/ChapterView.jsx'))
const LessonView = lazy(() => import('./pages/LessonView.jsx'))
const QuizView = lazy(() => import('./pages/QuizView.jsx'))
const ExamView = lazy(() => import('./pages/ExamView.jsx'))
const GlossaryView = lazy(() => import('./pages/GlossaryView.jsx'))
const ReviewView = lazy(() => import('./pages/ReviewView.jsx'))
const ProgressView = lazy(() => import('./pages/ProgressView.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Home />} />
        <Route path="/chapter/:slug" element={<ChapterView />} />
        <Route path="/lesson/:id" element={<LessonView />} />
        <Route path="/quiz/:slug" element={<QuizView />} />
        <Route path="/exam" element={<ExamView />} />
        <Route path="/glossary" element={<GlossaryView />} />
        <Route path="/review" element={<ReviewView />} />
        <Route path="/progress" element={<ProgressView />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
