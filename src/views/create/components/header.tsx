import { Input } from '@/components/ui/input.tsx'
import { Button } from '@/components/ui/button.tsx'
import ImageAssetsButton from './image-assets-modal.tsx';
import ThemeButton from '@/views/layout/components/header/components/theme-button.tsx'

export default function(){
  return <div className={'py-4 flex px-4'}>
    <Input
      className="focus-visible:ring-0 focus-visible:ring-transparent shadow-none! focus-visible:border-transparent border-none outline-none font-bold text-lg! pl-0"
      placeholder={'请输入文章标题...'} maxLength={45}
    />
    <ThemeButton></ThemeButton>
    <ImageAssetsButton></ImageAssetsButton>
    <Button>发布</Button>
  </div>
}