import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./HuyenquanManage.scss";
import {
  getAllHuyenquanService,
  createHuyenquanService,
  deleteHuyenquanService,
  editHuyenquanService,
} from "../../../services/huyenquanService";
import ModalHuyenquan from "./ModalHuyenquan";
import ModalEditHuyenquan from "./ModalEditHuyenquan";
import { emitter } from "../../../utils/emitter";
import { toast } from "react-toastify";
import ModalDeleteHuyenquan from "./ModalDeleteHuyenquan";
class HuyenquanManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrHuyenquan: [],
      isOpenModalHuyenquan: false,
      isOpenModalEditHuyenquan: false,
      isOpenModalDeleteHuyenquan: false,
      huyenquanEdit: {},
      currentPage: 1,
      newsPerPage: 5,
    };
  }

  async componentDidMount() {
    await this.getAllHuyenquanFromReact();
  }

  getAllHuyenquanFromReact = async () => {
    let response = await getAllHuyenquanService();
    if (response && response.errCode === 0) {
      this.setState({
        arrHuyenquan: response.data,
      });
    }
  };

  handleAddNewHuyenquan = () => {
    this.setState({
      isOpenModalHuyenquan: true,
    });
  };

  handleEditHuyenquan = (huyenquan) => {
    this.setState({
      isOpenModalEditHuyenquan: true,
      huyenquanEdit: huyenquan,
    });
  };

  toggleHuyenquanModal = () => {
    this.setState({
      isOpenModalHuyenquan: !this.state.isOpenModalHuyenquan,
    });
  };

  togglehuyenquanEditModal = () => {
    this.setState({
      isOpenModalEditHuyenquan: !this.state.isOpenModalEditHuyenquan,
    });
  };
  toggleHuyenquanDeleteModal = () => {
    this.setState({
      isOpenModalDeleteHuyenquan: !this.state.isOpenModalDeleteHuyenquan,
    });
  };
  createHuyenquan = async (data) => {
    try {
      let response = await createHuyenquanService(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllHuyenquanFromReact();
        this.setState({
          isOpenModalHuyenquan: false,
        });

        emitter.emit("EVENT_CLEAR_MODAL_DATA", { id: "your id" });
      }
    } catch (e) {
      console.log(e);
    }
  };

  // handleDeleteHuyenquan = async (huyenquan) => {
  //   try {
  //     let res = await deleteHuyenquanService(huyenquan.id);
  //     if (res && res.errCode === 0) {
  //       await this.getAllHuyenquanFromReact();
  //       toast.success("Xóa Huyện Quận thành công!");
  //     } else {
  //       alert(res.errMessage);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  doEditHuyenquan = async (huyenquan) => {
    try {
      let res = await editHuyenquanService(huyenquan);
      if (res && res.errCode == 0) {
        this.setState({
          isOpenModalEditHuyenquan: false,
        });
        await this.getAllHuyenquanFromReact();
      } else {
        alert(res.errCode);
      }
    } catch (e) {
      console.log(e);
    }
  };
  doDeleteHuyenquan = async (isOpen) => {
    if (isOpen === false)
      this.setState({
        isOpenModalDeleteHuyenquan: false,
      });
    await this.getAllHuyenquanFromReact();
  };
  handleDeleteHuyenquan = async (id) => {
    this.setState({
      isOpenModalDeleteHuyenquan: true,
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
    let arrHuyenquan = this.state.arrHuyenquan;
    const currentPage = this.state.currentPage;
    const newsPerPage = this.state.newsPerPage;
    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentTodos = arrHuyenquan.slice(indexOfFirstNews, indexOfLastNews);
    const renderTodos = currentTodos.map((item, index) => {
      return (
        <HuyenquanManage
          stt={index + 1 + (currentPage - 1) * newsPerPage}
          key={index}
          data={item}
        />
      );
    });
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(arrHuyenquan.length / newsPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
      <div className="users-container">
        <ModalHuyenquan
          isOpen={this.state.isOpenModalHuyenquan}
          toggleFromParent={this.toggleHuyenquanModal}
          createHuyenquan={this.createHuyenquan}
        />
        {this.state.isOpenModalEditHuyenquan && (
          <ModalEditHuyenquan
            isOpen={this.state.isOpenModalEditHuyenquan}
            toggleFromParent={this.togglehuyenquanEditModal}
            currentHuyenquan={this.state.huyenquanEdit}
            editHuyenquan={this.doEditHuyenquan}
          />
        )}
        {this.state.isOpenModalDeleteHuyenquan && (
          <ModalDeleteHuyenquan
            isOpen={this.state.isOpenModalDeleteHuyenquan}
            toggleFromParent={this.toggleHuyenquanDeleteModal}
            idDelete={this.state.idDelete}
            deleteHuyenquan={this.doDeleteHuyenquan}
          />
        )}
        <div className="tilte text-center">Quản Lý Huyện Quận</div>
        {/* <div className="mx-1">
          <button
            className="btn btn-primary"
            onClick={() => this.handleAddNewHuyenquan()}
          >
            <i className="fas fa-plus mx-2"></i>
            Thêm Huyện Quận
          </button>
        </div> */}
        <div className="khung-phong">
          <i
            className="fas fa-plus"
            onClick={() => this.handleAddNewHuyenquan()}
          ></i>
          {/* <i className="fas fa-copy" onClick={() => this.handleEditHuyenquan(item)}></i> */}
          <i className="fas fa-sync-alt"></i>
        </div>
        <div className="table-phong mt-3 mx-1">
          <table id="customers-sin">
            <tbody>
              <tr>
                <th></th>
                <th>STT</th>
                <th>Mã huyện quận</th>
                <th>Tên Huyện Quận</th>
                <th>Tên Tỉnh Thành</th>
              </tr>
              {renderTodos &&
                renderTodos.map((item, index) => {
                  return (
                    <tr>
                      <td>
                        <button
                          className="btn-delete"
                          onClick={() =>
                            this.handleDeleteHuyenquan(item.props.data)
                          }
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </td>
                      <td>{index + 1}</td>
                      <td
                        onClick={() =>
                          this.handleEditHuyenquan(item.props.data)
                        }
                        style={{ color: "blue", cursor: "pointer" }}
                      >
                        {item.props.data.id}
                      </td>
                      <td>{item.props.data.tenhuyenquan}</td>
                      <td>{item.props.data.huyenquantinhthanh.tentinhthanh}</td>
                      {/* <button
                        className="btn-edit"
                        onClick={() => this.handleEditHuyenquan(item)}
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

export default connect(mapStateToProps, mapDispatchToProps)(HuyenquanManage);
