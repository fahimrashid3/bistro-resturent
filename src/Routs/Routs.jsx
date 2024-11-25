import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import Order from "../Pages/Order/Order/Order";
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Registration/Registration";
import Secret from "../Pages/Shared/Secret/Secret";
import PrivetRouts from "./PrivetRouts";
import DashBoard from "../Layout/DashBoard";
import Cart from "../Pages/Dashboard/Cart/Cart";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AddItems from "../Pages/Dashboard/addItems/AddItems";
import AdminRouts from "./AdminRouts";
import ManageItems from "../Pages/Dashboard/manageItems/ManageItems";
import UpdateItem from "../Pages/Dashboard/manageItems/UpdateItem";
import Payment from "../Pages/Dashboard/payment/Payment";
import PaymentHistory from "../Pages/Dashboard/paymentHistory/PaymentHistory";
import UserHome from "../Pages/Dashboard/userHome/UserHome";
import AdminHome from "../Pages/Dashboard/adminHome/AdminHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/menu",
        element: <Menu></Menu>,
      },
      {
        path: "/order/:category",
        element: <Order></Order>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/registration",
        element: <Registration></Registration>,
      },
      {
        path: "/secret",
        element: (
          <PrivetRouts>
            <Secret></Secret>
          </PrivetRouts>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivetRouts>
        <DashBoard></DashBoard>
      </PrivetRouts>
    ),
    children: [
      // normal user routs
      {
        path: "userHome",
        element: <UserHome></UserHome>,
      },
      {
        path: "cart",
        element: <Cart></Cart>,
      },
      {
        path: "paymentHistory",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "payment",
        element: <Payment></Payment>,
      },
      // admin routs
      {
        path: "adminHome",
        element: (
          <AdminRouts>
            <AdminHome></AdminHome>
          </AdminRouts>
        ),
      },
      {
        path: "users",
        element: (
          <AdminRouts>
            <AllUsers></AllUsers>
          </AdminRouts>
        ),
      },
      {
        path: "addItems",
        element: (
          <AdminRouts>
            <AddItems></AddItems>
          </AdminRouts>
        ),
      },
      {
        path: "updateItm/:id",
        element: (
          <AdminRouts>
            <UpdateItem></UpdateItem>
          </AdminRouts>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/menu/${params.id}`),
      },
      {
        path: "manageItems",
        element: (
          <AdminRouts>
            <ManageItems></ManageItems>
          </AdminRouts>
        ),
      },
    ],
  },
]);

export default router;
