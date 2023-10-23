<template>
  <div class="flex flex-wrap">
    <div class="md:h-[152px] md:w-[152px] sm:w-28 sm:h-28 m-2 flex justify-center items-center sm:py-2"
      style="background: rgba(131, 16, 112, 0.05); border-radius: 22px;rgba(131, 16, 112, 0.05)">
      <div class="fexl justify-center">
        <div class="flex-col justify-center">
          <component v-bind:is="icon" :mobile="mobile" />
          <div class="mt-2">
            <h1 class="text-center md:text-lg sm:text-sm">{{ title }}</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Icon applications',
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    mobile: {
      type: Boolean,
      required: true
    }
  },
  setup(props){
    return { props }
  }

})
</script>