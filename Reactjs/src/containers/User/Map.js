import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./Map.scss";
import HomeHeaderNew from "../Auth/HomePageNew/HomeHeaderNew";

import HomeFooter from "../HomePage/HomeFooter";
import QRCode from "./maQR";
class Map extends Component {
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

  render() {
    return (
      <div class="gmap_canvas">
        <HomeHeaderNew isShow={true} />
        {/* <div>
          <QRCode />
        </div> */}
        <div className="title-map">
          <div
            style={{
              textAlign: "center",
              fontSize: "40px",
            }}
          >
            Vị Trí Của Bệnh Viện
          </div>
        </div>
        <iframe
          src="https://maps.google.com/maps?q=%C4%90a%CC%A3i%20ho%CC%A3c%20C%C3%A2%CC%80n%20Th%C6%A1&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
          id="gmap_canvas"
          frameborder="0"
          scrolling="no"
          style={{ width: "100%", height: "400px", marginBottom: "50px" }}
        ></iframe>
        <HomeFooter />
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

export default connect(mapStateToProps)(Map);
