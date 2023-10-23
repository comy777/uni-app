// Vue
import { createApp, h } from "vue";
import App from "./App.vue";

// Vuex
import store from "./store";

// Router
import { createRouter } from "./router";
import "./index.css";

// Element Plus component-UI framework
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// @ts-ignore
import Notifications from "notiwind";
import { QuillEditor } from '@vueup/vue-quill'
import 'quill-paste-smart';
// Setup app to use apollo client. Taken from: https://v4.apollo.vuejs.org/
import  GridLayout  from 'vue3-grid-layout-next';

// @ts-ignore
import CKEditor from '@ckeditor/ckeditor5-vue';
import VueZoomer from 'vue-zoomer'

const app = createApp({
    setup() {},

    render: () => h(App),
});

// Setup app extra (optional) modules and mount the app
app.use(store)
    .use(createRouter())
    .use(Notifications)
    .use(CKEditor)
    .use(ElementPlus)
    .use(VueZoomer)
    .use(GridLayout);

app.component('QuillEditor', QuillEditor);
app.mount("#app");
