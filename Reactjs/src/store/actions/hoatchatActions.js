import actionTypes from './actionTypes';
import {
    getAllHoatchatService,
} from '../../services/hoatchatService'


export const fetchHoatchatStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ALL_HOATCHAT_START });
            let res = await getAllHoatchatService();
            if (res && res.errCode === 0) {
                dispatch(fetchHoatchatSuccess(res.data))
            } else {
                dispatch(fetchHoatchatFalied());
            }
        } catch (e) {
            dispatch(fetchHoatchatFalied());
        }
    }
}

export const fetchHoatchatSuccess = (hoatchatData) => ({
    type: actionTypes.FETCH_ALL_HOATCHAT_SUCCESS,
    data: hoatchatData
})

export const fetchHoatchatFalied = () => ({
    type: actionTypes.FETCH_ALL_HOATCHAT_FAIDED
})