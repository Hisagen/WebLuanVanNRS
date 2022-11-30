import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoggedInBN: false,
  benhnhanInfo: null,
  temp: "",
  tempSearch: "",
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.BENHNHAN_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedInBN: true,
        benhnhanInfo: action.benhnhanInfo,
      };
    case actionTypes.BENHNHAN_LOGIN_FAIL:
      return {
        ...state,
        isLoggedInBN: false,
        benhnhanInfo: null,
      };
    case actionTypes.PROCESS_BN_LOGOUT:
      return {
        ...state,
        isLoggedInBN: false,
        benhnhanInfo: null,
      };
    case actionTypes.FETCH_TEPM_SUCCESS:
      state.temp = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_TEPM_SEARCH_SUCCESS:
      state.tempSearch = action.data;
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default appReducer;
