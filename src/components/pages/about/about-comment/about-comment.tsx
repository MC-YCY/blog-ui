import dayjs from 'dayjs'
import { cn } from '@/lib/utils.ts'
import React, { useEffect, useRef, useState } from 'react'
import { IconSend } from '@tabler/icons-react'
import { PartTitle } from '@/components/project/part-title/part-title.tsx'
import { toast as Toast } from 'sonner'
import { CommentWeb, CreateCommentWebDto } from '@/types/comment-web.ts'
import { createCommentsWebApi, getCommentsWebApi } from '@/api/comment-web.api.ts'
import { useLocation } from 'react-router-dom'
import style from './style.module.css'
import { SmartPagination } from '@/components/ui/pagination-controller.tsx'
import { useSearchParams } from 'react-router-dom'

interface Comment extends CommentWeb {
  className?: string;
  InnerClassName?: string;
  onSubmit?: (info: CreateCommentWebDto) => void
}

function flattenNestedComments(comments: CommentWeb[], level = 1): CommentWeb[] {
  return comments.reduce<CommentWeb[]>((acc, comment) => {
    const newComment = { ...comment }

    if (level >= 2 && newComment.children) {
      const flattenedChildren = flattenNestedComments(newComment.children, level + 1)
      newComment.children = []
      return [...acc, newComment, ...flattenedChildren]
    } else if (newComment.children) {
      newComment.children = flattenNestedComments(newComment.children, level + 1)
      return [...acc, newComment]
    } else {
      return [...acc, newComment]
    }
  }, [])
}

const CommentIcon = ({ state, onClick }: { state?: boolean, onClick?: () => void }) => {
  return <div className={'w-[16px] h-[16px] relative'} onClick={onClick}>
    <svg
      className={cn('absolute left-0 top-0 w-[16px] h-[16px] cursor-pointer transition', !state ? 'opacity-100' : 'opacity-0')}
      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path className={'fill-[#425aef]'}
            d="M256 32C114.6 32 0 125.1 0 240c0 47.6 19.9 91.2 52.9 126.3C38 405.7 7 439.1 6.5 439.5c-6.6 7-8.4 17.2-4.6 26S14.4 480 24 480c61.5 0 110-25.7 139.1-46.3C192 442.8 223.2 448 256 448c141.4 0 256-93.1 256-208S397.4 32 256 32zm0 368c-26.7 0-53.1-4.1-78.4-12.1l-22.7-7.2-19.5 13.8c-14.3 10.1-33.9 21.4-57.5 29 7.3-12.1 14.4-25.7 19.9-40.2l10.6-28.1-20.6-21.8C69.7 314.1 48 282.2 48 240c0-88.2 93.3-160 208-160s208 71.8 208 160-93.3 160-208 160z"></path>
    </svg>
    <svg
      className={cn('absolute left-0 top-0 w-[16px] h-[16px] cursor-pointer transition', state ? 'opacity-100' : 'opacity-0')}
      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path className={'fill-[#425aef]'}
            d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32z"></path>
    </svg>
  </div>
}

