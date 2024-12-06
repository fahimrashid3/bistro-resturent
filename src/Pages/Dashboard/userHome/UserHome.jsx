import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { IoMdCart } from "react-icons/io";
import { BsCurrencyDollar } from "react-icons/bs";
import Swal from "sweetalert2";
const UserHome = () => {
  const { logOut, user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [userInfo, setUserInfo] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/user?email=${user.email}`)
        .then((res) => {
          setUserInfo(res.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [user?.email, axiosSecure]);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/payments?email=${user.email}`)
        .then((res) => {
          setPaymentInfo(res.data);
        })
        .catch((error) => {
          console.error("Error fetching payment data:", error);
        });
    }
  }, [user?.email, axiosSecure]);

  useEffect(() => {
    if (userInfo && paymentInfo.length) {
      setLoading(false);
    }
  }, [userInfo, paymentInfo]);

  if (loading) {
    return (
      <span className="loading loading-infinity loading-lg text-warning"></span>
    );
  }

  // Calculate total price
  const totalPrice = paymentInfo.length
    ? paymentInfo
        .reduce((total, item) => {
          const price = parseFloat(item.price);
          return !isNaN(price) ? total + price : total;
        }, 0)
        .toFixed(2)
    : 0;

  const handelLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You well be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut().then(() => {
          Swal.fire({
            title: "Log Out!",
            text: "Logout successful .",
            icon: "success",
          });
        });
      }
    });
  };

  return (
    <div className="space-y-5 text-black dark:text-white">
      <h2 className="text-3xl">Hi, welcome Back</h2>
      <div className="md:flex gap-5 justify-center">
        <div className="bg-orange-200 rounded-lg p-10 space-y-5 flex-1">
          <h2 className="text-3xl text-center font-bold">Your Information</h2>
          {userInfo.photoUrl ? (
            <img
              className="rounded-full w-60 h-60 mx-auto"
              src={userInfo?.photoUrl}
              alt="User Avatar"
            />
          ) : (
            <img
              className="rounded-full w-60 h-60 mx-auto"
              src={user.photoURL}
              alt="User Avatar"
            />
          )}

          <h2 className="text-3xl text-center font-bold uppercase">
            {userInfo?.name || "Loading..."}
          </h2>
        </div>
        <div className="bg-yellow-200 rounded-lg p-10 space-y-5 flex-1">
          <h2 className="text-3xl text-center font-bold">Your Activities</h2>
          <div className="text-xl font-semibold pl-10 pt-20 space-y-5">
            <p className="flex items-center gap-2 text-blue-600">
              <IoMdCart />
              Total Payment : {paymentInfo.length}{" "}
            </p>
            <p className="flex items-center gap-2 text-green-600">
              <BsCurrencyDollar /> Total payment : {totalPrice} $
            </p>
          </div>
        </div>
      </div>
      <button
        onClick={handelLogOut}
        className="btn btn-error hover:btn-neutral btn-outline border-0 border-b-4 mx-auto flex mt-10"
      >
        Log out
      </button>
    </div>
  );
};

export default UserHome;
