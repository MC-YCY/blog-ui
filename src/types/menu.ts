import { Role } from '@/types/role.ts'

export interface Menu {
  id: number;

  name: string;

  path: string;

  component: string;

  type: 'menu' | 'button';

  icon?: string;

  code?: string;

  explain?: string;

  parent: Menu | null;

  children: Menu[] | null;

  roles: Role[];
}
