// ** React Imports
import { lazy } from 'react'

const Dashboard = lazy(() => import('../../views/apps/email/dashboard'))
const Transactions = lazy(() => import('../../views/apps/email/dashboard/transactions'))
const Category = lazy(() =>
  import("../../views/apps/email/dashboard/category")
);


const AppRoutes = [
  {
    element: <Dashboard />,
    path: "/dashboard",
  },
  {
    element: <Transactions />,
    path: "/transactions",
  },
  {
    element: <Category />,
    path: "/category",
  },
];

export default AppRoutes
