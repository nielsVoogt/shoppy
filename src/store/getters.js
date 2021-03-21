const getters = {
  user(state) {
    return state.user;
  },
  shopData(state) {
    return state.shopData;
  },
  isUserAuth(state) {
    return !!state.user;
  },
};

export default getters;
