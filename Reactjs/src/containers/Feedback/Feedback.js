import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./FeedBack.scss";
import Slider from "react-slick";
import HomeHeader from "../HomePage/HomeHeader";
import HomeFooter from "../HomePage/HomeFooter";
import { postBenhNhanPhanHoi } from "../../services/benhnhanService";
import { toast } from "react-toastify";

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      ten: "",
      tieude: "",
      noidung: "",
    };
  }
  handleFeedback = async () => {
    let { email, ten, tieude, noidung } = this.state;
    if ((email !== "" && ten !== "", tieude !== "", noidung !== "")) {
      let res = await postBenhNhanPhanHoi({
        email: this.state.email,
        ten: this.state.ten,
        tieude: this.state.tieude,
        noidung: this.state.noidung,
      });
      if (res.errCode === 0) {
        toast("Mail của bạn đã được gửi!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        this.setState({
          email: "",
          ten: "",
          tieude: "",
          noidung: "",
        });
      }
    } else {
      toast("Bạn chưa điền đầy dủ thông tin!", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  render() {
    return (
      <>
        {/* <HomeHeader isShowBanner={false} /> */}
        <div className="feedback">
          <div className="gop-y">
            <div className="title-gopy">Góp ý</div> <br />
            <span>
              Hãy góp ý vỡi chúng tôi bằng cách điền thông tin vào mẫu dưới đây:
            </span>
            <div className="khung">
              <div className="table1">
                <div className="title2">THÔNG TIN LIÊN LẠC</div> <hr />
                <div className="tt">
                  <div>Email của bạn</div>
                  <input
                    type="text"
                    value={this.state.email}
                    onChange={(event) => {
                      this.setState({ email: event.target.value });
                    }}
                    placeholder="Địa chỉ email*"
                  />
                </div>
                <div className="tt">
                  <div>Tên của bạn</div>
                  <input
                    type="text"
                    value={this.state.ten}
                    onChange={(event) => {
                      this.setState({ ten: event.target.value });
                    }}
                    placeholder="Tên*"
                  />
                </div>
              </div>
              <div className="table2">
                <div className="title2">NỘI DUNG GÓP Ý</div> <hr />
                <div className="tt">
                  <div>Tiêu đề góp ý</div>
                  <input
                    type="text"
                    value={this.state.tieude}
                    onChange={(event) => {
                      this.setState({ tieude: event.target.value });
                    }}
                    placeholder="Tiêu đề*"
                  />
                </div>
                <div className="tt">
                  <div>Nội dung góp ý</div>
                  <textarea
                    value={this.state.noidung}
                    onChange={(event) => {
                      this.setState({ noidung: event.target.value });
                    }}
                    placeholder="Nội dung*"
                    style={{
                      paddingTop: "10px",
                      resize: "none",
                    }}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="btn-gui">
              <button
                onClick={() => {
                  this.handleFeedback();
                }}
              >
                Gửi
              </button>
            </div>
          </div>

          {/* <div className="khung-tintuc">
            <div className="title">Tin Nổi Bật</div>
            <marquee direction="up" scrollamount="3" height="200px">
              <div className="khung">
                <p>
                  <i className="fas fa-star"></i>&nbsp; CẬP NHẬT KIẾN THỨC SIÊU ÂM
                  DOPPLER ĐỘNG MẠCH CẢNH – ĐỐT SỐNG VÀ VAI TRÒ CỦA SIÊU ÂM ĐÀN
                  HỒI TRONG PHÂN LOẠI BIRADS TUYẾN VÚ VÀ PHÂN LOẠI TIRADS TUYẾN
                  GIÁP
                </p>
                <p>
                  <i className="fas fa-star"></i>&nbsp; CẬP NHẬT KIẾN THỨC SIÊU ÂM
                  DOPPLER ĐỘNG MẠCH CẢNH – ĐỐT SỐNG VÀ VAI TRÒ CỦA SIÊU ÂM ĐÀN
                  HỒI TRONG PHÂN LOẠI BIRADS TUYẾN VÚ VÀ PHÂN LOẠI TIRADS TUYẾN
                  GIÁP
                </p>
                <p>
                  <i className="fas fa-star"></i>&nbsp; CẬP NHẬT KIẾN THỨC SIÊU ÂM
                  DOPPLER ĐỘNG MẠCH CẢNH – ĐỐT SỐNG VÀ VAI TRÒ CỦA SIÊU ÂM ĐÀN
                  HỒI TRONG PHÂN LOẠI BIRADS TUYẾN VÚ VÀ PHÂN LOẠI TIRADS TUYẾN
                  GIÁP
                </p>
              </div>
            </marquee>
          </div> */}
        </div>
        {/* <HomeFooter /> */}
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

export default connect(mapStateToProps)(Feedback);
