import actionTypes from '../actions/actionTypes';

const initialState = {
    chuyenkhoas: [],
    tdhvs: [],
    chucvus: [],
    vienchucs: [],
    xaphuongs: [],
    huyenquans: [],
    tinhthanhs: [],
    vienchucchuyenkhoathankinhs: [],
    vienchucchuyenkhoacoxuongkhops: [],
    vienchucchuyenkhoatieuhoas: [],
    vienchucchuyenkhoatimmachs: [],
    vienchucchuyenkhoataimuihongs: [],
    buois: [],
    bacsis: [],
    hoatchats: [],
    nhasxs: [],
    thuocs: [],
    phongchuyenkhoathankinhs: [],
    phongchuyenkhoacoxuongkhops: [],
    phongchuyenkhoatieuhoas: [],
    phongchuyenkhoatimmachs: [],
    phongchuyenkhoataimuihongs: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_CHUYENKHOA_START:
            let copyState = { ...state };
            return {
                ...copyState
            }
        case actionTypes.FETCH_CHUYENKHOA_SUCCESS:
            state.chuyenkhoas = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_CHUYENKHOA_FAIDED:
            state.chuyenkhoas = [];
            return {
                ...state
            }
        case actionTypes.FETCH_TDHV_SUCCESS:
            state.tdhvs = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_TDHV_FAIDED:
            state.tdhvs = [];
            return {
                ...state
            }
        case actionTypes.FETCH_XAPHUONG_SUCCESS:
            state.xaphuongs = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_XAPHUONG_FAIDED:
            state.xaphuongs = [];
            return {
                ...state
            }
        case actionTypes.FETCH_CHUCVU_SUCCESS:
            state.chucvus = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_CHUCVU_FAIDED:
            state.chucvus = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_CHUYENKHOA_SUCCESS:
            state.chuyenkhoas = action.chuyenkhoas;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_CHUYENKHOA_FAIDED:
            state.chuyenkhoas = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_VIENCHUC_SUCCESS:
            state.vienchucs = action.vienchucs;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_VIENCHUC_FAIDED:
            state.vienchucs = [];
            return {
                ...state
            }
        case actionTypes.FETCH_TINHTHANH_SUCCESS:
            state.tinhthanhs = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_TINHTHANH_FAIDED:
            state.tinhthanhs = [];
            return {
                ...state
            }
        case actionTypes.FETCH_HUYENQUAN_SUCCESS:
            state.huyenquans = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_HUYENQUAN_FAIDED:
            state.huyenquans = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_BUOI_SUCCESS:
            state.buois = action.buois;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_BUOI_FAIDED:
            state.buois = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_BACSI_SUCCESS:
            state.bacsis = action.bacsis;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_BACSI_FAIDED:
            state.bacsis = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_HOATCHAT_SUCCESS:
            state.hoatchats = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_HOATCHAT_FAIDED:
            state.hoatchats = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_NHASX_SUCCESS:
            state.nhasxs = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_NHASX_FAIDED:
            state.nhasxs = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_THUOC_SUCCESS:
            state.thuocs = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_THUOC_FAIDED:
            state.thuocs = [];
            return {
                ...state
            }
        case actionTypes.FETCH_VIENCHUCCHUYENKHOATHANKINH_SUCCESS:
            state.vienchucchuyenkhoathankinhs = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_VIENCHUCCHUYENKHOATHANKINH_FAIDED:
            state.vienchucchuyenkhoathankinhs = [];
            return {
                ...state
            }
        case actionTypes.FETCH_VIENCHUCCHUYENKHOACOXUONGKHOP_SUCCESS:
            state.vienchucchuyenkhoacoxuongkhops = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_VIENCHUCCHUYENKHOACOXUONGKHOP_FAIDED:
            state.vienchucchuyenkhoacoxuongkhops = [];
            return {
                ...state
            }
        case actionTypes.FETCH_VIENCHUCCHUYENKHOATIEUHOA_SUCCESS:
            state.vienchucchuyenkhoatieuhoas = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_VIENCHUCCHUYENKHOATIEUHOA_FAIDED:
            state.vienchucchuyenkhoatieuhoas = [];
            return {
                ...state
            }
        case actionTypes.FETCH_VIENCHUCCHUYENKHOATIMMACH_SUCCESS:
            state.vienchucchuyenkhoatimmachs = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_VIENCHUCCHUYENKHOATIMMACH_FAIDED:
            state.vienchucchuyenkhoatimmachs = [];
            return {
                ...state
            }
        case actionTypes.FETCH_VIENCHUCCHUYENKHOATAIMUIHONG_SUCCESS:
            state.vienchucchuyenkhoataimuihongs = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_VIENCHUCCHUYENKHOATAIMUIHONG_FAIDED:
            state.vienchucchuyenkhoataimuihongs = [];
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_PHONGCHUYENKHOATHANKINH_SUCCESS:
            state.phongchuyenkhoathankinhs = action.phongchuyenkhoathankinhs;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_PHONGCHUYENKHOATHANKINH_FAIDED:
            state.phongchuyenkhoathankinhs = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_PHONGCHUYENKHOACOXUONGKHOP_SUCCESS:
            state.phongchuyenkhoacoxuongkhops = action.phongchuyenkhoacoxuongkhops;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_PHONGCHUYENKHOACOXUONGKHOP_FAIDED:
            state.phongchuyenkhoacoxuongkhops = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_PHONGCHUYENKHOATIEUHOA_SUCCESS:
            state.phongchuyenkhoatieuhoas = action.phongchuyenkhoatieuhoas;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_PHONGCHUYENKHOATIEUHOA_FAIDED:
            state.phongchuyenkhoatieuhoas = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_PHONGCHUYENKHOATIMMACH_SUCCESS:
            state.phongchuyenkhoatimmachs = action.phongchuyenkhoatimmachs;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_PHONGCHUYENKHOATIMMACH_FAIDED:
            state.phongchuyenkhoatimmachs = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_PHONGCHUYENKHOATAIMUIHONG_SUCCESS:
            state.phongchuyenkhoataimuihongs = action.phongchuyenkhoataimuihongs;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_PHONGCHUYENKHOATAIMUIHONG_FAIDED:
            state.phongchuyenkhoataimuihongs = [];
            return {
                ...state
            }      
        default:
            return state
    }
}

export default adminReducer;