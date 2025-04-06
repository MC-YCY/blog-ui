import {
  Tabs,
  TabsList,
  TabsTrigger,
} from '@/components/ui/shadcn-tabs.tsx'
import Container from '@/components/container.tsx'
import { useState } from 'react'
import { CodeCss, CodeJs, CodeReact, CodeVue } from './constant'
import { CodeBlock } from '@/components/ui/code-block.tsx'
import { CodeSegmentItem } from '@/types/code-segment.ts'
import { useOptimizedDefer } from '@/hooks/useOptimizedDefer.ts'
import { TracingBeam } from '@/components/ui/tracing-beam.tsx'

const ContentMap: Record<string, CodeSegmentItem[]> = {
  'CSS': CodeCss,
  'JS': CodeJs,
  'Vue': CodeVue,
  'React': CodeReact,
}

export default function() {
  const [tabValue, setTabValue] = useState('CSS')
  const [tabTypeList] = useState<{ label: string, value: string }[]>([
    {
      label: 'CSS',
      value: 'CSS',
    },
    {
      label: 'JS',
      value: 'JS',
    },
    {
      label: 'Vue',
      value: 'Vue',
    },
    {
      label: 'React',
      value: 'React',
    },
  ])
  // defer 加载dom优化
  const isVisible = useOptimizedDefer(ContentMap[tabValue].length)
  return (
    <Container className={'pt-10'}>
      <Tabs
        defaultValue="css"
        value={tabValue}
        onValueChange={setTabValue}
        className={' z-[150] sticky top-[64px]'}
      >
        <TabsList className="grid grid-cols-4">
          {
            tabTypeList.map((tab) => {
              return <TabsTrigger key={tab.value} value={tab.value}>{tab.label}</TabsTrigger>
            })
          }
        </TabsList>
      </Tabs>
      <div className={'pb-10'}>
        <TracingBeam className="w-full min-w-full">
          {
            ContentMap[tabValue].map((item, index) => {
              return isVisible(index) ? <div className={'mt-8'}>
                  <p className={'text-primary text-2xl'}>{item.title}</p>
                  <p className={'text-foreground opacity-80 my-4'}>{item.description}</p>
                  {
                    item.code instanceof Array ? <>
                    {
                      item.code.map((code)=>{
                        return <CodeBlock className={'mt-2'} language={code.language}
                                   filename={code.filename}
                                   code={code.content}></CodeBlock>
                      })
                    }
                    </> : <CodeBlock language={item.code.language}
                                     filename={item.code.filename}
                                     code={item.code.content}></CodeBlock>
                  }
                </div>
                : null
            })
          }
        </TracingBeam>
      </div>
    </Container>
  )
}
