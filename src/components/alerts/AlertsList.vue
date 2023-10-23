<template>
  <div class="flex flex-col overflow-y-auto h-full">
    <AlertListItem v-for="item in items" :item="item" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import AlertListItem from "./AlertListItem.vue";

export default defineComponent({
  components: {
    AlertListItem,
  },

  props: {
    items: {
      type: Array,
      required: true,
    },
  },

  setup(props) {
    return {};
  },
});
</script>
