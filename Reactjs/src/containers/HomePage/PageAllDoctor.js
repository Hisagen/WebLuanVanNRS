import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import * as actions from "../../store/actions";

import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";
import { createLogger } from "redux-logger";
import HomeHeaderNew from "../Auth/HomePageNew/HomeHeaderNew";
import HomeFooterNew from "../Auth/HomePageNew/HomeFooterNew";
import "./PageAllDoctor.scss";
import { createGlobalStyle } from "styled-components";

class PageAllDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
      currentPage: 1,
      newsPerPage: 6,
      data: [],
    };
  }
  async componentDidMount() {
    this.props.loadTopDoctors();
  }
  componentDidUpdate(prevProps, presState, snapshot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux,
      });
    }
  }

  handleViewDetailDoctor = (doctor) => {
    this.props.history.push(`/api/get-id-bacsi/${doctor.id}`);
  };
  chosePage = (event) => {
    this.setState({
      currentPage: Number(event.target.id),
    });
  };

  select = (event) => {
    this.setState({
      newsPerPage: event.target.value,
    });
  };

  render() {
    let arrDoctors = this.state.arrDoctors;
    const currentPage = this.state.currentPage;
    const newsPerPage = this.state.newsPerPage;
    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentTodos = arrDoctors.slice(indexOfFirstNews, indexOfLastNews);
    const renderTodos = currentTodos.map((item, index) => {
      return (
        <PageAllDoctor
          stt={index + 1 + (currentPage - 1) * newsPerPage}
          key={index}
          arrDoctors={item}
        />
      );
    });
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(arrDoctors.length / newsPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
      <div>
        <HomeHeaderNew isShow={true} />
        <div className="container-pageAllDoctor">
          <div
            style={{
              fontSize: "30px",
              fontWeight: "600",
              color: "#00ba99",
              paddingLeft: "600px",
              // paddingLeft: "600px", //CSSLong
            }}
          >
            Danh sách bác sĩ
          </div>
          <div className="body">
            {renderTodos &&
              renderTodos.length > 0 &&
              renderTodos.map((item, index) => {
                let imageBase64 = "";
                {
                  if (item.props?.arrDoctors?.imagePath) {
                    imageBase64 =
                      "http://localhost:3002/Image/ChucVu/" +
                      item.props?.arrDoctors?.imageName;
                  }
                }

                return (
                  <div key={index}>
                    <div
                      className="page-all-doctor"
                      onClick={() =>
                        this.handleViewDetailDoctor(item.props.arrDoctors)
                      }
                    >
                      <div className="customize-border">
                        <div className="outer-bg">
                          <div
                            className="bg-image "
                            style={{ backgroundImage: `url(${imageBase64})` }}
                          ></div>
                        </div>
                        <div className="text-center">
                          <div>{item.props.arrDoctors?.hoten}</div>
                          <div className="name-ck">
                            {
                              item.props.arrDoctors?.vienchucchuyenkhoa
                                ?.tenchuyenkhoa
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="btn-datkham-page-all-doctor"
                      onClick={() =>
                        this.handleViewDetailDoctor(item.props.arrDoctors)
                      }
                    >
                      <button>
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGeSURBVHgB3VXtUcMwDFV6DJANCBOQDTATUCZomKDdoNmgZQLYgHaCsEFhgmSDdAMj06dDVR3SpP/67nSK9WHJshQTXQuSPgPvfcpszuSYMqVqmLZMmyRJGhoLDrDy52GFZAYHyNUmH0xTpgyUY/2ubOqgo6Fgp6LPEUHrQYHYaMk0pwEIpWLaIVDVZ1zAcIf1FNkJLSBfGLlDIDnRQu87MXGW4K/gOR06SkguNzVyxx22Z/4C/Yw6TiEXXStZCdkatU9VeTLIA0rl00KWx06SgX9HctiHWUC2FDhmYx+x3aoqnAQR4RddhgY8iwWJQTLtGrRbOgOTSAbaUU41s/0fOooOv5qAT6W6p+MEj5xOLh5yPdWtalvB2tiLzlEMqjOckZdmYwlYGrsilihFNtMZV7pMqmXXHf6SSPFfkNyfolXzUdq5UL5vXaew3eXAN0x3dLjQEKCg7sTCYFawCZf9aG1uOnx/h42dG6ylhWX9xLrQeQ/YPIXuufcBM+Vq1Xemsq4jJa38kLfE//15JVBh9PLPqsAdjYUf88pdPX4AVkVhoJ7NOBsAAAAASUVORK5CYII="></img>
                        Đặt khám
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="khung-page">
            <div className="pagination-custom">
              {pageNumbers.map((number) => {
                if (this.state.currentPage === number) {
                  return (
                    <table>
                      <tbody>
                        <tr>
                          <th
                            key={number}
                            id={number}
                            className="phantrang active"
                          >
                            {number}
                          </th>
                        </tr>
                      </tbody>
                    </table>
                  );
                } else {
                  return (
                    <table>
                      <tbody>
                        <tr>
                          <th
                            key={number}
                            id={number}
                            onClick={this.chosePage}
                            className="phantrang"
                          >
                            {number}
                          </th>
                        </tr>
                      </tbody>
                    </table>
                  );
                }
              })}
            </div>
            <div className="news-per-page">
              <span>Page size: </span>
              <select
                defaultValue="0"
                onChange={this.select}
                style={{
                  width: "70px",
                  height: "27px",
                  textAlign: "center",
                  background: "rgb(247, 245, 245)",
                }}
              >
                {/* <option value="0" disabled></option> */}
                <option value="6">6</option>
                <option value="12">12</option>
                <option value="18">18</option>
              </select>
            </div>
          </div>
        </div>

        <HomeFooterNew />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    topDoctorsRedux: state.admin.bacsis,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchAllBacsiStart()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PageAllDoctor)
);
