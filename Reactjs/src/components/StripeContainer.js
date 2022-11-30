import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY =
  "pk_test_51LhQ6JGQUY2UVaoXvkAzHoFNu1kdaU5hrq2lNyuMcRORKrhUP7XbSou2iw3teKfMhgzt9jzHenWMyKPprvnhZxvg00WAvxmflf";

const stripeTestPromise = loadStripe(PUBLIC_KEY);
export default function StripeContainer(props) {
  const handleResumePay = (item) => {
    if (item !== undefined) {
      props.handleStripeContainer({ item: item });
    }
  };

  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm handleResumePay={handleResumePay} />
    </Elements>
  );
}
