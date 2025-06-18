import { PartTitle } from '@/components/project/part-title/part-title.tsx'
import { Container } from '@/components/project/container'
import { ExtendPanel } from '@/components/project/extend-panel/extend-panel.tsx'
import Banner1 from '@/assets/images/人民万岁/国徽1.jpg'
import Banner2 from '@/assets/images/人民万岁/国徽2.jpg'
import Banner3 from '@/assets/images/人民万岁/会堂.jpg'
import Banner4 from '@/assets/images/人民万岁/照射.jpg'

export const HomePanel = () =>{
  return <>
    <Container>
      <PartTitle title={'一个有趣的组件'} description={'试着点击它们'} />
      <div className="w-full mt-3 xl:mt-6 h-[76vh] max-h-[680px]">
        <ExtendPanel cards={[
          {
            background: Banner1,
            title: '国徽下的律动',
            description: '在庄严肃穆的建筑之上，国徽闪耀着金色的光芒，五颗五角星熠熠生辉，映照着祖国的荣耀与辉煌。猎猎飘扬的五星红旗，似在诉说着岁月的豪迈。点点飞絮，如灵动的诗行，为这庄重之景添上一抹轻盈。',
            count: '01'
          },
          {
            background: Banner2,
            title: '金辉下的庄严与传承',
            description: '在暖金色阳光的轻抚下，古建筑的琉璃瓦闪烁着温润的光泽。檐下的精美纹饰，诉说着岁月沉淀的匠心。庄严的国徽高悬，红底与金星交相辉映，尽显肃穆与神圣。光影交织间，历史的厚重与当下的辉煌完美融合，每一处细节都似在低吟着过往的故事，又展望着未来的华章。',
            count: '02'
          },
          {
            background: Banner3,
            title: '穹顶红星下的殿堂回响',
            description: '步入这方神圣之境，仰头望去，穹顶似浩瀚宇宙般壮阔。层层叠叠的设计，线条流畅而富有韵律，似在诉说着宏伟的篇章。中央那枚红星，光芒夺目，于简洁与大气之中，尽显庄严与肃穆。环绕的座椅整齐排列，仿佛在静静等待，等待着重要时刻的到来，承载起无数的声音与梦想，在这殿堂之中交织出时代的旋律。',
            count: '03'
          },
          {
            background: Banner4,
            title: '阳光下广场的动静之美',
            description: '在澄澈蓝天的映衬下，宏伟建筑矗立远方，庄重而肃穆。宽阔广场上车流有序穿梭，行人往来悠然，洋溢着蓬勃生机。暖金色阳光倾洒，给一切都镶上了柔和的金边，古老与现代在此交融，岁月的沉稳与生活的活力相互交织，绘就出一幅动人的城市图景。',
            count: '04'
          }
        ]}></ExtendPanel>
      </div>
    </Container>
  </>
}