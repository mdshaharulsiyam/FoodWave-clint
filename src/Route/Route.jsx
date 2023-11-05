import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Root from "../page/Root";
import Home from "../page/Home";
import Login from "../Components/login/Login";
const Route = () => {
    const router = createBrowserRouter([
        {
          path: "/",
          element:<Root></Root>,
          children:[
           {
            path:'/',
            element:<Home></Home>
           },
           {
            path:'/login',
            element:<Login></Login>
           },
          ]
        },
      ]);
  return <RouterProvider router={router} />
}

export default Route
