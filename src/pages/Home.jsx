import Hero from '../components/sections/home/Hero'
import FeaturedWork from '../components/sections/home/FeaturedWork'

const Home = () => {
  return (
    <main className='w-screen overflow-x-hidden bg-background text-primary'>
      <Hero />
      <div className='w-full py-12 sm:py-16 md:py-20 lg:py-28'>
        <FeaturedWork />
      </div>
    </main>
  )
}

export default Home
