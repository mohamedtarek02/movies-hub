export default {
  token(state) {
    return state.token;
  },
  isLogged(state) {
    return !!state.token;
  },
};
