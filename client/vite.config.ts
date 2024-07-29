import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/api/v2": {
        target: "http://localhost:5000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/v2/, ""),
      },
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  // server: {
  //   proxy: {
  //     "/api/v2/": "http://129.146.85.244:3000",
  //   },
  // },

  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
// server: {
//     proxy: {
//       // string shorthand: http://localhost:5173/foo -> http://localhost:4567/foo
//       '/foo': 'http://localhost:4567',
//       // with options: http://localhost:5173/api/bar-> http://jsonplaceholder.typicode.com/bar
//       '/api': {
//         target: 'http://jsonplaceholder.typicode.com',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ''),
//       },
//       // with RegEx: http://localhost:5173/fallback/ -> http://jsonplaceholder.typicode.com/
//       '^/fallback/.*': {
//         target: 'http://jsonplaceholder.typicode.com',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/fallback/, ''),
//       },
//       // Using the proxy instance
//       '/api': {
//         target: 'http://jsonplaceholder.typicode.com',
//         changeOrigin: true,
//         configure: (proxy, options) => {
//           // proxy will be an instance of 'http-proxy'
//         },
//       },
//       // Proxying websockets or socket.io: ws://localhost:5173/socket.io -> ws://localhost:5174/socket.io
//       // Exercise caution using `rewriteWsOrigin` as it can leave the proxying open to CSRF attacks.
//       '/socket.io': {
//         target: 'ws://localhost:5174',
//         ws: true,
//         rewriteWsOrigin: true,
//       },
//     },
//   },
