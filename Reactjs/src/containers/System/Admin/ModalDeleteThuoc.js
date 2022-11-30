import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect, useStore } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../../utils/emitter";
import {
  deleteThuocService,
  getAllThuocService,
} from "../../../services/thuocService";
import _ from "lodash";
import * as actions from "../../../store/actions";
import { toast } from "react-toastify";
// import "./ModalEditThuoc.scss";
class ModaleditThuoc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tenthuoc: "",

      id: "",
      isOpenDeleteThuoc: false,
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
  //     let arrInput = ["tenthuoc", "id_chuyenkhoa"];
  //     for (let i = 0; i < arrInput.length; i++) {
  //       if (!this.state[arrInput[i]]) {
  //         isValid = false;
  //         alert("Missing parameter: " + arrInput[i]);
  //         break;
  //       }
  //     }
  //     return isValid;
  //   };

  deleteThuoc = async (id) => {
    try {
      let res = await deleteThuocService(id);
      if (res && res.errCode === 0) {
        await this.getAllThuocFromReact();
        // this.props.deleteThuoc(this.state);
        toast.success("Xóa Thuốc thành công!");
        this.props.deleteThuoc(this.state.isOpenDeleteThuoc);
      } else {
        alert(res.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleSaveThuoc = () => {
    let isValid = this.checkValideInput();
    if (isValid === true) {
      this.props.deleteThuoc(this.state.isOpenDeleteThuoc);
      toast.success("Sửa thuốc thành công!");
    }
  };
  getAllThuocFromReact = async () => {
    let response = await getAllThuocService();
    if (response && response.errCode === 0) {
      this.setState({
        arrThuoc: response.data,
      });
    }
  };
  handleReset = () => {
    this.setState({
      tenthuoc: "",
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
          Xóa Thuốc
        </ModalHeader>
        <ModalBody>
          <div className="modal-PhongEdit-body">
            Bạn có muốn xóa thuốc [{id}] ra khỏi danh sách?
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="btn-save"
            color="primary"
            onClick={() => {
              this.deleteThuoc(id);
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

export default connect(mapStateToProps, mapDispatchToProps)(ModaleditThuoc);
