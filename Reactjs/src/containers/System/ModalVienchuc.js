import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";

import Select from "react-select";
import * as actions from "../../store/actions";
import { CRUD_ACTIONS, LANGUAGES, dateFormat, CommonUtils } from "../../utils";
import DataPicker from "../../components/Input/DatePicker";
import moment from "moment";
import { times } from "lodash";
import _ from "lodash";
import { toast } from "react-toastify";

import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

import "./ModalVienchuc.scss";

const mdParser = new MarkdownIt(/* Markdown-it options */);

function handleEditorChange({ html, text }) {
  console.log("handleEditorChange", html, text);
}

class ModalVienchuc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chucvuArr: [],
      tdhvArr: [],
      chuyenkhoaArr: [],
      genderArr: ["Nam", "Nữ", "Khác"],
      previewImgURL: "",
      hoten: "",
      gioitinh: "",
      diachi: "",
      sdt: "",
      password: "",
      email: "",
      image: "",
      contentHTML: "",
      contentMarkdown: "",
      description: "",
      id_xaphuong: "",
      id_chuyenkhoa: "",
      id_tdhv: "",
      id_chucvu: "",
      isOpen: false,
    };

    this.listenToEmitter();
  }

  listenToEmitter = () => {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        hoten: "",
        gioitinh: "",
        diachi: "",
        sdt: "",
        password: "",
        email: "",
        image: "",
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        id_xaphuong: "",
        id_chuyenkhoa: "",
        id_tdhv: "",
        id_chucvu: "",
      });
    });
  };

  async componentDidMount() {
    this.props.getChuyenkhoaStart();
    this.props.getTdhvStart();
    this.props.getChucvuStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.chuyenkhoaRedux !== this.props.chuyenkhoaRedux) {
      let arrChuyenkhoas = this.props.chuyenkhoaRedux;
      this.setState({
        chuyenkhoaArr: arrChuyenkhoas,
        chuyenkhoa:
          arrChuyenkhoas && arrChuyenkhoas.length > 0
            ? arrChuyenkhoas[0].id_chuyenkhoa
            : "",
      });
    }
    if (prevProps.tdhvRedux !== this.props.tdhvRedux) {
      let arrTdhvs = this.props.tdhvRedux;
      this.setState({
        tdhvArr: arrTdhvs,
        tdhv: arrTdhvs && arrTdhvs.length > 0 ? arrTdhvs[0].id_tdhv : "",
      });
    }
    if (prevProps.chucvuRedux !== this.props.chucvuRedux) {
      let arrChucvus = this.props.chucvuRedux;
      this.setState({
        chucvuArr: arrChucvus,
        chucvu:
          arrChucvus && arrChucvus.length > 0 ? arrChucvus[0].id_chucvu : "",
      });
    }
  }

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        image: base64,
      });
    }
  };

  openPreviewImage = () => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpen: true,
    });
  };

  toggle = () => {
    this.props.toggleFromParent();
  };

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  checkValideInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "hoten"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleAddNewUser = () => {
    let isValid = this.checkValideInput();
    if (isValid == true) {
      this.props.createNewVienchuc(this.state);
    }
  };

  render() {
    let chuyenkhoas = this.state.chuyenkhoaArr;
    let tdhvs = this.state.tdhvArr;
    let chucvus = this.state.chucvuArr;
    let genders = this.state.genderArr;
    let language = this.props.language;
    let {
      hoten,
      gioitinh,
      diachi,
      sdt,
      password,
      email,
      image,
      contentHTML,
      contentMarkdown,
      description,
      id_xaphuong,
      id_chuyenkhoa,
      id_tdhv,
      id_chucvu,
      action,
      vienchucEditId,
    } = this.state;

    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          toggle={() => {
            this.toggle();
          }}
          className={"modal-user-container"}
          size="lg"
        >
          <ModalHeader
            toggle={() => {
              this.toggle();
            }}
          >
            Thêm viên chức èdf
          </ModalHeader>
          <ModalBody>
            <div className="col-12"></div>
            <div className="col-3">
              <label>Email: </label>
              <input
                className="form-control"
                type="email"
                value={this.state.email}
                onChange={(event) => {
                  this.handleOnChangeInput(event, "email");
                }}
              />
            </div>
            <div className="col-3">
              <label>Password</label>
              <input
                className="form-control"
                // type="Password"
                value={this.state.password}
                onChange={(event) => {
                  this.handleOnChangeInput(event, "password");
                }}
              />
            </div>
            <div className="col-3">
              <label>Họ tên:</label>
              <input
                className="form-control"
                type="text"
                value={this.state.hoten}
                onChange={(event) => {
                  this.handleOnChangeInput(event, "hoten");
                }}
              />
            </div>
            <div className="col-3">
              <label>Địa chỉ:</label>
              <input
                className="form-control"
                type="text"
                value={this.state.diachi}
                onChange={(event) => {
                  this.handleOnChangeInput(event, "diachi");
                }}
              />
            </div>
            <div className="col-3">
              <label>Số điện thoại:</label>
              <input
                className="form-control"
                type="text"
                value={this.state.sdt}
                onChange={(event) => {
                  this.handleOnChangeInput(event, "sdt");
                }}
              />
            </div>
            <div className="col-3">
              <label>
                <FormattedMessage id="manage-vienchuc.gender" />
              </label>
              <select
                className="form-control"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "gender");
                }}
              >
                {genders &&
                  genders.length > 0 &&
                  genders.map((item, index) => {
                    return <option value={gioitinh}>{item}</option>;
                  })}
              </select>
            </div>
            <div className="col-3">
              <label>Chuyên khoa:</label>
              <select
                className="form-control"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "id_chuyenkhoa");
                }}
              >
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
            </div>
            <div className="col-3">
              <label>Trình độ học vấn: </label>
              <select
                className="form-control"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "id_tdhv");
                }}
              >
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
              <label>Chức vụ: </label>
              <select
                className="form-control"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "id_chucvu");
                }}
              >
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
              style={{ height: "500px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={handleEditorChange}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              className="px-3"
              color="primary"
              onClick={() => {
                this.handleAddNewUser();
              }}
            >
              Save Changes
            </Button>{" "}
            <Button
              className="px-3"
              color="secondary"
              onClick={() => {
                this.toggle();
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImgURL}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // language: state.app.language,
    chuyenkhoaRedux: state.admin.chuyenkhoas, // vì đã kai báo ở rootReduces
    tdhvRedux: state.admin.tdhvs,
    chucvuRedux: state.admin.chucvus,
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getChuyenkhoaStart: () => dispatch(actions.fetchChuyenkhoaStart()),
    getTdhvStart: () => dispatch(actions.fetchTdhvStart()),
    getChucvuStart: () => dispatch(actions.fetchChucvuStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalVienchuc);
