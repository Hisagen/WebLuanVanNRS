import actionTypes from "./actionTypes";
import {
  getAllVienchucService,
  createVienchucService,
  deleteVienchucService,
  editVienchucService,
  getAllChucvuService,
  getAllTdhvService,
  getAllChuyenkhoaService,
  getAllXaphuongService,
  getVienchucChucvuIdService,
  createImageVienchucService,
  editImageVienchucService,
} from "../../services/vienchucService";

import { toast } from "react-toastify";

export const vienchucLoginSuccess = (vienchucInfo) => ({
  type: actionTypes.VIENCHUC_LOGIN_SUCCESS,
  vienchucInfo: vienchucInfo,
});

export const vienchucLoginFail = () => ({
  type: actionTypes.VIENCHUC_LOGIN_FAIL,
});

export const fetchXaphuongStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_XAPHUONG_START });
      let res = await getAllXaphuongService();
      if (res && res.errCode === 0) {
        dispatch(fetchXaphuongSuccess(res.data));
      } else {
        dispatch(fetchXaphuongFalied());
      }
    } catch (e) {
      dispatch(fetchXaphuongFalied());
    }
  };
};

export const fetchXaphuongSuccess = (xaphuongData) => ({
  type: actionTypes.FETCH_XAPHUONG_SUCCESS,
  data: xaphuongData,
});

export const fetchXaphuongFalied = () => ({
  type: actionTypes.FETCH_XAPHUONG_FAIDED,
});

export const fetchChuyenkhoaStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_CHUYENKHOA_START });
      let res = await getAllChuyenkhoaService();
      if (res && res.errCode === 0) {
        dispatch(fetchChuyenkhoaSuccess(res.data));
      } else {
        dispatch(fetchChuyenkhoaFalied());
      }
    } catch (e) {
      dispatch(fetchChuyenkhoaFalied());
    }
  };
};

export const fetchChuyenkhoaSuccess = (chuyenkhoaData) => ({
  type: actionTypes.FETCH_CHUYENKHOA_SUCCESS,
  data: chuyenkhoaData,
});

export const fetchChuyenkhoaFalied = () => ({
  type: actionTypes.FETCH_CHUYENKHOA_FAIDED,
});

export const fetchChucvuStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_CHUCVU_START });
      let res = await getAllChucvuService();
      if (res && res.errCode === 0) {
        dispatch(fetchChucvuSuccess(res.data));
      } else {
        dispatch(fetchChucvuFalied());
      }
    } catch (e) {
      dispatch(fetchChucvuFalied());
      console.log("err fetchChucvuStart", e);
    }
  };
};

export const fetchChucvuSuccess = (ChucvuData) => ({
  type: actionTypes.FETCH_CHUCVU_SUCCESS,
  data: ChucvuData,
});

export const fetchChucvuFalied = () => ({
  type: actionTypes.FETCH_CHUCVU_FAIDED,
});

export const fetchTdhvStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_TDHV_START });
      let res = await getAllTdhvService();
      if (res && res.errCode === 0) {
        dispatch(fetchTdhvSuccess(res.data));
      } else {
        dispatch(fetchTdhvFalied());
      }
    } catch (e) {
      dispatch(fetchTdhvFalied());
    }
  };
};

export const fetchTdhvSuccess = (TdhvData) => ({
  type: actionTypes.FETCH_TDHV_SUCCESS,
  data: TdhvData,
});

export const fetchTdhvFalied = () => ({
  type: actionTypes.FETCH_TDHV_FAIDED,
});

export const createNewVienchuc = (data) => {
  // let temp = data;
  return async (dispatch, getState) => {
    try {
      let res = await createImageVienchucService(data.fd);

      if (res && res.errCode == 0) {
        data.filePath = res.filePath;
        data.fileName = res.fileName;
        await createVienchucService(data);
        toast.success("Tạo mới Viên Chức thành công!");
        dispatch(saveVienchucSuccess());
        dispatch(fetchAllVienchucStart());
      } else {
        dispatch(saveVienchucFailded());
      }
    } catch (e) {
      dispatch(saveVienchucFailded());
    }
  };
};

export const saveVienchucSuccess = () => ({
  type: actionTypes.CREATE_VIENCHUC_SUCCESS,
});

export const saveVienchucFailded = () => ({
  type: actionTypes.CREATE_VIENCHUC_FAIDED,
});

export const fetchAllVienchucStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllVienchucService();
      if (res && res.errCode === 0) {
        dispatch(fetchAllVienchucSuccess(res.data.reverse()));
      } else {
        toast.error("Danh sách Viên Chức bị lỗi!");
        dispatch(fetchAllVienchucFalied());
      }
    } catch (e) {
      toast.error("Danh sách Viên Chức bị lỗi!");
      dispatch(fetchAllVienchucFalied());
    }
  };
};

export const fetchAllVienchucSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_VIENCHUC_SUCCESS,
  vienchucs: data,
});

export const fetchAllVienchucFalied = () => ({
  type: actionTypes.FETCH_ALL_VIENCHUC_FAIDED,
});

export const deleteVienchuc = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteVienchucService(id);
      if (res && res.errCode == 0) {
        toast.success("Xóa Viên Chức Thành Công!");
        dispatch(deleteVienchucSuccess());
        dispatch(fetchAllVienchucStart());
      } else {
        toast.error("Xóa Viên Chức thất bại!");
        dispatch(deleteVienchucFalied());
      }
    } catch (e) {
      dispatch(deleteVienchucFalied());
      toast.error("Xóa Viên Chức thất bại!");
    }
  };
};

export const deleteVienchucSuccess = (data) => ({
  type: actionTypes.DELETE_VIENCHUC_SUCCESS,
  vienchucs: data,
});

export const deleteVienchucFalied = () => ({
  type: actionTypes.DELETE_VIENCHUC_FAIDED,
});

export const editVienchuc = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editImageVienchucService(data.fd);
      if (res && res.errCode == 0) {
        await editVienchucService(data);
        toast.success("Cập nhật Viên Chức thành công");
        dispatch(editVienchucSuccess());
        dispatch(fetchAllVienchucStart());
      } else {
        toast.error("Cập nhật Viên Chức thất bại!");
        dispatch(editVienchucFalied());
      }
    } catch (e) {
      dispatch(editVienchucFalied());
      toast.error("Cập nhật Viên Chức thất bại!");
    }
  };
};

export const editVienchucSuccess = () => ({
  type: actionTypes.EDIT_VIENCHUC_SUCCESS,
});

export const editVienchucFalied = () => ({
  type: actionTypes.EDIT_VIENCHUC_FAIDED,
});

export const fetchAllBacsiStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getVienchucChucvuIdService(5);
      if (res && res.errCode === 0) {
        dispatch(fetchAllBacsiSuccess(res.data.reverse()));
      } else {
        toast.error("Danh sách Bác sĩ bị lỗi!");
        dispatch(fetchAllBacsiFalied());
      }
    } catch (e) {
      toast.error("Danh sách Bác sĩ bị lỗi!");
      dispatch(fetchAllBacsiFalied());
    }
  };
};

export const fetchAllBacsiSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_BACSI_SUCCESS,
  bacsis: data,
});

export const fetchAllBacsiFalied = () => ({
  type: actionTypes.FETCH_ALL_BACSI_FAIDED,
});

export const processLogout = () => ({
  type: actionTypes.PROCESS_LOGOUT,
});
