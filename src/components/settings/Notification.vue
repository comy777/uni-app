<template>
    <div class="m-2 w-full" v-if="!loading">
        <div class="md:w-[73vh]">
            <h2 class="sm:text-3xl text-4xl font-semibold">Notifications</h2>
            <div>
                <div class="border-2 rounded-lg sm:w-[40vh] md:w-full">
                    <div v-for="(notification, i) in notifications" :key="i" class="sm:px-2">
                        <div class="flex p-2">
                            <button
                                class="w-full p-4 flex justify-between items-center border-b-2"
                                style="color: #000"
                                @click="() => setIndexNotification(notification.id)"
                            >
                                <component 
                                    v-bind:is="icons[notification.icon]" 
                                />
                                <h2 class="ml-2 text-xl font-semibold">
                                    {{ notification.type }}
                                </h2>
                                <ArrowUp v-if="indexNotification === notification.id" />
                                <ArrowDown v-else />
                            </button>
                        </div>
                        <div v-if="indexNotification === notification.id">
                            <div class="sm:px-2">
                                <div class="accordion-body py-4 px-5 h-auto">
                                    <div class="md:flex md:justify-between w-full">
                                        <form class="w-full">
                                            <table class="w-full">
                                                <thead class="border-b-2 text-center font-bold">
                                                    <tr>
                                                        <td></td>
                                                        <td>Email</td>
                                                        <td>SMS</td>
                                                        <td>Off</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr
                                                        v-for="(item, i) in notification.options"
                                                        class="px-2 border-b-2 h-12"
                                                        :key="i"
                                                    >
                                                        <td class="pr-4 font-bold sm:text-sm">
                                                            {{ item.name }}
                                                        </td>
                                                        <td class="sm:text-center">
                                                            <input
                                                                type="checkbox"
                                                                :checked="item.email"
                                                                @change="
                                                                    (e) =>
                                                                        changeOption(
                                                                            item.id,
                                                                            'email',
                                                                            !item.email,
                                                                        )
                                                                "
                                                                :value="item.email"
                                                            />
                                                        </td>
                                                        <td class="sm:text-center">
                                                            <input
                                                                type="checkbox"
                                                                :checked="item.sms"
                                                                @change="
                                                                    (e) =>
                                                                        changeOption(
                                                                            item.id,
                                                                            'sms',
                                                                            !item.sms,
                                                                        )
                                                                "
                                                                :value="item.sms"
                                                                id="sms"
                                                            />
                                                        </td>
                                                        <td class="sm:text-center">
                                                            <input
                                                                type="checkbox"
                                                                :checked="item.off"
                                                                @change="
                                                                    (e) =>
                                                                        changeOption(
                                                                            item.id,
                                                                            'off',
                                                                            !item.off,
                                                                        )
                                                                "
                                                                :value="item.off"
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
    </div>
</template>

<style scoped>
input:checked[type='checkbox'] {
    accent-color: #831070;
}
</style>

