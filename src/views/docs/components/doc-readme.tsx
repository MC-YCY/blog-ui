import { JSX } from 'react'
import { TracingBeam } from '@/components/ui/tracing-beam.tsx'
import { DocReadmeListType } from '@/types/doc-readme-list.type.ts'
import { useOptimizedDefer } from '@/hooks/useOptimizedDefer.ts'

export default function({ DocReadmeList }: { DocReadmeList: DocReadmeListType }): JSX.Element {
  const isVisible = useOptimizedDefer(DocReadmeList.length)
  return <TracingBeam className="px-6 max-w-5xl">
    <div className="mx-auto antialiased pt-4 pb-30 relative">
      {DocReadmeList.map((item, index) => (
        isVisible(index) ?
          <div className="mb-12">
            <h2 className="bg-primary text-primary-foreground rounded-full text-sm w-fit px-4 py-1 mb-4">
              {item.badge}
            </h2>
            {item.title && (
              <p className="text-xl font-semibold text-primary mb-4">
                {item.title}
              </p>
            )}
            <div className="prose prose-base dark:prose-invert leading-relaxed space-y-4">
              {item.description}
            </div>
          </div>
          : null
      ))}
    </div>
  </TracingBeam>
}