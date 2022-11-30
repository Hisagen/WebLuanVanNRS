import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";
import DataPicker from "../../../components/Input/DatePicker";
import {
  getBacsiDangkyIdService,
  getBacsiOneDangkyIdServic,
  getVienchucDangkyIdService,
} from "../../.././services/dangkyService";
import { createPhieukhamService } from "../../.././services/phieukhamService";
import "./ManagePatient.scss";
import moment from "moment";
import { emitter } from "../../../utils/emitter";
import ModalChuandoan from "./ModalChuandoan";
class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // currentDate: moment(new Date()).startOf('day').valueOf(),
      dataPatient: {},
      isOpenChuandoan: false,
      dangky: "",
    };
  }

  getDataPatient = async (vienchuc) => {
    let res = await getVienchucDangkyIdService({
      id_vienchuc: vienchuc.id,
      // ngay: formatedDate
    });
    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data,
      });
    }
  };
  async componentDidMount() {
    let { vienchuc } = this.props;
    // let { currentDate } = this.state
    // let formatedDate = new Date(currentDate).getTime();
    this.getDataPatient(vienchuc);
  }

  //hàm dùng để in hoa kí tự đầu tiên
  async componentDidUpdate(prevProps, presState, snapshot) {}

  // handleOnchangeDatePicker = (date) => {
  //     this.setState({
  //         currentDate: date[0]
  //     }, () => {
  //         let { vienchuc } = this.props
  //         let { currentDate } = this.state
  //         let formatedDate = new Date(currentDate).getTime();
  //         this.getDataPatient(vienchuc, formatedDate)
  //     })
  // }

  handleChuandoan = (dangky) => {
    this.setState({
      isOpenChuandoan: true,
      dangky: dangky,
    });
  };

  toggleChuandoanModal = () => {
    this.setState({
      isOpenChuandoan: !this.state.isOpenChuandoan,
    });
  };

  createPhieukham = async (data) => {
    try {
      let response = await createPhieukhamService(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getDataPatient(this.props.vienchuc);
        this.setState({
          isOpenChuandoan: false,
        });

        emitter.emit("EVENT_CLEAR_MODAL_DATA", { id: "your id" });
      }
    } catch (e) {
      console.log(e);
    }
  };

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getNgay = (a) => {
    let allDays = "";
    let object = {};
    let labelVi = moment(new Date()).add(a, "days").format("dddd - DD/MM");
    object.label = this.capitalizeFirstLetter(labelVi);
    object.value = moment(new Date()).add(a, "days").startOf("day").valueOf();
    allDays = object;
    return allDays;
  };

  render() {
    let dataPatient = this.state.dataPatient;
    // let d4 = moment(1651597200000);
    return (
      <div className="manage-patient-container">
        <ModalChuandoan
          isOpen={this.state.isOpenChuandoan}
          toggleFromParent={this.toggleChuandoanModal}
          createPhieukham={this.createPhieukham}
          currentDangky={this.state.dangky.id}
          vienchuc={this.props.vienchuc}
          dangky={this.state.dangky}
        />
        <div className="m-p-tilte">
          Quản lý danh sách bệnh nhân đăng ký khám và khám
        </div>
        <div className="manage-patient-body row">
          <div className="col-12 table-manage-patient">
            <table style={{ width: "100%" }}>
              <tr>
                <th>STT</th>
                <th>Ngày</th>
                <th>Buổi</th>
                <th>Phòng</th>
                <th>Họ tên</th>
                <th>Email</th>
                <th>Giới tính</th>
                <th>Trạng thái</th>
                <th>Actions</th>
              </tr>
              {dataPatient &&
                dataPatient.length > 0 &&
                dataPatient.map((item, index) => {
                  if (item.trangthai === "Chưa khám") {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          {moment(+item.dangkylichbacsikham.ngay).format("ll")}
                        </td>
                        <td>{item.dangkylichkham.gio}</td>
                        <td>
                          {item.dangkylichbacsikham.lichbacsikhamphong.tenphong}
                        </td>
                        <td>{item.dangkybenhnhan.hoten}</td>
                        <td>{item.dangkybenhnhan.email}</td>
                        <td>{item.dangkybenhnhan.gioitinh}</td>
                        <td>{item.trangthai}</td>
                        <td>
                          <button
                            className="mp-btn-confirm"
                            onClick={() => this.handleChuandoan(item)}
                          >
                            Chuẩn đoán
                          </button>
                        </td>
                      </tr>
                    );
                  }
                })}
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    vienchuc: state.vienchuc.vienchucInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
