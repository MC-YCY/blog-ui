import { ArticleCard } from '@/components/ui/article-card.tsx'
import { useEffect, useState } from 'react'
import { allArticlesList } from '@/api/article.api.ts'

export default function() {
  const [list, setList] = useState([])
  const [total, setTotal] = useState<number>(0)
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
  }, [])
  return <div>
    {
      list.map(item => {
        return <ArticleCard
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

  </div>
}