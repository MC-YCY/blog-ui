import { ArticleCard } from '@/components/ui/article-card.tsx'
import { useEffect, useState } from 'react'
import { allArticlesList } from '@/api/article.api.ts'
import { SmartPagination } from '@/components/ui/pagination-controller.tsx'

export default function() {
  const [list, setList] = useState([])
  const [total, setTotal] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const onChange = (p: number) => {
    setCurrentPage(p)
  }
  const getList = () => {
    let params = {
      page: 1,
      limit: 10,
      title: '',
    }
    allArticlesList(params).then(res => {
      setList(res.items)
      setTotal(res.total)
    })
  }
  useEffect(() => {
    getList()
  }, [currentPage])
  return <div>
    <div className={'fixed bottom-10 flex justify-center w-full left-0'}>
      <SmartPagination
        current={currentPage}
        total={100}
        pageSize={pageSize}
        onChange={onChange}
      />
    </div>
    {
      list.map(item => {
        return <ArticleCard
          key={item.id}
          title={item.title}
          excerpt={item.readme}
          date={item.createdAt}
          tags={item.tags}
          imageUrl={item.banner}
          className="mb-6 mt-[30px]"
          readTime={'1分钟'}
          views={'1.2k'}
        />
      })
    }
    <div className={'h-20'}></div>
  </div>
}