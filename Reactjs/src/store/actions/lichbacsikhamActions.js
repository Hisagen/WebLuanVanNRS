import actionTypes from "./actionTypes";
import { getVienchucChuyenkhoaIdService } from "../../services/vienchucService";
import { getAllBuoiService } from "../../services/buoiService";
import { getPhongChuyenkhoaIdService } from "../../services/phongService";
import {
  getAllLichbacsikhamService,
  bulkCreateScheduele,
  deleteLichbacsikhamService,
  editLichbacsikhamService,
  getAllChuyenkhoaLichbacsikhamService,
} from "../../services/lichbacsikhamService";

import { toast } from "react-toastify";

export const fetchAllBuoiStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllBuoiService();
      if (res && res.errCode === 0) {
        dispatch(fetchAllBuoiSuccess(res.data));
      } else {
        toast.error("Danh sách Buổi bị lỗi!");
        dispatch(fetchAllBuoiFalied());
      }
    } catch (e) {
      toast.error("Danh sách Buổi bị lỗi!");
      dispatch(fetchAllBuoiFalied());
    }
  };
};

export const fetchAllBuoiSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_BUOI_SUCCESS,
  buois: data,
});

export const fetchAllBuoiFalied = () => ({
  type: actionTypes.FETCH_ALL_BUOI_FAIDED,
});

// export const createNewVienchucChuyenkhoaThankinh = (data) => {
//     return async (dispatch, getState) => {
//         try {
//             let res = await bulkCreateScheduele(data);
//             if (res && res.errCode == 0) {
//                 toast.success("Tạo mới Lịch bác sĩ khám thành công!");
//                 dispatch(saveVienchucChuyenkhoaThankinhSuccess())
//                 dispatch(fetchVienchucChuyenkhoaThankinhStart())
//             } else {
//                 dispatch(saveVienchucChuyenkhoaThankinhFailded())
//             }
//         } catch (e) {
//             dispatch(saveVienchucChuyenkhoaThankinhFailded());
//         }
//     }
// }

export const saveVienchucChuyenkhoaThankinhSuccess = () => ({
  type: actionTypes.CREATE_VIENCHUCCHUYENKHOATHANKINH_SUCCESS,
});

export const saveVienchucChuyenkhoaThankinhFailded = () => ({
  type: actionTypes.CREATE_VIENCHUCCHUYENKHOATHANKINH_FAIDED,
});

export const deleteVienchucChuyenkhoaThankinh = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteLichbacsikhamService(id);
      if (res && res.errCode == 0) {
        toast.success("Xóa lịch bác sĩ khám Thành Công!");
        dispatch(deleteVienchucChuyenkhoaThankinhSuccess());
        dispatch(fetchVienchucChuyenkhoaThankinhStart());
      } else {
        toast.error("Xóa lịch bác sĩ khám thất bại!");
        dispatch(deleteVienchucChuyenkhoaThankinhFalied());
      }
    } catch (e) {
      dispatch(deleteVienchucChuyenkhoaThankinhFalied());
      toast.error("Xóa lịch bác sĩ khám thất bại!");
    }
  };
};

export const deleteVienchucChuyenkhoaThankinhSuccess = (data) => ({
  type: actionTypes.DELETE_VIENCHUCCHUYENKHOATHANKINH_SUCCESS,
  vienchucs: data,
});

export const deleteVienchucChuyenkhoaThankinhFalied = () => ({
  type: actionTypes.DELETE_VIENCHUCCHUYENKHOATHANKINH_FAIDED,
});

export const editVienchucChuyenkhoaThankinh = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editLichbacsikhamService(data);
      if (res && res.errCode == 0) {
        toast.success("Cập nhật Lịch bác sĩ khám thành công");
        dispatch(editVienchucChuyenkhoaThankinhSuccess());
        dispatch(fetchVienchucChuyenkhoaThankinhStart());
      } else {
        toast.error("Cập nhật Lịch bác sĩ khám thất bại!");
        dispatch(editVienchucChuyenkhoaThankinhFalied());
      }
    } catch (e) {
      dispatch(editVienchucChuyenkhoaThankinhFalied());
      toast.error("Cập nhật Lịch bác sĩ khám thất bại!");
    }
  };
};

