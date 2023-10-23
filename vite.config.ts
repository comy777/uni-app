import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

/*import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
*/
// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 3000,
        host: true,
    },
    preview: {
        port: 3000,
    },
    plugins: [
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: (tag) => ['sanitized-div'].includes(tag),
                },
            },
        }),
        /*AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),*/
    ],
    envPrefix: 'DEV_',
});
