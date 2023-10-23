<template>
    <div class="p-5 md:p-0 h-full">
        <div class="overflow-y-auto h-full">
            <div class="sticky top-0 bg-white z-10">
                <div class="flex justify-between items-center w-full p-5">
                    <div class="text-3xl">Messages</div>
                    <div class="bg-vino w-20 rounded-full">
                        <button
                            class="text-white text-sm flex justify-center px-5 py-2"
                            @click="router.push('/chats')"
                        >
                            CHAT
                        </button>
                    </div>
                </div>
            </div>
            <div v-if="newNotifications.length > 0">
                <div
                    class="flex sm:flex-row flex-col sm:space-x-2"
                    v-for="(conversationsGroup, groupIndex) in newNotifications"
                    :key="groupIndex"
                >
                    <a :href="conversationsGroup.link" class="h-18 w-full">
                        <div
                            v-for="(
                                conversation, conversationIndex
                            ) in conversationsGroup.conversations"
                            :key="conversationIndex"
                            class="h-18 w-full break-inside relative overflow-hidden flex flex-col justify-between space-y-3 text-sm rounded-xl p-4 mb-4 bg-vinoLight"
                        >
                            <div class="flex justify-between items-center">
                                <div class="flex flex-row items-center space-x-3 w-full">
                                    <div
                                        class="flex flex-none items-center justify-center w-10 h-10 rounded-full bg-black text-white"
                                    >
                                        {{
                                            getInitials(
                                                conversation.conversation_messages[0].profile
                                                    .first_name,
                                                conversation.conversation_messages[0].profile
                                                    .last_name,
                                            )
                                        }}
                                    </div>
                                    <div class="w-full">
                                        <div class="flex justify-between items-centerw-full">
                                            <div>
                                                <span class="text-base font-bold"
                                                    >{{
                                                        conversation.conversation_messages[0].profile.first_name
                                                    }}
                                                    {{
                                                        conversation.conversation_messages[0].profile.last_name
                                                    }}
                                                </span>
                                            </div>

                                            <div class="justify-start flex">
                                                <span class="text-gray-600 text-sm font-medium">{{
                                                    formatDate(conversation.updated_at)
                                                }}</span>
                                            </div>
                                        </div>

                                        <div
                                            class="h-5 overflow-y-hidden"
                                            v-html="conversation.conversation_messages[0].message"
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            <div class="flex items-center justify-center" v-else>
                <span class="text-gray-400 font-bold text-md flex justify-center py-2"
                    >No Chats To Read</span
                >
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
    setup() {
        const store = useStore();
        const router = useRouter();
        const newNotifications = computed(() => {
            return store.getters['notifications/getNotificationWidget'];
        });
        const getInitials = (firstName: string, lastName: string): string => {
            const firstInitial = firstName.charAt(0).toUpperCase();
            const lastInitial = lastName.charAt(0).toUpperCase();
            return `${firstInitial}${lastInitial}`;
        };

        const formatDate = (dateString: string): string => {
            const date = new Date(dateString);
            const now = new Date();

            const isToday = date.toDateString() === now.toDateString();
            const isYesterday =
                new Date(date.getTime() + 86400000).toDateString() === now.toDateString();

            if (isToday) {
                return 'Today ' + formatTime(date);
            } else if (isYesterday) {
                return 'Yesterday ' + formatTime(date);
            } else {
                return formatDateAndTime(date);
            }
        };

        const formatTime = (date: Date): string => {
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
        };

        const formatDateAndTime = (date: Date): string => {
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            return `${day}/${month}/${year} ${hours}:${minutes}`;
        };

        return {
            newNotifications,
            getInitials,
            formatDate,
            router,
        };
    },
});
</script>