export const editVienchucChuyenkhoaThankinhSuccess = () => ({
  type: actionTypes.EDIT_VIENCHUCCHUYENKHOATHANKINH_SUCCESS,
});

export const editVienchucChuyenkhoaThankinhFalied = () => ({
  type: actionTypes.EDIT_VIENCHUCCHUYENKHOATHANKINH_FAIDED,
});

export const fetchVienchucChuyenkhoaThankinhStart = (id_chuyenkhoa) => {
  return async (dispatch, getState) => {
    try {
      // dispatch({ type: actionTypes.FETCH_VIENCHUCCHUYENKHOATHANKINH_SUCCESS });
      if (id_chuyenkhoa === undefined) {
        id_chuyenkhoa = 2;
        let res = await getVienchucChuyenkhoaIdService(id_chuyenkhoa);
        if (res && res.errCode === 0) {
          dispatch(fetchVienchucChuyenkhoaThankinhSuccess(res.data));
        } else {
          dispatch(fetchVienchucChuyenkhoaThankinhFalied());
        }
      } else {
        let res = await getVienchucChuyenkhoaIdService(id_chuyenkhoa);

        if (res && res.errCode === 0) {
          dispatch(fetchVienchucChuyenkhoaThankinhSuccess(res.data));
        } else {
          dispatch(fetchVienchucChuyenkhoaThankinhFalied());
        }
      }
    } catch (e) {
      dispatch(fetchVienchucChuyenkhoaThankinhFalied());
    }
  };
};

export const fetchVienchucChuyenkhoaThankinhSuccess = (lichbacsikhamData) => ({
  type: actionTypes.FETCH_VIENCHUCCHUYENKHOATHANKINH_SUCCESS,
  data: lichbacsikhamData,
});

export const fetchVienchucChuyenkhoaThankinhFalied = () => ({
  type: actionTypes.FETCH_VIENCHUCCHUYENKHOATHANKINH_FAIDED,
});

export const fetchVienchucChuyenkhoaCoxuongkhopStart = () => {
  return async (dispatch, getState) => {
    try {
      // dispatch({ type: actionTypes.FETCH_VIENCHUCCHUYENKHOATHANKINH_SUCCESS });
      let id_chuyenkhoa = 23;
      let res = await getVienchucChuyenkhoaIdService(id_chuyenkhoa);
      if (res && res.errCode === 0) {
        dispatch(fetchVienchucChuyenkhoaCoxuongkhopSuccess(res.data));
      } else {
        dispatch(fetchVienchucChuyenkhoaCoxuongkhopFalied());
      }
    } catch (e) {
      dispatch(fetchVienchucChuyenkhoaCoxuongkhopFalied());
    }
  };
};

export const fetchVienchucChuyenkhoaCoxuongkhopSuccess = (
  lichbacsikhamData
) => ({
  type: actionTypes.FETCH_VIENCHUCCHUYENKHOACOXUONGKHOP_SUCCESS,
  data: lichbacsikhamData,
});

export const fetchVienchucChuyenkhoaCoxuongkhopFalied = () => ({
  type: actionTypes.FETCH_VIENCHUCCHUYENKHOACOXUONGKHOP_FAIDED,
});

export const fetchVienchucChuyenkhoaTieuhoaStart = () => {
  return async (dispatch, getState) => {
    try {
      // dispatch({ type: actionTypes.FETCH_VIENCHUCCHUYENKHOATHANKINH_SUCCESS });
      let id_chuyenkhoa = 24;
      let res = await getVienchucChuyenkhoaIdService(id_chuyenkhoa);
      if (res && res.errCode === 0) {
        dispatch(fetchVienchucChuyenkhoaTieuhoaSuccess(res.data));
      } else {
        dispatch(fetchVienchucChuyenkhoaTieuhoaFalied());
      }
    } catch (e) {
      dispatch(fetchVienchucChuyenkhoaTieuhoaFalied());
    }
  };
};

export const fetchVienchucChuyenkhoaTieuhoaSuccess = (lichbacsikhamData) => ({
  type: actionTypes.FETCH_VIENCHUCCHUYENKHOATIEUHOA_SUCCESS,
  data: lichbacsikhamData,
});

