import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Compunents/SectionTitle/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: paymentHistory = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email, // Only fetch data when the email is available
  });

  console.log(paymentHistory);

  return (
    <div className="-mt-20">
      <SectionTitle
        heading="Payment History"
        subHeading="check your orders history"
      ></SectionTitle>
      <div className="flex items-center justify-between">
        <h2 className="text-4xl">Total order :{paymentHistory.length}</h2>
        {/* <h2 className="text-4xl">Total Price: $ {totalAmount}</h2> */}
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label># </label>
              </th>
              <th>Name</th>
              <th>date</th>
              <th>time</th>
              <th>price</th>
              <th>transactionId</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map((item, index) => (
              <tr key={item._id}>
                <th>
                  <label>{index + 1} </label>
                </th>
                <td className="text-2xl font-semibold">{item.name}</td>
                <td className="text-2xl font-semibold">{item.date}</td>
                <td className="text-2xl font-semibold">{item.time}</td>
                <td className="text-2xl font-semibold">{item.price}</td>
                <td className="text-xl">{item.transactionId}</td>
                <td className="text-xl">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
