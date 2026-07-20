import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


export default defineConfig({

  plugins: [
    react()
  ],


  build: {

    // Remove mapas que revelam o código original
    sourcemap: false,


    // Compactação do código
    minify: "esbuild",


    // Otimização
    cssMinify: true,


    rollupOptions: {

      output: {

        // Dificulta associação dos arquivos
        entryFileNames:
          "assets/[hash].js",

        chunkFileNames:
          "assets/[hash].js",

        assetFileNames:
          "assets/[hash][extname]"

      }

    }

  }

});