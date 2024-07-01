import React, { useState, Fragment } from "react";
import DataTable from "react-data-table-component";
import { ChevronDown, Eye, Plus, Trash2 } from "react-feather";
import { Card, CardTitle, CardHeader, Button } from "reactstrap";
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { rejectPaymentColumns } from "../../../../user/view/columns";
import {
  useGetRejectedPaymentsQuery,
  useReleasePaymentMutation,
} from "../../../../../../redux/api";
import ComponentSpinner from "../../../../../../@core/components/spinner/Loading-spinner";
import { useNavigate } from "react-router-dom";
import ReleasePaymentModal from "./ReleasePaymentModal"; // Import the modal

const RejectedReason = ({ token }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [sort, setSort] = useState("desc");
  const [sortColumn, setSortColumn] = useState("id");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const { data, error, isLoading, isFetching, refetch } =
    useGetRejectedPaymentsQuery({
      page: currentPage,
      limit: rowsPerPage,
      token,
    });
  const [releasePayment, { isLoading: releasingPayment }] =
    useReleasePaymentMutation();

  const navigate = useNavigate();

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
  };

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleReleaseClick = (row) => {
    setSelectedRow(row);
    toggleModal();
  };

  const handleConfirmRelease = async (release_to) => {
    const {
      request_id,
      user: { id: user_id },
      buddy: { id: buddy_id },
    } = selectedRow;
    try {
      await releasePayment({
        request_id,
        buddy_id,
        user_id,
        release_to,
        token,
      });
      refetch(); 
      toggleModal();
    } catch (error) {
      console.error("Failed to release payment:", error);
    }
  };

  const actionColumn = {
    name: "Actions",
    minWidth: "250px",
    cell: (row) => {
      return (
        <Fragment>
          <Button
            color="primary"
            size="sm"
            className="me-1"
            onClick={() => handleReleaseClick(row)}
          >
            Release
          </Button>
          <Button
            color="info"
            size="sm"
            onClick={() =>
              navigate(`/rejected-payments-details/${row.request_id}`, {
                state: {
                  buddyId: row.buddy.id,
                  buddyFullName: row.buddy.full_name,
                  buddyImageUrl: row.buddy.image_url,
                },
              })
            }
          >
            <Eye size={14} color="#FFFF" />
          </Button>
        </Fragment>
      );
    },
  };

  const columns = [...rejectPaymentColumns, actionColumn];

  return (
    <div className="invoice-list-wrapper">
      <Card>
        <CardHeader className="py-1">
          <CardTitle tag="h4">Rejected Payments</CardTitle>
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
            />
          </div>
        )}
      </Card>
      <ReleasePaymentModal
        isOpen={modalOpen}
        toggle={toggleModal}
        onConfirm={handleConfirmRelease}
        isLoading={releasingPayment}
      />
    </div>
  );
};

export default RejectedReason;
