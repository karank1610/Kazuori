import Hero from '../components/sections/home/Hero'
import FeaturedWork, { SectionDivider } from '../components/sections/home/FeaturedWork'

const Home = () => {
  return (
    <main className='w-full overflow-x-hidden bg-background text-primary'>
      <Hero />
      <SectionDivider />
      <FeaturedWork />
    </main>
  )
}

export default Home