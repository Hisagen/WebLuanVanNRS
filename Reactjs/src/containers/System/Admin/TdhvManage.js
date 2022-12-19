import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TdhvManage.scss";
import {
  getAllTdhvService,
  createTdhvService,
  deleteTdhvService,
  editTdhvService,
} from "../../../services/tdhvService";
import ModalTdhv from "./ModalTdhv";
import ModalEditTdhv from "./ModalEditTdhv";
import ModalDeleteTdhv from "./ModalDeleteTdhv";
import { emitter } from "../../../utils/emitter";
import { toast } from "react-toastify";
import { createLogger } from "redux-logger";
class TdhvManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrTdhv: [],
      isOpenModalTdhv: false,
      isOpenModalEditTdhv: false,
      isOpenModalDeleteTdhv: false,
      TdhvEdit: {},
      idDelete: "",
      sodong: "",
      currentPage: 1,
      newsPerPage: 5,
    };
  }

  async componentDidMount() {
    await this.getAllTdhvFromReact();
  }

  getAllTdhvFromReact = async () => {
    let response = await getAllTdhvService();
    if (response && response.errCode === 0) {
      this.setState({
        arrTdhv: response.data,
      });
    }
  };

  handleAddNewTdhv = () => {
    this.setState({
      isOpenModalTdhv: true,
    });
  };

  handleEditTdhv = (Tdhv) => {
    this.setState({
      isOpenModalEditTdhv: true,
      TdhvEdit: Tdhv,
    });
  };

  toggleTdhvModal = () => {
    this.setState({
      isOpenModalTdhv: !this.state.isOpenModalTdhv,
    });
  };

  toggleTdhvEditModal = () => {
    this.setState({
      isOpenModalEditTdhv: !this.state.isOpenModalEditTdhv,
    });
  };

  toggleTdhvDeleteModal = () => {
    this.setState({
      isOpenModalDeleteTdhv: !this.state.isOpenModalDeleteTdhv,
    });
  };
  createTdhv = async (data) => {
    try {
      let response = await createTdhvService(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllTdhvFromReact();
        this.setState({
          isOpenModalTdhv: false,
        });

        emitter.emit("EVENT_CLEAR_MODAL_DATA", { id: "your id" });
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleDeleteTdhv = async (id) => {
    this.setState({
      isOpenModalDeleteTdhv: true,
      idDelete: id,
    });
  };

  doEditTdhv = async (huyenquan) => {
    try {
      let res = await editTdhvService(huyenquan);
      if (res && res.errCode == 0) {
        this.setState({
          isOpenModalEditTdhv: false,
        });
        await this.getAllTdhvFromReact();
      } else {
        alert(res.errCode);
      }
    } catch (e) {
      console.log(e);
    }
  };
  doDeleteTdhv = async (isOpen) => {
    if (isOpen === false)
      this.setState({
        isOpenModalDeleteTdhv: false,
      });
    await this.getAllTdhvFromReact();
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
    let arrTdhv = this.state.arrTdhv;
    const currentPage = this.state.currentPage;
    const newsPerPage = this.state.newsPerPage;
    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentTodos = arrTdhv.slice(indexOfFirstNews, indexOfLastNews);
    const renderTodos = currentTodos.map((item, index) => {
      return (
        <TdhvManage
          stt={index + 1 + (currentPage - 1) * newsPerPage}
          key={index}
          data={item}
        />
      );
    });
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(arrTdhv.length / newsPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
      <div className="users-container">
        <ModalTdhv
          isOpen={this.state.isOpenModalTdhv}
          toggleFromParent={this.toggleTdhvModal}
          createTdhv={this.createTdhv}
        />
        {this.state.isOpenModalEditTdhv && (
          <ModalEditTdhv
            isOpen={this.state.isOpenModalEditTdhv}
            toggleFromParent={this.toggleTdhvEditModal}
            currentTdhv={this.state.TdhvEdit}
            editTdhv={this.doEditTdhv}
          />
        )}

        {this.state.isOpenModalDeleteTdhv && (
          <ModalDeleteTdhv
            isOpen={this.state.isOpenModalDeleteTdhv}
            toggleFromParent={this.toggleTdhvDeleteModal}
            idDelete={this.state.idDelete}
            deleteTdhv={this.doDeleteTdhv}
          />
        )}
        <div className="title text-center">Quản Lý Trình Độ Học Vấn</div>
        {/* <div className="mx-1">
          <button
            className="btn btn-primary"
            onClick={() => this.handleAddNewTdhv()}
          >
            <i className="fas fa-plus mx-2"></i>
            Thêm Trình Độ Học Vấn
          </button>
        </div> */}
        <div className="khung-phong">
          <i
            className="fas fa-plus"
            onClick={() => this.handleAddNewTdhv()}
          ></i>
          {/* <i className="fas fa-copy" onClick={() => this.handleEditTdhv(item)}></i> */}
          <i
            className="fas fa-sync-alt"
            onClick={() => this.handleRefest()}
          ></i>
        </div>
        <div className="table-phong mt-3 mx-1">
          <table id="customers-sin">
            <tbody>
              <tr>
                <th></th>
                <th>STT</th>
                <th>Mã Trình Độ Học Vấn</th>
                <th>Tên Trình Độ Học Vấn</th>
              </tr>
              {renderTodos &&
                renderTodos.map((item, index) => {
                  this.state.sodong = index + 1;
                  return (
                    <tr>
                      <td>
                        {/* <button
                          className="btn-edit"
                          onClick={() => this.handleEditTdhv(item)}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button> */}
                        <button
                          className="btn-delete"
                          onClick={() => this.handleDeleteTdhv(item.props.data)}
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </td>
                      <td>{index + 1}</td>
                      <td
                        onClick={() => this.handleEditTdhv(item.props.data)}
                        style={{ color: "blue", cursor: "pointer" }}
                      >
                        {item.props.data.id}
                      </td>
                      <td>{item.props.data.tentdhv}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(TdhvManage);
