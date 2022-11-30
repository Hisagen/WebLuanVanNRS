import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoggedIn: false,
  vienchucInfo: null,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.VIENCHUC_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        vienchucInfo: action.vienchucInfo,
      };
    case actionTypes.VIENCHUC_LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        vienchucInfo: null,
      };
    case actionTypes.PROCESS_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        vienchucInfo: null,
      };
    default:
      return state;
  }
};

export default appReducer;
