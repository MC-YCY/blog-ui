import { FC, useState, ChangeEvent } from 'react'
import { BaseComment } from '@/types/comment'
import { Article } from '@/types/article'
import { User } from '@/types/user.ts'
import {IconCaretRightFilled} from '@tabler/icons-react'

// 扩展后的评论类型，包含额外字段
export interface ExtendedComment extends BaseComment {
  likes: number;
  // 用于存放回复（可以嵌套）
  replies: ExtendedComment[];
  targetUser?: User;
  // 为展示方便的字符串形式（比如 "3小时前"）
  timestamp: string;
}

interface CommentProps {
  comment: ExtendedComment;
}

const Comment: FC<CommentProps> = ({ comment }) => {
  const [likes, setLikes] = useState<number>(comment.likes)
  const [showReplyInput, setShowReplyInput] = useState<boolean>(false)
  const [replyText, setReplyText] = useState<string>('')
  // 扁平化后的回复列表状态，类型为 ExtendedComment[]
  const [flatReplies, setFlatReplies] = useState<ExtendedComment[]>(flattenReplies(comment.replies))
  const [showReplies, setShowReplies] = useState<boolean>(false)

  // 辅助函数：将嵌套回复扁平化为一个数组
  function flattenReplies(replies: ExtendedComment[]): ExtendedComment[] {
    let result: ExtendedComment[] = []
    replies.forEach((reply) => {
      result.push(reply)
      if (reply.replies && reply.replies.length > 0) {
        result = result.concat(flattenReplies(reply.replies))
      }
    })
    return result
  }

  const handleLike = () => setLikes((prev) => prev + 1)

  // 回复顶级评论
  const handleTopLevelReplySubmit = () => {
    if (replyText.trim()) {
      const newReply: ExtendedComment = {
        id: Date.now(),
        content: replyText,
        createdAt: new Date(),
        author: { username: '当前用户', avatar: 'ME', color: 'bg-yellow-500' } as User,
        targetUser: comment.author, // 回复的目标用户是该一级评论的用户
        article: comment.article,
        likes: 0,
        replies: [],
        timestamp: '刚刚',
      }
      setFlatReplies((prev) => [...prev, newReply])
      setReplyText('')
      setShowReplyInput(false)
      if (!showReplies) setShowReplies(true)
    }
  }

  // 用于处理“回复某条回复”的操作
  const handleReplyToReply = (_parentReply: ExtendedComment, replyContent: string) => {
    if (replyContent.trim()) {
      const newReply: ExtendedComment = {
        id: Date.now(),
        content: replyContent,
        createdAt: new Date(),
        author: { username: '当前用户', avatar: 'ME', color: 'bg-yellow-500' } as User,
        article: comment.article,
        targetUser: comment.author,
        likes: 0,
        replies: [],
        timestamp: '刚刚',
      }
      setFlatReplies((prev) => [...prev, newReply])
    }
  }

  return (
    <div className="w-full mb-6">
      <div className="flex items-start gap-3">
        {/* 顶级评论头像 */}
        <div
          className={`flex-shrink-0 w-8 h-8 ${comment.author.color} rounded-full flex items-center justify-center text-white text-sm`}
        >
          {comment.author.avatar}
        </div>
        <div className="flex-1">
          {/* 用户信息及时间 */}
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-800">{comment.author.username}</span>
            <time className="text-xs text-gray-500">{comment.timestamp}</time>
          </div>
          {/* 评论内容 */}
          <p className="mt-1 text-gray-700 text-sm">{comment.content}</p>
          {/* 操作按钮 */}
          <div className="flex items-center gap-3 mt-1">
            <button
              onClick={handleLike}
              className="flex items-center gap-1 text-gray-500 hover:text-blue-500 text-xs"
            >
              <ThumbUpIcon className="w-3.5 h-3.5" />
              <span>{likes}</span>
            </button>
            <button
              onClick={() => setShowReplyInput(!showReplyInput)}
              className="text-gray-500 hover:text-blue-500 text-xs"
            >
              回复
            </button>
            {flatReplies.length > 0 && (
              <button
                onClick={() => setShowReplies(!showReplies)}
                className="text-gray-500 hover:text-blue-500 text-xs"
              >
                {showReplies ? '收起回复' : `展开回复 (${flatReplies.length})`}
              </button>
            )}
          </div>
          {/* 顶级评论的回复输入框，添加 onBlur 事件处理失去焦点时关闭 */}
          {showReplyInput && (
            <div
              className="mt-2 flex gap-2"
              tabIndex={0}
              onBlur={(e) => {
                // 如果新的焦点不在此容器内，则关闭回复框
                if (!e.currentTarget.contains(e.relatedTarget)) {
                  setShowReplyInput(false)
                }
              }}
            >
              <input
                type="text"
                value={replyText}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setReplyText(e.target.value)}
                className="flex-1 px-2 py-1 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder={`回复 @${comment.author.username}...`}
              />
              <button
                onClick={handleTopLevelReplySubmit}
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                发送
              </button>
            </div>
          )}
          {/* 回复区域：扁平化展示所有回复 */}
          {showReplies && flatReplies.length > 0 && (
            <div className="mt-2 bg-gray-100 rounded p-2">
              {flatReplies.map((reply) => (
                <ReplyItem key={reply.id} reply={reply} onReply={handleReplyToReply} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

interface ReplyItemProps {
  reply: ExtendedComment;
  onReply: (parentReply: ExtendedComment, replyContent: string) => void;
}

const ReplyItem: FC<ReplyItemProps> = ({ reply, onReply }) => {
  const [likes, setLikes] = useState<number>(reply.likes)
  const [showReplyInput, setShowReplyInput] = useState<boolean>(false)
  const [replyText, setReplyText] = useState<string>('')

  const handleLike = () => setLikes((prev) => prev + 1)
  const handleSubmit = () => {
    if (replyText.trim()) {
      onReply(reply, replyText)
      setReplyText('')
      setShowReplyInput(false)
    }
  }

  return (
    <div className="mb-2">
      <div className="flex">
        {/* 回复用户头像 */}
        <div
          className={`flex-shrink-0 w-6 h-6 ${reply.author.color} rounded-full flex items-center justify-center text-white text-xs mr-2`}
        >
          {reply.author.avatar}
        </div>
        <div>
          <div className="text-sm text-gray-800 flex items-center">
            {reply.author.username}<IconCaretRightFilled  className='mx-1 w-[14px] h-[14px] text-[#999]' />{reply?.targetUser?.username || '未知'}:
          </div>
          <div className="text-sm text-gray-700 ml-1">{reply.content}</div>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-1 ml-8">
        <button
          onClick={handleLike}
          className="flex items-center gap-1 text-gray-500 hover:text-blue-500 text-xs"
        >
          <ThumbUpIcon className="w-3.5 h-3.5" />
          <span>{likes}</span>
        </button>
        <time className="text-xs text-gray-500">{reply.timestamp}</time>
        <button
          onClick={() => setShowReplyInput(!showReplyInput)}
          className="text-gray-500 hover:text-blue-500 text-xs"
        >
          回复
        </button>
      </div>
      {/* 回复某条回复的输入框 */}
      {showReplyInput && (
        <div
          className="mt-1 ml-8 flex gap-2"
          tabIndex={0}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
              setShowReplyInput(false)
            }
          }}
        >
          <input
            type="text"
            value={replyText}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setReplyText(e.target.value)}
            className="flex-1 px-2 py-1 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder={`回复 @${reply.author.username}...`}
          />
          <button
            onClick={handleSubmit}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            发送
          </button>
        </div>
      )}
    </div>
  )
}

const ThumbUpIcon: FC<{ className: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
    />
  </svg>
)

const CommentSection: FC = () => {
  const [comments, setComments] = useState<ExtendedComment[]>([
    {
      id: 1,
      content: '欢迎大家提出改进建议！',
      createdAt: new Date(),
      author: { username: '设计师小王', avatar: '王', color: 'bg-blue-500' } as User,
      article: {} as Article,
      likes: 89,
      replies: [
        {
          id: 2,
          content: '建议增加暗黑模式',
          createdAt: new Date(),
          author: { username: '前端小李', avatar: '李', color: 'bg-green-500' } as User,
          article: {} as Article,
          likes: 45,
          timestamp: '2小时前',
          replies: [
            {
              id: 3,
              content: '这个建议很好，下周版本安排',
              createdAt: new Date(),
              author: { username: '设计师小王', avatar: '王', color: 'bg-blue-500' } as User,
              article: {} as Article,
              likes: 32,
              timestamp: '1小时前',
              replies: [],
            },
          ],
        },
      ],
      timestamp: '3小时前',
    },
  ])

  const [newCommentText, setNewCommentText] = useState<string>('')

  const handleAddComment = () => {
    if (newCommentText.trim()) {
      const newComment: ExtendedComment = {
        id: Date.now(),
        content: newCommentText,
        createdAt: new Date(),
        author: {
          username: '当前用户',
          avatar: '我',
          color: 'bg-yellow-500',
        } as User,
        article: {} as Article,
        likes: 0,
        replies: [],
        timestamp: '刚刚',
      }
      setComments((prev) => [...prev, newComment])
      setNewCommentText('')
    }
  }

  return (
    <div className="mx-auto p-4 bg-white rounded-lg">
      {/* 新增一级评论输入框 */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="写下你的评论..."
        />
        <button
          onClick={handleAddComment}
          className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
        >
          评论
        </button>
      </div>

      {/* 渲染评论列表 */}
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  )
}

export default CommentSection
