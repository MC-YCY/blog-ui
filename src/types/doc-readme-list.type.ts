import { JSX } from 'react'

export interface DocReadmeListItemType{
  badge: string;
  title?: string;
  description: JSX.Element;
}
export type DocReadmeListType = DocReadmeListItemType[]