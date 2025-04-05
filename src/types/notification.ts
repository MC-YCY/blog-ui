import { User } from '@/types/user.ts'
import { Article } from '@/types/article.ts'
import { NotificationType } from '@/types/enums/article-status.enum.ts'

export interface Notification {
  id: number;
  type: NotificationType;
  sender: User;
  receiver: User;
  article: Article | null; // 明确声明可为 null
  read: boolean;
  createdAt: Date;
  isStart:boolean
}
