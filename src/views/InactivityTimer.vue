<template>
    <div></div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
    setup() {
        const store = useStore();
        var timer: number | null = null;
        var timeout: number | null = null;

        const stateUser = computed(() => {
            const state = store.getters['ui/getUserState'];
            return state;
        });

        const setState = async (value: any) => {
            let bandera = false;
            if (stateUser.value === 'active' && value === 'inactive') {
                store.commit('ui/setUserState', 'inactive');
                bandera = true;
            }
            if (stateUser.value === 'inactive' && value === 'active') {
                store.commit('ui/setUserState', 'active');
                bandera = true;
            }
        };

        const resetTimer = async () => {
            //Control by inactivity state
            await clearTimer(timeout, false, true);
            timeout = window.setTimeout(async () => {
                await setState('inactive');
            }, 500000);
        };

        const clearTimer = async (value: number, logout?: boolean, timeout?: boolean) => {
            clearTimeout(value);
            await setState('active');
            if (timeout) timeout = null;
            if (logout) timer = null;
        };

        // Clear events when the component is destroyed
        onBeforeUnmount(() => {
            //events
            window.removeEventListener('load', resetTimer);
            window.removeEventListener('mousemove', resetTimer);
            window.removeEventListener('mousedown', resetTimer);
            window.removeEventListener('touchstart', resetTimer);
            window.removeEventListener('touchmove', resetTimer);
            window.removeEventListener('click', resetTimer);
            window.removeEventListener('keydown', resetTimer);
            window.removeEventListener('scroll', resetTimer, true);
            clearTimer(timer);
        });

        onMounted(() => {
            // Listen to events that indicate user activity
            window.addEventListener('load', resetTimer);
            window.addEventListener('mousemove', resetTimer);
            window.addEventListener('mousedown', resetTimer);
            window.addEventListener('touchstart', resetTimer);
            window.addEventListener('touchmove', resetTimer);
            window.addEventListener('click', resetTimer);
            window.addEventListener('keydown', resetTimer);
            window.addEventListener('scroll', resetTimer, true);
        });

        return {};
    },
});
</script>
