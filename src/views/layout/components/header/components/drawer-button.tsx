import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { RowsIcon } from '@radix-ui/react-icons'

const DrawerButton = () =>{
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
            <div className="mt-3 h-[120px]">
             content
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
export default DrawerButton;