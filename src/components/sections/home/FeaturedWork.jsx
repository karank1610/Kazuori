import { useRef, useCallback, useMemo, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { projects } from '../../../data/projects';
import workImage1 from '../../../assets/img/work-image-1.jpg';
import workImage2 from '../../../assets/img/work-image-2.jpg';

const workImages = [workImage1, workImage2];

const cardVariants = {
  hidden: (isEven) => ({ opacity: 0, y: 60, x: isEven ? -40 : 40 }),
  visible: {
    opacity: 1, y: 0, x: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

const textChildVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: 0.2 + i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  })
};

// Divider component to place between Hero and Work
export const SectionDivider = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  return (
    <div 
      ref={ref}
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#080808',
        paddingTop: '60px',
        paddingBottom: '60px',
        overflow: 'hidden',
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px',
        maxWidth: '1400px',
        margin: '0 auto',
        paddingLeft: 'clamp(24px, 6vw, 80px)',
        paddingRight: 'clamp(24px, 6vw, 80px)',
      }}>
        {/* Left line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: '1px',
            flex: 1,
            background: 'linear-gradient(to right, transparent, rgba(200, 169, 126, 0.5))',
            transformOrigin: 'right',
          }}
        />
        
        {/* Center diamond */}
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: 45 }}
          animate={isInView ? { opacity: 1, scale: 1, rotate: 45 } : { opacity: 0, scale: 0, rotate: 45 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: '8px',
            height: '8px',
            backgroundColor: '#C8A97E',
            flexShrink: 0,
          }}
        />
        
        {/* Right line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: '1px',
            flex: 1,
            background: 'linear-gradient(to left, transparent, rgba(200, 169, 126, 0.5))',
            transformOrigin: 'left',
          }}
        />
      </div>
      
      {/* Subtle label */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        style={{
          textAlign: 'center',
          marginTop: '20px',
          fontSize: '0.6rem',
          textTransform: 'uppercase',
          letterSpacing: '0.4em',
          color: 'rgba(200, 169, 126, 0.4)',
        }}
      >
        Portfolio
      </motion.p>
    </div>
  );
};

const ProjectCard = memo(({ project, index }) => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const isEven = index % 2 === 0;
  const projectImage = workImages[index % workImages.length] || workImage1;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  const handleNavigate = useCallback(() => {
    if (project.slug) navigate(`/work/${project.slug}`);
  }, [navigate, project.slug]);

  return (
    <motion.div
      ref={ref}
      custom={isEven}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      style={{
        width: '100%',
        cursor: 'pointer',
        overflow: 'hidden',
        backgroundColor: '#0A0A0A',
        borderTop: index !== 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
      }}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: '520px',
        maxHeight: '640px',
      }}>
        {/* Image Side */}
        <motion.div
          style={{
            position: 'relative',
            overflow: 'hidden',
            order: isEven ? 2 : 1,
            minHeight: '100%',
          }}
        >
          <motion.img
            src={projectImage}
            alt={project.title}
            loading="lazy"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '120%',
              objectFit: 'cover',
              y: imageY,
              scale: imageScale,
              filter: 'grayscale(100%) contrast(1.1) brightness(0.7)',
            }}
            onError={(e) => { e.currentTarget.src = workImage1; }}
          />
          {/* Gold tint overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(200, 169, 126, 0.15) 0%, rgba(10, 10, 10, 0.6) 100%)',
            mixBlendMode: 'overlay',
          }} />
          {/* Dark vignette */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: isEven 
              ? 'linear-gradient(to left, rgba(10,10,10,0.5) 0%, transparent 50%)' 
              : 'linear-gradient(to right, rgba(10,10,10,0.5) 0%, transparent 50%)',
          }} />
          {/* Warm gold edge glow */}
          <div style={{
            position: 'absolute',
            inset: 0,
            boxShadow: 'inset 0 0 80px rgba(200, 169, 126, 0.08)',
          }} />
          
          {/* Project Number - Top Right */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              top: '32px',
              right: '32px',
              zIndex: 5,
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <span style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              color: 'rgba(200, 169, 126, 0.6)',
              textTransform: 'uppercase',
            }}>
              Project
            </span>
            <span style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '2rem',
              lineHeight: 1,
              color: '#C8A97E',
            }}>
              {String(index + 1).padStart(2, '0')}
            </span>
          </motion.div>

          {/* Project Title - Bottom Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              bottom: '32px',
              left: '32px',
              zIndex: 5,
              maxWidth: '70%',
            }}
          >
            <span style={{
              display: 'block',
              fontSize: '0.65rem',
              textTransform: 'uppercase',
              letterSpacing: '0.3em',
              color: 'rgba(200, 169, 126, 0.7)',
              marginBottom: '8px',
            }}>
              {project.type}
            </span>
            <h3 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
              lineHeight: 0.95,
              letterSpacing: '0.02em',
              color: '#F0EDE6',
            }}>
              {project.title}
            </h3>
          </motion.div>

          {/* Decorative corner lines */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              bottom: '32px',
              right: '32px',
              width: '40px',
              height: '1px',
              backgroundColor: 'rgba(200, 169, 126, 0.4)',
              transformOrigin: 'right',
            }}
          />
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ delay: 0.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              bottom: '32px',
              right: '32px',
              width: '1px',
              height: '40px',
              backgroundColor: 'rgba(200, 169, 126, 0.4)',
              transformOrigin: 'bottom',
            }}
          />
        </motion.div>

        {/* Text Side */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: 'clamp(32px, 5vw, 80px)',
          order: isEven ? 1 : 2,
          backgroundColor: '#0A0A0A',
        }}>
          <div style={{ width: '100%', maxWidth: '480px' }}>
            <motion.span
              custom={0}
              variants={textChildVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              style={{
                display: 'block',
                marginBottom: '20px',
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: '0.35em',
                color: '#C8A97E',
              }}
            >
              {project.type}
            </motion.span>

            <motion.h2
              custom={1}
              variants={textChildVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                lineHeight: 0.9,
                letterSpacing: '0.02em',
                color: '#F0EDE6',
              }}
            >
              {project.title}
            </motion.h2>

            <motion.span
              custom={2}
              variants={textChildVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              style={{
                display: 'block',
                marginTop: '16px',
                fontSize: '0.75rem',
                fontWeight: 400,
                letterSpacing: '0.15em',
                color: 'rgba(255,255,255,0.35)',
              }}
            >
              {project.year}
            </motion.span>

            <motion.p
              custom={3}
              variants={textChildVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              style={{
                marginTop: '24px',
                fontSize: '0.9rem',
                fontWeight: 300,
                lineHeight: 1.7,
                letterSpacing: '0.02em',
                color: 'rgba(255,255,255,0.55)',
              }}
            >
              {project.description}
            </motion.p>

            <motion.div
              custom={4}
              variants={textChildVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              style={{ marginTop: '40px', display: 'inline-flex', alignItems: 'center', gap: '16px' }}
            >
              <span style={{
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: '0.3em',
                color: '#C8A97E',
              }}>
                View Project
              </span>
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: 40 } : { width: 0 }}
                transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{ height: '1px', backgroundColor: '#C8A97E' }}
              />
              <motion.svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C8A97E"
                strokeWidth="2"
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </motion.svg>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

