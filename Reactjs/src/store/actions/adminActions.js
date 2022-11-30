import actionTypes from "./actionTypes";
import { toast } from "react-toastify";

export const adminLoginSuccess = (vienchucInfo) => ({
  type: actionTypes.VIENCHUC_LOGIN_SUCCESS,
  vienchucInfo: vienchucInfo,
});

export const adminLoginFail = () => ({
  type: actionTypes.VIENCHUC_LOGIN_FAIL,
});

export const processLogout = () => ({
  type: actionTypes.PROCESS_LOGOUT,
});
