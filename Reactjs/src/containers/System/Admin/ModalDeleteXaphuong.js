import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect, useStore } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../../utils/emitter";
import {
  deleteXaphuongService,
  getAllXaphuongService,
} from "../../../services/xaphuongService";
import _ from "lodash";
import * as actions from "../../../store/actions";
import { toast } from "react-toastify";
// import "./ModaldeleteXaphuong.scss";
class ModaldeleteXaphuong extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tenXaphuong: "",
      id_chuyenkhoa: "",
      chuyenkhoaArr: [],
      selectedChuyenkhoa: "",
      id: "",
      isOpenDeleteXaphuong: false,
    };
  }

  async componentDidMount() {
    let id = this.props.idDelete.id;
    // if (id && !_.isEmpty(id)) {
    //   this.state.id = id;
    // }
    // this.props.getChuyenkhoaStart();
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

  //   checkValideInput = () => {
  //     let isValid = true;
  //     let arrInput = ["tenXaphuong", "id_chuyenkhoa"];
  //     for (let i = 0; i < arrInput.length; i++) {
  //       if (!this.state[arrInput[i]]) {
  //         isValid = false;
  //         alert("Missing parameter: " + arrInput[i]);
  //         break;
  //       }
  //     }
  //     return isValid;
  //   };

  deleteXaphuong = async (id) => {
    try {
      let res = await deleteXaphuongService(id);
      if (res && res.errCode === 0) {
        await this.getAllXaphuongFromReact();
        // this.props.deleteXaphuong(this.state);
        toast.success("Xóa Xã Phường thành công!");
        this.props.deleteXaphuong(this.state.isOpenDeleteXaphuong);
      } else {
        alert(res.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleSaveXaphuong = () => {
    let isValid = this.checkValideInput();
    if (isValid === true) {
      this.props.deleteXaphuong(this.state.isOpenDeleteXaphuong);
      toast.success("Sửa Xã Phường thành công!");
    }
  };
  getAllXaphuongFromReact = async () => {
    let response = await getAllXaphuongService();
    if (response && response.errCode === 0) {
      this.setState({
        arrXaphuong: response.data,
      });
    }
  };
  handleReset = () => {
    this.setState({
      tenXaphuong: "",
      // id_chuyenkhoa: "",
    });
  };
  render() {
    let id = this.props.idDelete.id;
    console.log();
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
          Xóa Xã Phường
        </ModalHeader>
        <ModalBody>
          <div className="modal-XaphuongEdit-body">
            Bạn có muốn xóa Xã Phường [{id}] ra khỏi danh sách?
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="btn-save"
            color="primary"
            onClick={() => {
              this.deleteXaphuong(id);
            }}
          >
            Xóa
          </Button>

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModaldeleteXaphuong);
