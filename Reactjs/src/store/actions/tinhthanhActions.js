import actionTypes from './actionTypes';
import {
    getAllTinhthanhService,
} from '../../services/tinhthanhService'


export const fetchTinhthanhStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_TINHTHANH_START });
            let res = await getAllTinhthanhService();
            if (res && res.errCode === 0) {
                dispatch(fetchTinhthanhSuccess(res.data))
            } else {
                dispatch(fetchTinhthanhFalied());
            }
        } catch (e) {
            dispatch(fetchTinhthanhFalied());
        }
    }
}

export const fetchTinhthanhSuccess = (tinhthanhData) => ({
    type: actionTypes.FETCH_TINHTHANH_SUCCESS,
    data: tinhthanhData
})

export const fetchTinhthanhFalied = () => ({
    type: actionTypes.FETCH_TINHTHANH_FAIDED
})