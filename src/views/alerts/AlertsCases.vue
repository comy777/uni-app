<template>
  <h1 class="text-xl text-center">Cases Alerts</h1>
  <AlertsList :items="items" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import AlertsList from "../../components/alerts/AlertsList.vue";
import { AlertItem } from "../../models/alerts";

export default defineComponent({
  components: {
    AlertsList,
  },

  setup() {
    const items = ref<AlertItem[]>([
      {
        title: "Your password has been succesfully changed",
        date: "11:45 AM",
        datetime: "2022-03-29T16:45:00.122Z",
        message: "",
      },
      {
        title: "Time entry submitted 10/3 has been approved",
        date: "7:45 AM",
        datetime: "2022-03-29T12:45:00.122Z",
        message: "",
      },
      {
        title: "Time entry submitted 10/3 has been approved",
        date: "Yestarday",
        datetime: "2022-03-29T16:45:00.122Z",
        message: "",
      },
    ]);

    return {
      items,
    };
  },
});
</script>