const CommentInput = ({ id, onSubmit, username }: Comment) => {
  const [value, setValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const MAX_LENGTH = 500
  const [QQNumber, setQQNumber] = useState('')
  const [email, setEmail] = useState('')
  const [websiteURL, setWebsiteURL] = useState('')
  const QQ_REGEX = /^[1-9][0-9]{4,11}$/
  const URL_REGEX = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(:\d+)?(\/[\w-./?%&=]*)?$/i
  const onQQInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const qq = e.target.value.trim()
    setQQNumber(qq)
    if (QQ_REGEX.test(qq)) {
      setEmail(`${qq}@qq.com`)
    } else {
      setEmail('')
    }
  }
  const onURLInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value.trim()
    setWebsiteURL(url)
  }
  const submitComment = () => {
    let message = ''
    if (!(value && value.trim().length)) {
      message = '请输入内容'
    }
    if (!QQ_REGEX.test(QQNumber) && !message) {
      message = '请输入正确的 QQ 号'
    }
    if (websiteURL && !URL_REGEX.test(websiteURL) && !message) {
      message = '请输入合法的网址（需包含 http:// 或 https://）'
    }
    if (message) {
      Toast('', {
        description: message,
        action: {
          label: 'OK',
          onClick: () => {
          },
        },
      })
      return
    }
    let params: CreateCommentWebDto = {
      qq: QQNumber,
      email: email,
      url: websiteURL,
      content: value,
      avatar: `https://q1.qlogo.cn/g?b=qq&nk=${QQNumber}&s=100`,
      username: QQNumber,
      parentId: id || null,
      replyTo: username,
      replyToId: id || null,
    }
    if (onSubmit) {
      onSubmit(params)
      setValue('')
    }
  }
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setValue(newValue)
    autoResize()
  }

  const autoResize = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  // 初始自动调整高度
  useEffect(() => {
    autoResize()
  }, [])

  return (
    <div>
      <div className="w-full relative text-[14px]">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleInput}
          className={cn(
            'bg-background shadow-[0_8px_16px_-4px_#2c2d300c] transition-all duration-300 px-[16px] py-[16px] pb-[40px] block w-full outline-none rounded-[10px]',
            'border border-[#e3e8f7] dark:border-[#3d3d3f] focus:border-[#425aef]',
            'resize-none overflow-hidden min-h-[120px]',
          )}
          maxLength={MAX_LENGTH}
          placeholder="文明发言，友善交流~"
          autoComplete="off"
        />
        <div
          className="pointer-events-none absolute right-[16px] h-[40px] bottom-0 flex items-center text-[#999] text-xs">
          {value.length}/{MAX_LENGTH}
        </div>
      </div>
      <div className={'block md:flex my-[8px]'}>
        <div
          className={'flex-1 h-[32px] mr-0 md:mr-[10px] mt-[10px] md:mt-0 bg-background shadow-[0_8px_16px_-4px_#2c2d300c] relative text-[14px]'}>
          <label>
            <span className={'absolute left-0 top-0 h-[32px] flex items-center px-[20px] font-bold'}>QQ</span>
            <input
              value={QQNumber}
              onInput={onQQInput}
              type="text" placeholder={'输入QQ账号获取昵称&头像'}
              className={'placeholder:text-[#c0c4cc] pl-[70px] rounded-[6px] transition-all duration-300 w-full h-full outline-none border border-[#e3e8f7] dark:border-[#3d3d3f] focus:border-[#425aef]'} />
          </label>
        </div>
        <div
          className={'flex-1 h-[32px] mr-0 md:mr-[10px] mt-[10px] md:mt-0 bg-background shadow-[0_8px_16px_-4px_#2c2d300c] relative text-[14px]'}>
          <label>
            <span className={'absolute left-0 top-0 h-[32px] flex items-center px-[20px] font-bold'}>邮箱</span>
            <input
              value={email}
              disabled={true} type="text" placeholder={'QQ账号邮箱'}
              className={'placeholder:text-[#c0c4cc] pl-[70px] rounded-[6px] transition-all duration-300 w-full h-full outline-none border border-[#e3e8f7] dark:border-[#3d3d3f] focus:border-[#425aef]'} />
          </label>
        </div>
        <div
          className={'flex-1 h-[32px] mr-0 md:mr-[10px] mt-[10px] md:mt-0 bg-background shadow-[0_8px_16px_-4px_#2c2d300c] relative text-[14px]'}>
          <label>
            <span className={'absolute left-0 top-0 h-[32px] flex items-center px-[20px] font-bold'}>网址</span>
            <input
              value={websiteURL}
              onInput={onURLInput}
              type="text" placeholder={'网站地址,评论后点击名称传送'}
              className={'placeholder:text-[#c0c4cc] pl-[70px] rounded-[6px] transition-all duration-300 w-full h-full outline-none border border-[#e3e8f7] dark:border-[#3d3d3f] focus:border-[#425aef]'} />
          </label>
        </div>
        <div
          onClick={submitComment}
          className={'h-[32px] mt-[10px] md:mt-0 w-full bg-[#425aef] rounded-[10px] text-[white] shadow-[0_8px_16px_-4px_#2c2d300c] relative text-[14px] flex items-center md:w-[100px] min-w-[100px] justify-center cursor-pointer'}>
          <IconSend width={20} height={20}></IconSend>
        </div>
      </div>
    </div>
  )
}

interface CommentContentProps extends Comment {
  activeCommentId: string | number | null
  onCommentClick: (commentId: string | number | null) => void
  onSubmit?: (info: CreateCommentWebDto) => void
  hashScrollElement?: () => void
  clickAnchor: () => void
}

