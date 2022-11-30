import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./HoatchatManage.scss";
import {
  getAllHoatchatService,
  createHoatchatService,
  deleteHoatchatService,
  editHoatchatService,
} from "../../../services/hoatchatService";
import ModalHoatchat from "./ModalHoatchat";
import ModalEditHoatchat from "./ModalEditHoatchat";
import ModalDeleteHoatchat from "./ModalDeleteHoatchat";
import { emitter } from "../../../utils/emitter";
import { toast } from "react-toastify";
import { createLogger } from "redux-logger";
class HoatchatManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrHoatchat: [],
      isOpenModalHoatchat: false,
      isOpenModalEditHoatchat: false,
      isOpenModalDeleteHoatchat: false,
      HoatchatEdit: {},
      idDelete: "",
      sodong: "",
      currentPage: 1,
      newsPerPage: 5,
    };
  }

  async componentDidMount() {
    await this.getAllHoatchatFromReact();
  }

  getAllHoatchatFromReact = async () => {
    let response = await getAllHoatchatService();
    if (response && response.errCode === 0) {
      this.setState({
        arrHoatchat: response.data,
      });
    }
  };

  handleAddNewHoatchat = () => {
    this.setState({
      isOpenModalHoatchat: true,
    });
  };

  handleEditHoatchat = (Hoatchat) => {
    this.setState({
      isOpenModalEditHoatchat: true,
      HoatchatEdit: Hoatchat,
    });
  };

  toggleHoatchatModal = () => {
    this.setState({
      isOpenModalHoatchat: !this.state.isOpenModalHoatchat,
    });
  };

  toggleHoatchatEditModal = () => {
    this.setState({
      isOpenModalEditHoatchat: !this.state.isOpenModalEditHoatchat,
    });
  };

  toggleHoatchatDeleteModal = () => {
    this.setState({
      isOpenModalDeleteHoatchat: !this.state.isOpenModalDeleteHoatchat,
    });
  };
  createHoatchat = async (data) => {
    try {
      let response = await createHoatchatService(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllHoatchatFromReact();
        this.setState({
          isOpenModalHoatchat: false,
        });

        emitter.emit("EVENT_CLEAR_MODAL_DATA", { id: "your id" });
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleDeleteHoatchat = async (id) => {
    this.setState({
      isOpenModalDeleteHoatchat: true,
      idDelete: id,
    });
  };

  doEditHoatchat = async (huyenquan) => {
    try {
      let res = await editHoatchatService(huyenquan);
      if (res && res.errCode == 0) {
        this.setState({
          isOpenModalEditHoatchat: false,
        });
        await this.getAllHoatchatFromReact();
      } else {
        alert(res.errCode);
      }
    } catch (e) {
      console.log(e);
    }
  };
  doDeleteHoatchat = async (isOpen) => {
    if (isOpen === false)
      this.setState({
        isOpenModalDeleteHoatchat: false,
      });
    await this.getAllHoatchatFromReact();
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
    let arrHoatchat = this.state.arrHoatchat;
    const currentPage = this.state.currentPage;
    const newsPerPage = this.state.newsPerPage;
    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentTodos = arrHoatchat.slice(indexOfFirstNews, indexOfLastNews);
    // console.log("currentTodos", currentTodos);
    const renderTodos = currentTodos.map((item, index) => {
      return (
        <HoatchatManage
          stt={index + 1 + (currentPage - 1) * newsPerPage}
          key={index}
          data={item}
        />
      );
    });
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(arrHoatchat.length / newsPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
      <div className="users-container">
        <ModalHoatchat
          isOpen={this.state.isOpenModalHoatchat}
          toggleFromParent={this.toggleHoatchatModal}
          createHoatchat={this.createHoatchat}
        />
        {this.state.isOpenModalEditHoatchat && (
          <ModalEditHoatchat
            isOpen={this.state.isOpenModalEditHoatchat}
            toggleFromParent={this.toggleHoatchatEditModal}
            currentHoatchat={this.state.HoatchatEdit}
            editHoatchat={this.doEditHoatchat}
          />
        )}

        {this.state.isOpenModalDeleteHoatchat && (
          <ModalDeleteHoatchat
            isOpen={this.state.isOpenModalDeleteHoatchat}
            toggleFromParent={this.toggleHoatchatDeleteModal}
            idDelete={this.state.idDelete}
            deleteHoatchat={this.doDeleteHoatchat}
          />
        )}
        <div className="title text-center">Quản Lý Hoạt Chất</div>
        {/* <div className="mx-1">
          <button
            className="btn btn-primary"
            onClick={() => this.handleAddNewHoatchat()}
          >
            <i className="fas fa-plus mx-2"></i>
            Thêm Hoạt Chất
          </button>
        </div> */}
        <div className="khung-phong">
          <i
            className="fas fa-plus"
            onClick={() => this.handleAddNewHoatchat()}
          ></i>
          {/* <i className="fas fa-copy" onClick={() => this.handleEditHoatchat(item)}></i> */}
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
                          onClick={() => this.handleEditHoatchat(item)}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button> */}
                        <button
                          className="btn-delete"
                          onClick={() =>
                            this.handleDeleteHoatchat(item.props.data)
                          }
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </td>
                      <td>{index + 1}</td>
                      <td
                        onClick={() => this.handleEditHoatchat(item.props.data)}
                        style={{ color: "blue", cursor: "pointer" }}
                      >
                        {item.props.data.id}
                      </td>
                      <td>{item.props.data.tenhoatchat}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(HoatchatManage);
