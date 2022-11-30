import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./ForgotPW.scss";
import { FormattedMessage } from "react-intl";
import {
  handleBenhnhanLogin,
  checkemailService,
  layMatKhauService,
} from "../../services/benhnhanService";
import { toast } from "react-toastify";

class ForgotPW extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "@gmail.com",
      password: "123",
      isShowPassword: false,
      errMessage: "",
    };
  }
  handleOnchangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });
    try {
      let res = await checkemailService(this.state.username);
      let res1 = await layMatKhauService({
        email: this.state.username,
      });
      if (res === false) {
        toast("Email không hợp lệ!");
      } else {
        toast(
          "Mật khẩu mới đã được gửi tới Email của bạn! Vui lòng kiểm tra Email",
          {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
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

  handleKeyDown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      this.handleLogin();
    }
  };

  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-login">Quên Mật Khẩu</div>
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

            <div className="col-12 text-center mt-3">
              <span className="text-orther-login">Or ForgotPW with</span>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    vienchucLoginSuccess: (vienchucInfor) =>
      dispatch(actions.vienchucLoginSuccess(vienchucInfor)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPW);
