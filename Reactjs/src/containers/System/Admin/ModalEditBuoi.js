import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect, useStore } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../../utils/emitter";
import _ from "lodash";
import { toast } from "react-toastify";
class ModalEditBuoi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      tenkhungio: "",
    };
  }

  componentDidMount() {
    let buoi = this.props.currentBuoi;
    if (buoi && !_.isEmpty(buoi)) {
      this.setState({
        id: buoi.id,
        tenkhungio: buoi.tenkhungio,
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
    let arrInput = ["tenkhungio"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleSaveBuoi = () => {
    let isValid = this.checkValideInput();
    if (isValid === true) {
      this.props.editBuoi(this.state);
      toast.success("Sửa Buổi thành công!");
    }
  };
  handleReset = () => {
    this.setState({
      tenkhungio: "",
    });
  };
  render() {
    let { tenkhungio } = this.state;
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
          Sửa Buổi
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label> Mã Buổi</label>
              <input type="text" value={this.state.id} disabled></input>
            </div>
            <div className="input-container">
              <label>Tên Khung Giờ</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "tenkhungio");
                }}
                value={this.state.tenkhungio}
              ></input>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          {tenkhungio !== "" ? (
            <Button
              className="btn-save"
              color="primary"
              onClick={() => {
                this.handleSaveBuoi();
              }}
            >
              <i className="far fa-save"></i> &nbsp; Lưu
            </Button>
          ) : (
            <Button
              className="btn-save"
              color="primary"
              onClick={() => {
                this.handleSaveBuoi();
              }}
              disabled
            >
              <i className="far fa-save"></i> &nbsp; Lưu
            </Button>
          )}

          {tenkhungio !== "" ? (
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditBuoi);
