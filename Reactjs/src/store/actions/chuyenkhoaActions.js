import actionTypes from "./actionTypes";
import {
  getAllChuyenkhoaService,
  createChuyenkhoaService,
  deleteChuyenkhoaService,
  editChuyenkhoaService,
  createImageChuyenkhoaService,
  editImageChuyenkhoaService,
} from "../../services/chuyenkhoaService";

import { toast } from "react-toastify";

export const createNewChuyenkhoa = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createImageChuyenkhoaService(data.fd);

      if (res && res.errCode == 0) {
        data.filePath = res.filePath;
        data.fileName = res.fileName;
        await createChuyenkhoaService(data);
        toast.success("Tạo mới Chuyên Khoa thành công!");
        dispatch(saveChuyenkhoaSuccess());
        dispatch(fetchAllChuyenkhoaStart());
      } else {
        dispatch(saveChuyenkhoaFailded());
      }
    } catch (e) {
      dispatch(saveChuyenkhoaFailded());
    }
  };
};

export const saveChuyenkhoaSuccess = () => ({
  type: actionTypes.CREATE_CHUYENKHOA_SUCCESS,
});

export const saveChuyenkhoaFailded = () => ({
  type: actionTypes.CREATE_CHUYENKHOA_FAIDED,
});

export const fetchAllChuyenkhoaStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllChuyenkhoaService();
      if (res && res.errCode === 0) {
        dispatch(fetchAllChuyenkhoaSuccess(res.data));
      } else {
        toast.error("Danh sách Chuyên Khoa bị lỗi!");
        dispatch(fetchAllChuyenkhoaFalied());
      }
    } catch (e) {
      toast.error("Danh sách Chuyên Khoa bị lỗi!");
      dispatch(fetchAllChuyenkhoaFalied());
    }
  };
};

export const fetchAllChuyenkhoaSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_CHUYENKHOA_SUCCESS,
  chuyenkhoas: data,
});

export const fetchAllChuyenkhoaFalied = () => ({
  type: actionTypes.FETCH_ALL_CHUYENKHOA_FAIDED,
});

export const deleteChuyenkhoa = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteChuyenkhoaService(id);
      if (res && res.errCode == 0) {
        toast.success("Xóa Chuyên Khoa Thành Công!");
        dispatch(deleteChuyenkhoaSuccess());
        dispatch(fetchAllChuyenkhoaStart());
      } else {
        toast.error("Xóa Chuyên Khoa thất bại le!");
        dispatch(deleteChuyenkhoaFalied());
      }
    } catch (e) {
      dispatch(deleteChuyenkhoaFalied());
      toast.error("Xóa Chuyên Khoa thất bại le le!");
    }
  };
};

export const deleteChuyenkhoaSuccess = (data) => ({
  type: actionTypes.DELETE_CHUYENKHOA_SUCCESS,
  chuyenkhoas: data,
});

export const deleteChuyenkhoaFalied = () => ({
  type: actionTypes.DELETE_CHUYENKHOA_FAIDED,
});

export const editChuyenkhoa = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editImageChuyenkhoaService(data.fd);

      if (res && res.errCode == 0) {
        editChuyenkhoaService(data);
        toast.success("Cập nhật Chuyên Khoa thành công");
        dispatch(editChuyenkhoaSuccess());
        dispatch(fetchAllChuyenkhoaStart());
      } else {
        toast.error("Cập nhật Chuyên Khoa thất bại!");
        dispatch(editChuyenkhoaFalied());
      }
    } catch (e) {
      dispatch(editChuyenkhoaFalied());
      toast.error("Cập nhật Chuyên Khoa thất bại!");
    }
  };
};

export const editChuyenkhoaSuccess = () => ({
  type: actionTypes.EDIT_CHUYENKHOA_SUCCESS,
});

export const editChuyenkhoaFalied = () => ({
  type: actionTypes.EDIT_CHUYENKHOA_FAIDED,
});
