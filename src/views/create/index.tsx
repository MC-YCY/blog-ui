import { EditorMarkdown } from './components/editor-markdown.tsx'
import Header from './components/header'
import { useRef } from 'react'
import { createUserArticle, updateUserArticle } from '@/api/article.api.ts'
import useUserStore from '@/stores/userStore.ts'
import { toast as Toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { ArticleItem } from '@/types/article.ts'

export default function({ info }: { info?: ArticleItem } = { info: undefined }) {
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
    // 如果存在info表示编辑修改
    if (mdEditorRef.current) {
      if (!user) return
      if (info) {
        updateUserArticle(user.id, {
          title: formState.title,
          content: mdEditorRef.current.getValue() || '',
          tags: formState.tags,
          readme: formState.readme,
          banner: formState.banner,
          articleId: info.id,
        }).then(() => {
          navigate(-1)
        })
      } else {
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
  }
  return <div className={'w-screen h-screen'}>
    <Header defaultInfo={info} submit={onSubmit}></Header>
    <div className={'h-[calc(100vh-72px)] overflow-hidden'}>
      <EditorMarkdown defaultInfo={info} ref={mdEditorRef}></EditorMarkdown>
    </div>
  </div>
}