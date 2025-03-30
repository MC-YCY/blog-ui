import { JSX } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import UserInfo from './components/user-info/user-info.tsx'
import Container from '@/components/container.tsx'
import { TooltipContentItem } from '@/components/ui/tooltip.tsx'
import useUserStore from '@/stores/userStore.ts'

const docsMenu = [
  {
    title:'栏目',
    children:[
      {
        title:'文章',
        href:'/user/posts'
      },
      {
        title:'喜欢',
        href:'/user/like'
      },
      {
        title:'收藏',
        href:'/user/collect'
      },
      {
        title:'关注',
        href:'/user/follow'
      },
      {
        title:'粉丝',
        href:'/user/follower'
      },
      {
        title:'消息',
        href:'/user/message'
      }
    ]
  }
]
const renderMenu = (): JSX.Element =>{
  const location = useLocation(); // 直接用
  const navigate = useNavigate();
  const {user} = useUserStore();
  // ，不需要 useState
  const goRoute = (path: string) =>{
    navigate(path+location.search)
  }
  return <div className={'relative overflow-hidden py-6 pr-6 lg:py-8'}>
    <div className={'h-auto w-full rounded-[inherit]'}>
      <div style={{minWidth:'100%',display:'table'}}>
        <div className={'w-full'}>
          {
            docsMenu.map((controller,index)=>{
              return <div className={'pb-4'} key={'renderMenu'+index}>
                <h4 className={'mb-1 rounded-md px-2 py-1 text-sm font-semibold text-black dark:text-white'}>{controller.title}</h4>
                <div className={'grid grid-flow-row auto-rows-max text-sm'}>
                  {controller.children.map((item)=>{
                    let activeClass = '';
                    if (item.href === location.pathname) {
                      activeClass = 'text-pink-500'
                    }
                    if(item.href === '/user/message' && !user){
                      return null;
                    }
                    return <TooltipContentItem onClick={()=>goRoute(item.href)} key={item.href} className={activeClass}>{item.title}</TooltipContentItem>
                  })}
                </div>
              </div>
            })
          }
        </div>
      </div>
    </div>
  </div>
}

export default function(): JSX.Element {
  return <div>
    <Container>
      <UserInfo></UserInfo>
    </Container>
    <div
      className={'container mx-auto max-w-[88rem] flex-1 items-start px-4 md:grid md:grid-cols-[120px_minmax(0,1fr)] md:gap-0 lg:grid-cols-[120px_minmax(0,1fr)] lg:gap-0 lg:px-8'}>
      <aside
        className={'fixed top-14 z-30 -ml-2 hidden w-full shrink-0 md:sticky md:block md:self-start'}>
        {renderMenu()}
      </aside>
      <main className={'relative lg:gap-10'}>
        <Outlet></Outlet>
      </main>
    </div>
  </div>
}