import { PersonIcon } from '@radix-ui/react-icons'
import useUserStore from '@/sotres/userStore.ts'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import UserIcon from '@/assets/images/user.png'
import { useNavigate } from 'react-router-dom'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const UserInfo = () => {
  return <>
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar className="h-8 w-8">
          <AvatarImage src={UserIcon} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </>
}

const UserLogin = ({toLogin}:any) => {
  return <>
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger>
          <span className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 has-[>svg]:px-3`} onClick={toLogin}>
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
        <UserInfo></UserInfo> :
        <UserLogin toLogin={toLogin}></UserLogin>
    }
  </>
}
export default ThemeButton