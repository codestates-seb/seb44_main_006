import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth/members': {
        target:
          'http://ec2-52-78-64-106.ap-northeast-2.compute.amazonaws.com:8080',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/auth/logout': {
        target:
          'http://ec2-52-78-64-106.ap-northeast-2.compute.amazonaws.com:8080',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
