import { useEffect, useState } from 'react'
import { getUserLikes } from '@/api/user.api.ts'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useUserStore from '@/stores/userStore.ts'
import { SmartPagination } from '@/components/ui/pagination-controller.tsx'
import { toggleArticlesUserLike } from '@/api/article-user.api.ts'
import { ArticleItem } from '@/api/article.api.ts'
import { Button } from '@/components/ui/button.tsx'
import { Cross1Icon, EyeOpenIcon } from '@radix-ui/react-icons'
import { ArticleCard } from '@/components/ui/article-card.tsx'
import { ArticleStatusText } from '@/constant/article-status.enum.ts'

export default function() {
  const [searchParams] = useSearchParams() // 直接用
  const [articleList, setArticleList] = useState<ArticleItem[]>([])
  const navigate = useNavigate()
  const { user: LoginUser } = useUserStore()
  const getList = (page: number) => {
    if (!searchParams.get('userId')) return
    getUserLikes(searchParams.get('userId'), {
      page: page,
      limit: 5,
    }).then(res => {
      setArticleList(res.records)
      setTotal(res.total)
    })
  }

  useEffect(() => {
    getList(1)
  }, [searchParams])

  const clickQx = async (article: ArticleItem) => {
    let param = { userId: searchParams.get('userId'),  articleId:article.id }
    await toggleArticlesUserLike(param)
    setCurrentPage(1)
    getList(1)
  }
  const viewItem = (item: { id: number }) => {
    navigate(`/article?id=${item.id}`)
  }
  const goArticle = (item: { id: number }) => {
    navigate(`/article?id=${item.id}`)
  }
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, _setPageSize] = useState<number>(5)
  const [total, setTotal] = useState<number>(0)
  const onChange = (p: number) => {
    setCurrentPage(p)
    getList(p)
  }

  return <div>
    <div className={'fixed bottom-10 flex justify-center w-full left-0 z-99'}>
      <SmartPagination
        current={currentPage}
        total={total}
        pageSize={pageSize}
        onChange={onChange}
      />
    </div>
    {
      articleList.map((item: ArticleItem) => {
        return <div className={'relative group'}>
          {
            LoginUser && <div
              className="absolute inset-0 z-99 rounded-xl bg-[rgba(0,0,0,.3)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center space-x-2">
              <Button onClick={() => viewItem(item)}>
                <EyeOpenIcon></EyeOpenIcon>
              </Button>
              <Button onClick={() => clickQx(item)}>
                <Cross1Icon></Cross1Icon>
              </Button>
            </div>
          }
          <ArticleCard
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
            status={item.status && ArticleStatusText[item.status] || '--'}
          />
        </div>
      })
    }
    <div className={'h-20'}></div>
  </div>
}