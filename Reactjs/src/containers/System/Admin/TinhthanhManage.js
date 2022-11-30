import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TinhthanhManage.scss";
import {
  getAllTinhthanhService,
  createTinhthanhService,
  deleteTinhthanhService,
  editTinhthanhService,
} from "../../../services/tinhthanhService";
import ModalTinhthanh from "./ModalTinhthanh";
import ModalEditTinhthanh from "./ModalEditTinhthanh";
import ModalDeleteTinhthanh from "./ModalDeleteTinhthanh";
import { emitter } from "../../../utils/emitter";
import { toast } from "react-toastify";
import { createLogger } from "redux-logger";
class TinhthanhManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrTinhthanh: [],
      isOpenModalTinhthanh: false,
      isOpenModalEditTinhthanh: false,
      isOpenModalDeleteTinhthanh: false,
      TinhthanhEdit: {},
      idDelete: "",
      sodong: "",
      currentPage: 1,
      newsPerPage: 5,
    };
  }

  async componentDidMount() {
    await this.getAllTinhthanhFromReact();
  }

  getAllTinhthanhFromReact = async () => {
    let response = await getAllTinhthanhService();
    if (response && response.errCode === 0) {
      this.setState({
        arrTinhthanh: response.data,
      });
    }
  };

  handleAddNewTinhthanh = () => {
    this.setState({
      isOpenModalTinhthanh: true,
    });
  };

  handleEditTinhthanh = (Tinhthanh) => {
    this.setState({
      isOpenModalEditTinhthanh: true,
      TinhthanhEdit: Tinhthanh,
    });
  };

  toggleTinhthanhModal = () => {
    this.setState({
      isOpenModalTinhthanh: !this.state.isOpenModalTinhthanh,
    });
  };

  toggleTinhthanhEditModal = () => {
    this.setState({
      isOpenModalEditTinhthanh: !this.state.isOpenModalEditTinhthanh,
    });
  };

  toggleTinhthanhDeleteModal = () => {
    this.setState({
      isOpenModalDeleteTinhthanh: !this.state.isOpenModalDeleteTinhthanh,
    });
  };
  createTinhthanh = async (data) => {
    try {
      let response = await createTinhthanhService(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllTinhthanhFromReact();
        this.setState({
          isOpenModalTinhthanh: false,
        });

        emitter.emit("EVENT_CLEAR_MODAL_DATA", { id: "your id" });
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleDeleteTinhthanh = async (id) => {
    this.setState({
      isOpenModalDeleteTinhthanh: true,
      idDelete: id,
    });
  };

  doEditTinhthanh = async (huyenquan) => {
    try {
      let res = await editTinhthanhService(huyenquan);
      if (res && res.errCode == 0) {
        this.setState({
          isOpenModalEditTinhthanh: false,
        });
        await this.getAllTinhthanhFromReact();
      } else {
        alert(res.errCode);
      }
    } catch (e) {
      console.log(e);
    }
  };
  doDeleteTinhthanh = async (isOpen) => {
    if (isOpen === false)
      this.setState({
        isOpenModalDeleteTinhthanh: false,
      });
    await this.getAllTinhthanhFromReact();
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
    let arrTinhthanh = this.state.arrTinhthanh;
    const currentPage = this.state.currentPage;
    const newsPerPage = this.state.newsPerPage;
    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentTodos = arrTinhthanh.slice(indexOfFirstNews, indexOfLastNews);
    const renderTodos = currentTodos.map((item, index) => {
      return (
        <TinhthanhManage
          stt={index + 1 + (currentPage - 1) * newsPerPage}
          key={index}
          data={item}
        />
      );
    });
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(arrTinhthanh.length / newsPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
      <div className="users-container">
        <ModalTinhthanh
          isOpen={this.state.isOpenModalTinhthanh}
          toggleFromParent={this.toggleTinhthanhModal}
          createTinhthanh={this.createTinhthanh}
        />
        {this.state.isOpenModalEditTinhthanh && (
          <ModalEditTinhthanh
            isOpen={this.state.isOpenModalEditTinhthanh}
            toggleFromParent={this.toggleTinhthanhEditModal}
            currentTinhthanh={this.state.TinhthanhEdit}
            editTinhthanh={this.doEditTinhthanh}
          />
        )}

        {this.state.isOpenModalDeleteTinhthanh && (
          <ModalDeleteTinhthanh
            isOpen={this.state.isOpenModalDeleteTinhthanh}
            toggleFromParent={this.toggleTinhthanhDeleteModal}
            idDelete={this.state.idDelete}
            deleteTinhthanh={this.doDeleteTinhthanh}
          />
        )}
        <div className="title text-center">Quản Lý Tỉnh Thành</div>
        {/* <div className="mx-1">
          <button
            className="btn btn-primary"
            onClick={() => this.handleAddNewTinhthanh()}
          >
            <i className="fas fa-plus mx-2"></i>
            Thêm Tỉnh Thành
          </button>
        </div> */}
        <div className="khung-phong">
          <i
            className="fas fa-plus"
            onClick={() => this.handleAddNewTinhthanh()}
          ></i>
          {/* <i className="fas fa-copy" onClick={() => this.handleEditTinhthanh(item)}></i> */}
          <i className="fas fa-sync-alt"></i>
        </div>
        <div className="table-phong mt-3 mx-1">
          <table id="customers-sin">
            <tbody>
              <tr>
                <th></th>
                <th>STT</th>
                <th>Mã Tỉnh Thành</th>
                <th>Tên Tỉnh Thành</th>
              </tr>
              {renderTodos &&
                renderTodos.map((item, index) => {
                  this.state.sodong = index + 1;
                  return (
                    <tr>
                      <td>
                        {/* <button
                          className="btn-edit"
                          onClick={() => this.handleEditTinhthanh(item)}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button> */}
                        <button
                          className="btn-delete"
                          onClick={() =>
                            this.handleDeleteTinhthanh(item.props.data)
                          }
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </td>
                      <td>{index + 1}</td>
                      <td
                        onClick={() =>
                          this.handleEditTinhthanh(item.props.data)
                        }
                        style={{ color: "blue", cursor: "pointer" }}
                      >
                        {item.props.data.id}
                      </td>
                      <td>{item.props.data.tentinhthanh}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(TinhthanhManage);
