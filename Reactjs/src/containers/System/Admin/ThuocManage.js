import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ThuocManage.scss";
import {
  getAllThuocService,
  createThuocService,
  deleteThuocService,
  editThuocService,
} from "../../../services/thuocService";
import ModalThuoc from "./ModalThuoc";
import ModalEditThuoc from "./ModalEditThuoc";
import ModalDeleteThuoc from "./ModalDeleteThuoc";
import { emitter } from "../../../utils/emitter";
import { toast } from "react-toastify";
class ThuocManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrThuoc: [],
      isOpenModalThuoc: false,
      isOpenModalEditThuoc: false,
      isOpenModalDeleteThuoc: false,
      thuocEdit: {},
      currentPage: 1,
      newsPerPage: 5,
    };
  }

  async componentDidMount() {
    await this.getAllThuocFromReact();
  }

  getAllThuocFromReact = async () => {
    let response = await getAllThuocService();
    if (response && response.errCode === 0) {
      this.setState({
        arrThuoc: response.data,
      });
    }
  };

  handleAddNewThuoc = () => {
    this.setState({
      isOpenModalThuoc: true,
    });
  };

  handleEditThuoc = (thuoc) => {
    this.setState({
      isOpenModalEditThuoc: true,
      thuocEdit: thuoc,
    });
  };

  toggleThuocModal = () => {
    this.setState({
      isOpenModalThuoc: !this.state.isOpenModalThuoc,
    });
  };

  toggleThuocEditModal = () => {
    this.setState({
      isOpenModalEditThuoc: !this.state.isOpenModalEditThuoc,
    });
  };

  createThuoc = async (data) => {
    try {
      let response = await createThuocService(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllThuocFromReact();
        this.setState({
          isOpenModalThuoc: false,
        });

        emitter.emit("EVENT_CLEAR_MODAL_DATA", { id: "your id" });
      }
    } catch (e) {
      console.log(e);
    }
  };

  // handleDeleteThuoc = async (thuoc) => {
  //   try {
  //     let res = await deleteThuocService(thuoc.id);
  //     if (res && res.errCode === 0) {
  //       await this.getAllThuocFromReact();
  //       toast.success("Xóa Thuốc thành công!");
  //     } else {
  //       alert(res.errMessage);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  doEditThuoc = async (thuoc) => {
    try {
      let res = await editThuocService(thuoc);
      if (res && res.errCode == 0) {
        this.setState({
          isOpenModalEditThuoc: false,
        });
        await this.getAllThuocFromReact();
      } else {
        alert(res.errCode);
      }
    } catch (e) {
      console.log(e);
    }
  };
  doDeleteThuoc = async (isOpen) => {
    if (isOpen === false)
      this.setState({
        isOpenModalDeleteThuoc: false,
      });
    await this.getAllThuocFromReact();
  };
  handleDeleteThuoc = async (id) => {
    this.setState({
      isOpenModalDeleteThuoc: true,
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
    let arrThuoc = this.state.arrThuoc;
    const currentPage = this.state.currentPage;
    const newsPerPage = this.state.newsPerPage;
    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentTodos = arrThuoc.slice(indexOfFirstNews, indexOfLastNews);
    const renderTodos = currentTodos.map((item, index) => {
      return (
        <ThuocManage
          stt={index + 1 + (currentPage - 1) * newsPerPage}
          key={index}
          data={item}
        />
      );
    });
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(arrThuoc.length / newsPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
      <div className="users-container">
        {/* {this.state.isOpenModalThuoc && ( */}
        <ModalThuoc
          isOpen={this.state.isOpenModalThuoc}
          toggleFromParent={this.toggleThuocModal}
          createThuoc={this.createThuoc}
        />
        {/* )} */}

        {this.state.isOpenModalEditThuoc && (
          <ModalEditThuoc
            isOpen={this.state.isOpenModalEditThuoc}
            toggleFromParent={this.toggleThuocEditModal}
            currentThuoc={this.state.thuocEdit}
            editThuoc={this.doEditThuoc}
          />
        )}

        {this.state.isOpenModalDeleteThuoc && (
          <ModalDeleteThuoc
            isOpen={this.state.isOpenModalDeleteThuoc}
            toggleFromParent={this.toggleThuocDeleteModal}
            idDelete={this.state.idDelete}
            deleteThuoc={this.doDeleteThuoc}
          />
        )}
        <div className="title text-center">Quản Lý Thuốc</div>
        {/* <div className="mx-1">
          <button
            className="btn btn-primary"
            onClick={() => this.handleAddNewThuoc()}
          >
            <i className="fas fa-plus mx-2"></i>
            Thêm Thuốc
          </button>
        </div> */}
        <div className="khung-phong">
          <i
            className="fas fa-plus"
            onClick={() => this.handleAddNewThuoc()}
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
                <th>Mã Thuốc</th>
                <th>Tên Thuốc</th>
                <th>Tên Hoạt Chất</th>
              </tr>
              {renderTodos &&
                renderTodos.map((item, index) => {
                  return (
                    <tr>
                      <td>
                        <button
                          className="btn-delete"
                          onClick={() =>
                            this.handleDeleteThuoc(item.props.data)
                          }
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </td>
                      <td>{index + 1}</td>
                      <td
                        onClick={() => this.handleEditThuoc(item.props.data)}
                        style={{ color: "blue", cursor: "pointer" }}
                      >
                        {item.props.data.id}
                      </td>
                      <td>{item.props.data.tenthuoc}</td>
                      <td>{item.props.data.thuochoatchat.tenhoatchat}</td>
                      {/* <button
                        className="btn-edit"
                        onClick={() => this.handleEditThuoc(item.props.data)}
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

export default connect(mapStateToProps, mapDispatchToProps)(ThuocManage);
