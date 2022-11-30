import React, { Component } from "react";
import { connect } from "react-redux";
import "./page1.scss";
import { getBacsiIdService } from "../../../../../services/vienchucService";
import { getOnePhongChuyenkhoaIdService } from "../../../../../services/phongService";
import { checkDangKy } from "../../../../../services/dangkyService";
import moment from "moment";
import ModalLogin from "../modalLogin";
import ModalDangKy from "../modalDangKy";
import { toast } from "react-toastify";
class page1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tennhasx: "",
      resume: "",
      id: "",
      detailDoctor: {},
      giakham: "",
      phong: "",
      trieuchung: "",
      openLogin: false,
      openDangKy: false,
    };
  }

  async componentDidMount() {
    if (this?.props.phong.lichkhamlichbacsikham.id_vienchuc !== undefined) {
      this.setState(
        {
          id: this?.props.phong.lichkhamlichbacsikham.id_vienchuc,
        },
        async () => {
          let res = await getBacsiIdService(this.state.id);
          if (res && res.errCode === 0) {
            this.setState(
              {
                detailDoctor: res?.data,
                giakham: this.formatCash(res?.giakham?.gia_bhyt.toString()),
              },
              async () => {
                let phong = await getOnePhongChuyenkhoaIdService(
                  this.props.phong.id_phong
                );
                this.setState({
                  phong:
                    this?.props.phong.lichkhamlichbacsikham.lichbacsikhamphong
                      .tenphong,
                });
              }
            );
          }
        }
      );
    }
  }

  componentDidUpdate(prevProps, presState, snapshot) {
    if (this.props.trieuchung !== presState.trieuchung) {
      this.setState({
        trieuchung: this.props.trieuchung,
      });
    }
  }
  hanldeTrieuChung = (e) => {
    this.setState(
      {
        trieuchung: e.target.value,
      },
      () => {
        this.props.handletrieuchung(this.state.trieuchung);
      }
    );
  };
  handleLogin = () => {
    this.setState({
      openLogin: true,
    });
  };

  toggleLogin = () => {
    this.setState({
      openLogin: !this.state.openLogin,
    });
  };

  toggleDangKy = () => {
    this.setState({
      openDangKy: !this.state.openDangKy,
    });
  };
  dangnhapthanhcong = async (check) => {
    if (check === true) {
      setTimeout(async () => {
        let items = JSON.parse(localStorage?.getItem("persist:benhnhan"));
        let dataUser = JSON.parse(items?.benhnhanInfo);
        let temp = await checkDangKy({
          id_lichbacsikham: this.props?.phong?.id_lichbacsikham,
          id_benhnhan: dataUser?.benhnhan?.id,
        });
        if (temp === true) {
          toast.error("Bạn Đã Đặt Khám Buổi Này Rồi");
          setTimeout(() => {
            window.location.reload();
          }, 3500);
        }
      }, 5000);
    }
  };
  formatCash(str) {
    return str
      ?.split("")
      ?.reverse()
      ?.reduce((prev, next, index) => {
        return (index % 3 ? next : next + ",") + prev;
      });
  }
  render() {
    let { detailDoctor, giakham, phong } = this.state;
    let day = moment(this.props.phong?.lichkhamlichbacsikham?.ngay).format(
      "DD/MM/YYYY"
    );

    return (
      <div className="container-page1 ">
        <div className="table1">
          <div className="img animate__animated animate__slideInRight">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKaSURBVHgB1VVLbhpBEK3qYbCVTcgJzBHsE9icwOQEGMlEysr2xo6xIk9kMcM4C+xVJAaJcALgBPgIzgnAN8CbIBioSjVk8MDw8WflJyE13dX9qqtfvQF478BVi5ZVTZgbfhoV7EtoEoATk03YYeAugGrkzw5rryKw7UoaDCoxYY0A7r6f5+7C64Xr8jYyHjPAlhD+Xka0kMB2vRICJ/s9M2tZ2S6sgOP8SrKKWXJSO3+a+wHrYBe9y4LrWfBCFBzPcn56pTVB5QOnWKnCK2G75fqVLm0IaiZCYabPfuSaugyW/KaJSP3D/wMM4mbWMKCkxREh0Nkrxo51/rUTzOlDnOvykdS4HmdzO5inESbiMme7lYwmm8afZLtMo5pWXoRAS5Fw9DAlLHqtuDJKctinQS+WyucPG8GaVhTS8DMz7QBhSZfm6ZzYR4UwJYgFAwaV0MqRrNo6GZFdClbgfHLT43AFUOEREzXBwK0Igeg1mT/LpQLZCZGFSDfEmBb2xcBxuW6VwUfA+GfQM1Ja1nKjTIRgLrODCZHRIoLsfJNNs5b6GwpaAxruhN9uIexi+T4yNynX6n1uORLjuF4rGD/JVDrxyvH24I0oFERVzI8RAiZoKkV78EZgTPwJVT1C4G+aDQQjE26Sl2L8bmJ+YeObMbsrt5JWIIogHgegUpcD8lPLHvC/4tpMnB1na8A+86yFR9y0UKzcIEqgdCQgJhBxlxnvFxGIjPeYoSk170oPZBiwdnGWs2ZiFm3UzqikWfoj8aX+ZtfYGG7Px4j2u/5fs6PHGx/8KpF6uPh2eBxJApZAd6Y2P4XYIaDbi9MvM7fQihNj25XsD2CkTsJW8iyCMJH2Kfl6JRg5OZ5keNSy1srz+2Zj3UfpfeMfl604Sgpl+voAAAAASUVORK5CYII="></img>
          </div>
          <div className="check-dangnhap animate__animated animate__slideInRight">
            {this.state.openLogin === true ? (
              <ModalLogin
                openLogin={this.state.openLogin}
                toggleFromParent={this.toggleLogin}
                toggleOpenDangKy={this.toggleDangKy}
                dangnhapthanhcong={this.dangnhapthanhcong}
              />
            ) : (
              <div></div>
            )}
            {this.state.openDangKy === true ? (
              <ModalDangKy
                openDangKy={this.state.openDangKy}
                toggleFromParent={this.toggleDangKy}
                toggleOpenDangNhap={this.toggleLogin}
              />
            ) : (
              <div></div>
            )}
            {this.props.isLoggedInBN === true ? (
              <>
                <div
                  style={{
                    color: "#c1c1c1",
                    fontSize: "13px",
                    marginBottom: "3px",
                  }}
                >
                  Người tới khám
                  <div style={{ color: "black", fontSize: "14px" }}>
                    {this.props.benhnhanInfo.benhnhan?.hoten}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div
                  style={{
                    color: "#c1c1c1",
                    fontSize: "13px",
                    marginBottom: "3px",
                  }}
                >
                  Người tới khám
                </div>
                <div style={{ color: "#de3545", fontSize: "13px" }}>
                  Bạn chưa đăng nhập
                </div>
                <div
                  style={{ fontSize: "14px", cursor: "pointer" }}
                  onClick={() => this.handleLogin()}
                >
                  Đăng nhập ngay
                </div>
              </>
            )}
          </div>
        </div>
        <div className="table2">
          <div className="thoigian">
            <div
              style={{ fontSize: "15px" }}
              className="animate__animated animate__slideInRight"
            >
              Giờ hẹn:
            </div>
            <div className="time animate__animated animate__slideInRight">
              {this.props.phong?.khunggio}
            </div>
            <div className="day animate__animated animate__slideInRight">
              {day}
            </div>
          </div>
          <div className="thongtin-bacsi">
            <div className="detail">
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  marginBottom: "7px",
                }}
                className="animate__animated animate__slideInRight"
              >
                Tư vấn trực tuyến với BS {detailDoctor.hoten}
              </div>

              <div
                style={{
                  fontSize: "13px",
                }}
                className="animate__animated animate__slideInRight"
              >
                <span style={{ color: "#3161ad", fontWeight: "600" }}>
                  - {phong}
                </span>
              </div>
              <div
                style={{
                  fontSize: "13px",
                }}
                className="animate__animated animate__slideInRight"
              >
                - Bác sĩ: {detailDoctor.hoten}
              </div>
            </div>
            <div className="cost animate__animated animate__slideInRight">
              {this.state.giakham} vnđ
            </div>
          </div>
        </div>
        <div className="table3">
          <textarea
            placeholder="Triệu chứng *"
            style={{ paddingTop: "10px", paddingLeft: "20px" }}
            onChange={(e) => this.hanldeTrieuChung(e)}
            value={this.state.trieuchung}
          ></textarea>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedInBN: state.benhnhan.isLoggedInBN,
    benhnhanInfo: state.benhnhan.benhnhanInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(page1);
