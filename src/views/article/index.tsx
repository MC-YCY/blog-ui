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
import CommentSection from '@/views/article/components/comment.tsx'

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
      <div className="px-4 sm:px-8 max-w-[88rem] w-full mx-auto pt-4 fixed bg-background left-[50%] z-999"
           style={{ transform: 'translateX(-50%)' }}>
        <div className="space-y-1">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-0">
            {/* 头像和用户名部分 - 垂直/水平切换 */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <Avatar
                className="w-12 h-12 sm:w-14 sm:h-14 object-cover cursor-pointer"
                onClick={goUserPage}>
                <AvatarImage src={user?.avatar || UserIcon} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left">
                <h4 className="text-sm sm:text-base font-bold">{user?.username}</h4>
              </div>
            </div>

            {/* 数据指标部分 - 自动换行 */}
            <div className="w-full sm:w-auto sm:ml-auto">
              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-x-4 gap-y-2 text-sm">
                {user?.id === LoginUser?.id ? (
                  <div className="cursor-pointer whitespace-nowrap">
                    粉丝{authorFollowersCount}
                  </div>
                ) : (
                  <div
                    className="cursor-pointer whitespace-nowrap flex items-center"
                    onClick={clickIsFollowingAuthor}>
                    <span className="mr-1">粉丝{authorFollowersCount}</span>
                    {interaction.isFollowingAuthor ?
                      <Cross2Icon className="text-primary" /> :
                      <PlusIcon />}
                  </div>
                )}

                {user && (
                  <>
                    <Separator
                      orientation="vertical"
                      className="h-4 hidden sm:inline-block"
                    />
                    <div
                      className="cursor-pointer whitespace-nowrap flex items-center"
                      onClick={clickIsLiked}>
                      <span className="mr-1">{likeCount}</span>
                      {interaction.isLiked ?
                        <HeartFilledIcon className="text-primary" /> :
                        <HeartIcon />}
                    </div>

                    <Separator
                      orientation="vertical"
                      className="h-4 hidden sm:inline-block"
                    />
                    <div
                      className="cursor-pointer whitespace-nowrap flex items-center"
                      onClick={clickIsFavorited}>
                      <span className="mr-1">{favoritesCount}</span>
                      {interaction.isFavorited ?
                        <StarFilledIcon className="text-primary" /> :
                        <StarIcon />}
                    </div>
                  </>
                )}

                <Separator
                  orientation="vertical"
                  className="h-4 hidden sm:inline-block"
                />
                <div className="cursor-pointer whitespace-nowrap flex items-center">
                  <span className="mr-1">{viewsCount}</span>
                  <EyeOpenIcon className="text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Separator className="my-4" />
      </div>
      <div className={'pt-[165px] sm:pt-[120px]'}>
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

          <CommentSection></CommentSection>

        </TracingBeam>
      </div>
    </div>
  </Container>
}