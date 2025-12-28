import { Routes, Route } from 'react-router-dom'
import { useTheme } from './context/ThemeContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Events from './pages/Events'
import LoginRegister from './pages/LoginRegister'

function App() {
  const { isDark } = useTheme()

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="flex flex-col min-h-screen pt-32 bg-white dark:bg-slate-950 text-black dark:text-white transition-colors duration-300">
        <Header />
        <main className="flex-1 max-w-6xl mx-auto w-full px-8 py-8">
          <div className="min-h-96 border-2 border-gray-200 dark:border-gray-700 rounded-lg p-8 bg-gray-50 dark:bg-slate-900 flex items-center justify-center">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/events" element={<Events />} />
              <Route path="/login" element={<LoginRegister />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
