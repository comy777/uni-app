<template>
  <div 
    class="flex justify-center items-center float-right py-2 px-4 rounded-full h-12 mt-4" 
    :class="disabled ? 'bg-gray-500' : 'bg-[#AD2B59]'">
    <div 
      wire:loading 
      class="flex flex-col items-center justify-center" v-if="load">
      <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-7 w-7"></div>
    </div>
    <button v-else class="my-4 float-right" @click="() => onPress()" :disabled="disabled">
      <div class="text-white font-bold" :class="disabled ? 'cursor-default' : 'cursor-pointer'">
        Save
      </div>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Loader Button",
  props: {
    title: {
      type: String,
      required: true
    },
    load: {
      type: Boolean,
      required: true
    },
    onPress: {
      type: Function,
      required: true
    },
    disabled: {
      type: Boolean,
      required: true
    }
  },
  setup(props){
    return { props }
  }
})

</script>

<style scoped>
.loader {
  border-top-color: gray;
  -webkit-animation: spinner 1.5s linear infinite;
  animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>