import actionTypes from "./actionTypes";
import { getAllNhasxService } from "../../services/nhasxService";

export const fetchNhasxStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_ALL_NHASX_START });
      let res = await getAllNhasxService();
      if (res && res.errCode === 0) {
        dispatch(fetchNhasxSuccess(res.data));
      } else {
        dispatch(fetchNhasxFalied());
      }
    } catch (e) {
      dispatch(fetchNhasxFalied());
    }
  };
};

export const fetchNhasxSuccess = (nhasxData) => ({
  type: actionTypes.FETCH_ALL_NHASX_SUCCESS,
  data: nhasxData,
});

export const fetchNhasxFalied = () => ({
  type: actionTypes.FETCH_ALL_NHASX_FAIDED,
});
