const fb = require("@/firebaseConfig.js");

import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

Vue.use(Vuex);

const initialState = () => {
  return {
    user: null,
    shopData: null,
  };
};

// @TODO: This looks meh.. Please refactor
fb.auth.onAuthStateChanged((user) => {
  if (user) {
    store.commit("SET_USER", user);
    store.dispatch("fetchShopAction", user.uid);
  } else {
    store.commit("SET_INITIAL_STATE", initialState());
  }
});

export const store = new Vuex.Store({
  state: initialState(),
  mutations,
  actions,
  getters,
});
