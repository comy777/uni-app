<template>
  <div class="absolute top-0 bottom-0 right-0 left-0 z-30" v-if="alerts.alert || alerts.messages" @click="setShow" />
  <div class="flex justify-between items-center md:pb-0 sm:bg-[#F5F4F4] md:bg-white md:pt-0 sm:rounded-b-3xl md:rounded-b-none sm:h-12 sm:py-8 md:mb-0 sm:fixed sm:top-0 sm:left-0 sm:right-0 sm:z-40 md:z-40 sm:mb-0 md:relative md:h-0 xl:h-0 2xl:h-0 3xl:h-0 sm:w-[100vw] md:w-full" @click="setShow">
    <div @click="handleShowMenu" class="hover:cursor-pointer bg-white ml-8 md:hidden">
      <ToggleMenuIcon />
    </div>
    <div class="md:w-[20vw] lg:w-[25vw] sm:pr-4 sm:bg-[#F2F2F3] flex items-center justify-end md:absolute md:top-0 md:right-0 sm:relative md:bg-white z-10">
      <AlertIconHeader />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import AlertIconHeader from '../alerts/AlertIconsHeader.vue';
import ToggleMenuIcon from '../icons/Sidebard/ToggleMenuIcon.vue';
import AlertPanel from '../dashboard/AlertPanel.vue';

export default defineComponent({
  name: 'Header',
  components: {
    AlertIconHeader,
    ToggleMenuIcon,
    AlertPanel,
  },

  setup() {
    const store = useStore();

    const alerts = computed(() => {
      const { alert, messages } = store.getters['notifications/getHeadersAlerts'];
      return { alert, messages };
    });

    const handleShowMenu = (e: Event) => {
      e.stopPropagation();
      store.commit('notifications/restoreHeaderAlerts');
      store.commit('ui/setShowMenu');
    };

    const setShow = (e: Event) => {
      e.stopPropagation();
      store.commit('notifications/restoreHeaderAlerts');
    };

    return { alerts, handleShowMenu, setShow };
  },
});
</script>
