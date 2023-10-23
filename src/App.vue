<template>
    <div class="bg-white relative">
        <Header v-if="user" />
        <InactivityTimer v-if="user" />
        <div
            class="absolute top-0 bottom-0 right-0 left-0 z-30"
            v-if="alerts.alert || alerts.messages"
            @click="setShow"
        ></div>
        <div class="flex bg-[#F1F0F0] h-[100vh] relative">
            <SidebarMenu v-if="user" />
            <div class="bg-white m-0 p-0 w-full pt-14">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import Header from './components/header/HeaderComponent.vue';
import SidebarMenu from './components/dashboard/SidebarMenu.vue';
import { useStore } from 'vuex';
import InactivityTimer from './views/InactivityTimer.vue';

export default defineComponent({
    components: { Header, SidebarMenu, InactivityTimer },
    setup() {
        const store = useStore();
        const user = ref(true);

        const alerts = computed(() => {
            const data = store.getters['notifications/getHeadersAlerts'];
            return data;
        });

        const setShow = () => {
            store.commit('notifications/restoreHeaderAlerts');
        };

        return { user, alerts, setShow };
    },
});
</script>
