import { useState } from 'react'

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t-2 border-gray-200 dark:border-gray-700 mt-auto py-8 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-8 flex justify-between items-center">
        <div className="flex items-center">
          <span className="font-inter text-lg font-semibold text-black dark:text-white">
            FOOTER
          </span>
        </div>
        <div className="flex items-center">
          <button
            onClick={scrollToTop}
            className="font-inter text-sm font-medium text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
          >
            ↑ button for scroll to top
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
