import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import useBookings from "../../hooks/useBookings";

const CheckOutForm = () => {
  const [error, setError] = useState();
  const [clientSecret, setClientSecret] = useState();
  const [transectionId, setTransectionId] = useState();
  const { user } = useAuth();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [bookings, refetch] = useBookings();
  const totalPrice = bookings.reduce((total, item) => total + item.price, 0);

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);

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
      price: totalPrice,
      date: new Date(),
      bookingsIds: bookings.map((item) => item._id),
      menuIds: bookings.map((item) => item.menuId),
      status: "pending",
    };
    const { data } = await axiosSecure.post("/payment", payment);
    console.log(data);
    if (data?.result?.insertedId) {
      refetch();
      toast("Payment Successfull");
      navigate("/dashboard/paymentHistory");
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
