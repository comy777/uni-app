import { createStore } from 'vuex';
import notifications from './notifications/notificationsStore';
import ui from './ui/uiStore';

const store = createStore({
    //add modules, create folders
    modules: {
        notifications,
        ui,
    },
    state: {
        mobileMenuOpen: false,
        deskMenuOpen: true,
        loadingGlobal: false,
        caseChatShow: true,
        caseAddShow: true,
        chatShowMobile: false,
        detailsShowMobile: false,
    },
    mutations: {
        globalLoading(state, data) {
            state.loadingGlobal = data;
        },
        toggleMenuMobile(state) {
            state.mobileMenuOpen = !state.mobileMenuOpen;
        },
        toggleMenuDesk(state) {
            state.deskMenuOpen = !state.deskMenuOpen;
        },
        toggleChatMobile(state, value: boolean) {
            state.chatShowMobile = value;
        },
        toggledetailsShowMobile(state, value: boolean) {
            state.detailsShowMobile = value;
        },
    },
});

export default store;
