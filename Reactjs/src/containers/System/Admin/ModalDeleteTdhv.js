import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect, useStore } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../../utils/emitter";
import {
  deleteTdhvService,
  getAllTdhvService,
} from "../../../services/tdhvService";
import _ from "lodash";
import * as actions from "../../../store/actions";
import { toast } from "react-toastify";
// import "./ModaldeleteTdhv.scss";
class ModaldeleteTdhv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   tenTdhv: "",
      //   id_chuyenkhoa: "",
      //   chuyenkhoaArr: [],
      //   selectedChuyenkhoa: "",
      id: "",
      isOpenDeleteTdhv: false,
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
  //     let arrInput = ["tenTdhv", "id_chuyenkhoa"];
  //     for (let i = 0; i < arrInput.length; i++) {
  //       if (!this.state[arrInput[i]]) {
  //         isValid = false;
  //         alert("Missing parameter: " + arrInput[i]);
  //         break;
  //       }
  //     }
  //     return isValid;
  //   };

  deleteTdhv = async (id) => {
    try {
      let res = await deleteTdhvService(id);
      if (res && res.errCode === 0) {
        await this.getAllTdhvFromReact();
        // this.props.deleteTdhv(this.state);
        toast.success("Xóa Trình Độ Học Vấn thành công!");
        this.props.deleteTdhv(this.state.isOpenDeleteTdhv);
      } else {
        alert(res.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleSaveTdhv = () => {
    let isValid = this.checkValideInput();
    if (isValid === true) {
      this.props.deleteTdhv(this.state.isOpenDeleteTdhv);
      toast.success("Sửa Trình Độ Học Vấn thành công!");
    }
  };
  getAllTdhvFromReact = async () => {
    let response = await getAllTdhvService();
    if (response && response.errCode === 0) {
      this.setState({
        arrTdhv: response.data,
      });
    }
  };
  handleReset = () => {
    this.setState({
      tenTdhv: "",
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
          Xóa Trình Độ Học Vấn
        </ModalHeader>
        <ModalBody>
          <div className="modal-TdhvEdit-body">
            Bạn có muốn xóa Trình Độ Học Vấn [{id}] ra khỏi danh sách?
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="btn-save"
            color="primary"
            onClick={() => {
              this.deleteTdhv(id);
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

export default connect(mapStateToProps, mapDispatchToProps)(ModaldeleteTdhv);
