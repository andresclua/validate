import { resolve } from 'path'
import { defineConfig } from 'vite'
import glob from 'fast-glob'

const inputs = Object.fromEntries(
    glob.sync('demo-src/**/*.html').map(f => [
        f.replace('demo-src/', '').replace(/\.html$/, ''),
        resolve(__dirname, f)
    ])
)

export default defineConfig({
    root: 'demo-src',
    resolve: {
        alias: {
            '@andresclua/validate': resolve(__dirname, 'dist/validate.es.js'),
        }
    },
    build: {
        outDir: resolve(__dirname, 'demo'),
        emptyOutDir: true,
        rollupOptions: { input: inputs }
    }
});
