import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./modalDoiMatKhau.scss";
import { toast } from "react-toastify";
import * as actions from "../../store/actions";

import {
  getIdBenhnhanService,
  doimatkhauService,
} from "../../services/benhnhanService";
class modalDoiMatKhau extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenDoiMatKhau: false,
      pass1: "",
      pass2: "",
      pass3: "",
      passCurrent: "",
      id: "",
    };
  }

  async componentDidMount() {
    console.log("đầu tiên");
    if (this.props.benhnhanInfo) {
      console.log("info", this.props.benhnhanInfo);
      let { benhnhan } = this.props.benhnhanInfo;
      if (benhnhan?.id) {
        let thongtin = await getIdBenhnhanService(benhnhan?.id);
        this.setState({
          id: benhnhan.id,
          passCurrent: thongtin.data.password,
        });
      }
    }
  }
  //hàm dùng để in hoa kí tự đầu tiên
  async componentDidUpdate(prevProps, presState, snapshot) {}

  toggle = () => {
    this.props.toggleFromParent();
  };
  toggleChuanDoanModal = () => {
    this.setState({
      isOpenDoiMatKhau: !this.state.isOpenDoiMatKhau,
    });
  };
  handleDoi = async () => {
    if (this.state.pass1 !== this.state.passCurrent) {
      console.log("this.state.passCurrent", this.state.passCurrent);
      alert("mật khẩu không đúng!");
    } else if (this.state.pass2 !== this.state.pass3) {
      alert("mật khẩu mới không khớp!");
    } else if (this.state.passCurrent === this.state.pass2) {
      alert("không được đặt lại mật khẩu cũ!");
    } else {
      let res = await doimatkhauService({
        id: this.state.id,
        passNew: this.state.pass2,
      });

      if (res.errCode === 0) {
        this.props.processBNLogout();
        // window.location.href = "/login";
        toast.success(
          "Mật khẩu đã được thay đổi Vui Lòng Đăng nhập lại với mật khẩu mới!"
        );
        setTimeout(() => {
          window.location.assign("/homenew");
        }, 3000);
      }
    }
  };
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        className="modal-DMK-container"
        size="lg"
      >
        <ModalHeader>Thay đổi mật khẩu</ModalHeader>
        <ModalBody>
          <div className="mk">Mật khẩu cũ:</div>
          <input
            type="password"
            value={this.state.pass1}
            onChange={(event) => {
              this.setState({
                pass1: event.target.value,
              });
            }}
          />
          <div className="mk">Mật khẩu mới:</div>
          <input
            type="password"
            value={this.state.pass2}
            onChange={(event) => {
              this.setState({
                pass2: event.target.value,
              });
            }}
          />
          <div className="mk">Nhập lại mật khẩu:</div>
          <input
            type="password"
            value={this.state.pass3}
            onChange={(event) => {
              this.setState({
                pass3: event.target.value,
              });
            }}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            className="px-3"
            color="secondary"
            onClick={() => {
              this.handleDoi();
            }}
          >
            Đổi
          </Button>
          <Button
            className="px-3"
            color="secondary"
            onClick={() => {
              this.toggle();
            }}
          >
            Thoát
          </Button>
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
    processBNLogout: () => dispatch(actions.processBNLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(modalDoiMatKhau);
