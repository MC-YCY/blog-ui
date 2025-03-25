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
import { Button } from '@/components/ui/button'

import { uploadUserImages, getUserImages } from '@/api/image.api.ts'
import { useEffect, useState } from 'react'
import useUserStore from '@/stores/userStore.ts'
import { Pagination } from 'antd'
import { toast as Toast } from 'sonner'

const ImageList = () => {
  const [images, setImages] = useState<any[]>([])
  const { user } = useUserStore()
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const getImages = () => {
    if (!user) return
    let params = {
      pageNo: currentPage,
      pageSize: 5,
    }
    getUserImages(user.id, params).then(res => {
      setImages(res.records)
      setTotal(res.total)
    })
  }
  useEffect(() => {
    getImages()
  }, [currentPage])
  const onChange = (p: number) => {
    setCurrentPage(p)
  }
  const clickImg = async (img: { path: string }) => {
    try {
      await navigator.clipboard.writeText(img.path)
      Toast("Tip", {
        description: '已复制到剪切板',
        position: 'bottom-left',
        duration:800
      });
      console.log('复制成功')
      return true
    } catch (err) {

    }
  }
  return <>
    <div className={''}>
      {
        images.map((img: { path: string, originalname: string }) => {
          return <div key={img.path} onClick={() => clickImg(img)} className={'w-full bg-muted p-2 rounded-md mb-2'}>
            {img.originalname}
            <img src={img.path} className={'w-full h-[80px] object-cover rounded-md'} alt="" />
          </div>
        })
      }
    </div>
    <Pagination onChange={onChange} current={currentPage} defaultCurrent={currentPage} size={'small'} total={total}
                pageSize={5} pageSizeOptions={[5, 10, 15]}></Pagination>
  </>
}

const UploadContent = () => {
  const [selectFiles, setSelectFiles] = useState<File[]>([])
  const { user } = useUserStore()
  const handleFileUpload = (files: File[]) => {
    setSelectFiles(files)
  }
  const submit = () => {
    if (selectFiles.length < 0) {
      return
    }
    const formData = new FormData()
    selectFiles.map((file: File) => {
      formData.append('files', file)
    })
    if (!user) return
    uploadUserImages(user?.id, formData).then(res => {
      console.log(res)
    })
  }
  return <div>
    <FileUpload onChange={handleFileUpload} />
    <Button className={'w-full'} onClick={submit}>上传</Button>
  </div>
}

export default function() {
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
            <UploadContent></UploadContent>
          </TabsContent>
        </Tabs>
      </div>
    </SheetContent>
  </Sheet>
}