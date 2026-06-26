import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { projects } from '../../../data/projects'
import workImage1 from '../../../assets/img/work-image-1.jpg'
import workImage2 from '../../../assets/img/work-image-2.jpg'

const featuredProjects = projects.slice(0, 2)

const workImages = [workImage1, workImage2]

const cardSlideLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
}

const cardSlideRight = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
}

const ProjectCard = ({ project, index }) => {
  const navigate = useNavigate()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const isEven = index % 2 === 0
  const slideVariant = isEven ? cardSlideLeft : cardSlideRight

  return (
    <motion.div
      ref={ref}
      variants={slideVariant}
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}
      onClick={() => navigate(`/work/${project.slug}`)}
      className='group relative cursor-pointer overflow-hidden rounded-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_-12px_rgba(200,169,126,0.18)]'
      style={{ backgroundColor: project.color }}
    >
      <div className='flex flex-col md:flex-row md:min-h-[480px] lg:min-h-[560px]'>
        {/* Text Side */}
        <div
          className={`flex w-full items-center md:w-1/2 md:min-h-[480px] lg:min-h-[560px] ${
            isEven ? 'md:order-1' : 'md:order-2'
          }`}
        >
          <div className='w-full' style={{ paddingLeft: '70px', paddingRight: '70px', paddingTop: '80px', paddingBottom: '80px' }}>
            <span className='mb-4 block text-[0.65rem] uppercase tracking-[0.28em] text-[#C8A97E] sm:text-xs'>
              {project.type}
            </span>

            <h2
              className='text-4xl leading-[0.9] tracking-wide text-[#F0EDE6] sm:text-5xl md:text-6xl lg:text-7xl'
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              {project.title}
            </h2>

            <span className='mt-5 block text-[0.7rem] font-light tracking-[0.18em] text-white/40 sm:text-xs'>
              {project.year}
            </span>

            <p className='mt-6 text-[0.82rem] font-light leading-relaxed tracking-wide text-white/60 sm:text-sm'>
              {project.description}
            </p>

            <div className='group/link mt-10 inline-block'>
              <span className='text-[0.65rem] uppercase tracking-[0.28em] text-[#C8A97E] transition-colors duration-300 sm:text-xs'>
                View Project
              </span>
              <div className='mt-2 h-px w-full origin-left scale-x-100 bg-[#C8A97E] transition-transform duration-300 group-hover/link:scale-x-0' />
            </div>
          </div>
        </div>

        {/* Visual Side */}
        <div
          className={`relative flex w-full items-center justify-center overflow-hidden md:w-1/2 ${
            isEven ? 'md:order-2' : 'md:order-1'
          }`}
        >
          <div className='relative h-full w-full min-h-[300px] md:min-h-[480px] lg:min-h-[560px]'>
            <img
              src={workImages[index]}
              alt={project.title}
              className='h-full w-full object-cover scale-100 transition-transform duration-700 group-hover:scale-105'
            />
            <div className='absolute inset-0 bg-black/30' />
            <div className='absolute inset-0 flex items-center justify-center p-6 md:p-10 lg:p-16'>
              <span
                className='select-none text-center text-[3rem] leading-[0.85] tracking-wide text-white/12 sm:text-[4rem] md:text-[5rem] lg:text-[7rem] xl:text-[8rem]'
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {project.title}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const FeaturedWork = () => {
  const sectionRef = useRef(null)
  const isSectionInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section className='w-full bg-[#080808]'>
      <div className='w-full' style={{ paddingLeft: '10px', paddingRight: '10px' }}>
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0 }}
          animate={isSectionInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Section Header */}
          <div style={{ marginBottom: '60px', paddingTop: '50px' }}>
            <span className='block text-[0.65rem] uppercase tracking-[0.28em] text-[#C8A97E] sm:text-xs'>
              SELECTED WORK
            </span>

            <h2
              className='mt-2 text-5xl leading-[0.9] tracking-wide text-[#F0EDE6] sm:text-6xl md:text-7xl lg:text-8xl'
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Our Work
            </h2>

            <div className='mt-5 h-px w-16 bg-[#C8A97E] sm:w-20' />
          </div>

          {/* Project Cards */}
          <div className='space-y-10 md:space-y-14 lg:space-y-20'>
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          {/* View All Work Button */}
          <div className='mt-16 flex justify-center pb-32 md:mt-20 md:pb-40 lg:mt-24 lg:pb-48'>
            <button
              onClick={() => (window.location.href = '/work')}
              className='group relative overflow-hidden border border-[#C8A97E] px-12 py-4 text-[0.65rem] uppercase tracking-[0.28em] text-[#C8A97E] transition-all duration-500 hover:border-[#C8A97E] sm:text-xs'
            >
              <span className='relative z-10 transition-colors duration-500 group-hover:text-[#080808]'>
                View All Work
              </span>
              <span className='absolute inset-0 origin-left scale-x-0 bg-[#C8A97E] transition-transform duration-500 group-hover:scale-x-100' />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedWork