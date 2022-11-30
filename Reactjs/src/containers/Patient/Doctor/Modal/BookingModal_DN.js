import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";
import "./BookingModal.scss";
import { Modal } from "reactstrap";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from "../../../../store/actions";
import { LANGUAGES } from "../../../../utils";
import Select from "react-select";
import { createBenhnhanService } from "../../../../services/benhnhanService";
import { createDangkyService } from "../../../../services/dangkyService";
import { createLichkhamService } from "../../../../services/lichkhamService";
import { postPatientBookAppoinment } from "../../../../services/benhnhanService";
import { toast } from "react-toastify";
import moment from "moment";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoten: "",
      ngaysinh: "",
      selectedGender: "",
      genders: ["Nam", "Nữ", "Khác"],
      sdt: "",
      email: "",
      password: "",
      nghenghiep: "",
      diachi: "",
      cccd: "",
      id_xaphong: "",
      id_vienchuc: "",
      timeType: "",

      xaphuongs: "",
      selectedXaphuong: "",
    };
  }

  async componentDidMount() {
    this.props.getXaphuongs();
  }

  buldDataGender = (data) => {
    let result = [];
    let language = this.props.language;

    if (data && data.length > 0) {
      data.map((item) => {
        let object = {};
        object.label = item;
        object.value = item;
        result.push(object);
      });
    }
    return result;
  };
  buldDataXaphuong = (data) => {
    let result = [];
    if (data && data.length > 0) {
      data.map((item) => {
        let object = {};
        object.label =
          item.tenxaphuong +
          " - " +
          item.xaphuonghuyenquan.tenhuyenquan +
          " - " +
          item.xaphuonghuyenquan.huyenquantinhthanh.tentinhthanh;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };

  //hàm dùng để in hoa kí tự đầu tiên
  async componentDidUpdate(prevProps, presState, snapshot) {
    if (this.props.xaphuongs !== prevProps.xaphuongs) {
      if (this.props.xaphuongs.length > 0) {
        let data = this.props.xaphuongs;
        data.map((item) => {
          return item;
        });
      }
      this.setState({
        xaphuongs: this.buldDataXaphuong(this.props.xaphuongs),
        genders: this.buldDataGender(this.state.genders),
      });
    }
    if (this.props.dataTime !== prevProps.dataTime) {
      if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
        let id_vienchuc = this.props.dataTime.id_vienchuc;
        let timeType = this.props.dataTime.timeType;
        this.setState({
          id_vienchuc: id_vienchuc,
          timeType: timeType,
        });
      }
    }
  }

  handleConfirmBooking = async () => {
    let date = new Date(this.state.ngaysinh).getTime();
    this.state.ngaysinh = date;

    let id_bacsi = this.props.dataTime.id;
    let gio = this.props.dataTime.lichbacsikhambuoi.tenkhungio;
    let res1 = await createLichkhamService({
      id_lichbacsikham: id_bacsi,
      gio: gio,
    });

    let res2 = await createDangkyService({
      id_lichbacsikham: id_bacsi,
      id_lichkham: res1.data.id,
      id_benhnhan: this.props.benhnhanInfo.benhnhan.id,
      trangthai: "Chưa khám",
    });

    let res3 = await postPatientBookAppoinment({
      tenbacsi: this.props.dataTime.lichbacsikhamvienchuc.hoten,
      tenkhungio: this.props.dataTime.lichbacsikhambuoi.tenkhungio,
      email: this.props.benhnhanInfo.benhnhan.email,
      phong: this.props.dataTime.lichbacsikhamphong.tenphong,
      chuyenkhoa:
        this.props.dataTime.lichbacsikhamphong.phongchuyenkhoa.tenchuyenkhoa,
      ngay: this.props.ngay,
      tenbenhnhan: this.props.benhnhanInfo.benhnhan.hoten,
      sdtbacsi: this.props.dataTime.lichbacsikhamvienchuc.sdt,
    });
    if (
      this.props.benhnhanInfo &&
      this.props.benhnhanInfo.errCode === 0 &&
      res1 &&
      res1.errCode === 0 &&
      res2 &&
      res2.errCode === 0
    ) {
      toast.success("Đặt lịch khám bệnh thành công");
      this.props.closeBookingClose();
    } else {
      toast.error("Đặt lịch khám bệnh thất bại");
    }
  };

  render() {
    let { isOpenModal, closeBookingClose, dataTime } = this.props;
    let id_vienchuc = "";
    if (dataTime && !_.isEmpty(dataTime)) {
      id_vienchuc = dataTime.id_vienchuc;
    }
    return (
      <Modal
        isOpen={isOpenModal}
        className={"booking-modal-container"}
        size="lg"
        centered
        // backdrop={true}
      >
        <div className="booking-modal-content" style={{ width: "500px" }}>
          <div className="booking-modal-footer">
            <div>Bạn có chắc chắn là muốn đặc lịch khám ???</div>
            <button
              className="btn-booking-confrim"
              onClick={() => this.handleConfirmBooking()}
            >
              <FormattedMessage id="patient.booking-modal.btnConfirm" />
            </button>
            <button className="btn-booking-cancel" onClick={closeBookingClose}>
              <FormattedMessage id="patient.booking-modal.btnCancel" />
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    xaphuongs: state.admin.xaphuongs,
    isLoggedInBN: state.benhnhan.isLoggedInBN,
    benhnhanInfo: state.benhnhan.benhnhanInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getXaphuongs: () => dispatch(actions.fetchXaphuongStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
