/* eslint-enable-no-unused-vars */
export const state = () => ({
  uid: null,
  authUser: null
});

export const mutations = {
  SET_UID(state, uid) {
    state.uid = uid;
  },
  SET_AUTH_USER(state, authUser) {
    state.authUser = authUser;
  }
};

export const getters = {
  IS_AUTHENTICATED(state) {
    return !!state.uid;
  }
};
