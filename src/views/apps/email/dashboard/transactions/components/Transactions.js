// ** React Imports
import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

// ** Third Party Components
import DataTable from "react-data-table-component";
import {
  ChevronDown,
  ExternalLink,
  Printer,
  FileText,
  File,
  Clipboard,
  Copy,
} from "react-feather";

// ** Reactstrap Imports
import {
  Card,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledButtonDropdown,
} from "reactstrap";

// ** Styles
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

// ** Columns
import { transactionColumns } from "../../../../user/view/columns";

// ** API Hook
import { useGetTransactionsQuery } from "../../../../../../redux/api";
import ComponentSpinner from "../../../../../../@core/components/spinner/Loading-spinner";

const Transactions = ({token}) => {
  // ** States
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [sort, setSort] = useState("desc");
  const [sortColumn, setSortColumn] = useState("id");
  const [type, setType] = useState("SERVICE");

  // ** Fetch transactions using RTK Query
  const { data, error, isLoading, isFetching } = useGetTransactionsQuery({
    type,
    page: currentPage,
    limit: rowsPerPage,
    token,
  });

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
  };

  const handleExportChange = (newType) => {
    setType(newType);
  };

  return (
    <div className="invoice-list-wrapper">
      <Card>
        <CardHeader className="py-1">
          <CardTitle tag="h4">Transactions</CardTitle>
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
              columns={transactionColumns}
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
    </div>
  );
};

export default Transactions;
