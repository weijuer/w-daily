import { get_all_dailies } from 'Api/daily';

// initial state
const state = {
  current: null,
  dailies: [],
};

// getters
const getters = {
  dailies: (state) => state.dailies,
  currentDailies: (state) => {
    return state.dailies ? state.dailies.find(({ name }) => name === state.current).articles : [];
  },
};

// actions
const actions = {
  async getAllDaily({ commit }) {
    const dailies = await get_all_dailies();
    commit('setDailies', dailies);
  },
  setCurrent({ commit }, current) {
    commit('setCurrent', current);
  },
};

// mutations
const mutations = {
  setDailies(state, dailies) {
    state.dailies = dailies;
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
