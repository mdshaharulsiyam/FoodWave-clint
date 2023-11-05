import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Root from "../page/Root";
import Home from "../page/Home";
const Route = () => {
    const router = createBrowserRouter([
        {
          path: "/",
          element:<Root></Root>,
          children:[
           {
            path:'/',
            element:<Home></Home>
           }
          ]
        },
      ]);
  return <RouterProvider router={router} />
}

export default Route
