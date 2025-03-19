import { TracingBeam } from "@/components/ui/tracing-beam";
import Banner1 from '@/assets/images/resume/china.png';
import Banner2 from '@/assets/images/resume/hua.png';
import Banner3 from '@/assets/images/resume/lcx.jpg';
import Banner4 from '@/assets/images/resume/wallhaven-d671ej.png';
import Banner5 from '@/assets/images/resume/wallhaven-qz13pl.jpg';
import Banner6 from '@/assets/images/resume/wallhaven-3l828y.jpg';
import Banner7 from '@/assets/images/resume/wallhaven-9dp3y1.jpg';

export function TracingBeamDemo() {
  return (
    <TracingBeam className="px-6">
      <div className="mx-auto antialiased pt-4 pb-30 relative">
        {dummyContent.map((item, index) => (
          <div key={`content-${index}`} className="mb-12">
            <h2 className="bg-primary text-primary-foreground rounded-full text-sm w-fit px-4 py-1 mb-4">
              {item.badge}
            </h2>

            <p className="text-xl font-semibold text-primary mb-4">
              {item.title}
            </p>

            <div className="prose prose-base dark:prose-invert leading-relaxed space-y-4">
              {item?.image && (
                <img
                  src={item.image}
                  alt="blog thumbnail"
                  className="rounded-lg mb-6 object-cover shadow-md w-[100%] h-[418px]"
                />
              )}
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </TracingBeam>
  );
}

const dummyContent = [
  {
    title: <a href="https://www.isqqw.com/" target="_blank" className="text-blue-600 dark:text-blue-400 hover:underline">ISQQW - ECharts 示例网站</a>,
    description: (
      <>
        <p>ISQQW 是一个 ECharts 演示网站，支持折线图、柱状图、雷达图、地图、3D 地图等主流图表类型。用户可以注册后添加演示作品，并进行收藏、评论、点赞。</p>
        <ul className="list-disc pl-5">
          <li>支持 ECharts 版本切换、代码编辑器、图表预览、封面设置等功能。</li>
          <li>使用 CDN 或站点托管文件提供版本切换。</li>
          <li>基于 <strong>Monaco Editor</strong> 提供代码编辑功能，支持 JavaScript 代码提示。</li>
          <li>预览基于 <code>iframe</code> 的 <code>srcdoc</code> 实现，每次切换版本或运行时更新。</li>
          <li>封面上传或自动截取预览图，基于 <code>canvas</code> 和 <code>html2canvas</code> 实现。</li>
        </ul>
        <p className="mt-4"><strong>成果：</strong> 成为热门 ECharts 示例网站，日 PV 20k，并添加了对其他图表库的支持。</p>
      </>
    ),
    badge: "Vue",
    image: Banner1,
  },
  {
    title: "图表集网 - 微信小程序",
    description: (
      <>
        <p>专为查看 ISQQW 作品而设计的小程序，核心功能包括：</p>
        <ul className="list-disc pl-5">
          <li><strong>作品列表：</strong> 浏览 ISQQW 的全部作品。</li>
          <li><strong>积分兑换：</strong> 用户可使用积分兑换奖品。</li>
          <li><strong>排行榜：</strong> 展示用户排名。</li>
          <li><strong>用户中心：</strong> 查看个人发布的作品、收藏、消息等。</li>
        </ul>
        <p>
          小程序包含安全防护功能，防止恶意访问。非 VIP 用户需观看广告获取验证码后才能查看作品。
        </p>
        <p>
          我负责 <strong>作品列表</strong> 和 <strong>详情模块</strong>。由于个人小程序无法使用 <code>web-view</code>，最终改为 <strong>预览图片 + 代码展示</strong>，并提供复制作品链接的功能。
        </p>
      </>
    ),
    badge: "小程序",
    image: Banner2,
  },
  {
    title: "零点数据治理平台（React）",
    description: (
      <>
        <p>该平台用于管理公司 API，提供接口注册、监控、权限管理等功能。</p>
        <ul className="list-disc pl-5">
          <li><strong>技术栈：</strong> Vite、React、Redux、React Router、Ant Design、ECharts、AntV X6。</li>
          <li><strong>核心功能：</strong> 工作流可视化，每个任务是一个节点，支持状态展示与双击编辑。</li>
          <li><strong>可视化交互：</strong> 使用 AntV X6 渲染节点，支持拖拽、状态更新、表单弹窗。</li>
          <li><strong>动态表单：</strong> 根据不同节点类型（如 MySQL、Java、Python）渲染相应表单，并提供代码编辑器。</li>
        </ul>
      </>
    ),
    badge: "React",
    image: Banner3,
  },
  {
    title: "济事办 - 政务服务小程序",
    description: (
      <>
        <p>济事办是济源市的政务服务小程序，提供多项便民服务：</p>
        <ul className="list-disc pl-5">
          <li>大厅查询、到厅规划、便捷预约、跨省通办等功能。</li>
          <li>政务大厅的办事区域预览，提供联系方式、预约方式等信息。</li>
          <li>提供“帮我办”功能，支持项目代办、咨询投诉等服务。</li>
        </ul>
        <p>我主要负责用户身份管理，支持微信手机号注册登录和权限管理，以确保不同用户群体访问不同的页面内容。</p>
      </>
    ),
    badge: "微信小程序",
    image: Banner4,
  },
  {
    title: "FHarris-Vue 组件创新挑战赛",
    description: (
      <>
        <p>参与了 FHarris-Vue 组件开发竞赛，基于 Vue3 研发高效可复用的组件库。</p>
        <ul className="list-disc pl-5">
          <li><strong>extend-calendar：</strong> 交互式日历组件，支持拖动调整日程视图。</li>
          <li><strong>extend-panel：</strong> 卡片式面板组件，点击封面后可放大展示内容。</li>
        </ul>
        <p className="mt-4"><strong>成果：</strong> 取得优秀奖，团队名称 "Yes老弟儿"。</p>
      </>
    ),
    badge: "Vue",
    image: Banner5,
  },
  {
    title: "航空基本认知能力测评系统",
    description: (
      <>
        <p>航空测评系统用于评估飞行员的认知能力，如注意力、反应速度、决策能力等。</p>
        <ul className="list-disc pl-5">
          <li><strong>技术栈：</strong> Electron、Vue3、Vite、Element Plus。</li>
          <li><strong>客户端：</strong> 提供认知能力测试，包括瑞文智力测试和空间能力测评。</li>
          <li><strong>网页端：</strong> 管理测试数据，并提供特征分析模块。</li>
          <li><strong>语音分析：</strong> 录音数据可转文本，并支持富文本编辑器增强查看体验。</li>
        </ul>
        <p className="mt-4"><strong>成果：</strong> 封装了音频组件和富文本编辑器，提高了组件复用性。</p>
      </>
    ),
    badge: "Vue & Electron",
    image: Banner6,
  },
  {
    title: "济源政务服务监测系统（大屏可视化）",
    description: (
      <>
        <p>可视化大屏展示济源市政务服务大厅的业务数据，提供数据分析和楼层可视化导航。</p>
        <ul className="list-disc pl-5">
          <li><strong>技术栈：</strong> Vue3、Vite、Axios、Three.js、GSAP。</li>
          <li>采用 Three.js 进行政务大厅建模，支持楼层切换和区域高亮显示。</li>
          <li>使用 GSAP 动画实现视角切换，增强交互体验。</li>
        </ul>
      </>
    ),
    badge: "Vue & Three.js",
    image: Banner7,
  },
];

