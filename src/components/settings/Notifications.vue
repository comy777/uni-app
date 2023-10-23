<template>
    <div class="m-2 w-full">
        <div class="md:w-[73vh]">
            <h2 class="sm:text-3xl text-4xl font-semibold">Notifications</h2>
            <div>
                <div
                    class="accordion border-2 rounded-lg sm:w-[40vh] md:w-full"
                    id="accordionExample"
                >
                    <div v-for="(item, i) in notifications" class="sm:px-2" :key="i">
                        <div class="flex p-2" :class="[item.type !== 'System' ? 'border-b-2' : '']">
                            <button
                                class="flex accordion-button items-center w-full p-4"
                                type="button"
                                data-bs-toggle="collapse"
                                :data-bs-target="'#' + item.collapse"
                                aria-expanded="true"
                                aria-controls="collapseOne"
                                style="color: #000"
                            >
                                <component v-bind:is="item.icon" />
                                <h2 class="ml-2 text-xl font-semibold">{{ item.type }}</h2>
                            </button>
                        </div>
                        <div
                            :id="item.collapse"
                            class="accordion-collapse collapse"
                            aria-labelledby="headingOne"
                            data-bs-parent="#accordionExample"
                        >
                            <div class="accordion-body py-4 px-5 h-auto">
                                <div class="md:flex md:justify-between w-full">
                                    <form class="w-full">
                                        <table class="w-full">
                                            <thead class="border-b-2 text-center font-bold">
                                                <tr>
                                                    <td></td>
                                                    <td
                                                        v-for="(
                                                            notification, i
                                                        ) in item.notifications"
                                                        class="px-2"
                                                        :key="i"
                                                    >
                                                        {{ notification }}
                                                    </td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr
                                                    v-for="(
                                                        option, i
                                                    ) in item.notifications_options"
                                                    class="px-2 border-b-2 h-12"
                                                    :key="i"
                                                >
                                                    <td class="pr-4 font-bold sm:text-sm">
                                                        {{ option.name }}
                                                    </td>
                                                    <td class="sm:text-center">
                                                        <input
                                                            type="checkbox"
                                                            @change="
                                                                saveOrUpdate(
                                                                    item.id,
                                                                    option.id,
                                                                    'email',
                                                                )
                                                            "
                                                            :id="
                                                                'email_' + item.id + '_' + option.id
                                                            "
                                                        />
                                                    </td>
                                                    <td class="text-center">
                                                        <input
                                                            type="checkbox"
                                                            @change="
                                                                saveOrUpdate(
                                                                    item.id,
                                                                    option.id,
                                                                    'sms',
                                                                )
                                                            "
                                                            :id="'sms_' + item.id + '_' + option.id"
                                                        />
                                                    </td>
                                                    <td class="text-center">
                                                        <input
                                                            type="checkbox"
                                                            @change="
                                                                saveOrUpdate(
                                                                    item.id,
                                                                    option.id,
                                                                    'off',
                                                                )
                                                            "
                                                            :id="'off_' + item.id + '_' + option.id"
                                                            class="accent-red-700"
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
input:checked[type='checkbox'] {
    accent-color: #831070;
}
</style>

<script lang="ts">
import 'tw-elements';
import { defineComponent, ref, onMounted } from 'vue';
import NavigationChatButton from '../../components/NavigationChatButton.vue';

import FileIcon from './icons/FileIcon.vue';
import ClockIcon from './icons/ClockIcon.vue';
import CogIcon from './icons/CogIcon.vue';
import {
    listNotifications,
    listNotificationOptions,
    listNotificationUser,
    updateNotificationUser,
    saveNotificationUser,
} from '../../controllers/notification';
import { showNotification } from '../../services/notifications';
import { getProfileSettings } from '../../controllers/profiles';
import { useRouter } from 'vue-router';

