import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect, useStore } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import _ from "lodash";
import { toast } from "react-toastify";
import "./BookingModalThanhToan.scss";
import Content from "../Modal/content.js";

class BookingModalThanhToan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   tenChucvu: "",
      //   id_chuyenkhoa: "",
      //   chuyenkhoaArr: [],
      //   selectedChuyenkhoa: "",
      id: "",
      isOpenModalThanhToan: false,
      time: "",
      // success: "BookingModalThanhToan",
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
  // hanldeCloseBooking = (data) => {
  //   if (data === false) {
  //     this.props.toggleFromParent();
  //     this.props.openLogin(true);
  //   }
  // };
  render() {
    return (
      <Modal
        isOpen={this.props.isOpenModalThanhToanParent}
        toggle={() => {
          this.toggle();
        }}
        className={"modal-thanhtoan-container"}
        size="lg"
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
          className="modal-thanhtoan-header"
        >
          Thông tin đặt khám
        </ModalHeader>
        <ModalBody>
          <div className="modal-thanhtoan-body">
            <div className="container-trangthai">
              <Content
                phong={this.props?.phong}
                detailDoctor={this.props?.detailDoctor}
                handleSuccess={this.handleSuccess}
                // closeModalBooking={this.hanldeCloseBooking}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          {/* <Button
            className="btn-save"
            color="primary"
            onClick={() => {
              this.deleteChucvu();
            }}
          >
            Xóa
          </Button> */}
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
    chuyenkhoaRedux: state.admin.chuyenkhoas,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookingModalThanhToan);
