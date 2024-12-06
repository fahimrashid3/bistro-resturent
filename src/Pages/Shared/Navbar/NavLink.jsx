import { NavLink } from "react-router-dom";
import cartIcon from "../../../assets/icon/151-1511569_cart-notifications-free-shopping-cart-favicon-hd-png-removebg-preview.png";
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";
const NavLinks = () => {
  const [cart] = useCart();
  const [isAdmin] = useAdmin();

  return (
    <>
      <li>
        <NavLink
          style={({ isActive, isTransitioning }) => {
            return {
              background: isActive ? "transparent" : "",
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "#F7B801" : "white",
              viewTransitionName: isTransitioning ? "slide" : "",
            };
          }}
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          style={({ isActive, isTransitioning }) => {
            return {
              background: isActive ? "transparent" : "",
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "#F7B801" : "white",
              viewTransitionName: isTransitioning ? "slide" : "",
            };
          }}
          to="/menu"
        >
          Our Menu
        </NavLink>
      </li>

      <li>
        <NavLink
          style={({ isActive, isTransitioning }) => {
            return {
              background: isActive ? "transparent" : "",
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "#F7B801" : "white",
              viewTransitionName: isTransitioning ? "slide" : "",
            };
          }}
          to="/order/pizza"
        >
          Order Food
        </NavLink>
      </li>
      <li>
        <NavLink
          style={({ isActive, isTransitioning }) => {
            return {
              background: isActive ? "transparent" : "",
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "#F7B801" : "white",
              viewTransitionName: isTransitioning ? "slide" : "",
            };
          }}
          to="/contactUs"
        >
          Contact Us
        </NavLink>
      </li>
      <li>
        <NavLink
          style={({ isActive, isTransitioning }) => {
            return {
              background: isActive ? "transparent" : "",
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "#F7B801" : "white",
              viewTransitionName: isTransitioning ? "slide" : "",
            };
          }}
          // isAdmin
          to={isAdmin ? "/dashboard/adminHome" : "/dashboard/userHome"}
          // to="/dashboard"
        >
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink
          style={({ isActive, isTransitioning }) => {
            return {
              background: isActive ? "transparent" : "",
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "#F7B801" : "white",
              viewTransitionName: isTransitioning ? "slide" : "",
            };
          }}
          to="/dashboard/cart"
        >
          <button className="btn btn-ghost ">
            <img src={cartIcon} className="w-12 " alt="" />
            <div className="badge badge-secondary -ml-7 -mb-6">
              {cart.length}
            </div>
          </button>
        </NavLink>
      </li>
    </>
  );
};

export default NavLinks;
