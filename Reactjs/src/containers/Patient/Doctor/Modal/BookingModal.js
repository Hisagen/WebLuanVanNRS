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
      selectedGender: "Nam",
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

  handleOnChangeDatePicker = (ngaysinh) => {
    this.setState({
      ngaysinh: ngaysinh[0],
    });
  };

  handleOnChangeInput = (event, id) => {
    let valueInput = event.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = valueInput;
    this.setState({
      ...stateCopy,
    });
  };

  handleConfirmBooking = async () => {
    let date = new Date(this.state.ngaysinh).getTime();
    this.state.ngaysinh = date;
    // let timeString = this.buildTimeBooking(this.props.dataTime)
    // let doctorName = this.buildDoctorName(this.props.dataTime)
    let id_bacsi = this.props.dataTime.id;
    let gio = this.props.dataTime.lichbacsikhambuoi.tenkhungio;
    let res1 = await createLichkhamService({
      id_lichbacsikham: id_bacsi,
      gio: gio,
    });

    let res = await createBenhnhanService({
      hoten: this.state.hoten,
      ngaysinh: this.state.ngaysinh,
      gioitinh: this.state.selectedGender,
      email: this.state.email,
      password: this.state.password,
      sdt: this.state.sdt,
      nghenghiep: this.state.nghenghiep,
      diachi: this.state.diachi,
      cccd: this.state.cccd,
      id_xaphuong: this.state.selectedXaphuong.value,
    });
    let res2 = await createDangkyService({
      id_lichbacsikham: id_bacsi,
      id_lichkham: res1.data.id,
      id_benhnhan: res.data.id,
      trangthai: "Chưa khám",
    });

    let res3 = await postPatientBookAppoinment({
      tenbacsi: this.props.dataTime.lichbacsikhamvienchuc.hoten,
      tenkhungio: this.props.dataTime.lichbacsikhambuoi.tenkhungio,
      email: this.state.email,
      phong: this.props.dataTime.lichbacsikhamphong.tenphong,
      chuyenkhoa:
        this.props.dataTime.lichbacsikhamphong.phongchuyenkhoa.tenchuyenkhoa,
      ngay: this.props.ngay,
      tenbenhnhan: res.data.hoten,
      sdtbacsi: this.props.dataTime.lichbacsikhamvienchuc.sdt,
    });

    if (
      res &&
      res.errCode === 0 &&
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

  buildTimeBooking = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let time = dataTime.lichbacsikhambuoi.tenkhungio;
      let date = moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY");
      return `${time} - ${date}`;
    }
    return "";
  };

  buildDoctorName = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let name =
        language === LANGUAGES.VI
          ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
          : `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`;
      return name;
    }
    return "";
  };

  handleChangeSelect = (selectedOption) => {
    this.setState({ selectedGender: selectedOption });
  };
  handleChangeSelect1 = (selectedOption) => {
    this.setState({ selectedXaphuong: selectedOption });
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
        <div className="booking-modal-content">
          <div className="booking-modal-header">
            <span className="left">
              {" "}
              <FormattedMessage id="patient.booking-modal.title" />
            </span>
            <span className="right" onClick={closeBookingClose}>
              <i className="fas fa-times"></i>
            </span>
          </div>
          <div className="booking-modal-body">
            {/* {JSON.stringify(dataTime)} */}
            <div className="doctor-infor">
              <ProfileDoctor
                id_vienchuc={id_vienchuc}
                isShowDescriptionDoctor={false}
                dataTime={dataTime}
                isShowLinkDetail={false}
              />
            </div>
            <div className="row">
              <div className="col-6 form-group">
                <label>Họ tên</label>
                <input
                  className="form-control"
                  value={this.state.hoten}
                  onChange={(event) => this.handleOnChangeInput(event, "hoten")}
                />
              </div>
              <div className="col-6 form-group">
                <label>Xã phường - Huyện quận - Tỉnh Thành</label>
                <Select
                  value={this.state.selectedXaphuong}
                  onChange={this.handleChangeSelect1}
                  options={this.state.xaphuongs}
                />
              </div>
              <div className="col-6 form-group">
                <label>Ngày sinh</label>
                <DatePicker
                  onChange={this.handleOnChangeDatePicker}
                  className="form-control"
                  value={this.state.ngaysinh}
                />
              </div>
              {/* <div className='col-6 form-group'>
                                <label><FormattedMessage id="patient.booking-modal.gender" /></label>
                                <Select
                                    value={this.state.selectedGender}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.genders}
                                />
                            </div> */}
              <div className="col-6 form-group">
                <label>Giới tính</label>
                <input
                  className="form-control"
                  value={this.state.selectedGender}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "selectedGender")
                  }
                />
              </div>
              <div className="col-6 form-group">
                <label>Số điện thoại</label>
                <input
                  className="form-control"
                  value={this.state.sdt}
                  onChange={(event) => this.handleOnChangeInput(event, "sdt")}
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.email" />
                </label>
                <input
                  className="form-control"
                  value={this.state.email}
                  onChange={(event) => this.handleOnChangeInput(event, "email")}
                />
              </div>
              <div className="col-6 form-group">
                <label>Nghề nghiệp</label>
                <input
                  className="form-control"
                  value={this.state.nghenghiep}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "nghenghiep")
                  }
                />
              </div>
              <div className="col-6 form-group">
                <label>Password</label>
                <input
                  className="form-control"
                  value={this.state.password}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "password")
                  }
                />
              </div>
              <div className="col-6 form-group">
                <label>Địa chỉ cụ thể</label>
                <input
                  className="form-control"
                  value={this.state.diachi}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "diachi")
                  }
                />
              </div>
              <div className="col-6 form-group">
                <label>Căn cước công dân</label>
                <input
                  className="form-control"
                  value={this.state.cccd}
                  onChange={(event) => this.handleOnChangeInput(event, "cccd")}
                />
              </div>
            </div>
          </div>
          <div className="booking-modal-footer">
            <button
              className="btn-booking-confrim"
              onClick={() => this.handleConfirmBooking()}
            >
              <FormattedMessage id="patient.booking-modal.btnConfirm" />
            </button>
            <button
              className="btn-booking-cancel"
              xaphuongs
              onClick={closeBookingClose}
            >
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getXaphuongs: () => dispatch(actions.fetchXaphuongStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
