import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import "./PaymentForm.scss";
import { toast } from "react-toastify";
import { flatMap } from "lodash";

const CARD_OPTIONS = {
  iconStyle: "solid",

  style: {
    base: {
      iconColor: "#1976d2",
      color: "#1976d2",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "20px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#1976d2" },
    },

    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

export default function PaymentForm(props) {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const billingDetails = {
    //   address: {
    //     city: e.target.city.value,
    //     line1: e.target.address.value,
    //     state: e.target.state.value,
    //     postal_code: e.target.zip.value,
    //   },
    // };
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      // billing_details: billingDetails,
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:8082/payment", {
          amount: 1000,
          id,
        });
        if (response.data.success) {
          console.log("response", response);
          props.handleResumePay({ responsePay: response });
          toast.success("Bạn đã thanh toán bằng thẻ thành công");
          setSuccess(true);
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      toast.error(error.message);
    }
  };

  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS}></CardElement>
            </div>
          </fieldset>
          <button className="btn-pay">Thanh Toán</button>
        </form>
      ) : (
        <div
          className="FormRow animate__animated animate__flash"
          style={{ color: "#02b875" }}
        >
          <i className=" fas fa-check-circle " /> Bạn đã thanh toán thành công
        </div>
      )}
    </>
  );
}
