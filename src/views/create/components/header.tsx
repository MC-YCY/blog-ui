import { Input } from '@/components/ui/input.tsx'
import ImageAssetsButton from './image-assets-modal.tsx'
import ThemeButton from '@/views/layout/components/header/components/theme-button.tsx'
import SubmitButton from './submit-button.tsx'
import React, { useState } from 'react'

export default function({ submit }: { submit: (formState: Record<string, any>) => void }) {
  const [title,setTitle] = useState('');
  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }
  const onSubmit = (formState: Record<string, any>) => {
    submit({
      ...formState,
      title: title,
    })
  }
  return <div className={'py-4 flex px-4'}>
    <Input
      className="focus-visible:ring-0 focus-visible:ring-transparent shadow-none! focus-visible:border-transparent border-none outline-none font-bold text-lg! pl-0"
      placeholder={'请输入文章标题...'} onInput={onInput} maxLength={45}
    />
    <ThemeButton></ThemeButton>
    <ImageAssetsButton></ImageAssetsButton>
    <SubmitButton submit={onSubmit}></SubmitButton>
  </div>
}