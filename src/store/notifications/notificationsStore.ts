import { Module } from 'vuex';

const notificationsModule: Module<NotificationsState, any> = {
    state: {
        showAlert: {
            show: false,
            screen: undefined,
        },
        alerts: {
            messagesAlert: [],
            notificationAlert: [],
        },
        deleteNotification: false,
        renderNotification: false,
        headerAlerts: {
            alert: false,
            messages: false,
            restore: false,
        },
        notificationWidget: [],
    },
    getters: {
        messagesAlert(state): any[] {
            return state.alerts.messagesAlert;
        },
        notificationsAlert(state): any[] {
            return state.alerts.notificationAlert;
        },
        getShowAlert(state) {
            return state.showAlert;
        },
        getDeleteNotification(state) {
            return state.deleteNotification;
        },
        getState(state) {
            return state;
        },
        getHeadersAlerts(state) {
            return state.headerAlerts;
        },
        getNotificationWidget(state) {
            return state.notificationWidget;
        },
        getRestoreHeader(state) {
            return state.headerAlerts.restore;
        },
    },
    actions: {},
    mutations: {
        clearAlerts(state) {
            state.alerts.notificationAlert = [];
        },
        setHeaderAlerts(state, value: 'alert' | 'messages' | 'header') {
            const { alert, messages } = state.headerAlerts;
            const data =
                value === 'header'
                    ? { alert: false, messages: false, restore: false }
                    : value === 'alert'
                    ? { alert: !alert, messages: false, restore: false }
                    : { messages: !messages, alert: false, restore: false };
            state.headerAlerts = data;
        },
        setNotificationWidget(state, value) {
            state.notificationWidget = value;
        },
        restoreHeaderAlerts(state) {
            state.headerAlerts = { messages: false, alert: false, restore: true };
        },
        setRestoreHeaderAlerts(state) {
            state.headerAlerts = { messages: false, alert: false, restore: false };
        },
    },
    namespaced: true,
};

export type NotificationsState = {
    showAlert: {
        show: boolean;
        screen: string | undefined;
    };
    alerts: any;
    deleteNotification: boolean;
    renderNotification: boolean;
    headerAlerts: {
        alert: boolean;
        messages: boolean;
        restore: boolean;
    };
    notificationWidget: [];
};

export default notificationsModule;
