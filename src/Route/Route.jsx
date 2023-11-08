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
import Foods from "../page/Foods/Foods";
import FoodDetails from "../page/FoodDetails/FoodDetails";
import ManageFood from "../page/ManageFood/ManageFood";
import UpdateFood from "../page/UpdateFood/UpdateFood";
import ManageSingleFood from "../page/ManageSingleFood/ManageSingleFood";
import MyFoodRequest from "../page/MyFoodRequest/MyFoodRequest";
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
            path:'/requestedFood',
            element:<MyFoodRequest><AddFood></AddFood></MyFoodRequest>
           },
       
           {
            path:'/login',
            element:<Login></Login>
           },
           {
            path:'/signup',
            element:<SignUp></SignUp>
           },
           {
            path:'/foods',
            element:<Foods></Foods>,
            loader: ()=> fetch('http://localhost:5000/foodcount')
           },
           {
            path:'/details/:id',
            element:<FoodDetails></FoodDetails>
           },
           {
            path:'/manageFood',
            element: <PrivetRoute><ManageFood></ManageFood></PrivetRoute>
           },
           {
            path:'/update/:id',
            element: <PrivetRoute><UpdateFood></UpdateFood></PrivetRoute>
           },
           {
            path:'/manage/:id',
            element: <PrivetRoute><ManageSingleFood></ManageSingleFood></PrivetRoute>
           },

          ]
        },
      ]);
  return <RouterProvider router={router} />
}

export default Route
