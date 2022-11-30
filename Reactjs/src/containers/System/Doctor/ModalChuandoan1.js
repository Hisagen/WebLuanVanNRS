import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../../utils/emitter";
import { toast } from "react-toastify";
// import ModalThemthuoc from './ModalThemthuoc';
// import { getAllTempService, createTempService, deleteTempService } from '../../.././services/tempService'
// import { createPhieukhamService } from '../../.././services/phieukhamService'
import {
  getDangkyChidinhIdService,
  getDangkyChidinhIdService1,
} from "../../.././services/chidinhService";
import _ from "lodash";
// import { history } from '../../../redux'
class ModalChuandoan1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenTemp: false,
      id_dangky: "",
    };

    // this.listenToEmitter();
  }
  async componentDidMount() {}
  // getAllTempFromReact = async () => {
  //     let response = await getDangkyChidinhIdService(this.props.currentDangky1.id)

  //     if (response && response.errCode === 0) {
  //         this.setState({
  //             arrTemp: response.data
  //         })
  //     }
  // }

  // getAllTempFromReact1 = async () => {
  //     let response = await getDangkyChidinhIdService1(this.props.currentDangky1)
  //     if (response && response.errCode === 0) {
  //         this.setState({
  //             arrTemp1: response.data
  //         })
  //     }
  // }

  toggle = () => {
    this.props.toggleFromParent();
  };

  render() {
    let arrTemp = {};
    arrTemp = this.props.currentChidinh;
    let arrTemp1 = {};
    arrTemp1 = this.props.currentChidinh1;

    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        className={"modal-user-container"}
        size="lg"
      >
        <ModalHeader>Kết quả chuẩn đoán</ModalHeader>
        <ModalBody>
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
                  {/* <th>Chuẩn đoán</th>
                                    <th>Lời dặn</th>
                                    <th>Ghi chú</th> */}
                </tr>
                {arrTemp &&
                  arrTemp.length > 0 &&
                  arrTemp.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.chidinhthuoc.tenthuoc}</td>
                        <td>{item.cachdung}</td>
                        <td>{item.lieudung}</td>
                        <td>{item.soluong}</td>
                        <td>{item.chidinhthuoc.dvt}</td>
                        {/* <td>{item.chidinhphieukham.chuandoan}</td>
                                            <td>{item.chidinhphieukham.loidan}</td>
                                            <td>{item.chidinhphieukham.ghichu}</td> */}
                      </tr>
                    );
                  })}
                {/* {arrTemp && arrTemp.length > arrTemp.length-1 && arrTemp.map((item,index ) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.chidinhphieukham.chuandoan}</td>
                                            <td>{item.chidinhphieukham.loidan}</td>
                                            <td>{item.chidinhphieukham.ghichu}</td>
                                        </tr>
                                    )
                                })
                                } */}
              </table>
              <div className="input-container">
                <label> Chuẩn đoán</label>
                <input
                  type="text"
                  // onChange={(event) => { this.handleOnChangeInput(event, "chuandoan") }}
                  value={
                    arrTemp1 &&
                    arrTemp.length > 0 &&
                    arrTemp1.chidinhphieukham.chuandoan
                  }
                ></input>
              </div>
              <div className="input-container">
                <label> Lời dặn</label>
                <input
                  type="text"
                  // onChange={(event) => { this.handleOnChangeInput(event, "loidan") }}
                  value={
                    arrTemp1 &&
                    arrTemp.length > 0 &&
                    arrTemp1.chidinhphieukham.loidan
                  }
                ></input>
              </div>
              <div className="input-container">
                <label> Ghi chú</label>
                <input
                  type="text"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "ghichu");
                  }}
                  value={
                    arrTemp1 &&
                    arrTemp.length > 0 &&
                    arrTemp1.chidinhphieukham.ghichu
                  }
                ></input>
              </div>
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalChuandoan1);
