import { Button } from '@/components/ui/button.tsx'
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
          <Button variant="ghost" onClick={toLogin}>
            <PersonIcon></PersonIcon>
          </Button>
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