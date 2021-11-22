import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { name } from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: `/${name}/`,
  build: {
    outDir: 'docs',
  },
  resolve: {
    alias: {
      '@': resolve('src'),
      Api: resolve('src/api'),
      Views: resolve('src/views'),
      Assets: resolve('src/assets'),
      Mixins: resolve('src/mixins'),
      Utils: resolve('src/utils'),
      Store: resolve('src/store'),
      Layout: resolve('src/components/layout'),
      Widgets: resolve('src/components/widgets'),
      Service: resolve('src/service'),
      DB: resolve('src/db'),
    },
  },
  server: {
    open: false,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        // 获取cookie
        changeOrigin: true,
        secure: false,
      },
      '/music': {
        target: 'http://p2.music.126.net/',
        changeOrigin: true,
        pathRewrite: {
          '^/music': '',
        },
      },
      '/github': {
        target: 'https://api.github.com',
        changeOrigin: true,
        pathRewrite: {
          '^/github': '',
        },
      },
      '/douban': {
        target: 'http://api.douban.com/v2',
        changeOrigin: true,
        pathRewrite: {
          '^/douban': '',
        },
      },
      '/ip': {
        target: 'https://extreme-ip-lookup.com/json/',
        changeOrigin: true,
        pathRewrite: {
          '^/ip': '',
        },
      },
      '/weather': {
        target: 'https://bird.ioliu.cn/weather',
        changeOrigin: true,
        pathRewrite: {
          '^/weather': '',
        },
      },
      '/news': {
        target: 'https://iflow-api.uc.cn/feiyan/list',
        changeOrigin: true,
        pathRewrite: {
          '^/news': '',
        },
      },
    },
  },
});
