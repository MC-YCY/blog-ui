import { PartTitle } from '@/components/project/part-title/part-title.tsx'
import { Container } from '@/components/project/container'
import { ExtendPanel } from '@/components/project/extend-panel/extend-panel.tsx'

export const HomePanel = () =>{
  return <>
    <Container>
      <PartTitle title={'卡片描述组件'} description={'封面和内容'} />
      <div className="w-full mt-3 xl:mt-6 h-[768px]">
        <ExtendPanel cards={[
          {
            background: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
            title: '自然风光',
            description: '探索世界各地的壮丽自然景观',
            count: '01'
          },
          {
            background: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
            title: '山川河流',
            description: '雄伟山脉与蜿蜒河流的完美结合',
            count: '02'
          },
          {
            background: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
            title: '日出日落',
            description: '捕捉一天中最美的光影时刻',
            count: '03'
          },
          {
            background: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
            title: '森林秘境',
            description: '深入神秘而宁静的森林世界',
            count: '04'
          }
        ]}></ExtendPanel>
      </div>
    </Container>
  </>
}