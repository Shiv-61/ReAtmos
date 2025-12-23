import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

function Header() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <header className="border-b-2 border-gray-200 dark:border-gray-700 py-6 sticky top-0 z-100 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold font-poppins text-black dark:text-white">
            ReAtmos
          </h1>
          <button
            onClick={toggleTheme}
            className="w-11 h-11 border-2 border-black dark:border-white rounded-full flex items-center justify-center text-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
            title="Toggle theme"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>
        <nav className="flex gap-12 justify-center">
          <Link
            to="/"
            className="font-inter text-lg font-medium text-black dark:text-white border-b-2 border-transparent hover:border-blue-600 dark:hover:border-blue-400 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className="font-inter text-lg font-medium text-black dark:text-white border-b-2 border-transparent hover:border-blue-600 dark:hover:border-blue-400 transition-colors duration-300"
          >
            Dashboard
          </Link>
          <Link
            to="/events"
            className="font-inter text-lg font-medium text-black dark:text-white border-b-2 border-transparent hover:border-blue-600 dark:hover:border-blue-400 transition-colors duration-300"
          >
            Events
          </Link>
          <Link
            to="/login"
            className="font-inter text-lg font-medium text-black dark:text-white border-b-2 border-transparent hover:border-blue-600 dark:hover:border-blue-400 transition-colors duration-300"
          >
            Login / Register
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
