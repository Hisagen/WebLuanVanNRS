import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect, useStore } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../../utils/emitter";
import {
  deleteBuoiService,
  getAllBuoiService,
} from "../../../services/buoiService";
import _ from "lodash";
import * as actions from "../../../store/actions";
import { toast } from "react-toastify";
// import "./ModaldeleteBuoi.scss";
class ModaldeleteBuoi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tenBuoi: "",
      id_chuyenkhoa: "",
      chuyenkhoaArr: [],
      selectedChuyenkhoa: "",
      id: "",
      isOpenDeleteBuoi: false,
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
  //     let arrInput = ["tenBuoi", "id_chuyenkhoa"];
  //     for (let i = 0; i < arrInput.length; i++) {
  //       if (!this.state[arrInput[i]]) {
  //         isValid = false;
  //         alert("Missing parameter: " + arrInput[i]);
  //         break;
  //       }
  //     }
  //     return isValid;
  //   };

  deleteBuoi = async (id) => {
    try {
      let res = await deleteBuoiService(id);
      if (res && res.errCode === 0) {
        await this.getAllBuoiFromReact();
        // this.props.deleteBuoi(this.state);
        toast.success("Xóa Buổi thành công!");
        this.props.deleteBuoi(this.state.isOpenDeleteBuoi);
      } else {
        alert(res.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleSaveBuoi = () => {
    let isValid = this.checkValideInput();
    if (isValid === true) {
      this.props.deleteBuoi(this.state.isOpenDeleteBuoi);
      toast.success("Sửa Buổi thành công!");
    }
  };
  getAllBuoiFromReact = async () => {
    let response = await getAllBuoiService();
    if (response && response.errCode === 0) {
      this.setState({
        arrBuoi: response.data,
      });
    }
  };
  handleReset = () => {
    this.setState({
      tenBuoi: "",
      // id_chuyenkhoa: "",
    });
  };
  render() {
    let id = this.props.idDelete.id;
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
          Xóa Buổi
        </ModalHeader>
        <ModalBody>
          <div className="modal-BuoiEdit-body">
            Bạn có muốn xóa buổi [{id}] ra khỏi danh sách?
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="btn-save"
            color="primary"
            onClick={() => {
              this.deleteBuoi(id);
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

export default connect(mapStateToProps, mapDispatchToProps)(ModaldeleteBuoi);
