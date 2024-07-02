// ** React Imports
import React, { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

// ** Third Party Components
import DataTable from "react-data-table-component";
import { ChevronDown, Edit2, Plus, Trash2 } from "react-feather";

// ** Reactstrap Imports
import { Card, CardTitle, CardHeader, Button, Tooltip } from "reactstrap";

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";

// ** API Hook
import { useGetSubscriptionsQuery } from "../../../../../../redux/api";

import AddUpdateSubscriptionModal from "./AddUpdateSubscriptionModal";
import DeleteSubscriptionModal from "./DeleteSubscriptionModal";
import ComponentSpinner from "../../../../../../@core/components/spinner/Loading-spinner";

const Subscription = ({ token }) => {
  // ** States
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sort, setSort] = useState("desc");
  const [sortColumn, setSortColumn] = useState("id");
  const [addUpdateModalOpen, setAddUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState(null);
  const [tooltipOpen, setTooltipOpen] = useState({});

  // ** Fetch subscriptions using RTK Query
  const { data, error, isLoading, isFetching, refetch } =
    useGetSubscriptionsQuery({
      page: currentPage,
      limit: rowsPerPage,
      token,
    });

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
  };

  const handleAddClick = () => {
    setSelectedSubscription(null);
    setAddUpdateModalOpen(true);
  };

  const handleUpdateClick = (subscription) => {
    setSelectedSubscription(subscription);
    setAddUpdateModalOpen(true);
  };

  const handleDeleteClick = (subscriptionId) => {
    setSelectedSubscriptionId(subscriptionId);
    setDeleteModalOpen(true);
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
      const editId = `edit-${row.id}`;
      const deleteId = `delete-${row.id}`;

      return (
        <Fragment>
          <Button
            color="primary"
            size="sm"
            className="me-1"
            onClick={() => handleUpdateClick(row)}
            id={editId}
          >
            <Edit2 size={14} color="#FFFF" />
          </Button>
          <Tooltip
            placement="top"
            isOpen={tooltipOpen[editId]}
            target={editId}
            toggle={() => toggleTooltip(editId)}
          >
            Edit Subscription
          </Tooltip>
          <Button
            color="danger"
            size="sm"
            onClick={() => handleDeleteClick(row.id)}
            id={deleteId}
          >
            <Trash2 size={14} color="#FFFF" />
          </Button>
          <Tooltip
            placement="top"
            isOpen={tooltipOpen[deleteId]}
            target={deleteId}
            toggle={() => toggleTooltip(deleteId)}
          >
            Delete Subscription
          </Tooltip>
        </Fragment>
      );
    },
  };

  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
      minWidth: "250px",
    },
    {
      name: "Amount",
      selector: "amount",
      sortable: true,
      minWidth: "100px",
    },
    {
      name: "Total Subscribers",
      selector: "user_count",
      sortable: true,
      minWidth: "100px",
    },
    {
      name: "Billing Interval",
      selector: "interval",
      sortable: true,
      minWidth: "100px",
    },
    actionColumn,
  ];

  const intervals = data?.result?.data.map((sub) => sub.interval) || [];
  const hasAllIntervals = ["month", "year", "quarter"].every((interval) =>
    intervals.includes(interval)
  );

  return (
    <div className="invoice-list-wrapper">
      <Card>
        <CardHeader className="py-1">
          <CardTitle tag="h4">Subscriptions</CardTitle>
          {!hasAllIntervals && (
            <Button color="primary" onClick={handleAddClick}>
              <Plus size={15} /> <span className="align-middle ml-1">Add</span>
            </Button>
          )}
        </CardHeader>
        {isLoading || isFetching ? (
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
              progressPending={isLoading}
            />
          </div>
        )}
      </Card>
      <AddUpdateSubscriptionModal
        isOpen={addUpdateModalOpen}
        toggle={() => setAddUpdateModalOpen(!addUpdateModalOpen)}
        token={token}
        refetch={refetch}
        subscription={selectedSubscription}
      />
      <DeleteSubscriptionModal
        isOpen={deleteModalOpen}
        toggle={() => setDeleteModalOpen(!deleteModalOpen)}
        token={token}
        refetch={refetch}
        subscriptionId={selectedSubscriptionId}
      />
    </div>
  );
};

export default Subscription;
