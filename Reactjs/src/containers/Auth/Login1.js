import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login1.scss";
import { FormattedMessage } from "react-intl";
import { handleBenhnhanLogin } from "../../services/benhnhanService";
import { toast } from "react-toastify";

class Login1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "sinB1805653@student.ctu.edu.vn",
      password: "1234",
      isShowPassword: false,
      errMessage: "",
      isOpenMoDal: false,
    };
  }
  handleOnchangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  handleOnchangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });
    try {
      let data = await handleBenhnhanLogin(
        this.state.username,
        this.state.password
      );

      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.benhnhanData.errCode === 0) {
        this.props.benhnhanLoginSuccess(data.benhnhanData);
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

  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      this.handleLogin();
    }
  };

  hanldeOpenFYP = () => {
    this.setState({
      isOpenMoDal: true,
    });
  };
  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-login">Login</div>
            <div className="col-12 form-group login-input">
              <label>Username:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                value={this.state.username}
                onChange={(event) => this.handleOnchangeUsername(event)}
                onKeyDown={(event) => this.handleKeyDown(event)}
              />
            </div>
            <div className="col-12 form-group login-input">
              <label>Password:</label>
              <div className="custom-input-password">
                <input
                  type={this.state.isShowPassword ? "password" : "text"}
                  className="form-control"
                  placeholder="Enter your password"
                  value={this.state.password}
                  onChange={(event) => this.handleOnchangePassword(event)}
                  onKeyDown={(event) => this.handleKeyDown(event)}
                />
                <sqan onClick={(event) => this.handleShowHidePassword()}>
                  <i
                    className={
                      this.state.isShowPassword
                        ? "far fa-eye"
                        : "far fa-eye-slash"
                    }
                  ></i>
                </sqan>
              </div>
            </div>
            <div className="col-12" style={{ color: "red" }}>
              {this.state.errMessage}
            </div>
            <div className="col-12">
              <button
                className="btn-login"
                onClick={() => {
                  this.handleLogin();
                }}
              >
                Input
              </button>
            </div>
            <div className="col-12">
              <span
                className="forgot-password"
                onClick={() => {
                  this.hanldeOpenFYP();
                }}
              >
                Forgot your password?
              </span>
            </div>
            <div className="col-12 text-center mt-3">
              <span className="text-orther-login">Or Login with</span>
            </div>
            <div className="col-12 social-login">
              <i className="fab fa-google-plus-g google"></i>
              <i className="fab fa-facebook-f facebook"></i>
            </div>
          </div>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login1);
