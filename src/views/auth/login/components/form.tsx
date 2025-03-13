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
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp.tsx'
import { TextGenerateEffect } from '@/components/ui/text-generate-effect.tsx'
import LoginBanner from '@/assets/images/login-banner.svg'
import { getCaptchaApi, loginApi } from '@/api/auth.api.ts'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import useUserStore from '@/stores/userStore.ts'
import { useNavigate } from 'react-router-dom'

const LoginFormTitle = () => {
  const words = 'L o g i n'
  return <h1 className="text-2xl mb-4 mt-2">
    <TextGenerateEffect words={words} />
  </h1>
}

const LoginForm = () => {
  const userStore = useUserStore()
  const navigate = useNavigate()

  const formSchema = z.object({
    account: z.string()
      .nonempty('请输入您的账号')
      .regex(/^[A-Za-z0-9]+$/, '账号只能包含字母和数字'),
    password: z.string()
      .nonempty('请输入您的密码')
      .min(6, '密码长度不能少于6位')
      .max(16, '密码长度不能超过16位')
      .regex(/^[A-Za-z0-9.]+$/, '账号只能包含字母、数字和"."'),
    captchaCode: z.string().min(4, '补全验证码').nonempty('请输入验证码'),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      account: '',
      password: '',
      captchaCode: '',
    },
  })
  const onSubmit = (formState: Record<string, any>) => {
    let params = {
      ...formState,
      captchaId: captcha.captchaId,
    }
    loginApi(params).then(res => {
      userStore.login(res.user, { accessToken: res.access_token, refreshToken: res.refresh_token })
      navigate('/home')
    })
  }

  const [captcha, setCaptcha] = useState<Record<string, string>>({
    svg: '',
    captchaId: '',
  })
  const [captchaLoading, setCaptchaLoading] = useState<any>(null)
  const [captchaTime, setCaptchaTime] = useState<any>(null)
  const getCaptcha = () => {
    if (captchaLoading) {
      toast('提示', {
        description: '等待倒计时结束', action: {
          label: 'Undo',
          onClick: ()=>null
        },
      })
      return
    }
    getCaptchaApi().then(res => {
      setCaptchaLoading(true);
      const s = 15;
      setCaptchaTime(s);
      let timer: any = setInterval(()=>{
        console.log('s')
        setCaptchaTime((v:number)=>{
          let newV = v - 1;
          if(newV <= 0){
            setCaptchaLoading(false);
            clearInterval(timer);
            timer = null;
          }
          return newV;
        });
      },1000)
      setCaptcha(res);
    })
  }
  useEffect(() => {
    getCaptcha()
  }, [])
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
                name="captchaCode"
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
            <div className={styles.loginFormCaptcha} onClick={getCaptcha}>
              <div className={styles.loginFormCaptchaSvg} dangerouslySetInnerHTML={{ __html: captcha.svg }}></div>
              {captchaLoading ? <div className={styles.loginFormCaptchaLoading}>{captchaTime}</div> : null}
            </div>
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