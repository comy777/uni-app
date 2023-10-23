import { Module } from "vuex";
import { UiState, state } from "./state";
import { getters } from "./getters";
import { mutations } from "./mutations";

const uiModule: Module<UiState, any> = {
    state,
    getters,
    mutations,
    actions: {   
    },
    namespaced: true
};

export default uiModule;