const FeaturedWork = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-50px' });
  const featuredList = useMemo(() => projects.slice(0, 2), []);

  return (
    <section style={{
      position: 'relative',
      width: '100%',
      backgroundColor: '#080808',
      overflow: 'hidden',
    }}>
      {/* Full-width sticky/fixed feel header */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        paddingTop: '120px',
        paddingBottom: '80px',
        paddingLeft: 'clamp(24px, 6vw, 80px)',
        paddingRight: 'clamp(24px, 6vw, 80px)',
        maxWidth: '1400px',
        margin: '0 auto',
      }}>
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
            <div>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={isHeaderInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                style={{
                  display: 'block',
                  fontSize: '0.7rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.35em',
                  color: '#C8A97E',
                  marginBottom: '16px',
                }}
              >
                Selected Work
              </motion.span>
              <h2 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(3.5rem, 8vw, 8rem)',
                lineHeight: 0.85,
                letterSpacing: '0.02em',
                color: '#F0EDE6',
              }}>
                Our Work
              </h2>
            </div>
            
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isHeaderInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              style={{ 
                height: '1px', 
                backgroundColor: 'rgba(200, 169, 126, 0.3)', 
                flex: 1,
                minWidth: '100px',
                transformOrigin: 'left',
                marginBottom: '20px'
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Full-bleed project cards */}
      <div ref={sectionRef} style={{ display: 'flex', flexDirection: 'column' }}>
        {featuredList.map((project, index) => (
          <ProjectCard key={project.id || index} project={project} index={index} />
        ))}
      </div>

      {/* View All Work */}
      <div style={{ 
        position: 'relative',
        zIndex: 10,
        padding: '100px clamp(24px, 6vw, 80px)',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#080808',
      }}>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/work')}
          style={{
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(200, 169, 126, 0.4)',
            padding: '20px 56px',
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            color: '#C8A97E',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            transition: 'all 0.4s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#C8A97E';
            e.currentTarget.style.color = '#080808';
            e.currentTarget.style.borderColor = '#C8A97E';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#C8A97E';
            e.currentTarget.style.borderColor = 'rgba(200, 169, 126, 0.4)';
          }}
        >
          View All Work
        </motion.button>
      </div>
    </section>
  );
};

export default FeaturedWork;