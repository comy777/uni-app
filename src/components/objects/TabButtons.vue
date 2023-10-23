<template>
  <div class="sm:hidden">
    <label for="tabs" class="sr-only">{{ title }}</label>
    <select id="tabs" class="
        bg-gray-50
        border border-gray-300
        text-gray-900
        sm:text-sm
        rounded-lg
        focus:ring-blue-500 focus:border-blue-500
        block
        w-full
        p-2.5
      ">
      <option v-for="option in options" :key="option">{{ option.name }}</option>
    </select>
  </div>
  <div class="
          space-y-4
          flex flex-col
          justify-start
          sm:flex sm:space-y-0
        ">

    <label v-if="pathnameURL !== '/wrvu/time-entries'" for="buttons" class="my-2">{{ title }}</label>
    <ul :class="[
      'flex',
      'hidden:md',
      'rounded-sm',
      'divide-x',
      'divide-vino',
      'shadow',
      'sm:flex',
      'border', 
      'border-vino',
      'fit-content'
    ]">
      <li class=" text-center" v-for="(option, index) in options" :key="option"
        :class="option.active ? selectedClasses : unselectedClasses">
        <a class="
          inline-block
          relative
          py-2
          px-2
          w-full
          text-sm 
          cursor-pointer
          flex-nowrap
        " @click="clickHandler(index)">{{ option.name }}</a>
      </li>
    </ul>
  </div>
</template>
<style scoped>
.fit-content{
  width: fit-content;
}
</style>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    // Should be a string with all the custom classes (identical to using HTML classes)
    selectedClasses: {
      type: String,
      required: false,
      default: "border-transparent",
    },
    unselectedClasses: {
      type: String,
      required: false,
      default: "border-transparent",
    },
    clickHandler: {
      type: Function,
      required: true,
    },
    options: {
      type: Array,
      required: true,
      default: [1, 2],
    },
    title: {
      type: String,
      required: false,
      default: "",
    },
  },
  
  setup(props) {

    const pathnameURL: string = location.pathname;
    return {
      clickHandler: props.clickHandler,
      // background: props.background,
      selectedClasses: props.selectedClasses,
      unselectedClasses: props.unselectedClasses,
      pathnameURL
    };
  },
});
</script>
