import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { name: 'Work', path: '/work' },
  { name: 'About', path: '/about' },
  { name: 'Careers', path: '/careers' },
  { name: 'Contact', path: '/contact' },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [scrollY, setScrollY] = useState(0)
  const [initialLoad, setInitialLoad] = useState(true)
  const location = useLocation()
  const lastScrollY = useRef(0)

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  // Scroll hide/show logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        // Scrolling down - hide navbar
        setIsVisible(false)
      } else {
        // Scrolling up - show navbar
        setIsVisible(true)
      }
      lastScrollY.current = currentScrollY
      setScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Trigger initial load animation after mount
  useEffect(() => {
    const timer = setTimeout(() => setInitialLoad(false), 200)
    return () => clearTimeout(timer)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
      y: -100,
      opacity: 0,
      transition: { duration: 0.3, ease: 'easeIn' },
    },
  }

  const linkVariants = {
    hover: {
      y: -2,
      transition: { duration: 0.2, ease: 'easeOut' },
    },
  }

  // Hamburger line animation variants
  const lineTopVariants = {
    open: { rotate: 45, y: 8, width: '24px' },
    closed: { rotate: 0, y: 0, width: '24px' },
  }

  const lineMiddleVariants = {
    open: { opacity: 0, width: '18px' },
    closed: { opacity: 1, width: '18px' },
  }

  const lineBottomVariants = {
    open: { rotate: -45, y: -8, width: '14px' },
    closed: { rotate: 0, y: 0, width: '14px' },
  }

  // Overlay menu animation
  const overlayVariants = {
    hidden: { x: '100%' },
    visible: {
      x: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
      x: '100%',
      transition: { duration: 0.4, ease: [0.7, 0, 0.84, 0] },
    },
  }

  const mobileLinkVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.1 + i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    }),
    exit: (i) => ({
      opacity: 0,
      x: 40,
      transition: { delay: (navLinks.length - 1 - i) * 0.05, duration: 0.2 },
    }),
  }

  return (
    <>
      <motion.nav
        variants={navbarVariants}
        initial={initialLoad ? 'hidden' : false}
        animate={isVisible ? 'visible' : 'exit'}
        className='fixed top-0 left-0 w-full z-50'
      >
        <div className='relative'>
          {/* Frosted glass background */}
          <div className='absolute inset-0 bg-[#080808]/70 backdrop-blur-md' />

          {/* Bottom border */}
          <div className='absolute bottom-0 left-0 right-0 h-[1px] bg-[#C8A97E]/20' />

          <div className='relative flex items-center justify-between px-6 md:px-12 h-16 md:h-20'>
            {/* Logo */}
            <Link to='/' className='flex flex-col items-start leading-none select-none'>
              <span
                className='text-[28px] md:text-[34px] tracking-[0.15em] text-primary leading-none'
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                KAZUORI
              </span>
              <span
                className='text-[10px] md:text-[11px] text-[#C8A97E] tracking-[0.05em] leading-none mt-[2px]'
                style={{ fontFamily: "'Noto Serif JP', serif" }}
              >
                影を動かす者
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className='hidden md:flex items-center gap-8'>
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `relative text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${
                      isActive
                        ? 'text-[#C8A97E]'
                        : 'text-white/60 hover:text-white/90'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <motion.span
                      variants={linkVariants}
                      whileHover='hover'
                      className='inline-block'
                    >
                      {link.name}
                      {isActive && (
                        <motion.span
                          layoutId='activeNavIndicator'
                          className='absolute -bottom-1 left-0 right-0 h-[2px] bg-[#C8A97E]'
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                        />
                      )}
                    </motion.span>
                  )}
                </NavLink>
              ))}

              {/* Music toggle placeholder */}
              <button
                className='flex flex-col items-center gap-[5px] px-2 py-2 opacity-60 hover:opacity-100 transition-opacity duration-300'
                aria-label='Toggle audio'
                title='Audio (coming soon)'
              >
                <span className='block h-[2px] bg-primary w-6 rounded-full' />
                <span className='block h-[2px] bg-primary w-[18px] rounded-full' />
                <span className='block h-[2px] bg-primary w-[14px] rounded-full' />
              </button>
            </div>

            {/* Mobile Hamburger */}
            <button
              className='md:hidden flex flex-col items-end gap-[5px] p-2 z-50'
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              <motion.span
                variants={lineTopVariants}
                animate={isOpen ? 'open' : 'closed'}
                className='block h-[2px] bg-primary rounded-full origin-center'
              />
              <motion.span
                variants={lineMiddleVariants}
                animate={isOpen ? 'open' : 'closed'}
                className='block h-[2px] bg-primary rounded-full'
              />
              <motion.span
                variants={lineBottomVariants}
                animate={isOpen ? 'open' : 'closed'}
                className='block h-[2px] bg-primary rounded-full origin-center'
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Fullscreen Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key='mobile-menu'
            variants={overlayVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            className='fixed inset-0 z-40 md:hidden bg-[#080808]/95 backdrop-blur-xl flex flex-col items-center justify-center'
          >
            <nav className='flex flex-col items-center gap-10'>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  custom={i}
                  variants={mobileLinkVariants}
                  initial='hidden'
                  animate='visible'
                  exit='exit'
                >
                  <NavLink
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `text-5xl tracking-[0.15em] transition-colors duration-300 ${
                        isActive ? 'text-[#C8A97E]' : 'text-white/80 hover:text-white'
                      }`
                    }
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {link.name}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar