import * as types from "./mutation-types.js";

const fb = require("@/firebaseConfig.js");

const actions = {
  fetchUserDataAction({ commit, dispatch }, uid) {
    const userProfile = fb.usersCollection.doc(uid);
    userProfile.get().then((doc) => {
      commit(types.SET_USER_PROFILE, doc.data());
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
          reject();
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
            dispatch("fetchUserDataAction", response.user.uid);
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
