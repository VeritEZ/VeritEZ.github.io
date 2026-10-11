import { defineConfig, type ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'

let devServer: ViteDevServer | undefined

export default defineConfig({
  plugins: [react(), {
    name: 'veritez-static-html',
    configureServer(server) { devServer = server },
    async transformIndexHtml(html) {
      if (!devServer) return html
      const { render } = await devServer.ssrLoadModule('/src/entry-server.tsx')
      return html.replace('<!--app-html-->', render())
    },
  }],
  base: '/',
})
