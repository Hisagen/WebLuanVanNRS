import * as React from "react";
import { connect } from "react-redux";
import moment from "moment";

import Box from "@mui/material/Box";
import Stepper, { StepperContext } from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Page1 from "./display/page1.js";
import Page2 from "./display/page2.js";
import Page3 from "./display/page3.js";
import { toast } from "react-toastify";
import BookingModalThanhToan from "../Modal/BookingModalThanhToan";
import BookingModal_DN from "../Modal/BookingModal_DN";

import { createDangkyService } from "../../../../services/dangkyService";
import { createLichkhamService } from "../../../../services/lichkhamService";
import { postPatientBookAppoinment } from "../../../../services/benhnhanService";
import "./content.scss";
import { Switch } from "@mui/material";
import { Facebook, Spa } from "@material-ui/icons";
import { createLogger } from "redux-logger";
const steps = ["Thông tin đặt khám", "Thanh toán", "Hoàn thành thanh toán"];

function Content(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [check, setCheck] = React.useState(false);
  const [trieuchung, setTrieuchung] = React.useState("");
  const [taikham, setTaikham] = React.useState("");
  const [isOpenModalThanhToan, setIsOpenModalThanhToan] = React.useState(false);
  const [data, setData] = React.useState();
  const [ngaysinh, setNgaysinh] = React.useState();
  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = (resume) => {
    if (props?.isLoggedInBN === false) {
      toast.error("Vui Lòng Đăng Nhập !!!");
    } else if (trieuchung === "") {
      toast.error("Vui Lòng Nhập Triệu Chứng !!!");
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    if (data) {
      setData("");
    }
  };

  const handleConfirmBooking = async () => {
    let date = new Date(ngaysinh).getTime();
    setNgaysinh(date);
    let id_bacsi = props?.phong.id_lichbacsikham;
    let gio = props?.phong.khunggio;

    let id_pttt;
    let trangthaitt;
    if (data?.typepay === "offline") {
      id_pttt = 1;
      trangthaitt = "chưa thanh toán";
    } else {
      if (data?.typepay === "online") {
        id_pttt = 2;
        trangthaitt = "đã thanh toán";
      }
    }
    let res2 = await createDangkyService({
      id_lichbacsikham: id_bacsi,
      id_lichkham: props?.phong.id,
      id_benhnhan: props?.benhnhanInfo.benhnhan.id,
      trangthai: "Chưa khám",
      id_pttt: id_pttt,
      giakham: data.giakham,
      trangthaitt: trangthaitt,
      trieuchung: trieuchung,
      taikham: taikham,
    });

    let day = moment(props.phong?.lichkhamlichbacsikham?.ngay).format(
      "DD/MM/YYYY"
    );
    let res3 = await postPatientBookAppoinment({
      tenbacsi: props?.detailDoctor.hoten,
      tenkhungio: props?.phong.khunggio,
      email: props?.benhnhanInfo.benhnhan.email,
      phong: props?.phong.lichkhamlichbacsikham.lichbacsikhamphong.tenphong,
      chuyenkhoa:
        props?.phong.lichkhamlichbacsikham.lichbacsikhamphong.phongchuyenkhoa
          .tenchuyenkhoa,
      ngay: day,
      tenbenhnhan: props?.benhnhanInfo.benhnhan.hoten,
      sdtbacsi: props?.detailDoctor.sdt,
    });
    if (
      props?.benhnhanInfo &&
      props?.benhnhanInfo.errCode === 0 &&
      res2 &&
      res2.errCode === 0
    ) {
      toast.success("Đặt lịch khám bệnh thành công");
      setActiveStep((prevActiveStep) => prevActiveStep + 2);
      props?.handleSuccess("success");
      const timer = setTimeout(() => {
        window.location.reload();
      }, 5000);
    } else {
      toast.error("Đặt lịch khám bệnh thất bại");
    }
  };
  const page2 = (item) => {
    if (item?.typepay) {
      setData(item);
    }
    // setData((previousState) => {
    //   return { ...previousState, item };
    // });
    if (item?.resumePay) {
      setData((previousState) => {
        return { ...previousState, item };
      });
    }

    if (item?.giakham) {
      setData((previousState) => {
        return { ...previousState, giakham: item?.giakham };
      });
    }
  };
  let handletrieuchung = (data) => {
    setTrieuchung(data);
  };
  // let hanldeCloseBooking = (data) => {
  //   props.closeModalBooking(data);
  // };
  let handletaikham = (data) => {
    setTaikham(data);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption"></Typography>;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === 0 ? (
          <>
            <Page1
              formpage1={"page1"}
              phong={props?.phong}
              handletrieuchung={handletrieuchung}
              trieuchung={trieuchung}
              // closeModalBooking={hanldeCloseBooking}
            />
            {activeStep === steps.length ? (
              ""
            ) : (
              <React.Fragment>
                {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  {activeStep === steps.length - 1 ? (
                    <Box sx={{ flex: "1 1 auto" }} />
                  ) : (
                    <>
                      <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                      >
                        Trước
                      </Button>
                      <Box sx={{ flex: "1 1 auto" }} />
                    </>
                  )}

                  {/* {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )} */}

                  <Button onClick={handleNext}>
                    {activeStep === steps.length - 1 ? "" : "Tiếp tục"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </>
        ) : (
          <>
            {activeStep === 1 ? (
              <>
                <Page2
                  formpage2={"page2"}
                  phong={props?.phong}
                  page2={page2}
                  successed={
                    data?.item?.resumePay?.item?.responsePay?.data.success
                  }
                  gettaikham={handletaikham}
                />
                {activeStep === steps.length ? (
                  ""
                ) : (
                  <React.Fragment>
                    {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      {activeStep === steps.length - 1 ? (
                        <Box sx={{ flex: "1 1 auto" }} />
                      ) : (
                        <>
                          {data?.item?.resumePay?.item?.responsePay?.data
                            .success === true ? (
                            <Button
                              disabled
                              color="inherit"
                              // disabled={activeStep === 0}
                              onClick={handleBack}
                              sx={{ mr: 1 }}
                            >
                              Trước
                            </Button>
                          ) : (
                            <Button
                              color="inherit"
                              disabled={activeStep === 0}
                              onClick={handleBack}
                              sx={{ mr: 1 }}
                            >
                              Trước
                            </Button>
                          )}

                          <Box sx={{ flex: "1 1 auto" }} />
                        </>
                      )}

                      {data?.typepay == "offline" && taikham !== "" ? (
                        <Button onClick={handleConfirmBooking}>
                          {activeStep === steps.length - 1 ? "" : "Tiếp tục"}
                          <BookingModalThanhToan page={activeStep} />
                        </Button>
                      ) : (
                        <>
                          {data?.typepay == "online" &&
                          taikham !== "" &&
                          data?.item?.resumePay?.item?.responsePay?.data
                            .success === true ? (
                            <Button onClick={handleConfirmBooking}>
                              {activeStep === steps.length - 1
                                ? ""
                                : "Tiếp tục"}
                              <BookingModalThanhToan page={activeStep} />
                            </Button>
                          ) : (
                            <Button onClick={handleConfirmBooking} disabled>
                              {activeStep === steps.length - 1
                                ? ""
                                : "Tiếp tục"}
                              <BookingModalThanhToan page={activeStep} />
                            </Button>
                          )}
                        </>
                      )}
                    </Box>
                  </React.Fragment>
                )}
              </>
            ) : (
              <>
                <Page3 formpage3={"page3"} phong={props?.phong} />
                {activeStep === steps.length ? (
                  ""
                ) : (
                  <React.Fragment>
                    {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      {activeStep === steps.length - 1 ? (
                        <Box sx={{ flex: "1 1 auto" }} />
                      ) : (
                        <>
                          <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                          >
                            Trước
                          </Button>
                          <Box sx={{ flex: "1 1 auto" }} />
                        </>
                      )}

                      {/* {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )} */}

                      {props?.isLoggedInBN === true ? (
                        <Button onClick={handleNext}>
                          {activeStep === steps.length - 1 ? "" : "Tiếp tục"}
                          <BookingModalThanhToan page={activeStep} />
                        </Button>
                      ) : (
                        <Button onClick={handleNext} disabled>
                          {activeStep === steps.length - 1 ? "" : "Tiếp tục"}
                        </Button>
                      )}
                    </Box>
                  </React.Fragment>
                )}
              </>
            )}
          </>
        )}
      </div>
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedInBN: state.benhnhan.isLoggedInBN,
    benhnhanInfo: state.benhnhan.benhnhanInfo,
  };
};
export default connect(mapStateToProps)(Content);
