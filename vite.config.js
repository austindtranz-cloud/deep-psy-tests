import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        engine: resolve(__dirname, 'core/main.js')
      },
      output: {
        entryFileNames: 'engine.min.js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            return 'style.min.css';
          }
          return '[name][extname]';
        },
        chunkFileNames: 'tests/[name].js',
        format: 'es'
      }
    },
    // Отключаем хэши для всех файлов, кроме chunk'ов если нужно,
    // но chunkFileNames уже задано без [hash]
    modulePreload: false,
    cssMinify: 'cssnano',
  },
  css: {
    postcss: {
      plugins: [
        require('postcss-prefix-selector')({
          prefix: '.dpt-app',
          transform(prefix, selector, prefixedSelector) {
            if (selector === 'body' || selector === 'html') {
              return `.dpt-app`;
            }
            if (selector.startsWith('.dpt-app')) {
              return selector;
            }
            return prefixedSelector;
          }
        })
      ]
    }
  }
});