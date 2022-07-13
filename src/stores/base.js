import { defineStore } from 'pinia';

export const useBaseStore = defineStore({
  id: 'base',
  state: () => ({
    isMini: false,
  }),
  getters: {},
  actions: {
    toggleMini() {
      this.isMini = !this.isMini;
    },
  },
  // 开启数据缓存
  persist: {
    enabled: true,
  },
});
