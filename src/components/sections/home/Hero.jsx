import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import heroImage from '../../../assets/img/hero-image.jpg'

const studioName = 'KAZUORI'

const letterVariants = {
  hidden: { y: '100%', opacity: 0 },
  visible: (index) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.16 + index * 0.08,
      duration: 0.76,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: (delay) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
}

const Hero = () => {
  const canvasRef = useRef(null)
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const smoothX = useSpring(cursorX, { stiffness: 260, damping: 32, mass: 0.12 })
  const smoothY = useSpring(cursorY, { stiffness: 260, damping: 32, mass: 0.12 })
  const parallaxX = useTransform(smoothX, [-0.5, 0.5], [-14, 14])
  const parallaxY = useTransform(smoothY, [-0.5, 0.5], [-8, 8])
  const glowX = useTransform(smoothX, [-0.5, 0.5], ['18%', '82%'])
  const glowY = useTransform(smoothY, [-0.5, 0.5], ['18%', '72%'])
  const spotlightBackground = useTransform(
    [glowX, glowY],
    ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(200,169,126,0.18), transparent 18%)`,
  )
  const year = new Date().getFullYear()

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    const petals = []
    let animationFrame
    let width = 0
    let height = 0
    let dpr = 1

    const createPetal = (resetAtTop = false) => {
      const size = 5 + Math.random() * 11
      const depth = 0.45 + Math.random() * 0.9

      return {
        x: Math.random() * width,
        y: resetAtTop ? -size * (1 + Math.random() * 8) : Math.random() * height,
        size,
        depth,
        speed: (0.28 + Math.random() * 0.72) * depth,
        drift: -0.35 + Math.random() * 0.7,
        sway: 0.45 + Math.random() * 1.25,
        swayOffset: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI,
        rotationSpeed: -0.01 + Math.random() * 0.02,
        opacity: 0.34 + Math.random() * 0.45,
      }
    }

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)

      const petalCount = Math.max(40, Math.floor((width * height) / 18000))
      petals.length = 0

      for (let index = 0; index < petalCount; index += 1) {
        petals.push(createPetal(false))
      }
    }

    const drawPetal = (petal) => {
      const progress = Math.min(Math.max(petal.y / height, 0), 1)
      const fade = Math.sin(progress * Math.PI)
      const opacity = petal.opacity * petal.depth * Math.max(fade, 0.16)

      context.save()
      context.translate(petal.x, petal.y)
      context.rotate(petal.rotation)
      context.globalAlpha = opacity

      const gradient = context.createRadialGradient(0, 0, 0, 0, 0, petal.size)
      gradient.addColorStop(0, 'rgba(255, 245, 248, 0.98)')
      gradient.addColorStop(0.55, 'rgba(248, 202, 214, 0.78)')
      gradient.addColorStop(1, 'rgba(248, 202, 214, 0)')

      context.fillStyle = gradient
      context.beginPath()
      context.ellipse(0, 0, petal.size * petal.depth * 0.42, petal.size * petal.depth, 0.35, 0, Math.PI * 2)
      context.fill()
      context.restore()
    }

    const animate = () => {
      context.clearRect(0, 0, width, height)

      petals.forEach((petal) => {
        petal.y += petal.speed
        petal.x += petal.drift + Math.sin(petal.y * 0.012 + petal.swayOffset) * petal.sway * 0.08
        petal.rotation += petal.rotationSpeed

        if (petal.y > height + petal.size * 4 || petal.x < -40 || petal.x > width + 40) {
          Object.assign(petal, createPetal(true))
        }

        drawPetal(petal)
      })

      animationFrame = window.requestAnimationFrame(animate)
    }

    resizeCanvas()
    animate()

    window.addEventListener('resize', resizeCanvas)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  const handlePointerMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    cursorX.set((event.clientX - bounds.left) / bounds.width - 0.5)
    cursorY.set((event.clientY - bounds.top) / bounds.height - 0.5)
  }

  return (
    <section
      className='group relative flex h-screen overflow-hidden bg-[#080808] text-[#F0EDE6]'
      onPointerMove={handlePointerMove}
    >
      <motion.div
        className='absolute inset-[-3%] z-0'
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.35, ease: [0.16, 1, 0.3, 1] }}
        style={{ x: parallaxX, y: parallaxY }}
        aria-hidden='true'
      >
        <img
          src={heroImage}
          alt=''
          className='h-full w-full object-cover object-[50%_50%] transition-transform duration-[1600ms] ease-out group-hover:scale-[1.035] sm:object-[50%_48%] lg:object-[50%_46%]'
        />
      </motion.div>

      <motion.div
        className='pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100'
        style={{ background: spotlightBackground }}
        aria-hidden='true'
      />

      <canvas
        ref={canvasRef}
        className='absolute inset-0 z-20 h-full w-full'
        aria-hidden='true'
      />

      <div className='absolute inset-0 z-20 bg-[radial-gradient(circle_at_50%_42%,rgba(200,169,126,0.08),transparent_28%),linear-gradient(90deg,rgba(8,8,8,0.86),rgba(8,8,8,0.28)_44%,rgba(8,8,8,0.72)),linear-gradient(180deg,rgba(8,8,8,0.2),rgba(8,8,8,0.5)_48%,rgba(8,8,8,0.95))]' />
      <div className='absolute inset-x-0 top-0 z-20 h-36 bg-gradient-to-b from-[#080808] to-transparent' />
      <div className='absolute inset-x-0 bottom-0 z-20 h-44 bg-gradient-to-t from-[#080808] to-transparent' />

      <div className='relative z-30 flex w-full flex-col items-center justify-center px-5 text-center'>
        <h1
          className='flex max-w-full justify-center overflow-hidden text-[3.45rem] leading-[0.8] tracking-[0.12em] text-[#F0EDE6] mix-blend-screen drop-shadow-[0_0_34px_rgba(240,237,230,0.18)] sm:text-[6.5rem] sm:tracking-[0.16em] md:text-[9rem] lg:text-[12rem] xl:text-[15rem]'
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          aria-label={studioName}
        >
          {studioName.split('').map((letter, index) => (
            <span key={`${letter}-${index}`} className='inline-block overflow-hidden'>
              <motion.span
                custom={index}
                variants={letterVariants}
                initial='hidden'
                animate='visible'
                className='inline-block'
              >
                {letter}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          custom={0.95}
          variants={fadeUp}
          initial='hidden'
          animate='visible'
          className='mt-6 text-xs font-light tracking-[0.24em] text-white/68 sm:text-sm'
        >
          Where silence becomes motion.
        </motion.p>

        <motion.p
          custom={1.2}
          variants={fadeUp}
          initial='hidden'
          animate='visible'
          className='mt-4 text-[0.68rem] tracking-[0.28em] text-[#C8A97E] sm:text-xs'
          style={{ fontFamily: "'Noto Serif JP', serif" }}
        >
          &#12459;&#12474;&#12458;&#12522;
        </motion.p>
      </div>

      <motion.div
        custom={1.45}
        variants={fadeUp}
        initial='hidden'
        animate='visible'
        className='absolute bottom-8 left-5 z-30 flex items-end gap-3 text-[0.62rem] uppercase tracking-[0.24em] text-white/45 sm:left-8 md:left-12'
      >
        <div className='relative h-16 w-px overflow-hidden bg-white/16'>
          <motion.span
            className='absolute left-0 top-0 block h-6 w-px bg-[#C8A97E]'
            animate={{ y: [-24, 64] }}
            transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <span className='pb-1'>Scroll</span>
      </motion.div>

      <motion.div
        custom={1.45}
        variants={fadeUp}
        initial='hidden'
        animate='visible'
        className='absolute bottom-8 right-5 z-30 text-right text-[0.62rem] uppercase leading-5 tracking-[0.2em] text-white/45 sm:right-8 md:right-12'
      >
        <p>{year}</p>
        <p>Tokyo, Japan</p>
      </motion.div>
    </section>
  )
}

export default Hero
