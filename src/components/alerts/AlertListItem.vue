<template>
    <router-link :to="item.url" @click="setUserEventAsRead(item.user_event_id)">
        <div
            class="flex flex-row flex-wrap w-2/3 p-4 m-auto my-1 rounded-lg font-Roboto leading-5"
            style="flex-flow: row"
            :style="`background:${
                !item.readed ? 'rgba(131, 16, 112, 0.04);' : 'rgba(131, 131, 131, 0.13);'
            }`"
        >
            <!-- OPTIONAL: Icon can be an avatar, an icon or any other visual resource with little size. It is optional
      so it can be included or not in the items array.-->
            <div v-if="item.title?.includes('New message')">
                <svg
                    width="24"
                    height="20"
                    viewBox="0 0 24 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M15.5625 6.90625C15.5625 3.30664 12.0742 0.375 7.84375 0.375C3.57617 0.375 0.125 3.30664 0.125 6.90625C0.125 8.46484 0.755859 9.875 1.79492 10.9883C1.23828 12.1758 0.347656 13.1406 0.347656 13.1406C0.0878906 13.4004 0.0507812 13.7715 0.162109 14.1055C0.310547 14.4395 0.644531 14.625 0.978516 14.625C2.98242 14.625 4.61523 13.8828 5.6543 13.1777C6.35938 13.3633 7.06445 13.4375 7.84375 13.4375C12.0742 13.4375 15.5625 10.543 15.5625 6.90625ZM7.84375 12.25C7.21289 12.25 6.54492 12.1758 5.95117 12.0273L5.43164 11.916L5.02344 12.2129C4.24414 12.6953 3.09375 13.2891 1.68359 13.4375C2.01758 12.9551 2.5 12.2871 2.87109 11.5078L3.20508 10.7656L2.64844 10.1719C1.75781 9.24414 1.3125 8.09375 1.3125 6.90625C1.3125 3.97461 4.20703 1.5625 7.84375 1.5625C11.4434 1.5625 14.375 3.97461 14.375 6.90625C14.375 9.875 11.4434 12.25 7.84375 12.25ZM22.6133 16.5547C23.3926 15.5156 23.875 14.2168 23.875 12.8438C23.875 9.24414 20.6836 6.3125 16.75 6.3125C16.7129 6.3125 16.7129 6.34961 16.7129 6.34961C16.7129 6.53516 16.75 6.7207 16.75 6.90625C16.75 7.12891 16.7129 7.31445 16.7129 7.53711C16.7129 7.53711 16.7129 7.5 16.75 7.5C20.0156 7.5 22.6875 9.91211 22.6875 12.8438C22.6875 13.9199 22.3164 14.959 21.6484 15.8496L21.166 16.4805L21.6113 17.1855C21.834 17.5566 22.0938 17.9277 22.2793 18.1875C21.6113 18.1133 20.9434 17.9277 20.2754 17.6309L19.793 17.4453L19.3477 17.668C18.4941 18.002 17.6406 18.1875 16.75 18.1875C13.9297 18.1875 11.6289 16.4805 10.998 14.1426C10.627 14.2539 10.2188 14.3652 9.81055 14.4395C10.5898 17.2969 13.373 19.375 16.75 19.375C17.8262 19.375 18.8652 19.1523 19.8301 18.7441C20.7207 19.1152 21.7598 19.375 22.9844 19.375C23.3184 19.375 23.6523 19.1895 23.8008 18.8555C23.9121 18.5215 23.8379 18.1504 23.6152 17.9277C23.6152 17.8906 23.0957 17.334 22.6133 16.5547Z"
                        fill="black"
                    />
                </svg>
            </div>
            <div v-if="item.title.includes('Time Entry')">
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M11.0938 9.65234V5.125C11.0938 4.82812 10.7969 4.53125 10.5 4.53125C10.166 4.53125 9.90625 4.82812 9.90625 5.125V9.875C9.90625 10.0605 9.94336 10.209 10.0547 10.3203L13.0234 13.2891C13.1348 13.4004 13.2832 13.4375 13.4688 13.4375C13.6172 13.4375 13.7656 13.4004 13.877 13.2891C14.0996 13.0664 14.0996 12.6582 13.877 12.4355L11.0938 9.65234ZM10.4629 0.375C5.19336 0.375 0.962891 4.64258 0.962891 9.875C0.962891 15.1445 5.19336 19.375 10.4629 19.375C15.6953 19.375 19.9258 15.1445 19.9258 9.875C19.9258 4.64258 15.7324 0.375 10.4629 0.375ZM10.5 18.1875C5.89844 18.1875 2.1875 14.4766 2.1875 9.875C2.1875 5.31055 5.89844 1.5625 10.5 1.5625C15.0645 1.5625 18.8125 5.31055 18.8125 9.875C18.8125 14.4766 15.0645 18.1875 10.5 18.1875Z"
                        fill="#3C3C3C"
                    />
                </svg>
            </div>
            <div class="pl-2 flex w-full justify-between">
                <div class="">
                    <div class>{{ item.title }}</div>
                    <div class="alert-item-message text-pulse_dark_grey">
                        {{ item.message.replace(/(<([^>]+)>)/gi, '') }}
                    </div>
                </div>
                <div class="pl-3">
                <time
                    :datetime="item.datetime"
                    class="flex-wrap block ml-auto text-sm text-gray-500"
                    >{{ item.datetime }}</time
                >
                </div>
            </div>
        </div>
    </router-link>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { getDateAndTimeFromISODate } from '../../lib/dates/formatting';

export default defineComponent({
    components: {},

    props: {
        item: {
            type: Object,
            required: true,
        },
    },

    setup(props) {
        const store = useStore();
        const router = useRouter();

        function setUserEventAsRead(alertId: string) {
            store.dispatch('events/setUserEventAsRead', alertId);
            setTimeout(() => store.dispatch('events/fetchEvents'), 500);
        }

        return {
            setUserEventAsRead,
        };
    },
});
</script>

<style scoped>
/* NOTE: This serves as a multiline text truncate. It may not work for some browsers as it uses "webkit",
 * it's commented for now because it's experimental but can be used.
 */
.alert-item-message {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
}
</style>
