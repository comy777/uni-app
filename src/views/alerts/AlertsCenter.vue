<template>
  <h1 class="text-xl text-center">Alerts Center</h1>
  <AlertsList :items="alerts" />
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";
import AlertsList from "../../components/alerts/AlertsList.vue";
import { useStore } from "vuex";
import { getAlertsOnlyNotification } from '../../controllers/events';

export default defineComponent({
  components: {
    AlertsList,
  },

  setup() {
    const store = useStore()

    onMounted(() => {
      store.dispatch('events/fetchEvents')
      //store.dispatch('events/setAllAsSeen')
    })

    const alerts = computed(() => {
      return getAlertsOnlyNotification(store.state.events.events, false);
    })

    return {
      alerts,
    };
  },
});
</script>
