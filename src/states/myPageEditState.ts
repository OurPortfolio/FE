import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const myPageEditState = atom<boolean>({
  key: 'myPageEditState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});
