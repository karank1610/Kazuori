import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { name: 'Work', path: '/work' },
  { name: 'About', path: '/about' },
  { name: 'Careers', path: '/careers' },
  { name: 'Contact', path: '/contact' },
]

const navColorWash = [
  'radial-gradient(circle at 8% 50%, rgba(200,169,126,0.22), transparent 28%), radial-gradient(circle at 92% 50%, rgba(77,122,150,0.20), transparent 28%), linear-gradient(90deg, rgba(8,8,8,0.88), rgba(14,18,18,0.78), rgba(8,8,8,0.88))',
  'radial-gradient(circle at 24% 45%, rgba(176,88,72,0.18), transparent 30%), radial-gradient(circle at 78% 52%, rgba(200,169,126,0.24), transparent 30%), linear-gradient(90deg, rgba(8,8,8,0.9), rgba(13,17,18,0.78), rgba(8,8,8,0.9))',
  'radial-gradient(circle at 12% 52%, rgba(77,122,150,0.18), transparent 28%), radial-gradient(circle at 88% 44%, rgba(200,169,126,0.22), transparent 30%), linear-gradient(90deg, rgba(8,8,8,0.88), rgba(16,14,13,0.8), rgba(8,8,8,0.88))',
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [initialLoad, setInitialLoad] = useState(true)
  const [hoveredPath, setHoveredPath] = useState(null)
  const lastScrollY = useRef(0)
  const location = useLocation()
  const navRefs = useRef({})
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 })

  // Update indicator position when route changes or on mount
  useEffect(() => {
    const activeLink = navLinks.find(link => link.path === location.pathname)
    if (activeLink && navRefs.current[activeLink.path]) {
      const el = navRefs.current[activeLink.path]
      const rect = el.getBoundingClientRect()
      const parentRect = el.parentElement.getBoundingClientRect()
      setIndicatorStyle({
        left: rect.left - parentRect.left,
        width: rect.width,
        opacity: 1,
      })
    } else {
      setIndicatorStyle(prev => ({ ...prev, opacity: 0 }))
    }
  }, [location.pathname])

  // Scroll hide/show logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      lastScrollY.current = currentScrollY
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

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 768px)')
    const handleBreakpointChange = (event) => {
      if (event.matches) {
        setIsOpen(false)
      }
    }

    desktopQuery.addEventListener('change', handleBreakpointChange)
    return () => desktopQuery.removeEventListener('change', handleBreakpointChange)
  }, [])

  const handleMouseEnter = (path) => {
    setHoveredPath(path)
    if (navRefs.current[path]) {
      const el = navRefs.current[path]
      const rect = el.getBoundingClientRect()
      const parentRect = el.parentElement.getBoundingClientRect()
      setIndicatorStyle({
        left: rect.left - parentRect.left,
        width: rect.width,
        opacity: 1,
      })
    }
  }

  const handleMouseLeave = () => {
    setHoveredPath(null)
    const activeLink = navLinks.find(link => link.path === location.pathname)
    if (activeLink && navRefs.current[activeLink.path]) {
      const el = navRefs.current[activeLink.path]
      const rect = el.getBoundingClientRect()
      const parentRect = el.parentElement.getBoundingClientRect()
      setIndicatorStyle({
        left: rect.left - parentRect.left,
        width: rect.width,
        opacity: 1,
      })
    } else {
      setIndicatorStyle(prev => ({ ...prev, opacity: 0 }))
    }
  }

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
        <div className='relative overflow-hidden'>
          {/* Frosted glass background */}
          <motion.div
            className='absolute inset-0 backdrop-blur-md'
            animate={{ background: navColorWash }}
            transition={{ duration: 14, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
          />

          <motion.div
            className='absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent'
            initial={{ x: '-45%', opacity: 0 }}
            animate={{ x: '245%', opacity: [0, 0.28, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Bottom border */}
          <div className='absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C8A97E]/45 to-transparent' />

          <div
            className='relative flex h-14 w-full items-center justify-between md:h-[72px]'
            style={{ paddingInline: 'clamp(24px, 5vw, 112px)' }}
          >
            {/* Logo */}
            <Link
              to='/'
              className='group flex min-w-0 flex-col items-start justify-center leading-none select-none'
              aria-label='Kazuori home'
              onClick={() => setIsOpen(false)}
            >
              <motion.span
                className='text-[26px] tracking-[0.14em] text-primary leading-none drop-shadow-[0_0_18px_rgba(200,169,126,0.22)] sm:text-[28px] md:text-[34px] md:tracking-[0.15em]'
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                whileHover={{ rotateX: 8, rotateY: -10, z: 12 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                KAZUORI
              </motion.span>
              <span
                className='mt-0.5 text-[9px] leading-none tracking-[0.08em] text-[#C8A97E] sm:text-[10px] md:text-[11px]'
                style={{ fontFamily: "'Noto Serif JP', serif" }}
              >
                &#24433;&#12434;&#21205;&#12363;&#12377;&#32773;
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div 
              className='hidden items-center gap-6 md:flex xl:gap-8 relative'
              onMouseLeave={handleMouseLeave}
            >
              {/* Active/Hover indicator - positioned absolutely within the nav container */}
              <motion.div
                className='absolute -bottom-1 h-[2px] bg-gradient-to-r from-[#C8A97E] via-[#F0EDE6] to-[#4D7A96] shadow-[0_0_16px_rgba(200,169,126,0.55)] pointer-events-none'
                animate={{
                  left: indicatorStyle.left,
                  width: indicatorStyle.width,
                  opacity: indicatorStyle.opacity,
                }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              />

              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  ref={(el) => { navRefs.current[link.path] = el }}
                  onMouseEnter={() => handleMouseEnter(link.path)}
                  className={({ isActive }) =>
                    `relative flex h-10 items-center text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${
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
                    </motion.span>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Mobile Hamburger */}
            <button
              className='z-50 flex h-10 w-10 flex-col items-end justify-center gap-[5px] md:hidden'
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
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
            className='fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#080808]/95 px-6 py-20 backdrop-blur-xl md:hidden'
          >
            <nav className='flex w-full max-w-sm flex-col items-center gap-7 sm:gap-9'>
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
                      `block text-center text-[clamp(2.75rem,14vw,4.5rem)] leading-none tracking-[0.12em] transition-colors duration-300 ${
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