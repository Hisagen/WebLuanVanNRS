import actionTypes from "./actionTypes";

export const getTemp = (data) => {
  return (dispatch, getState) => {
    try {
      dispatch(tempSuccess(data));
    } catch (e) {}
  };
};

export const tempSearchSuccess = (data) => ({
  type: actionTypes.FETCH_TEPM_SEARCH_SUCCESS,
  data: data,
});

export const getTempSearch = (data) => {
  return (dispatch, getState) => {
    try {
      dispatch(tempSearchSuccess(data));
    } catch (e) {}
  };
};

export const tempSuccess = (data) => ({
  type: actionTypes.FETCH_TEPM_SUCCESS,
  data: data,
});
