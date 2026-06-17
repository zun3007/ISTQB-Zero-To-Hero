import { Suspense, useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import Sidebar from './Sidebar.jsx'
import TopBar from './TopBar.jsx'
import Icon from '../ui/Icon.jsx'

export default function AppShell() {
  const [drawer, setDrawer] = useState(false)
  const loc = useLocation()

  // Scroll to top on route change. (The drawer closes via its own nav handlers
  // and overlay click, so no state update is needed here.)
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [loc.pathname])

  return (
    <div className="min-h-screen bg-bg">
      <TopBar onMenu={() => setDrawer(true)} />

      <div className="mx-auto flex max-w-7xl">
        {/* Desktop sidebar */}
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-72 shrink-0 border-r border-line lg:block">
          <Sidebar />
        </aside>

        {/* Mobile drawer */}
        <AnimatePresence>
          {drawer && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setDrawer(false)}
                className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
              />
              <motion.aside
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="fixed inset-y-0 left-0 z-50 w-72 overflow-y-auto border-r border-line bg-surface lg:hidden"
              >
                <Sidebar onNavigate={() => setDrawer(false)} />
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        <main className="min-w-0 flex-1 px-4 py-8 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl">
            <Suspense
              fallback={
                <div className="grid place-items-center py-24 text-ink-faint">
                  <Icon name="sparkles" size={28} className="animate-pulse text-brand-400" />
                </div>
              }
            >
              <Outlet />
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  )
}
