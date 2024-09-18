import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";

const ItemCard = ({ item }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const AxiosSecure = useAxiosSecure();
  const [, refetch] = useCart();

  const { name, image, recipe, price, _id } = item;
  const handelAddToCart = () => {
    if (user && user.email) {
      Swal.fire({
        title: "Are you sure?",
        text: "Add item to cart!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, add to cart!",
      }).then((result) => {
        if (result.isConfirmed) {
          // sent item to the db

          const cartItem = {
            menuId: _id,
            email: user.email,
            name,
            image,
            price,
          };
          AxiosSecure.post("/carts", cartItem).then((res) => {
            console.log(res.data);
          });

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "You must login before add item",
            showConfirmButton: false,
            timer: 1000,
          });
          // refetch the card items to add item automatically
          refetch();
        }
      });
    } else {
      Swal.fire({
        title: "Please Login",
        text: "Please Login to add item to the cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login Now!",
      }).then((result) => {
        if (result.isConfirmed) {
          // sent the user to login page
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };
  return (
    <div className="card card-compact bg-base-100 shadow-xl text-center">
      <figure>
        <img src={image} alt={name} />
      </figure>
      <p
        className="
         btn btn-ghost bg-dark-900 dark:bg-white  text-white dark:text-dark-900 hover:text-[#D99904] text-sm hover:text-lg absolute right-4 top-4 px-2 py-1 rounded-lg"
      >
        $ {price}
      </p>
      <div className="card-body">
        <h2 className="font-bold text-xl text-center">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions justify-center">
          <button
            onClick={handelAddToCart}
            className="btn btn-warning hover:btn-neutral btn-outline border-0 border-b-4 "
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
