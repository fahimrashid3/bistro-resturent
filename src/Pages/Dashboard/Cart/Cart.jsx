import Swal from "sweetalert2";
import useCart from "../../../hooks/useCart";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
  const [cart, refetch] = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const axiosSecure = useAxiosSecure();

  const handelDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/cards/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-4xl">Items:{cart.length}</h2>
        <h2 className="text-4xl">Total Price: $ {totalPrice}</h2>
        <button className="btn btn-outline btn-warning">Pay</button>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label># </label>
              </th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={item._id}>
                <th>
                  <label>{index + 1} </label>
                </th>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={item.image}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </td>
                <td className="text-2xl font-semibold">{item.name}</td>
                <td className="text-xl">{item.price}</td>
                <th>
                  <button
                    onClick={() => handelDelete(item._id)}
                    className="text-red-500 text-2xl btn btn-ghost"
                  >
                    <FaTrash></FaTrash>
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
