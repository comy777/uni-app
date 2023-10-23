<template>
  <Modal :model-value="modal" title="File attachment" :preview-media="true" :close-modal="showModal">
    <template v-slot:content>
      <div id="myresult" class="img-zoom-result hidden absolute top-0 right-[45px] z-[999999999999999999]"></div>
      <div class="py-2 md:self-center relative flex justify-center " id="magnifying_area"
        :class="mobile && 'items-center'"
      >
        <div class="img-zoom-container">
          <div id="lens"></div>
          <img 
            id="myimage" 
            data-id="myimage" 
            :class="isZoomed && 'absolute left-[-125px] top-0'" 
            :src="srcImage"
            class="sm:w-[39%] md:w-full object-contain h-full"
          >
        </div>
      </div>
      <div id="zoomButtons" class="w-full m-[-45px] flex justify-end" v-if="!mobile">
        <button @click="() => toggleZoom(true)" v-if="aumentSize === 0">
          <ZoomOut/>
        </button>
        <button @click="() => toggleZoom(false)" v-if="isZoomed">
          <ZoomIn/>
        </button>
      </div>
    </template>
  </Modal>
</template>

<style scoped>
  #magnifying_area {
    width: 800px;
    height: 500px;
    overflow: hidden;
  }
  #magnifying_img {
    width: 350px;
    height: 450px;
  }
  * {
      box-sizing: border-box;
  }
  .img-zoom-container {
    display: block;
    position: relative;
    width: 100%;
    height: auto;
  }
  .img-zoom-result {
    border: 1px solid #d4d4d4;
    /*set the size of the result div:*/
    width: 350px;
    height: 350px;
  }
</style>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ConversationAttachmentWithLink } from "../../models/conversation";
import Modal from "../objects/Modal.vue";
import ZoomIn from "../icons/ZoomIn.vue"
import ZoomOut from '../icons/ZoomOut.vue'
import { mobileBrowser } from "../../utils/mobile";

export default defineComponent({
  components: {
    Modal,
    ZoomIn,
    ZoomOut
  },

  props: {
    uri: {
      type: String,
      required: true
    },
    modal: {
      type: Boolean,
      required: true
    },
    setModal: {
      type: Function,
      required: true
    }
  },

  setup(props) {
    const caseAttachments = ref<ConversationAttachmentWithLink[]>([]);
    const showModalSummary = ref<boolean>(false);
    const caseAttachmentsLoaded = ref<boolean>(false);
    const modal = ref(props.modal);
    const summaryContent = ref()
    const srcImage = ref(props.uri)
    const isZoomed = ref(false)
    const aumentSize = ref(0)
    const resizedSize = ref('2800px 1575px')
    const positionImage = ref(0)
    const mobile = ref(mobileBrowser())


    const toggleZoom = (value: boolean) => {
      const result = document.getElementById('myresult')
      if(!isZoomed.value && value) {
        result.classList.remove('hidden')
        imageZoom();
        isZoomed.value = value
        return
      }
      if(value && isZoomed.value) {
        resizedImage(true)
        return
      }
      if(!value && aumentSize.value > 0) {
        resizedImage(false)
        return
      }
      resetValues()
    }

    function imageZoom() {
      const img: any = document.getElementById("myimage");
      const lens = document.getElementById("lens")
      const result = document.getElementById('myresult')
      let cx: any, cy: any;
      /*add class lens*/
      lens.classList.add("img-zoom-lens");
      /*insert lens:*/
      img.parentElement.insertBefore(lens, img);
      /*calculate the ratio between result DIV and lens:*/
      cx = result.offsetWidth / lens.offsetWidth;
      cy = result.offsetHeight / lens.offsetHeight;
      
      function moveLens(e: any) {
        if(!isZoomed.value) return
        let pos, x, y;
        /*set background properties for the result DIV:*/
        result.style.backgroundImage = "url('" + img.src + "')";
        const heigth = (img.width * cx) + "px"
        const width = (img.height * cy) + "px";
        const redimenzionar = `${heigth} ${width}`;
        if(!resizedSize.value) resizedSize.value = redimenzionar
        result.style.backgroundSize = resizedSize.value;
        /*prevent any other actions that may occur when moving over the image:*/
        e.preventDefault();
        /*get the cursor's x and y positions:*/
        pos = getCursorPos(e);
        /*calculate the position of the lens:*/
        const aumento = positionImage.value
        x = pos.x - (lens.offsetWidth / 2);
        y = pos.y - (lens.offsetHeight / 2);
        /*prevent the lens from being positioned outside the image:*/
        if (x > img.width - lens.offsetWidth) {
          x = img.width - lens.offsetWidth;
        }
        if (x < 0) {
          x = 0;
        }
        if (y > img.height - lens.offsetHeight) {
          y = img.height - lens.offsetHeight;
        }
        if (y < 0) {
          y = 0;
        }
        /*set the position of the lens:*/
        lens.style.left = (x) + "px";
        lens.style.top = (y) + "px";
        /*display what the lens "sees":*/
        result.style.backgroundPosition = "-" + ((x * cx) + aumento) + "px -" + ((y * cy) + aumento) + "px";
      }

      function getCursorPos(e: any) {
        let a, x = 0, y = 0;
        e = e || window.event;
        /*get the x and y positions of the image:*/
        a = img.getBoundingClientRect();
        /*calculate the cursor's x and y coordinates, relative to the image:*/
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        /*consider any page scrolling:*/
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return { x, y };
      }
      /*execute a function when someone moves the cursor over the image, or the lens:*/
      lens.addEventListener("mousemove", moveLens);
      img.addEventListener("mousemove", moveLens);
      /*and also for touch screens:*/
      lens.addEventListener("touchmove", moveLens);
      img.addEventListener("touchmove", moveLens);
    }

    const resizedImage = (zoom: boolean) => {
      zoom ? aumentSize.value++ : aumentSize.value = 0 
      if(aumentSize.value > 1) return
      const valueSplit = resizedSize.value.split('px')
      const height = zoom ? parseInt(valueSplit[0]) + 500 : parseInt(valueSplit[0]) - 500
      const width = zoom ? parseInt(valueSplit[1]) + 500 : parseInt(valueSplit[1]) - 500
      resizedSize.value = `${height}px ${width}px`
      positionImage.value = zoom ? positionImage.value + 250 : positionImage.value - 250
    }

    const resetValues = () => {
      const lens = document.getElementById("lens")
      const result = document.getElementById('myresult')
      result.classList.add('hidden')
      result.style.removeProperty('background-image')
      result.style.removeProperty('background-size')
      result.style.removeProperty('background-position')
      lens.classList.remove("img-zoom-lens");
      aumentSize.value = 0
      resizedSize.value = '2800px 1575px'
      positionImage.value = 0
      isZoomed.value = false
    }

    const showModal = () => props.setModal()

    return {
      summaryContent,
      caseAttachments,
      showModalSummary,
      caseAttachmentsLoaded,
      modal,
      srcImage,
      isZoomed,
      aumentSize,
      mobile,
      toggleZoom,
      resizedImage,
      showModal
    };
  },
});
</script>