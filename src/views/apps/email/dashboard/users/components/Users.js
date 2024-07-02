import React, { useState, Fragment, useEffect } from "react";
import DataTable from "react-data-table-component";
import { ChevronDown, Eye, Lock, Unlock } from "react-feather";
import {
  Card,
  CardHeader,
  Button,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Tooltip,
  Input,
} from "reactstrap";
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { userColumns } from "../../../../user/view/columns";
import {
  useGetBuddiesQuery,
  useGetUsersQuery,
} from "../../../../../../redux/api";
import ComponentSpinner from "../../../../../../@core/components/spinner/Loading-spinner";
import BlockUserModal from "./BlockUserModal";
import { useNavigate } from "react-router-dom";

const Users = ({ token }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [sort, setSort] = useState("desc");
  const [sortColumn, setSortColumn] = useState("id");
  const [activeTab, setActiveTab] = useState("users");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [tooltipOpen, setTooltipOpen] = useState({});
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (activeTab === "users" && usersData?.result?.data) {
      setFilteredData(usersData.result.data);
    } else if (activeTab === "buddies" && buddiesData?.result?.data) {
      setFilteredData(buddiesData.result.data);
    }
  }, [usersData, buddiesData, activeTab]);

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
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

  const handleSearch = (event) => {
    setSearchText(event.target.value);
    if (event.target.value === "") {
      setFilteredData(
        activeTab === "users" ? usersData.result.data : buddiesData.result.data
      );
    } else {
      const filtered = (
        activeTab === "users" ? usersData.result.data : buddiesData.result.data
      ).filter((user) =>
        user?.full_name?.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const actionColumn = {
    name: "Actions",
    minWidth: "150px",
    cell: (row) => {
      const lockUnlockId = `lockUnlock-${row.id}`;
      const lockUnlockText = row?.is_block ? "Unblock User" : "Block User";
      const viewDetailsId = `viewDetails-${row.id}`;

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
            id={viewDetailsId}
          >
            <Eye size={14} color="#FFFF" />
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

  const columns = [...userColumns, actionColumn];

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      setCurrentPage(1);
      setSearchText("");
      setFilteredData(
        tab === "users" ? usersData.result.data : buddiesData.result.data
      );
    }
  };

  return (
    <div className="invoice-list-wrapper">
      <Card>
        <CardHeader className="py-1 d-flex justify-content-between">
          <div>
            <Nav tabs className="justify-content-center">
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
          </div>
          <Input
            type="text"
            value={searchText}
            onChange={handleSearch}
            placeholder="Search by name"
            style={{ width: "250px" }}
          />
        </CardHeader>
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
                  data={filteredData}
                  sortIcon={<ChevronDown />}
                  className="react-dataTable"
                  defaultSortField="id"
                  pagination
                  paginationServer
                  paginationTotalRows={usersData?.result?.totalCount || 0}
                  paginationDefaultPage={currentPage}
                  onChangePage={handlePageChange}
                  paginationRowsPerPageOptions={[10, 25, 50, 100]}
                  onChangeRowsPerPage={(newPerPage) =>
                    setRowsPerPage(newPerPage)
                  }
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
                  data={filteredData}
                  sortIcon={<ChevronDown />}
                  className="react-dataTable"
                  defaultSortField="id"
                  pagination
                  paginationServer
                  paginationTotalRows={buddiesData?.result?.totalCount || 0}
                  paginationDefaultPage={currentPage}
                  onChangePage={handlePageChange}
                  paginationRowsPerPageOptions={[10, 25, 50, 100]}
                  onChangeRowsPerPage={(newPerPage) =>
                    setRowsPerPage(newPerPage)
                  }
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
