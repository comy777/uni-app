<template>
  <TransitionRoot as="template" :show="modelValue">
    <Dialog as="div" class="fixed inset-0 z-50 overflow-y-auto" @close="clicked">
      <div class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
          <div :class="previewMedia ? 'h-[100vh] py-24' : ' px-4 pt-5 pb-4 sm:my-8 bg-white rounded-lg'" class="inline-block overflow-hidden text-left align-bottom transform transition-all sm:align-middle sm:w-full sm:p-6">
            <div class="absolute hidden pt-4 pr-4 sm:flex flex-col w-full">
              <div class="flex flex-row">
                <button @click="closeModal">
                  <XIcon />
                </button>
                <DialogTitle as="h3" class="mt-2 text-xl font-semibold text-white leading-6 ml-2">{{ title }}</DialogTitle>
              </div>

              <slot name="content"></slot>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import XIcon from '../icons/XIcon.vue';

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    previewMedia: {
      type: Boolean,
      require: false,
      default: false,
    },
    closeModal: {
      type: Function,
    },
  },
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    XIcon,
  },
  setup(props, { emit }) {
    const status = ref(false);

    const clicked = () => {
      emit('update:modelValue', false);
    };

    const closeModal = () => {
      if (!props.closeModal) return;
      props.closeModal();
    };

    return {
      status,
      clicked,
      closeModal,
    };
  },
});
</script>

<style scoped></style>
