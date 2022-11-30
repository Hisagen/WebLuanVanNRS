import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";

import { getAllChuyenkhoaService } from "../../../services/chuyenkhoaService";
import "./Specialty.scss";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { createLogger } from "redux-logger";

class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpeciatly: [],
      ChuyenKhoaST: "",
    };
  }

  async componentDidMount() {
    let res = await getAllChuyenkhoaService();

    if (res && res.errCode == 0) {
      this.setState({
        dataSpeciatly: res.data ? res.data : [],
        ChuyenKhoaST: res.data[0].id,
      });
    }
  }

  handleViewDetailSpecilty = (chuyenkhoa) => {
    if (this.props.history) {
      this.props.history.push(`/api/get-id-chuyenkhoa/${chuyenkhoa.id}`);
    }
  };

  render() {
    let { dataSpeciatly } = this.state;
    let settings = {
      dots: false,
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 1,
    };

    return (
      <div className="section-share section-specialty">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Chuyên Khoa</span>

            <Link
              to={`/api/get-id-chuyenkhoa/${this.state.ChuyenKhoaST}`}
              style={{
                textDecoration: "none",
                color: "black",
              }}
            >
              <button className="btn-section">Xem thêm</button>
            </Link>
          </div>
          <div className="section-body-specialty">
            <Slider {...settings}>
              {dataSpeciatly &&
                dataSpeciatly.length > 0 &&
                dataSpeciatly.map((item, index) => {
                  let imageBase64 = "";
                  {
                    if (item.imagePath) {
                      imageBase64 =
                        "http://localhost:3002/Image/ChuyenKhoa/" +
                        item.imageName;
                    }
                  }
                  let icon = "icon" + (index + 1);
                  return (
                    <div
                      className="section-customize specialty-child"
                      key={index}
                      onClick={() => this.handleViewDetailSpecilty(item)}
                    >
                      <div className={`color-${index + 1}`}>
                        <div className="icon">
                          <img
                            src={`http://localhost:3002/Image/icon/icon-${index + 1
                              }.png`}
                            style={{
                              width: "95px",
                              height: "70px",
                              marginTop: "15px",
                              marginLeft: "90px",
                              position: "absolute",
                            }}
                          ></img>
                        </div>
                        <span
                          style={{
                            position: "absolute",
                            fontSize: "25px",
                            textAlign: "center",
                            width: "100%",
                            marginTop: "100px",
                            color: "white",
                          }}
                        >
                          {item?.tenchuyenkhoa}
                        </span>
                      </div>
                      <div
                        style={{
                          bottom: "5px",
                          position: "absolute",
                        }}
                      >
                        <div
                          className="bg-image-specialty section-specialty "
                          style={{
                            backgroundImage: `url(${imageBase64})`,
                            zIndex: "-1",
                          }}
                        >
                          {/* <img src={item.image} /> */}
                        </div>
                        {/* <div className="specialty-name">
                          {item.tenchuyenkhoa}
                        </div> */}
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // isLoggedIn: state.vienchuc.isLoggedIn,
    language: state.app.language,
  };
};

export default withRouter(connect(mapStateToProps)(Specialty));
