import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect, useStore } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../../utils/emitter";
import _ from "lodash";
import { toast } from "react-toastify";
class ModalEditTdhv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      tentdhv: "",
    };
  }

  componentDidMount() {
    let tdhv = this.props.currentTdhv;
    if (tdhv && !_.isEmpty(tdhv)) {
      this.setState({
        id: tdhv.id,
        tentdhv: tdhv.tentdhv,
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
    let arrInput = ["tentdhv"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleSaveTdhv = () => {
    let isValid = this.checkValideInput();
    if (isValid === true) {
      this.props.editTdhv(this.state);
      toast.success("Sửa Trình Độ Học Vấn thành công!");
    }
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
          Sửa Trình Độ Học Vấn
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label> Mã Trình Độ Học Vấn</label>
              <input type="text" value={this.state.id} disabled></input>
            </div>
            <div className="input-container">
              <label> Tên Trình Độ Học Vấn</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "tentdhv");
                }}
                value={this.state.tentdhv}
              ></input>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="px-3"
            color="primary"
            onClick={() => {
              this.handleSaveTdhv();
            }}
          >
            Sửa Trình Độ Học Vấn
          </Button>
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditTdhv);
