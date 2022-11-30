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
class ModalThemthuoc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      soluong: "",
      lieudung: "",
      cachdung: "",
      id_thuoc: "",
      id_nguoidung: "",
      thuocArr: [],
    };

    this.listenToEmitter();
  }

  listenToEmitter = () => {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        soluong: "",
        id_thuoc: "",
        lieudung: "",
        cachdung: "",
      });
    });
  };

  async componentDidMount() {
    this.props.getThuocStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.thuocRedux !== this.props.thuocRedux) {
      let arrThuoc = this.props.thuocRedux;
      this.setState({
        thuocArr: arrThuoc,
        id_thuoc: arrThuoc && arrThuoc.length > 0 ? arrThuoc[0].id : "",
        // tenchuyenkhoa: arrChuyenkhoas && arrChuyenkhoas.length > 0 ? arrChuyenkhoas[0].tenchuyenkhoa : ''
        // id_nguoidung:
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
    let arrInput = ["soluong", "lieudung", "cachdung", "id_thuoc"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleAddTemp = () => {
    let isValid = this.checkValideInput();
    if (isValid == true) {
      this.props.createTemp(this.state);
      toast.success("Tạo mới Thuốc thành công!");
    }
  };

  render() {
    let thuocs = this.state.thuocArr;
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
              <div className="col-8">
                <label>Tên thuốc</label>
                <select
                  className="form-control"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "id_thuoc");
                  }}
                  placeholder="Tên thuốc"
                >
                  {thuocs &&
                    thuocs.length > 0 &&
                    thuocs.map((item, index) => {
                      return (
                        <option id={index} value={item.id}>
                          {item.tenthuoc}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className="input-container">
              <label>Số lượng</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "soluong");
                }}
                value={this.state.soluong}
              ></input>
            </div>
            <div className="input-container">
              <label>Cách dùng</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "cachdung");
                }}
                value={this.state.cachdung}
              ></input>
            </div>
            <div className="input-container">
              <label>Liều dùng</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "lieudung");
                }}
                value={this.state.lieudung}
              ></input>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="px-3"
            color="primary"
            onClick={() => {
              this.handleAddTemp();
            }}
          >
            Thêm Thuốc
          </Button>{" "}
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
    thuocRedux: state.admin.thuocs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getThuocStart: () => dispatch(actions.fetchThuocStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalThemthuoc);
