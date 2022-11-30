import actionTypes from './actionTypes';
import { toast } from "react-toastify";

export const benhnhanLoginSuccess = (benhnhanInfo) => ({
    type: actionTypes.BENHNHAN_LOGIN_SUCCESS,
    benhnhanInfo: benhnhanInfo
})

export const benhnhanLoginFail = () => ({
    type: actionTypes.BENHNHAN_LOGIN_FAIL
})

export const processBNLogout = () => ({
    type: actionTypes.PROCESS_BN_LOGOUT
})

