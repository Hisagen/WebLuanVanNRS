import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./information.scss";
import Slider from "react-slick";
import HomeHeaderNew from "../Auth/HomePageNew/HomeHeaderNew";
import HomeFooter from "../HomePage/HomeFooter";
import {
  editBenhnhanService,
  getIdBenhnhanService,
  createBenhnhanService,
} from "../../services/benhnhanService";
import { toast } from "react-toastify";
import DatePicker from "../../components/Input/DatePicker";
import { emitter } from "../../utils/emitter";
import ModalDoiMatKhau from "./modalDoiMatKhau";
import ModalDoiThongTin from "../Patient/Doctor/Modal/modalDoiThongTin";
import * as actions from "../../store/actions";

class Information extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {
    this.initFacebookSDK();
  }

  initFacebookSDK() {
    if (window.FB) {
      window.FB.XFBML.parse();
    }
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "832028681273087",
        cookie: true,
        xfbml: true,
        version: "v2.5",
      });
    };
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }
  async componentDidUpdate(prevProps, presState, snapshot) {}

  render() {
    let { href } = this.props;
    return (
      <div
        class="fb-comments"
        data-href={
          "https://developers.facebook.com/docs/plugins/comments#configurator"
        }
        data-width={"100%"}
        data-numposts={5}
      >
        nlsjfjdsljdlsvfefef
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Information);
