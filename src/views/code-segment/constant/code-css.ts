import { CodeSegmentItem } from '@/types/code-segment.ts'

export const CodeCss:CodeSegmentItem[] = [
  {
    title:'',
    code: ".multi-ellipsis { display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3; overflow: hidden; }",
    description: "多行文字超出显示省略号（显示3行）"
  },
  {
    title:'',
    code: ".vertical-center { height: 100px; line-height: 100px; }",
    description: "文字垂直居中（父元素需有确定高度）"
  },
  {
    title:'',
    code: "::-webkit-scrollbar { display: none; }",
    description: "隐藏滚动条但保留滚动功能"
  },
  {
    title:'',
    code: ".triangle { width: 0; height: 0; border: 10px solid transparent; border-top-color: red; }",
    description: "CSS绘制三角形（红色箭头）"
  },
  {
    title:'',
    code: "input::placeholder { color: #999; font-size: 14px; }",
    description: "自定义输入框placeholder样式"
  },
  {
    title:'',
    code: ".sticky-footer { min-height: 100vh; display: flex; flex-direction: column; } .content { flex: 1; }",
    description: "粘性页脚布局（内容不足时页脚置底）"
  },
  {
    title:'',
    code: ".force-wrap { word-break: break-all; word-wrap: break-word; }",
    description: "强制文本换行（防止内容溢出容器）"
  },
  {
    title:'',
    code: ".hover-zoom { transition: transform 0.3s; } .hover-zoom:hover { transform: scale(1.05); }",
    description: "悬停缩放效果"
  },
  {
    title:'',
    code: ".initial-letter::first-letter { font-size: 2em; float: left; margin-right: 5px; }",
    description: "首字下沉效果"
  },
  {
    title:'',
    code: "@media (hover: hover) { .hover-only { opacity: 0; } .hover-only:hover { opacity: 1; } }",
    description: "仅支持悬停设备显示效果（避免移动端闪烁）"
  },
  {
    title:'',
    code: ".blur-bg { backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px); }",
    description: "毛玻璃背景效果"
  },
  {
    title:'',
    code: ".disabled { pointer-events: none; opacity: 0.6; }",
    description: "禁用元素交互状态"
  },
  {
    title:'',
    code: ".vertical-text { writing-mode: vertical-rl; text-orientation: upright; }",
    description: "竖排文字排版"
  },
  {
    title:'',
    code: ".no-select { user-select: none; -webkit-user-select: none; }",
    description: "禁止用户选择文本"
  },
  {
    title:'',
    code: ".aspect-ratio { position: relative; padding-top: 56.25%; } .aspect-ratio > * { position: absolute; top: 0; left: 0; }",
    description: "保持16:9宽高比容器"
  }
]