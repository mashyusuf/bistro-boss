import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu/Menu";
import Order from "../pages/Order/Order/Order";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Secret from "../pages/Shared/Secret/Secret";
import DashBoard from "../Layout/DashBoard";
import Cart from "../pages/DashBoard/Cart";
import AllUsers from "../pages/DashBoard/AllUsers/AllUsers";
import AddItems from "../pages/DashBoard/addItems/AddItems";
import AdminRoute from "./AdminRoute";
import MangeItems from "../pages/DashBoard/MangeItems/MangeItems";
import UpdateItem from "../pages/DashBoard/updateItem/UpdateItem";
import Payment from "../pages/DashBoard/payment/Payment";
import PaymentHistroy from "../pages/DashBoard/payment histroy/PaymentHistroy";
import UserHome from "../pages/DashBoard/userHome/UserHome";
import AdminHome from "../pages/DashBoard/admin Home/AdminHome";


  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        }, 
        {
          path: 'menu', 
          element: <Menu></Menu>
        },
        {
          path: 'order/:category',
          element: <Order></Order>
        },
        {
          path: 'login',
          element: <Login></Login>
        },
        {
          path: 'signup',
          element: <SignUp></SignUp>
        },
        {
          path: 'secret',
          element: <PrivateRoute><Secret></Secret></PrivateRoute>
        }
      ]
    },
    {
      path: 'dashboard',
      element: <DashBoard></DashBoard>,
      children:[
        {
          path: 'userHome',
          element: <UserHome></UserHome>
       },
        {
          path: 'cart',
          element: <Cart></Cart>
       },
        {
          path: 'payment',
          element: <Payment></Payment>
       },
        {
          path: 'paymentHistory',
          element: <PaymentHistroy></PaymentHistroy>
       },
       //----Admin Time-----
       {
        path: 'adminHome',
        element: <AdminRoute><AdminHome></AdminHome></AdminRoute>,
       },
       {
        path: 'allUsers',
        element: <AdminRoute><AllUsers></AllUsers></AdminRoute>,
       },
       {
        path: 'manageItems',
        element: <AdminRoute><MangeItems></MangeItems></AdminRoute>,
       },
       {
        path: 'updateItem/:id',
        element: <AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
        loader: ({params}) => fetch(`http://localhost:5000/menu/${params.id}`)
      },
       {
        path: 'addItems',
        element: <AdminRoute><AddItems></AddItems></AdminRoute>
       }
    ]
    }
  ]);
  