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
const RejectPayments = lazy(() =>
  import("../../views/apps/email/dashboard/reject_payments")
);
const RejectPaymentsDetails = lazy(() =>
  import("../../views/apps/email/dashboard/reject_payments_details")
);
const DeletedUsers = lazy(() =>
  import("../../views/apps/email/dashboard/deleted_users")
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
    element: <DeletedUsers />,
    path: "/deleted-users",
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
  {
    element: <RejectPayments />,
    path: "/rejected-payments",
  },
  {
    element: <RejectPaymentsDetails />,
    path: "/rejected-payments-details/:id",
  },
];

export default AppRoutes
