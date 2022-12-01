import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./LichSuKham.scss";
import HomeHeaderNew from "../Auth/HomePageNew/HomeHeaderNew";
import HomeFooter from "../HomePage/HomeFooter";
import { getHinhAnhChiDinhIdDangKyService } from "../../services/hinhanhPCDService";
import { toast } from "react-toastify";
import DatePicker from "../../components/Input/DatePicker";
import { emitter } from "../../utils/emitter";
import ModalDoiMatKhau from "./modalDoiMatKhau";
import ModalDoiThongTin from "../Patient/Doctor/Modal/modalDoiThongTin";
import { getBenhNhanDangkyIdService } from "../../services/dangkyService";
import * as actions from "../../store/actions";
import { createLogger } from "redux-logger";
import { createGlobalStyle } from "styled-components";
import moment from "moment";
import ModalChitietdatkham from "./modalChitietdatkham";
// import imgTest from "../../../../../../File ảnh chỉ định/Upload/Company/noisoi_obung.png";
class LichSuKham extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openChiTiet: false,
      LichSuKham: [],
      data: {},
    };
  }
  async componentDidMount() {
    let items = JSON.parse(localStorage.getItem("persist:benhnhan"));
    let dataUser = JSON.parse(items?.benhnhanInfo);
    console.log("=============> dataUser ngoài for", dataUser);
    if (items && dataUser?.benhnhan?.id) {
      console.log("đúng");
      let thongtin = await getBenhNhanDangkyIdService(dataUser?.benhnhan?.id);
      console.log("++++++++++ thông tin", thongtin);
      if (thongtin.errCode === 0) {
        this.setState({
          LichSuKham: thongtin.data,
        });
      }
    }
  }

  // async componentDidUpdate(prevProps, presState, snapshot) {
  //   console.log("update");
  //   let items = JSON.parse(localStorage.getItem("persist:benhnhan"));
  //   let dataUser = JSON.parse(items?.benhnhanInfo);
  //   if (items && dataUser?.benhnhan?.id) {
  //     let thongtin = await getBenhNhanDangkyIdService(dataUser.benhnhan.id);
  //     if (thongtin.errCode === 0) {
  //       this.setState({
  //         LichSuKham: thongtin.data,
  //       });
  //     }
  //   }
  // }

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleChiTiet = async (data) => {
    console.log("it dang ky", data.id);
    let api = await getHinhAnhChiDinhIdDangKyService(data.id);
    console.log("api", api);
    this.setState({
      openChiTiet: true,
      data: data,
    });
  };
  toggle = () => {
    this.setState({
      openChiTiet: !this.state.openChiTiet,
    });
  };
  render() {
    let genders = this.state.genderArr;
    let {
      id,
      hoten,
      ngaysinh,
      gioitinh,
      sdt,
      email,
      nghenghiep,
      diachi,
      cccd,
    } = this.state;
    let img =
      "../../../../../../File ảnh chỉ định/Upload/Company/noisoi_obung.png";
    return (
      <>
        <HomeHeaderNew
          isShow={true}
          isShowBanner={false}
          pageInformation={true}
        />
        <div>
          test hình ngoài thư mục react
          <div
            style={{
              backgroundImage: `url(${img})`,
            }}
          >
            <img src={img}></img>
          </div>
        </div>
        <div className="information-container">
          <div
            className=""
            style={{
              fontSize: "20px",
              marginBottom: "20px",
              borderBottom: "1px solid #3161ad",
              width: "90%",
              color: "white",
            }}
          >
            <span
              style={{
                paddingBottom: "5px",
                paddingTop: "5px",
                paddingLeft: "20px",
                paddingRight: "20px",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                background: "#3161ad",
              }}
            >
              <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIuNzYwOTkgMjIuNTAwMUMyLjQ1ODgzIDIyLjM2NzkgMi4yMzIyMSAyMi4xNjAxIDIuMjUxMSAyMS43ODI0QzIuMjY5OTggMjEuNDA0NyAyLjU3MjE0IDIxLjE0MDQgMi45Njg3MyAyMS4xNDA0QzQuMjE1MTMgMjEuMTQwNCA1LjQ2MTUzIDIxLjE0MDQgNi43MjY4MiAyMS4xNDA0QzExLjA3MDMgMjEuMTQwNCAxNS40MTM5IDIxLjE0MDQgMTkuNzU3NCAyMS4xNDA0QzE5LjgxNCAyMS4xNDA0IDE5Ljg3MDcgMjEuMTQwNCAxOS45MDg1IDIxLjE0MDRDMTkuOTA4NSAyMC41MTcyIDE5LjkyNzQgMTkuOTEyOCAxOS45MDg1IDE5LjMwODVDMTkuODUxOCAxOC4zMDc2IDE5LjgxNCAxNy4zMDY3IDE5LjYyNTIgMTYuMzA1OEMxOS40OTMgMTUuNTg4MiAxOS4xNzIgMTUuMDIxNyAxOC42MjQzIDE0LjU0OTVDMTcuODY4OSAxMy44ODg2IDE2Ljk4MTMgMTMuNDE2NCAxNi4wNzQ4IDEzLjAwMUMxNi4wMzcxIDEzLjA3NjUgMTUuOTk5MyAxMy4xNTIxIDE1Ljk2MTUgMTMuMjI3NkMxNS4wMTczIDE1LjE1MzggMTQuMDkxOSAxNy4wOTkgMTIuOTM5OSAxOC45MTE5QzEyLjc3IDE5LjE5NTIgMTIuNTgxMSAxOS40Nzg1IDEyLjM5MjMgMTkuNzQyOUMxMi4wNzEyIDIwLjE5NjEgMTEuNDg1OCAyMC4xOTYxIDExLjIwMjUgMTkuNzI0QzEwLjY3MzggMTguODc0MiAxMC4xMDcyIDE4LjAyNDQgOS42MzUwOSAxNy4xMzY4QzguOTM2MzUgMTUuODUyNiA4LjMxMzE1IDE0LjUzMDYgNy42MzMyOSAxMy4yMDg3QzcuNTk1NTIgMTMuMTMzMiA3LjU1Nzc1IDEzLjA3NjUgNy41MTk5OCAxMi45ODIxQzYuODAyMzYgMTMuMzAzMSA2LjEyMjUgMTMuNjgwOCA1LjQ4MDQyIDE0LjExNTJDNS4zNDgyMiAxNC4yMDk2IDUuMjE2MDMgMTQuMzIyOSA1LjA4MzgzIDE0LjQxNzNDNC4yMzQwMSAxNS4wNDA1IDMuOTEyOTcgMTUuOTQ3IDMuODM3NDMgMTYuOTY2OEMzLjc4MDc4IDE3Ljg5MjIgMy43OTk2NiAxOC43OTg2IDMuNzYxODkgMTkuNjg2MkMzLjc2MTg5IDE5Ljg3NTEgMy43MDUyNCAyMC4wODI4IDMuNjEwODEgMjAuMjUyOEMzLjQ3ODYyIDIwLjQ5ODMgMy4xNzY0NiAyMC41NzM4IDIuOTEyMDcgMjAuNDk4M0MyLjYyODggMjAuNDAzOCAyLjQzOTk1IDIwLjE5NjEgMi40Mzk5NSAxOS44OTRDMi40Mzk5NSAxOC45ODc1IDIuNDAyMTggMTguMDgxIDIuNDU4ODMgMTcuMTkzNEMyLjQ5NjYgMTYuNjQ1OCAyLjYwOTkxIDE2LjA5ODEgMi43NDIxMSAxNS41NjkzQzIuOTY4NzMgMTQuNjQ0IDMuNTczMDQgMTMuOTQ1MiA0LjI5MDY3IDEzLjM1OThDNS4yNzI2OCAxMi41NDc3IDYuNDA1NzggMTEuOTgxMiA3LjU3NjY0IDExLjUwOTFDNy45NzMyMiAxMS4zNTggOC4yOTQyNiAxMS41MDkxIDguNDgzMTEgMTEuODg2OEM5LjE4MTg2IDEzLjI4NDIgOS44NjE3MSAxNC43MDA2IDEwLjU3OTMgMTYuMDk4MUMxMC45MTkzIDE2Ljc3OCAxMS4zMzQ3IDE3LjQyIDExLjcxMjQgMTguMDk5OUMxMS43MzEzIDE4LjEzNzcgMTEuNzUwMiAxOC4xNTY1IDExLjc4OCAxOC4xOTQzQzExLjk5NTcgMTcuODU0NCAxMi4yMDM0IDE3LjUzMzMgMTIuMzczNCAxNy4xNzQ1QzEzLjI3OTkgMTUuNDc0OSAxNC4xNDg2IDEzLjc1NjQgMTUuMDE3MyAxMi4wMTlDMTUuMzAwNiAxMS40NzEzIDE1LjU4MzggMTEuMzM5MSAxNi4xNTA0IDExLjU4NDZDMTcuMzU5IDEyLjA3NTYgMTguNDkyMSAxMi42NjEgMTkuNDc0MSAxMy41MTA5QzIwLjI4NjIgMTQuMjA5NiAyMC43NzcyIDE1LjA1OTQgMjAuOTQ3MSAxNi4xMTdDMjEuMjExNSAxNy42NDY3IDIxLjI2ODIgMTkuMTc2MyAyMS4yODcxIDIwLjcwNkMyMS4yODcxIDIxLjAwODIgMjEuMjg3MSAyMS4zMTAzIDIxLjMwNiAyMS42MTI1QzIxLjM0MzcgMjIuMDI4IDIxLjE5MjYgMjIuMzMwMSAyMC43OTYxIDIyLjQ4MTJDMTQuNzkwNyAyMi41MDAxIDguNzY2MzkgMjIuNTAwMSAyLjc2MDk5IDIyLjUwMDFaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTEuNTgwMiAxLjVDMTMuMDM0NCAxLjUxODg4IDE0LjIyNDEgMS44NTg4MSAxNS4yMDYxIDIuNzY1MjlDMTYuMDc0OCAzLjU3NzM0IDE2LjU0NyA0LjU5NzEyIDE2LjczNTggNS43NDkxQzE3LjAwMDIgNy4zOTIwOSAxNi41MDkyIDguODY1MTEgMTUuNjIxNiAxMC4yMjQ4QzE0LjgwOTUgMTEuNDcxMiAxMy42NzY1IDEyLjM3NzcgMTIuNDMgMTMuMTUyQzEyLjI0MTIgMTMuMjY1MyAxMi4wNTI0IDEzLjM3ODYgMTEuODQ0NiAxMy40OTE5QzExLjQ2NjkgMTMuNzE4NSAxMS4wNzAzIDEzLjYyNDEgMTAuODYyNiAxMy4yODQyQzEwLjY1NDkgMTIuOTYzMSAxMC43NjgyIDEyLjU2NjUgMTEuMTQ1OSAxMi4zMzk5QzExLjk1NzkgMTEuODQ4OSAxMi43NTExIDExLjMzOSAxMy40MzA5IDEwLjY5NjlDMTQuNDUwNyA5LjczMzgxIDE1LjE4NzIgOC42MDA3MiAxNS40MTM5IDcuMjAzMjRDMTUuNjQwNSA1LjgwNTc2IDE1LjA3MzkgNC4xMjUgMTMuODA4NiAzLjM2OTZDMTMuMzE3NiAzLjA4NjMzIDEyLjgwNzcgMi45MzUyNSAxMi4yNDEyIDIuODc4NkMxMS4zMTU4IDIuODAzMDYgMTAuNDA5NCAyLjkxNjM3IDkuNjE2MiAzLjQyNjI2QzguNjkwODQgNC4wMTE2OSA4LjE5OTgzIDQuODgwNCA4LjA4NjUyIDUuOTM3OTVDNy44OTc2NyA3LjUwNTQgOC4zNjk4IDguODQ2MjIgOS41NTk1NSA5Ljg4NDg5QzkuODk5NDcgMTAuMTg3MSAxMC4zMzM4IDEwLjM5NDggMTAuNzMwNCAxMC42NDAzQzExLjAzMjYgMTAuODEwMyAxMS4xODM2IDExLjExMjQgMTEuMTA4MSAxMS40MTQ2QzEwLjk5NDggMTEuODQ4OSAxMC41NjA0IDEyLjA1NjcgMTAuMTYzOSAxMS44Njc4QzguNjM0MTkgMTEuMTY5MSA3LjU3NjYzIDEwLjAzNiA3LjAyODk3IDguNDMwNzZDNi41NzU3MyA3LjA4OTkzIDYuNTU2ODUgNS43NDkxIDcuMTIzMzkgNC40MjcxNkM3Ljc2NTQ4IDIuODQwODMgOC45OTMgMS44Nzc3IDEwLjc0OTMgMS41OTQ0MkMxMS4wNzAzIDEuNTM3NzcgMTEuMzkxNCAxLjUxODg4IDExLjU4MDIgMS41WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTE2LjI0NDggMTguNTE1NEMxNS45ODA0IDE4LjUxNTQgMTUuNzUzOCAxOC41MTU0IDE1LjUyNzEgMTguNTE1NEMxNS4xMzA2IDE4LjQ5NjUgMTQuODQ3MyAxOC4yMTMyIDE0Ljg0NzMgMTcuODE2N0MxNC44NDczIDE3LjQzOSAxNS4xNDk0IDE3LjE3NDYgMTUuNTQ2IDE3LjE1NTdDMTUuNzE2IDE3LjE1NTcgMTUuODY3MSAxNy4xNTU3IDE2LjAzNyAxNy4xNTU3QzE2LjA5MzcgMTcuMTU1NyAxNi4xNTAzIDE3LjE1NTcgMTYuMjQ0OCAxNy4xNTU3QzE2LjI0NDggMTYuOTEwMiAxNi4yNDQ4IDE2LjY4MzYgMTYuMjQ0OCAxNi40NTY5QzE2LjI2MzcgMTUuOTg0OCAxNi42NDE0IDE1LjY2MzggMTcuMDc1NyAxNS43NTgyQzE3LjM1OSAxNS44MTQ5IDE3LjU2NjcgMTYuMDYwNCAxNy41ODU2IDE2LjM2MjVDMTcuNTg1NiAxNi40OTQ3IDE3LjU4NTYgMTYuNjI2OSAxNy41ODU2IDE2Ljc1OTFDMTcuNTg1NiAxNi44NzI0IDE3LjU4NTYgMTcuMDA0NiAxNy41ODU2IDE3LjE1NTdDMTcuODMxMSAxNy4xNTU3IDE4LjA1NzcgMTcuMTU1NyAxOC4zMDMyIDE3LjE1NTdDMTguNzE4NyAxNy4xNTU3IDE5LjAwMiAxNy40MzkgMTkuMDAyIDE3LjgxNjdDMTkuMDAyIDE4LjE5NDQgMTguNjk5OCAxOC40Nzc2IDE4LjMwMzIgMTguNDk2NUMxOC4wNzY2IDE4LjQ5NjUgMTcuODUgMTguNDk2NSAxNy41ODU2IDE4LjQ5NjVDMTcuNTg1NiAxOC43NDIgMTcuNTg1NiAxOC45Njg2IDE3LjU4NTYgMTkuMTk1M0MxNy41ODU2IDE5LjYxMDcgMTcuMzAyMyAxOS44OTQgMTYuOTI0NiAxOS44OTRDMTYuNTQ2OSAxOS44OTQgMTYuMjYzNyAxOS42MTA3IDE2LjI0NDggMTkuMjE0MUMxNi4yNDQ4IDE5LjAwNjQgMTYuMjQ0OCAxOC43Nzk4IDE2LjI0NDggMTguNTE1NFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo="></img>
              &nbsp; Lịch Sử Đặt Khám
            </span>
          </div>
          {this.state.LichSuKham !== [] &&
            this.state.LichSuKham.length > 0 &&
            this.state.LichSuKham.map((item, index) => {
              let ngay = moment(item?.dangkylichbacsikham?.ngay).format("DD");
              let thangnam = moment(item?.dangkylichbacsikham?.ngay).format(
                "MM/YYYY"
              );

              return (
                <div className="lichsukham">
                  <div className="table">
                    <div
                      className="time"
                      style={{
                        background: "#e5ebf5",
                        borderRadius: "15px",
                        width: "19%",
                        height: "100%",
                        boxShadow:
                          "inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgb(104, 145, 162)",
                        //   borderRadiusRightTop
                      }}
                    >
                      <div
                        className="day"
                        style={{
                          fontSize: "50px",
                          marginTop: "10px",
                          marginLeft: "30px",
                          height: "55px",
                          color: "#8cb1db",
                        }}
                      >
                        {ngay}
                      </div>
                      <div>
                        <span
                          className="moth-year"
                          style={{
                            fontSize: "12px",
                            fontWeight: "500",
                            position: "absolute",
                            paddingLeft: "-1px",
                          }}
                        >
                          {thangnam} {item?.dangkylichkham?.khunggio}
                        </span>
                      </div>
                    </div>
                    <div className="thong-tin">
                      <div
                        className="name"
                        style={{ fontWeight: "600", fontSize: "17px" }}
                      >
                        {item?.dangkybenhnhan?.hoten}
                      </div>
                      <div className="name-doctor" style={{ marginTop: "5px" }}>
                        Bác Sĩ Khám:{" "}
                        {
                          item?.dangkylichbacsikham?.lichbacsikhamvienchuc
                            ?.hoten
                        }
                      </div>
                      <div className="phong" style={{ marginTop: "5px" }}>
                        {
                          item?.dangkylichbacsikham?.lichbacsikhamphong
                            ?.tenphong
                        }
                      </div>
                    </div>
                    {item?.trangthaikham == "Chưa khám" ? (
                      <div
                        className="trangthai-chuakham"
                        onClick={() => this.handleChiTiet(item)}
                      >
                        <span>Chưa khám</span>
                      </div>
                    ) : (
                      <>
                        {item?.trangthaikham == "Đã lập phiếu khám" ? (
                          <div
                            className="trangthai-dakham"
                            onClick={() => this.handleChiTiet(item)}
                          >
                            <span>Đã lập phiếu khám</span>
                          </div>
                        ) : (
                          <>
                            {item?.trangthaikham == "Đã lập đơn thuốc" ? (
                              <div
                                className="trangthai-hoanthanh"
                                onClick={() => this.handleChiTiet(item)}
                              >
                                <span>Đã lập đơn thuốc</span>
                              </div>
                            ) : null}
                          </>
                        )}
                      </>
                    )}
                  </div>
                  <ModalChitietdatkham
                    isOpen={this.state.openChiTiet}
                    toggleFromParent={this.toggle}
                    data={this.state.data}
                  />
                </div>
              );
            })}

          {/* <div className="lichsukham">
            <div className="table">
              <div
                className="time"
                style={{
                  background: "#e5ebf5",
                  borderRadius: "15px",
                  width: "19%",
                  height: "100%",
                  boxShadow:
                    "inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgb(104, 145, 162)",
                  //   borderRadiusRightTop
                }}
              >
                <div
                  className="day"
                  style={{
                    fontSize: "50px",
                    marginTop: "10px",
                    marginLeft: "30px",
                    height: "55px",
                    color: "#8cb1db",
                  }}
                >
                  30
                </div>
                <div>
                  <span
                    className="moth-year"
                    style={{
                      fontSize: "12px",
                      fontWeight: "500",
                      position: "absolute",
                      paddingLeft: "-1px",
                    }}
                  >
                    09/2022 17:00-17:30
                  </span>
                </div>
              </div>
              <div className="thong-tin">
                <div
                  className="name"
                  style={{ fontWeight: "600", fontSize: "17px" }}
                >
                  SIN
                </div>
                <div className="name-doctor" style={{ marginTop: "5px" }}>
                  Bác Sĩ Khám: Nguyễn Văn A
                </div>
                <div className="phong" style={{ marginTop: "5px" }}>
                  Phòng 01
                </div>
              </div>
              <div className="trangthai-chuakham">
                <span>Chưa Khám</span>
              </div>
            </div>
          </div>
          <div className="lichsukham">
            <div className="table">
              <div
                className="time"
                style={{
                  background: "#e5ebf5",
                  borderRadius: "15px",
                  width: "19%",
                  height: "100%",
                  boxShadow:
                    "inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgb(104, 145, 162)",
                  //   borderRadiusRightTop
                }}
              >
                <div
                  className="day"
                  style={{
                    fontSize: "50px",
                    marginTop: "10px",
                    marginLeft: "30px",
                    height: "55px",
                    color: "#8cb1db",
                  }}
                >
                  30
                </div>
                <div>
                  <span
                    className="moth-year"
                    style={{
                      fontSize: "12px",
                      fontWeight: "500",
                      position: "absolute",
                      paddingLeft: "-1px",
                    }}
                  >
                    09/2022 17:00-17:30
                  </span>
                </div>
              </div>
              <div className="thong-tin">
                <div
                  className="name"
                  style={{ fontWeight: "600", fontSize: "17px" }}
                >
                  SIN
                </div>
                <div className="name-doctor" style={{ marginTop: "5px" }}>
                  Bác Sĩ Khám: Nguyễn Văn A
                </div>
                <div className="phong" style={{ marginTop: "5px" }}>
                  Phòng 01
                </div>
              </div>
              <div className="trangthai-chokham">
                <span>Chờ Khám</span>
              </div>
            </div>
          </div> */}
        </div>
        <HomeFooter />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedInBN: state.benhnhan.isLoggedInBN,
    language: state.app.language,
    benhnhanInfo: state.benhnhan.benhnhanInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // navigate: (path) => dispatch(push(path)),
    benhnhanLoginSuccess: (benhnhanInfor) =>
      dispatch(actions.benhnhanLoginSuccess(benhnhanInfor)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LichSuKham);
