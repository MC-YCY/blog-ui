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

const UserInfo = ({ user }: { user: User }) => {
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
            <li>
              <a
                href="#"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
              >
                首页
              </a>
            </li>
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
  // , tokens, isLoggedIn, login, logout, updateUser, updateTokens
  const { user } = useUserStore()
  const navigate = useNavigate()

  const toLogin = (): void => {
    navigate('/login')
  }

  return <>
    {
      user ?
        <UserInfo user={user}></UserInfo> :
        <UserLogin toLogin={toLogin}></UserLogin>
    }
  </>
}
export default ThemeButton