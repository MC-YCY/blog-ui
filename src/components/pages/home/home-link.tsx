import { Container } from '@/components/project/container.tsx'
import { PartTitle } from '@/components/project/part-title/part-title.tsx'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Grid, Scrollbar } from 'swiper/modules'
import dayjs from 'dayjs'
import { getCardColor } from '@/lib/getCardColor.ts'
import banner from '@/assets/images/panel/25673_thumbnail.png'
import { LinkType } from '@/types/link.ts'
import { useEffect, useRef, useState } from 'react'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Button, SpanButton } from '@/components/ui/button.tsx'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.tsx'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from '@/components/ui/textarea.tsx'
import { toast } from 'sonner'
import { createLink, getLinkList } from '@/api/link.api.ts'

const WriteForm = ({ setOpen, getList }: { setOpen: (arg: boolean) => void, getList: () => void }) => {
  const formSchema = z.object({
    banner: z.string().optional(),
    title: z.string({ required_error: '请输入网站名称' }).min(1, '请输入网站名称'),
    content: z.string({ required_error: '请输入网站描述' }).min(1, '请输入网站描述'),
    url: z.string({ required_error: '请输入网站地址' })
      .url('请输入合法的网址')
      .refine(val => /^https?:\/\//.test(val), {
        message: '地址必须以 http:// 或 https:// 开头',
      }),
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      banner: '',
      content: '',
      url: '',
    },
  })

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    toast('', {
      className: 'max-w-[300px]! flex-wrap! custom-toast',
      description: <Accountability></Accountability>,
      action: {
        label: '提交',
        onClick: async () => {
          await createLink({
            title: formData.title,
            content: formData.content,
            banner: formData.banner || '',
            url: formData.url,
          })
          setOpen(false)
          getList()
        },
      },
      cancel: {
        label: '取消',
        onClick: () => {
          setOpen(false)
        },
      },
      duration: 60000,
    })
  }

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast('请选择有效的图片文件')
      return
    }
    const maxSize = 1024 * 1024 // 1MB
    if (file.size > maxSize) {
      toast('文件大小不能超过1MB')
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      form.setValue('banner', e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveImage = () => {
    form.setValue('banner', '')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
        {/* 封面图上传 */}
        <FormField
          control={form.control}
          name="banner"
          render={() => (
            <FormItem>
              <FormLabel>封面</FormLabel>
              <div className="flex items-center gap-4">
                <div className="relative group w-[100px] h-[60px]">
                  {form.watch('banner') ? (
                    <>
                      <img
                        src={form.watch('banner')}
                        className="w-full h-full object-cover border"
                        alt="banner"
                      />
                      {/* ✅ 悬浮删除图层 */}
                      <div
                        className="absolute inset-0 bg-black bg-opacity-40 text-white flex items-center justify-center text-sm cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={handleRemoveImage}
                      >
                        删除
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full bg-secondary flex items-center justify-center border text-gray-400">
                      预览
                    </div>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleFileUpload(file)
                    }}
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  选择图片
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 网站名称 */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>网站名称</FormLabel>
              <FormControl>
                <Input className="bg-transparent" placeholder="请输入网站名称" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 网站地址 */}
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>网站地址</FormLabel>
              <FormControl>
                <Input className="bg-transparent" placeholder="请输入 http(s) 开头的网址" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 网站描述 */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>网站描述</FormLabel>
              <FormControl>
                <Textarea className="bg-transparent" placeholder="请输入网站描述" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-center">
          <Button type="submit" className="w-full">
            提交
          </Button>
        </div>
      </form>
    </Form>
  )
}

export const Accountability = () => {
  return <div className={'text-left text-[12px] w-full min-w-full'}>
    <div className={'font-bold'}>免责声明</div>
    <div className={'mt-1 text-[#333]'}>
      <div>网站本人独自开发的，为便于与用户交流的留言平台。请不要利用此平台服务制作、上传、下载、复制、发布、传播或者转载如下内容：</div>
      <div>1、反对宪法所确定的基本原则的；</div>
      <div>2、危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家 统一的；</div>
      <div>3、损害国家荣誉和利益的；</div>
      <div>4、煽动民族仇恨、民族歧视，破坏民族团结的；</div>
      <div>5、破坏国家宗教政策，宣扬邪教和封建迷信的；</div>
      <div>6、散布谣言，扰乱社会秩序，破坏社会稳定的；</div>
      <div>7、散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；</div>
      <div>8、侮辱或者诽谤他人，侵害他人合法权益的；</div>
      <div>9、含有法律、行政法规禁止的其他内容的信息。</div>
    </div>
  </div>
}

export const LinkWriteButton = ({ getList }: { getList: () => void }) => {
  const [open, setOpen] = useState(false)
  const clickButton = () => {
    setOpen(true)
  }
  const openChange = () => {

  }
  return <>
    <Drawer open={open} onClose={() => setOpen(false)} onOpenChange={openChange}>
      <DrawerTrigger>
        <SpanButton onClick={() => clickButton()}>添加</SpanButton>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <div className={'max-w-[1400px] mx-auto pb-10'}>
            <DrawerTitle>Hi，请输入一些简单信息用来描述你的网站。</DrawerTitle>
            <WriteForm setOpen={setOpen} getList={getList}></WriteForm>
          </div>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  </>
}

export const HomeLink = () => {
  const [list, setList] = useState<LinkType[]>([
    {
      banner: banner,
      title: '春秋半夏',
      content: `一名吹牛开发工程师什么都不会，这也不学那也不学。
时间轮回, 一年又一年,你还在想着新技术出来了,
继续学习什么NextJs, 什么NuxtJs, 什么NestJs......
而你身边的人, 在考虑啥时候买第二套房子、什么时候生二胎
你还在捣鼓你的破代码.`,
      url: 'https:sa-blog.online',
    },
  ])

  const getList = () => {
    getLinkList().then((res) => {
      // 确保返回的是数组
      const fetchedList = Array.isArray(res) ? res : []

      // 补充欢迎卡片到8个
      const welcomeCards: LinkType[] = []
      const neededCount = 8 - fetchedList.length

      if (neededCount > 0) {
        for (let i = 0; i < neededCount; i++) {
          welcomeCards.push({
            banner: '',
            title: `友链位虚位以待 ${i + 1}`,
            content: '您的博客链接将在这里展示，欢迎交换友链！',
            url: '',
          })
        }
      }
      // 合并原始数据和补充数据
      setList([...fetchedList, ...welcomeCards])
    })
  }
  useEffect(() => {
    getList()
  }, [])
  const goPreview = (link: LinkType) => {
    if (!link.url) {
      return
    }
    toast(`确认传送-#${link.id}-${link.title}`, {
      action: {
        label: 'GO',
        onClick: () => {
          window.open(link.url, '_blank')
        },
      },
    })
  }
  return <Container className={'overflow-x-hidden'}>
    <PartTitle
      title={'友情链接'}
      description={'点击传送'}
      action={<LinkWriteButton getList={getList}></LinkWriteButton>}
    />
    <div
      className="h-[370px] xl:h-[500px] lg:h-[500px] md:h-[500px] mt-3 select-none mt-[2px]] xl:mt-[14px] px-[6px] mx-[-16px]">
      <Swiper
        style={{ padding: '10px 10px' }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            grid: { rows: 2 },
          },
          768: {
            slidesPerView: 3,
            grid: { rows: 2 },
          },
          1024: {
            slidesPerView: 4,
            grid: { rows: 2 },
          },
        }}
        slidesPerView={1}
        grid={{ rows: 1 }}
        spaceBetween={24}
        pagination={{ clickable: true }}
        scrollbar={{
          hide: false,
          horizontalClass: 'custom-swiper-scrollbar',
        }}
        autoplay={{
          delay: 3000,          // 3秒切换
          disableOnInteraction: false, // 用户操作后不停止
          pauseOnMouseEnter: true,      // 鼠标悬停暂停
        }}
        modules={[Grid, Scrollbar, Autoplay]}
        className="w-full h-full ml-auto mr-auto pb-5!"
      >
        {
          list.map((item,idx) => {
            return (
              <SwiperSlide
                key={`links-${idx}`}
                style={{
                  backgroundImage: `url(${item.banner})`,
                  backgroundSize: '100% 100%',
                }}
                onClick={() => goPreview(item)}
                className={`relative cursor-pointer transition-[all_0.3s_linear] border rounded-2xl box-border shadow-[0_0_10px_rgba(0,0,0,0.1)] dark:shadow-[0_0_8px_rgba(255,255,255,.1)]`}
              >
                <div
                  className="absolute inset-[-1px] group hover:backdrop-blur-[0px] hover:bg-[rgba(0,0,0,0)] hover:dark:bg-[rgba(0,0,0,.3)] transition-all duration-300 flex flex-col py-[11px] px-4 rounded-2xl backdrop-blur-[3px] bg-[rgba(255,255,255,.3)] dark:bg-[rgba(0,0,0,.6)]"
                  style={{
                    backgroundImage: getCardColor(.2, .2),
                  }}>
                  <div
                    className="group-hover:opacity-0 transition-all duration-300 text-foreground line-clamp-10 xl:line-clamp-5 lg:line-clamp-5 md:line-clamp-5">
                    {item.content}
                  </div>
                  <div className="mt-auto">
                    <div className="flex items-center">
                      <span className="font-bold text-[14px]">
                                              {item.title}
                                            </span>
                    </div>
                    <div className="text-[12px] text-foreground opacity-75 mt-2">
                      {dayjs(item.date).format('YYYY/MM/DD HH:mm:ss')}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </div>
  </Container>
}