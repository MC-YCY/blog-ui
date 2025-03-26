import MDEditor from '@uiw/react-md-editor'
import { forwardRef, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react'
import useThemeStore from '@/stores/themeStore.ts'

export const EditorMarkdown = forwardRef((_props, ref) => {
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