export const fetchVienchucChuyenkhoaTieuhoaFalied = () => ({
  type: actionTypes.FETCH_VIENCHUCCHUYENKHOATIEUHOA_FAIDED,
});

export const fetchVienchucChuyenkhoaTimmachStart = () => {
  return async (dispatch, getState) => {
    try {
      // dispatch({ type: actionTypes.FETCH_VIENCHUCCHUYENKHOATHANKINH_SUCCESS });
      let id_chuyenkhoa = 25;
      let res = await getVienchucChuyenkhoaIdService(id_chuyenkhoa);
      if (res && res.errCode === 0) {
        dispatch(fetchVienchucChuyenkhoaTimmachSuccess(res.data));
      } else {
        dispatch(fetchVienchucChuyenkhoaTimmachFalied());
      }
    } catch (e) {
      dispatch(fetchVienchucChuyenkhoaTimmachFalied());
    }
  };
};

export const fetchVienchucChuyenkhoaTimmachSuccess = (lichbacsikhamData) => ({
  type: actionTypes.FETCH_VIENCHUCCHUYENKHOATIMMACH_SUCCESS,
  data: lichbacsikhamData,
});

export const fetchVienchucChuyenkhoaTimmachFalied = () => ({
  type: actionTypes.FETCH_VIENCHUCCHUYENKHOATIMMACH_FAIDED,
});

export const fetchVienchucChuyenkhoaTaimuihongStart = () => {
  return async (dispatch, getState) => {
    try {
      // dispatch({ type: actionTypes.FETCH_VIENCHUCCHUYENKHOATHANKINH_SUCCESS });
      let id_chuyenkhoa = 26;
      let res = await getVienchucChuyenkhoaIdService(id_chuyenkhoa);
      if (res && res.errCode === 0) {
        dispatch(fetchVienchucChuyenkhoaTaimuihongSuccess(res.data));
      } else {
        dispatch(fetchVienchucChuyenkhoaTaimuihongFalied());
      }
    } catch (e) {
      dispatch(fetchVienchucChuyenkhoaTaimuihongFalied());
    }
  };
};

export const fetchVienchucChuyenkhoaTaimuihongSuccess = (
  lichbacsikhamData
) => ({
  type: actionTypes.FETCH_VIENCHUCCHUYENKHOATAIMUIHONG_SUCCESS,
  data: lichbacsikhamData,
});

export const fetchVienchucChuyenkhoaTaimuihongFalied = () => ({
  type: actionTypes.FETCH_VIENCHUCCHUYENKHOATAIMUIHONG_FAIDED,
});

export const fetchAllPhongChuyenkhoaThankinhStart = (id) => {
  return async (dispatch, getState) => {
    try {
      if (id === undefined) {
        id = 4;
        let res = await getPhongChuyenkhoaIdService(4, "");
        if (res && res.errCode === 0) {
          dispatch(fetchAllPhongChuyenkhoaThankinhSuccess(res.data));
        } else {
          // toast.error("Danh sách Phòng theo chuyên khoa Thần Kin bị lỗi!");
          dispatch(fetchAllPhongChuyenkhoaThankinhFalied());
        }
      } else {
        let res = await getPhongChuyenkhoaIdService(id, "");
        if (res && res.errCode === 0) {
          dispatch(fetchAllPhongChuyenkhoaThankinhSuccess(res.data));
        } else {
          // toast.error("Danh sách Phòng theo chuyên khoa Thần Kin bị lỗi!");
          dispatch(fetchAllPhongChuyenkhoaThankinhFalied());
        }
      }
    } catch (e) {
      toast.error("Danh sách Phòng theo chuyên khoa Thần Kin bị lỗi!");
      dispatch(fetchAllPhongChuyenkhoaThankinhFalied());
    }
  };
};

export const fetchAllPhongChuyenkhoaThankinhSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_PHONGCHUYENKHOATHANKINH_SUCCESS,
  phongchuyenkhoathankinhs: data,
});

export const fetchAllPhongChuyenkhoaThankinhFalied = () => ({
  type: actionTypes.FETCH_ALL_PHONGCHUYENKHOATHANKINH_FAIDED,
});

