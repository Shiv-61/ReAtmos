import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

function Header() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-gray-300 dark:border-gray-700 
      py-2 backdrop-blur-md backdrop-saturate-150 
      bg-white/70 dark:bg-slate-950/70 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center mb-1">
          <h1 className="text-2xl font-bold text-black dark:text-white">ReAtmos</h1>

          <button
            onClick={toggleTheme}
            className="w-9 h-9 border border-black dark:border-white rounded-full flex items-center 
            justify-center text-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
            title="Toggle theme"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>

        <nav className="flex gap-8 justify-center">
          <Link className="text-base font-medium text-black dark:text-white hover:border-blue-600 dark:hover:border-blue-400 border-b-2 border-transparent transition-colors duration-300" to="/">Home</Link>
          <Link className="text-base font-medium text-black dark:text-white hover:border-blue-600 dark:hover:border-blue-400 border-b-2 border-transparent transition-colors duration-300" to="/dashboard">Dashboard</Link>
          <Link className="text-base font-medium text-black dark:text-white hover:border-blue-600 dark:hover:border-blue-400 border-b-2 border-transparent transition-colors duration-300" to="/events">Events</Link>
          <Link className="text-base font-medium text-black dark:text-white hover:border-blue-600 dark:hover:border-blue-400 border-b-2 border-transparent transition-colors duration-300" to="/login">Login / Register</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
