import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../../utils/emitter";
import { toast } from "react-toastify";
import ModalThemthuoc from "./ModalThemthuoc";
import {
  getAllTempService,
  createTempService,
  deleteTempService,
} from "../../.././services/tempService";
import { createPhieukhamService } from "../../.././services/phieukhamService";
import { bulkCreateChidinh } from "../../.././services/chidinhService";
import { postChidinhAppointment } from "../../.././services/benhnhanService";
import moment from "moment";
// import { history } from '../../../redux'
class ModalChuandoan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrTemp: [],
      chuandoan: "",
      loidan: "",
      ghichu: "",
      id_nguoidung: "",
      isOpenTemp: false,
    };

    this.listenToEmitter();
  }

  listenToEmitter = () => {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        chuandoan: "",
        loidan: "",
        ghichu: "",
      });
    });
  };

  async componentDidMount() {
    await this.getAllTempFromReact();

    // this.state.id_dangky = this.props.id_dangky
  }

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
    let arrInput = ["chuandoan", "loidan"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleSavePhieukham = async () => {
    if (this.props.dangky.dangkybenhnhan.id) {
      this.setState({
        id_nguoidung: this.props.dangky.dangkybenhnhan.id,
      });
    }
    let isValid = this.checkValideInput();
    if (isValid == true) {
      let { arrTemp, chuandoan, loidan, ghichu, id_nguoidung } = this.state;
      let result = [];

      if (arrTemp && arrTemp.length > 0) {
        arrTemp.map((item, index) => {
          let object = {};
          object.id_thuoc = item.id_thuoc;
          object.soluong = item.soluong;
          object.lieudung = item.lieudung;
          object.cachdung = item.cachdung;
          object.id = item.id;
          object.id_nguoidung = id_nguoidung;
          result.push(object);
        });
      } else {
        toast.error("Chưa thêm được phiếu khám");
        return;
      }
      let res1 = await getAllTempService();
      let res = await bulkCreateChidinh({
        arrThuoc: result,
        id_dangky: this.props.currentDangky,
        chuandoan: chuandoan,
        loidan: loidan,
        ghichu: ghichu,
      });

      let res3 = await postChidinhAppointment({
        tenbacsi: this.props.vienchuc.hoten,
        chuandoan: chuandoan,
        loidan: loidan,
        ghichu: ghichu,
        chuyenkhoa:
          this.props.dangky.dangkylichbacsikham.lichbacsikhamphong
            .phongchuyenkhoa.tenchuyenkhoa,
        phong:
          this.props.dangky.dangkylichbacsikham.lichbacsikhamphong.tenphong,
        tenkhungio: this.props.dangky.dangkylichkham.gio,
        ngay: moment(+this.props.dangky.dangkylichbacsikham.ngay).format("ll"),
        tenbenhnhan: this.props.dangky.dangkybenhnhan.hoten,
        gioitinh: this.props.dangky.dangkybenhnhan.gioitinh,
        sdtbacsi: this.props.vienchuc.sdt,
        email: this.props.dangky.dangkybenhnhan.email,
        lieudung: res1.data[0].lieudung,
        cachdung: res1.data[0].cachdung,
        soluong: res1.data[0].soluong,
        tenthuoc: res1.data[0].tempthuoc.tenthuoc,
        dvt: res1.data[0].tempthuoc.dvt,
        lieudung1: res1.data[1].lieudung,
        cachdung1: res1.data[1].cachdung,
        soluong1: res1.data[1].soluong,
        tenthuoc1: res1.data[1].tempthuoc.tenthuoc,
        dvt1: res1.data[1].tempthuoc.dvt,
      });

      if (res && res.errCode == 0) {
        // this.history.push(`/doctor/doctor-manage-patient`);
        toast.success("Tạo chỉ định và phiếu khám thành công");
      } else {
        toast.error("Tạo chỉ định và phiếu khám thất bại");
      }
    }
  };

  handleTemp = () => {
    this.setState({
      isOpenTemp: true,
    });
  };

  toggleTempModal = () => {
    this.setState({
      isOpenTemp: !this.state.isOpenTemp,
    });
  };

  getAllTempFromReact = async () => {
    let response = await getAllTempService();
    if (response && response.errCode === 0) {
      this.setState({
        arrTemp: response.data,
      });
    }
  };

  createTemp = async (data) => {
    data.id_nguoidung = this.props.dangky.dangkybenhnhan.id;

    try {
      let response = await createTempService(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllTempFromReact();
        this.setState({
          isOpenTemp: false,
        });

        // emitter.emit('EVENT_CLEAR_MODAL_DATA', { 'id': 'your id' })
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleDeleteTemp = async (temp) => {
    try {
      let res = await deleteTempService(temp.id);
      if (res && res.errCode === 0) {
        await this.getAllTempFromReact();
        toast.success("Xóa Thuốc thành công!");
      } else {
        alert(res.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    let arrTemp = this.state.arrTemp;
    return (
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
          Chuẩn đoán
        </ModalHeader>
        <ModalBody>
          <ModalThemthuoc
            isOpen={this.state.isOpenTemp}
            toggleFromParent={this.toggleTempModal}
            createTemp={this.createTemp}
          />
          <div className="modal-user-body">
            <div className="col-12 ">
              <table style={{ width: "100%" }}>
                <tr>
                  <th>STT</th>
                  <th>Tên thuốc</th>
                  <th>Liều dùng</th>
                  <th>Cách dùng</th>
                  <th>Số lượng</th>
                  <th>Đơn vị tính</th>
                  <th>Actions</th>
                </tr>
                {arrTemp &&
                  arrTemp.map((item, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.tempthuoc.tenthuoc}</td>
                        <td>{item.lieudung}</td>
                        <td>{item.cachdung}</td>
                        <td>{item.soluong}</td>
                        <td>{item.tempthuoc.dvt}</td>
                        <button
                          className="btn-delete"
                          onClick={() => this.handleDeleteTemp(item)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </tr>
                    );
                  })}
              </table>
              <div className="input-container">
                <label> Chuẩn đoán</label>
                <input
                  type="text"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "chuandoan");
                  }}
                  value={this.state.tenphong}
                ></input>
              </div>
              <div className="input-container">
                <label> Lời dặn</label>
                <input
                  type="text"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "loidan");
                  }}
                  value={this.state.tenphong}
                ></input>
              </div>
              <div className="input-container">
                <label> Ghi chú</label>
                <input
                  type="text"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "ghichu");
                  }}
                  value={this.state.tenphong}
                ></input>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="px-3"
            color="primary"
            style={{ marginRight: "420px" }}
            onClick={() => {
              this.handleTemp();
            }}
          >
            Tạo thêm thuốc
          </Button>
          {/* <div className='mx-1' style={{ marginRight: '200px' }} >
                        <button className='btn btn-primary'
                            onClick={() => this.handleAddNewTinhthanh()}
                        >
                            <i className='fas fa-plus mx-2'></i>
                            Thêm Tỉnh Thành
                        </button>
                    </div> */}
          <Button
            className="px-3"
            color="primary"
            onClick={() => {
              this.handleSavePhieukham();
            }}
          >
            Lưu toa thuốc
          </Button>{" "}
          <Button
            className="px-3"
            color="secondary"
            onClick={() => {
              this.toggle();
            }}
          >
            Thoát
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalChuandoan);
