import { ArticleCard } from '@/components/ui/article-card.tsx'
import { useEffect, useState } from 'react'
import { allArticlesList, ArticleItem } from '@/api/article.api.ts'
import { SmartPagination } from '@/components/ui/pagination-controller.tsx'
import { useNavigate } from 'react-router-dom'
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

export default function() {
  const [list, setList] = useState([])
  const [total, setTotal] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, _setPageSize] = useState<number>(5)
  const [webType, setWebType] = useState<string>(' ')
  const navigate = useNavigate()
  const onChange = (p: number) => {
    setCurrentPage(p)
    getList(p, webType)
  }
  const getList = (page: number, tag: string) => {
    let params = {
      page: page,
      limit: pageSize,
      title: '',
      tag: tag.trim(),
    }
    allArticlesList(params).then(res => {
      setList(res.items)
      setTotal(res.total)
    })
  }
  useEffect(() => {
    getList(currentPage, webType)
  }, [])

  const goArticle = (item: { id: number }) => {
    navigate('/article?id=' + item.id)
  }
  const changeSelect = (value: string) => {
    setWebType(value)
    setCurrentPage(1)
    getList(1, value)
  }
  return <div>
    <div className={'fixed bottom-10 flex justify-center w-full left-0 z-999'}>
      <SmartPagination
        current={currentPage}
        total={total}
        pageSize={pageSize}
        onChange={onChange}
      />
    </div>
    <div className={'flex justify-end'}>
      <Select value={webType} defaultValue="All" onValueChange={(value) => changeSelect(value)}>
        <SelectTrigger className="w-[180px] bg-background text-foreground">
          <SelectValue placeholder="技术类型" />
        </SelectTrigger>
        <SelectContent className="z-[1000000] bg-popover text-popover-foreground">
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
    {
      list.map((item: ArticleItem) => {
        return <ArticleCard
          key={item.id}
          title={item.title}
          excerpt={item.readme}
          date={item.createdAt}
          tags={item.tags}
          imageUrl={item.banner}
          className="mb-6 mt-[30px]"
          readTime={'1分钟'}
          views={'1k'}
          onClick={() => {
            goArticle(item)
          }}
          status={''}
        />
      })
    }
    <div className={'h-20'}></div>
  </div>
}