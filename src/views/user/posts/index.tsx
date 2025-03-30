import { ArticleCard } from '@/components/ui/article-card.tsx'
import { useEffect, useMemo, useState } from 'react'
import { ArticleItem, userArticleList, userDeleteArticle } from '@/api/article.api.ts'
import { SmartPagination } from '@/components/ui/pagination-controller.tsx'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArticleStatusText } from '@/constant/article-status.enum.ts'
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
import { toast } from 'sonner'
import { Button } from '@/components/ui/button.tsx'
import { Cross1Icon, CodeIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import useUserStore from '@/stores/userStore.ts'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

export default function() {
  const [searchParams] = useSearchParams() // 直接用
  const [list, setList] = useState([])
  const [total, setTotal] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, _setPageSize] = useState<number>(5)
  const [webType, setWebType] = useState<string>(' ')
  const navigate = useNavigate()
  const { user: LoginUser } = useUserStore()
  const onChange = (p: number) => {
    setCurrentPage(p)
  }
  const isLoginUser = useMemo(() => {
    if (LoginUser && LoginUser.id) {
      return LoginUser?.id == searchParams.get('userId')
    } else {
      return false
    }
  }, [])
  const getList = () => {
    if (!searchParams.get('userId')) {
      toast('Tip', {
        description: '缺少用户id',
        position: 'bottom-right',
        duration: 1000,
      })
      return
    }
    let params: Record<string, any> = {
      page: currentPage,
      limit: pageSize,
      title: '',
      tag: webType.trim(),
      isLoginUser: isLoginUser,
    }
    userArticleList(searchParams.get('userId'), params).then(res => {
      setList(res.items)
      setTotal(res.total)
    })
  }
  useEffect(() => {
    getList()
  }, [currentPage, webType, searchParams])
  const goArticle = (item: { id: number }) => {
    navigate('/article?id=' + item.id)
  }
  const editItem = (item: { id: number }) => {
    navigate('/update?id=' + item.id)
  }
  const removeItem = async (item: { id: number }) => {
    if (!LoginUser) return
    await userDeleteArticle(LoginUser.id, { articleId: item.id })
    getList()
  }
  const viewItem = (item: { id: number }) => {
    navigate(`/article?id=${item.id}`)
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
    <div className={'flex justify-end'}>
      <Select value={webType} defaultValue="All" onValueChange={(value) => setWebType(value)}>
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
        return <div className={'relative group'}>
          {
            isLoginUser && <div
              className="absolute inset-0 z-99 rounded-xl bg-[rgba(0,0,0,.3)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center space-x-2">
              <Button onClick={() => viewItem(item)}>
                <EyeOpenIcon></EyeOpenIcon>
              </Button>
              <Button onClick={() => editItem(item)}>
                <CodeIcon></CodeIcon>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button>
                    <Cross1Icon></Cross1Icon>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>请确认是否删除？</AlertDialogTitle>
                    <AlertDialogDescription>删除后无法恢复，去确认后在删除</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>取消</AlertDialogCancel>
                    <AlertDialogAction onClick={() => removeItem(item)}>删除</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
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