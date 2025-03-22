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
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp.tsx'
import styles from '@/views/auth/login/index.module.css'
import { Button } from '@/components/ui/button.tsx'
import useUserStore from '@/stores/userStore.ts'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { getCaptchaApi, loginApi } from '@/api/auth.api.ts'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

export default function LoginForm() {
  const userStore = useUserStore()
  const navigate = useNavigate()
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // 表单验证规则
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

  // 表单初始化
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      account: '',
      password: '',
      captchaCode: '',
    },
  })

  // 提交处理
  const onSubmit = (formState: z.infer<typeof formSchema>) => {
    loginApi({
      ...formState,
      captchaId: captcha.captchaId
    }).then(res => {
      userStore.login(res.user, {
        accessToken: res.access_token,
        refreshToken: res.refresh_token
      })
      const redirect = new URLSearchParams(location.search).get('redirect')
      navigate(redirect || '/home', { replace: true })
    })
  }

  // 验证码相关状态
  const [captcha, setCaptcha] = useState<{ svg: string; captchaId: string }>({
    svg: '',
    captchaId: '',
  })
  const [captchaLoading, setCaptchaLoading] = useState(false)
  const [captchaTime, setCaptchaTime] = useState(0)

  // 获取验证码
  const getCaptcha = () => {
    if (captchaLoading) {
      toast('提示', {
        description: '等待倒计时结束',
        action: { label: '确定', onClick: () => null },
      })
      return
    }

    getCaptchaApi().then(res => {
      // 清除旧定时器
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }

      // 初始化倒计时
      setCaptchaLoading(true)
      let countdown = 15
      setCaptchaTime(countdown)

      // 启动新定时器
      timerRef.current = setInterval(() => {
        countdown -= 1
        setCaptchaTime(countdown)

        if (countdown <= 0) {
          setCaptchaLoading(false)
          if (timerRef.current) {
            clearInterval(timerRef.current)
            timerRef.current = null
          }
        }
      }, 1000)

      setCaptcha(res)
    })
  }

  // 组件挂载时获取初始验证码
  useEffect(() => {
    getCaptcha()

    // 组件卸载时清理
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* 账号输入 */}
        <FormField
          control={form.control}
          name="account"
          render={({ field }) => (
            <FormItem>
              <FormLabel>账号</FormLabel>
              <FormControl>
                <Input placeholder="请输入账号" {...field} />
              </FormControl>
              <FormDescription>这是用户账号</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 密码输入 */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>密码</FormLabel>
              <FormControl>
                <Input type="password" placeholder="请输入密码" {...field} />
              </FormControl>
              <FormDescription>这是用户密码</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 验证码区域 */}
        <div className="flex gap-4">
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
                        {[...Array(4)].map((_, i) => (
                          <InputOTPSlot key={i} index={i} className="flex-1" />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>请输入验证码</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* 验证码图形 */}
          <div
            className={styles.loginFormCaptcha}
            onClick={getCaptcha}
            aria-disabled={captchaLoading}
          >
            <div
              className={styles.loginFormCaptchaSvg}
              dangerouslySetInnerHTML={{ __html: captcha.svg }}
            />
            {captchaLoading && (
              <div className={styles.loginFormCaptchaLoading}>
                {captchaTime}s
              </div>
            )}
          </div>
        </div>

        {/* 提交按钮 */}
        <div className="flex justify-center">
          <Button type="submit" className="w-full">
            登录
          </Button>
        </div>
      </form>
    </Form>
  )
}