export default defineComponent({
    components: {
        ClockIcon,
        FileIcon,
        NavigationChatButton,
    },
    setup() {
        const notifications = ref([]);
        const notificationsOptions = ref([]);
        const notificationsUser = ref([]);
        const userId = localStorage.getItem('user_id');
        const user = ref();
        const navigation = useRouter();
        const navigate = ref(false);

        const getListNotifications = async () => {
            const resp = await listNotifications();
            notifications.value = resp.splice(0, 2);
            await getListNotificationOptions();
            await getistNotificationUser();

            notifications.value.forEach((item, index) => {
                switch (index) {
                    case 0:
                        setNotificationKey('icon', FileIcon, index);
                        setNotificationKey('collapse', 'collapseOne', index);
                        break;
                    case 1:
                        setNotificationKey('icon', NavigationChatButton, index);
                        setNotificationKey('collapse', 'collapseTwo', index);
                        break;
                    case 2:
                        setNotificationKey('icon', ClockIcon, index);
                        setNotificationKey('collapse', 'collapseThree', index);
                        break;
                    case 3:
                        setNotificationKey('icon', CogIcon, index);
                        setNotificationKey('collapse', 'collapseFour', index);
                        break;
                }
                setNotificationKey('notifications', ['Email', 'SMS', 'Off'], index);
                setNotificationKey('notifications_options', notificationsOptions.value, index);
            });
        };

        const getListNotificationOptions = async () => {
            notificationsOptions.value = await listNotificationOptions();
        };

        const getistNotificationUser = async () => {
            notificationsUser.value = await listNotificationUser(userId);
            verifyChecked();
        };

        const verifyChecked = () => {
            setTimeout(() => {
                if (notificationsUser.value.length > 0) {
                    notificationsUser.value.forEach((row) => {
                        let type = row.notification_id;
                        let option = row.notification_option_id;
                        getCheckBox('sms', type, option).checked = row.sms;
                        getCheckBox('email', type, option).checked = row.email;
                        getCheckBox('off', type, option).checked = row.off;
                    });
                }
            }, 500);
        };

        const saveOrUpdate = async (type: string, option: string, click: string = '') => {
            let email = getCheckBox('email', type, option);
            let sms = getCheckBox('sms', type, option);
            let off = getCheckBox('off', type, option);

            let validate = notificationsUser.value.filter(
                (row) => row.notification_id === type && row.notification_option_id === option,
            );

            //logic
            if (click === 'off') {
                if (off.checked) {
                    email.checked = false;
                    sms.checked = false;
                } else {
                    if (user) {
                        if (user.value.contact_number) sms.checked = true;
                    }
                    email.checked = true;
                }
            } else {
                if (!email.checked && !sms.checked) {
                    off.checked = true;
                } else {
                    off.checked = false;
                }
            }

            if (click === 'sms') {
                if (user) {
                    if (!user.value.contact_number) {
                        alert('Please configure your mobile number in account settings first!');
                        sms.checked = false;
                        navigate.value = true;
                    }
                }
            }

            if (validate.length > 0) {
                //update
                let notificationUserId = validate[0].id;
                await updateNotificationUser({
                    id: notificationUserId,
                    sms: sms.checked,
                    email: email.checked,
                    off: off.checked,
                });
            } else {
                //insert
                await saveNotificationUser({
                    user_id: userId,
                    notification_id: type,
                    notification_option_id: option,
                    sms: sms.checked,
                    email: email.checked,
                    off: off.checked,
                });
            }

            showNotification(
                {
                    type: 'success',
                    text: 'save notification information successfull',
                    title: 'save',
                },
                4000,
                1,
            );

            if (navigate.value) navigation.replace('/settings/account/true');
        };

        const getCheckBox = (notification: string, type: string, option: string) => {
            return document.getElementById(`${notification}_${type}_${option}`) as HTMLInputElement;
        };

        const setNotificationKey = (key: string, value: any, index: number) => {
            notifications.value[index][key] = value;
        };

        onMounted(async () => {
            const userResponse = await getProfileSettings(userId);
            user.value = userResponse;
            await getListNotifications();
        });

        return {
            notifications,
            notificationsOptions,
            saveOrUpdate,
        };
    },
});
</script>
