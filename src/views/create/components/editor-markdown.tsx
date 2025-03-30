import MDEditor from '@uiw/react-md-editor'
import { forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react'
import useThemeStore from '@/stores/themeStore.ts'
import { ArticleItem } from '@/api/article.api.ts'

export const EditorMarkdown = forwardRef((props: { defaultInfo?: ArticleItem }, ref) => {
  const { theme } = useThemeStore()
  const [value, setValue] = useState<string | undefined>('**Hello world!!!**')
  const editorContainer = useRef<HTMLDivElement>(null)
  const [editorHeight, setEditorHeight] = useState<number>(300)
  useLayoutEffect(() => {
    setEditorHeight(editorContainer.current && editorContainer.current.clientHeight || 300)
    window.onresize = () => {
      setEditorHeight(editorContainer.current && editorContainer.current.clientHeight || 300)
    }
    return () => {
      window.onresize = () => {
      }
    }
  }, [])
  useEffect(() => {
    if (props && props.defaultInfo?.content) {
      setValue(props.defaultInfo.content)
    }
  }, [props])
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
  return <div className={'h-full'} ref={editorContainer}>
    <MDEditor height={editorHeight} data-color-mode={theme as 'light' | 'dark'} value={value} onChange={setValue} />
  </div>
})