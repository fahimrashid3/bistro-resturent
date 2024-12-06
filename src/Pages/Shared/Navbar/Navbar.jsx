import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import logo from "../../../assets/logo.png";
// import useAdmin from "../../../hooks/useAdmin";

import Swal from "sweetalert2";
// import { useContext } from "react";
// import { AuthContext } from "../../../Providers/AuthProvider/AuthProvider";
// import { IoCartOutline } from "react-icons/io5";
// import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";
import NavLinks from "./NavLink";

const Navbar = () => {
  const { logOut, user } = useAuth();
  // const [isAdmin] = useAdmin();
  // const [cart] = useCart();

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
    <div className="navbar fixed z-10 bg-opacity-50 text-white max-w-screen-2xl bg-dark-700 rounded-lg">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <NavLinks></NavLinks>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost">
          <img className="h-12 lg:px-10 md:px-8 px-0" src={logo} alt="" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {" "}
          <NavLinks></NavLinks>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className=" pr-5 text-4xl dark:text-dark-900 dark:hover:text-dark-700 text-white hover:text-gray-300"
          >
            <CgProfile />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-dark-900 text-white dark:bg-gray-400 dark:text-dark-900  rounded-box z-[1] w-52 p-2 shadow"
          >
            <li>
              <Link to="/dashboard/userHome">User Home</Link>
            </li>
            {user ? (
              <li>
                <Link onClick={handelLogOut}>Logout</Link>
              </li>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
