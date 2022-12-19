import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TangManage.scss";
import {
  getAllTangService,
  createTangService,
  deleteTangService,
  editTangService,
} from "../../../services/tangService";
import ModalTang from "./ModalTang";
import ModalEditTang from "./ModalEditTang";
import ModalDeleteTang from "./ModalDeleteTang";
import { emitter } from "../../../utils/emitter";
import { toast } from "react-toastify";
import { createLogger } from "redux-logger";
class TangManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrTang: [],
      isOpenModalTang: false,
      isOpenModalEditTang: false,
      isOpenModalDeleteTang: false,
      tangEdit: {},
      idDelete: "",
      sodong: "",
      currentPage: 1,
      newsPerPage: 5,
    };
  }

  async componentDidMount() {
    await this.getAllTangFromReact();
  }

  getAllTangFromReact = async () => {
    let response = await getAllTangService();
    if (response && response.errCode === 0) {
      this.setState({
        arrTang: response.data,
      });
    }
  };

  handleAddNewTang = () => {
    this.setState({
      isOpenModalTang: true,
    });
  };

  handleEditTang = (tang) => {
    this.setState({
      isOpenModalEditTang: true,
      tangEdit: tang,
    });
  };

  toggleTangModal = () => {
    this.setState({
      isOpenModalTang: !this.state.isOpenModalTang,
    });
  };

  toggleTangEditModal = () => {
    this.setState({
      isOpenModalEditTang: !this.state.isOpenModalEditTang,
    });
  };

  toggleTangDeleteModal = () => {
    this.setState({
      isOpenModalDeleteTang: !this.state.isOpenModalDeleteTang,
    });
  };
  createTang = async (data) => {
    try {
      let response = await createTangService(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllTangFromReact();
        this.setState({
          isOpenModalTang: false,
        });

        emitter.emit("EVENT_CLEAR_MODAL_DATA", { id: "your id" });
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleDeleteTang = async (id) => {
    this.setState({
      isOpenModalDeleteTang: true,
      idDelete: id,
    });
  };

  doEditTang = async (huyenquan) => {
    try {
      let res = await editTangService(huyenquan);
      if (res && res.errCode == 0) {
        this.setState({
          isOpenModalEditTang: false,
        });
        await this.getAllTangFromReact();
      } else {
        alert(res.errCode);
      }
    } catch (e) {
      console.log(e);
    }
  };
  doDeleteTang = async (isOpen) => {
    if (isOpen === false)
      this.setState({
        isOpenModalDeleteTang: false,
      });
    await this.getAllTangFromReact();
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

  handleRefest = () => {
    window.location.reload(true);
  };
  render() {
    let arrTang = this.state.arrTang;
    const currentPage = this.state.currentPage;
    const newsPerPage = this.state.newsPerPage;
    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentTodos = arrTang.slice(indexOfFirstNews, indexOfLastNews);
    const renderTodos = currentTodos.map((item, index) => {
      return (
        <TangManage
          stt={index + 1 + (currentPage - 1) * newsPerPage}
          key={index}
          data={item}
        />
      );
    });
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(arrTang.length / newsPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
      <div className="users-container">
        <ModalTang
          isOpen={this.state.isOpenModalTang}
          toggleFromParent={this.toggleTangModal}
          createTang={this.createTang}
        />
        {this.state.isOpenModalEditTang && (
          <ModalEditTang
            isOpen={this.state.isOpenModalEditTang}
            toggleFromParent={this.toggleTangEditModal}
            currentTang={this.state.tangEdit}
            editTang={this.doEditTang}
          />
        )}

        {this.state.isOpenModalDeleteTang && (
          <ModalDeleteTang
            isOpen={this.state.isOpenModalDeleteTang}
            toggleFromParent={this.toggleTangDeleteModal}
            idDelete={this.state.idDelete}
            deleteTang={this.doDeleteTang}
          />
        )}
        <div className="title text-center">Quản Lý Tầng</div>
        {/* <div className="mx-1">
          <button
            className="btn btn-primary"
            onClick={() => this.handleAddNewTang()}
          >
            <i className="fas fa-plus mx-2"></i>
            Thêm Tầng
          </button>
        </div> */}
        <div className="khung-tang">
          <i
            className="fas fa-plus"
            onClick={() => this.handleAddNewTang()}
          ></i>
          {/* <i className="fas fa-copy" onClick={() => this.handleEditTang(item)}></i> */}
          <i
            className="fas fa-sync-alt"
            onClick={() => this.handleRefest()}
          ></i>
        </div>
        <div className="table-tang mt-3 mx-1">
          <table id="customers-sin">
            <tbody>
              <tr>
                <th></th>
                <th>STT</th>
                <th>Mã Tầng</th>
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
                          onClick={() => this.handleEditTang(item)}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button> */}
                        <button
                          className="btn-delete"
                          onClick={() => this.handleDeleteTang(item.props.data)}
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </td>
                      <td>{index + 1}</td>
                      <td
                        onClick={() => this.handleEditTang(item.props.data)}
                        style={{ color: "blue", cursor: "pointer" }}
                      >
                        {item.props.data.id}
                      </td>
                      <td>{item.props.data.tentang}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(TangManage);
