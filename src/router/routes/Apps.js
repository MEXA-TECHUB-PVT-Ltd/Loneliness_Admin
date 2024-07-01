// ** React Imports
import { lazy } from 'react'

const Dashboard = lazy(() => import('../../views/apps/email/dashboard'))
import Users from '../../views/apps/email/dashboard/users';
import UserDetails from "../../views/apps/email/dashboard/userDetails";
import ReportedUsers from "../../views/apps/email/dashboard/reported";
const Subscription = lazy(() =>
  import("../../views/apps/email/dashboard/subscription")
);
const Transactions = lazy(() =>
  import("../../views/apps/email/dashboard/transactions")
);
const Category = lazy(() =>
  import("../../views/apps/email/dashboard/category")
);
const Terms = lazy(() => import("../../views/apps/email/dashboard/terms"));
const Privacy = lazy(() => import("../../views/apps/email/dashboard/privacy"));
const SocialLinks = lazy(() =>
  import("../../views/apps/email/dashboard/social_links")
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
    element: <Users />,
    path: "/users",
  },
  {
    element: <UserDetails />,
    path: "/user-details/:id",
  },
  {
    element: <ReportedUsers />,
    path: "/reported-users",
  },
  {
    element: <Category />,
    path: "/category",
  },
  {
    element: <Subscription />,
    path: "/subscription",
  },
  {
    element: <Terms />,
    path: "/terms-conditions",
  },
  {
    element: <Privacy />,
    path: "/privacy",
  },
  {
    element: <SocialLinks />,
    path: "/social-links",
  },
];

export default AppRoutes
