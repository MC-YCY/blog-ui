export interface CommentWeb {
  id: number;
  username: string;
  qq?: string | null;
  avatar: string;
  email?: string | null;
  content: string;
  date: Date | number | string;
  url?: string;
  parent?: CommentWeb | null;
  parentId?: number | null;
  children?: CommentWeb[];
  replyTo?: string | null;
  replyToId: string | null | number;
}

export interface CreateCommentWebDto {
  username: string;
  qq?: string | null;
  avatar: string;
  email?: string | null;
  url?: string;
  content: string;
  parentId?: number | null;
  replyTo?: string | null;
  replyToId: string | null | number;
}
