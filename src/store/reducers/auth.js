import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: null,
  authRedirect: "/",
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.idToken,
        userId: action.userId,
        error: null,
      };
    case actionTypes.AUTH_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case actionTypes.LOG_OUT:
      return {
        ...state,
        token: null,
        userId: null,
      };
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return {
        ...state,
        authRedirect: action.path,
      };
    default:
      return state;
  }
};
export default reducer;
