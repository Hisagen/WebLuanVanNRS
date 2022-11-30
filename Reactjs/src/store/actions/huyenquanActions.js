import actionTypes from './actionTypes';
import {
    getAllHuyenquanService,
} from '../../services/huyenquanService'


export const fetchHuyenquanStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_HUYENQUAN_START });
            let res = await getAllHuyenquanService();
            if (res && res.errCode === 0) {
                dispatch(fetchHuyenquanSuccess(res.data))
            } else {
                dispatch(fetchHuyenquanFalied());
            }
        } catch (e) {
            dispatch(fetchHuyenquanFalied());
        }
    }
}

export const fetchHuyenquanSuccess = (huyenquanData) => ({
    type: actionTypes.FETCH_HUYENQUAN_SUCCESS,
    data: huyenquanData
})

export const fetchHuyenquanFalied = () => ({
    type: actionTypes.FETCH_HUYENQUAN_FAIDED
})