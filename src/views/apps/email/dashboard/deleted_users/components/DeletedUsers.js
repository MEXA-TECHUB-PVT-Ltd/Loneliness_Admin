import React, { useState, Fragment } from "react";
import DataTable from "react-data-table-component";
import { ChevronDown, Download } from "react-feather";
import {
  Card,
  CardTitle,
  CardHeader,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Button,
} from "reactstrap";
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { deletedUserColumns } from "../../../../user/view/columns";
import { useGetDeletedUsersQuery } from "../../../../../../redux/api";
import ComponentSpinner from "../../../../../../@core/components/spinner/Loading-spinner";
import { useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";

const DeleteUsers = ({ token }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [sort, setSort] = useState("desc");
  const [sortColumn, setSortColumn] = useState("id");
  const [activeTab, setActiveTab] = useState("users");
  const navigate = useNavigate();

  // Fetch data using RTK Query
  const { data, error, isLoading, isFetching, refetch } =
    useGetDeletedUsersQuery({
      role: activeTab === "users" ? "USER" : "BUDDY",
      page: currentPage,
      limit: rowsPerPage,
      token,
    });

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
  };

  const csvHeaders = [
    { label: "ID", key: "id" },
    { label: "Full Name", key: "full_name" },
    { label: "Email", key: "email" },
    { label: "Remaining Days", key: "remaining_days" },
    { label: "Is Blocked", key: "is_block" },
    { label: "Role", key: "role" },
    { label: "About", key: "about" },
    { label: "DOB", key: "dob" },
    { label: "Gender", key: "gender" },
    { label: "Looking For Gender", key: "looking_for_gender" },
    { label: "Phone Country Code", key: "phone_country_code" },
    { label: "Phone Number", key: "phone_number" },
    { label: "Height (ft)", key: "height_ft" },
    { label: "Height (in)", key: "height_in" },
    { label: "Weight", key: "weight" },
    { label: "Weight Unit", key: "weight_unit" },
    { label: "Hourly Rate", key: "hourly_rate" },
    { label: "Languages", key: "languages" },
    { label: "Longitude", key: "location.longitude" },
    { label: "Latitude", key: "location.latitude" },
    { label: "Address", key: "location.address" },
    { label: "City", key: "location.city" },
    { label: "State", key: "location.state" },
    { label: "Country", key: "location.country" },
    { label: "Postal Code", key: "location.postal_code" },
  ];

  const actionColumn = {
    name: "Actions",
    minWidth: "150px",
    cell: (row) => {
      return (
        <Fragment>
          <CSVLink
            data={[row]}
            headers={csvHeaders}
            filename={`deleted-${row.id}.csv`}
          >
            <Button color="primary" size="sm">
              <Download size={14} color="#FFFF" /> Export
            </Button>
          </CSVLink>
        </Fragment>
      );
    },
  };

  const columns = [...deletedUserColumns, actionColumn];

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      setCurrentPage(1); // Reset to the first page when tab changes
    }
  };

  return (
    <div className="invoice-list-wrapper">
      <Card>
        <CardHeader className="py-1 d-flex justify-content-between align-items-center">
          <CardTitle tag="h4">Deleted Users and Buddies</CardTitle>
        </CardHeader>
        <Nav tabs>
          <NavItem>
            <NavLink
              active={activeTab === "users"}
              onClick={() => {
                toggleTab("users");
              }}
            >
              Users
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={activeTab === "buddies"}
              onClick={() => {
                toggleTab("buddies");
              }}
            >
              Buddies
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="users">
            {isLoading ? (
              <ComponentSpinner />
            ) : (
              <div className="invoice-list-dataTable react-dataTable">
                <DataTable
                  noHeader
                  sortServer
                  columns={columns}
                  responsive={true}
                  onSort={handleSort}
                  data={data?.result?.data || []}
                  sortIcon={<ChevronDown />}
                  className="react-dataTable"
                  defaultSortField="id"
                />
              </div>
            )}
          </TabPane>
          <TabPane tabId="buddies">
            {isLoading ? (
              <ComponentSpinner />
            ) : (
              <div className="invoice-list-dataTable react-dataTable">
                <DataTable
                  noHeader
                  sortServer
                  columns={columns}
                  responsive={true}
                  onSort={handleSort}
                  data={data?.result?.data || []}
                  sortIcon={<ChevronDown />}
                  className="react-dataTable"
                  defaultSortField="id"
                />
              </div>
            )}
          </TabPane>
        </TabContent>
      </Card>
    </div>
  );
};

export default DeleteUsers;
