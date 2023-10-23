<template>
  <div id="content" class="mt-5">
    <label>Attach File</label>
    <div class="flex justify-center items-center hover:cursor-pointer mb-12">
      <div v-for="(file, i) in urlImages" :key="i" class="mx-2 h-40">
        <div class="my-10 relative flex justify-center items-center flex-col">
          <img :src="file.type !== 'video' ? file.url : videoImage2" class="h-24 w-36 object-contain"
            @click="changeSelectImage(file, i)" />
          <div class="absolute top-[-25px] bg-[#EFEFEF] rounded-3xl px-2"
            :class="(file.type !== 'image' && urlImages.length < 4) ? 'right-[25px]' : 'right-[-15px]'"
            @click="deleteImage(i, file.type)">
            x
          </div>
          <div class="my-5">
            <span>{{ file.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="mt-2 p-2">
    <div class="flex flex-shrink-0 mt-4">
      <button type="button" class="
                relative
                inline-flex
                items-center
                px-4
                py-2
                text-sm
                font-medium
                bg-white
                border border-vino
                shadow-sm
                rounded-md
            ">
        <LinkIcon class="w-5 h-5 mr-2 -ml-1 text-vino" aria-hidden="true" />
        <label for="file-upload" class="
                    relative
                    font-medium
                    bg-white
                    cursor-pointer
                    rounded-md
                ">
          <span class="uppercase text-vino">Upload</span>
          <input id="file-upload" name="file-upload" type="file" class="sr-only" @change.prevent="attachmentFilesChanged"
            multiple />
          {{ urlImages.length }}
        </label>
      </button>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref } from "vue";
import { LinkIcon } from '@heroicons/vue/solid';
import videoImage from '../../assets/svg/video op1.svg'
import videoImage2 from '../../assets/svg/video op2.svg'
import { validateFiles } from "../../utils/files";
import { useStore } from "vuex";
import { FileType, ValidateFilesProps } from "../../interfaces/interfaces";
import { mobileBrowser } from "../../utils/mobile";

export default defineComponent({
  components: {
    LinkIcon
  },
  props: {
    setFiles: {
      type: Function,
      required: true
    },
    getFiles: {
      type: Boolean
    },
    timeEntries: {
      type: Boolean
    }
  },

  setup(props) {
    const store = useStore()
    const files = ref<File[]>([])
    const urlImages = ref([])
    const imageSelect = ref()
    const urlFile = ref()
    const filesEmbed = ref([])

    const saveFiles = () => {
      const uuid = localStorage.getItem('user_id')
      const conversation_id = ''
      const data = {
        file: files.value,
        uuid,
        conversation_id
      }
      props.setFiles(false, 0, data)
    }

    const validateFileInput = async (fileData: File) => {
      const data: ValidateFilesProps = { fileData, files: files.value, urlImages: urlImages.value, filesEmbed: filesEmbed.value, view: props.timeEntries ? 'cases' : 'chats' }
      const response = await validateFiles(data)
      const { imageSelectResp, filesResp, countFilesResp, filesEmbedResp, urlImagesResp } = response
      imageSelect.value = imageSelectResp
      files.value = filesResp
      filesEmbed.value = filesEmbedResp
      urlImages.value = urlImagesResp
      if (props.getFiles) saveFiles()
    }

    const addFile = (e: any) => {
      const { files } = e.target
      if (!files) return
      validateFileInput(files[0])
    }

    const changeSelectImage = (fileData: FileType, index: number) => {
      const validate = mobileBrowser()
      const { type } = fileData
      if (validate && (type !== 'image' && type !== 'video')) {
        alert('No se puede previsualizar el documento')
        return
      }
      const file = filesEmbed.value[index]
      store.commit('attachments/setEmbedFile', file)
      store.commit('attachments/setFileTimeEntrie', true)
      imageSelect.value = fileData
    }

    const deleteImage = (index: number, type: string) => {
      if (urlImages.value.length === 0) return
      urlImages.value.splice(index, 1)
      files.value.splice(index, 1)
      filesEmbed.value.splice(index, 1)
      props.setFiles(true, index, undefined)
    }

    const attachmentFilesChanged = (event: any) => {
      const file = event.target.files[0]
      validateFileInput(file)
    };

    return {
      files,
      urlImages,
      addFile,
      imageSelect,
      changeSelectImage,
      deleteImage,
      saveFiles,
      videoImage,
      videoImage2,
      attachmentFilesChanged,
      urlFile,
      mobileBrowser
    };
  },
});
</script>