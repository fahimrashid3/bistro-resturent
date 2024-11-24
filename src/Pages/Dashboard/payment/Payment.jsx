import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../Compunents/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

// TODO : add publishable key
// const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const stripePromise = loadStripe(
  "pk_test_51QO3gFAZwNARm8t4qwlmPrkZzVhOOU1jW3EAmmbxM8lYlovXQao4VcRcTC2LWntrvnwo2u1oPcGn39BqoiA3V4B800kRviMXI7"
);
const Payment = () => {
  return (
    <div>
      <SectionTitle
        heading="Make a payment"
        subHeading="payment to confirm"
      ></SectionTitle>
      <Elements stripe={stripePromise}>
        <CheckoutForm></CheckoutForm>
      </Elements>
    </div>
  );
};

export default Payment;
