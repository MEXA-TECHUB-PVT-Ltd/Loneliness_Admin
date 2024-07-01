// ** React Imports
import { Fragment } from "react";
import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

import defaultImage from "@src/assets/images/avatars/avatar-blank.png";

// ** dates
import moment from "moment";

// ** Reactstrap Imports
import { Badge, Button, UncontrolledTooltip } from "reactstrap";

// ** Third Party Components
import {
  Eye,
  Send,
  Edit,
  Save,
  Info,
  PieChart,
  Download,
  TrendingUp,
  CheckCircle,
  ArrowDownCircle,
  Trash2,
} from "react-feather";

// ** Vars
const invoiceStatusObj = {
  Sent: { color: "light-secondary", icon: Send },
  Paid: { color: "light-success", icon: CheckCircle },
  Draft: { color: "light-primary", icon: Save },
  Downloaded: { color: "light-info", icon: ArrowDownCircle },
  "Past Due": { color: "light-danger", icon: Info },
  "Partial Payment": { color: "light-warning", icon: PieChart },
};

// ** Table columns
export const rejectPaymentColumns = [
  {
    name: "#",
    sortable: true,
    sortField: "id",
    minWidth: "107px",
    selector: (row) => row.request_id,
    cell: (row) => <div className="fw-bolder">{`#${row?.request_id}`}</div>,
  },
  {
    name: "User",
    minWidth: "102px",
    sortable: true,
    sortField: "invoiceStatus",
    selector: (row) => row?.user?.full_name,
    cell: (row) => {
      return (
        <Fragment>
          <img
            src={row?.user?.image_url || defaultImage}
            alt="PROFILE IMAGE"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              marginRight: "10px",
            }}
          />
          {row?.user?.full_name}
        </Fragment>
      );
    },
  },
  {
    name: "Reported",
    minWidth: "102px",
    sortable: true,
    sortField: "invoiceStatus",
    selector: (row) => row?.buddy?.full_name,
    cell: (row) => {
      return (
        <Fragment>
          <img
            src={row?.buddy?.image_url || defaultImage}
            alt="PROFILE IMAGE"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              marginRight: "10px",
            }}
          />
          {row?.buddy?.full_name}
        </Fragment>
      );
    },
  },

  {
    name: "Booking Price",
    sortable: true,
    minWidth: "150px",
    sortField: "total",
    selector: (row) => row?.booking_price,
    cell: (row) => <span>${row?.booking_price}</span>,
  },
  {
    name: "Released Status",
    sortable: true,
    minWidth: "150px",
    sortField: "total",
    selector: (row) => row?.is_released,
    cell: (row) => <span>{row?.is_released ? "RELEASED" : "PENDING"}</span>,
  },
];
export const reportedColumns = [
  {
    name: "#",
    sortable: true,
    sortField: "id",
    minWidth: "107px",
    selector: (row) => row.action_id,
    cell: (row) => <div className="fw-bolder">{`#${row?.action_id}`}</div>,
  },
  {
    name: "Reporter",
    minWidth: "102px",
    sortable: true,
    sortField: "invoiceStatus",
    selector: (row) => row?.reporter_user?.full_name,
    cell: (row) => {
      return (
        <Fragment>
          <img
            src={row?.reporter_user?.images?.[0] || defaultImage}
            alt="PROFILE IMAGE"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              marginRight: "10px",
            }}
          />
          {row?.reporter_user?.full_name}
        </Fragment>
      );
    },
  },
  {
    name: "Reported",
    minWidth: "102px",
    sortable: true,
    sortField: "invoiceStatus",
    selector: (row) => row?.reported_user?.full_name,
    cell: (row) => {
      return (
        <Fragment>
          <img
            src={row?.reported_user?.images?.[0] || defaultImage}
            alt="PROFILE IMAGE"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              marginRight: "10px",
            }}
          />
          {row?.reported_user?.full_name}
        </Fragment>
      );
    },
  },

  {
    name: "Reason",
    sortable: true,
    minWidth: "150px",
    sortField: "total",
    selector: (row) => row?.action_reason,
    cell: (row) => <span>{row?.action_reason}</span>,
  },
  {
    minWidth: "200px",
    name: "Reported_at",
    cell: (row) =>
      row.action_created_at
        ? moment(row.action_created_at).format("MMMM Do YYYY, h:mm:ss a")
        : "",
  },
];
export const deletedUserColumns = [
  {
    name: "#",
    sortable: true,
    sortField: "id",
    minWidth: "107px",
    selector: (row) => row.id,
    cell: (row) => <div className="fw-bolder">{`#${row?.id}`}</div>,
  },
  {
    name: "Username",
    minWidth: "102px",
    sortable: true,
    sortField: "invoiceStatus",
    selector: (row) => row?.user?.full_name,
    cell: (row) => {
      return (
        <Fragment>
          <img
            src={row?.image_urls?.[0] || defaultImage}
            alt="PROFILE IMAGE"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              marginRight: "10px",
            }}
          />
          {row?.full_name}
        </Fragment>
      );
    },
  },
  {
    minWidth: "200px",
    name: "Email",
    cell: (row) => (row.email),
  },
  {
    minWidth: "200px",
    name: "Remaining Days",
    cell: (row) => row.remaining_days,
  },
];
export const userColumns = [
  {
    name: "#",
    sortable: true,
    sortField: "id",
    minWidth: "107px",
    selector: (row) => row.id,
    cell: (row) => <div className="fw-bolder">{`#${row?.id}`}</div>,
  },
  {
    name: "Username",
    minWidth: "102px",
    sortable: true,
    sortField: "invoiceStatus",
    selector: (row) => row?.user?.full_name,
    cell: (row) => {
      return (
        <Fragment>
          <img
            src={row?.image_urls?.[0] || defaultImage}
            alt="PROFILE IMAGE"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              marginRight: "10px",
            }}
          />
          {row?.full_name}
        </Fragment>
      );
    },
  },

  {
    name: "Email",
    sortable: true,
    minWidth: "150px",
    sortField: "total",
    selector: (row) => row?.email,
    cell: (row) => <span>{row?.email}</span>,
  },
  {
    minWidth: "200px",
    name: "DOB",
    cell: (row) => (row.dob ? moment(row.dob).format("MMMM Do YYYY") : ""),
  },
  {
    minWidth: "200px",
    name: "Block Status",
    cell: (row) => (
      <Badge color={row.is_block ? "danger" : "success"}>
        {row.is_block ? "BLOCK" : "UNBLOCK"}
      </Badge>
    ),
  },
];
export const categoriesColumns = [
  {
    name: "#",
    sortable: true,
    sortField: "id",
    minWidth: "107px",
    selector: (row) => row.id,
    cell: (row) => <div className="fw-bolder">{`#${row.id}`}</div>,
  },
  {
    name: "Image",
    minWidth: "102px",
    sortable: true,
    sortField: "invoiceStatus",
    selector: (row) => row?.image_url,
    cell: (row) => {
      return (
        <Fragment>
          <img
            src={row?.image_url || "U"}
            alt="PROFILE IMAGE"
            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          />
        </Fragment>
      );
    },
  },
  {
    name: "Name",
    minWidth: "102px",
    sortable: true,
    sortField: "invoiceStatus",
    selector: (row) => row?.name,
    cell: (row) => {
      return <Fragment>{row?.name}</Fragment>;
    },
  },
];
export const transactionColumns = [
  {
    name: "#",
    sortable: true,
    sortField: "id",
    minWidth: "107px",
    selector: (row) => row.id,
    cell: (row) => <div className="fw-bolder">{`#${row.id}`}</div>,
  },
  {
    name: "Username",
    minWidth: "102px",
    sortable: true,
    sortField: "invoiceStatus",
    selector: (row) => row?.user?.full_name,
    cell: (row) => {
      return (
        <Fragment>
          <img
            src={row?.user?.image_url || "U"}
            alt="PROFILE IMAGE"
            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          />
          {row?.user?.full_name}
        </Fragment>
      );
    },
  },

  {
    name: "Amount",
    sortable: true,
    minWidth: "150px",
    sortField: "total",
    selector: (row) => row?.amount,
    cell: (row) => <span>${row?.amount || 0}</span>,
  },
  {
    minWidth: "200px",
    name: "Transaction Date",
    cell: (row) => moment(row.created_at).format("MMMM Do YYYY, h:mm:ss a"),
  },
];

