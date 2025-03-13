import Hero from './components/hero/index.tsx'
import { LinkPreviewDemo } from '@/views/home/components/link-preview/link-preview.tsx'
import TextWords from '@/views/home/components/text-words'

const Home = () => {
  return (
    <>
      <Hero>
        <div>
          <LinkPreviewDemo></LinkPreviewDemo>
          <TextWords></TextWords>
        </div>
      </Hero>
    </>
  )
}
export default Home