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
      preprocessorOptions: {
        scss: {}
      }
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
  };
});