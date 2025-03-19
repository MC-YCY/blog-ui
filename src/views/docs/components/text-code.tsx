import { JSX } from 'react'

export default function({code}:{code:string | number}):JSX.Element{
  return  <code className={'relative rounded px-4 py-1 text-sm __className_b3860d [&:not(:where(pre*))]:[&:not(pre)]:bg-neutral-100 [&:not(:where(pre*))]:[&:not(pre)]:dark:bg-neutral-800'}>{code}</code>
}