import Container from '@/components/container.tsx'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getArticle } from '@/api/article.api.ts'
import { useEffect, useState } from 'react'
import { toast as Toast } from 'sonner'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import UserIcon from '@/assets/images/user.png'
import { Separator } from '@/components/ui/separator.tsx'
import useUserStore, { User } from '@/stores/userStore.ts'
import { ArticleStatusText } from '@/types/enums/article-status.enum.ts'
import { TracingBeam } from '@/components/ui/tracing-beam'
import MDEditor from '@uiw/react-md-editor'
import useThemeStore from '@/stores/themeStore.ts'
import {
  HeartIcon,
  HeartFilledIcon,
  StarIcon,
  StarFilledIcon,
  EyeOpenIcon,
  PlusIcon,
  Cross2Icon,
} from '@radix-ui/react-icons'
import {
  getArticlesStats,
  getArticlesUserInteraction,
  toggleArticlesUserFavorite,
  toggleArticlesUserFollow,
  toggleArticlesUserLike,
} from '@/api/article-user.api.ts'

export default function() {
  const [params] = useSearchParams() // 直接用
  const [user, setUser] = useState<User>()
  const { user: LoginUser } = useUserStore()
  const { theme } = useThemeStore()
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [content, setContent] = useState('')
  const [status, setStatus] = useState()
  const navigate = useNavigate()
  const [likeCount, setLikeCount] = useState<number>(0)
  const [favoritesCount, setFavoritesCount] = useState<number>(0)
  const [authorFollowersCount, setAuthorFollowersCount] = useState<number>(0)
  const [viewsCount, setViewsCount] = useState<number>(0)
  const [interaction, setInteraction] = useState<{
    isFollowingAuthor: boolean;
    isLiked: boolean;
    isFavorited: boolean;
  }>({
    isFollowingAuthor: false,
    isLiked: false,
    isFavorited: false,
  })

  const getArticlesStatsFn = () => {
    if (!params.get('id')) return
    getArticlesStats({ articleId: params.get('id') }).then(data => {
      setLikeCount(data.likesCount)
      setFavoritesCount(data.favoritesCount)
      setViewsCount(data.viewCount)
      setAuthorFollowersCount(data.authorFollowers)
    })
  }

  useEffect(() => {
    if (!params.get('id')) {
      Toast('Tip', {
        description: '缺少文章ID',
        position: 'bottom-right',
        duration: 1000,
      })
      return
    }
    getArticle(params.get('id')).then((data) => {
      setUser(data.author)
      setContent(data.content)
      setTags(data.tags)
      setTitle(data.title)
      setStatus(data.status)
      getArticlesStatsFn();
    })
    if (!LoginUser) {
      setInteraction({
        isFollowingAuthor: false,
        isLiked: false,
        isFavorited: false,
      })
      return
    }
    getArticlesUserInteraction(params.get('id'), { userId: Number(LoginUser.id) }).then((data) => {
      setInteraction(data)
    })
  }, [params])

  const goUserPage = () => {
    if (!user) return
    navigate('/user/posts?userId=' + user.id)
  }
  const updateStats = () =>{
    if (!LoginUser) {
      setInteraction({
        isFollowingAuthor: false,
        isLiked: false,
        isFavorited: false,
      })
      return
    }
    getArticlesUserInteraction(params.get('id'), { userId: Number(LoginUser.id) }).then((data) => {
      setInteraction(data)
    })
    getArticlesStatsFn();
  }
  const clickIsFollowingAuthor = async () => {
    if (!LoginUser) return
    if (!user) return
    await toggleArticlesUserFollow({
      userId: LoginUser.id,
      authorId: user.id,
    })
    updateStats();
  }
  const clickIsLiked = async () => {
    if (!LoginUser) return
    if (!params.get('id')) return
    await toggleArticlesUserLike({
      userId: LoginUser.id,
      articleId: params.get('id'),
    })
    updateStats();
  }

  const clickIsFavorited = async () => {
    if (!LoginUser) return
    if (!params.get('id')) return
    await toggleArticlesUserFavorite({
      userId: LoginUser.id,
      articleId: params.get('id'),
    })
    updateStats();
  }

  return <Container>
    <div className={'relative'}>
      <div className={'px-8 max-w-[88rem] w-full mx-auto pt-4 fixed bg-background left-[50%] z-999'}
           style={{ 'transform': 'translateX(-50%)' }}>
        <div className="space-y-1">
          <div className={'flex align-center'}>
            <Avatar className="w-14 h-14 object-cover cursor-pointer" onClick={goUserPage}>
              <AvatarImage src={user?.avatar ? user?.avatar : UserIcon} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className={'my-auto mx-0 ml-4'}>
              <h4 className="text-sm leading-none font-bold">{user?.username}</h4>
              <p className="text-sm text-muted-foreground mt-1">{user?.signature || '知其然不知其所以然'}</p>
            </div>
            <div className={'ml-auto my-auto pl-3'}>
              <div className="flex h-5 items-center space-x-4 text-sm">
                {
                  user?.id === LoginUser?.id ?
                    <div className={'cursor-pointer whitespace-nowrap'}>粉丝{authorFollowersCount}</div>
                    : <>
                      <div className={'cursor-pointer  whitespace-nowrap flex items-center'}
                           onClick={clickIsFollowingAuthor}>
                        <span className={'mr-1'}>粉丝{authorFollowersCount}</span>
                        {
                          interaction.isFollowingAuthor ? <Cross2Icon className={'text-primary'}></Cross2Icon> :
                            <PlusIcon></PlusIcon>
                        }
                      </div>
                    </>
                }
                {
                  user ? <>
                      <Separator orientation="vertical" />
                      <div className={'cursor-pointer  whitespace-nowrap flex items-center'} onClick={clickIsLiked}>
                        <span className={'mr-1'}>{likeCount}</span>
                        {
                          interaction.isLiked ? <HeartFilledIcon className={'text-primary'}></HeartFilledIcon> :
                            <HeartIcon></HeartIcon>
                        }
                      </div>
                      <Separator orientation="vertical" />
                      <div className={'cursor-pointer  whitespace-nowrap flex items-center'} onClick={clickIsFavorited}>
                        <span className={'mr-1'}>{favoritesCount}</span>
                        {
                          interaction.isFavorited ? <StarFilledIcon className={'text-primary'}></StarFilledIcon> :
                            <StarIcon></StarIcon>
                        }
                      </div>
                    </>
                    : null
                }
                <Separator orientation="vertical" />
                <div className={'cursor-pointer  whitespace-nowrap flex items-center'}>
                  <span className={'mr-1'}>{viewsCount}</span>
                  <EyeOpenIcon className={'text-primary'}></EyeOpenIcon>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Separator className="my-4" />
      </div>

      <div className={'pt-[120px]'}>
        <TracingBeam>
          <div className="gap-4 mb-8">
            {/* 标题部分 */}
            <h1 className="text-3xl font-bold tracking-tight lg:text-4xl text-primary">
              {title}
            </h1>
            <div className={'flex mt-2 cursor-pointer'}>
              {/* 标签部分 */}
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex h-[30px] items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20 transition-colors hover:bg-primary/20"
                  >
              #{tag}
            </span>
                ))}
              </div>
              <span
                className="inline-flex h-[30px] items-center rounded-full px-3 py-1 text-sm font-medium text-primary"
              >
              {status && ArticleStatusText[status]}
            </span>
            </div>
          </div>
          <MDEditor className={'md-editor-preview'} data-color-mode={theme as 'light' | 'dark'} value={content}
                    preview={'preview'}
                    hideToolbar={true} />
        </TracingBeam>
      </div>
    </div>
  </Container>
}