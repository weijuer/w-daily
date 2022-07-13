import { defineStore } from 'pinia';
import { getDailyList } from 'Api/daily';

export const useDailyStore = defineStore('daily', {
  state: () => ({
    current: null,
    dailyList: [],
  }),
  getters: {
    articles: (state) => {
      return state.dailyList && state.current
        ? state.dailyList.find(({ name }) => name === state?.current?.name).articles
        : [];
    },
  },
  actions: {
    async getDailyList() {
      const dailyList = await getDailyList();
      this.dailyList = dailyList;
    },
    setCurrent(current) {
      this.current = current;
    },
    clearDailyList() {
      this.$reset();
    },
  },
  // 开启数据缓存
  persist: {
    enabled: true,
  },
});