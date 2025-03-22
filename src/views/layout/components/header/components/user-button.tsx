import { PersonIcon } from '@radix-ui/react-icons'
import useUserStore, { User } from '@/stores/userStore.ts'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import UserIcon from '@/assets/images/user.png'
import { useNavigate } from 'react-router-dom'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const userMenus = [
  {
    name: '创作',
    path: '/create',
  },
  {
    name: '我的文章',
    path: '/user/posts',
  },
  {
    name: '我的喜欢',
    path: '/user/like',
  },
  {
    name: '我的收藏',
    path: '/user/collect',
  },
]

const UserInfo = ({ user, goPath, clickLogout }: {
  user: User,
  goPath: (path: string) => void,
  clickLogout: () => void
}) => {
  return <>
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger>
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.avatar ? user?.avatar : UserIcon} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        <TooltipContent>
          {
            userMenus.map((item) => {
              return <div key={item.path} onClick={() => goPath(item.path)}
                          className={'cursor-pointer group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:text-pink-300  hover:translate-x-1 transition duration-200 text-muted-foreground'}>
                {item.name}
              </div>
            })
          }
          <div onClick={clickLogout}
               className={'cursor-pointer group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:text-pink-300  hover:translate-x-1 transition duration-200 text-muted-foreground'}>
            退出登录
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </>
}

const UserLogin = ({ toLogin }: any) => {
  return <>
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger>
          <span
            className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 has-[>svg]:px-3`}
            onClick={toLogin}>
            <PersonIcon></PersonIcon>
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>点击登录</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </>
}

const ThemeButton = () => {
  const { user, logout } = useUserStore()
  const navigate = useNavigate()

  const toLogin = (): void => {
    navigate('/login')
  }
  const goPath = (path: string): void => {
    let userId = user?.id || '';
    if (!userId) {
      navigate(path);
    }else{
      navigate(path+'?userId='+userId)
    }
  }
  const clickLogout = () => {
    navigate('/');
    logout()
  }
  return <>
    {
      user ?
        <UserInfo user={user} goPath={goPath} clickLogout={clickLogout}></UserInfo> :
        <UserLogin toLogin={toLogin}></UserLogin>
    }
  </>
}
export default ThemeButton