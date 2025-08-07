import { PartTitle } from '@/components/project/part-title/part-title'
import { Container } from '@/components/project/container'
import { Article } from '@/components/project/article/article'
import { useEffect, useState } from 'react'
import { ArticleType } from '@/types/article'
import MDEditor from '@uiw/react-md-editor'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { SpanButton } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { allArticlesList } from '@/api/article.api.ts'
import useThemeStore from '@/stores/themeStore.ts'
import { motion } from 'framer-motion'
import { MotionModuleConfig } from '@/constant/motion-module.config.ts'
import { defaultArticle } from '@/constant/default-article.ts'

export const HomeArticle = () => {
  const navigate = useNavigate()
  const [articleList, setArticleList] = useState<ArticleType[]>([])
  const getList = () => {
    allArticlesList({
      page: 1,
      limit: 6,
      tag: '',
      title: '',
    }).then(res => {
      if (res.items.length <= 0) {
        setArticleList(defaultArticle)
      } else {
        setArticleList(res.items)
      }
    }).catch(() => {
      setArticleList(defaultArticle)
    })
  }
  useEffect(() => {
    getList()
  }, [])
  const onLoad = () => {
    navigate('/article')
  }
  const [previewOpen, setPreviewOpen] = useState(false)
  const [current, setCurrent] = useState<ArticleType>()
  const clickItem = (state: ArticleType) => {
    setCurrent(state)
    setPreviewOpen(true)
  }
  const { theme } = useThemeStore()
  return <Container isTransition={false} className={'xl:pt-[54px] pt-[14px]'}>
    <Drawer open={previewOpen} onClose={() => setPreviewOpen(false)}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle></DrawerTitle>
          {
            current && <Article preview={true} {...current} readme={<>
              <MDEditor className={'md-editor-preview'} data-color-mode={theme as 'light' | 'dark'}
                        value={current.content}
                        preview={'preview'}
                        hideToolbar={true} />
            </>}></Article>
          }
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose>
            <SpanButton onClick={() => setPreviewOpen(false)}>关闭</SpanButton>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
    <PartTitle title={'一些"小作文"'}
               description={'天天看各种框架比较，看的是瑟瑟发抖...'}></PartTitle>
    <div className={'mt-3 xl:mt-6'}>
      <div
        className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[20px_32px]">
        {
          articleList.map((article, index) => {
            return <motion.div
              key={'home-article' + article.id}
              {...MotionModuleConfig.containerVariantsProps(index)}>
              <Article {...article} onClick={(state) => clickItem(state)}></Article>
            </motion.div>
          })
        }
      </div>
    </div>
    <div className={'flex justify-center mt-[20px]'}>
      <div onClick={onLoad}
           className={'cursor-pointer opacity-55 w-[120px] h-[36px] flex justify-center items-center text-foreground border-[1px] border-foreground rounded-[36px] text-[14px]'}>
        查看更多
      </div>
    </div>
  </Container>
}