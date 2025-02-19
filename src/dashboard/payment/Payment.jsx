import SectionTitle from "../../components/SectionTitle";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
import { useParams } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Payment = () => {
  const { id } = useParams();
  return (
    <div className="p-6 md:p-16">
      <SectionTitle
        title="Payment"
        subtitle="Make a Payment to confirm your booking"
      />

      <Elements stripe={stripePromise}>
        <CheckOutForm id={id} />
      </Elements>
    </div>
  );
};

export default Payment;
