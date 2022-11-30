import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./HoatchatManage.scss";
import {
  getAllHoatchatService,
  createHoatchatService,
  deleteHoatchatService,
  editHoatchatService,
} from "../../../services/hoatchatService";
import ModalHoatchat from "./ModalHoatchat";
import ModalEditHoatchat from "./ModalEditHoatchat";
import { emitter } from "../../../utils/emitter";
import { toast } from "react-toastify";
class HoatchatManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrHoatchat: [],
      isOpenModalHoatchat: false,
      isOpenModalEditHoatchat: false,
      hoatchatEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllHoatchatFromReact();
  }

  getAllHoatchatFromReact = async () => {
    let response = await getAllHoatchatService();
    if (response && response.errCode === 0) {
      this.setState({
        arrHoatchat: response.data,
      });
    }
  };

  handleAddNewNhasx = () => {
    this.setState({
      isOpenModalHoatchat: true,
    });
  };

  handleEditHoatchat = (nhasx) => {
    this.setState({
      isOpenModalEditHoatchat: true,
      hoatchatEdit: nhasx,
    });
  };

  toggleHoatchatModal = () => {
    this.setState({
      isOpenModalHoatchat: !this.state.isOpenModalHoatchat,
    });
  };

  toggleHoatchatEditModal = () => {
    this.setState({
      isOpenModalEditHoatchat: !this.state.isOpenModalEditHoatchat,
    });
  };

  createHoatchat = async (data) => {
    try {
      let response = await createHoatchatService(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllHoatchatFromReact();
        this.setState({
          isOpenModalHoatchat: false,
        });

        emitter.emit("EVENT_CLEAR_MODAL_DATA", { id: "your id" });
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleDeleteHoatchat = async (hoatchat) => {
    try {
      let res = await deleteHoatchatService(hoatchat.id);
      if (res && res.errCode === 0) {
        await this.getAllHoatchatFromReact();
        toast.success("Xóa Hoạt Chất thành công!");
      } else {
        alert(res.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };

  doEditHoatchat = async (hoatchat) => {
    try {
      let res = await editHoatchatService(hoatchat);
      if (res && res.errCode == 0) {
        this.setState({
          isOpenModalEditHoatchat: false,
        });
        await this.getAllHoatchatFromReact();
      } else {
        alert(res.errCode);
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    let arrHoatchat = this.state.arrHoatchat;
    console.log("isOpenModalEditHoatchat", this.state.isOpenModalEditHoatchat);
    return (
      <div className="users-container">
        <ModalHoatchat
          isOpen={this.state.isOpenModalHoatchat}
          toggleFromParent={this.toggleHoatchatModal}
          createHoatchat={this.createHoatchat}
        />
        {this.state.isOpenModalEditHoatchat && (
          <ModalEditHoatchat
            isOpen={this.state.isOpenModalEditHoatchat}
            toggleFromParent={this.toggleHoatchatEditModal}
            currentHoatchat={this.state.hoatchatEdit}
            editHoatchat={this.doEditHoatchat}
          />
        )}
        <div className="tilte text-center">Quản lý Hoạt Chất</div>
        {/* <div className='mx-1'>
                    <button className='btn btn-primary'
                        onClick={() => this.handleAddNewNhasx()}
                    >
                        <i className='fas fa-plus mx-2'></i>
                        Thêm Hoạt Chất
                    </button>
                </div> */}
        <div className="khung-phong">
          <i
            className="fas fa-plus"
            onClick={() => this.handleAddNewNhasx()}
          ></i>
          {/* <i className="fas fa-copy" onClick={() => this.handleEditPhong(item)}></i> */}
          <i className="fas fa-sync-alt"></i>
        </div>
        <div className="users-tabe mt-3 mx-1">
          <table id="customers">
            <tbody>
              <tr>
                <th>Stt</th>
                <th>Mã Hoạt Chất</th>
                <th>Tên Hoạt Chất</th>
                <th>Actions</th>
              </tr>
              {arrHoatchat &&
                arrHoatchat.map((item, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.id}</td>
                      <td>{item.tenhoatchat}</td>
                      <button
                        className="btn-edit"
                        onClick={() => this.handleEditHoatchat(item)}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => this.handleDeleteHoatchat(item)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HoatchatManage);
