import { NavLink, Outlet } from "react-router-dom";
import {
  FaCalendar,
  FaCalendarCheck,
  FaDollarSign,
  FaHome,
  FaPhone,
  FaShoppingCart,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import { MdOutlineMenuOpen, MdReviews } from "react-icons/md";
import { FaShop } from "react-icons/fa6";
import useAdmin from "../hooks/useAdmin";

const DashBoard = () => {
  // todo : get isAdmin value from database
  const [isAdmin] = useAdmin();
  return (
    <div className="flex text-dark-900 dark:text-white">
      {/* dashboard side bar */}
      <div className="w-80 min-h-screen bg-[#D1A054] p-10">
        <ul className="menu text-lg">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/adminHome">
                  <FaHome></FaHome>
                  Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addItems">
                  <FaUtensils />
                  add items
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageItems">
                  <MdOutlineMenuOpen></MdOutlineMenuOpen>
                  Manage Items
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/bookings">
                  <FaCalendarCheck />
                  Manage Bookings
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/users">
                  <FaUsers />
                  All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
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
                  <FaCalendar />
                  My Bookings
                </NavLink>
              </li>
            </>
          )}
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
            <NavLink to="/menu">
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
      {/* <div className="flex-grow md:p-10"> */}
      <div className="flex-grow p-10 overflow-y-auto h-screen">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashBoard;
