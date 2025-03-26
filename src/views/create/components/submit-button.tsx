import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet.tsx'
import { ArticleTags } from '@/constant/article-tags.ts'
import MultiSelect from '@/components/ui/multi-select.tsx'
import { Textarea } from '@/components/ui/textarea.tsx'
import { Button } from '@/components/ui/button.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input.tsx'

export default function({ submit }: { submit: (formState: Record<string, any>) => void }) {
  const formSchema = z.object({
    tags: z.array(z.string()).nonempty("请选择标签"),
    readme: z.string().nonempty("请输入描述"),
    banner: z.string().nonempty('请输入封面图片地址')
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tags: [],
      readme: '',
      banner: ''
    },
  })

  const onSubmit = (formState: Record<string, any>) => {
    submit(formState)
  }

  return <Sheet>
    <SheetTrigger>
      <div
        className={'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*=\'size-\'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3'}>发布
      </div>
    </SheetTrigger>
    <SheetContent>
      <div className={'flex flex-col h-full w-full'}>
        <SheetHeader>
          <SheetTitle>发布后审核</SheetTitle>
          <SheetDescription>
            有争议的文章将被驳回
          </SheetDescription>
        </SheetHeader>
        <div className={'h-6'}></div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem className={'bg-transparent dark:bg-transparent'}>
                  <FormLabel>tags</FormLabel>
                  <FormControl>
                    <MultiSelect options={ArticleTags} {...field}></MultiSelect>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="readme"
              render={({ field }) => (
                <FormItem className={'bg-transparent dark:bg-transparent'}>
                  <FormLabel>描述</FormLabel>
                  <FormControl>
                    <Textarea className={'bg-transparent dark:bg-transparent'}
                              placeholder="描述" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="banner"
              render={({ field }) => (
                <FormItem className={'bg-transparent dark:bg-transparent'}>
                  <FormLabel>封面</FormLabel>
                  <FormControl>
                    <Input className={'bg-transparent dark:bg-transparent'}
                              placeholder="请输入封面图片路径" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center">
              <Button type="submit">确定</Button>
            </div>
          </form>
        </Form>
      </div>
    </SheetContent>
  </Sheet>
}