import {
  SET_INITIAL_STATE,
  SET_SHOP_DATA,
  SET_USER,
} from "./mutation-types.js";

const mutations = {
  [SET_SHOP_DATA](state, payload) {
    state.shopData = payload;
  },

  [SET_USER](state, payload) {
    state.user = payload;
  },

  [SET_INITIAL_STATE](state, newState) {
    Object.assign(state, newState);
  },
};

export default mutations;
