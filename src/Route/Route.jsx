import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Root from "../page/Root";
import PrivetRoute from "../PrivateRoute/PrivetRoute";
import ErrorPage from "../Components/ErrorPage/ErrorPage";
import Home from "../page/Home/Home";
import Login from "../page/login/Login";
import SignUp from "../page/Signup/SignUp";
import AddFood from "../page/AddFood/AddFood";
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
            path:'/addfood',
            element:<PrivetRoute><AddFood></AddFood></PrivetRoute>
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
