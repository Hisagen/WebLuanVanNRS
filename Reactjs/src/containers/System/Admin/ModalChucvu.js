import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../../utils/emitter";
import { toast } from "react-toastify";
class ModalChucvu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tenchucvu: "",
    };

    this.listenToEmitter();
  }

  listenToEmitter = () => {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        tenchucvu: "",
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
    let arrInput = ["tenchucvu"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleAddChucvu = () => {
    let isValid = this.checkValideInput();
    if (isValid == true) {
      this.props.createChucvu(this.state);
      toast.success("Tạo mới Chức vụ thành công!");
    }
  };
  handleReset = () => {
    this.setState({
      tenchucvu: "",
      // id_chuyenkhoa: "",
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
          Thêm Chức vụ
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label> Tên Chức vụ</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "tenchucvu");
                }}
                value={this.state.tenchucvu}
              ></input>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          {/* <Button
            className="btn-save"
            color="primary"
            onClick={() => {
              this.handleAddChucvu();
            }}
          >
            Thêm Chức vụ
          </Button>{" "}
          <Button
            className="btn-out"
            color="secondary"
            onClick={() => {
              this.toggle();
            }}
          >
            Thoát
          </Button> */}
          {this.state.tenchucvu !== "" ? (
            <Button
              className="btn-save "
              color="primary"
              onClick={() => {
                this.handleAddChucvu();
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
          {this.state.tenchucvu !== "" ? (
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalChucvu);
