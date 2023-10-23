<template>
    <editor
        id="content"
        v-model="summary"
        api-key="zqkmy2kb010pda2expmnnlbqrydax7vuuutgn7b6uagw3hsl"
        :init="{
        height: 250,
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount',
        ],
        toolbar:
          ' bold italic fontsizeselect link | \
            bullist numlist outdent indent | \
            forecolor backcolor | \ ',
        default_link_target: 'blank',
        paste_preprocess: (plugin: any , args : any) => {
          args.content += ' ';
        },
        mobile: {
          fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
          plugins: [
            'advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount',
          ],
          toolbar:
            ['undo redo bold italic underline bullist numlist outdent', 'indent forecolor backcolor alignleft aligncenter alignright alignjustify'],
        }
      }"
    />
    <div
        :class="hideAttach ? `hidden` : ``"
        class="flex justify-end flex-shrink-0 w-full md:py-2"
        id="Editor"
    >
        <!-- Upload attachments input button -->
        <div class="mr-2">
            <button
                type="button"
                class="relative inline-flex items-center px-4 py-2 text-sm font-medium bg-white border border-vino shadow-sm rounded-md"
                v-on:click="captureChangeImageClick()"
            >
                <LinkIcon class="w-5 h-5 mr-2 -ml-1 text-vino" aria-hidden="true" />
                <label
                    for="cases-chat-file-upload"
                    class="relative font-medium bg-white cursor-pointer rounded-md"
                >
                    <span class="uppercase text-vino">Attach</span>
                    <input
                        id="cases-chat-file-upload"
                        name="cases-chat-file-upload"
                        type="file"
                        class="sr-only"
                        @change="attachmentFilesChanged"
                        multiple
                    />
                </label>
            </button>
        </div>
    </div>
</template>

<style>
.tox-editor-header {
    width: 57%;
}

.tox-tinymce {
    border: 2px solid #60606026 !important;
}
</style>

<script lang="ts">
/** IMPORTANT Note: This rich text editor works with a Vuex store, updating one of its variables.
 * It has a method to update that store variable (setter) and a method to get that store variable (getter)
 */
import { defineComponent, computed, ref } from 'vue';
import { useStore } from 'vuex';
import { LinkIcon } from '@heroicons/vue/solid';
import Editor from '@tinymce/tinymce-vue';

export default defineComponent({
    components: {
        editor: Editor,
        LinkIcon,
    },

    props: {
        /** vModelGetter is the function executed to get current state on v-model with Vuex */
        vModelGetter: {
            type: Function,
            required: true,
        },
        /** vModelGetter is the function executed to set current state on v-model with Vuex (with a mutation) */
        vModelSetter: {
            type: Function,
            required: true,
        },
        hideAttach: {
            type: Boolean,
            required: false,
        },
    },

    setup(props) {
        const store = useStore();
        const message = ref('');
        /**
         * This is a "Two-way computed property" very useful for doing custom logic using v-model in Vue 3
         * In this case, the value is get from a Vuex store, and updated by a mutation.
         *
         * Two custom functions (one for Get and one for Set) are used for maximum flexibility
         */
        const summary = computed({
            get() {
                // vModelGetter should execute a query to a Vuex state
                return props.vModelGetter();
            },
            set(value: any) {
                // vModelSetter should execute a Vuex mutation to the 'vModelValue'
                return props.vModelSetter(value);
            },
        });

        const attachments = computed(() => {
            return store.state.attachments.attachmentsNumber;
        });

        function attachmentFilesChanged(event: any) {
            let archivo: string = event.target.files[0].name;
            let reader = new FileReader();
            // Verify file type
            if (archivo.includes('.jpg') || archivo.includes('.png') || archivo.includes('.jpeg')) {
                reader.onload = () => {
                    summary.value += `<img width="150" src="${reader.result}" />`;
                };
                reader.readAsDataURL(event.target.files[0]);
            } else if (archivo.includes('.mp4')) {
                let file = event.target.files[0];
                let blobURL = URL.createObjectURL(file);
                reader.onload = () => {
                    summary.value += `
            <video width="320" height="240" controls>
              <source src=${blobURL} type="video/mp4">
            </video>
          `;
                };
                reader.readAsDataURL(event.target.files[0]);
            }
        }

        const captureChangeImageClick = () => {
            document.getElementById('cases-chat-file-upload').click();
        };

        return {
            summary,
            captureChangeImageClick,
            attachmentFilesChanged,
            message,
        };
    },
});
</script>
