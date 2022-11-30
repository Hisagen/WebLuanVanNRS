import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./Content.scss";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import * as actions from "../../../../store/actions";
import "animate.css";
import logo2 from "../../../../assets/logo2.png";
import avt from "../../../../assets/avt.jpg";

class Content extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return <div className="Content">hello</div>;
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
export default connect(mapStateToProps, mapDispatchToProps)(Content);
