import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// eslint-disable-next-line no-control-regex
const INVALID_CHAR_REGEX = /[\u0000-\u001F"#$&*+,:;<=>?[\]^`{|}\u007F]/g;

const DRIVE_LETTER_REGEX = /^[a-z]:/i;
// https://vitejs.dev/config/
export default defineConfig({
  base: "/nanjiu-tools/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    chunkSizeWarningLimit: 2000, // 解决包大小超过500kb的警告
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("axios")) {
            return "axios";
          }
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
        chunkFileNames: "js/[name]-[hash].js",
        entryFileNames: "js/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          if (assetInfo?.name?.endsWith(".css")) {
            return `css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        sanitizeFileName: (name) => {
          const match = DRIVE_LETTER_REGEX.exec(name);
          const driveLetter = match ? match[0] : "";
          return (
            driveLetter +
            name.slice(driveLetter.length).replace(INVALID_CHAR_REGEX, "") // 处理文件名中的非法字符
          );
        },
      },
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    cors: true, // 默认启用并允许任何源
    proxy: {
      "/jjapi": {
        target: "http://localhost:3000", // 代理接口地址
        changeOrigin: true,
      },
    },
    port: 8070, // 服务端口
  },
});
