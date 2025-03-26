import { EditorMarkdown } from './components/editor-markdown.tsx'
import Header from './components/header'
import { useRef } from 'react'
import { createUserArticle } from '@/api/article.api.ts'
import useUserStore from '@/stores/userStore.ts'
import { toast as Toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

export default function() {
  const mdEditorRef = useRef<{ getValue: () => string | undefined }>(null)
  const { user } = useUserStore()
  const navigate = useNavigate()
  const onSubmit = (formState: Record<string, any>) => {
    if (!formState?.title) {
      Toast('Tip', {
        description: '请输入标题后在提交',
        position: 'bottom-left',
        duration: 1000,
      })
      return
    }
    if (mdEditorRef.current) {
      if (!user) return
      createUserArticle(user.id, {
        title: formState.title,
        content: mdEditorRef.current.getValue() || '',
        tags: formState.tags,
        readme: formState.readme,
        banner: formState.banner,
      }).then(() => {
        navigate('/posts')
      })
    }
  }
  return <div className={'w-screen h-screen'}>
    <Header submit={onSubmit}></Header>
    <div className={'h-[calc(100vh-72px)]'}>
      <EditorMarkdown ref={mdEditorRef}></EditorMarkdown>
    </div>
  </div>
}