import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const createCategoryState = atom<string>({
  key: 'createCategoryState',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const createFilterState = atom<string>({
  key: 'createFilterState',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const createTitleState = atom<string>({
  key: 'createTitleState',
  default: '',
  effects_UNSTABLE: [persistAtom],
});