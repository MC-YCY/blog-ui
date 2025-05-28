import { ReactNode, useEffect, useRef, useState } from 'react'
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { SpanButton } from '@/components/ui/button'
import { Diary } from '@/components/project/diary/diary'
import dayjs from 'dayjs'
import { IconSunFilled } from '@tabler/icons-react'

export const Accountability = () => {
  return <div className={'text-left text-[12px] w-full min-w-full'}>
    <div className={'font-bold'}>免责声明</div>
    <div className={'mt-1 text-[#333]'}>
      <div>网站本人独自开发的，为便于与用户交流的留言平台。请不要利用此平台服务制作、上传、下载、复制、发布、传播或者转载如下内容：</div>
      <div>1、反对宪法所确定的基本原则的；</div>
      <div>2、危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家 统一的；</div>
      <div>3、损害国家荣誉和利益的；</div>
      <div>4、煽动民族仇恨、民族歧视，破坏民族团结的；</div>
      <div>5、破坏国家宗教政策，宣扬邪教和封建迷信的；</div>
      <div>6、散布谣言，扰乱社会秩序，破坏社会稳定的；</div>
      <div>7、散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；</div>
      <div>8、侮辱或者诽谤他人，侵害他人合法权益的；</div>
      <div>9、含有法律、行政法规禁止的其他内容的信息。</div>
    </div>
  </div>
}

export const DiaryWriteButton = ({ date, username, onSubmit, children, onOpenChange }: {
  date: Date | string,
  username?: string | ReactNode,
  onSubmit?: (arg0: string, fn: (arg0: boolean) => void) => void,
  children?: ReactNode,
  onOpenChange?: (arg0: boolean) => void,
}) => {
  const [value, setValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // 自动调整高度
  useEffect(() => {
    if (textareaRef.current) {
      // 先重置高度，再计算新的高度
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [value])
  const onClickSubmit = () => {
    if (onSubmit) {
      onSubmit(value, setOpen)
    } else {
      setOpen(false)
    }
  }
  const [open, setOpen] = useState(false)
  const clickButton = () => {
    setValue('')
    setOpen(true)
  }
  const openChange = () => {
    if (onOpenChange) {
      onOpenChange(open)
    }
  }
  return <>
    <Drawer open={open} onClose={() => setOpen(false)} onOpenChange={openChange}>
      <DrawerTrigger>
        <SpanButton onClick={() => clickButton()}>{children ?? '写点什么...'}</SpanButton>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Hi，开始你的记录吧。</DrawerTitle>
          <div className={'mt-6'}>
            <Diary
              className1={'min-h-[300px]'}
              className2={'min-h-[300px]'}
              className3={'min-h-[300px]'}
              title={username ?? '春秋半夏'}
              date={dayjs(date).format('YYYY年MM月DD日')}
              weather={<IconSunFilled width={24} height={24} color={'#ecca2f'} />}
              content={<textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                rows={1}
                className={'resize-none w-full outline-none'}
                placeholder={'写点什么呢...'}
              />}></Diary>
          </div>
        </DrawerHeader>
        <DrawerFooter>
          <div className={'flex justify-center'}>
            <SpanButton onClick={onClickSubmit}>确定</SpanButton>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  </>
}