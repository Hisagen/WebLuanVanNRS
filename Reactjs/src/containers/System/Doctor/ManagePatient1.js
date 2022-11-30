import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";
import DataPicker from "../../../components/Input/DatePicker";
import {
  getBacsiDangkyIdService,
  getBacsiOneDangkyIdService,
  getVienchucDangkyIdService,
} from "../../.././services/dangkyService";
import { createPhieukhamService } from "../../.././services/phieukhamService";
import {
  getDangkyChidinhIdService,
  getDangkyChidinhIdService1,
} from "../../.././services/chidinhService";
import "./ManagePatient1.scss";
import moment from "moment";
import { emitter } from "../../../utils/emitter";
import ModalChuandoan1 from "./ModalChuandoan1";
class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // currentDate: moment(new Date()).startOf('day').valueOf(),
      dataPatient: {},
      isOpenChuandoan1: false,
      dangky: {},
      chidinh: {},
      chidinh1: {},
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

  handleChuandoan1 = async (dangky) => {
    let respone = await getDangkyChidinhIdService(dangky.id);
    let respone1 = await getDangkyChidinhIdService1(dangky.id);
    this.setState({
      isOpenChuandoan1: true,
      dangky: dangky,
      chidinh: respone.data,
      chidinh1: respone1.data,
    });
  };

  toggleChuandoanModal1 = () => {
    this.setState({
      isOpenChuandoan1: !this.state.isOpenChuandoan1,
    });
  };

  render() {
    let dataPatient = this.state.dataPatient;
    let currentChidinh = this.state.chidinh;
    let currentChidinh1 = this.state.chidinh1;
    return (
      <div className="manage-patient-container">
        <ModalChuandoan1
          isOpen={this.state.isOpenChuandoan1}
          toggleFromParent={this.toggleChuandoanModal1}
          currentDangky1={this.state.dangky}
          currentChidinh={currentChidinh}
          currentChidinh1={currentChidinh1}
        />
        <div className="m-p-tilte">Quản lý bệnh nhân đã khám</div>
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
                  if (item.trangthai === "Đã khám") {
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
                            onClick={() => this.handleChuandoan1(item)}
                          >
                            Xem chi tiết chỉ định
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
