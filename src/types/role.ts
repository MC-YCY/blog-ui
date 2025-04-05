import { User } from '@/types/user.ts'
import { Permission } from '@/types/permission.ts'
import { Menu } from '@/types/menu.ts'

export interface Role {
  id: number;
  name: string;
  code: string;
  users: User[];
  permissions: Permission[];
  menus: Menu[];
}
