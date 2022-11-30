import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect, useStore } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../../utils/emitter";
import _ from "lodash";
import * as actions from "../../../store/actions";
import { toast } from "react-toastify";
import "./ModalEditTang.scss";
class ModaleditTang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      tentang: "",
      id_chuyenkhoa: "",
      chuyenkhoaArr: [],
      selectedChuyenkhoa: "",
    };
  }

  async componentDidMount() {
    let tang = this.props.currentTang;
    if (tang && !_.isEmpty(tang)) {
      this.setState({
        id: tang.id,
        tentang: tang.tentang,
      });
    }
    this.props.getChuyenkhoaStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.chuyenkhoaRedux !== this.props.chuyenkhoaRedux) {
      let arrChuyenkhoa = this.props.chuyenkhoaRedux;
      this.setState({
        chuyenkhoaArr: arrChuyenkhoa,
        id_chuyenkhoa:
          arrChuyenkhoa && arrChuyenkhoa.length > 0 ? arrChuyenkhoa[0].id : "",
        // tenchuyenkhoa: arrChuyenkhoas && arrChuyenkhoas.length > 0 ? arrChuyenkhoas[0].tenchuyenkhoa : ''
      });
      let selectedChuyenkhoa = arrChuyenkhoa.find((arrChuyenkhoa) => {
        return (
          arrChuyenkhoa.tenchuyenkhoa &&
          arrChuyenkhoa.id === this.state.id_chuyenkhoa
        );
      });
      this.setState({
        selectedChuyenkhoa: selectedChuyenkhoa,
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
    let arrInput = ["tentang", "id_chuyenkhoa"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleSaveTang = () => {
    let isValid = this.checkValideInput();
    if (isValid === true) {
      this.props.editTang(this.state);
      toast.success("Sửa Phòng thành công!");
    }
  };
  handleReset = () => {
    this.setState({
      tentang: "",
      // id_chuyenkhoa: "",
    });
  };
  render() {
    let chuyenkhoas = this.state.chuyenkhoaArr;
    let selectedChuyenkhoa = this.state.selectedChuyenkhoa;
    let { tentang } = this.state;
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
          Sửa Phòng
        </ModalHeader>
        <ModalBody>
          <div className="modal-tangEdit-body">
            <div className="input-container">
              <label>
                <span className="sao">*</span> Mã phòng:
              </label>
              <br />
              <input type="text" value={this.state.id} disabled></input>
            </div>
            {/* <div className="input-container">
              <span>
                <span className="sao">*</span> Tên Phòng:
              </span>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "tentang");
                }}
                value={this.state.tentang}
                placeholder="Tên Phòng..."
              ></input>
            </div> */}
            <div className="input-container">
              <label>
                <span className="sao">*</span> Tên Phòng
              </label>
              <br />
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "tentang");
                }}
                value={this.state.tentang}
                placeholder="Tên Phòng..."
              ></input>
            </div>
            {/* <div className="input-container">
              <div className="select-chuyenkhoa">
                <label>
                  <span className="sao">*</span> Tên chuyên khoa:
                </label>
                <select
                  className="form-control"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "id_chuyenkhoa");
                  }}
                  placeholder="Chọn Chuyên Khoa"
                  //   value={""}
                >
                  {chuyenkhoas &&
                    chuyenkhoas.length > 0 &&
                    chuyenkhoas.map((item, index) => {
                      return (
                        <option id={index} value={item.id}>
                          {item.tenchuyenkhoa}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div> */}
          </div>
        </ModalBody>
        <ModalFooter>
          {tentang !== "" ? (
            <Button
              className="btn-save"
              color="primary"
              onClick={() => {
                this.handleSaveTang();
              }}
            >
              Sửa phòng
            </Button>
          ) : (
            <Button
              className="btn-save"
              color="primary"
              onClick={() => {
                this.handleSaveTang();
              }}
              disabled
            >
              Sửa phòng
            </Button>
          )}

          {tentang !== "" ? (
            <Button
              className="btn-deleted"
              color="primary"
              onClick={() => {
                this.handleReset();
              }}
            >
              <i className="fas fa-trash"></i> &nbsp; Xóa
            </Button>
          ) : (
            <Button
              className="btn-deleted no-drop"
              color="primary"
              onClick={() => {
                this.handleReset();
              }}
              // style={{ hover cursor: "not-allowed" }}
              disabled
            >
              <i className="fas fa-trash"></i> &nbsp; Xóa
            </Button>
          )}

          <Button
            className="btn-out"
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
    chuyenkhoaRedux: state.admin.chuyenkhoas,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getChuyenkhoaStart: () => dispatch(actions.fetchAllChuyenkhoaStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModaleditTang);
