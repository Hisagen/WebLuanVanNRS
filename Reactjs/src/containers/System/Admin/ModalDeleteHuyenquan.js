import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect, useStore } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../../utils/emitter";
import {
  deleteHuyenquanService,
  getAllHuyenquanService,
} from "../../../services/huyenquanService";
import _ from "lodash";
import * as actions from "../../../store/actions";
import { toast } from "react-toastify";
// import "./ModaldeleteHuyenquan.scss";
class ModaldeleteHuyenquan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   tenHuyenquan: "",
      //   id_chuyenkhoa: "",
      //   chuyenkhoaArr: [],
      //   selectedChuyenkhoa: "",
      id: "",
      isOpenDeleteHuyenquan: false,
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
  //     let arrInput = ["tenHuyenquan", "id_chuyenkhoa"];
  //     for (let i = 0; i < arrInput.length; i++) {
  //       if (!this.state[arrInput[i]]) {
  //         isValid = false;
  //         alert("Missing parameter: " + arrInput[i]);
  //         break;
  //       }
  //     }
  //     return isValid;
  //   };

  deleteHuyenquan = async (id) => {
    try {
      let res = await deleteHuyenquanService(id);
      if (res && res.errCode === 0) {
        await this.getAllHuyenquanFromReact();
        // this.props.deleteHuyenquan(this.state);
        toast.success("Xóa Huyện Quậnthành công!");
        this.props.deleteHuyenquan(this.state.isOpenDeleteHuyenquan);
      } else {
        alert(res.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleSaveHuyenquan = () => {
    let isValid = this.checkValideInput();
    if (isValid === true) {
      this.props.deleteHuyenquan(this.state.isOpenDeleteHuyenquan);
      toast.success("Sửa Huyện Quận thành công!");
    }
  };
  getAllHuyenquanFromReact = async () => {
    let response = await getAllHuyenquanService();
    if (response && response.errCode === 0) {
      this.setState({
        arrHuyenquan: response.data,
      });
    }
  };
  handleReset = () => {
    this.setState({
      tenHuyenquan: "",
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
          Xóa Huyện Quận
        </ModalHeader>
        <ModalBody>
          <div className="modal-HuyenquanEdit-body">
            Bạn có muốn xóa Huyện quận [{id}] ra khỏi danh sách?
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="btn-save"
            color="primary"
            onClick={() => {
              this.deleteHuyenquan(id);
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
)(ModaldeleteHuyenquan);
