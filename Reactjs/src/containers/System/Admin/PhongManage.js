import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./PhongManage.scss";
import {
  getAllPhongService,
  createPhongService,
  deletePhongService,
  editPhongService,
} from "../../../services/phongService";
import ModalPhong from "./ModalPhong";
import ModalEditPhong from "./ModalEditPhong";
import ModalDeletePhong from "./ModalDeletePhong";
import { emitter } from "../../../utils/emitter";
import { toast } from "react-toastify";
import { createLogger } from "redux-logger";
class PhongManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrPhong: [],
      isOpenModalPhong: false,
      isOpenModalEditPhong: false,
      isOpenModalDeletePhong: false,
      phongEdit: {},
      idDelete: "",
      sodong: "",
      currentPage: 1,
      newsPerPage: 5,
    };
  }

  async componentDidMount() {
    await this.getAllPhongFromReact();
  }

  getAllPhongFromReact = async () => {
    let response = await getAllPhongService();
    if (response && response.errCode === 0) {
      this.setState({
        arrPhong: response.data,
      });
    }
  };

  handleAddNewPhong = () => {
    this.setState({
      isOpenModalPhong: true,
    });
  };

  handleEditPhong = (phong) => {
    this.setState({
      isOpenModalEditPhong: true,
      phongEdit: phong,
    });
  };

  togglePhongModal = () => {
    this.setState({
      isOpenModalPhong: !this.state.isOpenModalPhong,
    });
  };

  togglePhongEditModal = () => {
    this.setState({
      isOpenModalEditPhong: !this.state.isOpenModalEditPhong,
    });
  };

  togglePhongDeleteModal = () => {
    this.setState({
      isOpenModalDeletePhong: !this.state.isOpenModalDeletePhong,
    });
  };
  createPhong = async (data) => {
    try {
      let response = await createPhongService(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllPhongFromReact();
        this.setState({
          isOpenModalPhong: false,
        });

        emitter.emit("EVENT_CLEAR_MODAL_DATA", { id: "your id" });
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleDeletePhong = async (id) => {
    this.setState({
      isOpenModalDeletePhong: true,
      idDelete: id,
    });
  };

  doEditPhong = async (huyenquan) => {
    try {
      let res = await editPhongService(huyenquan);
      if (res && res.errCode == 0) {
        this.setState({
          isOpenModalEditPhong: false,
        });
        await this.getAllPhongFromReact();
      } else {
        alert(res.errCode);
      }
    } catch (e) {
      console.log(e);
    }
  };
  doDeletePhong = async (isOpen) => {
    if (isOpen === false)
      this.setState({
        isOpenModalDeletePhong: false,
      });
    await this.getAllPhongFromReact();
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
    let arrPhong = this.state.arrPhong;
    const currentPage = this.state.currentPage;
    const newsPerPage = this.state.newsPerPage;
    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentTodos = arrPhong.slice(indexOfFirstNews, indexOfLastNews);
    const renderTodos = currentTodos.map((item, index) => {
      return (
        <PhongManage
          stt={index + 1 + (currentPage - 1) * newsPerPage}
          key={index}
          data={item}
        />
      );
    });
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(arrPhong.length / newsPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
      <div className="users-container">
        <ModalPhong
          isOpen={this.state.isOpenModalPhong}
          toggleFromParent={this.togglePhongModal}
          createPhong={this.createPhong}
        />
        {this.state.isOpenModalEditPhong && (
          <ModalEditPhong
            isOpen={this.state.isOpenModalEditPhong}
            toggleFromParent={this.togglePhongEditModal}
            currentPhong={this.state.phongEdit}
            editPhong={this.doEditPhong}
          />
        )}

        {this.state.isOpenModalDeletePhong && (
          <ModalDeletePhong
            isOpen={this.state.isOpenModalDeletePhong}
            toggleFromParent={this.togglePhongDeleteModal}
            idDelete={this.state.idDelete}
            deletePhong={this.doDeletePhong}
          />
        )}
        <div className="title text-center">Quản Lý Phòng</div>
        {/* <div className="mx-1">
          <button
            className="btn btn-primary"
            onClick={() => this.handleAddNewPhong()}
          >
            <i className="fas fa-plus mx-2"></i>
            Thêm Phòng
          </button>
        </div> */}
        <div className="khung-phong">
          <i
            className="fas fa-plus"
            onClick={() => this.handleAddNewPhong()}
          ></i>
          {/* <i className="fas fa-copy" onClick={() => this.handleEditPhong(item)}></i> */}
          <i className="fas fa-sync-alt"></i>
        </div>
        <div className="table-phong mt-3 mx-1">
          <table id="customers-sin">
            <tbody>
              <tr>
                <th></th>
                <th>STT</th>
                <th>Mã Phòng</th>
                <th>Tên Phòng</th>
                <th>Tên Chuyên Khoa</th>
                <th>Tên Tầng</th>
              </tr>
              {renderTodos &&
                renderTodos.map((item, index) => {
                  this.state.sodong = index + 1;
                  return (
                    <tr>
                      <td>
                        {/* <button
                          className="btn-edit"
                          onClick={() => this.handleEditPhong(item)}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button> */}
                        <button
                          className="btn-delete"
                          onClick={() =>
                            this.handleDeletePhong(item.props.data)
                          }
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </td>
                      <td>{index + 1}</td>
                      <td
                        onClick={() => this.handleEditPhong(item.props.data)}
                        style={{ color: "blue", cursor: "pointer" }}
                      >
                        {item.props.data.id}
                      </td>
                      <td>{item.props.data.tenphong}</td>
                      <td>
                        {item.props?.data?.phongchuyenkhoa?.tenchuyenkhoa}
                      </td>
                      <td>{item.props?.data?.phongtang?.tentang}</td>
                    </tr>
                  );
                })}
              <tr style={{ background: "rgb(247, 245, 245)" }}>
                <td></td>
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

export default connect(mapStateToProps, mapDispatchToProps)(PhongManage);