// ***
export const columns = [
  {
    name: "#",
    sortable: true,
    sortField: "id",
    minWidth: "107px",
    selector: (row) => row.id,
    cell: (row) => (
      <Link
        className="fw-bolder"
        to={`/apps/invoice/preview/${row.id}`}
      >{`#${row.id}`}</Link>
    ),
  },
  {
    name: <TrendingUp size={14} />,
    minWidth: "102px",
    sortable: true,
    sortField: "invoiceStatus",
    selector: (row) => row.invoiceStatus,
    cell: (row) => {
      const color = invoiceStatusObj[row.invoiceStatus]
          ? invoiceStatusObj[row.invoiceStatus].color
          : "primary",
        Icon = invoiceStatusObj[row.invoiceStatus]
          ? invoiceStatusObj[row.invoiceStatus].icon
          : Edit;
      return (
        <Fragment>
          <Avatar
            color={color}
            icon={<Icon size={14} />}
            id={`av-tooltip-${row.id}`}
          />
          <UncontrolledTooltip placement="top" target={`av-tooltip-${row.id}`}>
            <span className="fw-bold">{row.invoiceStatus}</span>
            <br />
            <span className="fw-bold">Balance:</span> {row.balance}
            <br />
            <span className="fw-bold">Due Date:</span> {row.dueDate}
          </UncontrolledTooltip>
        </Fragment>
      );
    },
  },

  {
    name: "Total Paid",
    sortable: true,
    minWidth: "150px",
    sortField: "total",
    selector: (row) => row.total,
    cell: (row) => <span>${row.total || 0}</span>,
  },
  {
    minWidth: "200px",
    name: "Issued Date",
    cell: (row) => row.dueDate,
  },
  {
    name: "Action",
    minWidth: "110px",
    cell: (row) => (
      <div className="column-action d-flex align-items-center">
        <Send
          className="text-body cursor-pointer"
          size={17}
          id={`send-tooltip-${row.id}`}
        />
        <UncontrolledTooltip placement="top" target={`send-tooltip-${row.id}`}>
          Send Mail
        </UncontrolledTooltip>

        <Link
          className="text-body"
          to={`/apps/invoice/preview/${row.id}`}
          id={`pw-tooltip-${row.id}`}
        >
          <Eye size={17} className="mx-1" />
        </Link>
        <UncontrolledTooltip placement="top" target={`pw-tooltip-${row.id}`}>
          Preview Invoice
        </UncontrolledTooltip>

        <Download
          className="text-body cursor-pointer"
          size={17}
          id={`download-tooltip-${row.id}`}
        />
        <UncontrolledTooltip
          placement="top"
          target={`download-tooltip-${row.id}`}
        >
          Download Invoice
        </UncontrolledTooltip>
      </div>
    ),
  },
];
