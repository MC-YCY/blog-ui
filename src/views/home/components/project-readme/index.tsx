import Container from '@/components/container.tsx'
import {
  IconBrandReactNative,
  IconBrandVite,
  IconBrandTailwind,
  IconBrandRadixUi,
  IconBrandFramerMotion,
  IconBrandTabler,
  IconBrandNodejs,
  IconBrandMysql,
  IconBrandSocketIo,
  IconBrandTypescript,
  IconBrandRedux,
  IconBrandPnpm
} from '@tabler/icons-react'

export default function() {
  return <>
    <Container className={'pt-10'}>
      <div className={'flex flex-wrap justify-center'}>
        <div className={'w-[30%] mb-20'}>
          <IconBrandReactNative className={'w-16 h-16 mx-auto text-[#087ea4]'}></IconBrandReactNative>
          <div className={'text-center text-xl mt-2'}>React</div>
        </div>
        <div className={'w-[30%] mb-20'}>
          <IconBrandVite className={'w-16 h-16 mx-auto text-[#bd34fe]'}></IconBrandVite>
          <div className={'text-center text-xl mt-2'}>Vite</div>
        </div>
        <div className={'w-[30%] mb-20'}>
          <IconBrandTailwind className={'w-16 h-16 mx-auto text-[#00bcff]'}></IconBrandTailwind>
          <div className={'text-center text-xl mt-2'}>Tailwind</div>
        </div>

        <div className={'w-[30%] mb-20'}>
          <IconBrandRadixUi className={'w-16 h-16 mx-auto text-[#1c2024]'}></IconBrandRadixUi>
          <div className={'text-center text-xl mt-2'}>RadixUi</div>
        </div>
        <div className={'w-[30%] mb-20'}>
          <IconBrandFramerMotion className={'w-16 h-16 mx-auto text-[#f0e511]'}></IconBrandFramerMotion>
          <div className={'text-center text-xl mt-2'}>Motion</div>
        </div>
        <div className={'w-[30%] mb-20'}>
          <IconBrandTabler className={'w-16 h-16 mx-auto text-[#066fd1]'}></IconBrandTabler>
          <div className={'text-center text-xl mt-2'}>Tabler/icons-react</div>
        </div>

        <div className={'w-[30%] mb-20'}>
          <IconBrandNodejs className={'w-16 h-16 mx-auto text-[#417e38]'}></IconBrandNodejs>
          <div className={'text-center text-xl mt-2'}>NodeJs</div>
        </div>
        <div className={'w-[30%] mb-20'}>
          <IconBrandMysql className={'w-16 h-16 mx-auto text-[#00758f]'}></IconBrandMysql>
          <div className={'text-center text-xl mt-2'}>MySql</div>
        </div>
        <div className={'w-[30%] mb-20'}>
          <IconBrandSocketIo className={'w-16 h-16 mx-auto text-[#25c2a0]'}></IconBrandSocketIo>
          <div className={'text-center text-xl mt-2'}>SocketIo</div>
        </div>

        <div className={'w-[30%] mb-20'}>
          <IconBrandTypescript className={'w-16 h-16 mx-auto text-[#3178c6]'}></IconBrandTypescript>
          <div className={'text-center text-xl mt-2'}>Typescript</div>
        </div>
        <div className={'w-[30%] mb-20'}>
          <IconBrandRedux className={'w-16 h-16 mx-auto text-[#764abc]'}></IconBrandRedux>
          <div className={'text-center text-xl mt-2'}>Redux</div>
        </div>
        <div className={'w-[30%] mb-20'}>
          <IconBrandPnpm className={'w-16 h-16 mx-auto text-[#f69220]'}></IconBrandPnpm>
          <div className={'text-center text-xl mt-2'}>pnpm</div>
        </div>

      </div>
    </Container>
  </>
}