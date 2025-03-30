import { ArticleCard } from '@/components/ui/article-card.tsx'
import banner from '@/assets/images/user.png'

export default function() {
  return <div>
    <ArticleCard
      title="Tailwind CSS 最佳实践"
      excerpt="探索如何高效使用Tailwind CSS构建现代化Web应用，包含暗黑模式实现和响应式设计技巧..."
      date="2024-03-15"
      tags={['Technology', 'Frontend']}
      imageUrl={banner}
      className="mb-6 mt-[30px]"
      readTime={'1分钟'}
      views={'1.2k'}
    />
  </div>
}