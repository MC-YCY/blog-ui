import { Button } from '@/components/ui/button.tsx'

export default function(){
  return <div className={'w-screen h-[calc(100vh-100px)]'}>
    <header>
      <Button>我的图片资源</Button>
      <Button>上传图片资源</Button>
    </header>
  </div>
}