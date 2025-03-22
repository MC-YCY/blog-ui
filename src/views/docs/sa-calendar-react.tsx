import { JSX } from 'react'
import { CodeBlock } from '@/components/ui/code-block'
import TextCode from './components/text-code.tsx'
import DocReadme from '@/views/docs/components/doc-readme.tsx'
import { DocReadmeListType } from '@/types/doc-readme-list.type.ts'

const dummyContent: DocReadmeListType = [
  {
    badge: '安装',
    title: 'sa-calendar-react',
    description: (
      <>
        <p>使用pnpm安装它，<a className={'text-pink-500'}
                             href="https://gitee.com/yin-chunyang/react-calendar/blob/calendar-toggle/src/App.tsx"
                             target="_blank">更多例子</a></p>
        <CodeBlock
          language="bash"
          filename="terminal"
          code={`pnpm install sa-calendar-react`}
        />
      </>
    ),
  },
  {
    badge: 'vite.config.ts',
    title: '使用该组件需要配置 css modules',
    description: (
      <>
        <CodeBlock
          language="typescript"
          filename="vite.config.ts"
          code={`import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: 'camelCaseOnly' // Optional, to ensure camelCase conversion
    }
  }
})`}
        />
      </>
    ),
  },
  {
    badge: '简单使用',
    description: (
      <>
        <p>默认开启了鼠标交互，即收起展开操作，可通过按下鼠标上下拖动查看</p>
        <CodeBlock
          language="tsx"
          filename="app.tex"
          code={`import { FC } from "react";
import Calendar from 'sa-calendar-react';
const App:FC = () =>{
    return <>
        <Calendar date={new Date()} firstDayOfWeek={1}></Calendar>
    </>
} 
export default App;`}
        />
      </>
    ),
  },
  {
    badge: 'props',
    description: (
      <>
        <p>这些是组件的属性</p>
        <table className={'w-full'}>
          <thead>
          <tr className={'even:bg-muted m-0 border-t p-0 text-sm text-black dark:text-white dark:even:bg-zinc-900'}>
            <th
              className={'border px-4 py-2 text-left text-sm font-bold [&[align=center]]:text-center [&[align=right]]:text-right'}>属性
            </th>
            <th
              className={'border px-4 py-2 text-left text-sm font-bold [&[align=center]]:text-center [&[align=right]]:text-right'}>类型
            </th>
            <th
              className={'border px-4 py-2 text-left text-sm font-bold [&[align=center]]:text-center [&[align=right]]:text-right'}>描述
            </th>
          </tr>
          </thead>
          <tbody>
          <tr className={'even:bg-muted m-0 border-t p-0 text-sm text-black dark:text-white dark:even:bg-zinc-900'}>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'date'}></TextCode>
            </td>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'Date'}></TextCode>
            </td>
            <td width={400}
                className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              日历所展示日期的月份
            </td>
          </tr>
          <tr className={'even:bg-muted m-0 border-t p-0 text-sm text-black dark:text-white dark:even:bg-zinc-900'}>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'firstDayOfWeek'}></TextCode>
            </td>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'number'}></TextCode>
            </td>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              日期展示第一列是周几
            </td>
          </tr>
          <tr className={'even:bg-muted m-0 border-t p-0 text-sm text-black dark:text-white dark:even:bg-zinc-900'}>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'?isFixedRows'}></TextCode>
            </td>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'boolean'}></TextCode>
            </td>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              true固定6*7，false月份时间变化5、6自动；默认不加固定6行
            </td>
          </tr>
          <tr className={'even:bg-muted m-0 border-t p-0 text-sm text-black dark:text-white dark:even:bg-zinc-900'}>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'?taskData'}></TextCode>
            </td>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'Record<string,any>[]'}></TextCode>
            </td>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              用来映射任务到每天的对象中，数组列表中要含有一个日期格式的字符串，默认获取date
            </td>
          </tr>
          <tr className={'even:bg-muted m-0 border-t p-0 text-sm text-black dark:text-white dark:even:bg-zinc-900'}>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'?taskDataDateMap'}></TextCode>
            </td>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'string'}></TextCode>
            </td>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              修改获取任务列表获取日期的字段
            </td>
          </tr>
          <tr className={'even:bg-muted m-0 border-t p-0 text-sm text-black dark:text-white dark:even:bg-zinc-900'}>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'?open'}></TextCode>
            </td>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'boolean'}></TextCode>
            </td>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              带上该参数开启mouse交互，可上下拖动日历收缩只展示当前周
            </td>
          </tr>
          <tr className={'even:bg-muted m-0 border-t p-0 text-sm text-black dark:text-white dark:even:bg-zinc-900'}>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'?cellHeight'}></TextCode>
            </td>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'number'}></TextCode>
            </td>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              开启mouse交互需要设置每格的高度，在设置了open参数时才生效
            </td>
          </tr>
          </tbody>
        </table>
      </>
    ),
  },
  {
    badge: 'event',
    description: (
      <>
        <p>这是一些事件</p>
        <table className={'w-full'}>
          <thead>
          <tr className={'even:bg-muted m-0 border-t p-0 text-sm text-black dark:text-white dark:even:bg-zinc-900'}>
            <th
              className={'border px-4 py-2 text-left text-sm font-bold [&[align=center]]:text-center [&[align=right]]:text-right'}>属性
            </th>
            <th
              className={'border px-4 py-2 text-left text-sm font-bold [&[align=center]]:text-center [&[align=right]]:text-right'}>类型
            </th>
            <th
              className={'border px-4 py-2 text-left text-sm font-bold [&[align=center]]:text-center [&[align=right]]:text-right'}>描述
            </th>
          </tr>
          </thead>
          <tbody>
          <tr className={'even:bg-muted m-0 border-t p-0 text-sm text-black dark:text-white dark:even:bg-zinc-900'}>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'onChange'}></TextCode>
            </td>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'(arg0:CalendarProps,arg1:dateTableType)=>void'}></TextCode>
            </td>
            <td width={400}
                className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              更新日期后的事件
            </td>
          </tr>
          <tr className={'even:bg-muted m-0 border-t p-0 text-sm text-black dark:text-white dark:even:bg-zinc-900'}>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'onToggle'}></TextCode>
            </td>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'(arg0:boolean)=>void'}></TextCode>
            </td>
            <td width={400}
                className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              组件内mouse交互更新open触发
            </td>
          </tr>
          <tr className={'even:bg-muted m-0 border-t p-0 text-sm text-black dark:text-white dark:even:bg-zinc-900'}>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'onClick'}></TextCode>
            </td>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'(arg0:dateTableCell)=>void'}></TextCode>
            </td>
            <td width={400}
                className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              格子点击事件
            </td>
          </tr>
          </tbody>
        </table>
      </>
    ),
  },
  {
    badge: '自定义渲染回调',
    description: (
      <>
        <p>提供了一些自定义渲染日期格子，和周的方法</p>
        <table className={'w-full'}>
          <thead>
          <tr className={'even:bg-muted m-0 border-t p-0 text-sm text-black dark:text-white dark:even:bg-zinc-900'}>
            <th
              className={'border px-4 py-2 text-left text-sm font-bold [&[align=center]]:text-center [&[align=right]]:text-right'}>属性
            </th>
            <th
              className={'border px-4 py-2 text-left text-sm font-bold [&[align=center]]:text-center [&[align=right]]:text-right'}>类型
            </th>
            <th
              className={'border px-4 py-2 text-left text-sm font-bold [&[align=center]]:text-center [&[align=right]]:text-right'}>描述
            </th>
          </tr>
          </thead>
          <tbody>
          <tr className={'even:bg-muted m-0 border-t p-0 text-sm text-black dark:text-white dark:even:bg-zinc-900'}>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'customWeek'}></TextCode>
            </td>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'(arg0:weekDataItemType)=>JSX.Element'}></TextCode>
            </td>
            <td width={400}
                className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              自定义渲染周内容，参数内含有Date日期对象week的index
            </td>
          </tr>
          <tr className={'even:bg-muted m-0 border-t p-0 text-sm text-black dark:text-white dark:even:bg-zinc-900'}>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'customDay'}></TextCode>
            </td>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'(arg0:dateTableCell)=>JSX.Element'}></TextCode>
            </td>
            <td width={400}
                className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              自定展示日期每天的内容，返回每天的对象
            </td>
          </tr>
          </tbody>
        </table>
      </>
    ),
  },

  {
    badge: 'interfaces',
    description: (
      <>
        <p>props,event中的一些接口</p>
        <CodeBlock
          language="typescript"
          filename="interface.ts"
          code={`export interface dateTableCell {
    dateStr:string,
    day:number,
    month:number,
    year:number,
    active:boolean,
    status:number,
    task?:Record<string,any> | null
}
export type dateTableRow = dateTableCell[];
export type dateTableType = dateTableRow[];

export interface weekDataItemType {
    label: string,
    weekIndex: number
}

export interface renderCustom {
    customWeek?: (arg0: weekDataItemType) => JSX.Element,
    customDay?: (arg0: dateTableCell) => JSX.Element,
}

export interface CalendarProps extends renderCustom {
    date: Date,
    firstDayOfWeek: number,
    isFixedRows?: boolean,
    taskData?: Record<string, any>[],
    taskDataDateMap?: string,
    open?: boolean,
    cellHeight?: number,
    onChange?: (arg0: CalendarProps, arg1: dateTableType) => void,
    onClick?: (arg0: any) => void,
    onToggle?: (arg0: boolean) => void
}`}
        />
      </>
    ),
  },
]

export default function(): JSX.Element {
  return <DocReadme DocReadmeList={dummyContent}></DocReadme>
}