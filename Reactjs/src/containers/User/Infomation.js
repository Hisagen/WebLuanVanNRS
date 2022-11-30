import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./information.scss";
import Slider from "react-slick";
import HomeHeaderNew from "../Auth/HomePageNew/HomeHeaderNew";
import HomeFooter from "../HomePage/HomeFooter";
import {
  editBenhnhanService,
  getIdBenhnhanService,
  createBenhnhanService,
} from "../../services/benhnhanService";
import { toast } from "react-toastify";
import DatePicker from "../../components/Input/DatePicker";
import { emitter } from "../../utils/emitter";
import ModalDoiMatKhau from "./modalDoiMatKhau";
import ModalDoiThongTin from "../Patient/Doctor/Modal/modalDoiThongTin";
import * as actions from "../../store/actions";

class Information extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      hoten: "",
      ngaysinh: "",
      gioitinh: "Nam",
      genderArr: ["Nam", "Nữ", "Khác"],
      sdt: "",
      email: "",
      nghenghiep: "",
      diachi: "",
      cccd: "",
      isShowPassword: true,
      password: "",
      passwordTemp: "12345678",
      openDoiThongTin: false,
    };
  }
  async componentDidMount() {
    let items = JSON.parse(localStorage.getItem("persist:benhnhan"));
    let dataUser = JSON.parse(items?.benhnhanInfo);
    if (items && dataUser?.benhnhan?.id) {
      let thongtin = await getIdBenhnhanService(dataUser.benhnhan.id);
      this.setState({
        id: thongtin.data.id,
        hoten: thongtin.data.hoten,
        ngaysinh: thongtin.data.ngaysinh,
        gioitinh: thongtin.data.gioitinh,
        sdt: thongtin.data.sdt,
        email: thongtin.data.email,
        nghenghiep: thongtin.data.nghenghiep,
        diachi: thongtin.data.diachi,
        cccd: thongtin.data.cccd,
        password: thongtin.data.password,
      });
    }
  }

  async componentDidUpdate(prevProps, presState, snapshot) { }
  editBenhnhan = async (data) => {
    try {
      let response = await editBenhnhanService(data);
      if (response && response.errCode !== 0) {
        toast.error(response.errMessage);
      } else {
        toast.success("Thông tin đã được thay đổi!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = [
      "hoten",
      "ngaysinh",
      "gioitinh",
      "sdt",
      "nghenghiep",
      "diachi",
      "password",
      "email",
    ];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        console.log(arrCheck[i]);
        break;
      }
    }
    return isValid;
  };
  handleCapNhat = () => {
    let test = this.checkValidateInput();
    if (test === false) {
      toast.error("bạn chưa nhập đủ thông");
    } else {
      this.editBenhnhan(this.state);
    }
  };
  handleDangKy = () => {
    let test = this.checkValidateInput();
    if (test === false) {
      toast.error("bạn chưa nhập đủ thông");
    } else {
      createBenhnhanService(this.state);
    }
  };
  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleOnChangeDatePicker = (ngaysinh) => {
    this.setState({
      ngaysinh: ngaysinh[0],
    });
  };
  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };
  openDoiMatKhau = () => {
    this.setState({
      isOpenDoiMatKhau: true,
    });
  };
  toggleDMK = () => {
    this.setState({
      isOpenDoiMatKhau: !this.state.isOpenDoiMatKhau,
    });
  };
  openDoiThongTin = () => {
    this.setState({
      openDoiThongTin: true,
    });
  };
  toggleDoiThongTin = () => {
    this.setState(
      {
        openDoiThongTin: !this.state.openDoiThongTin,
      },
      async () => {
        let items = JSON.parse(localStorage.getItem("persist:benhnhan"));
        let dataUser = JSON.parse(items?.benhnhanInfo);

        if (items && dataUser?.benhnhan?.id) {
          let thongtin = await getIdBenhnhanService(dataUser.benhnhan.id);
          this.setState(
            {
              id: thongtin.data.id,
              hoten: thongtin.data.hoten,
              ngaysinh: thongtin.data.ngaysinh,
              gioitinh: thongtin.data.gioitinh,
              sdt: thongtin.data.sdt,
              email: thongtin.data.email,
              nghenghiep: thongtin.data.nghenghiep,
              diachi: thongtin.data.diachi,
              cccd: thongtin.data.cccd,
              password: thongtin.data.password,
            },
            () => {
              this.props.benhnhanLoginSuccess({
                errCode: 0,
                benhnhan: this.state,
              });
            }
          );
        }
      }
    );
  };
  render() {
    let genders = this.state.genderArr;
    let {
      id,
      hoten,
      ngaysinh,
      gioitinh,
      sdt,
      email,
      nghenghiep,
      diachi,
      cccd,
    } = this.state;
    return (
      <>
        <HomeHeaderNew
          isShow={true}
          isShowBanner={false}
          pageInformation={true}
          pageLichSuKham={true}
        />
        <div className="information-container">
          <div
            className=""
            style={{
              fontSize: "20px",
              marginBottom: "20px",
              borderBottom: "1px solid #3161ad",
              width: "90%",
              color: "white",
            }}
          >
            <span
              style={{
                paddingBottom: "5px",
                paddingTop: "5px",
                paddingLeft: "20px",
                paddingRight: "20px",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                background: "#3161ad",
              }}
            >
              <i className="fas fa-user"></i>
              &nbsp; Thông Tin Cá Nhân
            </span>
          </div>
          <div className="information">
            <i
              class="fas fa-cog"
              style={{
                position: "absolute",
                left: "960px",
                marginTop: "20px",
                fontSize: "16px",
              }}
              onClick={() => this.openDoiThongTin()}
              title="Đổi Thông Tin"
            ></i>
            <ModalDoiThongTin
              openDoiThongTin={this.state.openDoiThongTin}
              toggleFromParent={this.toggleDoiThongTin}
            />
            <div className="tt">
              <div>Họ và tên:</div>
              <input
                type="text"
                value={hoten}
                onChange={(event) => {
                  this.handleOnChangeInput(event, "hoten");
                }}
                placeholder="Nhập tên ..."
                disabled
              />
            </div>
            <div className="tt">
              <div>Ngày sinh:</div>
              <DatePicker
                onChange={this.handleOnChangeDatePicker}
                className="col-4"
                value={ngaysinh}
                placeholder="dd/mm/yyyy"
                disabled
              />
            </div>
            {/* <div className="tt">
              <div>Giới Tính</div>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "gioitinh");
                }}
              />
            </div> */}
            <div className="tt">
              <div>
                <FormattedMessage id="manage-vienchuc.gender" />
              </div>
              <select
                className="col-3"
                value={gioitinh}
                onChange={(event) => {
                  this.handleOnChangeInput(event, "gioitinh");
                }}
                disabled
              >
                {genders &&
                  genders.length > 0 &&
                  genders.map((item, index) => {
                    return <option value={item}>{item}</option>;
                  })}
              </select>
            </div>
            <div className="tt">
              <div>Số điện thoại </div>
              <input
                type="text"
                value={sdt}
                onChange={(event) => {
                  this.handleOnChangeInput(event, "sdt");
                }}
                placeholder="+84"
                disabled
              />
            </div>

            <div className="tt">
              <div>Nghề nghiệp </div>
              <input
                type="text"
                value={nghenghiep}
                onChange={(event) => {
                  this.handleOnChangeInput(event, "nghenghiep");
                }}
                disabled
              />
            </div>
            <div className="tt">
              <div>Địa chỉ</div>
              <textarea
                value={diachi}
                onChange={(event) => {
                  this.handleOnChangeInput(event, "diachi");
                }}
                style={{
                  width: "345px",
                  height: "150px",
                  resize: "none",
                  paddingLeft: "10px",
                }}
                placeholder="Nhập địa chỉ của bạn.."
                disabled
              ></textarea>
            </div>

            {/* <button
              onClick={() => {
                this.handleCapNhat();
              }}
            >
              Cập nhật
            </button> */}
          </div>
          {/* <div className="khung-tintuc">
            <div className="title">Tin Nổi Bật</div>
            <marquee direction="up" scrollamount="3" height="200px">
              <div className="khung">
                <p>
                  <i className="fas fa-star"></i>&nbsp; CẬP NHẬT KIẾN THỨC SIÊU
                  ÂM DOPPLER ĐỘNG MẠCH CẢNH – ĐỐT SỐNG VÀ VAI TRÒ CỦA SIÊU ÂM
                  ĐÀN HỒI TRONG PHÂN LOẠI BIRADS TUYẾN VÚ VÀ PHÂN LOẠI TIRADS
                  TUYẾN GIÁP
                </p>
                <p>
                  <i className="fas fa-star"></i>&nbsp; CẬP NHẬT KIẾN THỨC SIÊU
                  ÂM DOPPLER ĐỘNG MẠCH CẢNH – ĐỐT SỐNG VÀ VAI TRÒ CỦA SIÊU ÂM
                  ĐÀN HỒI TRONG PHÂN LOẠI BIRADS TUYẾN VÚ VÀ PHÂN LOẠI TIRADS
                  TUYẾN GIÁP
                </p>
                <p>
                  <i className="fas fa-star"></i>&nbsp; CẬP NHẬT KIẾN THỨC SIÊU
                  ÂM DOPPLER ĐỘNG MẠCH CẢNH – ĐỐT SỐNG VÀ VAI TRÒ CỦA SIÊU ÂM
                  ĐÀN HỒI TRONG PHÂN LOẠI BIRADS TUYẾN VÚ VÀ PHÂN LOẠI TIRADS
                  TUYẾN GIÁP
                </p>
              </div>
            </marquee>
          </div> */}
          <div className="taikhoan">
            <div className="title">Tài khoản</div>
            <i
              class="fas fa-cog"
              style={{
                position: "absolute",
                right: "20px",
                top: "20px",
                fontSize: "16px",
              }}
              onClick={() => this.openDoiMatKhau()}
              title="Đổi Mật Khẩu"
            ></i>
            <ModalDoiMatKhau
              isOpen={this.state.isOpenDoiMatKhau}
              toggleFromParent={this.toggleDMK}
            />
            <div
              style={{
                display: "flex",
                marginTop: "40px",
              }}
            >
              <div
                style={{
                  marginTop: "10px",
                  marginLeft: "40px",
                  paddingRight: "25px",
                  color: "#333333",
                  borderRight: "1px solid #86899b",
                }}
              >
                Email
              </div>
              <input
                type="text"
                style={{
                  border: "none",
                  marginLeft: "10px",
                  width: "60%",
                  // borderRight: "1px solid #86899b",
                  fontSize: "12px",
                }}
                disabled
                placeholder="Nhập email..."
                onChange={(event) => {
                  this.handleOnChangeInput(event, "email");
                }}
                value={email}
              ></input>
            </div>
            <div
              style={{
                width: "90%",
                borderBottom: "1px solid #86899b",
                marginTop: "0px",
                marginLeft: "18px",
              }}
            ></div>

            <div style={{ height: "10px" }}></div>
            <div
              style={{
                display: "flex",
                // marginTop: "20px",
              }}
            >
              <span style={{ marginLeft: "40px" }}>Mật khẩu</span>
              <input
                type={"password"}
                style={{
                  border: "none",
                  marginLeft: "10px",
                  paddingLeft: "10px",
                  width: "60%",
                }}
                disabled
                placeholder="Nhập mật khẩu..."
                onChange={(event) => {
                  this.handleOnChangeInput(event, "password");
                }}
                value={this.state.passwordTemp}
              ></input>
              {/* <span
                onClick={(event) => this.handleShowHidePassword()}
                style={{
                  position: "absolute",
                  right: "20px",
                  // marginTop: "3px",
                  marginLeft: "130px",
                }}
              >
                <i
                  className={
                    this.state.isShowPassword
                      ? "far fa-eye"
                      : "far fa-eye-slash"
                  }
                ></i>
              </span> */}
            </div>
            <div
              style={{
                width: "90%",
                borderBottom: "1px solid #86899b",
                marginTop: "20px",
                marginLeft: "18px",
              }}
            ></div>

            {/* width: 90px;
            height: 40px;
            margin-left: 50px;
            border: 1px solid #c0bcbc;
            background-color: rgb(60, 102, 226);
            color: white;
            border-radius: 4px; */}
          </div>
        </div>
        <HomeFooter />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedInBN: state.benhnhan.isLoggedInBN,
    language: state.app.language,
    benhnhanInfo: state.benhnhan.benhnhanInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // navigate: (path) => dispatch(push(path)),
    benhnhanLoginSuccess: (benhnhanInfor) =>
      dispatch(actions.benhnhanLoginSuccess(benhnhanInfor)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Information);
