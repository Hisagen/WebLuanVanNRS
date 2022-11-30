import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect, useStore } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../../utils/emitter";
import _ from "lodash";
import { toast } from "react-toastify";
class ModalEditNhasx extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      tennhasx: "",
    };
  }

  componentDidMount() {
    let nhasx = this.props.currentNhasx;
    if (nhasx && !_.isEmpty(nhasx)) {
      this.setState({
        id: nhasx.id,
        tennhasx: nhasx.tennhasx,
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
    let arrInput = ["tennhasx"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleSaveNhasx = () => {
    let isValid = this.checkValideInput();
    if (isValid === true) {
      this.props.editNhasx(this.state);
      toast.success("Sửa Nhà Sản Xuất thành công!");
    }
  };
  handleReset = () => {
    this.setState({
      tennhasx: "",
    });
  };
  render() {
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
          Sửa Nhà Sản Xuất
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label> Mã Nhà Sản Xuất</label>
              <input type="text" value={this.state.id} disabled></input>
            </div>
            <div className="input-container">
              <label> Tên nhà Sản Xuất</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "tennhasx");
                }}
                value={this.state.tennhasx}
              ></input>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          {this.state.tennhasx !== "" ? (
            <Button
              className="btn-save "
              color="primary"
              onClick={() => {
                this.handleSaveNhasx();
              }}
            >
              <i className="far fa-save"></i> &nbsp; Lưu
            </Button>
          ) : (
            <Button
              className="btn-save "
              color="primary"
              onClick={() => {
                this.handleSaveNhasx();
              }}
              disabled
            >
              <i className="far fa-save"></i> &nbsp; Lưu
            </Button>
          )}

          {this.state.tennhasx !== "" ? (
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditNhasx);
