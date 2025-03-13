import Hero from './components/hero/index.tsx'
import TextWords from '@/views/home/components/text-words'

const Home = () => {
  return (
    <>
      <Hero>
        <div>
          <TextWords></TextWords>
        </div>
      </Hero>
    </>
  )
}
export default Home