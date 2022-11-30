import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import HomeFooter from "./HomeFooter";
import Specialty from "./Section/Specialty";
// import MedicalFacility from './Section/MedicalFacility';
import OurStadingDoctor from "./Section/OurStadingDoctor";
import HandBook from "./Section/HandBook";
import About from "./Section/About";
import "./HomePage.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HomePage extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: false,
      speed: 1000,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
    };
    return (
      <div>
        <HomeHeader isShowBanner={true} />
        <Specialty settings={settings} />
        {/* <MedicalFacility settings ={settings}/> */}
        <OurStadingDoctor settings={settings} />
        {/* <HandBook settings={settings} />
                <About /> */}
        <HomeFooter></HomeFooter>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // isLoggedIn: state.vienchuc.isLoggedIn
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
