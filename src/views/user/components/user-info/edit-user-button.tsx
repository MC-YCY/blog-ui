import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Textarea } from '@/components/ui/textarea.tsx'
import { Button } from '@/components/ui/button.tsx'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRef } from 'react'
import { updateUserInfo } from '@/api/user.api.ts'
import { User } from '@/stores/userStore.ts'

interface EditUserProps{
  user: User | null
  updateOk: (user: User) => void
}

export default function({ user, updateOk }: EditUserProps) {
  const formSchema = z.object({
    username: z.string()
      .nonempty('请输入用户名'),
    signature: z.string(),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      signature: '',
    },
  })
  const userEditEl = useRef<HTMLInputElement | null>(null)
  const onSubmit = async (formState: Record<string, any>) => {
    let params = {
      ...formState,
    }
    if (user?.id) {
      const newUserInfo = await updateUserInfo(user?.id, params)
      updateOk(newUserInfo)
      userEditEl.current?.click()
    }
  }
  const clickEditUserInfo = () => {
    if (user) {
      form.setValue('username', user?.username)
      form.setValue('signature', user?.signature)
    }
  }
  return <Popover>
    <PopoverTrigger asChild>
      <div className={'cursor-pointer  whitespace-nowrap'} ref={userEditEl} onClick={clickEditUserInfo}>编辑</div>
    </PopoverTrigger>
    <PopoverContent className="w-80 z-1000000">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className={'bg-transparent dark:bg-transparent'}>
                <FormLabel>用户名</FormLabel>
                <FormControl>
                  <Input className={'bg-transparent dark:bg-transparent'} placeholder="请输入用户名" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="signature"
            render={({ field }) => (
              <FormItem className={'bg-transparent dark:bg-transparent'}>
                <FormLabel>个性签名</FormLabel>
                <FormControl>
                  <Textarea className={'bg-transparent dark:bg-transparent'}
                            placeholder="请输入个性签名" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <Button type="submit">修改</Button>
          </div>
        </form>
      </Form>
    </PopoverContent>
  </Popover>
}