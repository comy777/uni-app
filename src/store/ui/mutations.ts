import { UiState } from './state';
import { IReminder } from '../../interfaces/interfaces';

export const mutations = {
  setShowMenu(state: UiState) {
    state.showMenu = !state.showMenu;
  },
  setToken(state: UiState, token?: string) {
    state.token = token;
  },
  setScreenWidth(state: UiState, screenWidth: number) {
    state.screenWidth = screenWidth;
  },
  setScreenHeight(state: UiState, screenHeight: number) {
    state.screenHeight = screenHeight;
  },
  setUserState(state: UiState, value: 'active' | 'inactived' | 'disabled') {
    state.user_state = value;
  },
  setReminder(state: UiState, data: IReminder) {
    state.reminder = data;
  },
};
