import dayjs from 'dayjs'
import { cn } from '@/lib/utils.ts'
import React, { useEffect, useRef, useState } from 'react'

interface Comment {
  username: string,
  qq: string | number,
  avatar: string,
  date: Date | string | number,
  content: string,
  id: number | string,
  links?: { qq: string | number, date: Date | string | number }[],
  comments?: Comment[]
}

const CommentIcon = ({ state, onClick }: { state?: boolean, onClick?: () => void }) => {
  return <div className={'w-[16px] h-[16px] relative'} onClick={onClick}>
    <svg
      className={cn('absolute left-0 top-0 w-[16px] h-[16px] cursor-pointer transition', !state ? 'opacity-100' : 'opacity-0')}
      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path className={'fill-[#425aef]'}
            d="M256 32C114.6 32 0 125.1 0 240c0 47.6 19.9 91.2 52.9 126.3C38 405.7 7 439.1 6.5 439.5c-6.6 7-8.4 17.2-4.6 26S14.4 480 24 480c61.5 0 110-25.7 139.1-46.3C192 442.8 223.2 448 256 448c141.4 0 256-93.1 256-208S397.4 32 256 32zm0 368c-26.7 0-53.1-4.1-78.4-12.1l-22.7-7.2-19.5 13.8c-14.3 10.1-33.9 21.4-57.5 29 7.3-12.1 14.4-25.7 19.9-40.2l10.6-28.1-20.6-21.8C69.7 314.1 48 282.2 48 240c0-88.2 93.3-160 208-160s208 71.8 208 160-93.3 160-208 160z"></path>
    </svg>
    <svg
      className={cn('absolute left-0 top-0 w-[16px] h-[16px] cursor-pointer transition', state ? 'opacity-100' : 'opacity-0')}
      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path className={'fill-[#425aef]'}
            d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32z"></path>
    </svg>
  </div>
}

const CommentInput = (comment: Comment) => {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const MAX_LENGTH = 500;
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(comment)
    const newValue = e.target.value;
    setValue(newValue);
    autoResize();
  };

  const autoResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  // 初始自动调整高度
  useEffect(() => {
    autoResize();
  }, []);

  return (
    <div>
      <div className="w-full relative text-[14px]">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleInput}
          className={cn(
            'bg-background shadow-[0_8px_16px_-4px_#2c2d300c] transition-all duration-300 px-[16px] py-[16px] pb-[40px] block w-full outline-none rounded-[10px]',
            'border border-[#e3e8f7] focus:border-[#425aef]',
            'resize-none overflow-hidden min-h-[120px]'
          )}
          maxLength={MAX_LENGTH}
          placeholder="文明发言，友善交流~"
          autoComplete="off"
        />
        <div className="pointer-events-none absolute right-[16px] h-[40px] bottom-0 flex items-center text-[#999] text-xs">
          {value.length}/{MAX_LENGTH}
        </div>
      </div>
    </div>
  );
};

const CommentContent = (comment: Comment) => {
  const [isCommentInput, setIsCommentInput] = useState<boolean>(false)
  const [isInit, setIsInit] = useState<boolean>(true)
  const clickCommentIcon = () => {
    setIsCommentInput(!isCommentInput)
    setIsInit(false)
  }
  return <div
    className={'p-[20px] border-[#e3e8f7] dark:border-[#3d3d3f] border-solid border shadow-[0_0_10px_rgba(0,0,0,0.05)] dark:shadow-[0_0_8px_00000050] rounded-2xl'}>
    <div className={'flex h-[32px] items-center'}>
      <div className={'w-[32px] h-[32px] rounded-[50%] cursor-pointer'}>
        <img src={comment.avatar} className={'w-full h-full object-cover block text-0 rounded-[50%]'} alt="" />
      </div>
      <a className={'ml-[10px] text-[20px] cursor-pointer font-bold'}>{comment.username}</a>
      <span
        className={'ml-[10px] cursor-pointer text-[14px] opacity-75'}>{dayjs(comment.date).format('YYYY/MM/DD')}</span>
      <div className={'ml-auto'}>
        <CommentIcon state={isCommentInput} onClick={clickCommentIcon}></CommentIcon>
      </div>
    </div>
    <div className={'text-[16px] text-foreground mt-[10px] pl-[42px] cursor-default whitespace-pre-line'}>
      {comment.content}
    </div>
    {!isInit && <div className={cn('mt-[16px] pl-[42px] hidden', isCommentInput && 'block')}>
      <CommentInput {...comment}></CommentInput>
    </div>}
  </div>
}

export const AboutComment = () => {
  const comment = {
    username: '测试',
    qq: '2646403766',
    date: '2025-6-18',
    content: '内容内容',
    avatar: 'http://47.93.248.11:3100/assets/user-DAGcPm8j.jpg',
    id: 1,
  }
  return <div className={'mt-[26px]'}>
    <CommentContent {...comment}></CommentContent>
  </div>
}