const CommentContent = (props: CommentContentProps) => {
  const { activeCommentId, onCommentClick, onSubmit, clickAnchor, ...comment } = props
  const isCommentInputActive = activeCommentId === comment.id
  const location = useLocation()

  const [visibleChildrenCount, setVisibleChildrenCount] = useState(6)

  const clickCommentIcon = () => {
    onCommentClick(isCommentInputActive ? null : comment.id!)
  }

  useEffect(() => {
    if (props.hashScrollElement) {
      props.hashScrollElement()
    }
  }, [])

  const loadMoreChildren = () => {
    setVisibleChildrenCount((prev) => prev + 6)
  }

  const visibleChildren = comment.children?.slice(0, visibleChildrenCount) || []
  const hasMoreChildren = (comment.children?.length || 0) > visibleChildrenCount

  const [needScrollToHash, setNeedScrollToHash] = useState(false)
  useEffect(() => {
    if (!comment.children?.length) return
    const findIndex = comment.children.findIndex((item) => {
      return '#comment-' + item.id === location.hash
    })
    if (findIndex >= 0) {
      const targetCount = findIndex + 1
      setVisibleChildrenCount((prev) => Math.max(prev, targetCount))
      setNeedScrollToHash(true) // 设置一个标记，等下个 useEffect 滚动
    }
  }, [location.hash, comment.children])
  useEffect(() => {
    if (!needScrollToHash) return
    const target = document.querySelector(location.hash)
    if (target) {
      target.scrollIntoView({ behavior: 'instant' })
      setNeedScrollToHash(false) // 只滚动一次
    }
  }, [visibleChildrenCount, needScrollToHash])
  return (
    <div
      id={`comment-${comment.id}`}
      className={cn(
        'p-[20px] border-[#e3e8f7] dark:border-[#3d3d3f] border-solid border shadow-[0_0_10px_rgba(0,0,0,0.05)] dark:shadow-[0_0_8px_00000050] rounded-2xl',
        comment?.className,
      )}
    >
      <div className={cn('flex border-b border-[#e3e8f7] dark:border-[#3d3d3f] pb-[10px]', props.InnerClassName)}>
        <div className={'w-[32px] h-[32px] rounded-[50%] cursor-pointer hover:rotate-360 transition'}>
          <img src={comment.avatar} className={'w-full h-full object-cover block text-0 rounded-[50%]'} alt="" />
        </div>
        <div className={'flex-1 pl-[10px]'}>
          <div className={cn('flex h-[32px] items-center')}>
            {comment.url ? (
              <span
                className={cn(
                  'text-[20px] cursor-pointer font-bold',
                  location.hash === '#comment-' + comment.id ? style.selectedUsername : '',
                )}
              >
                <a onClick={clickAnchor} className={'hover:opacity-55 transition'} href={'#comment-' + comment.id}>
                  #{comment.id}-
                </a>
                <a href={comment.url} target={'_blank'} rel="noreferrer">
                  {comment.username}
                </a>
              </span>
            ) : (
              <span
                className={cn(
                  'text-[20px] cursor-pointer font-bold',
                  location.hash === '#comment-' + comment.id ? style.selectedUsername : '',
                )}
              >
                <a onClick={clickAnchor} className={'hover:opacity-55 transition'} href={'#comment-' + comment.id}>
                  #{comment.id}-
                </a>
                <a target={'_blank'} rel="noreferrer">
                  {comment.username}
                </a>
              </span>
            )}
            <span className={'hidden md:block ml-[10px] cursor-pointer text-[12px] opacity-75'}>
              {dayjs(comment.date).format('YYYY/MM/DD HH:mm:ss')}
            </span>
            <div className={'ml-auto'}>
              <CommentIcon state={isCommentInputActive} onClick={clickCommentIcon}></CommentIcon>
            </div>
          </div>
          <span className={'block md:hidden cursor-pointer text-[14px] opacity-75'}>
            {dayjs(comment.date).format('YYYY/MM/DD HH:mm:ss')}
          </span>
          {comment.replyTo && (
            <a
              onClick={clickAnchor}
              href={'#comment-' + comment.replyToId}
              className={'h-[14px] text-foreground opacity-75 text-[12px] cursor-pointer items-center mt-[10px]'}
            >
              回复@#{comment.replyToId}-{comment.replyTo}
            </a>
          )}
          <div className={'text-[16px] text-foreground mt-[10px] cursor-default whitespace-pre-line'}>
            {comment.content}
          </div>

          {/* 子评论列表 */}
          {visibleChildren.map((commentInfo: Comment, index) => (
            <CommentContent
              {...props}
              InnerClassName={''}
              key={index}
              {...commentInfo}
              activeCommentId={activeCommentId}
              onCommentClick={onCommentClick}
              onSubmit={onSubmit}
              className={cn('p-0! pt-[20px]! bg-transparent border-none rounded-none shadow-none')}
            />
          ))}

          {/* 加载更多按钮 */}
          {hasMoreChildren && (
            <div className="flex justify-center mt-[18px]">
              <div
                onClick={loadMoreChildren}
                className="cursor-pointer transition hover:opacity-80 opacity-55 w-[120px] h-[28px] flex justify-center items-center text-[#425aef] border-[1px] border-[#425aef] rounded-[36px] text-[12px]">查看更多
              </div>
            </div>
          )}

          {/* 回复输入框 */}
          <div className={cn('mt-[16px] hidden', isCommentInputActive && 'block')}>
            <CommentInput {...comment} onSubmit={onSubmit}></CommentInput>
          </div>
        </div>
      </div>
    </div>
  )
}

