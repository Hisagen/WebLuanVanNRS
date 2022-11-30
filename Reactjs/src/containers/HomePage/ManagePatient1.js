import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";
import DataPicker from "../../components/Input/DatePicker";
import {
  getBacsiDangkyIdService,
  getBacsiOneDangkyIdService,
  getVienchucDangkyIdService,
} from "../../services/dangkyService";
import { createPhieukhamService } from "../../services/phieukhamService";
import {
  getBenhNhanChidinhIdService,
  getBenhNhanChidinhIdService1,
  getPhieuKhamChidinhIdService,
} from "../../services/chidinhService";
import "./ManagePatient1.scss";
import moment from "moment";
import { emitter } from "../../utils/emitter";
import ModalChuandoan1 from "./ModalChuandoan1";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ManagePatient1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // currentDate: moment(new Date()).startOf('day').valueOf(),
      dataPatient: {},
      isOpenChuandoan1: false,
      dangky: {},
      phieukham: {},
    };
  }

  //hàm dùng để in hoa kí tự đầu tiên
  async componentDidUpdate(prevProps, presState, snapshot) {}

  handleXemChiTiet = async (phieukham) => {
    let respone = await getPhieuKhamChidinhIdService(phieukham.id);
    this.setState({
      isOpenChuandoan1: true,
      phieukham: respone,
    });
  };

  toggleChuanDoanModal = () => {
    this.setState({
      isOpenChuandoan1: !this.state.isOpenChuandoan1,
    });
  };

  toggle = () => {
    this.props.toggleFromParent();
  };

  render() {
    // let dataPatient = this.state.dataPatient
    let currentChidinh = this.props.currentChidinh;
    let currentChidinh1 = this.props.currentChidinh1;
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        className={"modal-user-container"}
        size="lg"
      >
        <ModalHeader>Danh sách phiếu khám bệnh đã khám</ModalHeader>
        <ModalBody>
          {this.state.isOpenChuandoan1 && (
            <ModalChuandoan1
              isOpen={this.state.isOpenChuandoan1}
              toggleFromParent={this.toggleChuanDoanModal}
              currentPhieukham={this.state.phieukham}
            />
          )}
          <div className="modal-user-body">
            <div className="col-12 ">
              <table style={{ width: "100%" }}>
                <tr>
                  <th>STT</th>
                  <th>ID</th>
                  <th>Chuẩn đoán</th>
                  <th>Lời dặn</th>
                  <th>Ghi chú</th>
                  <th>Actions</th>
                </tr>
                {currentChidinh &&
                  currentChidinh.length > 0 &&
                  currentChidinh.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.id}</td>
                        <td>{item.chuandoan}</td>
                        <td>{item.loidan}</td>
                        <td>{item.ghichu}</td>
                        <button
                          className="btn-edit"
                          onClick={() => this.handleXemChiTiet(item)}
                        >
                          Xem chi tiết
                        </button>
                      </tr>
                    );
                  })}
              </table>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          {" "}
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
  return {
    language: state.app.language,
    vienchuc: state.vienchuc.vienchucInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient1);
