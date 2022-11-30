import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect, useStore } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../../utils/emitter";
import _ from "lodash";
import * as actions from "../../../store/actions";
import { toast } from "react-toastify";
class ModalEditXaphuong extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      tenxaphuong: "",
      id_huyenquan: "",
      huyenquanArr: [],
      selectedHuyenquan: "",
    };
  }

  async componentDidMount() {
    let xaphuong = this.props.currentXaphuong;
    if (xaphuong && !_.isEmpty(xaphuong)) {
      this.setState({
        id: xaphuong.id,
        tenxaphuong: xaphuong.tenxaphuong,
        id_huyenquan: xaphuong.id_huyenquan,
      });
    }
    this.props.getHuyenquanStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.huyenquanRedux !== this.props.huyenquanRedux) {
      let arrHuyenquan = this.props.huyenquanRedux;
      this.setState({
        huyenquanArr: arrHuyenquan,
        id_huyenquan:
          arrHuyenquan && arrHuyenquan.length > 0 ? arrHuyenquan[0].id : "",
        // tenchuyenkhoa: arrChuyenkhoas && arrChuyenkhoas.length > 0 ? arrChuyenkhoas[0].tenchuyenkhoa : ''
      });
      let selectedHuyenquan = arrHuyenquan.find((arrHuyenquan) => {
        return (
          arrHuyenquan.tenhuyenquan &&
          arrHuyenquan.id === this.state.id_huyenquan
        );
      });
      this.setState({
        selectedHuyenquan: selectedHuyenquan,
      });
    }
  }

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

  checkValideInput = () => {
    let isValid = true;
    let arrInput = ["tenxaphuong", "id_huyenquan"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleSaveXaphuong = () => {
    let isValid = this.checkValideInput();
    if (isValid === true) {
      this.props.editXaphuong(this.state);
      toast.success("Sửa Xã Phường thành công!");
    }
  };
  handleReset = () => {
    this.setState({
      tenxaphuong: "",
    });
  };
  render() {
    let huyenquans = this.state.huyenquanArr;
    let selectedHuyenquan = this.state.selectedHuyenquan;
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        className={"modal-user-container"}
        size="lg"
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Sửa xã phường
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label> Mã xã phường</label>
              <input type="text" value={this.state.id} disabled></input>
            </div>
            <div className="input-container">
              <label> Tên xã phường</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "tenxaphuong");
                }}
                value={this.state.tenxaphuong}
              ></input>
            </div>
            <div className="input-container">
              <div className="col-8">
                <label>Tên Huyện Quận</label>
                <select
                  className="form-control"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "id_huyenquan");
                  }}
                  placeholder="Chọn huyện quận"
                >
                  <option selected disabled>
                    {selectedHuyenquan.tenhuyenquan}
                  </option>
                  {huyenquans &&
                    huyenquans.length > 0 &&
                    huyenquans.map((item, index) => {
                      return (
                        <option id={index} value={item.id}>
                          {item.tenhuyenquan} -{" "}
                          {item.huyenquantinhthanh.tentinhthanh}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          {this.state.tenxaphuong !== "" ? (
            <Button
              className="btn-save "
              color="primary"
              onClick={() => {
                this.handleSaveXaphuong();
              }}
            >
              <i className="far fa-save"></i> &nbsp; Lưu
            </Button>
          ) : (
            <Button
              className="btn-save "
              color="primary"
              onClick={() => {
                this.handleSaveXaphuong();
              }}
              disabled
            >
              <i className="far fa-save"></i> &nbsp; Lưu
            </Button>
          )}
          {this.state.tenxaphuong !== "" ? (
            <Button
              className="btn-deleted"
              color="primary"
              onClick={() => {
                this.handleReset();
              }}
            >
              <i className="fas fa-trash"></i> &nbsp; Reset
            </Button>
          ) : (
            <Button
              className="btn-deleted"
              color="primary"
              onClick={() => {
                this.handleReset();
              }}
              disabled
            >
              <i className="fas fa-trash"></i> &nbsp; Reset
            </Button>
          )}
          <Button
            className="btn-out"
            color="secondary"
            onClick={() => {
              this.toggle();
            }}
          >
            <i className="fas fa-times"></i> &nbsp; Thoát
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    huyenquanRedux: state.admin.huyenquans,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getHuyenquanStart: () => dispatch(actions.fetchHuyenquanStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditXaphuong);
