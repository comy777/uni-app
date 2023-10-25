<template>
  <div id="container" class="md:w-full md:flex sm:block">
    <Home class="w-full" />

    <!-- <AlertPanel class="md:w-[20vw] lg:w-[25vw] sm:hidden md:block absolute top-0 bottom-0 right-0" /> -->
  </div>
</template>

<script lang="ts">
import Home from '../views/Home.vue';
import AlertPanel from '../components/dashboard/AlertPanel.vue';
import { onMounted, ref, defineComponent } from 'vue';
import { requestNotificationDesktop } from '../utils/notifications';

export default defineComponent({
  name: 'Dashboard',
  components: { AlertPanel, Home },
  setup() {
    const loading = ref(true);

    onMounted(async () => {
      loading.value = false;
      requestNotificationDesktop();
    });

    return {
      loading,
    };
  },
});
</script>
