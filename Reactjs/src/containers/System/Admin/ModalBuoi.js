import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../../utils/emitter";
import { toast } from "react-toastify";
import "./ModalBuoi.scss";
class ModalBuoi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tenkhungio: "",
    };

    this.listenToEmitter();
  }

  listenToEmitter = () => {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        tenkhungio: "",
      });
    });
  };

  componentDidMount() {}

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

  handleAddBuoi = () => {
    let isValid = this.checkValideInput();
    if (isValid == true) {
      this.props.createBuoi(this.state);
      toast.success("Tạo mới Buổi thành công!");
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
          Thêm Buổi
        </ModalHeader>
        <ModalBody>
          <div className="modal-buoiCreate-body">
            <div className="input-container">
              <label>
                <span className="sao">*</span> Tên Buổi &nbsp;
              </label>
              <br />
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "tenkhungio");
                }}
                value={this.state.tenkhungio}
                placeholder="Tên Buổi..."
                className="form-control"
              ></input>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          {}
          {tenkhungio !== "" ? (
            <Button
              className="btn-save"
              color="primary"
              onClick={() => {
                this.handleAddBuoi();
              }}
            >
              <i className="far fa-save"></i> &nbsp; Lưu
            </Button>
          ) : (
            <Button
              className="btn-save"
              color="primary"
              onClick={() => {
                this.handleAddBuoi();
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
              <i className="fas fa-sync-alt"></i>
              &nbsp; Reset
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
              <i className="fas fa-sync-alt"></i>
              &nbsp; Reset
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalBuoi);
