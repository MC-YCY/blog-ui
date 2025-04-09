import Hero from './components/hero/index.tsx'
import TextWords from '@/views/home/components/text-words'
import ProjectReadme from './components/project-readme/index.tsx'

const Home = () => {
  return (
    <>
      <Hero>
        <div>
          <ProjectReadme></ProjectReadme>
          <TextWords></TextWords>
        </div>
      </Hero>
    </>
  )
}
export default Home