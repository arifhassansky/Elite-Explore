import { useQuery } from "@tanstack/react-query";

import moment from "moment";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import SectionTitle from "../../components/SectionTitle";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: payments = [] } = useQuery({
    queryKey: ["paymentHistory", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/payment/${user?.email}`);
      return data;
    },
  });

  return (
    <div className="px-2 md:px-10 lg:p-16">
      <SectionTitle
        title="Payment History"
        subtitle="Comprehensive History at a Glance"
      />

      <h2 className="font-semibold text-4xl">
        Total Payment: {payments.length}
      </h2>

      <div className="overflow-x-auto rounded-xl max-w-[320px] md:max-w-[620px] lg:max-w-full  mx-auto">
        <table className="table table-zebra w-full my-8 ">
          {/* head */}
          <thead>
            <tr className="bg-secondary text-white">
              <th>#</th>
              <th>Email</th>
              <th>Transaction ID</th>
              <th>Total Price</th>
              <th>Payment Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <th>{index + 1}</th>
                <td>{payment.email}</td>
                <td>{payment.transectionId}</td>
                <td>{payment.price}</td>
                <td>
                  {moment(payment.date).format("MMMM Do YYYY, h:mm:ss a")}
                </td>
                <td>{payment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
