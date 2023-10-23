<template>
  <h1 class="text-xl text-center">Messages Alerts</h1>
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
        iconSrc: "/assets/svg/avatar-example-0.svg",
        iconAlt: "Avatar example 0",
        title: "Dr. Jack Marrow",
        date: "11:45 AM",
        datetime: "2022-03-29T16:45:00.122Z",
        message: "Have we taken a look at the patients eating history? This could be a result of high sodium...",
      },
      {
        iconSrc: "/assets/svg/avatar-example-1.svg",
        iconAlt: "Avatar example 1",
        title: "RNA Susan Kune",
        date: "11:43 AM",
        datetime: "2022-03-29T16:45:00.122Z",
        message: "Dr. Big: “What do you guys think about this?”",
      },
      {
        iconSrc: "/assets/svg/avatar-example-2.svg",
        iconAlt: "Avatar example 2",
        title: "Hearth Q/A",
        date: "Yestarday",
        datetime: "2022-03-29T16:45:00.122Z",
        message: "Have you seen the recent journals?",
      },
      {
        iconSrc: "/assets/svg/avatar-example-3.svg",
        iconAlt: "Avatar example 3",
        title: "Hearth Q/A",
        date: "Yestarday",
        datetime: "2022-03-29T16:45:00.122Z",
        message: "I could really use your advice on an issue I’m...",
      },
    ]);

    return {
      items,
    };
  },
});
</script>