export const AboutComment = () => {
  const isInit = useRef(true)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(6)
  const [total, setTotal] = useState(0)
  const [searchParams, setSearchParams] = useSearchParams()
  // 添加状态来管理当前激活的评论输入框
  const [activeCommentId, setActiveCommentId] = useState<string | number | null>(null)

  const handleCommentClick = (commentId: string | number | null) => {
    setActiveCommentId(commentId)
  }

  const [comments, setComments] = useState<Comment[]>([])
  const onSubmit = async (info: CreateCommentWebDto) => {
    await createCommentsWebApi(info)
    setPage(1)
    getComments(1, pageSize)
    setActiveCommentId(null)
  }
  const getComments = (p: number, size: number) => {
    getCommentsWebApi({ page: p, limit: size }).then((res) => {
      const flattenedComments = flattenNestedComments(res.data)
      setComments(flattenedComments)
      setTotal(res.total)
    })
  }
  const hashScrollElement = () => {
    // 只有在初始化（第一此进入页面执行此操作）
    if (location.hash && isInit.current) {
      isInit.current = false
      requestAnimationFrame(() => {
        const target = document.querySelector(location.hash)
        if (target) target.scrollIntoView({ behavior: 'instant' })
      })
    }
  }
  const onChange = (p: number) => {
    setPage(p)
    updateParams(p, pageSize)
    getComments(p, pageSize)
  }
  useEffect(() => {
    let paramsPage = Number(searchParams.get('page') || 1)
    let paramsPageSize = Number(searchParams.get('pageSize') || 6)
    if (paramsPage < 1) paramsPage = 1
    if (paramsPageSize < 6) paramsPageSize = 6
    setPage(paramsPage)
    setPageSize(paramsPageSize)
    getComments(paramsPage, paramsPageSize)
  }, [])
  const updateParams = (p?: number, s?: number) => {
    searchParams.set('page', String(p || page))
    searchParams.set('pageSize', String(s || pageSize))
    setSearchParams(searchParams)
  }
  return <div className={'mt-[26px]'}>
    <PartTitle title={'评论'} description={'可以留下建议,我会尝试修改'}></PartTitle>
    <div className={'w-full mt-3 xl:mt-6'}>
      <CommentInput username={''} qq={''} avatar={''} id={0} content={''} date={''}
                    onSubmit={onSubmit} replyToId={null}></CommentInput>
    </div>
    <div className={'w-full mt-3 xl:mt-6'}>
      {
        comments.map((comment: Comment) => {
          return <CommentContent
            clickAnchor={() => updateParams}
            InnerClassName={'border-none!'}
            hashScrollElement={hashScrollElement}
            key={comment.id}
            {...comment}
            activeCommentId={activeCommentId}
            onCommentClick={handleCommentClick}
            onSubmit={onSubmit}
            className={'mb-[10px]'}
          />
        })
      }
      <div className={'flex justify-center w-full mt-10 sticky bottom-10'}>
        <SmartPagination
          total={total}
          current={page}
          pageSize={pageSize}
          onChange={onChange}
        />
      </div>
    </div>
  </div>
}