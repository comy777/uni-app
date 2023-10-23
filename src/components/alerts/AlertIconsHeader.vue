<template>
    <div
        class="md:py-2 sm:py-0 flex items-center justify-end space-x-4 sm:ml-0 sm:space-x-6 md:rounded-none rounded-r-full sm:pr-2 md:pr-4 md:pt-5 sm:pt-0 relative"
        id="Notifications_container"
    >
        <div class="flex items-center justify-center">
            <div class="w-12 mx-4">
                <Menu as="div" @click="(e) => setShow(e)">
                    <MenuButton
                        class="relative"
                        :class="
                            showAlert ? 'bg-vino p-3 rounded-[50%]' : 'bg-white p-3 rounded-[50%]'
                        "
                    >
                        <BellIcon :fill="showAlert" />
                        <span
                            v-if="newNotifications.length > 0"
                            class="absolute inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full sm:top-2 md:top-2 md:right-0"
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
                            class="absolute right-2 w-96 py-1 mt-0 border-2 border-gray-300 bg-white shadow-lg origin-top-right rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none md:right-40 sm:right-1 z-50"
                        >
                            <MenuItem>
                                <div class="p-2">
                                    <div class="flex justify-between">
                                        <h3 class="text-semibold text-2xl justify-between">
                                            Alerts
                                        </h3>
                                        <p class="text-vino cursor-pointer" @click="markAllAsread">
                                            MARK ALL AS READ
                                        </p>
                                    </div>
                                    <ul>
                                        <li
                                            v-for="(alert, index) in newNotifications.slice(0, 3)"
                                            :key="index"
                                        >
                                            <div
                                                class="hover:cursor-pointer"
                                                @click="(e) => setUserEventAsRead(alert, e)"
                                            >
                                                <div
                                                    class="m-2 bg-[#ffcfe9ba] rounded-lg hover:bg-white"
                                                >
                                                    <div class="p-2 pb-2">
                                                        <h4
                                                            class="text-lg font-semibold font-Roboto"
                                                        >
                                                            {{ alert.event.title }}
                                                        </h4>
                                                        <div>
                                                            <time
                                                                :datetime="alert.event.created_at"
                                                                class="flex-wrap flex-shrink-0 text-sm text-gray-500"
                                                                >{{ alert.event.created_at }}</time
                                                            >
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    <router-link to="/alerts-center">
                                        <div class="cursor-pointer">
                                            <p
                                                v-if="newNotifications.length < 4"
                                                class="text-vino text-md text-center"
                                            >
                                                SEE ALL
                                            </p>
                                            <p v-else class="text-vino text-md text-center">
                                                SEE ALL ({{ newNotifications.length - 3 }})+
                                            </p>
                                        </div>
                                    </router-link>
                                </div>
                            </MenuItem>
                        </MenuItems>
                    </transition>
                </Menu>
            </div>
            <div class="w-12">
                <NavigationChatCounterButton />
            </div>
        </div>
        <!-- Profile dropdown -->
        <Menu as="div" class="relative flex-shrink-0">
            <div class="relative">
                <MenuButton>
                    <InitialsContainer :profile-initials="profileInitials" />
                    <div class="absolute bottom-0 right-0">
                        <div
                            class="rounded-xl h-3 w-3"
                            :class="stateUser === 'active' ? 'bg-[#7dcd70]' : 'bg-yellow-300'"
                        />
                    </div>
                </MenuButton>
            </div>
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
                    class="absolute right-0 w-32 py-1 mt-0 border-2 border-gray-300 bg-white shadow-lg origin-top-right rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none z-50 bg-teal"
                >
                    <MenuItem>
                        <ul class="m-2">
                            <li class="hover:bg-gray-200 p-2 rounded-md">
                                <router-link to="/settings" class="flex items-center">
                                    <CogIcon class="w-8" />
                                    <span>Settings</span>
                                </router-link>
                            </li>
                            <li class="hover:bg-gray-200 p-2 rounded-md">
                                <div class="flex cursor-pointer" @click="logoutUser">
                                    <LogoutIcon class="w-8" />
                                    <span>Log out</span>
                                </div>
                            </li>
                        </ul>
                    </MenuItem>
                </MenuItems>
            </transition>
        </Menu>
    </div>
</template>

<script lang="ts">
// Vue
import { defineComponent, onMounted, computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useAuth0 } from '@auth0/auth0-vue';

// Icon
import CogIcon from '../icons/outline/CogIcon.vue';
import LogoutIcon from '../icons/outline/Logout.vue';

// UI & Libs
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import InitialsContainer from '../objects/containers/InitialsContainer.vue';

// Components
import NavigationChatCounterButton from '../../components/NavigationChatCounterButton.vue';
import BellIcon from '../icons/BellIcon.vue';
import { RouterLink } from 'vue-router';

export default defineComponent({
    name: 'AlertIconsHeader',
    components: {
        BellIcon,
        CogIcon,
        InitialsContainer,
        LogoutIcon,
        Menu,
        MenuButton,
        MenuItem,
        MenuItems,
        NavigationChatCounterButton,
    },
    setup() {
        const store = useStore();
        const profileInitials = ref<string>('');
        const show = ref(false);
        const messages = ref<any[]>([]);
        const showMessages = ref(false);

        const newNotifications = computed(() => {
            return store.getters['notifications/notificationsAlert'];
        });

        const showAlert = computed(() => {
            const { alert } = store.getters['notifications/getHeadersAlerts'];
            return alert;
        });

        const stateUser = computed(() => {
            const state = store.getters['ui/getUserState'];
            return state;
        });

        const setShow = (e: Event) => {
            e.stopPropagation();
            store.commit('notifications/setHeaderAlerts', 'alert');
        };

        function getProfileInitials() {
            profileInitials.value = 'SS';
        }

        const unseenEvents = computed(() => {
            const array = store.getters['events/unseenEventsCount'];
            return {
                message: array.message,
                alert: array.alert,
            };
        });

        async function setUserEventAsRead(alert: any, e?: MouseEvent) {
            console.log('🚀 ~ file: AlertIconsHeader.vue:279 ~ setUserEventAsRead ~ alert:', alert);
        }

        const markAllAsread = async () => {
            const notifications = store.getters['notifications/notificationsAlert'];
            console.log(
                '🚀 ~ file: AlertIconsHeader.vue:284 ~ markAllAsread ~ notifications:',
                notifications,
            );
        };

        const logoutUser = async () => {};

        onMounted(() => {
            getProfileInitials();
        });

        return {
            profileInitials,
            setUserEventAsRead,
            unseenEvents,
            markAllAsread,
            setShow,
            logoutUser,
            show,
            messages,
            showMessages,
            newNotifications,
            showAlert,
            stateUser,
        };
    },
});
</script>
