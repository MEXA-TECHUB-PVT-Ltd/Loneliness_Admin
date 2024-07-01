// ** React Imports
import { useState, Fragment } from "react";

// ** Third Party Components
import DataTable from "react-data-table-component";
import { ChevronDown, Edit2, Eye, Lock, Trash2, Unlock } from "react-feather";

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
import { userColumns } from "../../../../user/view/columns";

// ** API Hook
import {
  useGetBuddiesQuery,
  useGetUsersQuery,
} from "../../../../../../redux/api";
import ComponentSpinner from "../../../../../../@core/components/spinner/Loading-spinner";
import BlockUserModal from "./BlockUserModal";
import { useNavigate } from "react-router-dom";

const Users = ({ token }) => {
  // ** States
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [sort, setSort] = useState("desc");
  const [sortColumn, setSortColumn] = useState("id");
  const [activeTab, setActiveTab] = useState("users");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [tooltipOpen, setTooltipOpen] = useState({});
  const navigate = useNavigate();

  // ** Fetch data using RTK Query
  const {
    data: usersData,
    error: usersError,
    isLoading: isUsersLoading,
    isFetching: isUsersFetching,
    refetch: refetchUsers,
  } = useGetUsersQuery({
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
  } = useGetBuddiesQuery({
    page: currentPage,
    limit: rowsPerPage,
    token,
  });

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
  };

  const toggleModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(!isModalOpen);
  };

  const toggleTooltip = (id) => {
    setTooltipOpen({
      ...tooltipOpen,
      [id]: !tooltipOpen[id],
    });
  };

  const actionColumn = {
    name: "Actions",
    minWidth: "150px",
    cell: (row) => {
      const lockUnlockId = `lockUnlock-${row.id}`;
      const lockUnlockText = row?.is_block ? "Unblock User" : "Block User";

      return (
        <Fragment>
          <Button
            color={row?.is_block ? "primary" : "warning"}
            size="sm"
            className="me-1"
            onClick={() => toggleModal(row)}
            id={lockUnlockId}
          >
            {row?.is_block ? (
              <Unlock size={14} color="#FFFF" />
            ) : (
              <Lock size={14} color="#FFFF" />
            )}
          </Button>
          <Tooltip
            placement="top"
            isOpen={tooltipOpen[lockUnlockId]}
            target={lockUnlockId}
            toggle={() => toggleTooltip(lockUnlockId)}
          >
            {lockUnlockText}
          </Tooltip>
          <Button
            color="info"
            size="sm"
            onClick={() => navigate(`/user-details/${row.id}`)}
          >
            <Eye size={14} color="#FFFF" />
          </Button>
        </Fragment>
      );
    },
  };

  const columns = [...userColumns, actionColumn];

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div className="invoice-list-wrapper">
      <Card>
        <CardHeader className="py-1">
          {/* <CardTitle tag="h4">Categories</CardTitle> */}
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
            {isUsersLoading || isUsersFetching ? (
              <ComponentSpinner />
            ) : (
              <div className="invoice-list-dataTable react-dataTable">
                <DataTable
                  noHeader
                  sortServer
                  columns={columns}
                  responsive={true}
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
                  columns={columns}
                  responsive={true}
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
      {selectedUser && (
        <BlockUserModal
          isOpen={isModalOpen}
          toggle={toggleModal}
          token={token}
          refetch={activeTab === "users" ? refetchUsers : refetchBuddies}
          selectedUser={selectedUser}
        />
      )}
    </div>
  );
};

export default Users;
