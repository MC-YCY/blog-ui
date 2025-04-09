import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { RowsIcon } from '@radix-ui/react-icons'
import { DocsMenu } from '@/constant/docs-menu.ts'
import { TooltipContentItem } from '@/components/ui/tooltip.tsx'
import { useNavigate } from 'react-router-dom'
import { joinPath, NavBarRouters } from '@/constant/routers.ts'

const components: { title: string; href: string; description: string }[] = DocsMenu[0].children

const DrawerButton = () => {
  const navigate = useNavigate()
  const toPage = (path:string) => {
    navigate(path)
  }
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost">
          <RowsIcon></RowsIcon>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <div className="p-4 pb-0">
            <div className="mt-3 h-[30vh]">
              {components.map((component) => {
                let activeClass = ''
                if (component.href === location.pathname) {
                  activeClass = ' text-pink-500'
                }
                return <TooltipContentItem className={activeClass} onClick={() => toPage(component.href)}>{component.title}</TooltipContentItem>
              })}
              {
                NavBarRouters.map((item) => {
                  const itemPath = `/${joinPath(item.path)}`
                  let activeClass = ''
                  if (itemPath === location.pathname) {
                    activeClass = ' text-pink-500'
                  }
                  if((item.children && item.children.length)) return null;
                  return <TooltipContentItem  className={activeClass} key={item.path} onClick={() => toPage(item.path)}>{item?.meta?.title}</TooltipContentItem>
                })
              }
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
export default DrawerButton