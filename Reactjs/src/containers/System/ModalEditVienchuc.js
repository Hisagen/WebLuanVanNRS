import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, useStore } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import _ from 'lodash'
class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chucvuArr: [],
            tdhvArr: [],
            chuyenkhoaArr: [],
            genderArr: ['Nam', 'Nữ', 'Khác'],
            previewImgURL: '',
            hoten: '',
            gioitinh: '',
            diachi: '',
            sdt: '',
            password: '',
            email: '',
            image: '',
            contentHTML: '',
            contentMarkdown: '',
            description: '',
            id_xaphuong: '',
            id_chuyenkhoa: '',
            id_tdhv: '',
            id_chucvu: '',
            isOpen: false,
        }
    }

    componentDidMount() {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'hashcode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address
            })
        }
    }

    toggle = () => {
        this.props.toggleFromParent()
    }

    handleOnChangeInput = (event,id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
                ...copyState
        })

    }

    checkValideInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++){
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert("Missing parameter: " + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleSaveUser = () => {
        let isValid = this.checkValideInput();
        if (isValid === true) {
            this.props.editUser(this.state);
        }
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}
                size="lg"
            > 
                <ModalHeader toggle={() => {this.toggle() }}>Edit User</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input
                                type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, "email") }}
                                value={this.state.email}
                                disabled
                            ></input>
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input
                                type="password"
                                onChange={(event) => { this.handleOnChangeInput(event, "password") }}
                                value={this.state.password}
                                disabled
                            ></input>
                        </div>
                        <div className='input-container'>
                            <label>FirstName</label>
                            <input
                                type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, "firstName") }}
                                value={this.state.firstName}
                            ></input>
                        </div>
                        <div className='input-container'>
                            <label>LastName</label>
                            <input
                                type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, "lastName") }}
                                value={this.state.lastName}
                            ></input>
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Address</label>
                            <input
                                type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, "address") }}
                                value={this.state.address}
                            ></input>
                        </div>

                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        className='px-3'
                        color="primary"
                        onClick={() => { this.handleSaveUser() }}
                    >
                        Save Changes
                    </Button>
                    {' '}
                    <Button
                        className='px-3'
                        color="secondary"
                        onClick={() => { this.toggle() }}
                    >
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
