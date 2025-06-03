'use client'

import { PartTitle } from '@/components/project/part-title/part-title'
import { Article } from '@/components/project/article/article'
import { Container } from '@/components/project/container'
import { useEffect, useState } from 'react'
import { ArticleType } from '@/types/article'
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import { SpanButton } from '@/components/ui/button'
import { allArticlesList } from '@/api/article.api.ts'
import { SmartPagination } from '@/components/ui/pagination-controller.tsx'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx'
import { ArticleTags } from '@/constant/article-tags.ts'
import MDEditor from '@uiw/react-md-editor'
import useThemeStore from '@/stores/themeStore.ts'

const ArticlePage = () => {
  const [articleList, setArticleList] = useState<ArticleType[]>([])
  const [page, setPage] = useState(1)
  const [pageSize] = useState(12)
  const [total, setTotal] = useState(0)
  const [webType, setWebType] = useState<string>(' ')
  const getList = () => {
    allArticlesList({
      page: page,
      limit: pageSize,
      tag: webType.trim(),
      title: '',
    }).then(res => {
      setTotal(res.total)
      setArticleList(res.items)
    })
  }
  useEffect(() => {
    getList()
  }, [page, webType])
  const [previewOpen, setPreviewOpen] = useState(false)
  const [current, setCurrent] = useState<ArticleType>()
  const clickItem = (state: ArticleType) => {
    setCurrent(state)
    setPreviewOpen(true)
  }
  const onChange = (p: number) => {
    setPage(p)
  }
  const changeSelect = (value: string) => {
    setWebType(value)
    setPage(1)
  }
  const { theme } = useThemeStore()
  return <div className={'pt-[64px] min-h-[calc(100vh-64px)]'}>
    <Container>
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
                 description={'天天看各种框架比较，看的是瑟瑟发抖...'} action={
        <div className={'max-w-[100%] lg:max-w-[340px] overflow-x-hidden'}>
          <Select value={webType} defaultValue="All" onValueChange={(value) => changeSelect(value)}>
            <SelectTrigger className="w-[180px] bg-background text-foreground">
              <SelectValue placeholder="技术类型" />
            </SelectTrigger>
            <SelectContent className="z-[10] bg-popover text-popover-foreground">
              <SelectGroup>
                <SelectLabel>options</SelectLabel>
                <SelectItem value={' '}>All</SelectItem>
                {
                  ArticleTags.map((item) => {
                    return <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                  })
                }
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      }></PartTitle>
      <div className={'mt-3 xl:mt-6'}>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px_32px]">
          {
            articleList.map((article, index) => {
              return <div key={'home-article' + index}>
                <Article {...article} onClick={(state) => clickItem(state)}></Article>
              </div>
            })
          }
        </div>
      </div>
      <div className={'flex justify-center w-full mt-10 sticky bottom-10'}>
        <SmartPagination
          current={page}
          total={total}
          pageSize={pageSize}
          onChange={onChange}
        />
      </div>
    </Container>
  </div>
}

export default ArticlePage