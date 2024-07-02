// ** React Imports
import { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";

// ** Third Party Components
import DataTable from "react-data-table-component";
import { ChevronDown, Eye } from "react-feather";

// ** Reactstrap Imports
import {
  Card,
  CardTitle,
  CardHeader,
  Button,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Tooltip,
} from "reactstrap";

// ** Styles
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

// ** Columns
import { reportedColumns } from "../../../../user/view/columns";

// ** API Hook
import {
  useGetReportedBuddiesQuery,
  useGetReportedUsersQuery,
} from "../../../../../../redux/api";
import ComponentSpinner from "../../../../../../@core/components/spinner/Loading-spinner";

const Reported = ({ token }) => {
  // ** States
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [sort, setSort] = useState("desc");
  const [sortColumn, setSortColumn] = useState("id");
  const [activeTab, setActiveTab] = useState("users");
  const [tooltipOpen, setTooltipOpen] = useState({});

  const navigate = useNavigate();

  // ** Fetch data using RTK Query
  const {
    data: usersData,
    error: usersError,
    isLoading: isUsersLoading,
    isFetching: isUsersFetching,
    refetch: refetchUsers,
  } = useGetReportedUsersQuery({
    page: currentPage,
    limit: rowsPerPage,
    token,
  });

  const {
    data: buddiesData,
    error: buddiesError,
    isLoading: isBuddiesLoading,
    isFetching: isBuddiesFetching,
    refetch: refetchBuddies,
  } = useGetReportedBuddiesQuery({
    page: currentPage,
    limit: rowsPerPage,
    token,
  });

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
  };
  const toggleTooltip = (id) => {
    setTooltipOpen({
      ...tooltipOpen,
      [id]: !tooltipOpen[id],
    });
  };

  const actionColumn = {
    name: "Actions",
    minWidth: "100px",
    cell: (row) => {
      const viewDetailsId = `viewDetails-${row.id}`;

      return (
        <Fragment>
          <Button
            color="info"
            size="sm"
            onClick={() => navigate(`/user-details/${row.reported_user.id}`)}
            id={viewDetailsId}
          >
            <Eye size={14} color="#FFF" />
          </Button>
          <Tooltip
            placement="top"
            isOpen={tooltipOpen[viewDetailsId]}
            target={viewDetailsId}
            toggle={() => toggleTooltip(viewDetailsId)}
          >
            View Details
          </Tooltip>
        </Fragment>
      );
    },
  };

  const userColumns = [...reportedColumns, actionColumn];

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div className="invoice-list-wrapper">
      <Card>
        <CardHeader className="py-1">
          <CardTitle tag="h4">Reported Users and Buddies</CardTitle>
        </CardHeader>
        <Nav tabs className="justify-content-center">
          <NavItem>
            <NavLink
              active={activeTab === "users"}
              onClick={() => toggleTab("users")}
            >
              Users
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={activeTab === "buddies"}
              onClick={() => toggleTab("buddies")}
            >
              Buddies
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="users">
            {isUsersLoading || isUsersFetching ? (
              <ComponentSpinner />
            ) : (
              <div className="invoice-list-dataTable react-dataTable">
                <DataTable
                  noHeader
                  sortServer
                  columns={userColumns}
                  responsive
                  onSort={handleSort}
                  data={usersData?.result?.data || []}
                  sortIcon={<ChevronDown />}
                  className="react-dataTable"
                  defaultSortField="id"
                />
              </div>
            )}
          </TabPane>
          <TabPane tabId="buddies">
            {isBuddiesLoading || isBuddiesFetching ? (
              <ComponentSpinner />
            ) : (
              <div className="invoice-list-dataTable react-dataTable">
                <DataTable
                  noHeader
                  sortServer
                  columns={userColumns}
                  responsive
                  onSort={handleSort}
                  data={buddiesData?.result?.data || []}
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

export default Reported;
