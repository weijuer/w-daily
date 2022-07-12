import { getDailyList } from 'Api/daily';

// initial state
const state = {
  current: null,
  dailyList: [],
};

// getters
const getters = {
  dailyList: (state) => state.dailyList,
  articles: (state) => {
    return state.dailyList ? state.dailyList.find(({ id }) => id === state.current).articles : [];
  },
};

// actions
const actions = {
  async getDailyList({ commit }) {
    const dailyList = await getDailyList();
    commit('setDailyList', dailyList);
  },
  setCurrent({ commit }, id) {
    commit('setCurrent', id);
  },
};

// mutations
const mutations = {
  setDailyList(state, dailyList) {
    state.dailyList = dailyList;
  },
  setCurrent(state, current) {
    state.current = current;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
