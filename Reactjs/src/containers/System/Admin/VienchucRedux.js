import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import "./VienchucRedux.scss";
import "./TableManageVienchuc.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import Select from "react-select";
import "react-markdown-editor-lite/lib/index.css";
import { createLogger } from "redux-logger";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class VienchucRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vienchucRedux: [],
      chucvuArr: [],
      tdhvArr: [],
      chuyenkhoaArr: [],
      xaphuongArr: [],
      genderArr: ["Nam", "Nữ", "Khác"],
      previewImgURL: "",
      isOpen: false,

      hoten: "sin",
      gioitinh: "",
      diachi: "Hậu Giang",
      sdt: "0393349814",
      password: "123",
      email: "doctor@gmail",
      avatar: "",
      contentHTML: "",
      contentMarkdown: "",
      description: "",
      id_xaphuong: "",
      id_chuyenkhoa: "",
      id_tdhv: "",
      id_chucvu: "",
      action: "",
      vienchucEditId: "",

      selectedChuyenkhoa: "",
      selectedChucvu: "",
      selectedTdhv: "",
      selectedXaphuong: "",
      selectedGender: "",
      fileUpload: "",

      currentPage: 1,
      newsPerPage: 5,

      /////
      fileNew: "",
      fileName: "",
      uploadedFile: {},
      imageName: "",
    };
  }
  async componentDidMount() {
    this.props.getChuyenkhoaStart();
    this.props.getTdhvStart();
    this.props.getChucvuStart();
    this.props.getXaphuongStart();
    this.props.fetchVienchucRedux();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.chuyenkhoaRedux !== this.props.chuyenkhoaRedux) {
      let arrChuyenkhoas = this.props.chuyenkhoaRedux;
      this.setState({
        chuyenkhoaArr: arrChuyenkhoas,
        id_chuyenkhoa:
          arrChuyenkhoas && arrChuyenkhoas.length > 0
            ? arrChuyenkhoas[0].id
            : "",
        // tenchuyenkhoa: arrChuyenkhoas && arrChuyenkhoas.length > 0 ? arrChuyenkhoas[0].tenchuyenkhoa : ''
      });
    }
    if (prevProps.tdhvRedux !== this.props.tdhvRedux) {
      let arrTdhvs = this.props.tdhvRedux;
      this.setState({
        tdhvArr: arrTdhvs,
        id_tdhv: arrTdhvs && arrTdhvs.length > 0 ? arrTdhvs[0].id : "",
      });
    }
    if (prevProps.xaphuongRedux !== this.props.xaphuongRedux) {
      let arrXaphuongs = this.props.xaphuongRedux;
      this.setState({
        xaphuongArr: arrXaphuongs,
        id_xaphuong:
          arrXaphuongs && arrXaphuongs.length > 0 ? arrXaphuongs[0].id : "",
      });
    }
    if (prevProps.chucvuRedux !== this.props.chucvuRedux) {
      let arrChucvus = this.props.chucvuRedux;
      this.setState({
        chucvuArr: arrChucvus,
        id_chucvu: arrChucvus && arrChucvus.length > 0 ? arrChucvus[0].id : "",
        action: CRUD_ACTIONS.CREATE,
        previewImgURL: "",
        avatar: "",
      });
    }
    if (prevProps.listVienchucs !== this.props.listVienchucs) {
      this.setState({
        vienchucRedux: this.props.listVienchucs,
      });
    }
  }

  handleDeleteVienchuc = (vienchuc) => {
    this.props.deleteVienchucRedux(vienchuc.id);
  };

  handleEditVienchuc = (vienchuc) => {
    console.log("detail", vienchuc);
    let imageBase64 = "";
    if (vienchuc.imageName !== "") {
      imageBase64 = "http://localhost:3002/Image/ChucVu/" + vienchuc.imageName;
      this.setState({
        imageName: vienchuc.imageName,
      });
    } else {
      imageBase64 = "";
    }
    let { chuyenkhoaArr, id_chuyenkhoa } = this.state;
    let selectedChuyenkhoa = chuyenkhoaArr.find((item) => {
      return item.tenchuyenkhoa && item.id === vienchuc.id_chuyenkhoa;
    });
    this.setState({
      selectedChuyenkhoa: selectedChuyenkhoa,
    });
    let { chucvuArr, id_chucvu } = this.state;
    let selectedChucvu = chucvuArr.find((item) => {
      return item.tenchucvu && item.id === vienchuc.id_chucvu;
    });
    this.setState({
      selectedChucvu: selectedChucvu,
    });
    let { tdhvArr, id_tdhv } = this.state;
    let selectedTdhv = tdhvArr.find((item) => {
      return item.tentdhv && item.id === vienchuc.id_tdhv;
    });
    this.setState({
      selectedTdhv: selectedTdhv,
    });
    let { xaphuongArr, id_xaphuong } = this.state;
    let selectedXaphuong = xaphuongArr.find((item) => {
      return item.tenxaphuong && item.id === vienchuc.id_xaphuong;
    });
    this.setState({
      selectedXaphuong: selectedXaphuong,
    });
    let { genderArr, gioitinh } = this.state;
    let selectedGender = genderArr.find((item) => {
      return item && item === vienchuc.gioitinh;
    });
    this.setState({
      selectedGender: selectedGender,
    });
    this.setState({
      hoten: vienchuc.hoten,
      gioitinh: vienchuc.gioitinh,
      diachi: vienchuc.diachi,
      sdt: vienchuc.sdt,
      password: vienchuc.password,
      email: vienchuc.email,
      avatar: "",
      previewImgURL: imageBase64,
      contentHTML: vienchuc.contentHTML,
      contentMarkdown: vienchuc.contentMarkdown,
      description: vienchuc.description,
      id_xaphuong: vienchuc.id_xaphuong,
      id_chuyenkhoa: vienchuc.id_chuyenkhoa,
      id_tdhv: vienchuc.id_tdhv,
      id_chucvu: vienchuc.id_chucvu,
      vienchucEditId: vienchuc.id,

      action: CRUD_ACTIONS.EDIT,
    });
  };

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    console.log("file", file);
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);

      this.setState({
        previewImgURL: objectUrl,
        avatar: base64,
        file: file,
      });

      this.setState({
        fileNew: event.target.files[0],
        fileName: event.target.files[0].name,
      });
    }
  };

  openPreviewImage = () => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpen: true,
    });
  };

  handleSaveUser = (event) => {
    let { action } = this.state;
    const fd = new FormData();
    if (action === CRUD_ACTIONS.CREATE) {
      let isValid = this.checkValidateInputCreate();
      if (isValid === true) {
        if (this.state.fileNew) {
          fd.append("file", this.state.fileNew);
        }

        this.props.createNewVienchucRedux({
          hoten: this.state.hoten,
          gioitinh: this.state.gioitinh,
          diachi: this.state.diachi,
          sdt: this.state.sdt,
          password: this.state.password,
          email: this.state.email,
          avatar: this.state.avatar,
          contentHTML: this.state.contentHTML,
          contentMarkdown: this.state.contentMarkdown,
          description: this.state.description,
          id_xaphuong: this.state.id_xaphuong,
          id_chuyenkhoa: this.state.id_chuyenkhoa,
          id_tdhv: this.state.id_tdhv,
          id_chucvu: this.state.id_chucvu,
          fd: fd,
        });
      }
    }
    if (action === CRUD_ACTIONS.EDIT) {
      let check = this.checkValidateInputEdit();

      if (check === true) {
        if (this.state.fileNew) {
          if (this.state.imageName) {
            fd.append("file", this.state.fileNew, this.state.imageName);
          } else {
            fd.append("file", this.state.fileNew);
          }
        }
        this.props.editVienchucRedux({
          id: this.state.vienchucEditId,
          hoten: this.state.hoten,
          gioitinh: this.state.gioitinh,
          diachi: this.state.diachi,
          sdt: this.state.sdt,
          password: this.state.password,
          email: this.state.email,
          avatar: this.state.avatar,
          contentHTML: this.state.contentHTML,
          contentMarkdown: this.state.contentMarkdown,
          description: this.state.description,
          id_xaphuong: this.state.id_xaphuong,
          id_chuyenkhoa: this.state.id_chuyenkhoa,
          id_tdhv: this.state.id_tdhv,
          id_chucvu: this.state.id_chucvu,
          selectedChuyenkhoa: this.state.selectedChuyenkhoa,
          selectedChucvu: this.state.selectedChucvu,
          selectedXaphuong: this.state.selectedXaphuong,
          selectedTdhv: this.state.selectedTdhv,
          fd: fd,
        });
      }
    }
  };

  checkValidateInputCreate = () => {
    let isValid = true;
    let arrCheck = [
      "email",
      "password",
      "hoten",
      "sdt",
      "diachi",
      "description",
      "gioitinh",
      "id_chuyenkhoa",
      "id_chucvu",
      "file",
    ];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("This input is required: " + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };
  checkValidateInputEdit = () => {
    let isValid = true;
    let arrCheck = [
      "email",
      "password",
      "hoten",
      "sdt",
      "diachi",
      "description",
      "gioitinh",
      "id_chuyenkhoa",
      "id_chucvu",
    ];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("This input is required: " + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };
  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
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
    let chuyenkhoas = this.state.chuyenkhoaArr;
    let arrVienchucs = this.state.vienchucRedux;
    let tdhvs = this.state.tdhvArr;
    let xaphuongs = this.state.xaphuongArr;
    let chucvus = this.state.chucvuArr;
    let genders = this.state.genderArr;
    let language = this.props.language;
    const currentPage = this.state.currentPage;
    const newsPerPage = this.state.newsPerPage;
    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentTodos = arrVienchucs.slice(indexOfFirstNews, indexOfLastNews);
    let {
      hoten,
      gioitinh,
      diachi,
      sdt,
      password,
      email,
      avatar,
      contentHTML,
      contentMarkdown,
      description,
      id_xaphuong,
      id_chuyenkhoa,
      id_tdhv,
      id_chucvu,
      selectedChuyenkhoa,
      selectedChucvu,
      selectedXaphuong,
      selectedTdhv,
      selectedGender,
    } = this.state;

    const renderTodos = currentTodos.map((item, index) => {
      return (
        <VienchucRedux
          stt={index + 1 + (currentPage - 1) * newsPerPage}
          key={index}
          data={item}
        />
      );
    });
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(arrVienchucs.length / newsPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
      <div className="user-redux-container">
        <div className="title">Quản lý viên chức</div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <FormattedMessage id="manage-vienchuc.add" />
              </div>
              <div className="col-3">
                <label>Email</label>
                <input
                  className="form-control"
                  type="email"
                  value={email}
                  onChange={(event) => {
                    this.onChangeInput(event, "email");
                  }}
                  disabled={
                    this.state.action === CRUD_ACTIONS.EDIT ? true : false
                  }
                />
              </div>
              <div className="col-3">
                <label>Password</label>
                <input
                  className="form-control"
                  // type="Password"
                  value={password}
                  onChange={(event) => {
                    this.onChangeInput(event, "password");
                  }}
                  disabled={
                    this.state.action === CRUD_ACTIONS.EDIT ? true : false
                  }
                />
              </div>
              <div className="col-3">
                <label>Họ tên</label>
                <input
                  className="form-control"
                  type="text"
                  value={hoten}
                  onChange={(event) => {
                    this.onChangeInput(event, "hoten");
                  }}
                />
              </div>
              <div className="col-3">
                <label>Số điện thoại</label>
                <input
                  className="form-control"
                  type="text"
                  value={sdt}
                  onChange={(event) => {
                    this.onChangeInput(event, "sdt");
                  }}
                />
              </div>
              <div className="col-3">
                <label>Địa chỉ</label>
                <input
                  className="form-control"
                  type="text"
                  value={diachi}
                  onChange={(event) => {
                    this.onChangeInput(event, "diachi");
                  }}
                />
              </div>
              <div className="col-3">
                <label>Miêu tả ngắn</label>
                <textarea
                  className="form-control"
                  type="text"
                  value={description}
                  onChange={(event) => {
                    this.onChangeInput(event, "description");
                  }}
                />
              </div>
              <div className="col-3">
                <label>Giới tính</label>
                <select
                  className="form-control"
                  onChange={(event) => {
                    this.onChangeInput(event, "gioitinh");
                  }}
                >
                  <option selected disabled>
                    {selectedGender ? selectedGender : ""}
                  </option>
                  {genders &&
                    genders.length > 0 &&
                    genders.map((item, index) => {
                      return <option value={item}>{item}</option>;
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>Chuyên khoa</label>
                <select
                  className="form-control"
                  onChange={(event) => {
                    this.onChangeInput(event, "id_chuyenkhoa");
                  }}
                  placeholder="Chọn chuyên khoa"
                >
                  <option selected disabled>
                    {selectedChuyenkhoa ? selectedChuyenkhoa.tenchuyenkhoa : ""}
                  </option>
                  {chuyenkhoas &&
                    chuyenkhoas.length > 0 &&
                    chuyenkhoas.map((item, index) => {
                      return (
                        <option id={index} value={item.id}>
                          {item.tenchuyenkhoa}
                        </option>
                      );
                    })}
                </select>
                {/* <Select
                                    value={this.state.selectedChuyenkhoa.tenchuyenkhoa}
                                    // onChange={(event) => { this.onChangeInput(event, 'id_chuyenkhoa') }}
                                    onChange={this.handleChangeSelectDoctorInfor}
                                    options={chuyenkhoas}
                                    placeholder='Chọn chuyên khoa'
                                    name="selectedChuyenkhoa"
                                /> */}
              </div>
              <div className="col-3">
                <label>Trình độ học vấn</label>
                <select
                  className="form-control"
                  onChange={(event) => {
                    this.onChangeInput(event, "id_tdhv");
                  }}
                >
                  <option selected disabled>
                    {selectedTdhv ? selectedTdhv.tentdhv : ""}
                  </option>
                  {tdhvs &&
                    tdhvs.length > 0 &&
                    tdhvs.map((item, index) => {
                      return (
                        <option id={index} value={item.id}>
                          {item.tentdhv}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>Chức vụ</label>
                <select
                  className="form-control"
                  onChange={(event) => {
                    this.onChangeInput(event, "id_chucvu");
                  }}
                >
                  <option selected disabled>
                    {selectedChucvu ? selectedChucvu.tenchucvu : ""}
                  </option>
                  {chucvus &&
                    chucvus.length > 0 &&
                    chucvus.map((item, index) => {
                      return (
                        <option id={index} value={item.id}>
                          {item.tenchucvu}
                        </option>
                      );
                    })}
                </select>
              </div>
              {/* <div className="col-3">
                <label>Xã Phường</label>
                <select
                  className="form-control"
                  onChange={(event) => {
                    this.onChangeInput(event, "id_xaphuong");
                  }}
                >
                  <option selected disabled>
                    {selectedXaphuong ? selectedXaphuong.tenxaphuong : ""}
                  </option>
                  {xaphuongs &&
                    xaphuongs.length > 0 &&
                    xaphuongs.map((item, index) => {
                      return (
                        <option id={index} value={item.id}>
                          {item.tenxaphuong} -{" "}
                          {item.xaphuonghuyenquan.tenhuyenquan} -{" "}
                          {
                            item.xaphuonghuyenquan.huyenquantinhthanh
                              .tentinhthanh
                          }
                        </option>
                      );
                    })}
                </select>
              </div> */}
              {/* <form
                action="#"
                method="POST"
                enctype="multipart/form-data"
              > */}
              <div className="col-3">
                <label>Hình ảnh</label>
                <div className="preview-img-container">
                  <input
                    id="previewImg"
                    type="file"
                    name="profile_pic"
                    hidden
                    onChange={(event) => this.handleOnChangeImage(event)}
                  />
                  <label className="label-upload" htmlFor="previewImg">
                    Tải ảnh<i className="fas fa-upload"></i>
                  </label>
                  <div
                    className="preview-image"
                    style={{
                      backgroundImage: `url(${this.state.previewImgURL})`,
                    }}
                    onClick={() => this.openPreviewImage()}
                  >
                    {/* <img src="D:/A Luận Văn/Web mssql/Reactjs/public/Image/ChucVu1663482809158logocv.png"></img> */}
                  </div>
                </div>
              </div>
              <MdEditor
                style={{ height: "250px", marginBottom: "20px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleEditorChange}
                value={this.state.contentMarkdown}
              />

              <div className="button">
                <div className="col-12 my-3">
                  <button
                    className={
                      this.state.action === CRUD_ACTIONS.EDIT
                        ? "btn btn-warning"
                        : "btn btn-primary"
                    }
                    onClick={(event) => this.handleSaveUser(event)}
                    type="submit"
                  >
                    {this.state.action === CRUD_ACTIONS.EDIT ? (
                      <FormattedMessage id="manage-vienchuc.edit" />
                    ) : (
                      <FormattedMessage id="manage-vienchuc.save" />
                    )}
                  </button>
                </div>
                <div className="btn-icon">
                  <i className="fas fa-copy"></i>
                  <i className="fas fa-sync-alt"></i>
                </div>
              </div>
              {/* </form> */}
              <div className=" table-phong">
                <table id="customers-sin">
                  <tbody>
                    <tr>
                      <th></th>
                      <th>STT</th>
                      <th>Mã viên chức</th>
                      <th>Email</th>
                      <th>Họ tên</th>
                      <th>Chức vụ</th>
                      <th>Chuyên khoa</th>
                    </tr>
                    {renderTodos &&
                      renderTodos.length > 0 &&
                      renderTodos.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <button
                                onClick={() =>
                                  this.handleDeleteVienchuc(item.props.data)
                                }
                                className="btn-delete"
                              >
                                <i className="fas fa-times"></i>
                              </button>
                            </td>
                            <td>{index + 1}</td>
                            <td
                              onClick={() =>
                                this.handleEditVienchuc(item.props.data)
                              }
                              style={{ color: "blue", cursor: "pointer" }}
                            >
                              {item.props.data.id}
                            </td>
                            <td>{item.props.data.email}</td>
                            <td>{item.props.data.hoten}</td>
                            <td>{item.props.data.vienchucchucvu.tenchucvu}</td>
                            <td>
                              {
                                item.props.data.vienchucchuyenkhoa
                                  ?.tenchuyenkhoa
                              }
                            </td>
                            {/* <td>
                                <button
                                  onClick={() => this.handleEditVienchuc(item)}
                                  className="btn-edit"
                                >
                                  <i className="fas fa-pencil-alt"></i>
                                </button>
                              </td> */}
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
                              <tr key={number}>
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
          </div>
          {this.state.isOpen === true && (
            <Lightbox
              mainSrc={this.state.previewImgURL}
              onCloseRequest={() => this.setState({ isOpen: false })}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    chuyenkhoaRedux: state.admin.chuyenkhoas,
    tdhvRedux: state.admin.tdhvs,
    chucvuRedux: state.admin.chucvus,
    xaphuongRedux: state.admin.xaphuongs,
    listVienchucs: state.admin.vienchucs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getChuyenkhoaStart: () => dispatch(actions.fetchChuyenkhoaStart()),
    getTdhvStart: () => dispatch(actions.fetchTdhvStart()),
    getChucvuStart: () => dispatch(actions.fetchChucvuStart()),
    getXaphuongStart: () => dispatch(actions.fetchXaphuongStart()),

    createNewVienchucRedux: (data) => dispatch(actions.createNewVienchuc(data)),
    editVienchucRedux: (data) => dispatch(actions.editVienchuc(data)),

    fetchVienchucRedux: () => dispatch(actions.fetchAllVienchucStart()),
    deleteVienchucRedux: (id) => dispatch(actions.deleteVienchuc(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VienchucRedux);
