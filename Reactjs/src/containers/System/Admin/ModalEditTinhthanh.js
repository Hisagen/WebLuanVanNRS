import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect, useStore } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../../utils/emitter";
import _ from "lodash";
import { toast } from "react-toastify";
class ModalEditTinhthanh extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      tentinhthanh: "",
    };
  }

  componentDidMount() {
    let tinhthanh = this.props.currentTinhthanh;
    if (tinhthanh && !_.isEmpty(tinhthanh)) {
      this.setState({
        id: tinhthanh.id,
        tentinhthanh: tinhthanh.tentinhthanh,
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
    let arrInput = ["tentinhthanh"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleSaveTinhthanh = () => {
    let isValid = this.checkValideInput();
    if (isValid === true) {
      this.props.editTinhthanh(this.state);
      toast.success("Sửa Tỉnh Thành thành công!");
    }
  };
  handleReset = () => {
    this.setState({
      tentinhthanh: "",
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
          Sửa tình thành
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label> Mã tỉnh thành</label>
              <input type="text" value={this.state.id} disabled></input>
            </div>
            <div className="input-container">
              <label> tentinhthanh</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "tentinhthanh");
                }}
                value={this.state.tentinhthanh}
              ></input>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          {this.state.tentinhthanh !== "" ? (
            <Button
              className="btn-save "
              color="primary"
              onClick={() => {
                this.handleSaveTinhthanh();
              }}
            >
              <i className="far fa-save"></i> &nbsp; Lưu
            </Button>
          ) : (
            <Button
              className="btn-save "
              color="primary"
              onClick={() => {
                this.handleSaveTinhthanh();
              }}
              disabled
            >
              <i className="far fa-save"></i> &nbsp; Lưu
            </Button>
          )}
          {this.state.tentinhthanh !== "" ? (
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditTinhthanh);
