import { User } from '@/types/user.ts'

export interface Image {
  id: number;
  originalname: string;
  mimetype: string;
  path: string;
  size: number;
  uploadedAt: Date;
  user: User;
  userId: number;
}
