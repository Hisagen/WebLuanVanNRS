import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect, useStore } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../../utils/emitter";
import {
  deleteHoatchatService,
  getAllHoatchatService,
} from "../../../services/hoatchatService";
import _ from "lodash";
import * as actions from "../../../store/actions";
import { toast } from "react-toastify";
// import "./ModaldeleteHoatchat.scss";
class ModaldeleteHoatchat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   tenHoatchat: "",
      //   id_chuyenkhoa: "",
      //   chuyenkhoaArr: [],
      //   selectedChuyenkhoa: "",
      id: "",
      isOpenDeleteHoatchat: false,
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
  //     let arrInput = ["tenHoatchat", "id_chuyenkhoa"];
  //     for (let i = 0; i < arrInput.length; i++) {
  //       if (!this.state[arrInput[i]]) {
  //         isValid = false;
  //         alert("Missing parameter: " + arrInput[i]);
  //         break;
  //       }
  //     }
  //     return isValid;
  //   };

  deleteHoatchat = async (id) => {
    try {
      let res = await deleteHoatchatService(id);
      if (res && res.errCode === 0) {
        await this.getAllHoatchatFromReact();
        // this.props.deleteHoatchat(this.state);
        toast.success("Xóa Hoạt Chất thành công!");
        this.props.deleteHoatchat(this.state.isOpenDeleteHoatchat);
      } else {
        alert(res.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleSaveHoatchat = () => {
    let isValid = this.checkValideInput();
    if (isValid === true) {
      this.props.deleteHoatchat(this.state.isOpenDeleteHoatchat);
      toast.success("Sửa Hoạt Chất thành công!");
    }
  };
  getAllHoatchatFromReact = async () => {
    let response = await getAllHoatchatService();
    if (response && response.errCode === 0) {
      this.setState({
        arrHoatchat: response.data,
      });
    }
  };
  handleReset = () => {
    this.setState({
      tenHoatchat: "",
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
          Xóa Hoạt Chất
        </ModalHeader>
        <ModalBody>
          <div className="modal-HoatchatEdit-body">
            Bạn có muốn xóa Hoạt Chất [{id}] ra khỏi danh sách?
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="btn-save"
            color="primary"
            onClick={() => {
              this.deleteHoatchat(id);
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
)(ModaldeleteHoatchat);
