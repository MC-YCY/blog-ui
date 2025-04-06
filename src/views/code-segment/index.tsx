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

const ContentMap: Record<string, CodeSegmentItem[]> = {
  'CSS': CodeCss,
  'JS': CodeJs,
  'Vue': CodeVue,
  'React': CodeReact,
}
const CodeBlockLanguage: Record<string, { language: string, filename: string }> = {
  'CSS': {
    language: 'css',
    filename: 'demo.css',
  },
  'JS': {
    language: 'js',
    filename: 'demo.js',
  },
  'Vue': {
    language: 'vue',
    filename: 'demo.vue',
  },
  'React': {
    language: 'tsx',
    filename: 'demo.tsx',
  },
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
  return (
    <Container>
      <Tabs
        defaultValue="css"
        value={tabValue}
        onValueChange={setTabValue}
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
        {
          ContentMap[tabValue].map((item) => {
            return <div className={'mt-8'}>
              <p className={'text-primary text-2xl'}>{item.title}</p>
              <p className={'text-foreground opacity-80 my-4'}>{item.description}</p>
              <CodeBlock language={CodeBlockLanguage[tabValue].language}
                         filename={CodeBlockLanguage[tabValue].filename}
                         code={item.code}></CodeBlock>
            </div>
          })
        }
      </div>
    </Container>
  )
}
