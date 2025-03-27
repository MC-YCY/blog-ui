import { Timeline } from '@/components/ui/timeline'
import { useEffect, useState } from 'react'
import { ArticleItem, getTimelineArticles } from '@/api/article.api.ts'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'

export default function ResumeTimeline() {
  const [list, setList] = useState<{ date: string; posts: ArticleItem[] }[]>([])
  const navigate = useNavigate()
  useEffect(() => {
    getTimelineArticles().then(res => {
      setList(res)
    })
  }, [])
  const goArticle = (item: { id: number }) => {
    navigate('/article?id=' + item.id)
  }
  return (
    <div className="w-full">
      <Timeline data={list.map((item: { date: string; posts: ArticleItem[] }) => {
        return {
          title: dayjs(item.date).format('YYYY-MM-DD'),
          content:
            <div>
              <p
                className="text-foreground text-xs md:text-sm font-normal mb-8 text-right">{dayjs(item.date).format('YYYY-MM-DD')}发布的{item.posts.length}篇文章</p>
              <div className="grid grid-cols-2 gap-4">
                {item.posts.length <= 1 ? <div></div> : null}
                {
                  item.posts.map((post) => {
                    return <img
                      key={post.id}
                      onClick={() => goArticle(post)}
                      src={post.banner}
                      alt="startup template"
                      width={500}
                      height={500}
                      className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset"
                    />
                  })
                }
              </div>
            </div>,
        }
      })} />
    </div>
  )
}
