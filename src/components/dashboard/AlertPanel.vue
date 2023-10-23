<template>
    <div class="bg-white sm:hidden md:block w-full md:mt-16 md:pt-8 sm:pt-0 sm:mt-0">
        <div>
            <div class="py-2 px-4 flex justify-between">
                <h3 class="text-2xl font-semibold">Alerts</h3>
                <p
                    @click="clearEvents"
                    class="cursor-pointer px-4 py-2 text-sm font-medium uppercase font-Roboto text-vino"
                >
                    Clear
                </p>
            </div>
            <div class="px-2">
                <div>
                    <ul role="list">
                        <li
                            v-for="(alert, i) in newNotifications.slice(0, 5)"
                            :key="i"
                            class="w-full"
                        >
                            <div
                                class="relative flex justify-between px-4 py-4 bg-white rounded-xl flex-col hover:cursor-pointer my-2 w-full"
                                @click="() => setUserEventAsRead(alert)"
                            >
                                <div class="flex justify-between space-x-3">
                                    <div class="flex-1 max-w-xs min-w-0 pulse-alert-description">
                                        <div class="block focus:outline-none">
                                            <p class="text-lg font-semibold text-black font-Roboto">
                                                {{ alert.event.title }}
                                            </p>
                                            <p
                                                class="overflow-hidden text-sm text-gray-500 text-ellipsis whitespace-nowrap"
                                            >
                                                {{
                                                    alert.event.message.replace(/(<([^>]+)>)/gi, '')
                                                }}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div class>
                                    <time
                                        :datetime="alert.event.created_at"
                                        class="flex-wrap flex-shrink-0 text-sm font-bold text-gray-500"
                                        >{{ alert.event.created_at }}</time
                                    >
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="mt-5 sm:mt-0 p-2 w-full">
                        <router-link
                            to="/alerts-center"
                            class="flex items-center justify-center px-4 py-2 text-sm font-medium uppercase bg-white sm:flex font-Roboto rounded-md text-vino"
                        >
                            {{
                                newNotifications.length < 4
                                    ? 'SEE ALL'
                                    : `SEE ALL ${newNotifications.length - 5}+`
                            }}
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

// Components
import AlertIconsHeader from '../alerts/AlertIconsHeader.vue';

export default defineComponent({
    name: 'AlertPanel',
    components: {
        AlertIconsHeader,
    },
    setup() {
        const store = useStore();

        const newNotifications = computed(() => {
            return store.getters['notifications/notificationsAlert'];
        });

        const clearEvents = () => store.commit('notifications/clearAlerts');

        async function setUserEventAsRead(alert: any) {
            console.log('🚀 ~ file: AlertPanel.vue:104 ~ setUserEventAsRead ~ alert:', alert);
        }

        return {
            newNotifications,
            clearEvents,
            setUserEventAsRead,
        };
    },
});
</script>
