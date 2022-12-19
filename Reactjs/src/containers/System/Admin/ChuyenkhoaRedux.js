import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import "./ChuyenkhoaRedux.scss";
import "./TableManageVienchuc.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import Select from "react-select";
import "react-markdown-editor-lite/lib/index.css";
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ChuyenkhoaRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewImgURL: "",
      isOpen: false,

      tenchuyenkhoa: "test",
      slbntd: "10",
      descriptionHTML: "",
      descriptionMarkdown: "",
      avatar: "",

      action: "",
      chuyenkhoaEditId: "",
      ChuyenkhoaRedux: [],

      currentPage: 1,
      newsPerPage: 5,

      fileNew: "",
      fileName: "",
      uploadedFile: {},
      imageName: "",
    };
  }
  async componentDidMount() {
    this.props.fetchChuyenkhoaRedux();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listChuyenkhoas !== this.props.listChuyenkhoas) {
      this.setState({
        ChuyenkhoaRedux: this.props.listChuyenkhoas,
        action: CRUD_ACTIONS.CREATE,
        previewImgURL: "",
        avatar: "",
      });
    }
  }

  handleDeleteChuyenkhoa = (chuyenkhoa) => {
    this.props.deleteChuyenkhoaRedux(chuyenkhoa.id);
  };

  handleEditChuyenkhoa = (chuyenkhoa) => {
    console.log("detail", chuyenkhoa);
    let imageBase64 = "";
    if (chuyenkhoa.imageName !== "") {
      imageBase64 =
        "http://localhost:3002/Image/ChuyenKhoa/" + chuyenkhoa.imageName;
      this.setState({
        imageName: chuyenkhoa.imageName,
        tenchuyenkhoa: chuyenkhoa.tenchuyenkhoa,
        slbntd: chuyenkhoa.slbntd,
        descriptionHTML: chuyenkhoa.descriptionHTML,
        descriptionMarkdown: chuyenkhoa.descriptionMarkdown,
        avatar: "",
        previewImgURL: imageBase64,
        chuyenkhoaEditId: chuyenkhoa.id,
        action: CRUD_ACTIONS.EDIT,
      });
    } else {
      imageBase64 = "";
    }
  };

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];

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

  handleSaveChuyenkhoa = (data) => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;

    let { action } = this.state;
    const fd = new FormData();

    if (action === CRUD_ACTIONS.CREATE) {
      if (this.state.fileNew) {
        fd.append("file", this.state.fileNew);
      }
      this.props.createNewChuyenkhoaRedux({
        tenchuyenkhoa: this.state.tenchuyenkhoa,
        slbntd: this.state.slbntd,
        avatar: this.state.avatar,
        descriptionHTML: this.state.descriptionHTML,
        descriptionMarkdown: this.state.descriptionMarkdown,
        fd: fd,
      });
    }
    if (action === CRUD_ACTIONS.EDIT) {
      if (this.state.fileNew) {
        if (this.state.imageName) {
          fd.append("file", this.state.fileNew, this.state.imageName);
        } else {
          fd.append("file", this.state.fileNew);
        }
      }
      this.props.editChuyenkhoaRedux({
        id: this.state.chuyenkhoaEditId,
        tenchuyenkhoa: this.state.tenchuyenkhoa,
        slbntd: this.state.slbntd,
        avatar: this.state.avatar,
        descriptionHTML: this.state.descriptionHTML,
        descriptionMarkdown: this.state.descriptionMarkdown,
        fd: fd,
      });
    }
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = ["tenchuyenkhoa", "slbntd", "file"];
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
      descriptionMarkdown: text,
      descriptionHTML: html,
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

  handleRefest = () => {
    window.location.reload(true);
  };
  render() {
    let language = this.props.language;
    let arrChuyenkhoas = this.state.ChuyenkhoaRedux;

    let {
      tenchuyenkhoa,
      slbntd,
      avatar,
      descriptionHTML,
      descriptionMarkdown,
    } = this.state;

    const currentPage = this.state.currentPage;
    const newsPerPage = this.state.newsPerPage;
    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentTodos = arrChuyenkhoas.slice(
      indexOfFirstNews,
      indexOfLastNews
    );
    const renderTodos = currentTodos.map((item, index) => {
      return (
        <ChuyenkhoaRedux
          stt={index + 1 + (currentPage - 1) * newsPerPage}
          key={index}
          data={item}
        />
      );
    });
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(arrChuyenkhoas.length / newsPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
      <div className="user-redux-container">
        <div className="title">Quản lý Chuyên Khoa</div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-12">Thêm chuyên khoa</div>

              <div className="col-3">
                <label>Tên chuyên khoa</label>
                <input
                  className="form-control"
                  type="text"
                  value={tenchuyenkhoa}
                  onChange={(event) => {
                    this.onChangeInput(event, "tenchuyenkhoa");
                  }}
                />
              </div>
              <div className="col-3">
                <label>Số lượng bệnh nhân tối đa</label>
                <input
                  className="form-control"
                  type="text"
                  value={slbntd}
                  onChange={(event) => {
                    this.onChangeInput(event, "slbntd");
                  }}
                />
              </div>
              <div className="col-3">
                <label>Hình ảnh</label>
                <div className="preview-img-container">
                  <input
                    id="previewImg"
                    type="file"
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
                  ></div>
                </div>
              </div>
              <MdEditor
                style={{ height: "250px", marginBottom: "20px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleEditorChange}
                value={this.state.descriptionMarkdown}
              />
              <div className="col-12 my-3">
                <button
                  className={
                    this.state.action === CRUD_ACTIONS.EDIT
                      ? "btn btn-warning"
                      : "btn btn-primary"
                  }
                  onClick={() => this.handleSaveChuyenkhoa()}
                >
                  {this.state.action === CRUD_ACTIONS.EDIT ? (
                    <>Sửa chuyên khoa</>
                  ) : (
                    <>Lưu chuyên khoa</>
                  )}
                </button>
              </div>
              <div className="btn-icon">
                {/* <i className="fas fa-copy"></i> */}
                <i
                  className="fas fa-sync-alt"
                  onClick={() => this.handleRefest()}
                  style={{ marginRight: "30px" }}
                ></i>
              </div>
              <div className="table-phong">
                <table id="customers-sin">
                  <tbody>
                    <tr>
                      <th></th>
                      <th>STT</th>
                      <th>Mã chuyên khoa</th>
                      <th>Tên chuyên khoa</th>
                      <th title="Số lượng bệnh nhân tối đa">Slbndt</th>
                    </tr>
                    {renderTodos &&
                      renderTodos.length > 0 &&
                      renderTodos.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <button
                                onClick={() =>
                                  this.handleDeleteChuyenkhoa(item.props.data)
                                }
                                className="btn-delete"
                              >
                                <i class="fas fa-times"></i>
                              </button>
                            </td>
                            <td>{index + 1}</td>
                            <td
                              onClick={() =>
                                this.handleEditChuyenkhoa(item.props.data)
                              }
                              style={{ color: "blue", cursor: "pointer" }}
                            >
                              {item.props.data.id}
                            </td>
                            <td>{item.props.data.tenchuyenkhoa}</td>
                            <td>{item.props.data.slbntd}</td>
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
    listChuyenkhoas: state.admin.chuyenkhoas,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNewChuyenkhoaRedux: (data) =>
      dispatch(actions.createNewChuyenkhoa(data)),
    editChuyenkhoaRedux: (data) => dispatch(actions.editChuyenkhoa(data)),
    deleteChuyenkhoaRedux: (id) => dispatch(actions.deleteChuyenkhoa(id)),

    fetchChuyenkhoaRedux: () => dispatch(actions.fetchAllChuyenkhoaStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChuyenkhoaRedux);
