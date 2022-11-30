import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect, useStore } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import DataPicker from "../../../../components";
import DataPicker from "../../../../components/Input/DatePicker";
import {
  editBenhnhanService,
  getIdBenhnhanService,
  createBenhnhanService,
} from "../../../../services/benhnhanService";
import _ from "lodash";
import { toast } from "react-toastify";
import "./modalDangKy.scss";
import * as actions from "../../../../store/actions";

class modalDangKy extends Component {
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
        toast.success("Thông tin đã được thay đổi!");
        this.props.toggleFromParent();
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

  toggle = () => {
    this.props.toggleFromParent();
  };

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };
  handleOnchangeDatePicker = async (date) => {
    let formatedDate = new Date(date[0]).getTime();

    this.setState({
      ngaysinh: formatedDate,
    });
  };
  handleOpenDangNhap = () => {
    this.props.toggleFromParent();
    this.props.toggleOpenDangNhap(true);
  };
  render() {
    let genders = this.state.genderArr;
    let { selectedGender, gioitinh } = this.state;
    let yesterday = new Date(new Date().setDate(new Date().getDate()));

    return (
      <Modal
        isOpen={this.props.openDoiThongTin}
        toggle={() => {
          this.toggle();
        }}
        className={
          "modal-dangky-container animate__animated animate__slideInDown"
        }
        size="lg"
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
          className="modal-dangky-header"
          style={{ color: "#4cc48b" }}
        >
          <span onClick={() => this.handleOpenDangNhap()}>
            Thay Đổi Thông Tin
          </span>
        </ModalHeader>
        <ModalBody>
          <div className="modal-dangky-body">
            <div
              className="container-trangthai"
              style={{
                fontWeight: "600",
                fontSize: "25px",
                marginBottom: "20px",
                color: "#4cc48b",
              }}
            >
              <span>Thông Tin Cá Nhân</span>
            </div>

            <div className="body-modalDangKy">
              <div className="body">
                <div
                  style={{
                    display: "flex",
                    position: "absolute",
                    marginTop: "20px",
                  }}
                >
                  <div
                    style={{
                      marginLeft: "50px",
                      borderRight: "1px solid #86899b",
                      paddingRight: "25px",
                      color: "#333333",
                    }}
                  >
                    Email
                  </div>
                  <input
                    type="text"
                    style={{ border: "none", marginLeft: "10px" }}
                    placeholder="Nhập email..."
                    value={this.state.email}
                    disabled
                    onChange={(e) => this.handleOnChangeInput(e, "email")}
                  ></input>
                </div>
                <div
                  style={{
                    width: "90%",
                    borderBottom: "1px solid #86899b",
                    marginTop: "50px",
                    marginLeft: "18px",
                  }}
                ></div>

                <div
                  style={{
                    display: "flex",
                    position: "absolute",
                    marginTop: "20px",
                  }}
                >
                  <div
                    style={{
                      marginLeft: "30px",
                      borderRight: "1px solid #86899b",
                      paddingRight: "25px",
                      color: "#333333",
                    }}
                  >
                    Họ và tên
                  </div>
                  <input
                    type="text"
                    style={{ border: "none", marginLeft: "10px" }}
                    placeholder="Nhập họ và tên..."
                    value={this.state.hoten}
                    onChange={(e) => this.handleOnChangeInput(e, "hoten")}
                  ></input>
                </div>
                <div
                  style={{
                    width: "90%",
                    borderBottom: "1px solid #86899b",
                    marginTop: "50px",
                    marginLeft: "18px",
                  }}
                ></div>
                <div
                  style={{
                    display: "flex",
                    position: "absolute",
                    marginTop: "20px",
                  }}
                >
                  <div
                    style={{
                      marginLeft: "65px",
                      borderRight: "1px solid #86899b",
                      paddingRight: "25px",
                      color: "#333333",
                    }}
                  >
                    +84
                  </div>
                  <input
                    type="text"
                    style={{
                      border: "none",
                      marginLeft: "10px",
                    }}
                    placeholder="Nhập số điện thoại..."
                    value={this.state.sdt}
                    onChange={(e) => this.handleOnChangeInput(e, "sdt")}
                  ></input>
                </div>
                <div
                  style={{
                    width: "90%",
                    borderBottom: "1px solid #86899b",
                    marginTop: "50px",
                    marginLeft: "18px",
                  }}
                ></div>

                <div
                  style={{
                    display: "flex",
                    position: "absolute",
                    marginTop: "20px",
                  }}
                >
                  <div
                    className="container-trangthai"
                    style={{
                      marginLeft: "35px",
                      borderRight: "1px solid #86899b",
                      paddingRight: "25px",
                      color: "#333333",
                    }}
                  >
                    Giới tính
                  </div>
                  <select
                    style={{
                      border: "1px solid #86899b",
                      outLine: "none",
                      marginLeft: "10px",
                      width: "80px",
                    }}
                    value={this.state.gioitinh}
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "gioitinh");
                    }}
                  >
                    <option selected disabled>
                      {selectedGender ? selectedGender : ""}
                    </option>
                    {genders &&
                      genders.length > 0 &&
                      genders.map((item, index) => {
                        return <option value={item}>{item}</option>;
                      })}
                  </select>
                </div>
                <div
                  style={{
                    width: "90%",
                    borderBottom: "1px solid #86899b",
                    marginTop: "50px",
                    marginLeft: "18px",
                  }}
                ></div>

                <div
                  style={{
                    display: "flex",
                    position: "absolute",
                    marginTop: "20px",
                  }}
                >
                  <div
                    style={{
                      marginLeft: "20px",
                      paddingRight: "20px",
                      borderRight: "1px solid #86899b",
                      color: "#333333",
                      width: "145px",
                    }}
                  >
                    Ngày sinh
                  </div>
                  {/* <input
                    type="text"
                    style={{ border: "none", marginLeft: "10px" }}
                    placeholder="Nhập email..."
                  ></input> */}
                  <DataPicker
                    onChange={this.handleOnchangeDatePicker}
                    className="form-control"
                    value={this.state.ngaysinh}
                    // minDate={yesterday}
                    maxDate={yesterday}
                    close={false}
                    style={{
                      outLine: "none",
                      border: "1px solid #86899b",
                      height: "25px",
                      marginLeft: "10px",
                    }}
                  />
                </div>
                <div
                  style={{
                    width: "90%",
                    borderBottom: "1px solid #86899b",
                    marginTop: "50px",
                    marginLeft: "18px",
                  }}
                ></div>

                <div
                  style={{
                    display: "flex",
                    position: "absolute",
                    marginTop: "20px",
                  }}
                >
                  <div
                    style={{
                      marginLeft: "45px",
                      paddingRight: "5px",
                      color: "#333333",
                    }}
                  >
                    Địa chỉ
                  </div>
                  <textarea
                    type="text"
                    style={{
                      border: "1px solid #86899b",
                      marginLeft: "10px",
                      width: "341px",
                      height: "80px",
                      resize: "none",
                      outline: "none",
                      marginLeft: "25px",
                    }}
                    placeholder="Nhập địa chỉ..."
                    value={this.state.diachi}
                    onChange={(e) => this.handleOnChangeInput(e, "diachi")}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="btn-createUser"
            color="primary"
            onClick={() => {
              this.handleCapNhat();
            }}
          >
            Cập Nhật
          </Button>
          {/* {action == 2 ? (
            <Button
              className="btn-out"
              color="secondary"
              onClick={() => {
                this.toggle();
              }}
            >
              Thoát
            </Button>
          ) : (
            ""
          )} */}
        </ModalFooter>
      </Modal>
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
    benhnhanLoginSuccess: (benhnhanInfor) =>
      dispatch(actions.benhnhanLoginSuccess(benhnhanInfor)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(modalDangKy);
