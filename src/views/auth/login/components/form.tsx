import styles from '../index.module.css'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/shadcn-tabs.tsx'
import FormLogin from './form-login.tsx';
import FormRegister from './form-register.tsx';
import { CodeBlock } from "@/components/ui/code-block";
import { useState } from 'react'

const codeMap:Record<string, string> = {
  login:`import { z } from 'zod'
const formSchema = z.object({
  account: z.string()
    .nonempty('请输入账号')
    .regex(/^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,16}$/, '需包含字母和数字组合')
    .min(6, '请输入账号长度6-16位')
    .max(16, '请输入账号长度6-16位'),
  password: z.string()
    .nonempty('请输入密码')
    .min(6, '密码长度6-16位')
    .max(16, '密码长度6-16位')
    .regex(/^[A-Za-z0-9.]+$/, '包含非法字符'),
  captchaCode: z.string().min(4, '补全验证码').nonempty('请输入验证码'),
})
const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    account: '',
    password: '',
    captchaCode: '',
  },
})`,
  register:`import { z } from 'zod'
const formSchema = z.object({
  account: z.string()
    .nonempty('请输入账号')
    .regex(/^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,16}$/, '需包含字母和数字组合')
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
})`
}
const LoginForm = () => {
  const [tabValue, setTabValue] = useState('login');

  return (
    <div className={styles.loginForm + ' bg-white dark:bg-slate-900 rounded-lg'}>
      <div className={styles.loginFormBanner}>
        <CodeBlock
          className={'h-full'}
          language="tsx"
          filename="Form.tsx"
          code={codeMap[tabValue]}
        />
      </div>
      <div className={styles.loginFormContent}>
        <Tabs
          defaultValue="login"
          value={tabValue}
          onValueChange={setTabValue}
        >
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="login">登录</TabsTrigger>
            <TabsTrigger value="register">注册</TabsTrigger>
          </TabsList>

          {/* 关键修改：添加 forceMount 属性 */}
          <TabsContent value="login" forceMount style={{ display: tabValue === 'login' ? 'block' : 'none' }}>
            <FormLogin />
          </TabsContent>

          <TabsContent value="register" forceMount style={{ display: tabValue === 'register' ? 'block' : 'none' }}>
            <FormRegister />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
export default LoginForm