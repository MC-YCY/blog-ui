import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/shadcn-tabs.tsx'
import { FileUpload } from '@/components/ui/file-upload'
import banner from '@/assets/images/hero/angular.png'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"

const ImageList = () => {
  return <>
    <div className={'flex px-0 py-2'}>
      <Input placeholder={'请输入文件名'}></Input>
      <Button>搜索</Button>
    </div>
    <div className={''}>
      <div className={'w-full h-[80px] bg-muted p-2 rounded-md mb-2'}>
        <img src={banner} className={'w-full h-full object-cover rounded-md'} alt="" />
      </div>
      <div className={'w-full h-[80px] bg-muted p-2 rounded-md mb-2'}>
        <img src={banner} className={'w-full h-full object-cover rounded-md'} alt="" />
      </div>
      <div className={'w-full h-[80px] bg-muted p-2 rounded-md mb-2'}>
        <img src={banner} className={'w-full h-full object-cover rounded-md'} alt="" />
      </div>
      <div className={'w-full h-[80px] bg-muted p-2 rounded-md mb-2'}>
        <img src={banner} className={'w-full h-full object-cover rounded-md'} alt="" />
      </div>
      <div className={'w-full h-[80px] bg-muted p-2 rounded-md mb-2'}>
        <img src={banner} className={'w-full h-full object-cover rounded-md'} alt="" />
      </div>
      <div className={'w-full h-[80px] bg-muted p-2 rounded-md mb-2'}>
        <img src={banner} className={'w-full h-full object-cover rounded-md'} alt="" />
      </div>
    </div>
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive>2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>3</PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  </>
}

export default function() {
  const handleFileUpload = (files: File[]) => {
    console.log(files)
  }
  return <Sheet>
    <SheetTrigger>
      <div
        className={'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*=\'size-\'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3 mx-4'}>图片资源
      </div>
    </SheetTrigger>
    <SheetContent>
      <div className={'flex flex-col h-full w-full'}>
        <SheetHeader>
          <SheetTitle>需要图片，请上传或复制链接</SheetTitle>
          <SheetDescription>
            用户拥有自己的图片资源，需要图片可上传或复制已有图片链接
          </SheetDescription>
        </SheetHeader>
        <Tabs defaultValue="list" className="w-full flex-1 flex flex-col mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list">列表</TabsTrigger>
            <TabsTrigger value="upload">上传</TabsTrigger>
          </TabsList>
          <TabsContent className={'flex-1 overflow-auto h-[0px]'} value="list">
            <ImageList></ImageList>
          </TabsContent>
          <TabsContent className={'flex-1 overflow-auto h-[0px]'} value="upload">
            <FileUpload onChange={handleFileUpload} />
          </TabsContent>
        </Tabs>
      </div>
    </SheetContent>
  </Sheet>
}