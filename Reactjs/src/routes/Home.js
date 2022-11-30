import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { USER_ROLE } from "../utils";

class Home extends Component {
  render() {
    const { isLoggedIn, vienchucInfo, isLoggedInBN } = this.props;
    // let linkToRedirect = isLoggedIn ? '/system/vienchuc-manage' : '/home';
    let linkToRedirect = "";
    if (isLoggedIn === true && isLoggedInBN === false) {
      linkToRedirect = "/system/homeAdmin";
    } else {
      linkToRedirect = "/system/manageSchedule";
    }
    return <Redirect to={linkToRedirect} />;
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.vienchuc.isLoggedIn,
    isLoggedInBN: state.benhnhan.isLoggedInBN,
    vienchucInfo: state.vienchuc.vienchucInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
