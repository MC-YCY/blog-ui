export enum ArticleStatus {
  DRAFT = 'draft', // 草稿
  PUBLISHED = 'published', // 已发布
  PENDING_REVIEW = 'pending_review', // 待审核
  REJECTED = 'rejected', // 已驳回
}

export enum ArticleStatusText {
  draft = '草稿',
  published = '已发布',
  pending_review = '待审核',
  rejected = '已驳回',
}

export enum NotificationType {
  FOLLOW = 'FOLLOW',
  LIKE = 'LIKE',
  FAVORITE = 'FAVORITE',
}

export enum NotificationTypeText {
  FOLLOW = '关注',
  LIKE = '喜欢',
  FAVORITE = '收藏',
}