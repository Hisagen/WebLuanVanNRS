import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect, useStore } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { handleBenhnhanLogin } from "../../../../services/benhnhanService";
import _ from "lodash";
import { toast } from "react-toastify";
import "./modalLogin.scss";
import * as actions from "../../../../store/actions";

class modalLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      isOpenModalThanhToan: false,
      time: "",
      isShowPassword: true,
      userName: "sinB1805653@student.ctu.edu.vn",
      passWord: "1234",
    };
  }

  async componentDidMount() {}

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

  //   checkValideInput = () => {
  //     let isValid = true;
  //     let arrInput = ["tenChucvu", "id_chuyenkhoa"];
  //     for (let i = 0; i < arrInput.length; i++) {
  //       if (!this.state[arrInput[i]]) {
  //         isValid = false;
  //         alert("Missing parameter: " + arrInput[i]);
  //         break;
  //       }
  //     }
  //     return isValid;
  //   };

  handleReset = () => {
    this.setState({});
  };
  handleSuccess = (success) => {
    this.props.handleSuccess(success);
  };
  handleKeyDown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      this.handleLogin();
    }
  };
  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };
  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });
    try {
      let data = await handleBenhnhanLogin(
        this.state.userName,
        this.state.passWord
      );
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.benhnhanData.errCode === 0) {
        await this.props.benhnhanLoginSuccess(data.benhnhanData);
        toast.success("Đăng nhập thành công");
        if (this.props.dangnhapthanhcong) {
          await this.props.dangnhapthanhcong(true);
        }
        const timer = setTimeout(() => {
          this.props.toggleFromParent();
        }, 600);
      } else {
        toast.error("Đăng nhập không thành công");
      }
    } catch (e) {
      if (e.response) {
        if (e.response.data) {
          this.setState({
            errMessage: e.response.data.message,
          });
        }
      }
      this.setState({
        errMessage: e.message,
      });
    }
  };
  handleOpenDangKy = () => {
    this.props.toggleFromParent();
    this.props.toggleOpenDangKy(true);
  };
  render() {
    return (
      <Modal
        isOpen={this.props.openLogin}
        toggle={() => {
          this.toggle();
        }}
        className={"modal-login-container"}
        size="lg"
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
          className="modal-thanhtoan-header animate__animated animate__slideInDown"
          style={{ color: "#4cc48b" }}
        >
          <span style={{ borderBottom: "1px solid #4cc48b" }}>Đăng Nhập</span> /{" "}
          <span onClick={() => this.handleOpenDangKy()}>Đăng Ký</span>
        </ModalHeader>
        <ModalBody>
          <div className="modal-login-body">
            <div
              className="container-trangthai"
              style={{
                fontWeight: "600",
                fontSize: "25px",
                marginBottom: "20px",
                color: "#4cc48b",
              }}
            >
              Đăng nhập
            </div>
            <div
              style={{
                fontWeight: "600",
                fontSize: "35px",
                marginBottom: "20px",
                color: "#4cc48b",
              }}
            >
              Long Sin HOSPITAL
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  marginTop: "100px",
                }}
              >
                <div
                  style={{
                    marginLeft: "40px",
                    borderRight: "1px solid #86899b",
                    paddingRight: "25px",
                    color: "#333333",
                  }}
                >
                  Email
                </div>
                <input
                  type="text"
                  style={{
                    border: "none",
                    marginLeft: "10px",
                    width: "100%",
                  }}
                  placeholder="Nhập email..."
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "userName");
                  }}
                  value={this.state.userName}
                ></input>
              </div>
              <div
                style={{
                  width: "90%",
                  borderBottom: "1px solid #86899b",
                  marginTop: "5px",
                  marginLeft: "18px",
                }}
              ></div>
              <div style={{ height: "30px" }}></div>
              <div
                style={{
                  display: "flex",
                  position: "absolute",
                  marginTop: "20px",
                }}
              >
                <input
                  type={this.state.isShowPassword ? "password" : "text"}
                  style={{
                    border: "none",
                    marginLeft: "10px",
                    paddingLeft: "102px",
                  }}
                  placeholder="Nhập mật khẩu..."
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "passWord");
                  }}
                  value={this.state.passWord}
                ></input>
                <span
                  onClick={(event) => this.handleShowHidePassword()}
                  style={{
                    // position: "absolute",
                    right: "0px",
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
                </span>
              </div>
              <div
                style={{
                  width: "90%",
                  borderBottom: "1px solid #86899b",
                  marginTop: "50px",
                  marginLeft: "18px",
                }}
              ></div>
            </div>

            {/* <button
              className="btn-login"
              style={{
                width: "80%",
                border: "none",
                borderRadius: "10px",
                height: "30px",
              }}
              onKeyDown={(event) => this.handleKeyDown(event)}
              onClick={() => {
                this.handleLogin();
              }}
            >
              Login
            </button> */}

            <div
              style={{ left: "50px", position: "absolute", marginTop: "20px" }}
            >
              Forgot your password?
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="btn-dangnhap"
            color="primary"
            onKeyDown={(event) => this.handleKeyDown(event)}
            onClick={() => {
              this.handleLogin();
            }}
          >
            Đăng nhập
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
    language: state.app.language,
    isLoggedInBN: state.benhnhan.isLoggedInBN,
    benhnhanInfor: state.benhnhan.benhnhanInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // navigate: (path) => dispatch(push(path)),
    benhnhanLoginSuccess: (benhnhanInfor) =>
      dispatch(actions.benhnhanLoginSuccess(benhnhanInfor)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(modalLogin);
