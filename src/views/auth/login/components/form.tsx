import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Button } from '@/components/ui/button.tsx'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import styles from '../index.module.css'
import temCaptcha from '@/assets/images/wallhaven-zyl6dw.png'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp.tsx'
import { TextGenerateEffect } from '@/components/ui/text-generate-effect.tsx'
import LoginBanner from '@/assets/images/login-banner.svg'

const LoginFormTitle = () => {
  const words = 'L o g i n'
  return <h1 className="text-2xl mb-4 mt-2">
    <TextGenerateEffect words={words} />
  </h1>
}

const LoginForm = () => {
  const formSchema = z.object({
    account: z.string().nonempty('请输入您的账号'),
    password: z.string().nonempty('请输入您的密码'),
    captcha: z.string().nonempty('请输入验证码'),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      account: '',
      password: '',
      captcha: '',
    },
  })
  const onSubmit = () => {

  }
  return <div className={styles.loginForm + ' bg-white dark:bg-gray-800 rounded-lg'}>
    <div className={styles.loginFormBanner}>
      <img src={LoginBanner} alt="" />
    </div>
    <div className={styles.loginFormContent}>
      <LoginFormTitle></LoginFormTitle>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="account"
            render={({ field }) => (
              <FormItem>
                <FormLabel>账号</FormLabel>
                <FormControl>
                  <Input placeholder="请输入账号" {...field} />
                </FormControl>
                <FormDescription>
                  这是用户账号
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>密码</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="请输入密码" {...field} />
                </FormControl>
                <FormDescription>
                  这是用户密码
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="captcha"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>验证码</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup className="w-full">
                          <InputOTPSlot className="flex-1" index={0} />
                          <InputOTPSlot className="flex-1" index={1} />
                          <InputOTPSlot className="flex-1" index={2} />
                          <InputOTPSlot className="flex-1" index={3} />
                          <InputOTPSlot className="flex-1" index={4} />
                          <InputOTPSlot className="flex-1" index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      请输入验证码
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <img className={styles.loginFormCaptcha} src={temCaptcha} alt="" />
          </div>
          <div className="flex justify-center">
            <Button type="submit">登录</Button>
          </div>
        </form>
      </Form>
    </div>
  </div>
}
export default LoginForm