import { createStore, createLogger } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import base from './modules/base';
import daily from './modules/daily';

const debug = process.env.NODE_ENV !== 'production';

export default createStore({
  modules: {
    base,
    daily,
  },
  strict: debug,
  plugins: debug
    ? [createLogger(), createPersistedState({ storage: window.sessionStorage })]
    : [createPersistedState({ storage: window.sessionStorage })],
});
