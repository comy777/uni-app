import { mobileBrowser } from '../../utils/mobile';
import { IReminder } from '../../interfaces/interfaces';

export type UiState = {
  showMenu: boolean;
  mobile: boolean;
  token: string | undefined;
  screenWidth: number;
  screenHeight: number;
  user_state: 'active' | 'disabled' | 'inactived';
  reminder: IReminder;
};

export const state: UiState = {
  showMenu: mobileBrowser() ? false : true,
  mobile: mobileBrowser(),
  token: undefined,
  screenWidth: 0,
  screenHeight: 0,
  user_state: 'active',
  reminder: { description: '', image: '', title: '', url: '' },
};
