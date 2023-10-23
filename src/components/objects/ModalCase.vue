<template>
  <TransitionRoot as="template" :show="modalValue">

    <Dialog as="div" class="fixed inset-0 z-10 overflow-y-auto">
      <div
          class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
      >
        <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="ease-in duration-200"
            leave-from="opacity-100"
            leave-to="opacity-0"
        >
          <DialogOverlay
              class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          />
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
            class="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
        >&#8203;</span>
        <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
              class="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom bg-white rounded-lg shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full sm:p-6"
          >
            <div class="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
              <button
                  type="button"
                  class="text-gray-400 bg-white rounded-md hover:text-gray-500"
                  @click="closeModal"
              >
                <span class="sr-only">Close</span>
                <XIcon class="w-6 h-6" aria-hidden="true"/>
              </button>
            </div>

            <div class="sm:flex sm:items-start">

              <slot name="before-title"></slot>

              <div class="text-center sm:mt-0 sm:ml-4 sm:text-left">

                <DialogTitle
                    as="h3"
                    class="mt-2 text-lg font-medium text-gray-900 leading-6"
                >{{ title }}</DialogTitle>
              </div>
            </div>
            <slot name="content"></slot>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { XIcon } from "@heroicons/vue/outline";

export default defineComponent({
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    XIcon
  },

  emits: ["updateModalValue"],

  props: {
    modalValue: {
      type: Boolean,
      require: true,
    },

    title: {
      type: String,
      require: true
    }
  },

  setup(props, {emit}) {
    const status = ref(false);

    const closeModal = () => {
      emit("updateModalValue", false);
    }

    return {
      status,
      closeModal,
    }
  }
});
</script>

<style scoped>

</style>
