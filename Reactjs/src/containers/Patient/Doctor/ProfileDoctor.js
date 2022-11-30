import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ProfileDoctor.scss";
import { getBacsiIdService } from "../../../services/vienchucService";
import { LANGUAGES } from "../../../utils";
import NumberFormat from "react-number-format";
import _ from "lodash";
import moment from "moment";
import { Link } from "react-router-dom";
import Router from "react-router-dom";
class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
      id: "",
    };
  }

  async componentDidMount() {
    let data = await this.getInforDoctor(this.props.id_vienchuc);
    console.log("============> id vc", this.props.id_vienchuc);
    if (this.props.id_vienchuc) {
      this.setState({
        id: this.props.id_vienchuc,
      });
    }
    this.setState({
      dataProfile: data,
    });
  }

  //hàm dùng để in hoa kí tự đầu tiên
  async componentDidUpdate(prevProps, presState, snapshot) {
    //   if (this.props.id_vienchuc !== presState.id) {
    //     console.log("update");
    //     let data = await this.getInforDoctor(this.props.id_vienchuc);
    //     this.setState({
    //       dataProfile: data,
    //     });
    //   }
  }

  getInforDoctor = async (id_vienchuc) => {
    let result = {};
    if (id_vienchuc) {
      let res = await getBacsiIdService(id_vienchuc);
      console.log("res", res);
      if (res && res.errCode == 0) {
        result = res.data;
      }
    }
    return result;
  };

  renderTimeBooking = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let time = dataTime.tenkhungio;
      let date =
        language === LANGUAGES.VI
          ? moment.unix(+dataTime.ngay / 1000).format("dddd - DD/MM/YYYY")
          : moment
            .unix(+dataTime.ngay / 1000)
            .locale("en")
            .format("ddd - MM/DD/YYYY");
      return (
        <>
          <div>
            {time} - {date}
          </div>
          <div>
            <FormattedMessage id="patient.booking-modal.priceBooking" />
          </div>
        </>
      );
    }
    return <></>;
  };

  render() {
    let { dataProfile } = this.state;
    let imageBase64 =
      "http://localhost:3002/Image/ChucVu/" + dataProfile.imageName;
    let {
      language,
      isShowDescriptionDoctor,
      dataTime,
      isShowLinkDetail,
      id_vienchuc,
    } = this.props;
    let nameVi = "";
    // let nameEn = ''
    if (dataProfile) {
      nameVi = `Bác sĩ - ${dataProfile.hoten} `;
    }
    return (
      <div className="profile-doctor-container">
        <div className="intro-doctor">
          <div
            className="content-left"
            style={{
              backgroundImage: `url(${imageBase64})`,
            }}
          ></div>
          <div className="content-right">
            <div className="up">{nameVi}</div>
            <div className="down">
              {/* {isShowDescriptionDoctor === true ? (
                <>
                  {dataProfile && dataProfile.description && (
                    <span>{dataProfile.description}</span>
                  )}
                </>
              ) : (
                <>{this.renderTimeBooking(dataTime)}</>
              )} */}
            </div>
          </div>
        </div>
        {isShowLinkDetail === true && (
          <div className="view-detail-doctor">
            <Link
              to={`/api/get-id-bacsi/${id_vienchuc}`}
              style={{ background: "white" }}
            >
              Xem thêm
            </Link>
            {/* <a href={`/api/get-id-bacsi/${id_vienchuc}`}>Xem thêm</a> */}
          </div>
        )}
        {/* <div className='price'>
                    <FormattedMessage id="patient.booking-modal.price" />
                    {dataProfile && dataProfile.Doctor_infor && language === LANGUAGES.VI &&
                        <NumberFormat
                            className='currency'
                            value={dataProfile.Doctor_infor.priceTypeData.valueVi}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'VND'}
                        />
                    }
                    {dataProfile && dataProfile.Doctor_infor && language === LANGUAGES.EN &&
                        <NumberFormat
                            className='currency'
                            value={dataProfile.Doctor_infor.priceTypeData.valueEn}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'$'}
                        />
                    }
                </div> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
