import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect, useStore } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../../utils/emitter";
import _ from "lodash";
import { toast } from "react-toastify";
class ModalEditChucvu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      tenchucvu: "",
    };
  }

  componentDidMount() {
    let chucvu = this.props.currentChucvu;
    if (chucvu && !_.isEmpty(chucvu)) {
      this.setState({
        id: chucvu.id,
        tenchucvu: chucvu.tenchucvu,
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

  handleSaveChucvu = () => {
    let isValid = this.checkValideInput();
    if (isValid === true) {
      this.props.editChucvu(this.state);
      toast.success("Sửa Chức vụ thành công!");
    }
  };
  handleReset = () => {
    this.setState({
      tenchucvu: "",
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
          Sửa Chức Vụ
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label> Mã Chức vụ</label>
              <input type="text" value={this.state.id} disabled></input>
            </div>
            <div className="input-container">
              <label> tenchucvu</label>
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
                        className='px-3'
                        color="primary"
                        onClick={() => { this.handleSaveChucvu() }}
                    >
                        Sửa Chức vụ
                    </Button>
                    <Button
                        className='px-3'
                        color="secondary"
                        onClick={() => { this.toggle() }}
                    >
                        Thoát
                    </Button> */}
          {this.state.tenchucvu !== "" ? (
            <Button
              className="btn-save "
              color="primary"
              onClick={() => {
                this.handleSaveChucvu();
              }}
            >
              <i className="far fa-save"></i> &nbsp; Lưu
            </Button>
          ) : (
            <Button
              className="btn-save "
              color="primary"
              onClick={() => {
                this.handleSaveChucvu();
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditChucvu);
