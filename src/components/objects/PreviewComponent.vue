<template>
  <div v-if="urlFile"
    :class="urlFile.info !== 'image' && 'absolute top-0 right-0 left-0 bottom-0 z-[999999999999999999]'">
    <div v-if="urlFile.info === 'image'">
      {{ changeCursor }}
      <div class="modal-overlay" id="image-container">
        <div class="close-bar z-40">
          <button class="modal-close-btn" @click="zoomIn"><zoomOut class="h-8" /></button>
          <button class="modal-close-btn" @click="zoomOut"><zoomIn class="h-8" /></button>
          <button class="modal-close-btn" @click="closePreview"><XIcon class="h-8" /></button>
        </div>
        <v-zoomer class="h-screen w-full p-12" ref="zoomer" id="image-container">
          <img :modal="modal" :set-modal="closePreview" :src="urlFile.url"
            style="object-fit: contain; width: 100%; height: 100%;">
        </v-zoomer>
      </div>
    </div>
    <div style="background-color: rgba(0, 0, 0, .7)" class="h-full w-full flex justify-center items-center relative"
      @click="closePreview" v-else>
      <div class="absolute top-0 right-0 m-5 hover:cursor-pointer">
        <h1 class="text-white" @click="closePreview">Close</h1>
      </div>
      <video v-if="urlFile.info === 'video'" :src="urlFile.url" height="400" width="600" controls />
      <embed v-else class="md:h-full sm:h-[70%] md:w-[90%] bg-white" :type="urlFile.type" :src="urlFile.url" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch,onMounted, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
import XIcon from "../icons/XIcon.vue";
import zoomIn from "../icons/ZoomIn.vue";
import zoomOut from "../icons/ZoomOut.vue";
import VueZoomer from 'vue-zoomer'

export default defineComponent({
  props: {
    setModal: {
      type: Function,
    }
  },

  components: {
    VZoomer: VueZoomer.Zoomer,
    XIcon,
    zoomIn,
    zoomOut
  },

  setup(props) {
    const store = useStore();
    const urlFile = ref();
    const modal = ref(true);
    const zoomer = ref(null);
    let changeCursor = ref<boolean>(true);

    const closePreview = () => {
      store.commit('attachments/setEmbedFile');
      store.commit('attachments/setFileTimeEntrie', false);
      urlFile.value = undefined;
      if (props.setModal) props.setModal();
      modal.value = false;
    };

    watch(() => store.state.attachments.embedFile, (url) => {
      if (url) {
        urlFile.value = url;
        modal.value = true;
      }
    });
    const zoomIn = () => {
      if (zoomer.value) {
        zoomer.value.zoomIn();
      }
    };
    const zoomOut = () => {
      if (zoomer.value) {
        zoomer.value.zoomOut();
      }
    };
    const closeOnEsc = (event:KeyboardEvent) =>{
      if (event.key === 'Escape') closePreview();
    }
    onMounted(() => {
      window.addEventListener('keyup', closeOnEsc);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('keyup', closeOnEsc);
    });
    return {
      urlFile,
      modal,
      closePreview,
      zoomer,
      zoomIn,
      zoomOut,
      changeCursor,
    };
  },
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.979);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999999999999999999;
}

.modal-container {
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
  position: relative;
}

.image-container {
  width: 90%;
  margin: 0 auto;
}

.close-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.979);
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  box-sizing: border-box;
  position: fixed;
  z-index: 20px;
}

.modal-close-btn {
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 18px;
}
#image-container {
  cursor: zoom-in;
}



</style>
