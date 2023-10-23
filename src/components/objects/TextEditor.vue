<template>
    <teleport to="body">
        <AlertFile v-if="didCancel" :set-show="handleCancelUpload" />
    </teleport>
    <div>
        <Modal v-model="modalFile" title="" :set-show-modal="showModal" :show-modal="modalFile">
            <template v-slot:content>
                <FilesComponent :fileData="filesData" :set-modal="showModal" :view="view" :conversation-id="conversationId"
                    :controller="controller" :set-sending-files="setSendingFiles" :sending-files="sendingFiles"
                    :cancel-upload="cancelUpload" :set-cancel-upload="handleCancelUploadStore" :sendFiles="sendFiles" />
            </template>
        </Modal>
        <div class="ml-4">
            <div @drop.prevent="handleDropFile($event)" @dragover.prevent="setIsDragOver(true)"
                @dragleave.prevent="setIsDragOver(false)">
                <div class="mr-4" :class="[
                    dragDropFiles && dragDropFiles.length > 0
                        ? 'border-t-2 border-l-2 border-r-2 rounded-t-xl'
                        : '',
                ]">
                    <div class="z-10" :class="showDragOverEffect ? 'drag-drop-overlay' : ''">
                        <div v-if="dragDropFilesLoading" class="flex items-center justify-center p-1">
                            <CircularProgressBar class="text-center" :percentage="uploadProgress" />
                        </div>

                        <DragAndDropPreviewer :dragDropFiles="dragDropFiles" @delete:file="handleDeleteFile" />
                    </div>
                </div>

                <div class="flex md:mr-4 sm:mr-0 relative" :class="[
                    dragDropFiles && dragDropFiles.length > 0
                        ? 'border-b-2 border-l-2 border-r-2 rounded-b-xl'
                        : 'border-2 rounded-xl',
                    showDragDropOverlay && isTabletOrDesktopScreenSize
                        ? 'drag-drop-overlay'
                        : '',
                ]">
                    <div class="h-12 xl:h-16 xl:py-2 w-full flex flex-col"
                        :class="[showDragOverEffect ? 'justify-center items-center' : '']">
                        <h3 v-if="showDragOverEffect" class="text-purple-700">
                            Drop your files here
                        </h3>

                        <div class="relative">
                            <div v-if="resultParticipants.length > 0"
                                class="bg-white w-[auto] absolute sm:bottom-0 md:bottom-3 sm:overflow-y-auto md:overflow-y-hidden sm:max-h-64 md:max-h-96 xl:max-h-96 2xl:max-h-96 3xl:max-h-96 p-4 rounded-tl-xl rounded-tr-xl border-l-2 border-t-2 border-r-2 border-gray-300 left-0">
                                <span class="mb-4">Suggestions</span>
                                <div v-for="(participant, i) in resultParticipants" :key="participant.id"
                                    @click="() => selectParticipant(participant, i)"
                                    class="cursor-pointer border-b-2 border-b-white mb-2 py-2 hover:bg-gray-200">
                                    <div class="flex items-center">
                                        <InitialsContainer :style="getColorInitialsContainer(i)"
                                            :profile-initials="participant.initials" :fontSize="'text-xs'" :width="'h-9'"
                                            :height="'w-9'" />
                                        <div class="ml-2 text-sm">
                                            {{ participant.name }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <QuillEditor ref="editor" v-if="!showDragOverEffect" v-model:content="message"
                            @keydown.enter.exact="preventAndSendMessage" :modules="(modules as any)" content-type="html"
                            toolbar="#my-toolbar" style="border: none; flex-grow: 1" overflow-y: auto>
                        </QuillEditor>
                    </div>

                    <div class="flex justify-end mr-5 cursor-pointer self-center right-0">
                        <div class="" @click="onSubmit()">
                            <SendIcon class="flex h-8 mt-2" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- </div> -->
            <div id="my-toolbar" style="border: none; padding-left: 13px">
                <!-- Add buttons as you would before -->
                <button class="ql-bold"></button>
                <button class="ql-italic"></button>
                <button class="ql-underline"></button>
                <div class="flex w-5 cursor-pointer" @click="triggerInputFile()">
                    <PhotographIcon class="h-5" />
                </div>
            </div>
        </div>
        <div class="hidden">
            <!-- Upload attachments input button -->
            <div class="mr-2">
                <button type="button"
                    class="relative inline-flex items-center px-4 py-2 text-sm font-medium bg-white border border-vino shadow-sm rounded-md">
                    <LinkIcon class="w-5 h-5 mr-2 -ml-1 text-vino" aria-hidden="true" />
                    <label for="cases-chat-file-upload" class="relative font-medium bg-white cursor-pointer rounded-md"
                        :class="sendingFiles && 'hover:cursor-default'">
                        <span class="uppercase text-vino">Attach</span>
                        <input id="cases-chat-file-upload" name="cases-chat-file-upload" type="file" class="sr-only"
                            multiple :disabled="sendingFiles" value="" />
                    </label>
                </button>
            </div>
        </div>
    </div>
</template>
<style scoped>
div:focus,
input:focus,
input[type]:focus {
    outline: 0 none;
}
</style>
<script lang="ts">
import { defineComponent, watch, ref, onMounted, computed } from 'vue';
import { useFilesUpload } from '../../composables/FileUpload';
import { v4 as uuid4 } from 'uuid';
import { useStore } from 'vuex';
import { MessagePayload } from '../../models/conversation';
import { ConversationMessage } from '../../models/chats';
import { createConversationMessage } from '../../controllers/chat';
import { getUserFromLocalStorage } from '../../lib/users/localstorage-manager';
import { getCurrentISODate } from '../../lib/dates/dates';
import { validateImages } from '../../utils/validate';
import { LinkIcon } from '@heroicons/vue/solid';
import Modal from './ModalSimple.vue';
import FilesComponent from '../chat/FilesComponent.vue';
import AlertFile from '../alerts/AlertFile.vue';
import SendIcon from '../icons/SendIcon.vue';
import { PaperAirplaneIcon, PhotographIcon } from '@heroicons/vue/outline';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import 'quill-paste-smart';
import QuillMagicUrl from 'quill-magic-url';
import { useRoute } from 'vue-router';
import { IFileUploadResponse, ListConversation } from '../../interfaces/response';
import { chatColors } from '../../utils/const';
import InitialsContainer from './containers/InitialsContainer.vue';
import DocumentLogo from '../../assets/img/Document.png';
import DragAndDropPreviewer from '../chat/dragAndDrop/DragAndDropPreviewer.vue';
import CircularProgressBar from '../objects/loaders/CircularProgressBar.vue'

export default defineComponent({
    components: {
        LinkIcon,
        FilesComponent,
        Modal,
        AlertFile,
        PaperAirplaneIcon,
        PhotographIcon,
        SendIcon,
        QuillEditor,
        DragAndDropPreviewer,
        InitialsContainer,
        CircularProgressBar,
    },
    props: {
        view: {
            type: String,
            required: false,
            default: 'cases',
        },
        setIdMessage: {
            type: Function,
        },
        conversationId: {
            type: String,
            required: true,
        },
        scrollBottom: {
            type: Function,
        },
    },
    setup(props) {
        const store = useStore();
        var message = ref('');
        const filesData = ref();
        const modalFile = ref(false);
        const view = ref(props.view);
        const controller = ref(new AbortController());
        const sendingFiles = ref(false);
        const didCancel = ref(false);
        const cancelUpload = ref(false);
        const enterCount = ref(0);
        const conversationId = ref(props.conversationId);
        const route = useRoute();
        const conversation = ref<ListConversation>(store.getters['chats/selectedConversation']);
        const mentionParticipants = ref<any[]>([]);
        const resultParticipants = ref([]);
        const position = ref(0);
        const initialsParticipants = ref('');
        const group_name = ref('');
        const dragDropFilesLoading = ref(false);

        const role = localStorage.getItem('user_role');
        const roleName = JSON.parse(role);

        const modules = {
            name: QuillMagicUrl,
            module: QuillMagicUrl,
        };

        const { progress: uploadProgress, uploadFiles, error } = useFilesUpload();

        const isTabletOrDesktopScreenSize = computed(() => {
            return store.getters['chats/isTabletOrDesktopScreenSize'];
        });

        const dragDropFiles = computed(() => {
            return store.state.chats.dragDropFiles;
        });

        const showDragDropOverlay = computed(() => {
            return store.state.chats.showDragDropOverlay;
        });

        const isDragOver = computed(() => {
            return store.state.chats.showDragDropOverlay;
        });

        const showDragOverEffect = computed(() => {
            return isDragOver.value === true && isTabletOrDesktopScreenSize.value === true;
        });

        if (props.view === 'cases' && sessionStorage.getItem('message')) {
            message = ref(`${sessionStorage.getItem('message')}`);
        }

        const setLastMessageLoadingState = (value: boolean) => {
            store.commit('attachments/updateLastMessageAttachmentsLoading', value);
        };

        async function sendMessage(messagePayload: MessagePayload) {
            const sentMessage = await createConversationMessage(messagePayload);
            store.commit('chats/addNewMessage', { message: sentMessage, view: props.view });
            return sentMessage;
        }

        function removeHtmlTags(message: string) {
            const htmlTagsRegex = /<[^>]+>/g;
            const cleanedMessage = message.replace(htmlTagsRegex, '');
            return cleanedMessage;
        }

        async function saveMessageIntoDB(
            messagePayload: MessagePayload,
        ): Promise<ConversationMessage> {
            const res = await sendMessage(messagePayload);
            if (res && props.setIdMessage) {
                const { id } = res;
                props.setIdMessage(id);
            }
            return res;
        }

        /** updateMessageInChatStore uses a created message (from database) to update the details
         * that are missing during an optimistic update of a message. (id, created_at, etc)
         */
        function updateMessageAndResolveIt(
            savedMessage: any,
            message: any,
            data?: IFileUploadResponse,
        ) {
            message.id = data ? data.id : savedMessage.id;
            message.created_at = data ? data.created_at : savedMessage.created_at;
            resolvePendingMessage(message);
        }

        // resolvePendingMessage cleans the store appropriately after a message have been saved succesfully in the DB
        function resolvePendingMessage(message: ConversationMessage) {
            const pendingMessages = store.getters['chats/pendingMessages'];
            if (pendingMessages && message && message.msg_confirmation_id) {
                const index = pendingMessages.findIndex(
                    (msg: any) => msg.msg_confirmation_id === message.msg_confirmation_id,
                );
                const wasItFound: boolean = index !== -1;
                if (wasItFound) {
                    store.commit('chats/resolvePendingMessage', message);
                    return;
                }
            }
        }

        const preventAndSendMessage = (e?: any) => {
            enterCount.value++;
            if (enterCount.value === 1) {
                onSendMessage();
                clearEditor();
            } else {
                clearEditor();
            }
        };

        const getIdConversation = (): string => {
            let theConversationId: string
            if (route.path.includes('cases')) {
                theConversationId = store.getters['cases/currentConversationId']
                if (theConversationId) conversationId.value = theConversationId;
            } else if (route.path.includes('chats')) {
                theConversationId = store.getters['chats/getIdConversation'];
                if (theConversationId) conversationId.value = theConversationId;
            }
            return theConversationId;
        };

        const setDefaultMessage = async (
            theConversationId: string,
            valuesplit: any,
            data?: IFileUploadResponse,
        ) => {
            const messageUUID = uuid4();
            const messagePayload: MessagePayload = {
                message: valuesplit[0],
                conversationId: theConversationId,
                updatedAt: new Date().toISOString(),
                file_url: data?.url || '',
                msg_confirmation_id: messageUUID,
            };

            // Add message as a pending message
            store.commit('chats/addPendingMessage', messagePayload);

            // Add message to the frontend before it is saved to DB (optimistic update)
            const messages = store.getters['chats/messages'];
            const { id: userId, first_name, last_name } = getUserFromLocalStorage();

            const currentUTCISODate: string = getCurrentISODate();
            const theMessage: any = {
                id: null,
                created_at: currentUTCISODate, // Has a default date which is replaced later (used to avoid showing "undefined" in the frontend)
                message: messagePayload.message,
                msg_confirmation_id: messagePayload.msg_confirmation_id,
                profile: {
                    first_name,
                    last_name,
                    id: userId,
                },
                file_url: data?.url || '',
                state: true
            }

            // Update message immediately, before inserting message into DB (optimistic update)
            store.commit('chats/setMessages', {
                messages: [...messages, theMessage],
                newMessage: true,
            });
            if (props.scrollBottom) props.scrollBottom();
            if (data) {
                updateMessageAndResolveIt('', theMessage, data);
                return;
            }

            try {
                // Process message to save it to database and update the database accordingly
                setLastMessageLoadingState(true);
                const savedMessage = await saveMessageIntoDB(messagePayload);
                updateMessageAndResolveIt(savedMessage, theMessage);

                setLastMessageLoadingState(false);
                sessionStorage.removeItem('message');
            } catch (error) {
                console.error(error);
                alert('The file is bigger than the server allows. Max size permitted is 10mb');
            }
        };

        const onSubmit = async () => {
            // Prevent submitting multiple messages with the same content when pressing submit button multiple times.
            if (dragDropFilesLoading.value === true) return

            // Send message case
            if (dragDropFiles.value.length <= 0) {
                await onSendMessage();
                return;
            }

            // Send dragDropFiles case
            const theConversationId = getIdConversation();
            try {
                dragDropFilesLoading.value = true
                const fileUploadResponse = await uploadFiles(theConversationId, roleName, dragDropFiles.value)
                store.commit('chats/clearDragDropFiles')
                await sendFiles(fileUploadResponse)
                dragDropFilesLoading.value = false
            } catch (e) {
                if (e) console.error(e);
            }
        };

        async function onSendMessage(e?: any) {
            const cleanedMessage = removeHtmlTags(message.value);
            if (!cleanedMessage) return;
            getIdConversation();
            if (!conversationId.value) return;
            message.value = message.value.replace(/^<p><br><\/p>/, '').replace(/<p><br><\/p>$/, '');
            const valuesplit = message.value.split('""');
            if (!valuesplit[0]) return;
            setDefaultMessage(conversationId.value, valuesplit);

            // Clean message input immediately after updating the UI.
            message.value = '';
            clearEditor();
        }

        function attachmentFilesChanged(e: any, drop = false) {
            const { files } = e.target;
            const file = files ? files[0] : null;
            if (!file) return;
            e.currentTarget.files = null;
            store.commit('chats/setShowModalFiles');
            if (controller.value.signal.aborted) restoreController();
            const validateFile = validateImages(file);
            if (!validateFile) return;
            const { type, validate } = validateFile;
            if (props.view === 'chats' && type === 'video') {
                alert('Video not allowed');
                return;
            }
            if (!validate) {
                alert('Invalid format');
                return;
            }
            filesData.value = file;
            modalFile.value = true;
        }

        function onDrop(e: any) {
            attachmentFilesChanged(e, true);
        }

        function triggerInputFile() {
            let nodo = document.getElementById('cases-chat-file-upload');
            nodo.click();
        }

        const handleCancelUploadStore = () => (cancelUpload.value = !cancelUpload.value);

        const handleCancelUpload = (value?: boolean) => {
            didCancel.value = false;
            if (value) {
                cancelUpload.value = true;
                controller.value.abort();
                sendingFiles.value = false;
                restoreController();
            }
        };

        const showModal = (resp?: boolean) => {
            store.commit('chats/setShowModalFiles');
            if (modalFile.value && sendingFiles.value) {
                didCancel.value = true;
                return;
            }
            modalFile.value = !modalFile.value;
            if (!modalFile.value) {
                if (sendingFiles.value) controller.value.abort();
                if (didCancel.value) didCancel.value = false;
                filesData.value = [];
            }
        };

        const setSendingFiles = (value: boolean) => (sendingFiles.value = value);

        const restoreController = () => (controller.value = new AbortController());

        const clearEditor = () => {
            const editor = document.querySelector('.ql-editor');
            if (editor) {
                editor.innerHTML = '';
            }
            enterCount.value = 0;
        };

        const sendFiles = async (resp: IFileUploadResponse[]) => {
            getIdConversation();
            if (!conversationId.value) return;
            const idSplit = conversationId.value.split('#');
            const id = idSplit[0];
            for await (const data of resp) {
                await setDefaultMessage(id, [''], data);
            }
        };

        const handleFileChange = (e: any) => {
            attachmentFilesChanged(e);

            // Reset the files queue (from attach component)
            e.target.value = '';

            // Participants of the conversation
            getParticipants();
        };

        const handleDeleteFile = (file: File) => {
            store.dispatch('chats/handleDeleteFile', file);
        };

        const handleDropFile = (event: any) => {
            store.dispatch('chats/handleDropFile', event);
        };

        const setIsDragOver = (isDragOver: boolean) => {
            store.dispatch('chats/setIsDragOver', isDragOver);
        };

        const getParticipants = () => {
            if(!conversation.value) return
            const user_id = localStorage.getItem('user_id')
            mentionParticipants.value = [];
            const participants = conversation.value.conversation_participants;
            const { channel_owner, profile } = conversation.value

            if (channel_owner !== user_id) {
                const name = `${profile.first_name} ${profile.last_name}`
                //Addeed chanel owner to mentions
                mentionParticipants.value.push({
                    id: channel_owner,
                    name,
                    initials: `${profile.first_name[0]} ${profile.last_name[0]}`,
                })
            }

            //Added participants
            participants.forEach((participant) => {
                if (participant.id_participant === user_id) return
                const { first_name, last_name } = participant.profile;
                const name = `${first_name} ${last_name}`;
                mentionParticipants.value.push({
                    id: participant.id_participant,
                    name,
                    initials: `${first_name[0]} ${last_name[0]}`,
                });
            });

            //Added group name
            if (conversation.value.group_name) {
                group_name.value = conversation.value.group_name;
                if (group_name.value)
                    mentionParticipants.value.unshift({
                        id: '',
                        name: group_name.value,
                        initials: 'G',
                    });
            }
        };

        const handleChangeText = () => {
            resultParticipants.value = [];
            const msg = removeHtmlTags(message.value);
            const msgSplit = msg.split(' ');
            const lastWord = msgSplit[msgSplit.length - 1];
            if (lastWord[0] === '@') {
                if (mentionParticipants.value.length === 0) getParticipants();
                mentionParticipants.value.forEach((participant) => {
                    const { name } = participant;
                    const valueSplit = lastWord.split('@');
                    if (name.toLowerCase().includes(valueSplit[valueSplit.length - 1])) {
                        resultParticipants.value.push(participant);
                    }
                });
            }
        };

        const changeMessageWithParticipant = (name: string) => {
            const msg = removeHtmlTags(message.value);
            const msgSplit = msg.split(' ');
            let result = ``;
            msgSplit.forEach((value, i) => {
                let changeText = value;
                if (value.includes('@')) {
                    if (`@${name.toLowerCase()}`.includes(value.toLowerCase())) {
                        changeText = name;
                    }
                }
                result = `${result} ${changeText}`.trim();
            });
            message.value = result;
        };

        const selectParticipant = (participant: any, i: number) => {
            resultParticipants.value = [];
            position.value = i;
            changeMessageWithParticipant(participant.name);
        };

        const getColorInitialsContainer = (conversationIndex: number) => {
            return `background-color:${chatColors[
                conversationIndex <= chatColors.length
                    ? conversationIndex
                    : Math.ceil(Math.random() * chatColors.length)
            ]
                }; opacity: .8.5;`;
        };

        watch(message, handleChangeText);

        watch(props, () => {
            message.value = '';
            clearEditor();
            conversationId.value = props.conversationId;
            conversation.value = store.getters['chats/selectedConversation'];
            getParticipants();
        });

        watch(error, () => {
            if (error.value) {
                console.error('An error ocurred while processing files.', error.value);
            }
        });

        onMounted(() => {
            const filesHTML = document.getElementById('cases-chat-file-upload');
            filesHTML.addEventListener('change', handleFileChange);
            store.commit('chats/clearDragDropFiles');
        });

        return {
            onDrop,
            message,
            triggerInputFile,
            onSendMessage,
            attachmentFilesChanged,
            filesData,
            modalFile,
            showModal,
            view,
            conversationId,
            controller,
            setSendingFiles,
            sendingFiles,
            didCancel,
            handleCancelUpload,
            handleCancelUploadStore,
            cancelUpload,
            modules,
            preventAndSendMessage,
            sendFiles,
            DocumentLogo,
            dragDropFiles,
            handleDeleteFile,
            handleDropFile,
            setIsDragOver,
            isTabletOrDesktopScreenSize,
            isDragOver,
            showDragDropOverlay,
            showDragOverEffect,
            handleChangeText,
            resultParticipants,
            selectParticipant,
            initialsParticipants,
            getColorInitialsContainer,
            onSubmit,
            dragDropFilesLoading,
            uploadProgress,
        };
    },
});
</script>
<style scoped>
.ql-container.ql-snow {
    background-color: red !important;
}

.drag-drop-overlay {
    background-color: rgba(216, 180, 254, 0.3);
    @apply text-purple-500;
}

.drag-drop-borders {
    border-width: 2px;
    @apply border-purple-500;
}
</style>
