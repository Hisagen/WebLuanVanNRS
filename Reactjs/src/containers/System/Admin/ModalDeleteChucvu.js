import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect, useStore } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../../utils/emitter";
import {
  deleteChucvuService,
  getAllChucvuService,
} from "../../../services/chucvuService";
import _ from "lodash";
import * as actions from "../../../store/actions";
import { toast } from "react-toastify";
// import "./ModaldeleteChucvu.scss";
class ModaldeleteChucvu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   tenChucvu: "",
      //   id_chuyenkhoa: "",
      //   chuyenkhoaArr: [],
      //   selectedChuyenkhoa: "",
      id: "",
      isOpenDeleteChucvu: false,
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
  //     let arrInput = ["tenChucvu", "id_chuyenkhoa"];
  //     for (let i = 0; i < arrInput.length; i++) {
  //       if (!this.state[arrInput[i]]) {
  //         isValid = false;
  //         alert("Missing parameter: " + arrInput[i]);
  //         break;
  //       }
  //     }
  //     return isValid;
  //   };

  deleteChucvu = async (id) => {
    try {
      let res = await deleteChucvuService(id);
      if (res && res.errCode === 0) {
        await this.getAllChucvuFromReact();
        // this.props.deleteChucvu(this.state);
        toast.success("Xóa Chức Vụ thành công!");
        this.props.deleteChucvu(this.state.isOpenDeleteChucvu);
      } else {
        alert(res.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleSaveChucvu = () => {
    let isValid = this.checkValideInput();
    if (isValid === true) {
      this.props.deleteChucvu(this.state.isOpenDeleteChucvu);
      toast.success("Sửa Chức Vụ thành công!");
    }
  };
  getAllChucvuFromReact = async () => {
    let response = await getAllChucvuService();
    if (response && response.errCode === 0) {
      this.setState({
        arrChucvu: response.data,
      });
    }
  };
  handleReset = () => {
    this.setState({
      tenChucvu: "",
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
          Xóa Chức Vụ
        </ModalHeader>
        <ModalBody>
          <div className="modal-ChucvuEdit-body">
            Bạn có muốn xóa Chức Vụ [{id}] ra khỏi danh sách?
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="btn-save"
            color="primary"
            onClick={() => {
              this.deleteChucvu(id);
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

export default connect(mapStateToProps, mapDispatchToProps)(ModaldeleteChucvu);
