const getters = {
  user(state) {
    return state.user;
  },
  userProfile(state) {
    return state.userProfile;
  },
  isUserAuth(state) {
    return !!state.user;
  },
  getError(state) {
    return state.error;
  },
};

export default getters;
