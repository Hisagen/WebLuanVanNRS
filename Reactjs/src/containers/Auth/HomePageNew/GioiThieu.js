import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./GioiThieu.scss";
import Slider from "react-slick";
import logo2 from "../../../assets/logo2.png";
import bgend from "../../../assets/backgroundend.jpg";
// ảnh chỗ giới thiệu
import img1 from "../../../assets/homenew/gioithieu1.jpg";
import img2 from "../../../assets/homenew/gioithieu2.jpg";
import img3 from "../../../assets/homenew/gioithieu3.jpg";
import img4 from "../../../assets/homenew/gioithieu4.jpg";
import img5 from "../../../assets/homenew/gioithieu5.jpg";
import img6 from "../../../assets/homenew/gioithieu6.jpg";
class GioiThieu extends Component {
  render() {
    return (
      <div className="GioiThieu" ref={this.gioithieu} id="gt">
        <div className="title-gioithieu">GIỚI THIỆU VỀ LONG SIN HOSPITAL</div>
        <div className="mota">
          <p>
            Ở Việt Nam hiện nay, các nhà quản lý của các phòng khám, bệnh viện
            vừa và nhỏ đang đứng trước một bài toán khó trong việc nâng cao chất
            lượng dịch vụ song song với việc tiết kiệm thời gian và giảm chi phí
            vận hànH
          </p>
        </div>
        <div className="chung">
          <div className="col1">
            <div className="table1">
              <div className="name">Tại sao nên chọn chúng tôi:</div>
              <div className="direction">
                Lorem Ipsum chỉ đơn giản là một đoạn văn bản giả, được sử dụng
                để trình bày và bố cục cho bản in. Lorem Ipsum đã được sử dụng
                làm văn bản tiêu chuẩn cho ngành in từ những năm 1500,
              </div>
            </div>
            <div className="table2">
              <img src={img1}></img>
            </div>
          </div>
          <div className="col2">
            <img src={img2}></img>
          </div>
          <div className="col3">
            <img src={img3}></img>
          </div>
        </div>
        <div className="chung">
          <div className="col2">
            <img src={img4}></img>
          </div>
          <div className="col1">
            <div className="table1">
              <div className="name">Uy tín ưu tiên hàng đầu</div>
              <div className="direction">
                Lorem Ipsum chỉ đơn giản là một đoạn văn bản giả, được sử dụng
                để trình bày và bố cục cho bản in. Lorem Ipsum đã được sử dụng
                làm văn bản tiêu chuẩn cho ngành in từ những năm 1500,
              </div>
            </div>
            <div className="table2">
              <img src={img6}></img>
            </div>
          </div>
          <div className="col3">
            <img src={img5}></img>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.vienchuc.isLoggedIn,
    language: state.app.language,
  };
};

export default connect(mapStateToProps)(GioiThieu);
