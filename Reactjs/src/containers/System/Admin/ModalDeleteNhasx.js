import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect, useStore } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../../utils/emitter";
import {
  deleteNhasxService,
  getAllNhasxService,
} from "../../../services/nhasxService";
import _ from "lodash";
import * as actions from "../../../store/actions";
import { toast } from "react-toastify";
// import "./ModaldeleteNhasx.scss";
class ModaldeleteNhasx extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   tenNhasx: "",
      //   id_chuyenkhoa: "",
      //   chuyenkhoaArr: [],
      //   selectedChuyenkhoa: "",
      id: "",
      isOpenDeleteNhasx: false,
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
  //     let arrInput = ["tenNhasx", "id_chuyenkhoa"];
  //     for (let i = 0; i < arrInput.length; i++) {
  //       if (!this.state[arrInput[i]]) {
  //         isValid = false;
  //         alert("Missing parameter: " + arrInput[i]);
  //         break;
  //       }
  //     }
  //     return isValid;
  //   };

  deleteNhasx = async (id) => {
    try {
      let res = await deleteNhasxService(id);
      if (res && res.errCode === 0) {
        await this.getAllNhasxFromReact();
        // this.props.deleteNhasx(this.state);
        toast.success("Xóa Nhà Sản Xuất thành công!");
        this.props.deleteNhasx(this.state.isOpenDeleteNhasx);
      } else {
        alert(res.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleSaveNhasx = () => {
    let isValid = this.checkValideInput();
    if (isValid === true) {
      this.props.deleteNhasx(this.state.isOpenDeleteNhasx);
      toast.success("Sửa Nhà Sản Xuất thành công!");
    }
  };
  getAllNhasxFromReact = async () => {
    let response = await getAllNhasxService();
    if (response && response.errCode === 0) {
      this.setState({
        arrNhasx: response.data,
      });
    }
  };
  handleReset = () => {
    this.setState({
      tenNhasx: "",
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
          Xóa Nhà Sản Xuất
        </ModalHeader>
        <ModalBody>
          <div className="modal-NhasxEdit-body">
            Bạn có muốn xóa Nhà Sản Xuất [{id}] ra khỏi danh sách?
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="btn-save"
            color="primary"
            onClick={() => {
              this.deleteNhasx(id);
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

export default connect(mapStateToProps, mapDispatchToProps)(ModaldeleteNhasx);
