import MDEditor from '@uiw/react-md-editor'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import useThemeStore from '@/stores/themeStore.ts'
import { ArticleItem } from '@/types/article'

export const EditorMarkdown = forwardRef((props: { defaultInfo?: ArticleItem }, ref) => {
  const { theme } = useThemeStore()
  const [value, setValue] = useState<string | undefined>('**Hello world!!!**')
  useEffect(() => {
    document.documentElement.classList.add('xt-root')
    return () => {
      document.documentElement.classList.remove('xt-root')
      document.documentElement.style.height='auto'
    }
  }, [])
  useEffect(() => {
    if (props && props.defaultInfo?.content) {
      setValue(props.defaultInfo.content)
    }
  }, [props.defaultInfo])
  interface refMethods {
    getValue: () => string | undefined
  }

  useImperativeHandle(ref, (): refMethods => {
    return {
      getValue() {
        return value
      },
    }
  })
  return <div className={'h-full'}>
    <MDEditor height='100%' data-color-mode={theme as 'light' | 'dark'} value={value} onChange={setValue} />
  </div>
})