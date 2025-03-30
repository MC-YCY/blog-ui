'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ClockIcon, EyeIcon } from 'lucide-react' // 请确保你有这个工具函数

interface ArticleCardProps {
  title: string;
  excerpt: string;
  date: string;
  tags?: string[];
  imageUrl?: string;
  className?: string;
  readTime: string;
  views: string;
  onClick: () => void;
  status: string;
}

const tagColors = {
  technology: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
  design: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100',
  tutorial: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
  default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100',
}

export const ArticleCard = ({
                              title,
                              excerpt,
                              date,
                              tags = [],
                              imageUrl,
                              className,
                              readTime,
                              views,
                              onClick,
                              status
                            }: ArticleCardProps) => {
  const getTagColor = (tag: string) => {
    const lowerTag = tag.toLowerCase()
    if (lowerTag.includes('tech')) return tagColors.technology
    if (lowerTag.includes('design')) return tagColors.design
    if (lowerTag.includes('tutorial')) return tagColors.tutorial
    return tagColors.default
  }

  return (
    <motion.article
      onClick={onClick}
      className={cn(
        'group relative overflow-hidden rounded-xl bg-background shadow-md border transition-all backdrop-blur-sm',
        className,
      )}
    >
      <div className="flex flex-col md:flex-row">
        {imageUrl && (
          <div className="relative h-48 w-full overflow-hidden md:w-1/3 min-w-1/3">
            <motion.img
              src={imageUrl}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
            />
          </div>
        )}

        <div className="flex-1 p-6 w-0">
          <div className="mb-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <time dateTime={date}>{new Date(date).toLocaleDateString()}</time>
            {tags.length > 0 && (
              <>
                <span className="text-gray-300 dark:text-gray-600">•</span>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className={cn(
                        'rounded-full px-3 py-1 text-xs font-medium',
                        getTagColor(tag),
                      )}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>

          <h3
            className="mb-3 text-xl font-bold  transition-colors text-primary">
            {title}
          </h3>

          <p className="text-gray-600 dark:text-gray-300 overflow-hidden text-ellipsis whitespace-nowrap">{excerpt}</p>

          {/* 替换阅读更多为阅读时长 */}
          <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center">
              <ClockIcon className="h-4 w-4 mr-1" /> {/* 需要引入时钟图标 */}
              {readTime} 阅读
            </span>
            <span className="mx-2">•</span>
            <span className="flex items-center">
              <EyeIcon className="h-4 w-4 mr-1 " /> {/* 需要引入浏览图标 */}
              {views} 浏览
            </span>
            <span className="mx-2">•</span>
            <span className="flex items-center">
              {status}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  )
}