import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect, useStore } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../../utils/emitter";
import {
  deletePhongService,
  getAllPhongService,
} from "../../../services/phongService";
import _ from "lodash";
import * as actions from "../../../store/actions";
import { toast } from "react-toastify";
import "./ModalEditPhong.scss";
class ModaleditPhong extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tenphong: "",
      id_chuyenkhoa: "",
      chuyenkhoaArr: [],
      selectedChuyenkhoa: "",
      id: "",
      isOpenDeletePhong: false,
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
  //     let arrInput = ["tenphong", "id_chuyenkhoa"];
  //     for (let i = 0; i < arrInput.length; i++) {
  //       if (!this.state[arrInput[i]]) {
  //         isValid = false;
  //         alert("Missing parameter: " + arrInput[i]);
  //         break;
  //       }
  //     }
  //     return isValid;
  //   };

  deletePhong = async (id) => {
    try {
      let res = await deletePhongService(id);
      if (res && res.errCode === 0) {
        await this.getAllPhongFromReact();
        // this.props.deletePhong(this.state);
        toast.success("X??a Ph??ng th??nh c??ng!");
        this.props.deletePhong(this.state.isOpenDeletePhong);
      } else {
        alert(res.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleSavePhong = () => {
    let isValid = this.checkValideInput();
    if (isValid === true) {
      this.props.deletePhong(this.state.isOpenDeletePhong);
      toast.success("S???a Ph??ng th??nh c??ng!");
    }
  };
  getAllPhongFromReact = async () => {
    let response = await getAllPhongService();
    if (response && response.errCode === 0) {
      this.setState({
        arrPhong: response.data,
      });
    }
  };
  handleReset = () => {
    this.setState({
      tenphong: "",
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
          Xo??a Ph??ng
        </ModalHeader>
        <ModalBody>
          <div className="modal-phongEdit-body">
            Ba??n co?? mu????n xo??a pho??ng [{id}] ra kho??i danh sa??ch?
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="btn-save"
            color="primary"
            onClick={() => {
              this.deletePhong(id);
            }}
          >
            Xo??a
          </Button>

          <Button
            className="btn-out"
            color="secondary"
            onClick={() => {
              this.toggle();
            }}
          >
            Tho??t
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

export default connect(mapStateToProps, mapDispatchToProps)(ModaleditPhong);
