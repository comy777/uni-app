<template>
    <Menu as="div" @click="setShow">
        <MenuButton
            class="relative inline-block p-3 rounded-[50%]"
            :class="showAlert ? 'bg-vino' : 'bg-white'"
        >
            <svg
                width="30"
                height="24"
                viewBox="0 0 30 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M9.96875 0.875C15.0898 0.875 19.3125 4.42383 19.3125 8.78125C19.3125 13.1836 15.0898 16.6875 9.96875 16.6875C9.11523 16.6875 8.30664 16.5977 7.49805 16.418C6.15039 17.2715 4.17383 18.125 1.70312 18.125C1.25391 18.125 0.849609 17.9004 0.714844 17.4512C0.535156 17.0469 0.580078 16.5977 0.894531 16.2383C0.939453 16.2383 1.92773 15.1602 2.64648 13.7227C1.38867 12.375 0.625 10.668 0.625 8.78125C0.625 4.42383 4.80273 0.875 9.96875 0.875ZM7.99219 14.3066C8.66602 14.4863 9.29492 14.5312 9.96875 14.5312C13.9219 14.5312 17.1562 11.9707 17.1562 8.78125C17.1562 5.63672 13.9219 3.03125 9.96875 3.03125C5.9707 3.03125 2.78125 5.63672 2.78125 8.78125C2.78125 10.3984 3.54492 11.5664 4.21875 12.2402L5.29688 13.3633L4.57812 14.7559C4.39844 15.0254 4.21875 15.3398 4.03906 15.6543C4.84766 15.4297 5.61133 15.0703 6.375 14.5762L7.13867 14.127L7.99219 14.3066ZM20.4355 6.66992C25.4219 6.84961 29.375 10.3086 29.375 14.5312C29.375 16.418 28.5664 18.125 27.3086 19.4727C28.0273 20.9102 29.0156 21.9883 29.0605 21.9883C29.375 22.3477 29.4199 22.7969 29.2402 23.2012C29.1055 23.6504 28.7012 23.875 28.252 23.875C25.7812 23.875 23.8047 23.0215 22.457 22.168C21.6484 22.3477 20.8398 22.4375 20.0312 22.4375C16.3477 22.4375 13.1582 20.6406 11.6309 18.0352C12.3945 17.9453 13.1582 17.7656 13.832 17.4961C15.0898 19.2031 17.3809 20.2812 20.0312 20.2812C20.6602 20.2812 21.2891 20.2363 21.9629 20.0566L22.8164 19.877L23.5801 20.3262C24.3438 20.8203 25.1074 21.1797 25.916 21.4043C25.7363 21.0898 25.5566 20.7754 25.377 20.5059L24.6582 19.1133L25.7363 17.9902C26.4102 17.3164 27.2188 16.1484 27.2188 14.5312C27.2188 11.5664 24.3438 9.14062 20.7051 8.82617L20.75 8.78125C20.75 8.0625 20.6152 7.34375 20.4355 6.66992Z"
                    :fill="showAlert ? 'white' : '#373737'"
                />
            </svg>
            <span
                v-if="newNotifications.length > 0"
                class="absolute top-3 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full sm:top-2 md:top-2 md:right-0"
            >
                {{ newNotifications.length }}
            </span>
        </MenuButton>
        <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="opacity-0 transform scale-95"
            enter-to-class="opacity-100 transform scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="opacity-100 transform scale-100"
            leave-to-class="opacity-0 transform scale-95"
        >
            <MenuItems
                style="z-index: 1000"
                class="absolute w-96 py-1 mt-0 border-2 border-gray-300 bg-white shadow-lg origin-top-right rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none sm:-left-48 md:-left-72"
            >
                <MenuItem>
                    <div class="p-2">
                        <div class="flex justify-between">
                            <h3 class="text-semibold text-2xl justify-between">Messages</h3>
                            <p class="text-vino cursor-pointer" @click="markAllAsread">
                                MARK ALL AS READ
                            </p>
                        </div>
                        <ul>
                            <li
                                v-for="(conversation, index) in newNotifications.slice(0, 5)"
                                :key="index"
                            >
                                <div
                                    class="m-2 bg-[#ffcfe9ba] rounded-lg hover:bg-white"
                                    @click="() => setMessageReaded(conversation)"
                                >
                                    <div class="p-2 pb-2 hover:cursor-pointer">
                                        <div class="flex justify-between">
                                            <h4 class="text-lg font-semibold font-Roboto">
                                                {{ conversation.event.event.title }}
                                            </h4>
                                            <div
                                                class="rounded-md bg-vino h-6 w-6 justify-center items-center flex"
                                            >
                                                <p class="text-white">
                                                    {{ conversation.totalMessages }}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="flex">
                                            <sanitized-div
                                                :content="conversation.event.event.message"
                                            ></sanitized-div>
                                        </div>
                                        <div>
                                            <time
                                                :datetime="conversation.event.event.created_at"
                                                class="flex-wrap flex-shrink-0 text-sm text-gray-500"
                                                >{{ conversation.event.event.created_at }}</time
                                            >
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div @click="() => {}" class="hover:cursor-pointer">
                            <p
                                v-if="newNotifications.length < 6"
                                class="text-vino text-md text-center"
                            >
                                SEE ALL
                            </p>
                            <p v-else class="text-vino text-md text-center">
                                SEE ALL ({{ newNotifications.length - 5 }})+
                            </p>
                        </div>
                    </div>
                </MenuItem>
            </MenuItems>
        </transition>
    </Menu>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import ChatIconVue from './icons/ChatIcon.vue';
import NavigationChatButton from './NavigationChatButton.vue';

// UI & Libs
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';

export default defineComponent({
    components: {
        NavigationChatButton,
        ChatIconVue,
        Menu,
        MenuButton,
        MenuItem,
        MenuItems,
    },

    setup() {
        const store = useStore();
        const navigation = useRouter();

        const newNotifications = computed(() => {
            return store.getters['notifications/messagesAlert'];
        });

        const showAlert = computed(() => {
            const { messages } = store.getters['notifications/getHeadersAlerts'];
            return messages;
        });

        const markAllAsread = () => {};

        const setShow = (e: Event) => {
            e.stopPropagation();
            store.commit('notifications/setHeaderAlerts', 'messages');
        };

        const setMessageReaded = async (data: any) => {
            console.log(
                '🚀 ~ file: NavigationChatCounterButton.vue:151 ~ setMessageReaded ~ data:',
                data,
            );
        };

        return {
            navigation,
            newNotifications,
            showAlert,
            markAllAsread,
            setMessageReaded,
            setShow,
        };
    },
});
</script>
