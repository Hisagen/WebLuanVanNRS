import actionTypes from './actionTypes';
import {
    getAllThuocService,
} from '../../services/thuocService'


export const fetchThuocStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ALL_THUOC_START });
            let res = await getAllThuocService();
            if (res && res.errCode === 0) {
                dispatch(fetchThuocSuccess(res.data))
            } else {
                dispatch(fetchThuocFalied());
            }
        } catch (e) {
            dispatch(fetchThuocFalied());
        }
    }
}

export const fetchThuocSuccess = (thuocData) => ({
    type: actionTypes.FETCH_ALL_THUOC_SUCCESS,
    data: thuocData
})

export const fetchThuocFalied = () => ({
    type: actionTypes.FETCH_ALL_THUOC_FAIDED
})