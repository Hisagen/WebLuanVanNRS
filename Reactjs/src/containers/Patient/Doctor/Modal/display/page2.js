import React, { Component } from "react";
import { connect } from "react-redux";
import "./page2.scss";
import StripeContainer from "../../../../../components/StripeContainer";
import { getBacsiIdService } from "../../../../../services/vienchucService";
import { getOnePhongChuyenkhoaIdService } from "../../../../../services/phongService";
import moment from "moment";
import { ThreeSixtySharp } from "@material-ui/icons";
class page2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typepay: "",
      tennhasx: "",
      resume: "",
      id: "",
      detailDoctor: {},
      giakham: "",
      getgia: "",
      phong: "",
    };
  }
  async componentDidMount() {
    if (this?.props.phong.lichkhamlichbacsikham.id_vienchuc !== undefined) {
      this.setState(
        {
          id: this?.props.phong.lichkhamlichbacsikham.id_vienchuc,
        },
        async () => {
          let res = await getBacsiIdService(this.state.id);
          if (res && res.errCode === 0) {
            this.setState(
              {
                detailDoctor: res?.data,
                giakham: this.formatCash(res?.giakham?.gia_bhyt.toString()),
                getgia: res?.giakham?.gia_bhyt,
              },
              async () => {
                let phong = await getOnePhongChuyenkhoaIdService(
                  this.props.phong.id_phong
                );
                this.setState({
                  phong:
                    this?.props.phong.lichkhamlichbacsikham.lichbacsikhamphong
                      .tenphong,
                });
              }
            );
          }
        }
      );
    }
  }
  handleRadio = (event) => {
    this.setState(
      {
        typepay: event.target.value,
      },
      () => {
        this.props.page2({ typepay: this.state.typepay });
        this.props.page2({ giakham: this.state?.getgia });
      }
    );
  };
  handleStripeContainer = (resumePay) => {
    this.props.page2({ resumePay: resumePay });
  };
  formatCash(str) {
    return str
      ?.split("")
      ?.reverse()
      ?.reduce((prev, next, index) => {
        return (index % 3 ? next : next + ",") + prev;
      });
  }
  handleTK = (e) => {
    this.props.gettaikham(e.target.value);
  };
  render() {
    let { detailDoctor, giakham, phong } = this.state;
    let day = moment(this.props.phong?.ngay).format("DD/MM/YYYY");
    return (
      <div className="container-page2">
        <div className="table1">
          <div
            style={{
              paddingLeft: "20px",
              marginTop: "10px",
              paddingBottom: "10px",
              borderBottom: "1px solid #e5e5e5",
              width: "100%",
              height: "fit-content",
              fontSize: "13px",
              fontWeight: "600",
            }}
          >
            <span className="animate__animated animate__flipInX">
              Phương thức thanh toán
            </span>
          </div>
          <div className="pttt" onChange={(event) => this.handleRadio(event)}>
            <label className="radio-pttt1">
              <div className="container-radio">
                <div className="img animate__animated animate__flipInX">
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAXnSURBVHgB7Vrdb1RFFD8z9+7SXUnZ2hQTQ3W3hZKAkQ0VY00MWywYEwK1SR+VNhF4wPL1B+jiH2BLEA3w0AU0JjXBFk1MEN2LLxoQCwmSuNp2SSsYsHSLlLZ7P45nZu+9e1sRkfpwN9lfcnfn49yZ+Z1z5tyZyTDwoLHxSMBYWxNTDFhG2TD4EGjhHVDYJL9165eLn++855QzJ/FMZ39tEIxVADwAJQGumyrPXD62ZUTkJJFn3zwdU01jtUijCePEJBOuq5rUks0G+Ajt7X1wLRSoznO9ljNVeA3kgV++0ts6yho3HwljTfVLwhKqCpnzx9oy4HM07vgBlJnRBkPBBmGZypElX3Nrac0KQcJCY6wUSAhcPPochHkugwzGAazAxIqJOg4Ml4jKoKWOQgmhZuoxCBggFa/kTXI1i1WKzPkTbeNQQujrawczNH5HZrgS4lCiYIziFD6hO/mSJTIfZSJ+Q5mI31Am4jeUifgNZSJ+g3q/wonvXu8AhK20oGl1CxFytA3rqWo6ccArW3/oTAoY32bLZIe6WmL1759NUy4hixAPDHdtTCYRIXVQi9CGYQ9DTJBsnNqL2O0OmrrSlt3XnBPvLP/oe7Am7+5hFiSljGwHeoa7WvbBP+C+FqlqOpmqevHka1Qdu61X9MvCQoPJicGOiFcWga93M4w6LiDuFFlMGUyk05Dq0WJcMQeJRFKStAdo/yccEhLT0wws2OvKCDEGa+ABUB9UWdWUyka7050v14y07l92AZ5cNAXKrCUGPiDq6w+dbaXOorZ4jrQ6QPLUuVkky4xrN66EmRqYOYVgy5LlEPB4gQdGgfNKR3zV4TTMTusdjPPovOHEHzTWf50jQlNa7iltZ+YVuD77GOgWNHuqt3nS/UJWVY05HWZ3bbo0a+oRLA4ETcb3CncTz1DXpo6hXS1tjnw+SFs9xt92CNOvY6lI9MMvo/CoRArt4cCN/GIQZCbNRdLEpPkoqdOdQ6auy7ljsaLm6L1LnmacATEFrW6aR9vm95Popak1YySYY2UGGjWiOfWKHkzAQohwBDkgQeaD3+JyoIqiJzwiWnbfq9nC6FnUKaStzzXxr/LQBLPwXShWxOg3Ra45LN3TxuhMkCGw3XaWDnR4PzL81nmL0msWROTXro0a2Br97I+Vke0fH42T+d/xiKTcMXomJbmTJt/f/QIEFbUbLKsTC+5SJMTg1PJDXyVEQDBn814r58JLlw4oBmpFeVwPCyEiYKE14KS/ydXtcc0vQu5bLcc9oq5rOZYUuLqrGYZ2b0pxXBwj64gw6roacvbG9Qy5nKJ7lcNmb/6etlT+nlsALF4IJgsgwlHR3AxCR7E7N+RCtEd24nZkcJSDlfPJhrAOBsIHvb5PH4mq/DQphvGtni5lWLYfF/ODiVsODwnT5P0KN3v/Vq7r59zGFCOOxVPYnIhYK7rPxC3VTNcfPqvRue1lUn8WjCn6jnDHhcgDGbUt5hyP2CVZUrHmdoLS+gmRtIOJ9shERGilSKOBV0P0sXYnud0JK74i3QpVFrG/4K1MrBRoOs9xBITjrEI5Yc3AMHNKyMoUkqW7ikg2dtdoRsZEv+LsRMyTnvnj+09rLVpunJMd2Y/JrYNzBdjTxfqCWzHhXgz6EYrzBZFlRRl95ZsXcaUTxQew+GGdY+VERwIMU73k6eO+kYut7Ty1WSR+7G37AkoMjTtOA+qGHH95Ge83lIn4DWUifkOZiN9QJuI3uERoHQWlDJfIhg3nHnol7EcIIvI+x1TtxBIoIYhbEPdmjGqZQTbJTZONibSuYoO4UVAyWA1QocrLP3SWp//J1YqbI3TModN+p9rA0Yb2ZJ9k62cIhWeGAw005lqioYceZz/LTdm6zk9qTSicVyGjUxkDxsIV6oIvEFw8ugX+L4hgtG7dscDdVTWVIfIeoXhRrhrqT+dPbhlxd6bPb++LGRhsANMqkWtOlq6AevVCb6u8esK8VU37Pw1N38aVDJVKxlkl+BP3VJrX4brIsPca1l/ksExXzd31ywAAAABJRU5ErkJggg=="></img>
                </div>
                <div
                  className="text animate__animated animate__flipInX"
                  style={{ marginLeft: "10px", marginTop: "5px" }}
                >
                  <span
                    style={{ fontSize: "12px", fontWeight: "600" }}
                    className="animate__animated animate__flipInX"
                  >
                    Thanh toán bằng thẻ VISA/ Master
                  </span>
                  <div
                    style={{ width: "180px", fontSize: "9px" }}
                    className="animate__animated animate__flipInX"
                  >
                    Hỗ trợ thanh toán xuyên quốc gia với thẻ VISA/MASTERCARD
                  </div>
                </div>
              </div>
              <input
                className="radio1 animate__animated animate__flipInX"
                type="radio"
                name="radio"
                value={"online"}
              />
            </label>
            <label className="radio-pttt2">
              <div className="container-radio">
                <div className="img animate__animated animate__flipInX">
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAWeSURBVHgBxVpbVuNGEK1qeQL5c/4CGRKxAuQNBHkFAyvAswJgBWZWgLOCgR0wK7A8yb/NCvBJMpCTn/F85WWrc6vVAlnIsmTJ5p6DZUv9qOqux60WTGvEYHQ/xMWj9WHcoPXCCK8xEdUMJnJxcdetgGDse7v7VDOwu3e4uIrWhP7wN582gNp2oD98cJXiN6xDHybj41aTNoCVFegP7yDgqyOHnUNN+giW3iStxd4FE1wDjhTJxMfb+0s0P1o2DzPd/Hiwe77o+UoKYLU7ivV7+R6LLAJrrQdEYdBu7QVyD3aqF40B4X2KHDEXVsl6FTCrHV1HoZ69I5pB6P1J0d6yAOgrEWp8mOPgWIA+Lv7g9uHk8GDnOqvNigrwDQS4lGDWbn1/U7TX4PaPUwqn+8T6NBqGL/Lay+Iodnxsw9XH0YOvmYK0IitFoXZrZ0xRbPciX5iHOLRdvcQ9RCUd9oiVCD8JNZ0vWtWnefaCUE+PZS6YakcUSUe3lcNoqMMP0bdXGY44E6X87H40CPU/++3Wbo8KQHYY7VtwpsydrpAHwkA+GVGoTC9mvivjLwJpjwDxJetZBQVmgRGItP98UD6jDWFlBewqBvhzxeblXn/4u2dsn/mE6uc/46yblahEaOK+QBs/cFh1KbJ9hFduU41ot767wJj7cY6JUZELRX5A1mFncFBzV+sPNlLViqwxKyowHeFjopisI7OJFIq5lGMXRVbIrqSA9QNRoinx2a6Q3POzJqsCZOOu4q3P/eGfcwVSZTqNuG7zgfKj39r8dpyva92FMJwOolwwmwvBNdBp8QOVMBuF3/pkNpu2FRdbn5jZwgRBydVdGNIgbe/WeYN038o70G69Nn5Aj2bzt/UD9aZI/19A1GAad2j/HovQFboAptsXAlekfy0VWWw22FAv4Rfusn6SP2YQGF+bmvgK9OQtxro2fVO8pz/8dDQYfRqmfaumklLMRsAmH0CQQZFeDgujNX507ns7b7GbV4j3HVHEjMpON9FcTMyTRZqbmWpB2mx0IYptS89JmtiJImTNctkYNSmw3bQTWloxjf1i7aisgCnm4XT0WMTro4QfLIPNIfdz5O9nKXyMXzyPOmlUCqMJ4V2J0Wzs1Gx7T/IDMrSf1x+2fg6zG6LdJSqug5meDbCiHu6bik2bcnWJAuLVDbV9Cu/vUCHoCaqqnsTqWHj0xUT/9pi3/CdaEeWHPEgI7g9/PVbcuJSKC8p07KOJKJcmbpkKOGqrCwFK8HemKFYbG2+K8MIU5QmotJiEb0/NYrjJ36gfEA7v/dSgzzkOmC3anYCaX+WVng0cW3TIaMytZPZD3IWQfILCup1cCdy/MAknJbwgYTZuah43JewynhS3kXyABHn/DVH2CU3DNhwXp79iGk5XhE0KL7DhsFCtWwRSIFkfOQ0tVU9j5SiE2vYzrRkJmuIuarOJ0+k5PBG35XCUOoCJGwuB2f6Q1WbjCkB4+JA6LdJSP5m9Swt24QUUcJAjwtJZGjsgNMWzfCuI729cARssLqgkYHo9qcgs33oM+2t7wVE/tuPQW3dFVg7C62EOl1Qa2jUX5rkw/QI+wC4VKHYyIAfC79refFZ+AR8ol+yQzIQjycuUUdaBcI4PhFfRKUBjTC8IW9wI3KznjcUds08BqqJMIhPgoNiXK2rmIOt5Y/FE4CFEnZD+uyh7HJ6P4oksgTGSWmZtkOcDHfM2RTekvg3SDzmOCqWxPJGp6HTbNfOyugnDv64XLWKOCb0+wy7glGBvUWnoyzFHqNVxmYPcIokMxykBTiT6iDpf2t63P+W1FSc2hUnWWaZlgyk03Kfv7ElVFr8fqAsN9erAjF6A8XL8KpMiRYrYuhv1VGf2rXzskGOqD6695slk2nC08l/1rN0VQZRQbEyWd76M16a83n+rWYTx/5Dij98EOmHVAAAAAElFTkSuQmCC"></img>
                </div>
                <div
                  className="text animate__animated animate__flipInX"
                  style={{ marginLeft: "10px", marginTop: "5px" }}
                >
                  <span style={{ fontSize: "12px", fontWeight: "600" }}>
                    Thanh toán trực tiếp
                  </span>
                  <div style={{ width: "155px", fontSize: "9px" }}>
                    Làm thủ tục thanh toán tại quầy của CSYT trước khi thực hiện
                    mỗi dịch vụ
                  </div>
                </div>
              </div>
              {this?.props?.successed === true ? (
                <input
                  className="radio2 animate__animated animate__flipInX"
                  type="radio"
                  name="radio"
                  value="offline"
                  disabled
                />
              ) : (
                <input
                  className="radio2 animate__animated animate__flipInX"
                  type="radio"
                  name="radio"
                  value="offline"
                />
              )}
            </label>
          </div>
          {this.state.typepay === "online" ? (
            <div className="App-stripe animate__animated animate__flipInX">
              <StripeContainer
                className="stripe"
                handleStripeContainer={this.handleStripeContainer}
              />
            </div>
          ) : (
            ""
          )}
        </div>
        <div
          onChange={(e) => this.handleTK(e)}
          style={{
            marginLeft: "30px",
            marginTop: "120px",
            marginBottom: "20px",
            position: "absolute",
            height: "40px",
            width: "87%",
            border: "1px solid #e5e5e5",
            paddingTop: "10px",
          }}
        >
          <input
            type="radio"
            name="radioTK"
            value={1}
            style={{ marginLeft: "40px" }}
          />
          <span
            style={{
              fontSize: "12px",
              marginLeft: "3px",
              position: "absolute",
            }}
          >
            Tái khám
          </span>
          <input
            type="radio"
            name="radioTK"
            value={0}
            style={{ marginLeft: "100px" }}
          />
          <span
            style={{
              fontSize: "12px",
              marginLeft: "3px",
              position: "absolute",
            }}
          >
            Khám mới
          </span>
        </div>
        <div className="table2">
          <div className="tong-tien">
            <span className="col1">Tổng tiền:</span>
            <span className="col2">{this.state.giakham}</span>
          </div>
          <div className="tong-thanh-toan">
            <span className="col1">Tổng thanh toán:</span>
            <span className="col2">{this.state.giakham} vnđ</span>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(page2);
