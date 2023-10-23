<template>
  <div class="fixed inset-0 top-0 right-0 left-0 bottom-0 z-50">
    <div 
      style="background-color: rgba(0, 0, 0, .7)" 
      class="sticky h-full w-full flex justify-center items-center" 
    >
      <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-red-700 dark:text-white">Alert</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Do you want to cancel the upload?
        </p>
        <div class="flex float-right mb-2">
          <div 
            class="bg-vino hover:cursor-pointer text-white font-bold py-2 px-4 rounded"      
            @click="() => handleCancelUpload()">
            No
          </div>
          <button 
            class="bg-red-700 text-white font-bold py-2 px-4 rounded ml-5"
            @click="() => handleCancelUpload(true)">
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    setShow: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const handleCancelUpload = (value?: boolean) => props.setShow(value)
    return { handleCancelUpload };
  },
});

</script>
