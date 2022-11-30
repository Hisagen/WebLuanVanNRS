import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./BuoiManage.scss";
import {
  getAllBuoiService,
  createBuoiService,
  deleteBuoiService,
  editBuoiService,
} from "../../../services/buoiService";
import ModalBuoi from "./ModalBuoi";
import ModalEditBuoi from "./ModalEditBuoi";
import ModalDeleteBuoi from "./ModalDeleteBuoi";
import { emitter } from "../../../utils/emitter";
import { toast } from "react-toastify";
class BuoiManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrBuoi: [],
      isOpenModalBuoi: false,
      isOpenModalEditBuoi: false,
      buoiEdit: {},
      isOpenModalDeleteBuoi: false,
      sodong: "",
      currentPage: 1,
      newsPerPage: 5,
    };
  }

  async componentDidMount() {
    await this.getAllBuoiFromReact();
  }

  getAllBuoiFromReact = async () => {
    let response = await getAllBuoiService();
    if (response && response.errCode === 0) {
      this.setState({
        arrBuoi: response.data,
      });
    }
  };

  handleAddNewBuoi = () => {
    this.setState({
      isOpenModalBuoi: true,
    });
  };

  handleEditBuoi = (buoi) => {
    this.setState({
      isOpenModalEditBuoi: true,
      buoiEdit: buoi,
    });
  };

  toggleBuoiModal = () => {
    this.setState({
      isOpenModalBuoi: !this.state.isOpenModalBuoi,
    });
  };

  toggleBuoiEditModal = () => {
    this.setState({
      isOpenModalEditBuoi: !this.state.isOpenModalEditBuoi,
    });
  };

  createBuoi = async (data) => {
    try {
      let response = await createBuoiService(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllBuoiFromReact();
        this.setState({
          isOpenModalBuoi: false,
        });

        emitter.emit("EVENT_CLEAR_MODAL_DATA", { id: "your id" });
      }
    } catch (e) {
      console.log(e);
    }
  };

  // handleDeleteBuoi = async (tinhthanh) => {
  //   try {
  //     let res = await deleteBuoiService(tinhthanh.id);
  //     if (res && res.errCode === 0) {
  //       await this.getAllBuoiFromReact();
  //       toast.success("Xóa Buổi thành công!");
  //     } else {
  //       alert(res.errMessage);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  doEditBuoi = async (buoi) => {
    try {
      let res = await editBuoiService(buoi);
      if (res && res.errCode == 0) {
        this.setState({
          isOpenModalEditBuoi: false,
        });
        await this.getAllBuoiFromReact();
      } else {
        alert(res.errCode);
      }
    } catch (e) {
      console.log(e);
    }
  };
  doDeleteBuoi = async (isOpen) => {
    if (isOpen === false)
      this.setState({
        isOpenModalDeleteBuoi: false,
      });
    await this.getAllBuoiFromReact();
  };
  handleDeleteBuoi = async (id) => {
    this.setState({
      isOpenModalDeleteBuoi: true,
      idDelete: id,
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
    let arrBuoi = this.state.arrBuoi;
    const currentPage = this.state.currentPage;
    const newsPerPage = this.state.newsPerPage;
    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentTodos = arrBuoi.slice(indexOfFirstNews, indexOfLastNews);
    const renderTodos = currentTodos.map((item, index) => {
      return (
        <BuoiManage
          stt={index + 1 + (currentPage - 1) * newsPerPage}
          key={index}
          data={item}
        />
      );
    });
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(arrBuoi.length / newsPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
      <div className="users-container">
        <ModalBuoi
          isOpen={this.state.isOpenModalBuoi}
          toggleFromParent={this.toggleBuoiModal}
          createBuoi={this.createBuoi}
        />
        {this.state.isOpenModalEditBuoi && (
          <ModalEditBuoi
            isOpen={this.state.isOpenModalEditBuoi}
            toggleFromParent={this.toggleBuoiEditModal}
            currentBuoi={this.state.buoiEdit}
            editBuoi={this.doEditBuoi}
          />
        )}
        {this.state.isOpenModalDeleteBuoi && (
          <ModalDeleteBuoi
            isOpen={this.state.isOpenModalDeleteBuoi}
            toggleFromParent={this.toggleBuoiDeleteModal}
            idDelete={this.state.idDelete}
            deleteBuoi={this.doDeleteBuoi}
          />
        )}
        <div className="title text-center">Quản lý Buổi</div>
        {/* <div className="mx-1">
          <button
            className="btn btn-primary"
            onClick={() => this.handleAddNewBuoi()}
          >
            <i className="fas fa-plus mx-2"></i>
            Thêm Buổi
          </button>
        </div> */}
        <div className="khung-phong">
          <i
            className="fas fa-plus"
            onClick={() => this.handleAddNewBuoi()}
          ></i>
          {/* <i className="fas fa-copy" onClick={() => this.handleEditPhong(item)}></i> */}
          <i className="fas fa-sync-alt"></i>
        </div>
        <div className="table-buoi mt-3 mx-1">
          <table id="customers-sin">
            <tbody>
              <tr>
                <th></th>
                <th>STT</th>
                <th>Mã Buổi</th>
                <th>Khung Giờ</th>
              </tr>
              {renderTodos &&
                renderTodos.map((item, index) => {
                  this.state.sodong = index + 1;
                  return (
                    <tr>
                      <td>
                        <button
                          className="btn-delete"
                          onClick={() => this.handleDeleteBuoi(item.props.data)}
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </td>
                      <td>{index + 1}</td>
                      <td
                        onClick={() => this.handleEditBuoi(item.props.data.id)}
                        style={{ color: "blue", cursor: "pointer" }}
                      >
                        {item.props.data.id}
                      </td>

                      <td>{item.props.data.tenkhungio}</td>
                      {/* <button
                        className="btn-edit"
                        onClick={() => this.handleEditBuoi(item)}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button> */}
                    </tr>
                  );
                })}

              <tr style={{ background: "rgb(247, 245, 245)" }}>
                <td></td>
                <td></td>
                <td></td>
                <td className="sodong">Số dòng: {this.state.sodong}</td>
              </tr>
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

export default connect(mapStateToProps, mapDispatchToProps)(BuoiManage);
