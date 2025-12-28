function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-gray-300 dark:border-gray-700 
      py-2 bg-white dark:bg-slate-950 transition-colors duration-300">

      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <span className="text-base font-semibold text-black dark:text-white">
          FOOTER
        </span>

        <button
          onClick={scrollToTop}
          className="text-sm font-medium text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
        >
          ↑ Back to top
        </button>
      </div>
    </footer>
  )
}

export default Footer
