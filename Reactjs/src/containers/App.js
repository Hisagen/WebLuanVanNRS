import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { ToastContainer } from "react-toastify";
import {
  VienchucIsAuthenticated,
  VienchucIsNotAuthenticated,
} from "../hoc/authentication";
import {
  benhnhanIsAuthenticated,
  benhnhanIsNotAuthenticated,
} from "../hoc/authentication1";
import { path } from "../utils";
import Home from "../routes/Home";
import Login from "./Auth/Login";
import Login1 from "./Auth/Login1";
import System from "../routes/System";
import Admin from "../routes/Admin";
import { CustomToastCloseButton } from "../components/CustomToast";
import ConfirmModal from "../components/ConfirmModal";
import HOMEPAGE from "./HomePage/HomePage.js";
import DetailDoctor from "./Patient/Doctor/DetailDoctor";
import DetailSpecialty from "./Patient/Specialty/DetailSpecialty";
import CustomScrollbars from "../components/CustomScrollbars";
import Doctor from "../routes/Doctor";
import Schedule from "../routes/Schedule";
import VerifyEmail from "./Patient/VerifyEmail";
import Feedback from "./Feedback/Feedback";
import ConTact from "./Contact/ConTact";
import Infomation from "./User/Infomation";
import Answers from "./Answers/Answers";
import ForgotPW from "../containers/Auth/ForgotPW";
import HomePageNew from "./Auth/HomePageNew/HomePageNew";
import DichVu from "../containers/Auth/DichVu/DichVu";
import PageAllDoctor from "../containers/HomePage/PageAllDoctor";
import LichSuKham from "./User/LichSuKham";
import Map from "./User/Map";
import QuyTrinh from "./User/QuyTrinh";
class App extends Component {
  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
  }

  render() {
    return (
      <Fragment>
        <Router history={history}>
          <div className="main-container">
            <ConfirmModal />

            <dic className="content-container">
              <CustomScrollbars
                style={{ height: "100vh", width: "100%", overflow: "hidden" }}
              >
                <Switch>
                  <Route path={path.HOME} exact component={Home} />
                  <Route
                    path={path.LOGIN}
                    component={VienchucIsNotAuthenticated(Login)}
                  />
                  <Route
                    path={path.LOGIN1}
                    component={benhnhanIsNotAuthenticated(Login1)}
                  />

                  <Route path={path.SYSTEM} component={Admin} />
                  <Route
                    path="/doctor"
                    component={VienchucIsAuthenticated(Doctor)}
                  />
                  <Route
                    path="/schedule"
                    component={VienchucIsAuthenticated(Schedule)}
                  />
                  <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />
                  <Route
                    path={path.DETAIL_SPCIALTY}
                    component={DetailSpecialty}
                  />
                  <Route
                    path={path.VERIFY_EMAIL_BOOKING}
                    component={VerifyEmail}
                  />
                  <Route path={path.FEEDBACK} component={Feedback}></Route>
                  <Route path={path.CONTACT} component={ConTact}></Route>
                  <Route path={path.INFORMATION} component={Infomation}></Route>
                  <Route path={path.ANSWERS} component={Answers}></Route>
                  <Route
                    path={path.FORGOTPASSWORD}
                    component={ForgotPW}
                  ></Route>
                  <Route
                    path={path.HOMEHEADERNEW}
                    component={HomePageNew}
                  ></Route>
                  <Route path={"/dichvu"} component={DichVu}></Route>
                  <Route path={"/lich-su-kham"} component={LichSuKham}></Route>
                  <Route path={"/map"} component={Map}></Route>
                  <Route path={"/Quy-Trinh"} component={QuyTrinh}></Route>

                  <Route
                    path={"/page-all-doctor"}
                    component={PageAllDoctor}
                  ></Route>
                </Switch>
              </CustomScrollbars>
            </dic>

            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <ToastContainer />
          </div>
        </Router>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.vienchuc.isLoggedIn,
    isLoggedInBN: state.benhnhan.isLoggedInBN,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
