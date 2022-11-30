import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, schedulerMenu, doctorMenu } from "./menuApp";
import "./Header.scss";
import { LANGUAGES, USER_ROLE } from "../../utils";
import { FormattedMessage } from "react-intl";
import _ from "lodash";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuApp: [],
    };
  }

  handeChangeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  componentDidMount() {
    let { vienchucInfo } = this.props;
    let menu = [];
    if (vienchucInfo && !_.isEmpty(vienchucInfo)) {
      let role = vienchucInfo.id_chucvu;
      if (role === USER_ROLE.ADMIN) {
        menu = adminMenu;
      }
      if (role === USER_ROLE.SCHEDULER) {
        menu = schedulerMenu;
      }
      if (role === USER_ROLE.DOCTOR) {
        menu = doctorMenu;
      }
    }
    this.setState({
      menuApp: menu,
    });
  }
  render() {
    const { processLogout, language, vienchucInfo } = this.props;
    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={this.state.menuApp} />
        </div>
        <div className="langueges">
          <span className="welcome">
            <FormattedMessage id="homeheader.welcome" />{" "}
            {vienchucInfo ? vienchucInfo.hoten : "123"}{" "}
          </span>
          <span
            className={
              language === LANGUAGES.VI ? "language-vi active" : "language-vi"
            }
            onClick={() => this.handeChangeLanguage(LANGUAGES.VI)}
          >
            VI
          </span>
          <span
            className={
              language === LANGUAGES.EN ? "language-en active" : "language-en"
            }
            onClick={() => this.handeChangeLanguage(LANGUAGES.EN)}
          >
            EN
          </span>
          <div
            className="btn btn-logout"
            onClick={processLogout}
            title="Log ount"
          >
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
        {/* nút logout */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.vienchuc.isLoggedIn,
    language: state.app.language,
    vienchucInfo: state.vienchuc.vienchucInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) =>
      dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
