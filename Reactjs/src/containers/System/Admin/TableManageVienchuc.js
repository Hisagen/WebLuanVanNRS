import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./TableManageVienchuc.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vienchucRedux: [],
    };
  }

  componentDidMount() {
    this.props.fetchVienchucRedux();
  }

  componentDidUpdate(prevProps, presState, snapshot) {
    if (prevProps.listVienchucs !== this.props.listVienchucs) {
      this.setState({
        vienchucRedux: this.props.listVienchucs,
      });
    }
  }

  handleDeleteVienchuc = (vienchuc) => {
    this.props.deleteVienchucRedux(vienchuc.id);
  };

  handleEditVienchuc = (vienchuc) => {
    this.props.handleEditVienchucFromParentKey(vienchuc);
    // this.props.handleck()
  };

  render() {
    let arrVienchucs = this.state.vienchucRedux;
    return (
      <React.Fragment>
        <table id="TableManageUser">
          <tbody>
            <tr>
              <th>Stt</th>
              <th>Mã viên chức</th>
              <th>Email</th>
              <th>Họ tên</th>
              <th>Chức vụ</th>
              <th>Địa chỉ</th>
              <th>Actions</th>
            </tr>
            {arrVienchucs &&
              arrVienchucs.length > 0 &&
              arrVienchucs.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.id}</td>
                    <td>{item.email}</td>
                    <td>{item.hoten}</td>
                    <td>{item.vienchucchucvu.tenchucvu}</td>
                    <td>{item.diachi}</td>
                    <td>
                      <button
                        onClick={() => this.handleEditVienchuc(item)}
                        className="btn-edit"
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        onClick={() => this.handleDeleteVienchuc(item)}
                        className="btn-delete"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listVienchucs: state.admin.vienchucs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchVienchucRedux: () => dispatch(actions.fetchAllVienchucStart()),
    deleteVienchucRedux: (id) => dispatch(actions.deleteVienchuc(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
