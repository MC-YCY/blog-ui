import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      react(),
      tailwindcss(),
      ViteImageOptimizer({
        jpg: {
          quality: 40, // 质量0-100（默认75）
        },
        jpeg: {
          quality: 40,
        },
        png: {
          quality: 40,        // 质量0-100（默认75）
          compressionLevel: 9, // 压缩级别0-9（默认6）
        },
        webp: {
          quality: 85,        // 质量0-100（默认75）
          lossless: false,     // 是否无损压缩（默认false）
          alphaQuality: 90,    // alpha通道质量（默认100）
        },
      })
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