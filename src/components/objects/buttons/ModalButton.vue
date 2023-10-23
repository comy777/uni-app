<template>
    <button
      type="button"
      class="px-8 py-2 mt-5 text-base font-medium uppercase border sm:mt-4 rounded-3xl shadow-sm sm:text-sm"
      :class="[background, textColor, customClasses]"
      @click="() => clickHandler()"
      :disabled="disabled"
    >
      {{ text }}
    </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    // Should be a string with all the custom classes (identical to using HTML classes)
    customClasses: {
      type: String,
      required: false,
      default: "border-transparent",
    },
    clickHandler: {
      type: Function,
      required: true,
    },
    background: {
      type: String,
      required: true,
      default: "bg-vino",
    },
    textColor: {
      type: String,
      required: true,
      default: "text-white",
    },
    text: {
      type: String,
      required: true,
      default: "TheTextHere",
    },
    disabled: {
      type: Boolean
    }
  },

  setup(props) {
    return {
      clickHandler: props.clickHandler,
      background: props.background,
      customClasses: props.customClasses,
      props
    };
  },
});
</script>
