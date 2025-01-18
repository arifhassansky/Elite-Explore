import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
const CheckOutForm = ({ id }) => {
  const [error, setError] = useState();
  const [clientSecret, setClientSecret] = useState();
  const [transectionId, setTransectionId] = useState();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [booking, setBooking] = useState();
  console.log(booking);

  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get(`/book/${id}`).then((res) => setBooking(res.data));
  }, [axiosSecure, id]);

  useEffect(() => {
    if (booking?.price > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: booking?.price })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, booking?.price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("error", error);
      setError(error.message);
    } else {
      console.log("PaymentMethod", paymentMethod);
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymus",
            name: user?.displayName || "anonymus",
          },
        },
      });
    if (confirmError) {
      console.log("confirm error", confirmError);
    } else {
      console.log("payment intenent", paymentIntent);
      setTransectionId(paymentIntent.id);
    }
    // now send the payment info to the database
    const payment = {
      transectionId: paymentIntent.id,
      email: user?.email,
      price: booking?.price,
      date: new Date(),
      bookingsId: booking._id,
      packageId: booking?.packageId,
      status: "pending",
    };
    const { data } = await axiosSecure.post("/payment", payment);
    console.log(data);
    if (data?.result?.insertedId) {
      toast("Payment Successfull");
      navigate("/dashboard/payment-history");
    }
  };
  return (
    <div className="payment-container">
      <form onSubmit={handleSubmit} className="space-y-4">
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
          className="border p-3 rounded-lg shadow-sm"
        />

        <button
          type="submit"
          className={`btn btn-warning my-4 ${
            !stripe || !clientSecret ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!stripe || !clientSecret}
        >
          Pay Now
        </button>
      </form>

      {error && <p className="text-red-600 mt-2">{error}</p>}

      {transectionId && (
        <p className="text-green-600 mt-4 font-medium">
          Payment successful! <br />
          <strong>Transaction ID:</strong> {transectionId}
        </p>
      )}
    </div>
  );
};

export default CheckOutForm;