export const fetchAllPhongChuyenkhoaCoxuongkhopStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getPhongChuyenkhoaIdService(23);
      if (res && res.errCode === 0) {
        dispatch(fetchAllPhongChuyenkhoaCoxuongkhopSuccess(res.data));
      } else {
        toast.error("Danh sách Phòng theo chuyên khoa Co xuong khop bị lỗi!");
        dispatch(fetchAllPhongChuyenkhoaCoxuongkhopFalied());
      }
    } catch (e) {
      toast.error("Danh sách Phòng theo chuyên khoa Co xuong khop bị lỗi!");
      dispatch(fetchAllPhongChuyenkhoaCoxuongkhopFalied());
    }
  };
};

export const fetchAllPhongChuyenkhoaCoxuongkhopSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_PHONGCHUYENKHOACOXUONGKHOP_SUCCESS,
  phongchuyenkhoacoxuongkhops: data,
});

export const fetchAllPhongChuyenkhoaCoxuongkhopFalied = () => ({
  type: actionTypes.FETCH_ALL_PHONGCHUYENKHOACOXUONGKHOP_FAIDED,
});

export const fetchAllPhongChuyenkhoaTieuhoaStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getPhongChuyenkhoaIdService(24);
      if (res && res.errCode === 0) {
        dispatch(fetchAllPhongChuyenkhoaTieuhoaSuccess(res.data));
      } else {
        toast.error("Danh sách Phòng theo chuyên khoa tieu hoa khop bị lỗi!");
        dispatch(fetchAllPhongChuyenkhoaTieuhoaFalied());
      }
    } catch (e) {
      toast.error("Danh sách Phòng theo chuyên khoa tieu hoa khop bị lỗi!");
      dispatch(fetchAllPhongChuyenkhoaTieuhoaFalied());
    }
  };
};

export const fetchAllPhongChuyenkhoaTieuhoaSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_PHONGCHUYENKHOATIEUHOA_SUCCESS,
  phongchuyenkhoatieuhoas: data,
});

export const fetchAllPhongChuyenkhoaTieuhoaFalied = () => ({
  type: actionTypes.FETCH_ALL_PHONGCHUYENKHOATIEUHOA_FAIDED,
});

export const fetchAllPhongChuyenkhoaTimmachStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getPhongChuyenkhoaIdService(25);
      if (res && res.errCode === 0) {
        dispatch(fetchAllPhongChuyenkhoaTimmachSuccess(res.data));
      } else {
        toast.error("Danh sách Phòng theo chuyên khoa tim mach khop bị lỗi!");
        dispatch(fetchAllPhongChuyenkhoaTimmachFalied());
      }
    } catch (e) {
      toast.error("Danh sách Phòng theo chuyên khoa tim mach khop bị lỗi!");
      dispatch(fetchAllPhongChuyenkhoaTimmachFalied());
    }
  };
};

export const fetchAllPhongChuyenkhoaTimmachSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_PHONGCHUYENKHOATIMMACH_SUCCESS,
  phongchuyenkhoatimmachs: data,
});

export const fetchAllPhongChuyenkhoaTimmachFalied = () => ({
  type: actionTypes.FETCH_ALL_PHONGCHUYENKHOATIMMACH_FAIDED,
});

export const fetchAllPhongChuyenkhoaTaimuihongStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getPhongChuyenkhoaIdService(26);
      if (res && res.errCode === 0) {
        dispatch(fetchAllPhongChuyenkhoaTaimuihongSuccess(res.data));
      } else {
        toast.error(
          "Danh sách Phòng theo chuyên khoa tai mui hong khop bị lỗi!"
        );
        dispatch(fetchAllPhongChuyenkhoaTaimuihongFalied());
      }
    } catch (e) {
      toast.error("Danh sách Phòng theo chuyên khoa tai mui hong khop bị lỗi!");
      dispatch(fetchAllPhongChuyenkhoaTaimuihongFalied());
    }
  };
};

export const fetchAllPhongChuyenkhoaTaimuihongSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_PHONGCHUYENKHOATAIMUIHONG_SUCCESS,
  phongchuyenkhoataimuihongs: data,
});

export const fetchAllPhongChuyenkhoaTaimuihongFalied = () => ({
  type: actionTypes.FETCH_ALL_PHONGCHUYENKHOATAIMUIHONG_FAIDED,
});
