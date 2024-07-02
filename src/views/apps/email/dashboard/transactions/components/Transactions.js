import React, { useState, Fragment, useMemo } from "react";
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import {
  Card,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledButtonDropdown,
} from "reactstrap";
import moment from "moment";
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useGetTransactionsQuery } from "../../../../../../redux/api";
import ComponentSpinner from "../../../../../../@core/components/spinner/Loading-spinner";
import { getColumns } from "../../../../user/view/columns";


const Transactions = ({ token }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [sort, setSort] = useState("desc");
  const [sortColumn, setSortColumn] = useState("id");
  const [type, setType] = useState("SERVICE");

  const { data, error, isLoading, isFetching } = useGetTransactionsQuery({
    type,
    page: currentPage,
    limit: rowsPerPage,
    token,
  });

  const columns = useMemo(() => getColumns(type), [type]);

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
  };

  const handleExportChange = (newType) => {
    setType(newType);
    setCurrentPage(1); // Reset to the first page when type changes
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (newPerPage) => {
    setRowsPerPage(newPerPage);
    setCurrentPage(1); // Reset to the first page when rows per page changes
  };

  return (
    <div className="invoice-list-wrapper">
      <Card>
        <CardHeader className="py-1 d-flex justify-content-between align-items-center">
          <CardTitle tag="h4">{type} Transactions</CardTitle>
          <UncontrolledButtonDropdown>
            <DropdownToggle color="secondary" outline caret>
              <span>Select Transactions</span>
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem
                className="w-100"
                onClick={() => handleExportChange("SUBSCRIPTION")}
              >
                <span>SUBSCRIPTION</span>
              </DropdownItem>
              <DropdownItem
                className="w-100"
                onClick={() => handleExportChange("CHAT")}
              >
                <span>CHAT</span>
              </DropdownItem>
              <DropdownItem
                className="w-100"
                onClick={() => handleExportChange("SERVICE")}
              >
                <span>SERVICE</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown>
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
              pagination
              paginationServer
              paginationTotalRows={data?.result?.totalCount || 0}
              paginationDefaultPage={currentPage}
              onChangePage={handlePageChange}
              paginationRowsPerPageOptions={[10, 25, 50, 100]}
              onChangeRowsPerPage={handleRowsPerPageChange}
              paginationPerPage={rowsPerPage}
            />
          </div>
        )}
      </Card>
    </div>
  );
};

export default Transactions;
