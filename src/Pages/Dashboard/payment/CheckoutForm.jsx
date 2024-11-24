import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";

const CheckoutForm = () => {
  const [error, setError] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [cart] = useCart();
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState("");
  const price = cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  console.log(price);

  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { price }).then((res) => {
      console.log(res.data);
      setClientSecret(res.data.clientSecret);
    });
  }, [axiosSecure, price]);

  const handelSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("payment error :", error);
      setError(error.message);
    } else {
      console.log("payment methods :", paymentMethod);
      setError("");
    }
    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          // cart: cart,
          card: elements.getElement(CardElement), // Pass the Stripe CardElement here

          billing_details: {
            email: user?.email || "anonymous",
            name: user?.name || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log("payment intent error:", confirmError.message);
    } else {
      console.log("payment intent :", paymentIntent);
      if (paymentIntent.status == "succeeded") {
        console.log(paymentIntent.id);
        setTransactionId(paymentIntent.id);
        // save the payment info
        const paymentInfo = {
          email: user.email,
          name: user.name || "nam nai",
          price: price,
          date: new Date(), //TODO:convert time to utc time using moment js
          cartIds: cart.map((item) => item._id),
          menuItemIds: cart.map((item) => item.menuId),
          status: "pending",
          transactionId: paymentIntent.id,
        };
        const res = await axiosSecure.post("/payments", paymentInfo);
        console.log("payment saved", res.data);
      }
    }
  };
  return (
    <form onSubmit={handelSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      ></CardElement>
      <button
        className="btn btn-warning w-full"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      <p className="text-red-500">{error}</p>
      {transactionId && (
        <p className="text-green-500">your transaction Id : {transactionId}</p>
      )}
    </form>
  );
};

export default CheckoutForm;
