import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./QuyTrinh.scss";
import bg from "../../assets/backgroundQuyTrinh.jpg";
import HomeHeaderNew from "../Auth/HomePageNew/HomeHeaderNew";

import HomeFooter from "../HomePage/HomeFooter";

class QuyTrinh extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      sodong: "",
      currentPage: 1,
      newsPerPage: 5,
      searchValue: "",
    };
  }

  render() {
    return (
      <>
        <HomeHeaderNew />
        <div class="container-quytrinh">
          <div
            className="background"
            style={{
              backgroundImage: `url(${bg})`,
            }}
          >
            <div className="content-quytrinh">
              <span style={{ borderBottom: "5px solid #54dd76" }}>
                Quy Trình Đăng Ký Khám Bệnh
              </span>
              <div className="content-bot">
                <div
                  style={{
                    paddingLeft: "300px",
                    display: "flex",
                    height: "240px",
                    paddingTop: "20px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "20px",
                      color: "#307be7",
                      borderRight: "3px solid #e9ecf2",
                      paddingRight: "20px",
                      paddingTop: "20px",
                    }}
                  >
                    Bước 1
                    <div
                      style={{
                        borderRadius: "100%",
                        height: "20px",
                        width: "20px",
                        background: "#307be7",
                        marginLeft: "78px",
                        top: "205px",
                        position: "absolute",
                      }}
                    ></div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "20px",
                        color: "black",
                        paddingLeft: "20px",
                        marginTop: "20px",
                        height: "200px",
                        width: "900px",
                        borderBottom: "2px solid #e9ecf2",
                        textAlign: "left",
                      }}
                    >
                      <div
                        style={{
                          color: "#307be7",
                          left: "420px",
                          fontWeight: "600",
                        }}
                      >
                        Đặt Lịch Khám
                      </div>
                      <div style={{ fontSize: "14px", marginTop: "15px" }}>
                        > Đăng nhập phần mềm trên wed
                      </div>
                      <div style={{ fontSize: "14px", marginTop: "15px" }}>
                        > Chọn hình thức đặt khám: theo khung giờ
                      </div>
                      <div style={{ fontSize: "14px", marginTop: "15px" }}>
                        > Nhập thông tin bệnh nhân: tạo hồ sơ mới
                      </div>
                      <div style={{ fontSize: "14px", marginTop: "15px" }}>
                        > Chọn thông tin khám: Chuyên khoa, Bác sĩ, Ngày khám,
                        Giờ khám.
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    paddingLeft: "300px",
                    display: "flex",
                    height: "240px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "20px",
                      color: "#307be7",
                      borderRight: "3px solid #e9ecf2",
                      paddingRight: "20px",
                      paddingTop: "20px",
                    }}
                  >
                    Bước 2
                    <div
                      style={{
                        borderRadius: "100%",
                        height: "20px",
                        width: "20px",
                        background: "#307be7",
                        marginLeft: "78px",
                        top: "425px",
                        position: "absolute",
                      }}
                    ></div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "20px",
                        color: "black",
                        paddingLeft: "20px",
                        marginTop: "20px",
                        height: "200px",
                        width: "900px",
                        borderBottom: "2px solid #e9ecf2",
                        textAlign: "left",
                      }}
                    >
                      <div
                        style={{
                          color: "#307be7",
                          left: "420px",
                          fontWeight: "600",
                        }}
                      >
                        Thanh Toán Tiền Khám
                      </div>
                      <div style={{ fontSize: "14px", marginTop: "15px" }}>
                        > Chọn loại thanh toán: trực tiếp hoặc online
                      </div>
                      <div style={{ fontSize: "14px", marginTop: "15px" }}>
                        > Kiểm tra thông tin
                      </div>
                      <div style={{ fontSize: "14px", marginTop: "15px" }}>
                        > Nhập thông tin bệnh nhân: tạo hồ sơ mới
                      </div>
                      <div style={{ fontSize: "14px", marginTop: "15px" }}>
                        > Chọn thông tin khám: Chuyên khoa, Bác sĩ, Ngày khám,
                        Giờ khám.
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    paddingLeft: "300px",
                    display: "flex",
                    height: "240px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "20px",
                      color: "#307be7",
                      borderRight: "3px solid #e9ecf2",
                      paddingRight: "20px",
                      paddingTop: "20px",
                    }}
                  >
                    Bước 3
                    <div
                      style={{
                        borderRadius: "100%",
                        height: "20px",
                        width: "20px",
                        background: "#307be7",
                        marginLeft: "78px",
                        top: "665px",
                        position: "absolute",
                      }}
                    ></div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "20px",
                        color: "black",
                        paddingLeft: "20px",
                        marginTop: "20px",
                        height: "180px",
                        width: "900px",
                        borderBottom: "2px solid #e9ecf2",
                        textAlign: "left",
                      }}
                    >
                      <div
                        style={{
                          color: "#307be7",
                          left: "420px",
                          fontWeight: "600",
                        }}
                      >
                        Xác Nhận Người Bệnh Đến Bệnh Viện Khám Theo Hẹn
                      </div>
                      <div style={{ fontSize: "15px", marginTop: "16px" }}>
                        > Sau khi đặt khám thành công phiếu khám điện tử sẽ được
                        gửi ngay qua email
                      </div>
                      <div style={{ fontSize: "15px", marginTop: "16px" }}>
                        > Đến ngày khám, người bệnh vui lòng đến quầy tiếp nhận
                        để xác nhận thông tin hoặc đến trực tiếp phòng khám theo
                        hướng dẫn trên phiếu khám bệnh.
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    paddingLeft: "300px",
                    display: "flex",
                    height: "240px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "20px",
                      color: "#307be7",
                      borderRight: "3px solid #e9ecf2",
                      paddingRight: "20px",
                      paddingTop: "20px",
                    }}
                  >
                    Bước 4
                    <div
                      style={{
                        borderRadius: "100%",
                        height: "20px",
                        width: "20px",
                        background: "#307be7",
                        marginLeft: "78px",
                        top: "905px",
                        position: "absolute",
                      }}
                    ></div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "20px",
                        color: "black",
                        paddingLeft: "20px",
                        marginTop: "20px",
                        height: "200px",
                        width: "900px",
                        borderBottom: "2px solid #e9ecf2",
                        textAlign: "left",
                      }}
                    >
                      <div
                        style={{
                          color: "#307be7",
                          left: "420px",
                          fontWeight: "600",
                        }}
                      >
                        Khám Cận Lâm Sàn
                      </div>
                      <div style={{ fontSize: "16px", marginTop: "15px" }}>
                        > Người bệnh khám tại các phòng khám chuyên khoa theo
                        thông tin khám đã đặt.
                      </div>
                      <div style={{ fontSize: "16px", marginTop: "15px" }}>
                        > Thực hiện cận lâm sàng (nếu có) và đóng phí tại các
                        quầy thu ngân hoặc trừ vào tài khoản thẻ khám bệnh (nếu
                        có).
                      </div>
                      <div style={{ fontSize: "16px", marginTop: "15px" }}>
                        > Khi đủ kết quả cận lâm sàng, người bệnh quay lại phòng
                        khám gặp Bác sĩ nhận toa thuốc.
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    paddingLeft: "300px",
                    display: "flex",
                    height: "90px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "20px",
                      color: "#307be7",
                      borderRight: "3px solid #e9ecf2",
                      paddingRight: "20px",
                      paddingTop: "20px",
                    }}
                  >
                    Bước 5
                    <div
                      style={{
                        borderRadius: "100%",
                        height: "20px",
                        width: "20px",
                        background: "#307be7",
                        marginLeft: "78px",
                        top: "1145px",
                        position: "absolute",
                      }}
                    ></div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "20px",
                        color: "black",
                        paddingLeft: "20px",
                        marginTop: "20px",
                        height: "70px",
                        width: "900px",
                        borderBottom: "2px solid #e9ecf2",
                        textAlign: "left",
                      }}
                    >
                      <div
                        style={{
                          color: "#307be7",
                          left: "420px",
                          fontWeight: "600",
                        }}
                      >
                        Nhận Đơn Thuốc
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            heigth: "1000px",
            width: "100%",
            zIndex: "10",
            marginTop: "970px",
          }}
        >
          <HomeFooter />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.vienchuc.isLoggedIn,
    language: state.app.language,
  };
};

export default connect(mapStateToProps)(QuyTrinh);
