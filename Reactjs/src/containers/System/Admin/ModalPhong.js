import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../../utils/emitter";
import * as actions from "../../../store/actions";
import "./ModalPhong.scss";

import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import Select from "react-select";
import "react-markdown-editor-lite/lib/index.css";

import { getAllTangService } from "../../../services/tangService";

import { toast } from "react-toastify";
class ModalPhong extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tenphong: "",
      id_chuyenkhoa: "",
      id_tang: "",
      chuyenkhoaArr: [],
    };

    this.listenToEmitter();
  }

  listenToEmitter = () => {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        tenphong: "",
        id_chuyenkhoa: "",
        tangArray: "",
      });
    });
  };

  async componentDidMount() {
    this.props.getChuyenkhoaStart();
    let tangArray = await getAllTangService();
    this.setState({
      tangArray: tangArray?.data,
      id_tang:
        tangArray && tangArray?.data?.length > 0 ? tangArray?.data[0]?.id : "",
    });
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.chuyenkhoaRedux !== this.props.chuyenkhoaRedux) {
      let arrChuyenkhoa = this.props.chuyenkhoaRedux;
      this.setState({
        chuyenkhoaArr: arrChuyenkhoa,
        id_chuyenkhoa:
          arrChuyenkhoa && arrChuyenkhoa.length > 0 ? arrChuyenkhoa[0].id : "",
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
    let arrInput = ["tenphong", "id_chuyenkhoa"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleAddPhong = () => {
    let isValid = this.checkValideInput();
    if (isValid == true) {
      this.props.createPhong(this.state);
      toast.success("Tạo mới Phòng thành công!");
    }
  };

  handleReset = () => {
    this.setState({
      tenphong: "",
      // id_chuyenkhoa: "",
    });
  };

  render() {
    let phongs = this.state.chuyenkhoaArr;
    let tangs = this.state.tangArray;
    let { tenphong } = this.state;
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
          Thêm Phòng
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <span>
                <span className="sao">*</span> Tên Phòng
              </span>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "tenphong");
                }}
                value={this.state.tenphong}
                placeholder="Tên Phòng..."
              ></input>
            </div>
            <div className="input-container">
              <div className="select-chuyenkhoa">
                <label>
                  <span className="sao">*</span> Tên chuyên khoa
                </label>
                <select
                  className="form-control"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "id_chuyenkhoa");
                  }}
                  placeholder="Chọn Chuyên Khoa"
                  //   value={""}
                >
                  {phongs &&
                    phongs.length > 0 &&
                    phongs.map((item, index) => {
                      return (
                        <option id={index} value={item.id}>
                          {item.tenchuyenkhoa}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>

            <div className="input-container">
              <div className="select-chuyenkhoa">
                <label>
                  <span className="sao">*</span> Tên Tầng
                </label>
                <select
                  className="form-control"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "id_tang");
                  }}
                  placeholder="Chọn Tầng"
                  //   value={""}
                >
                  {tangs &&
                    tangs.length > 0 &&
                    tangs.map((item, index) => {
                      return (
                        <option id={index} value={item.id}>
                          {item.tentang}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          {tenphong !== "" ? (
            <Button
              className="btn-save "
              color="primary"
              onClick={() => {
                this.handleAddPhong();
              }}
            >
              <i className="far fa-save"></i> &nbsp; Lưu
            </Button>
          ) : (
            <Button
              className="btn-save "
              color="primary"
              onClick={() => {
                this.handleAddPhong();
              }}
              disabled
            >
              <i className="far fa-save"></i> &nbsp; Lưu
            </Button>
          )}

          {tenphong !== "" ? (
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
    chuyenkhoaRedux: state.admin.chuyenkhoas,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getChuyenkhoaStart: () => dispatch(actions.fetchAllChuyenkhoaStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalPhong);
