import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    css: {
      modules: {
        localsConvention: 'camelCaseOnly', // Optional, to ensure camelCase conversion
      },
    },
    server: {
      host: '0.0.0.0', // 监听所有网络接口（包括局域网 IP）
      port: 5173,      // 可选：指定端口
      proxy: {
        [env.VITE_APP_API_PREFIX]: {
          target: env.VITE_APP_BASE_API,
          changeOrigin: true,
          rewrite: (path) => {
            console.log('Proxying:', path);
            return path;
          },
        },
      },
    },
    // build: {
    //   rollupOptions: {
    //     output: {
    //       manualChunks(id) {  // 改用函数形式精准控制分包
    //         // 按功能模块分包
    //         if (id.includes('/docs/sa-calendar-')) {
    //           return 'calendar'; // sa-calendar 相关组件独立分包
    //         }
    //         if (id.includes('/user/')) {
    //           return 'user'; // 用户相关页面独立分包
    //         }
    //         if (id.includes('/create') || id.includes('/update')) {
    //           return 'editor'; // 创作/编辑页面独立分包
    //         }

    //         // 第三方依赖分包（避免重复打包）
    //         if (id.includes('node_modules')) {
    //           if (id.includes('react')) {
    //             return 'vendor-react';
    //           }
    //           if (id.includes('antd')) {
    //             return 'vendor-antd';
    //           }
    //           if (id.includes('lodash')) {
    //             return 'vendor-lodash';
    //           }
    //           return 'vendor-other';
    //         }
    //       }
    //     }
    //   }
    // }
  };
});