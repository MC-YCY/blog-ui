import useUserStore from '@/stores/userStore.ts'
import { Separator } from '@/components/ui/separator'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Button } from '@/components/ui/button.tsx'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from '@/components/ui/textarea.tsx'
import { updateUserInfo } from '@/api/user.api.ts'
import { useRef } from 'react'
import { localhostUpload } from '@/api/upload.api.ts'

export default function() {
  const { user, updateUser } = useUserStore()
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
      updateUser(newUserInfo)
      userEditEl.current?.click()
    }
  }
  const clickEditUserInfo = () => {
    if (user) {
      form.setValue('username', user?.username)
      form.setValue('signature', user?.signature)
    }
  }

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const clickAvatar = () => {
    fileInputRef?.current?.click()
  }
  const fileInputChange = async () => {
    if (fileInputRef?.current?.files && fileInputRef?.current?.files.length && user?.id) {
      let file = fileInputRef.current?.files[0]
      let formData = new FormData()
      formData.append('file', file)
      const { fileUrl: avatar } = await localhostUpload(formData)
      const newUserInfo = await updateUserInfo(user?.id, {
        avatar,
      })
      updateUser(newUserInfo)
    }
  }

  return <div className={'flex justify-center flex-col items-center py-10 pr-6'}>
    <div>
      <div className="space-y-1">
        <img className={'w-14 h-14 object-cover'} onClick={clickAvatar} src={user?.avatar} alt="" />
        <input type="file" style={{ display: 'none' }} ref={fileInputRef} onChange={fileInputChange} />
        <h4 className="text-sm font-medium leading-none">{user?.username}</h4>
        <p className="text-sm text-muted-foreground">{user?.signature || '知其然不知其所以然'}</p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div className={'cursor-pointer'}>粉丝</div>
        <Separator orientation="vertical" />
        <Popover>
          <PopoverTrigger asChild>
            <div className={'cursor-pointer'} ref={userEditEl} onClick={clickEditUserInfo}>编辑</div>
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
      </div>
    </div>
  </div>
}