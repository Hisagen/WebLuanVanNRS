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
class ModalThuoc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tenthuoc: "",
      dvt: "",
      id_hoatchat: "",
      hoatchatArr: [],
    };

    this.listenToEmitter();
  }

  listenToEmitter = () => {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        tenthuoc: "",
        id_hoatchat: "",
      });
    });
  };

  async componentDidMount() {
    this.props.getHoatchatStart();
    // this.props.getNhasxStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.hoatchatRedux !== this.props.hoatchatRedux) {
      let arrHoatchat = this.props.hoatchatRedux;
      this.setState({
        hoatchatArr: arrHoatchat,
        id_hoatchat:
          arrHoatchat && arrHoatchat.length > 0 ? arrHoatchat[0].id : "",
        // tenchuyenkhoa: arrChuyenkhoas && arrChuyenkhoas.length > 0 ? arrChuyenkhoas[0].tenchuyenkhoa : ''
      });
    }
    // if (prevProps.nhasxRedux !== this.props.nhasxRedux) {
    //   let arrNhasx = this.props.nhasxRedux;
    //   this.setState({
    //     nhasxArr: arrNhasx,
    //      arrNhasx && arrNhasx.length > 0 ? arrNhasx[0].id : "",
    //     // tenchuyenkhoa: arrChuyenkhoas && arrChuyenkhoas.length > 0 ? arrChuyenkhoas[0].tenchuyenkhoa : ''
    //   });
    // }
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
    let arrInput = ["tenthuoc", "id_hoatchat"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleAddThuoc = () => {
    let isValid = this.checkValideInput();
    if (isValid == true) {
      this.props.createThuoc(this.state);
      toast.success("Tạo mới Thuốc thành công!");
    }
  };
  handleReset = () => {
    this.setState({
      tenthuoc: "",
    });
  };
  render() {
    let hoatchats = this.state.hoatchatArr;
    let nhasxs = this.state.nhasxArr;
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
          Thêm Thuốc
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label> Tên Thuốc</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "tenthuoc");
                }}
                value={this.state.tenthuoc}
                placeholder="Tên Thuốc..."
              ></input>
            </div>
            {/* <div className="input-container">
              <label>Đơn vị tính</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "dvt");
                }}
                value={this.state.dvt}
              ></input>
            </div> */}
            <div className="input-container">
              <div className="col-5">
                <label>Tên hoạt chất</label>
                <select
                  className="form-control"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "id_hoatchat");
                  }}
                  placeholder="Tên Hoạt Chất"
                >
                  {hoatchats &&
                    hoatchats.length > 0 &&
                    hoatchats.map((item, index) => {
                      return (
                        <option id={index} value={item.id}>
                          {item.tenhoatchat}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            {/* <div className="input-container">
              <div className="col-5">
                <label>Tên nhà sản xuất</label>
                <select
                  className="form-control"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "id_nhasx");
                  }}
                  placeholder="Chọn nhà sản xuât"
                >
                  {nhasxs &&
                    nhasxs.length > 0 &&
                    nhasxs.map((item, index) => {
                      return (
                        <option id={index} value={item.id}>
                          {item.tennhasx}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div> */}
          </div>
        </ModalBody>
        <ModalFooter>
          {this.state.tenthuoc !== "" ? (
            <Button
              className="btn-save"
              color="primary"
              onClick={() => {
                this.handleAddThuoc();
              }}
            >
              <i className="far fa-save"></i> &nbsp; Lưu
            </Button>
          ) : (
            <Button
              className="btn-save"
              color="primary"
              onClick={() => {
                this.handleAddThuoc();
              }}
              disabled
            >
              <i className="far fa-save"></i> &nbsp; Lưu
            </Button>
          )}

          {this.state.tenthuoc !== "" ? (
            <Button
              className="btn-deleted"
              color="primary"
              onClick={() => {
                this.handleReset();
              }}
            >
              <i className="fas fa-sync-alt"></i> &nbsp; Reset
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
              <i className="fas fa-sync-alt"></i> &nbsp; Reset
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
    hoatchatRedux: state.admin.hoatchats,
    // nhasxRedux: state.admin.nhasxs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getHoatchatStart: () => dispatch(actions.fetchHoatchatStart()),
    // getNhasxStart: () => dispatch(actions.fetchNhasxStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalThuoc);
