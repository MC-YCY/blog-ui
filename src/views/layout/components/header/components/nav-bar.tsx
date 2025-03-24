import * as React from 'react'

import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { joinPath, NavBarRouters } from '@/constant/routers.ts'
import { useLocation, useNavigate } from 'react-router-dom'
import { DocsMenu } from '@/constant/docs-menu.ts'

const components: { title: string; href: string; description: string }[] = DocsMenu[0].children;

const NavBar = () => {
  const location = useLocation(); // 直接用
  const navigate = useNavigate()
  // ，不需要 useState
  const goRoute = (path: string) =>{
      navigate(path)
  }
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  onClick={()=>goRoute(component.href)}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {
          NavBarRouters.map((item) => {
            const itemPath = `/${joinPath(item.path)}`
            let activeClass = ''
            if (itemPath === location.pathname) {
              activeClass = ' text-pink-500'
            }
            if((item.children && item.children.length)) return null;
            return <NavigationMenuItem key={item.path}>
              <div className="cursor-pointer">
                <NavigationMenuLink onClick={() => goRoute(itemPath)} className={navigationMenuTriggerStyle()}>
                  <span className={activeClass}>
                  {item.meta?.title}
                  </span>
                </NavigationMenuLink>
              </div>
            </NavigationMenuItem>
          })
        }
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <div
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </div>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'
export default NavBar