import { PartTitle } from '@/components/project/part-title/part-title.tsx'
import { Container } from '@/components/project/container'
import { ExtendPanel } from '@/components/project/extend-panel/extend-panel.tsx'
import BannerA from '@/assets/images/panel/wallhaven-mlpwdk.jpg';
import BannerB from '@/assets/images/panel/25673.png';
import BannerC from '@/assets/images/panel/wallhaven-v9rr2p.jpg';
import BannerD from '@/assets/images/panel/wallhaven-3l828y.jpg';

export const HomePanel = () =>{
  return <>
    <Container>
      <PartTitle title={'一个有趣的组件'} description={'试着点击它们'} />
      <div className="w-full mt-3 xl:mt-6 h-[76vh] max-h-[680px]">
        <ExtendPanel cards={[
          {
            background: BannerA,
            title: '未来之城：天地之锚',
            description: '云雾缭绕间，岛屿之上，螺旋建筑如天地锚点。直耸天际的线条，串联起现实与遐想，是科技与自然共织的未来剪影，每一圈回旋，都在诉说对人居新形态的探索，于山海环抱中，勾勒城市进化的梦幻轮廓 。',
            count: '01'
          },
          {
            background: BannerB,
            title: '赛博苍穹下的都市霓虹',
            description: '夜幕垂落，赛博都市在迷雾与霓虹中苏醒。林立的摩天楼如钢铁巨兽，流转的光影似血管搏动，每束刺破黑暗的光，都在书写科技与未来交织的狂想，这是属于赛博时代的城市肖像，藏着人类对未知的野心与向往 。',
            count: '02'
          },
          {
            background: BannerC,
            title: '寻迹未来',
            description: '踏入云雾弥漫的绿野，眼前是科技与自然共生的奇迹都市。藤蔓爬上摩天楼，瀑布从建筑间倾泻，人类不再是自然的征服者，而是共生的探索者。在这片觉醒的土地上，每一寸绿意、每一缕科技之光，都在诉说未来人居的诗意答案，引我们寻迹生态与文明交融的远方 。',
            count: '03'
          },
          {
            background: BannerD,
            title: '落日与霓虹的狂想',
            description: '当落日余晖漫过星际都市，霓虹与霞光共舞。摩天楼刺破云层，飞船穿梭天际，河流串起璀璨灯火，远方行星悬于苍穹，这是人类将科幻梦照进现实的舞台，每束光、每座建筑，都在书写宇宙时代的浪漫序章 。',
            count: '04'
          }
        ]}></ExtendPanel>
      </div>
    </Container>
  </>
}