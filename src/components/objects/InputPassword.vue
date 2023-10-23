<template>
  <div>
    <label class="block text-sm font-medium text-gray-700"></label>
    <div class="mt-1">
      <input
          :value="modelValue"
          :disabled="disabled"
          :placeholder="placeholder"
          @input="changeValue($event)"
          type="password"
          :required="required"
          class="block w-full placeholder-gray-400 border-b border-gray-400 appearance-none shadow-sm focus:outline-none sm:text-sm"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      require: true,
    },
    placeholder: {
      type: String,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 1000,
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }){
    const changeValue = (e: Event) => {
      emit("update:modelValue", e.target?.value);
    }
    return {
      changeValue
    }
  }
});
</script>

<style scoped>

</style>