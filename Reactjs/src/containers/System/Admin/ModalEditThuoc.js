import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect, useStore } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../../utils/emitter";
import _ from "lodash";
import * as actions from "../../../store/actions";
import { toast } from "react-toastify";
class ModalEditThuoc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      tenthuoc: "",
      id_hoatchat: "",
      tinhthanhArr: [],
      selectedHoatchat: "",
      nhasxArr: [],
      //   selectedNhasx: "",
    };
  }

  async componentDidMount() {
    let thuoc = this.props.currentThuoc;
    if (thuoc && !_.isEmpty(thuoc)) {
      this.setState({
        id: thuoc.id,
        tenthuoc: thuoc.tenthuoc,
        // dvt: thuoc.dvt,
        id_hoatchat: thuoc.id_hoatchat,
      });
    }
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
      let selectedHoatchat = arrHoatchat.find((arrHoatchat) => {
        return (
          arrHoatchat.tenhoatchat && arrHoatchat.id === this.state.id_hoatchat
        );
      });
      this.setState({
        selectedHoatchat: selectedHoatchat,
      });
    }
    if (prevProps.nhasxRedux !== this.props.nhasxRedux) {
      let arrNhasx = this.props.nhasxRedux;
      this.setState({
        nhasxArr: arrNhasx,
      });
      // let selectedNhasx = arrNhasx.find(arrNhasx => {
      //     return arrNhasx.tennhasx && arrNhasx.id === this.state.id_nhasx
      // })
      //   this.setState({
      //     selectedNhasx: selectedNhasx,
      //   });
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

  handleSaveThuoc = () => {
    let isValid = this.checkValideInput();
    if (isValid === true) {
      this.props.editThuoc(this.state);
      toast.success("S???a Thu???c th??nh c??ng!");
    }
  };
  handleReset = () => {
    this.setState({
      tenthuoc: "",
    });
  };
  render() {
    let hoatchats = this.state.hoatchatArr;
    let selectedHoatchat = this.state.selectedHoatchat;
    let nhasxs = this.state.nhasxArr;
    // let selectedNhasx = this.state.selectedNhasx;

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
          S???aThu???c
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label> M?? Thu???c</label>
              <input type="text" value={this.state.id} disabled></input>
            </div>
            <div className="input-container">
              <label> T??n Thu???c</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "tenthuoc");
                }}
                value={this.state.tenthuoc}
              ></input>
            </div>
            {/* <div className="input-container">
              <label> ????n v??? t??nh</label>
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
                <label>T??n ho???t ch???t</label>
                <select
                  className="form-control"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "id_hoatchat");
                  }}
                  placeholder="Ch???n ho???t ch???t"
                >
                  <option selected disabled>
                    {selectedHoatchat.tenhoatchat}
                  </option>
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
            {/* <div className='input-container'>
                            <div className='col-5'>
                                <label>T??n nh?? s???n xu??t</label>
                                <select className="form-control"
                                    onChange={(event) => { this.handleOnChangeInput(event, 'id_nhasx') }}
                                    placeholder='Ch???n nh?? s???n xu???t'
                                >
                                    <option selected disabled>
                                        {selectedNhasx.tennhasx}
                                    </option>
                                    {nhasxs && nhasxs.length > 0 &&
                                        nhasxs.map((item, index) => {
                                            return (
                                                <option
                                                    id={index}
                                                    value={item.id}>
                                                    {item.tennhasx}
                                                </option>
                                            )
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
                this.handleSaveThuoc();
              }}
            >
              <i className="far fa-save"></i> &nbsp; L??u
            </Button>
          ) : (
            <Button
              className="btn-save"
              color="primary"
              onClick={() => {
                this.handleSaveThuoc();
              }}
              disabled
            >
              <i className="far fa-save"></i> &nbsp; L??u
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
            Tho??t
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditThuoc);
