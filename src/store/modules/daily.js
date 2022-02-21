import { getDailyList } from 'Api/daily';

// initial state
const state = {
  current: null,
  dailyList: [],
};

// getters
const getters = {
  dailyList: (state) => state.dailyList,
  currentDailyList: (state) => {
    return state.dailyList
      ? state.dailyList.find(({ name }) => name === state.current).articles
      : [];
  },
};

// actions
const actions = {
  async getDailyList({ commit }) {
    const dailyList = await getDailyList();
    console.log('getDailyList', dailyList);
    commit('setDailyList', dailyList);
  },
  setCurrent({ commit }, current) {
    commit('setCurrent', current);
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
