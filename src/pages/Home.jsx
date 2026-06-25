import { motion } from 'framer-motion'

const Home = () => {
  return (
    <main className='min-h-screen overflow-hidden bg-background text-primary'>
      <section className='relative flex min-h-screen items-center px-4 pt-24 pb-12 sm:px-6 md:px-8 lg:px-12'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_24%_28%,rgba(200,169,126,0.18),transparent_28%),linear-gradient(135deg,rgba(8,8,8,0.24),rgba(8,8,8,0.92))]' />
        <div className='absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent' />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className='relative w-full max-w-5xl'
        >
          <p
            className='mb-4 text-xs uppercase tracking-[0.28em] text-accent'
            style={{ fontFamily: "'Noto Serif JP', serif" }}
          >
            Animation Studio
          </p>
          <h1
            className='max-w-4xl text-[clamp(4rem,15vw,12rem)] leading-[0.82] tracking-normal'
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            KAZUORI
          </h1>
          <p className='mt-6 max-w-xl text-base leading-7 text-white/68 sm:text-lg'>
            Cinematic stories shaped through motion, atmosphere, and carefully held silence.
          </p>
        </motion.div>
      </section>
    </main>
  )
}

export default Home
