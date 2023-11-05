import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Root from "../page/Root";
import Home from "../page/Home";
import Login from "../Components/login/Login";
import SignUp from "../Components/Signup/SignUp";
import PrivetRoute from "../PrivateRoute/PrivetRoute";
import ErrorPage from "../Components/ErrorPage/ErrorPage";
const Route = () => {
    const router = createBrowserRouter([
        {
          path: "/",
          element:<Root></Root>,
          errorElement:<ErrorPage></ErrorPage>,
          children:[
           {
            path:'/',
            element:<Home></Home>
           },
           {
            path:'/login',
            element:<Login></Login>
           },
           {
            path:'/signup',
            element:<SignUp></SignUp>
           },
         
          ]
        },
      ]);
  return <RouterProvider router={router} />
}

export default Route
