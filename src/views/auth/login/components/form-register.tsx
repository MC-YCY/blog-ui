import {
  Form,
  FormControl, FormDescription,
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
import { getCaptchaApi, userRegisterApi } from '@/api/auth.api.ts' // 修改为注册接口
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { localhostUpload } from '@/api/upload.api.ts'

export default function RegisterForm() {
  const userStore = useUserStore()
  const navigate = useNavigate()
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 扩展表单验证规则
  const formSchema = z.object({
    account: z.string()
      .nonempty('请输入账号')
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/, '需包含字母和数字组合')
      .min(6, '请输入账号长度6-16位')
      .max(16, '请输入账号长度6-16位'),
    password: z.string()
      .nonempty('请输入密码')
      .min(6, '密码长度6-16位')
      .max(16, '密码长度6-16位')
      .regex(/^[A-Za-z0-9.]+$/, '包含非法字符'),
    username: z.string()
      .nonempty('请输入用户名')
      .min(2, '用户名至少2位')
      .max(16, '用户名最多16位'),
    avatar: z.string().optional(),
    captchaCode: z.string().min(4, '验证码').nonempty('请输入验证码'),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      account: '',
      password: '',
      username: '',
      avatar: '',
      captchaCode: '',
    },
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 提交处理
  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    let params: z.infer<typeof formSchema> = { ...formData }
    if (selectedFile) {
      const formData = new FormData()
      formData.append('file', selectedFile)
      const { fileUrl } = await localhostUpload(formData)
      params.avatar = fileUrl
    } else {
      params.avatar = undefined
    }
    try {
      const info = await userRegisterApi({ ...params, captchaId: captcha.captchaId, roldId: 1, signature: '' });
      userStore.login(info.user, {
        accessToken: info.access_token,
        refreshToken: info.refresh_token
      })
      const redirect = new URLSearchParams(location.search).get('redirect')
      navigate(redirect || '/home', { replace: true })
    } finally {
      setIsSubmitting(false)
    }
  }

  // 头像上传处理
  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast('请选择有效的图片文件')
      return
    }
    // 限制文件大小（示例限制为2MB）
    const maxSize = 1024 * 1024 // 2MB
    if (file.size > maxSize) {
      toast('文件大小不能超过1MB')
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      form.setValue('avatar', e.target?.result as string)
    }
    reader.readAsDataURL(file)
    setSelectedFile(file)
  }

  // 验证码相关状态
  const [captcha, setCaptcha] = useState<{ svg: string; captchaId: string }>({
    svg: '',
    captchaId: '',
  })
  const [captchaLoading, setCaptchaLoading] = useState(false)
  const [captchaTime, setCaptchaTime] = useState(0)

  // 获取验证码（同登录页面）
  const getCaptcha = () => {
    if (captchaLoading) {
      toast('请等待倒计时结束')
      return
    }

    getCaptchaApi().then(res => {
      if (timerRef.current) clearInterval(timerRef.current)

      setCaptchaLoading(true)
      let countdown = 15
      setCaptchaTime(countdown)

      timerRef.current = setInterval(() => {
        countdown -= 1
        setCaptchaTime(countdown)
        if (countdown <= 0) {
          setCaptchaLoading(false)
          clearInterval(timerRef.current!)
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
        {/* 头像上传 */}
        <FormField
          control={form.control}
          name="avatar"
          render={() => (
            <FormItem>
              <FormLabel>头像</FormLabel>
              <div className="flex items-center gap-4">
                <div className="relative">
                  {form.watch('avatar') ? (
                    <img
                      src={form.watch('avatar')}
                      className="w-16 h-16 rounded-full object-cover border"
                      alt="Avatar"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                      <span className="text-gray-400">预览</span>
                    </div>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleFileUpload(file)
                    }}
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  选择头像
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 用户名 */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>用户名</FormLabel>
              <FormControl>
                <Input className={'bg-transparent'} placeholder="请输入用户名" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 账号 */}
        <FormField
          control={form.control}
          name="account"
          render={({ field }) => (
            <FormItem>
              <FormLabel>账号</FormLabel>
              <FormControl>
                <Input className={'bg-transparent'} placeholder="6-16位字母数字组合" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 密码 */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>密码</FormLabel>
              <FormControl>
                <Input className={'bg-transparent'} type="password" placeholder="6-16位字符" {...field} />
              </FormControl>
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
                          <InputOTPSlot key={i} index={i} className="flex-1 bg-transparent" />
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
        <div className={'flex justify-center'}>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            注册并登录
          </Button>
        </div>
      </form>
    </Form>
  )
}