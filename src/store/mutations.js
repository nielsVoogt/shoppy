import {
  SET_INITIAL_STATE,
  SET_USER,
  SET_USER_PROFILE,
} from "./mutation-types.js";

const mutations = {
  [SET_USER_PROFILE](state, payload) {
    state.userProfile = payload;
  },

  [SET_USER](state, payload) {
    state.user = payload;
  },

  [SET_INITIAL_STATE](state, newState) {
    Object.assign(state, newState);
  },
};

export default mutations;
