import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const projectDataAtom = atom({
  key: 'projectData',
  default: null,
  effects_UNSTABLE: [persistAtom],
});
