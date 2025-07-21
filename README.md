

# Blog-UI

一个用于博客系统的 UI 组件库，提供丰富的博客相关界面组件与功能模块。

## 目录介绍

- `components/`: 组件目录，包含博客系统所需的各种 UI 组件。
- `views/`: 页面视图目录，包含博客的页面结构。
- `api/`: API 接口目录，提供与后端交互的接口。
- `assets/`: 静态资源目录，包含图片与样式文件。
- `types/`: 类型定义目录，包含项目中使用的 TypeScript 类型定义。
- `utils/`: 工具函数目录，包含请求处理、帧率监控等实用函数。
- `stores/`: 状态管理目录，使用 Zustand 进行状态存储。
- `constant/`: 常量定义目录，包含博客配置、路由等常量。

## 功能概述

- **首页**: 提供文章、日记、图库、面板等内容的展示。
- **文章**: 展示博客文章列表，支持文章详情查看。
- **图库**: 提供图片轮播展示功能。
- **随记**: 展示日记内容，支持日记撰写和提交。
- **关于**: 包含作者信息、留言、技能展示等内容。
- **主题切换**: 支持深色与浅色主题切换。
- **响应式设计**: 适配移动设备与桌面设备。

## 安装

确保已安装 [Node.js](https://nodejs.org) 和 [npm](https://www.npmjs.com/)。

1. 克隆仓库：
   ```bash
   git clone https://gitee.com/yin-chunyang/blog-ui
   ```

2. 进入项目目录：
   ```bash
   cd blog-ui
   ```

3. 安装依赖：
   ```bash
   npm install
   # 或者使用 pnpm
   pnpm install
   ```

## 使用

运行本地开发服务器：
```bash
npm run dev
# 或使用 pnpm
pnpm run dev
```

## 项目结构

- `src/App.tsx`: 主应用组件。
- `src/index.html`: 项目入口 HTML 文件。
- `src/main.tsx`: 主渲染逻辑。
- `src/components/`: 包含所有 UI 组件。
- `src/views/`: 包含页面结构。
- `src/api/`: 包含与后端通信的 API 接口。
- `src/assets/`: 图片、图标和样式文件。
- `src/types/`: TypeScript 类型定义。
- `src/utils/`: 工具函数。
- `src/stores/`: Zustand 状态存储。
- `src/constant/`: �`: 常量定义。

## 贡献

我们欢迎社区贡献！请查看 [LICENSE](LICENSE) 文件了解授权信息。

## 许可证

本项目使用 [Apache-2.0](LICENSE) 许可证。