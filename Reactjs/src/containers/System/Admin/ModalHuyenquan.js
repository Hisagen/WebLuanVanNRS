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
class ModalHuyenquan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tenhuyenquan: "",
      id_tinhthanh: "",
      tinhthanhArr: [],
    };

    this.listenToEmitter();
  }

  listenToEmitter = () => {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        tenhuyenquan: "",
        id_tinhthanh: "",
      });
    });
  };

  async componentDidMount() {
    this.props.getTinhthanhStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.tinhthanhRedux !== this.props.tinhthanhRedux) {
      let arrTinhthanh = this.props.tinhthanhRedux;
      this.setState({
        tinhthanhArr: arrTinhthanh,
        id_tinhthanh:
          arrTinhthanh && arrTinhthanh.length > 0 ? arrTinhthanh[0].id : "",
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
    let arrInput = ["tenhuyenquan", "id_tinhthanh"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleAddHuyenquan = () => {
    let isValid = this.checkValideInput();
    if (isValid == true) {
      this.props.createHuyenquan(this.state);
      toast.success("Tạo mới Huyện quận thành công!");
    }
  };
  handleReset = () => {
    this.setState({
      tenhuyenquan: "",
    });
  };
  render() {
    let tinhthanhs = this.state.tinhthanhArr;
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
          Thêm huyện quận
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label>
                <span className="sao">*</span> Tên huyện quận
              </label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "tenhuyenquan");
                }}
                value={this.state.tenhuyenquan}
              ></input>
            </div>
            <div className="input-container">
              <div className="select-chuyenkhoa">
                <label>
                  <span className="sao">*</span> Tên tỉnh thành
                </label>
                <select
                  className="form-control"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "id_tinhthanh");
                  }}
                  placeholder="Chọn tỉnh thành"
                >
                  {tinhthanhs &&
                    tinhthanhs.length > 0 &&
                    tinhthanhs.map((item, index) => {
                      return (
                        <option id={index} value={item.id}>
                          {item.tentinhthanh}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          {this.state.tenhuyenquan !== "" ? (
            <Button
              className="btn-save "
              color="primary"
              onClick={() => {
                this.handleAddHuyenquan();
              }}
            >
              <i className="far fa-save"></i> &nbsp; Lưu
            </Button>
          ) : (
            <Button
              className="btn-save "
              color="primary"
              onClick={() => {
                this.handleAddHuyenquan();
              }}
              disabled
            >
              <i className="far fa-save"></i> &nbsp; Lưu
            </Button>
          )}
          {this.state.tenhuyenquan !== "" ? (
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
    tinhthanhRedux: state.admin.tinhthanhs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTinhthanhStart: () => dispatch(actions.fetchTinhthanhStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalHuyenquan);
