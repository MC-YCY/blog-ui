import { JSX } from 'react'
import { TracingBeam } from '@/components/ui/tracing-beam.tsx'
import { CodeBlock } from '@/components/ui/code-block'
import TextCode from './components/text-code.tsx'

const dummyContent = [
  {
    badge: '安装',
    title: 'sa-calendar-vue3',
    description: (
      <>
        <p>使用pnpm安装它，<a className={'text-pink-500'} href="https://gitee.com/yin-chunyang/sa-calendar-vue3/blob/master/src/App.vue" target='_blank'>更多例子</a></p>
        <CodeBlock
          language="bash"
          filename="terminal"
          code={`pnpm install sa-calendar-vue3`}
        />
        <ul className="list-disc pl-5">
          <li>可以收起展开日历;收起时展示传入date的周;</li>
          <li>展开则展示传入日期的月</li>
        </ul>
      </>
    ),
  },
  {
    badge: 'sa-calendar-toggle',
    description: (
      <>
        <p>这是一个可以收起展开的日历</p>
        <p>这个例子中使用了插槽渲染任务等信息</p>
        <CodeBlock
          language="html"
          filename="app.vue"
          code={`<template>
  <sa-calendar-toggle v-model:visible="visible" :latticeHeight="40" :isSixRow="false" :startWeek="1"
      v-model:date="date" :data="data" :detailkey="'date'" @onDblClick="handleDay">
      <template #header="{ data }">
        <div class="custom">
          {{ data }}
        </div>
      </template>
      <template #day="{ data, index ,row}">
        <div class="mydate">
          <template v-if="index == 0">
            <div class="mydate-week">
            {{ moment(new Date(data.year, data.month, data.day)).format("W") }}
            </div>
          </template>
          <div class="custom" 
            :class="{ 'active': data.active, 'opacity': data.status != 1 }">
            {{ data.day }}
            {{
              data?.detail?.text
            }}
            </div>
        </div>
      </template>
      <template #toggle>
        <div class="custom" @click="toggleFn">toggle</div>
      </template>
  </sa-calendar-toggle>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import moment from 'moment';
import { saCalendar, saWeekCalendar,saCalendarToggle } from 'sa-calendar-vue3';
let date = ref(new Date('2023/2/16'));
const data = ref([
   {
    date: '2023-02-01',
    text: '1232'
  }
])
const handleDay = (item) => {
  console.log(item);
}
</script>
`}
        />
      </>
    ),
  },
  {
    badge: 'sa-calendar-toggle props',
    description: (
      <>
        <p>这是sa-calendar-toggle的属性</p>
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
              <TextCode code={'data'}></TextCode>
            </td>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'Array'}></TextCode>
            </td>
            <td width={400}
                className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              日历展示自定义内容的，数据需要一个日期格式YYYY-MM-DD的key
            </td>
          </tr>
          <tr className={'even:bg-muted m-0 border-t p-0 text-sm text-black dark:text-white dark:even:bg-zinc-900'}>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'date'}></TextCode>
            </td>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'Date'}></TextCode>
              <TextCode code={'YYYY-MM-DD'}></TextCode>
            </td>
            <td width={400}
                className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              日历展示的日期，使用时需要用v-model:date='date'
            </td>
          </tr>
          <tr className={'even:bg-muted m-0 border-t p-0 text-sm text-black dark:text-white dark:even:bg-zinc-900'}>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'detailkey'}></TextCode>
            </td>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'String'}></TextCode>
            </td>
            <td width={400}
                className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              data属性日期字段的设置，需要和data属性的日期key一样
            </td>
          </tr>
          <tr className={'even:bg-muted m-0 border-t p-0 text-sm text-black dark:text-white dark:even:bg-zinc-900'}>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'startWeek'}></TextCode>
            </td>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'1 | 7'}></TextCode>
            </td>
            <td width={400}
                className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              周的第一个位置是周一还是周日，只能输入1或7
            </td>
          </tr>
          <tr className={'even:bg-muted m-0 border-t p-0 text-sm text-black dark:text-white dark:even:bg-zinc-900'}>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'weekType'}></TextCode>
            </td>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'cn | en'}></TextCode>
            </td>
            <td width={400}
                className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              中英文的周显示 cn和en
            </td>
          </tr>
          <tr className={'even:bg-muted m-0 border-t p-0 text-sm text-black dark:text-white dark:even:bg-zinc-900'}>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'latticeHeight'}></TextCode>
            </td>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'Number'}></TextCode>
            </td>
            <td width={400}
                className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              格子的高度，默认40高度;用的定位容器高度由此计算
            </td>
          </tr>
          <tr className={'even:bg-muted m-0 border-t p-0 text-sm text-black dark:text-white dark:even:bg-zinc-900'}>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'isSixRow'}></TextCode>
            </td>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'Boolean'}></TextCode>
            </td>
            <td width={400}
                className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              是否固定展示6行
            </td>
          </tr>
          <tr className={'even:bg-muted m-0 border-t p-0 text-sm text-black dark:text-white dark:even:bg-zinc-900'}>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'visible'}></TextCode>
            </td>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'Boolean'}></TextCode>
            </td>
            <td width={400}
                className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              用于控制显示隐藏,这个使用时需要用v-model:visible; false展开true收起
            </td>
          </tr>
          </tbody>
        </table>
      </>
    ),
  },
  {
    badge: 'sa-calendar-toggle event',
    description: (
      <>
        <p>这是sa-calendar-toggle的事件</p>
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
              <TextCode code={'onDblClick'}></TextCode>
            </td>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'function(item,date)'}></TextCode>
            </td>
            <td width={400}
                className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              格子双击事件
            </td>
          </tr>
          </tbody>
        </table>
      </>
    ),
  },
  {
    badge: 'sa-calendar-toggle slot',
    description: (
      <>
        <p>sa-calendar-toggle的插槽</p>
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
              <TextCode code={'header'}></TextCode>
            </td>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'data'}></TextCode>
            </td>
            <td width={400}
                className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              顶部日期栏信息
            </td>
          </tr>
          <tr className={'even:bg-muted m-0 border-t p-0 text-sm text-black dark:text-white dark:even:bg-zinc-900'}>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'week'}></TextCode>
            </td>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'{ data, index }'}></TextCode>
            </td>
            <td width={400}
                className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              自定义渲染周的方式，data周n为文本
            </td>
          </tr>
          <tr className={'even:bg-muted m-0 border-t p-0 text-sm text-black dark:text-white dark:even:bg-zinc-900'}>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'day'}></TextCode>
            </td>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'{ data, index, row }'}></TextCode>
            </td>
            <td width={400}
                className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              自定义渲染每一天，data是每天的对象，index是一周的索引，row则是一周的数组
            </td>
          </tr>
          </tbody>
        </table>
      </>
    ),
  },
  {
    badge: 'sa-calendar',
    description: (
      <>
        <p>sa-calendar一个月的日历</p>
        <CodeBlock
          language="typescript"
          filename="interface.ts"
          code={`<template>
    <sa-calendar 
        @handleClickDate="handleClickDate" 
        :detailkey="detailkey"
        :startWeek="startWeek" 
        :data="data" 
        :date="date">
    </sa-calendar>
</template>

<script setup>
import { saCalendar, saWeekCalendar,saCalendarToggle } from 'sa-calendar-vue3';
import {ref,reactive} from 'vue';
let detailkey = ref();
let data = reactive([]);
let date = ref(new Date());
let startWeek = ref('1');
const handleClickDate = (item) =>{
    
}
</script>`}
        />
      </>
    ),
  },
  {
    badge: 'sa-calendar props',
    description: (
      <>
        <p>sa-calendar的属性</p>
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
              <TextCode code={'data'}></TextCode>
            </td>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'Array'}></TextCode>
            </td>
            <td width={400}
                className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              数据需要一个日期格式YYYY-MM-DD的key
            </td>
          </tr>
          <tr className={'even:bg-muted m-0 border-t p-0 text-sm text-black dark:text-white dark:even:bg-zinc-900'}>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'date'}></TextCode>
            </td>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'Date \ YYYY-MM-DD'}></TextCode>
            </td>
            <td width={400}
                className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              日历展示的日期
            </td>
          </tr>
          <tr className={'even:bg-muted m-0 border-t p-0 text-sm text-black dark:text-white dark:even:bg-zinc-900'}>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'detailkey'}></TextCode>
            </td>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'String'}></TextCode>
            </td>
            <td width={400}
                className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              data属性日期字段的设置，需要和data属性的日期key一样
            </td>
          </tr>
          <tr className={'even:bg-muted m-0 border-t p-0 text-sm text-black dark:text-white dark:even:bg-zinc-900'}>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'startWeek'}></TextCode>
            </td>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'1 | 7'}></TextCode>
            </td>
            <td width={400}
                className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              周的第一个位置是周一还是周日
            </td>
          </tr>
          <tr className={'even:bg-muted m-0 border-t p-0 text-sm text-black dark:text-white dark:even:bg-zinc-900'}>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'weekType'}></TextCode>
            </td>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'cn | en'}></TextCode>
            </td>
            <td width={400}
                className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              中英文的周显示
            </td>
          </tr>
          </tbody>
        </table>
      </>
    )
  },
  {
    badge: 'sa-calendar event',
    description: (
      <>
        <p>这是sa-calendar的事件</p>
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
              <TextCode code={'handleClickDate'}></TextCode>
            </td>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'function(item)'}></TextCode>
            </td>
            <td width={400}
                className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              点击单格的事件
            </td>
          </tr>
          </tbody>
        </table>
      </>
    ),
  },
  {
    badge: 'sa-calendar slot',
    description: (
      <>
        <p>sa-calendar的插槽</p>
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
              <TextCode code={'header'}></TextCode>
            </td>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'data'}></TextCode>
            </td>
            <td width={400}
                className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              顶部日期栏信息
            </td>
          </tr>
          <tr className={'even:bg-muted m-0 border-t p-0 text-sm text-black dark:text-white dark:even:bg-zinc-900'}>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'dayItem'}></TextCode>
            </td>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'{item}'}></TextCode>
            </td>
            <td width={400}
                className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              自定义渲染每一天，item每天的对象
            </td>
          </tr>
          </tbody>
        </table>
      </>
    ),
  },
  {
    badge: 'sa-week-calendar',
    description: (
      <>
        <p>sa-calendar一个月的日历</p>
        <CodeBlock
          language="typescript"
          filename="interface.ts"
          code={`<template>
    <sa-week-calendar
        @handleClickWeek="handleClickWeek" 
        :detailkey="detailkey"
        :startWeek="startWeek" 
        :data="data" 
        :date="date">
    </sa-week-calendar>
</template>

<script setup>
import { saCalendar, saWeekCalendar,saCalendarToggle } from 'sa-calendar-vue3';
import {ref,reactive} from 'vue';
let detailkey = ref();
let startWeek = ref(1);
let data = reactive([]);
let date = ref(mew Date('2022-10-10'));
const handleClickWeek = (item) =>{
    
}
</script>`}
        />
      </>
    ),
  },
  {
    badge: 'sa-week-calendar props',
    description: (
      <>
        <p>sa-week-calendar props</p>
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
              <TextCode code={'data'}></TextCode>
            </td>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'Array'}></TextCode>
            </td>
            <td width={400}
                className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              数据需要一个日期格式YYYY-MM-DD的key
            </td>
          </tr>
          <tr className={'even:bg-muted m-0 border-t p-0 text-sm text-black dark:text-white dark:even:bg-zinc-900'}>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'date'}></TextCode>
            </td>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'Date \ YYYY-MM-DD'}></TextCode>
            </td>
            <td width={400}
                className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              日历展示的日期
            </td>
          </tr>
          <tr className={'even:bg-muted m-0 border-t p-0 text-sm text-black dark:text-white dark:even:bg-zinc-900'}>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'detailkey'}></TextCode>
            </td>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'String'}></TextCode>
            </td>
            <td width={400}
                className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              data属性日期字段的设置，需要和data属性的日期key一样
            </td>
          </tr>
          <tr className={'even:bg-muted m-0 border-t p-0 text-sm text-black dark:text-white dark:even:bg-zinc-900'}>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'startWeek'}></TextCode>
            </td>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'1 | 7'}></TextCode>
            </td>
            <td width={400}
                className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              周的第一个位置是周一还是周日
            </td>
          </tr>
          <tr className={'even:bg-muted m-0 border-t p-0 text-sm text-black dark:text-white dark:even:bg-zinc-900'}>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'weekType'}></TextCode>
            </td>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'cn | en'}></TextCode>
            </td>
            <td width={400}
                className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              中英文的周显示
            </td>
          </tr>
          </tbody>
        </table>
      </>
    )
  },
  {
    badge: 'sa-calendar event',
    description: (
      <>
        <p>这是sa-calendar的事件</p>
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
              <TextCode code={'handleClickWeek'}></TextCode>
            </td>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'function(item)'}></TextCode>
            </td>
            <td width={400}
                className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              点击单格的事件
            </td>
          </tr>
          </tbody>
        </table>
      </>
    ),
  },
  {
    badge: 'sa-calendar-week slot',
    description: (
      <>
        <p>sa-calendar-week slot</p>
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
              <TextCode code={'weekItem'}></TextCode>
            </td>
            <td
              className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              <TextCode code={'{item}'}></TextCode>
            </td>
            <td width={400}
                className={'border px-4 py-3 text-left font-sans text-sm [&[align=center]]:text-center [&[align=right]]:text-right'}>
              自定义渲染每一天，item每天的对象
            </td>
          </tr>
          </tbody>
        </table>
      </>
    ),
  },
]

export default function(): JSX.Element {
  return <TracingBeam className="px-6 max-w-5xl">
    <div className="mx-auto antialiased pt-4 pb-30 relative">
      {dummyContent.map((item, index) => (
        <div key={`content-${index}`} className="mb-12">
          <h2 className="bg-primary text-primary-foreground rounded-full text-sm w-fit px-4 py-1 mb-4">
            {item.badge}
          </h2>

          <p className="text-xl font-semibold text-primary mb-4">
            {item.title}
          </p>

          <div className="prose prose-base dark:prose-invert leading-relaxed space-y-4">
            {item.description}
          </div>
        </div>
      ))}
    </div>
  </TracingBeam>
}