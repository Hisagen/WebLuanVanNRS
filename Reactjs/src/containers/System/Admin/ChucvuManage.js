import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ChucvuManage.scss";
import {
  getAllChucvuService,
  createChucvuService,
  deleteChucvuService,
  editChucvuService,
} from "../../../services/chucvuService";
import ModalChucvu from "./ModalChucvu";
import ModalEditChucvu from "./ModalEditChucvu";
import ModaldeleteChucvu from "./ModalDeleteChucvu";

import { emitter } from "../../../utils/emitter";
import { toast } from "react-toastify";
class ChucvuManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrChucvu: [],
      isOpenModalChucvu: false,
      isOpenModalEditChucvu: false,
      isOpenModalDeleteChucvu: false,
      chucvuEdit: {},
      currentPage: 1,
      newsPerPage: 5,
    };
  }

  async componentDidMount() {
    await this.getAllChucvuFromReact();
  }

  getAllChucvuFromReact = async () => {
    let response = await getAllChucvuService();
    if (response && response.errCode === 0) {
      this.setState({
        arrChucvu: response.data,
      });
    }
  };

  handleAddNewChucvu = () => {
    this.setState({
      isOpenModalChucvu: true,
    });
  };

  handleEditChucvu = (chucvu) => {
    this.setState({
      isOpenModalEditChucvu: true,
      chucvuEdit: chucvu,
    });
  };

  handleDeleteChucvu = async (id) => {
    this.setState({
      isOpenModalDeleteChucvu: true,
      idDelete: id,
    });
  };
  toggleChucvuModal = () => {
    this.setState({
      isOpenModalChucvu: !this.state.isOpenModalChucvu,
    });
  };

  toggleChucvuEditModal = () => {
    this.setState({
      isOpenModalEditChucvu: !this.state.isOpenModalEditChucvu,
    });
  };

  createChucvu = async (data) => {
    try {
      let response = await createChucvuService(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllChucvuFromReact();
        this.setState({
          isOpenModalChucvu: false,
        });

        emitter.emit("EVENT_CLEAR_MODAL_DATA", { id: "your id" });
      }
    } catch (e) {
      console.log(e);
    }
  };

  //   handleDeleteChucvu = async (tinhthanh) => {
  //     try {
  //       let res = await deleteChucvuService(tinhthanh.id);
  //       if (res && res.errCode === 0) {
  //         await this.getAllChucvuFromReact();
  //         toast.success("Xóa Chức vụ thành công!");
  //       } else {
  //         alert(res.errMessage);
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  doEditChucvu = async (tinhthanh) => {
    try {
      let res = await editChucvuService(tinhthanh);
      if (res && res.errCode == 0) {
        this.setState({
          isOpenModalEditChucvu: false,
        });
        await this.getAllChucvuFromReact();
      } else {
        alert(res.errCode);
      }
    } catch (e) {
      console.log(e);
    }
  };

  doDeleteChucvu = async (isOpen) => {
    if (isOpen === false)
      this.setState({
        isOpenModalDeleteChucvu: false,
      });
    await this.getAllChucvuFromReact();
  };

  chosePage = (event) => {
    this.setState({
      currentPage: Number(event.target.id),
    });
  };

  select = (event) => {
    this.setState({
      newsPerPage: event.target.value,
    });
  };
  render() {
    let arrChucvu = this.state.arrChucvu;
    const currentPage = this.state.currentPage;
    const newsPerPage = this.state.newsPerPage;
    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentTodos = arrChucvu.slice(indexOfFirstNews, indexOfLastNews);
    // console.log("currentTodos", currentTodos);
    const renderTodos = currentTodos.map((item, index) => {
      return (
        <ChucvuManage
          stt={index + 1 + (currentPage - 1) * newsPerPage}
          key={index}
          data={item}
        />
      );
    });
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(arrChucvu.length / newsPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
      <div className="users-container">
        <ModalChucvu
          isOpen={this.state.isOpenModalChucvu}
          toggleFromParent={this.toggleChucvuModal}
          createChucvu={this.createChucvu}
        />
        {this.state.isOpenModalEditChucvu && (
          <ModalEditChucvu
            isOpen={this.state.isOpenModalEditChucvu}
            toggleFromParent={this.toggleChucvuEditModal}
            currentChucvu={this.state.chucvuEdit}
            editChucvu={this.doEditChucvu}
          />
        )}

        {this.state.isOpenModalDeleteChucvu && (
          <ModaldeleteChucvu
            isOpen={this.state.isOpenModalDeleteChucvu}
            toggleFromParent={this.toggleChucvuDeleteModal}
            idDelete={this.state.idDelete}
            deleteChucvu={this.doDeleteChucvu}
          />
        )}
        <div className="title text-center">Quản lý Chức vụ</div>
        {/* <div className="mx-1">
          <button
            className="btn btn-primary"
            onClick={() => this.handleAddNewChucvu()}
          >
            <i className="fas fa-plus mx-2"></i>
            Thêm Chức vụ
          </button>
        </div> */}
        <div className="khung-phong">
          <i
            className="fas fa-plus"
            onClick={() => this.handleAddNewChucvu()}
          ></i>
          {/* <i className="fas fa-copy" onClick={() => this.handleEditChucvu(item)}></i> */}
          <i className="fas fa-sync-alt"></i>
        </div>
        <div className="table-phong mt-3 mx-1">
          <table id="customers-sin">
            <tbody>
              <tr>
                <th></th>
                <th>Stt</th>
                <th>Mã Chức vụ</th>
                <th>Tên Chức vụ</th>
              </tr>
              {renderTodos &&
                renderTodos.map((item, index) => {
                  return (
                    <tr>
                      <td>
                        <button
                          className="btn-delete"
                          onClick={() =>
                            this.handleDeleteChucvu(item.props.data)
                          }
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </td>
                      <td>{index + 1}</td>
                      <td
                        onClick={() => this.handleEditChucvu(item.props.data)}
                        style={{ color: "blue", cursor: "pointer" }}
                      >
                        {item.props.data.id}
                      </td>
                      <td>{item.props.data.tenchucvu}</td>
                      {/* <button
                        className="btn-edit"
                        onClick={() => this.handleEditChucvu(item.props.data)}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button> */}
                    </tr>
                  );
                })}
            </tbody>
          </table>

          <div className="khung-page">
            <div className="pagination-custom">
              {pageNumbers.map((number) => {
                if (this.state.currentPage === number) {
                  return (
                    <table>
                      <tbody>
                        <tr>
                          <th
                            key={number}
                            id={number}
                            className="phantrang active"
                          >
                            {number}
                          </th>
                        </tr>
                      </tbody>
                    </table>
                  );
                } else {
                  return (
                    <table>
                      <tbody>
                        <tr>
                          <th
                            key={number}
                            id={number}
                            onClick={this.chosePage}
                            className="phantrang"
                          >
                            {number}
                          </th>
                        </tr>
                      </tbody>
                    </table>
                  );
                }
              })}
            </div>
            <div className="news-per-page">
              <span>Page size: </span>
              <select
                defaultValue="0"
                onChange={this.select}
                style={{
                  width: "70px",
                  height: "27px",
                  textAlign: "center",
                  background: "rgb(247, 245, 245)",
                }}
              >
                {/* <option value="0" disabled></option> */}
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChucvuManage);
