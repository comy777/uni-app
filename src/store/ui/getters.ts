import { UiState } from './state';

export const getters = {
  getShowMenu(state: UiState) {
    return state.showMenu;
  },
  getmobileBrowser(state: UiState) {
    return state.mobile;
  },
  getTokenStore(state: UiState) {
    return state.token;
  },
  getUserState(state: UiState) {
    return state.user_state;
  },
  getReminder(state: UiState) {
    return state.reminder;
  },
};
