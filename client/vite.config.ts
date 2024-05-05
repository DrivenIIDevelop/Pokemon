import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react-swc'
import RemixRouter from 'vite-plugin-remix-router'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const envDir = resolve(__dirname, '../')
  const env = loadEnv(mode, envDir, '')
  return {
    envDir,
    resolve: {
      alias: {
        '@server/api/': resolve(__dirname, '../server/src/api/'),
        '@api': resolve(__dirname, './src/api'),
        '@components': resolve(__dirname, './src/components'),
        '@contexts': resolve(__dirname, './src/contexts'),
      },
    },
    plugins: [react(), RemixRouter()],
    server: {
      proxy: {
        '/api': {
          target: `http://${env.VITE_API_HOST}:${env.VITE_API_PORT}/`,
          changeOrigin: true,
          secure: false,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
