import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../../utils/emitter";
import * as actions from "../../../store/actions";

import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import Select from "react-select";
import "react-markdown-editor-lite/lib/index.css";

import { toast } from "react-toastify";
class ModalXaphuong extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tenxaphuong: "",
      id_huyenquan: "",
      huyenquanArr: [],
    };

    this.listenToEmitter();
  }

  listenToEmitter = () => {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        tenxaphuong: "",
        id_huyenquan: "",
      });
    });
  };

  async componentDidMount() {
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

  handleAddXaphuong = () => {
    let isValid = this.checkValideInput();
    if (isValid == true) {
      this.props.createXaphuong(this.state);
      toast.success("Tạo mới Xã phường thành công!");
    }
  };
  handleReset = () => {
    this.setState({
      tenxaphuong: "",
    });
  };
  render() {
    let huyenquans = this.state.huyenquanArr;
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
          Thêm xã phường
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
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
              <div className="select-phong">
                <label>Tên huyện quận</label>
                <select
                  className="form-control"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "id_huyenquan");
                  }}
                  placeholder="Chọn tỉnh thành"
                >
                  {huyenquans &&
                    huyenquans.length > 0 &&
                    huyenquans.map((item, index) => {
                      return (
                        <option id={index} value={item.id}>
                          {item.tenxaphuong} -{" "}
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
                this.handleAddXaphuong();
              }}
            >
              <i className="far fa-save"></i> &nbsp; Lưu
            </Button>
          ) : (
            <Button
              className="btn-save "
              color="primary"
              onClick={() => {
                this.handleAddXaphuong();
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalXaphuong);
