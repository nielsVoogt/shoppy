import * as types from "./mutation-types.js";

const fb = require("@/firebaseConfig.js");

const actions = {
  fetchShopAction({ commit }, uid) {
    const shopData = fb.shopsCollection.doc(uid);
    shopData.get().then((doc) => {
      commit(types.SET_SHOP_DATA, doc.data());
    });
  },

  logOutAction: ({ commit }) => {
    return new Promise((resolve, reject) => {
      fb.auth
        .signOut()
        .then(() => {
          commit(types.SET_USER, null);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  logInAction: ({ commit, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      fb.auth
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then((response) => {
          if (!response.user.emailVerified) {
            reject();
          } else {
            dispatch("fetchShopAction", response.user.uid);
            commit(types.SET_USER, response.user);
            resolve(response);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default actions;
