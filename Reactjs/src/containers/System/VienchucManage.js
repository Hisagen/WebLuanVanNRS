import React, { Component } from "react";
// import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import "./VienchucManage.scss";
import {
  getAllVienchucService,
  createVienchucService,
  deleteVienchucService,
  editVienchucService,
} from "../../services/vienchucService";
import ModalVienchuc from "./ModalVienchuc";
import ModalEditVienchuc from "./ModalEditVienchuc";
import { emitter } from "../../utils/emitter";
import * as actions from "../../store/actions";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrVienchucs: [],
      isOpenModalVienchuc: false,
      isOpenModalEditVienchuc: false,
      vienchucEdit: {},
    };
  }

  async componentDidMount() {
    let a = await this.getAllVienchucsFromReact();
  }

  getAllVienchucsFromReact = async () => {
    let response = await getAllVienchucService();
    if (response && response.errCode === 0) {
      this.setState({
        arrVienchucs: response.data,
      });
    }
  };

  handleAddNewVienchuc = () => {
    this.setState({
      isOpenModalVienchuc: true,
    });
  };

  handleEditVienchuc = (vienchuc) => {
    this.setState({
      isOpenModalEditVienchuc: true,
      vienchucEdit: vienchuc,
    });
  };

  toggleVienchucModal = () => {
    this.setState({
      isOpenModalVienchuc: !this.state.isOpenModalVienchuc,
    });
  };

  togglevienchucEditModal = () => {
    this.setState({
      isOpenModalEditVienchuc: !this.state.isOpenModalEditVienchuc,
    });
  };

  createNewVienchuc = async (data) => {
    try {
      let response = await createVienchucService(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllVienchucsFromReact();
        this.setState({
          isOpenModalVienchuc: false,
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA", { id: "your id" });
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleDeleteVienchuc = async (vienchuc) => {
    try {
      let res = await deleteVienchucService(vienchuc.id);
      if (res && res.errCode === 0) {
        await this.getAllVienchucsFromReact();
      } else {
        alert(res.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };

  doEditVienchuc = async (user) => {
    try {
      let res = await editVienchucService(user);
      if (res && res.errCode == 0) {
        this.setState({
          isOpenModalEditVienchuc: false,
        });
        await this.getAllVienchucsFromReact();
      } else {
        alert(res.errCode);
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    let arrVienchucs = this.state.arrVienchucs;
    return (
      <div className="users-container">
        <ModalVienchuc
          isOpen={this.state.isOpenModalVienchuc}
          toggleFromParent={this.toggleUserModal}
          createNewVienchuc={this.createNewVienchuc}
        />
        {this.state.isOpenModalEditVienchuc && (
          <ModalEditVienchuc
            isOpen={this.state.isOpenModalEditVienchuc}
            toggleFromParent={this.togglevienchucEditModal}
            currentVienchuc={this.state.vienchucEdit}
            editVienchuc={this.doEditVienchuc}
          />
        )}
        <div className="tilte text-center">Quản lý viên chức</div>
        <div className="mx-1">
          <button
            className="btn btn-primary"
            onClick={() => this.handleAddNewVienchuc()}
          >
            <i className="fas fa-plus mx-2"></i>
            Thêm viên chức
          </button>
        </div>
        <div className="users-tabe mt-3 mx-1">
          <table id="customers">
            <tbody>
              <tr>
                <th>Số thứ tự</th>
                <th>Email</th>
                <th>ảnh</th>
                <th>Họ tên</th>
                <th>Chức vụ</th>
                <th>Actions</th>
              </tr>
              {arrVienchucs &&
                arrVienchucs.map((item, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.email}</td>
                      <td>
                        {item.image === "" ? "" : <img src={item.image} />}
                      </td>
                      <td>{item.hoten}</td>
                      <td>{item.vienchucchucvu.tenchucvu}</td>
                      <button
                        className="btn-edit"
                        onClick={() => this.handleEditVienchuc(item)}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => this.handleDeleteVienchuc(item)}
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
