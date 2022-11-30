import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import ManagePatient from '../containers/System/Doctor/ManagePatient';
import ManagePatient1 from '../containers/System/Doctor/ManagePatient1';
import Xemlichkham from '../containers/System/Doctor/Xemlichkham';
import Header from '../containers/Header/Header';
class Doctor extends Component {
    render() {
        const { DoctorMenuPath, isLoggedIn } = this.props;
        return (
            <React.Fragment>
                {isLoggedIn && <Header />}
                <div className="Doctor-container">
                    <div className="Doctor-list">
                        <Switch>
                            <Route path="/doctor/doctor-manage-patient" component={ManagePatient} />
                            <Route path="/doctor/doctor-manage-patient1" component={ManagePatient1} />
                            <Route path="/doctor/xem-lich-kham" component={Xemlichkham} />
                            <Route component={() => { return (<Redirect to={DoctorMenuPath} />) }} />
                        </Switch>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        DoctorMenuPath: state.app.DoctorMenuPath,
        isLoggedIn: state.vienchuc.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
