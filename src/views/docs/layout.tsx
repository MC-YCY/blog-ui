import { JSX } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const docsMenu = [
  {
    title:'calendar',
    children:[
      {
        title:'sa-calendar-react',
        href:'/docs/sa-calendar-react'
      },
      {
        title:'sa-calendar-vue3',
        href:'/docs/sa-calendar-vue3'
      }
    ]
  }
]
const renderMenu = (): JSX.Element =>{
  const location = useLocation(); // 直接用
  const navigate = useNavigate()
  // ，不需要 useState
  const goRoute = (path: string) =>{
    navigate(path)
  }
  return <div className={'relative overflow-hidden h-full py-6 pr-6 lg:py-8'}>
    <div className={'h-full w-full rounded-[inherit]'}>
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
                      activeClass = 'text-pink-500 '
                    }
                    return <div
                      onClick={()=>goRoute(item.href)}
                      key={item.href} className={activeClass + ' cursor-pointer group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:text-pink-300  hover:translate-x-1 transition duration-200 text-muted-foreground'}>{item.title}</div>
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
    <div
      className={'container mx-auto max-w-[88rem] flex-1 items-start px-4 md:grid md:grid-cols-[180px_minmax(0,1fr)] md:gap-0 lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-0 lg:px-8'}>
      <aside
        className={'fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block md:self-start'}>
        {renderMenu()}
      </aside>
      <main className={'relative py-6 lg:gap-10 lg:py-8'}>
        <Outlet></Outlet>
      </main>
    </div>
  </div>
}