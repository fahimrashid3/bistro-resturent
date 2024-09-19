import { NavLink, Outlet } from "react-router-dom";
import {
  FaCalendar,
  FaCalendarCheck,
  FaDollarSign,
  FaHome,
  FaPhone,
  FaShoppingCart,
} from "react-icons/fa";
import { MdOutlineMenuOpen, MdReviews } from "react-icons/md";
import { FaShop } from "react-icons/fa6";

const DashBoard = () => {
  // todo : get isAdmin value from database
  // const isAdmin = true;
  return (
    <div className="flex">
      {/* dashboard side bar */}
      <div className="w-72 min-h-screen bg-[#D1A054] p-10">
        <ul className="menu text-lg">
          <li>
            <NavLink to="/dashboard/userHome">
              <FaHome></FaHome>
              User Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/reservation">
              <FaCalendar></FaCalendar>
              Reservation
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/paymentHistory">
              <FaDollarSign></FaDollarSign>
              Payment History
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/cart">
              <FaShoppingCart />
              My cart
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/review">
              <MdReviews />
              Reviews
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/bookings">
              <FaCalendarCheck />
              My Bookings
            </NavLink>
          </li>
          <div className="divider"></div>
          {/* shared nav */}
          <li>
            <NavLink to="/">
              <FaHome></FaHome>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/pizza">
              <MdOutlineMenuOpen />
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop">
              <FaShop></FaShop>
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact">
              <FaPhone></FaPhone>
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
      {/* dashboard content */}
      <div className="flex-grow md:p-10">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashBoard;
