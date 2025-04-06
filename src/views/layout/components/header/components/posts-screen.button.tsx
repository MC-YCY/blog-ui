import { JSX, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { Calendar, FileText, Home, User, LogIn } from 'lucide-react'
import { MetaRouteObject, Routers } from '@/constant/routers'
import { allArticlesList } from '@/api/article.api.ts'
import useUserStore from '@/stores/userStore.ts'

interface SearchableRoute {
  path: string
  title: string
  group: string
  icon?: JSX.Element
}

interface ArticleItem {
  id: number
  title: string
  [key: string]: any
}

const routeIcons: Record<string, JSX.Element> = {
  '首页': <Home className="mr-2 h-4 w-4" />,
  '文章': <FileText className="mr-2 h-4 w-4" />,
  '个人中心': <User className="mr-2 h-4 w-4" />,
  '文档': <FileText className="mr-2 h-4 w-4" />,
  '默认': <Calendar className="mr-2 h-4 w-4" />,
  '登录': <LogIn className="mr-2 h-4 w-4"></LogIn>,
  '创作': <FileText className="mr-2 h-4 w-4"></FileText>,
  '简历': <FileText className="mr-2 h-4 w-4"></FileText>,
}

function flattenRoutes(
  routes: MetaRouteObject[],
  parentPath = '',
  parentTitle = '',
): SearchableRoute[] {
  return routes.reduce<SearchableRoute[]>((acc, route) => {
    const currentPath = `${parentPath}/${route.path}`.replace(/\/+/g, '/')
    const currentTitle = route.meta?.title || ''

    if (route.meta?.screen) {
      acc.push({
        path: currentPath,
        title: currentTitle,
        group: parentTitle || 'Router',
        icon: routeIcons[currentTitle] || routeIcons['默认'],
      })
    }

    if (route.children) {
      acc.push(...flattenRoutes(
        route.children,
        currentPath,
        currentTitle || parentTitle,
      ))
    }

    return acc
  }, [])
}

export default function SearchButton() {
  const navigate = useNavigate()
  const buttonRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [articles, setArticles] = useState<ArticleItem[]>([])
  const [defaultArticles, setDefaultArticles] = useState<ArticleItem[]>([])
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const {user} = useUserStore();

  // 获取默认文章
  useEffect(() => {
    allArticlesList({
      page: 1,
      limit: 5,
      title: '',
      tag: '',
    }).then(res => {
      setDefaultArticles(res.items || [])
    })
  }, [])

  // 防抖搜索
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    if (searchText.trim()) {
      debounceRef.current = setTimeout(async () => {
        try {
          const res = await allArticlesList({
            page: 1,
            limit: 5,
            title: searchText,
            tag: '',
          })
          setArticles(res.items || [])
        } catch (error) {
          console.error('搜索失败:', error)
          setArticles([])
        }
      }, 300)
    } else {
      setArticles([])
    }

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [searchText])

  // 预处理路由数据
  const groupedRoutes = useMemo(() => {
    const routes = flattenRoutes(Routers)
    const groups = new Map<string, SearchableRoute[]>()

    routes.forEach(route => {
      const groupName = route.group || '其他'
      if (!groups.has(groupName)) {
        groups.set(groupName, [])
      }
      groups.get(groupName)?.push(route)
    })

    return Array.from(groups.entries())
      .sort(([a], [b]) => a.localeCompare(b))
  }, [])

  // 合并搜索结果
  const filteredResults = useMemo(() => {
    const lowerSearch = searchText.toLowerCase().trim()
    const result: Array<[string, SearchableRoute[]]> = []

    // 路由结果
    groupedRoutes.forEach(([group, items]) => {
      const filtered = items.filter(item =>
        item.title.toLowerCase().includes(lowerSearch) ||
        item.path.toLowerCase().includes(lowerSearch)
      )
      if (filtered.length > 0) {
        result.push([group, filtered.slice(0, 5)])
      }
    })

    // 文章结果
    const showArticles = searchText ? articles : defaultArticles
    if (showArticles.length > 0) {
      const articleItems = showArticles.slice(0, 5).map(article => ({
        path: `/article?id=${article.id}`,
        title: article.title,
        group: '文章',
        icon: routeIcons['文章']
      }))

      if (articleItems.length > 0) {
        result.push(['文章', articleItems])
      }
    }

    return result
  }, [searchText, groupedRoutes, articles, defaultArticles])

  // 快捷键监听
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(open => !open)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleNavigate = (path: string) => {
    if(path === '/user/message'){
      path+=`?userId=${user?.id}`
    }
    navigate(path)
    setOpen(false)
    setSearchText('')
  }

  return (
    <>
      <div
        ref={buttonRef}
        onClick={() => setOpen(true)}
        className="mr-2 cursor-pointer inline-flex items-center gap-2 whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input hover:bg-accent hover:text-accent-foreground px-4 py-2 relative h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-56 xl:w-64"
      >
        <span>搜索</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>
          <span className="">K</span>
        </kbd>
      </div>

      <CommandDialog
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen)
          if (!isOpen) {
            setSearchText('')
            setArticles([])
          }
        }}
        DialogContentClassName={'z-[999]'}
        DialogOverlayClassName={'z-[999]'}
      >
        <CommandInput
          placeholder="搜索文章或路由..."
          value={searchText}
          onValueChange={setSearchText}
        />
        <CommandList>
          <CommandEmpty>{searchText ? '没有找到匹配结果' : '输入内容开始搜索'}</CommandEmpty>

          {filteredResults.map(([group, items]) => (
            <CommandGroup key={group} heading={group}>
              {items.map(({ path, title, icon }) => (
                <CommandItem
                  key={path}
                  value={`${group} ${title} ${path}`}
                  onSelect={() => handleNavigate(path)}
                >
                  {icon || <FileText className="mr-2 h-4 w-4" />}
                  <div className="flex flex-col">
                    <span className="font-medium">{title}</span>
                    <span className="text-xs text-muted-foreground truncate max-w-[180px]">
                      {path}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}

          <CommandSeparator />

          <CommandGroup heading="快捷操作">
            <CommandItem onSelect={() => handleNavigate('/create')}>
              <FileText className="mr-2 h-4 w-4" />
              <span>新建文章</span>
            </CommandItem>
            <CommandItem onSelect={() => handleNavigate('/user/message')}>
              <User className="mr-2 h-4 w-4" />
              <span>我的消息</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}