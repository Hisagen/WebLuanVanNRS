import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect, useStore } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../../utils/emitter";
import _ from "lodash";
import * as actions from "../../../store/actions";
import { toast } from "react-toastify";
import { getAllTangService } from "../../../services/tangService";
import "./ModalEditPhong.scss";
class ModaleditPhong extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      tenphong: "",
      id_chuyenkhoa: "",
      chuyenkhoaArr: [],
      tangArr: [],
      selectedChuyenkhoa: "",
    };
  }

  async componentDidMount() {
    let phong = this.props.currentPhong;
    let tangArr = await getAllTangService();
    if (phong && !_.isEmpty(phong)) {
      this.setState({
        id: phong.id,
        tenphong: phong.tenphong,
        id_chuyenkhoa: phong?.id_chuyenkhoa,
        id_tang: phong?.id_tang ? phong?.id_tang : tangArr.data[0].id,
      });
    }
    this.props.getChuyenkhoaStart();

    this.setState({
      tangArr: tangArr.data,
    });
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.chuyenkhoaRedux !== this.props.chuyenkhoaRedux) {
      let arrChuyenkhoa = this.props.chuyenkhoaRedux;
      this.setState({
        chuyenkhoaArr: arrChuyenkhoa,
        // id_chuyenkhoa:
        //   arrChuyenkhoa && arrChuyenkhoa.length > 0 ? arrChuyenkhoa[0].id : "",
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

  handleSavePhong = () => {
    let isValid = this.checkValideInput();
    if (isValid === true) {
      this.props.editPhong(this.state);
      toast.success("Sửa Phòng thành công!");
    }
  };
  handleReset = () => {
    this.setState({
      tenphong: "",
      // id_chuyenkhoa: "",
    });
  };
  render() {
    let chuyenkhoas = this.state.chuyenkhoaArr;

    let selectedChuyenkhoa = this.state.selectedChuyenkhoa;
    let { tenphong, id_chuyenkhoa, id_tang, tangArr, selectedTang } =
      this.state;
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
          <div className="modal-phongEdit-body">
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
                  this.handleOnChangeInput(event, "tenphong");
                }}
                value={this.state.tenphong}
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
                  this.handleOnChangeInput(event, "tenphong");
                }}
                value={this.state.tenphong}
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
            <div className="input-container">
              <div className="col-8">
                <label>
                  <span className="sao">*</span> Tên chuyên khoa{" "}
                </label>
                <select
                  className="form-control"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "id_chuyenkhoa");
                  }}
                  placeholder="Chọn phòng"
                  value={id_chuyenkhoa}
                >
                  {chuyenkhoas &&
                    chuyenkhoas.length > 0 &&
                    chuyenkhoas.map((item, index) => {
                      return (
                        <option id={index} value={item?.id}>
                          {item.tenchuyenkhoa}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>

            <div className="input-container">
              <div className="col-8">
                <label>
                  <span className="sao">*</span> Tên tầng{" "}
                </label>
                <select
                  className="form-control"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "id_tang");
                  }}
                  placeholder="Chọn tầng"
                  value={id_tang}
                >
                  {tangArr &&
                    tangArr.length > 0 &&
                    tangArr.map((item, index) => {
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
              className="btn-save"
              color="primary"
              onClick={() => {
                this.handleSavePhong();
              }}
            >
              Sửa phòng
            </Button>
          ) : (
            <Button
              className="btn-save"
              color="primary"
              onClick={() => {
                this.handleSavePhong();
              }}
              disabled
            >
              Sửa phòng
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

export default connect(mapStateToProps, mapDispatchToProps)(ModaleditPhong);
