import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./XaphuongManage.scss";
import {
  getAllXaphuongService,
  createXaphuongService,
  deleteXaphuongService,
  editXaphuongService,
} from "../../../services/xaphuongService";
import ModalXaphuong from "./ModalXaphuong";
import ModalEditXaphuong from "./ModalEditXaphuong";
import ModalDeleteXaphuong from "./ModalDeleteXaphuong";
import { emitter } from "../../../utils/emitter";
import { toast } from "react-toastify";
class XaphuongManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrXaphuong: [],
      isOpenModalXaphuong: false,
      isOpenModalEditXaphuong: false,
      isOpenModalDeleteXaphuong: false,
      xaphuongEdit: {},
      currentPage: 1,
      newsPerPage: 5,
    };
  }

  async componentDidMount() {
    await this.getAllXaphuongFromReact();
  }

  getAllXaphuongFromReact = async () => {
    let response = await getAllXaphuongService();
    if (response && response.errCode === 0) {
      this.setState({
        arrXaphuong: response.data,
      });
    }
  };

  handleAddNewXaphuong = () => {
    this.setState({
      isOpenModalXaphuong: true,
    });
  };

  handleEditXaphuong = (xaphuong) => {
    this.setState({
      isOpenModalEditXaphuong: true,
      xaphuongEdit: xaphuong,
    });
  };

  toggleXaphuongModal = () => {
    this.setState({
      isOpenModalXaphuong: !this.state.isOpenModalXaphuong,
    });
  };

  toggleXaphuongEditModal = () => {
    this.setState({
      isOpenModalEditXaphuong: !this.state.isOpenModalEditXaphuong,
    });
  };

  createXaphuong = async (data) => {
    try {
      let response = await createXaphuongService(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllXaphuongFromReact();
        this.setState({
          isOpenModalXaphuong: false,
        });

        emitter.emit("EVENT_CLEAR_MODAL_DATA", { id: "your id" });
      }
    } catch (e) {
      console.log(e);
    }
  };

  // handleDeleteXaphuong = async (xaphuong) => {
  //   try {
  //     let res = await deleteXaphuongService(xaphuong.id);
  //     if (res && res.errCode === 0) {
  //       toast.success("Xóa Xã phường thành công!");
  //       await this.getAllXaphuongFromReact();
  //     } else {
  //       alert(res.errMessage);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  doEditXaphuong = async (xaphuong) => {
    try {
      let res = await editXaphuongService(xaphuong);
      if (res && res.errCode == 0) {
        this.setState({
          isOpenModalEditXaphuong: false,
        });
        await this.getAllXaphuongFromReact();
      } else {
        alert(res.errCode);
      }
    } catch (e) {
      console.log(e);
    }
  };
  doDeleteXaphuong = async (isOpen) => {
    if (isOpen === false)
      this.setState({
        isOpenModalDeleteXaphuong: false,
      });
    await this.getAllXaphuongFromReact();
  };
  handleDeleteXaphuong = async (id) => {
    this.setState({
      isOpenModalDeleteXaphuong: true,
      idDelete: id,
    });
  };
  toggleXaphuongDeleteModal = () => {
    this.setState({
      isOpenModalDeleteXaphuong: !this.state.isOpenModalDeleteXaphuong,
    });
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
    let arrXaphuong = this.state.arrXaphuong;
    const currentPage = this.state.currentPage;
    const newsPerPage = this.state.newsPerPage;
    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentTodos = arrXaphuong.slice(indexOfFirstNews, indexOfLastNews);
    const renderTodos = currentTodos.map((item, index) => {
      return (
        <XaphuongManage
          stt={index + 1 + (currentPage - 1) * newsPerPage}
          key={index}
          data={item}
        />
      );
    });
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(arrXaphuong.length / newsPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
      <div className="users-container">
        <ModalXaphuong
          isOpen={this.state.isOpenModalXaphuong}
          toggleFromParent={this.toggleXaphuongModal}
          createXaphuong={this.createXaphuong}
        />
        {this.state.isOpenModalEditXaphuong && (
          <ModalEditXaphuong
            isOpen={this.state.isOpenModalEditXaphuong}
            toggleFromParent={this.toggleXaphuongEditModal}
            currentXaphuong={this.state.xaphuongEdit}
            editXaphuong={this.doEditXaphuong}
          />
        )}

        {this.state.isOpenModalDeleteXaphuong && (
          <ModalDeleteXaphuong
            isOpen={this.state.isOpenModalDeleteXaphuong}
            toggleFromParent={this.toggleXaphuongDeleteModal}
            idDelete={this.state.idDelete}
            deleteXaphuong={this.doDeleteXaphuong}
          />
        )}
        <div className="tilte text-center">Quản Lý Huyện Quận</div>
        {/* <div className="mx-1">
          <button
            className="btn btn-primary"
            onClick={() => this.handleAddNewXaphuong()}
          >
            <i className="fas fa-plus mx-2"></i>
            Thêm Xã phường
          </button>
        </div> */}
        <div className="khung-phong">
          <i
            className="fas fa-plus"
            onClick={() => this.handleAddNewXaphuong()}
          ></i>
          {/* <i className="fas fa-copy" onClick={() => this.handleEditHuyenquan(item)}></i> */}
          <i className="fas fa-sync-alt"></i>
        </div>
        <div className="table-phong mt-3 mx-1">
          <table id="customers-sin">
            <tbody>
              <tr>
                <th>STT</th>
                <th>Mã xã phường</th>
                <th>Tên Xã phường</th>
                <th>Tên Huyện Quận</th>
                <th>Actions</th>
              </tr>
              {renderTodos &&
                renderTodos.map((item, index) => {
                  return (
                    <tr>
                      <td>
                        <button
                          className="btn-delete"
                          onClick={() =>
                            this.handleDeleteXaphuong(item.props.data)
                          }
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </td>
                      <td>{index + 1}</td>
                      <td
                        onClick={() => this.handleEditXaphuong(item.props.data)}
                        style={{ color: "blue", cursor: "pointer" }}
                      >
                        {item.props.data.id}
                      </td>
                      <td>{item.props.data.tenxaphuong}</td>
                      <td>
                        {" "}
                        {item.props.data.xaphuonghuyenquan.tenhuyenquan} -{" "}
                        {
                          item.props.data.xaphuonghuyenquan.huyenquantinhthanh
                            .tentinhthanh
                        }{" "}
                      </td>
                      {/* <button
                        className="btn-edit"
                        onClick={() => this.handleEditXaphuong(item)}
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

export default connect(mapStateToProps, mapDispatchToProps)(XaphuongManage);
