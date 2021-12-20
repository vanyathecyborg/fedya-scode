export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

const reducer = (state = 0, { type, payload }) => {
  switch (type) {
    case LOGIN:
      return {
        ...state,
        ...payload,
      };
    case LOGOUT:
      return {};
    default:
      return state;
  }
}

export default reducer;
