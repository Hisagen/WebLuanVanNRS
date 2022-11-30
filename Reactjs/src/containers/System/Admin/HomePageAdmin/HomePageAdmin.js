import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./HomePageAdmin.scss";
import Slider from "react-slick";
import { Outlet } from "react-router-dom";
import * as actions from "../../../../store/actions";
import "animate.css";
import logo2 from "../../../../assets/logo2.png";
import avt from "../../../../assets/avt.jpg";

import HomeHeaderAdmin from "./HomeHeaderAdmin";
import { ThreeSixtySharp } from "@material-ui/icons";
import VienChucRedux from "../../../../containers/System/Admin/VienchucRedux.js";

class HomePageAdmin extends Component {
  constructor() {
    super();

    this.state = {
      action: false,
    };
  }

  handleAction = (action) => {
    this.setState({
      action: action,
    });
  };
  render() {
    return (
      <div className="HomePageAdmin">
        {this.state.action === true ? (
          <div className="content">
            <VienChucRedux />
          </div>
        ) : (
          <div className="content2">
            <VienChucRedux />
          </div>
        )}
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
  return {
    processBNLogout: () => dispatch(actions.processBNLogout()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePageAdmin);
