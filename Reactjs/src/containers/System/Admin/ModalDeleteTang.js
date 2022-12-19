import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect, useStore } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../../utils/emitter";
import {
  deleteTangService,
  getAllTangService,
} from "../../../services/tangService";
import _ from "lodash";
import * as actions from "../../../store/actions";
import { toast } from "react-toastify";
import "./ModalEditTang.scss";
class ModaleditTang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tentang: "",
      id_chuyenkhoa: "",
      chuyenkhoaArr: [],
      selectedChuyenkhoa: "",
      id: "",
      isOpenDeleteTang: false,
    };
  }

  async componentDidMount() {
    let id = this.props.idDelete.id;
    // if (id && !_.isEmpty(id)) {
    //   this.state.id = id;
    // }
    this.props.getChuyenkhoaStart();
  }

  //   componentDidUpdate(prevProps, prevState, snapshot) {
  //     if (prevProps.chuyenkhoaRedux !== this.props.chuyenkhoaRedux) {
  //       let arrChuyenkhoa = this.props.chuyenkhoaRedux;
  //       this.setState({
  //         chuyenkhoaArr: arrChuyenkhoa,
  //         id_chuyenkhoa:
  //           arrChuyenkhoa && arrChuyenkhoa.length > 0 ? arrChuyenkhoa[0].id : "",
  //         // tenchuyenkhoa: arrChuyenkhoas && arrChuyenkhoas.length > 0 ? arrChuyenkhoas[0].tenchuyenkhoa : ''
  //       });
  //       let selectedChuyenkhoa = arrChuyenkhoa.find((arrChuyenkhoa) => {
  //         return (
  //           arrChuyenkhoa.tenchuyenkhoa &&
  //           arrChuyenkhoa.id === this.state.id_chuyenkhoa
  //         );
  //       });
  //       this.setState({
  //         selectedChuyenkhoa: selectedChuyenkhoa,
  //       });
  //     }
  //   }

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
  //     let arrInput = ["tentang", "id_chuyenkhoa"];
  //     for (let i = 0; i < arrInput.length; i++) {
  //       if (!this.state[arrInput[i]]) {
  //         isValid = false;
  //         alert("Missing parameter: " + arrInput[i]);
  //         break;
  //       }
  //     }
  //     return isValid;
  //   };

  deleteTang = async (id) => {
    try {
      let res = await deleteTangService(id);
      if (res && res.errCode === 0) {
        await this.getAllTangFromReact();
        // this.props.deleteTang(this.state);
        toast.success("Xóa Tầng thành công!");
        this.props.deleteTang(this.state.isOpenDeleteTang);
      } else {
        alert(res.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleSaveTang = () => {
    let isValid = this.checkValideInput();
    if (isValid === true) {
      this.props.deleteTang(this.state.isOpenDeleteTang);
      toast.success("Sửa Tầng thành công!");
    }
  };
  getAllTangFromReact = async () => {
    let response = await getAllTangService();
    if (response && response.errCode === 0) {
      this.setState({
        arrTang: response.data,
      });
    }
  };
  handleReset = () => {
    this.setState({
      tentang: "",
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
          Xóa Tầng
        </ModalHeader>
        <ModalBody>
          <div className="modal-tangEdit-body">
            Bạn có muốn xóa tầng [{id}] ra khỏi danh sách?
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="btn-save"
            color="primary"
            onClick={() => {
              this.deleteTang(id);
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

export default connect(mapStateToProps, mapDispatchToProps)(ModaleditTang);
