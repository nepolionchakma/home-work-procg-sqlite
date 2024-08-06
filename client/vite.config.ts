import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8000,
    proxy: {
      "/api/v2": {
        target: "http://192.168.43.235:3000/",
        // target: "http://192.168.0.169:3000",
        changeOrigin: true,
        rewrite: (path) => {
          const newPath = path.replace(/^\/api\/v2/, "");
          console.log(`Rewriting path: ${path} -> ${newPath}`);
          return newPath;
        },
        configure: (proxy, options) => {
          proxy.on("proxyReq", (proxyReq, req, res) => {
            console.log(
              "Proxying request:",
              req.method,
              req.url,
              "->",
              proxyReq.path
            );
          });
          proxy.on("proxyRes", (proxyRes, req, res) => {
            console.log("Received response from target:", proxyRes.statusCode);
          });
          proxy.on("error", (err, req, res) => {
            console.error("Proxy error:", err);
            res.writeHead(500, {
              "Content-Type": "text/plain",
            });
            res.end(
              "Something went wrong. And we are reporting a custom error message."
            );
          });
        },
      },
    },
  },

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
