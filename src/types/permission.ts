import { Role } from '@/types/role.ts'

export interface Permission {
  id: number;

  name: string;

  type: string;
  description: string;

  code: string;
  roles: Role[];
}
