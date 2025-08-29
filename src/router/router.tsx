import RootLayout from "@/layouts/RootLayout";
import Dashboard from "@/pages/dashboard/Dashboard";
import Home from "@/pages/home/Home";
import { createBrowserRouter } from "react-router";




export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      
      {
        path: 'dashboard',
        Component: Dashboard,
        // loader: () => fetch('./serviceCenter.json')
      },
      
    ]
  },
//   {
//     path: '/',
//     Component: AuthLayout,
//     children: [
//       {
//         path: 'login',
//         Component: Login
//       },
//       {
//         path: 'register',
//         Component: Register
//       }
//     ]
//   },
//   {
//     path: '/dashboard',
//     element:<DashboardLayout></DashboardLayout>
//     ,
//     children: [
//       {
//         path: 'myParcels',
//         Component: MyParcels
//       },
     
//     ]
//   }
]);