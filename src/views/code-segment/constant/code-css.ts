import { CodeSegmentItem } from '@/types/code-segment.ts'

export const CodeCss: CodeSegmentItem[] = [
  {
    title: '文本多行溢出省略号',
    code: {
      content: `.multi-ellipsis {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}`,
      filename: 'demo.css',
      language: 'css',
    },
    description: '多行文字超出显示省略号（显示3行）',
  },
  {
    title: '粘性页脚布局',
    code: {
      language: 'css',
      filename: 'demo.css',
      content: `.sticky-footer {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
} 
.content {
  flex: 1; 
}`,
    },
    description: '粘性页脚布局（内容不足时页脚置底）',
  },
  {
    title: '文本换行',
    code: {
      content: `.force-wrap {
word-break: break-all;
word-wrap: break-word; 
}`,
      language: 'css',
      filename: 'demo.css',
    },
    description: '强制文本换行（防止内容溢出容器）',
  },
  {
    title: '毛玻璃',
    code: {
      content: `.blur-bg {
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px); 
}`,
      language: 'css',
      filename: 'demo.css',
    },
    description: '毛玻璃背景效果',
  },
  {
    title: 'css禁用事件',
    code: {
      content: `.disabled {
  pointer-events: none;
  opacity: 0.6;
}`,
      language: 'css',
      filename: 'demo.css',
    },
    description: '禁用元素交互状态',
  },
  {
    title: '禁止选中文本',
    code: {
      content: `.no-select {
  user-select: none;
  -webkit-user-select: none; 
}`,
      filename: 'demo.css',
      language: 'css',
    },
    description: '禁止用户选择文本',
  },
  {
    title: '比例容器',
    code: {
      content: `.aspect-ratio {
  position: relative;
  padding-top: 56.25%;
} 
.aspect-ratio > * {
  position: absolute;
  top: 0;
  left: 0;
}`,
      filename: 'demo.css',
      language: 'css',
    },
    description: '保持16:9宽高比容器',
  },
]