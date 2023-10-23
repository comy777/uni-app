<template>
  <div 
    class="h-[96px] flex items-center bg-[#C187B8] rounded-2xl relative my-2 md:mx-1 sm:w-full"
    :class="stoplightUser ? 'md:w-[30vw]' : 'md:w-[20vw]'"  
  >
    <div class="flex items-center justify-center px-4">
      <div>
        <component v-bind:is="icon" />
      </div>
      <div class="md:ml-4 sm:ml-8">
        <h3 class="font-bold text-white text-xl">{{ title }}</h3>
      </div>
    </div>
    <div class="absolute right-0 bottom-0">
      <OlaIcon />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import OlaIcon from './OlaIcon.vue'

export default defineComponent({
  name: 'IconTop',
  props: {
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    stoplightUser: {
      type: Boolean
    }
  },
  components: { OlaIcon },
  setup(props){
    return { props }
  }
})
</script>