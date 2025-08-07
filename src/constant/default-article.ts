import { ArticleType } from '@/types/article.ts'
import bannerA from '@/assets/images/演员/我不叫龙虾/group-a-1.webp'
import bannerB from '@/assets/images/演员/我不叫龙虾/group-a-2.webp'
import bannerC from '@/assets/images/演员/我不叫龙虾/group-a-3.webp'

export const defaultArticle: ArticleType[] = [
  {
    "id": 3,
    "title": "https图片显示",
    "content": "上传图片存在服务器上的，之前显示被屏蔽掉因为用的ip==http协议的\n\n目前解决方式：存图片路径不需要拼接ip，前端开发环境配置图片的代理\n```\nVITE_APP_BASE_API=http://localhost:3000\nVITE_APP_API_PREFIX=/blog\nVITE_APP_API_ASSETS_PREFIX=/uploads\nVITE_APP_API_ASSETS_API=http://localhost:3000/uploads\nVITE_APP_WS=ws://localhost\nVITE_APP_WS_PATH=/ws\n```\n\n```js\nimport path from 'path';\nimport tailwindcss from '@tailwindcss/vite';\nimport react from '@vitejs/plugin-react';\nimport { defineConfig, loadEnv } from 'vite';\nimport { ViteImageOptimizer } from 'vite-plugin-image-optimizer';\n\nexport default defineConfig(({ mode }) => {\n  const env = loadEnv(mode, process.cwd());\n  return {\n    plugins: [\n      react(),\n      tailwindcss(),\n      ViteImageOptimizer({\n        jpg: {\n          quality: 40, // 质量0-100（默认75）\n        },\n        jpeg: {\n          quality: 40,\n        },\n        png: {\n          quality: 40,        // 质量0-100（默认75）\n          compressionLevel: 9, // 压缩级别0-9（默认6）\n        },\n        webp: {\n          quality: 85,        // 质量0-100（默认75）\n          lossless: false,     // 是否无损压缩（默认false）\n          alphaQuality: 90,    // alpha通道质量（默认100）\n        },\n      })\n    ],\n    resolve: {\n      alias: {\n        '@': path.resolve(__dirname, './src'),\n      },\n    },\n    css: {\n      modules: {\n        localsConvention: 'camelCaseOnly', // Optional, to ensure camelCase conversion\n      },\n      preprocessorOptions: {\n        scss: {}\n      }\n    },\n    server: {\n      host: '0.0.0.0', // 监听所有网络接口（包括局域网 IP）\n      port: 5173,      // 可选：指定端口\n      proxy: {\n        [env.VITE_APP_API_PREFIX]: {\n          target: env.VITE_APP_BASE_API,\n          changeOrigin: true,\n          rewrite: (path) => {\n            console.log('Proxying:', path);\n            return path;\n          },\n        },\n        [env.VITE_APP_API_ASSETS_PREFIX]: {\n          target: env.VITE_APP_API_ASSETS_API,\n          changeOrigin: true,\n          rewrite: (path) => {\n            console.log('VITE_APP_API_ASSETS_API:', path);\n            return path.replace(/^\\/uploads/, '');\n          },\n        },\n      },\n    },\n  };\n});\n```\n# 部署配置nginx\n```\nserver\n{\n    listen 80;\n    listen 443 ssl;\n    listen 443 quic;\n    http2 on;\n    server_name www.sa-blog.online;\n    index index.html index.htm default.htm default.html;\n    root /www/wwwroot/blog-ui-next;\n    #CERT-APPLY-CHECK--START\n    # 用于SSL证书申请时的文件验证相关配置 -- 请勿删除并保持这段设置在优先级高的位置\n    include /www/server/panel/vhost/nginx/well-known/www.sa-blog.online.conf;\n    #CERT-APPLY-CHECK--END\n\n    #SSL-START SSL相关配置，请勿删除或修改下一行带注释的404规则\n    #error_page 404/404.html;\n    ssl_certificate    /www/server/panel/vhost/cert/www.sa-blog.online/fullchain.pem;\n    ssl_certificate_key    /www/server/panel/vhost/cert/www.sa-blog.online/privkey.pem;\n    ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3;\n    ssl_ciphers EECDH+CHACHA20:EECDH+CHACHA20-draft:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5;\n    ssl_prefer_server_ciphers on;\n    ssl_session_cache shared:SSL:10m;\n    ssl_session_timeout 10m;\n    add_header Strict-Transport-Security \"max-age=31536000\";\n    add_header Alt-Svc 'quic=\":443\"; h3=\":443\"; h3-29=\":443\"; h3-27=\":443\";h3-25=\":443\"; h3-T050=\":443\"; h3-Q050=\":443\";h3-Q049=\":443\";h3-Q048=\":443\"; h3-Q046=\":443\"; h3-Q043=\":443\"';\n    error_page 497  https://$host$request_uri;\n\n    #REWRITE-START\n    include /www/server/panel/vhost/rewrite/html_www.sa-blog.online.conf;\n    #REWRITE-END\n    \n    # ================= 新增图片资源配置 =================\n    location ^~ /uploads/ {\n        alias /www/wwwroot/blog/uploads/;\n        try_files $uri =404;\n        \n        # 强制HTTPS访问与安全头部\n        add_header Content-Security-Policy \"upgrade-insecure-requests\";\n        add_header Strict-Transport-Security \"max-age=31536000; includeSubDomains\" always;\n        add_header X-Content-Type-Options nosniff;\n        add_header X-Frame-Options \"SAMEORIGIN\";\n        \n        # 缓存与日志配置\n        expires 365d;\n        access_log off;\n        log_not_found off;\n        \n        # 允许CORS（根据需求启用）\n        # add_header 'Access-Control-Allow-Origin' '*';\n    }\n    \n    # ================= 原有路由配置 =================\n    location / {\n        try_files $uri $uri/ /index.html;\n    }\n\n    location /blog/ {\n        proxy_pass http://127.0.0.1:3000;\n        proxy_http_version 1.1;\n        proxy_set_header Upgrade $http_upgrade;\n        proxy_set_header Connection 'upgrade';\n        proxy_set_header Host $host;\n        proxy_set_header X-Real-IP $remote_addr;\n        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n        proxy_set_header X-Forwarded-Proto $scheme;\n        proxy_cache_bypass $http_upgrade;\n    }\n    \n    location /ws/ {\n        proxy_pass http://127.0.0.1:3000;\n        proxy_http_version 1.1;\n        proxy_set_header Upgrade $http_upgrade;\n        proxy_set_header Connection \"upgrade\";\n        proxy_set_header Host $host;\n        proxy_set_header X-Real-IP $remote_addr;\n        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n        proxy_read_timeout 3600s;\n        proxy_send_timeout 3600s;\n    }\n\n    # ================= 安全配置 =================\n    #禁止访问的文件或目录\n    location ~ ^/(\\.user.ini|\\.htaccess|\\.git|\\.env|\\.svn|\\.project|LICENSE|README.md) {\n        return 404;\n    }\n\n    # 证书验证目录\n    location ~ \\.well-known{\n        allow all;\n    }\n\n    # 禁止在证书目录执行敏感文件\n    if ( $uri ~ \"^/\\.well-known/.*\\.(php|jsp|py|js|css|lua|ts|go|zip|tar\\.gz|rar|7z|sql|bak)$\" ) {\n        return 403;\n    }\n\n    # ================= 资源缓存配置 =================\n    location ~* \\.(?:jpg|jpeg|png|gif|ico|cur|heic|webp|tiff?|mp3|m4a|aac|ogg|midi?|wav|mp4|mov|webm|mpe?g|avi|ogv|flv|wmv)$ {\n        expires 365d;\n        access_log off;\n    }\n\n    location ~* \\.(?:css|js)$ {\n        expires 30d;\n        access_log off;\n    }\n\n    # ================= 日志配置 =================\n    access_log  /www/wwwlogs/www.sa-blog.online.log;\n    error_log  /www/wwwlogs/www.sa-blog.online.error.log;\n}\n\n```",
    "tags": [
      "React"
    ],
    "readme": "https网站静态资源http屏蔽解决",
    "banner": bannerA,
    "createdAt": "2025-07-18T09:59:55.000Z",
    "viewCount": 1,
    "status": "published",
    "author": {
      "changeLog": "",
      "id": 3,
      "account": "y17633636953",
      "username": "y17633636953",
      "password": "$2b$10$1mzGW.duL9d4kvc0m54nzOGqFOpTmU/smpvViZUHYzMiO.sTpfz76",
      "avatar": "/uploads/avatars/4f3d5ca5-4047-4c5f-88f7-f00bac881b06.jpg",
      "signature": "",
      "createdAt": "2025-07-11T02:42:32.286Z",
      "updatedAt": "2025-07-11T02:42:32.286Z",
      "role": {
        "id": 1,
        "name": "游客",
        "code": "visitor"
      },
      "followersCount": 0,
      "followingCount": 0,
      "totalArticles": 0
    },
    "likeCount": 0
  },
  {
    "id": 2,
    "title": "音乐播放、歌词滚动",
    "content": "歌曲进度、歌名、歌词、切换歌曲\n\n![image](/uploads/images/4193f73c-2c27-486d-988c-bb258cde53d2.png)\n\n在线预览：https://www.sa-blog.online/home\n\n## 歌词获取\n使用的工具https://github.com/jitwxs/163MusicLyrics\n\n## 代码\nhttps://gitee.com/yin-chunyang/blog-ui/tree/next-blog-ui/src/components/project/music\n\n## 歌词滚动ai关键词\n```javascript\nimport { useEffect, useState } from 'react'\nimport style from './player-lyrics.module.css';\n\ntype LyricLine = {\n  time: number // 秒\n  text: string\n}\n\nfunction parseLrc(lrc: string): LyricLine[] {\n  return lrc\n    .split('\\n')\n    .map((line) => {\n      const match = line.match(/\\[(\\d+):(\\d+\\.\\d+)](.*)/)\n      if (!match) return null\n      const [, min, sec, text] = match\n      return {\n        time: parseInt(min) * 60 + parseFloat(sec),\n        text: text.trim(),\n      }\n    })\n    .filter((item): item is LyricLine => !!item)\n}\n\nexport const PlayerLyrics = ({ lyrics, audio }: { lyrics: string, audio: HTMLAudioElement | null }) => {\n  const [lyricsList, setLyricsList] = useState<LyricLine[]>([])\n  useEffect(() => {\n    setLyricsList(parseLrc(lyrics))\n  }, [lyrics])\n  useEffect(() => {\n\n  }, [audio])\n  return <div>\n\n  </div>\n}\n这是歌词播放组件，要求根据音乐播放滚动歌词\n\n具体要求：\n1、歌词高度21px 字体大小12px 字体颜色#fff\n2、当前播放歌词正常，之后的歌词模糊并降低透明度\n3、歌词切换要有切换歌词的效果不要那么生硬可以用flipInX等动画\n4、一行歌词会很长，我设置的180px、如果太长就根据 播放音乐的当前歌词的进度去调整位置\n5、歌词一次最多2条\n6、你可以用motion/react\n7、css单独给我，我会放到./player-lyrics.module.css中\n8、style.className使用小驼峰命名\n9、歌词与歌词间有时长，我希望歌词播放呢根据这个时长添加歌词进度改变歌词颜色类似于蒙版的感觉\n10、歌词切换的时候判断一下，如果当前歌词和下一句歌词间距太短就不要添加过渡效果了；目前有一种乱飞的感觉\n11、歌词间隔时间短就不需要动画，如果歌词太长根据进度调整歌词水平位置展示后面内容，同样的如果间隔太短不需要处理\n\n```\n",
    "tags": [
      "React",
      "CSS"
    ],
    "readme": "音乐播放器，歌词滚动",
    "banner": bannerB,
    "createdAt": "2025-07-18T09:55:10.000Z",
    "viewCount": 1,
    "status": "published",
    "author": {
      "changeLog": "",
      "id": 3,
      "account": "y17633636953",
      "username": "y17633636953",
      "password": "$2b$10$1mzGW.duL9d4kvc0m54nzOGqFOpTmU/smpvViZUHYzMiO.sTpfz76",
      "avatar": "/uploads/avatars/4f3d5ca5-4047-4c5f-88f7-f00bac881b06.jpg",
      "signature": "",
      "createdAt": "2025-07-11T02:42:32.286Z",
      "updatedAt": "2025-07-11T02:42:32.286Z",
      "role": {
        "id": 1,
        "name": "游客",
        "code": "visitor"
      },
      "followersCount": 0,
      "followingCount": 0,
      "totalArticles": 0
    },
    "likeCount": 0
  },
  {
    "id": 1,
    "title": "用 React + Tailwind CSS 打造现代博客：功能解析与最佳实践",
    "content": "作为一名技术爱好者，拥有一个功能完善、美观且高效的个人博客是展示专业能力和分享见解的理想方式。下面我将从用户体验和技术实现角度，解析如何使用 React 和 Tailwind CSS 构建一个令人印象深刻的博客平台。（看ai放屁）\n\n用来尝试NestJs框架搭建的博客，NestJS 作为一款渐进式 Node.js 框架，凭借其企业级架构设计与开箱即用的生态，成为我开发博客后端服务的核心选择。其模块化设计（@Module）与依赖注入（DI）机制，使得代码分层清晰，结合TypeORM实现数据层高效管理，JWT与Passport模块无缝集成身份认证，保障系统安全。通过@nestjs/swagger自动生成 API 文档，配合Redis缓存与Throttler限流，显著提升接口性能。NestJS 深度整合 TypeScript 的强类型特性，结合class-validator实现请求数据验证，减少潜在错误。无论是基于Express的高并发处理能力，还是通过WebSocket实现实时交互，NestJS 都为博客系统提供了灵活、可维护的架构基础，完美支撑从用户管理到内容发布的全场景需求。\n\n前端用来尝试一种只提供逻辑的ui组件库，使用到了React、Tailwindcss、Radix UI、Aceternity UI、Vite、TypeScript、Socket.Io\n\n![image](/uploads/images/9e4f5f46-9cb0-4888-af6c-1e9df1c2f844.jpg)\n\n这是新版本的样式，老版本有文章添加、文章点赞、消息通知等等，这版本只想简单展示没加，也完善了pc、web响应式和主题切换\n\n预览\n\n- 老版本：http://47.93.248.11:3100/home\n- 新版本：https://sa-blog.online/home\n\n代码\n\n新版本：https://gitee.com/yin-chunyang/blog-ui/tree/next-blog-ui/\nnest后端：https://gitee.com/yin-chunyang/blog-service\n\n# 核心功能模块\n## 首页\n\n- 小破站：分享一些网站的轮播图，和网站浏览量\n- 日记：简单展示日记，所选日期所有日记中最新的一条\n- 小挂件：分享一些文章中提及的仓库和文章地址\n- 小作文：文章列表最新的6条\n- 小藏品：图库轮播图\n- 留言板：使用swiper做滚动效果\n- 风景图：使用css3做的过度效果，点击尝试一下\n\n ## 文章\n\n- 文章列表：采用卡片式布局，支持分页，突出显示文章标题、摘要、封面图和发布时间\n- 分类 / 标签系统：通过侧边栏或顶部导航展示分类目录，点击后筛选相关文章\n\n## 日记\n\n- 日记组件：采用仿真纸质样式，凸显主题展示了标题、日期、天气、内容\n- 日历组件：支持收起展开展示周\\月日历，方便了移动端展示周\n- 当天所有日记：使用了swiper展示部分信息，鼠标滑动切换下发内容\n\n## 图库\n\n## 关于\n\n",
    "tags": [
      "React",
      "NestJs",
      "CSS"
    ],
    "readme": "前端用来尝试一种只提供逻辑的ui组件库，使用到了React、Tailwindcss、Radix UI、Aceternity UI、Vite、TypeScript、Socket.Io",
    "banner": bannerC,
    "createdAt": "2025-07-18T09:51:21.000Z",
    "viewCount": 2,
    "status": "published",
    "author": {
      "changeLog": "",
      "id": 3,
      "account": "y17633636953",
      "username": "y17633636953",
      "password": "$2b$10$1mzGW.duL9d4kvc0m54nzOGqFOpTmU/smpvViZUHYzMiO.sTpfz76",
      "avatar": "/uploads/avatars/4f3d5ca5-4047-4c5f-88f7-f00bac881b06.jpg",
      "signature": "",
      "createdAt": "2025-07-11T02:42:32.286Z",
      "updatedAt": "2025-07-11T02:42:32.286Z",
      "role": {
        "id": 1,
        "name": "游客",
        "code": "visitor"
      },
      "followersCount": 0,
      "followingCount": 0,
      "totalArticles": 0
    },
    "likeCount": 0
  }
]