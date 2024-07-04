import React, { useState } from "react";
import { useParams } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Card, CardHeader, CardTitle, CardBody, Badge } from "reactstrap";
import moment from "moment";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useGetUsersRequestsQuery } from "../../../../../../redux/api";
import ComponentSpinner from "../../../../../../@core/components/spinner/Loading-spinner";
import defaultImage from "@src/assets/images/avatars/avatar-blank.png";

const userRequestsColumns = [
  {
    name: "User",
    selector: "username",
    sortable: true,
    cell: (row) => (
      <>
        <img
          src={row.image_url || defaultImage}
          alt="buddy"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            marginRight: "10px",
          }}
        />
        {row.username || "Nill"}
      </>
    ),
  },
  {
    name: "Category",
    selector: "category_name",
    sortable: true,
    cell: (row) => row.category_name || "Nill",
  },
  {
    name: "Date",
    selector: "booking_date",
    sortable: true,
    cell: (row) => moment(row.booking_date).format("MMMM Do YYYY"),
  },
  {
    name: "Time",
    selector: "booking_time",
    sortable: true,
    cell: (row) => moment(row.booking_time, "hh:mm:A").format("hh:mm A"),
  },
  {
    name: "Date of Birth",
    selector: "dob",
    sortable: true,
    cell: (row) => moment(row.dob).format("MMMM Do YYYY"),
  },
  {
    name: "Price",
    selector: "booking_price",
    sortable: true,
    cell: (row) => `$${row.booking_price}`,
  },
  {
    name: "Status",
    selector: "status",
    sortable: true,
    cell: (row) => {
      let color = "";
      switch (row.status) {
        case "REQUESTED":
          color = "primary";
          break;
        case "PAID":
          color = "info";
          break;
        case "COMPLETED":
          color = "success";
          break;
        case "REJECTED":
          color = "danger";
          break;
        case "ACCEPTED":
          color = "success";
          break;
        default:
          color = "light";
      }
      return <Badge color={color}>{row.status}</Badge>;
    },
  },
];

const UserRequests = ({ token }) => {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data, isLoading, error } = useGetUsersRequestsQuery({
    id,
    page: currentPage,
    limit: rowsPerPage,
    token,
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (newPerPage) => {
    setRowsPerPage(newPerPage);
    setCurrentPage(1); // Reset to the first page when rows per page changes
  };

  if (isLoading) {
    return <ComponentSpinner />;
  }

  if (error) {
    return (
      <p className="text-danger">
        Error fetching user requests: {error.message}
      </p>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Services Details</CardTitle>
      </CardHeader>
      <CardBody>
        <div className="react-dataTable">
          <DataTable
            noHeader
            pagination
            paginationServer
            paginationTotalRows={data?.result?.totalCount || 0}
            paginationDefaultPage={currentPage}
            onChangePage={handlePageChange}
            paginationRowsPerPageOptions={[10, 25, 50, 100]}
            onChangeRowsPerPage={handleRowsPerPageChange}
            columns={userRequestsColumns}
            data={data?.result?.data || []}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default UserRequests;