<script lang="ts" >
import { defineComponent, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { getProfileSettings } from '../../controllers/profiles';
import {
    listNotifications,
    listNotificationOptions,
    listNotificationUser,
    updateNotificationUser,
    saveNotificationUser,
} from '../../controllers/notification';
import NavigationChatButton from '../../components/NavigationChatButton.vue';
import FileIcon from './icons/FileIcon.vue';
import StoplightIcon from '../icons/Stoplight.vue';
import Scorecard from "../icons/Home/Scorecard.vue";
import ArrowDown from '../icons/ArrowDown.vue';
import ArrowUp from '../icons/ArrowUp.vue';
import { showNotification } from '../../services/notifications';

export default defineComponent({
    components: {
        ArrowDown,
        ArrowUp,
    },

    setup() {
        const userId = localStorage.getItem('user_id');
        const icons = ref([FileIcon, NavigationChatButton, StoplightIcon, Scorecard]);
        const options = ref([]);
        const notifications = ref([]);
        const user = ref();
        const indexNotification = ref();
        const navigation = useRouter();
        const loading = ref(true);

        const setIndexNotification = (id: string) => {
            if (id === indexNotification.value) {
                indexNotification.value = undefined;
                return;
            }
            indexNotification.value = id;
        };

        const validateStoplightUser = (): boolean => {
            const userRole = localStorage.getItem('user_role')
            return userRole ? JSON.parse(userRole) === 'stoplight' ? true : false : false
        }

        const validatePhoneNumber = () => {
            let validation = false;
            if (user) {
                if (!user.value.contact_number) {
                    alert('Please configure your mobile number in account settings first!');
                }
                if (user.value.contact_number) validation = true;
            }
            return validation;
        };

        const saveNewNotifications = async (
            valuesSave: any[],
            valueOptionsName: string[],
            position: number,
        ) => {
            return new Promise((resolve, reject) => {
                const notificationValue: any[] = [];
                valuesSave.forEach(async (item, i) => {
                    const data = {
                        user_id: userId,
                        notification_id: item.notification,
                        notification_option_id: item.option,
                        sms: false,
                        email: false,
                        off: false,
                    };
                    const resp = await saveNotificationUser(data);
                    const { id } = resp.insert_notification_user.returning[0];
                    const { user_id, notification_id, ...res } = data;
                    const name =
                        item.type === 'Case Manager'
                            ? valuesSave.length > 2
                                ? valueOptionsName[i]
                                : valueOptionsName[position]
                            : (item.type === 'Chat' || item.type === 'Doc Chat')
                            ? 'Chat'
                            : 'Ticket';
                    const newOption = { id: notification_id, name, options: { id, ...res } };
                    notificationValue.push(newOption);
                    if (i === valuesSave.length - 1) resolve(notificationValue);
                });
            });
        };

        const validateNewNotification = (notification: any) => {
            const newData: any[] = [];
            let bandera = false;
            notifications.value.forEach((item: any) => {
                const data = item;
                if (item.id === notification.id) {
                    notification.options.forEach((option: any) => data.options.push(option));
                    newData.push(data);
                    bandera = true;
                }
                newData.push(data);
            });
            if (!bandera) newData.push(notification);
            notifications.value = newData;
        };

        const getNotificationsById = async (
            list: any,
            optionsValue: any,
            notificationsOptions: any,
        ) => {
            const newData: any[] = [];
            const valueOptionsName = ['Case invitations', 'New Messages', 'Stoplight Ticket Notification', 'Scorecard Notes'];
            notificationsOptions.forEach(async (notification: any, k: number) => {
                const valuesSave: any[] = [];
                const valueNotification = notification;
                valueNotification.options = [];
                let notificationValue: any[] = [];
                let valueName = 0;
                optionsValue.forEach(async (option: any, i: number) => {
                    let bandera = false;
                    let values: string[] = [];
                    list.forEach((item: any) => {
                        const info = option.id + notification.id;
                        if (values.includes(info)) return;
                        if (
                            item.notification_option_id === option.id &&
                            item.notification_id === notification.id
                        ) {
                            const position = k === 0 ? valueName : k === 1 ? 1 : k === 2 ? 2 : 3;
                            const infoData = { ...item, name: valueOptionsName[position], icon: k };
                            notificationValue.push(infoData);
                            valueName += 1;
                            bandera = true;
                            values.push(info);
                        }
                    });
                    if (!bandera) {
                        const data = {
                            type: notification.type,
                            option: option.id,
                            notification: notification.id
                        };
                        if (k === 0 && i <= 1) valuesSave.push(data);
                        if (k === 1 && i === 1) valuesSave.push(data);
                        if (k === 2 && i === 2) valuesSave.push(data);
                        if (k === 3 && i === 3) valuesSave.push(data);
                    }
                });
                if (valuesSave.length > 0) {
                    const resp: any = await saveNewNotifications(
                        valuesSave,
                        valueOptionsName,
                        valueName,
                    );
                    if(k === (notificationsOptions.length - 1)) {
                        await getUserDataNotifications() 
                        return
                    }
                    if (resp.length > 0) valueNotification.options = resp;
                    validateNewNotification(valueNotification);
                }
                if (notificationValue.length > 0) valueNotification.options = notificationValue;
                newData.push({...valueNotification, icon: k});
            });
            const [caseManager, docChat, stoplight, scorecard] = newData
            const userValidate = validateStoplightUser()
            notifications.value = userValidate ? [docChat, stoplight, scorecard] : newData;
            loading.value = false;
        };

        const changeOption = (id: string, type: string, value: boolean) => {
            const smsValue = document.getElementById('sms') as HTMLInputElement;
            const newData: any[] = [];
            notifications.value.forEach((option) => {
                const { options } = option;
                options.forEach(async (item: any) => {
                    if (item.id === id) {
                        if (type === 'off') {
                            item.off = value;
                            item.email = value ? false : true;
                            item.sms = value ? false : validatePhoneNumber();
                        }
                        if (type !== 'off' && item.off) item.off = false;
                        if (type === 'email') item.email = value;
                        if (type === 'sms') {
                            const validate = validatePhoneNumber();
                            if (!validate) {
                                smsValue.checked = false;
                                navigation.replace('/settings/account/true');
                                return;
                            }
                            item.sms = value;
                        }
                        const data = { id, sms: item.sms, email: item.email, off: item.off };
                        await updateNotificationUser(data);
                    }
                });
                newData.push({ ...option, ...notifications });
            });
            options.value = newData;
            showNotification(
                {
                    type: 'success',
                    text: 'save notification information successfull',
                    title: 'save',
                },
                4000,
                1,
            );
        };

        const getUserDataNotifications = async () => {
            const userResponse = await getProfileSettings(userId);
            user.value = userResponse;
            const resp = await listNotifications();
            const notificationsList = await listNotificationOptions();
            const list = await listNotificationUser(userId);
            const [caseManager, chat, proxyEntry, scorecard, stoplight, system] = resp;
            await getNotificationsById(list, notificationsList, [caseManager, chat, stoplight, scorecard]);
        };

        watch(options, () => {
            notifications.value = options.value;
        });

        onMounted(async () => {
            await getUserDataNotifications();
        });

        return {
            options,
            icons,
            indexNotification,
            setIndexNotification,
            changeOption,
            notifications,
            loading,
        };
    },
});
</script>
