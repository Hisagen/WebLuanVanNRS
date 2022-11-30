import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./NhasxManage.scss";
import {
  getAllNhasxService,
  createNhasxService,
  deleteNhasxService,
  editNhasxService,
} from "../../../services/nhasxService";
import ModalNhasx from "./ModalNhasx";
import ModalEditNhasx from "./ModalEditNhasx";
import ModalDeleteNhasx from "./ModalDeleteNhasx";
import { emitter } from "../../../utils/emitter";
import { toast } from "react-toastify";
import { createLogger } from "redux-logger";
class NhasxManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrNhasx: [],
      isOpenModalNhasx: false,
      isOpenModalEditNhasx: false,
      isOpenModalDeleteNhasx: false,
      NhasxEdit: {},
      idDelete: "",
      sodong: "",
      currentPage: 1,
      newsPerPage: 5,
    };
  }

  async componentDidMount() {
    await this.getAllNhasxFromReact();
  }

  getAllNhasxFromReact = async () => {
    let response = await getAllNhasxService();
    if (response && response.errCode === 0) {
      this.setState({
        arrNhasx: response.data,
      });
    }
  };

  handleAddNewNhasx = () => {
    this.setState({
      isOpenModalNhasx: true,
    });
  };

  handleEditNhasx = (Nhasx) => {
    this.setState({
      isOpenModalEditNhasx: true,
      NhasxEdit: Nhasx,
    });
  };

  toggleNhasxModal = () => {
    this.setState({
      isOpenModalNhasx: !this.state.isOpenModalNhasx,
    });
  };

  toggleNhasxEditModal = () => {
    this.setState({
      isOpenModalEditNhasx: !this.state.isOpenModalEditNhasx,
    });
  };

  toggleNhasxDeleteModal = () => {
    this.setState({
      isOpenModalDeleteNhasx: !this.state.isOpenModalDeleteNhasx,
    });
  };
  createNhasx = async (data) => {
    try {
      let response = await createNhasxService(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllNhasxFromReact();
        this.setState({
          isOpenModalNhasx: false,
        });

        emitter.emit("EVENT_CLEAR_MODAL_DATA", { id: "your id" });
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleDeleteNhasx = async (id) => {
    this.setState({
      isOpenModalDeleteNhasx: true,
      idDelete: id,
    });
  };

  doEditNhasx = async (huyenquan) => {
    try {
      let res = await editNhasxService(huyenquan);
      if (res && res.errCode == 0) {
        this.setState({
          isOpenModalEditNhasx: false,
        });
        await this.getAllNhasxFromReact();
      } else {
        alert(res.errCode);
      }
    } catch (e) {
      console.log(e);
    }
  };
  doDeleteNhasx = async (isOpen) => {
    if (isOpen === false)
      this.setState({
        isOpenModalDeleteNhasx: false,
      });
    await this.getAllNhasxFromReact();
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
    let arrNhasx = this.state.arrNhasx;
    const currentPage = this.state.currentPage;
    const newsPerPage = this.state.newsPerPage;
    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentTodos = arrNhasx.slice(indexOfFirstNews, indexOfLastNews);
    const renderTodos = currentTodos.map((item, index) => {
      return (
        <NhasxManage
          stt={index + 1 + (currentPage - 1) * newsPerPage}
          key={index}
          data={item}
        />
      );
    });
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(arrNhasx.length / newsPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
      <div className="users-container">
        <ModalNhasx
          isOpen={this.state.isOpenModalNhasx}
          toggleFromParent={this.toggleNhasxModal}
          createNhasx={this.createNhasx}
        />
        {this.state.isOpenModalEditNhasx && (
          <ModalEditNhasx
            isOpen={this.state.isOpenModalEditNhasx}
            toggleFromParent={this.toggleNhasxEditModal}
            currentNhasx={this.state.NhasxEdit}
            editNhasx={this.doEditNhasx}
          />
        )}

        {this.state.isOpenModalDeleteNhasx && (
          <ModalDeleteNhasx
            isOpen={this.state.isOpenModalDeleteNhasx}
            toggleFromParent={this.toggleNhasxDeleteModal}
            idDelete={this.state.idDelete}
            deleteNhasx={this.doDeleteNhasx}
          />
        )}
        <div className="title text-center">Quản Lý Hoạt Chất</div>
        {/* <div className="mx-1">
          <button
            className="btn btn-primary"
            onClick={() => this.handleAddNewNhasx()}
          >
            <i className="fas fa-plus mx-2"></i>
            Thêm Hoạt Chất
          </button>
        </div> */}
        <div className="khung-phong">
          <i
            className="fas fa-plus"
            onClick={() => this.handleAddNewNhasx()}
          ></i>
          {/* <i className="fas fa-copy" onClick={() => this.handleEditNhasx(item)}></i> */}
          <i className="fas fa-sync-alt"></i>
        </div>
        <div className="table-phong mt-3 mx-1">
          <table id="customers-sin">
            <tbody>
              <tr>
                <th></th>
                <th>STT</th>
                <th>Mã Hoạt Chất</th>
                <th>Tên Hoạt Chất</th>
              </tr>
              {renderTodos &&
                renderTodos.map((item, index) => {
                  this.state.sodong = index + 1;
                  return (
                    <tr>
                      <td>
                        {/* <button
                          className="btn-edit"
                          onClick={() => this.handleEditNhasx(item)}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button> */}
                        <button
                          className="btn-delete"
                          onClick={() =>
                            this.handleDeleteNhasx(item.props.data)
                          }
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </td>
                      <td>{index + 1}</td>
                      <td
                        onClick={() => this.handleEditNhasx(item.props.data)}
                        style={{ color: "blue", cursor: "pointer" }}
                      >
                        {item.props.data.id}
                      </td>
                      <td>{item.props.data.tennhasx}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(NhasxManage);
