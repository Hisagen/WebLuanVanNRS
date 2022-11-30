import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./DichVu.scss";
import Slider from "react-slick";
import HomeHeaderNew from "../../Auth/HomePageNew/HomeHeaderNew";

import HomeFooter from "../../HomePage/HomeFooter";

// ảnh

import bannerDV from "../../../assets/banner-dichvu.jpg";

import * as actions from "../../../store/actions";
// api

import { getAllDichVu } from "../../../services/dichvuService";
import { createLogger } from "redux-logger";
import { el } from "date-fns/locale";
import { UndoRounded } from "@material-ui/icons";

class DichVu extends Component {
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

  async componentDidMount() {
    let data = await getAllDichVu("");
    if (data.data && data.data.length > 0) {
      this.setState({
        data: data.data,
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.tempSearch !== "") {
      this.setState({
        searchValue: this.props.tempSearch.substr(8),
      });
      this.handleSetSearchValue();
      this.props.tempSearchRedux("");
    }
  }
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

  handleSetSearchValue = async (e) => {
    let { data } = this.state;
    if (this.props.tempSearch !== "") {
      let test = this.removeVietnameseTones(
        this.props.tempSearch.substr(8)
      ).toLowerCase();
      const newFilter = data.filter((value) => {
        let remove = this.removeVietnameseTones(value?.tendichvu);
        return (
          remove?.toLowerCase()?.includes(test?.toLowerCase()) || // đổi thành chữ thường
          remove?.includes(test)
        );
      });

      this.setState({
        data: newFilter,
      });
    } else {
      this.setState(
        {
          searchValue: e.target.value,
        },
        async () => {
          if (this.state.searchValue !== "") {
            let test = this?.removeVietnameseTones(this.state.searchValue);
            let newFilter = data.filter((value) => {
              let remove = this?.removeVietnameseTones(value?.tendichvu); //đổi title thành không dấu
              return (
                remove?.toLowerCase().includes(test?.toLowerCase()) || // đổi thành chữ thường
                remove?.includes(test)
              );
            });

            this.setState({
              data: newFilter,
            });
          } else if (this.state.searchValue === "") {
            let data = await getAllDichVu("");
            if (data.data && data.data.length > 0) {
              this.setState({
                data: data.data,
              });
            }
          }
        }
      );
    }
  };

  formatCash(str) {
    return str
      .split("")
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + ",") + prev;
      });
  }
  removeVietnameseTones = (str) => {
    if (str !== undefined) {
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
      str = str.replace(/đ/g, "d");
      str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
      str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
      str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
      str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
      str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
      str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
      str = str.replace(/Đ/g, "D");
      // Some system encode vietnamese combining accent as individual utf-8 characters
      // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
      str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
      str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
      // Remove extra spaces
      // Bỏ các khoảng trắng liền nhau
      str = str.replace(/ + /g, " ");
      str = str.trim();
      // Remove punctuations
      // Bỏ dấu câu, kí tự đặc biệt
      str = str.replace(
        /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
        " "
      );
    }

    return str;
  };
  render() {
    let { data } = this.state;
    const currentPage = this.state.currentPage;
    const newsPerPage = this.state.newsPerPage;
    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentTodos = data.slice(indexOfFirstNews, indexOfLastNews);

    const renderTodos = currentTodos.map((item, index) => {
      return (
        <DichVu
          stt={index + 1 + (currentPage - 1) * newsPerPage}
          key={index}
          data={item}
        />
      );
    });
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.length / newsPerPage); i++) {
      pageNumbers.push(i);
    }
    console.log("test dịch vụ", renderTodos)

    return (
      <div>
        <HomeHeaderNew />
        <div className="container-DichVu">
          <div
            className="img-background"
            style={{ backgroundImage: `url(${bannerDV})` }}
          >
            <div className="text">Giá Dịch Vụ</div>
          </div>

          <div className="content-DV">
            <div className="tile-dv">Bảng giá dịch vụ bệnh viên:</div>
            <div className="search-dv">
              <div className="btn-tim">
                <i className="fas fa-search"></i>&nbsp; Tìm
              </div>
              <input
                type="text"
                onChange={(e) => this.handleSetSearchValue(e)}
                value={this.state.searchValue}
              ></input>
            </div>
            <div className="table-phong">
              <table id="customers-sin">
                <tr>
                  <th>TT</th>
                  <th>Tên Dịch Vụ</th>
                  <th>Giá BHYT</th>
                  <th>Giá Dịch Vụ</th>
                </tr>
                {renderTodos &&
                  renderTodos.length > 0 &&
                  renderTodos.map((item, index) => {
                    console.log("item", item)
                    this.state.sodong = index + 1;
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.props.data?.tendichvu}</td>
                        <td>
                          {this.formatCash(
                            item.props.data?.gia_bhyt.toString()
                          ) + " vnđ"}
                        </td>
                        <td>
                          {this.formatCash(
                            item.props.data?.gia_dichvu.toString()
                          ) + " vnđ"}
                        </td>
                      </tr>
                    );
                  })}

                <tr style={{ background: "rgb(247, 245, 245)" }}>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="sodong">Số dòng: {this.state.sodong}</td>
                </tr>
              </table>
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
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <HomeFooter />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.vienchuc.isLoggedIn,
    language: state.app.language,
    tempSearch: state.benhnhan.tempSearch,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    tempSearchRedux: (data) => dispatch(actions.tempSearchSuccess(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DichVu);
