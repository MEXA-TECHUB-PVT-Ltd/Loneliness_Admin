// ** React Imports
import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

// ** Third Party Components
import DataTable from "react-data-table-component";
import { ChevronDown, Edit2, Plus, Trash2 } from "react-feather";

// ** Reactstrap Imports
import { Card, CardTitle, CardHeader, Button, Tooltip } from "reactstrap";

// ** Styles
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

// ** Columns
import { categoriesColumns } from "../../../../user/view/columns";

// ** API Hook
import { useGetCategoriesQuery } from "../../../../../../redux/api";
import ComponentSpinner from "../../../../../../@core/components/spinner/Loading-spinner";
import AddCategoryModal from "./AddCategoryModal";
import UpdateCategoryModal from "./UpdateCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";

const Categories = ({ token }) => {
  // ** States
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [sort, setSort] = useState("desc");
  const [sortColumn, setSortColumn] = useState("id");
  const [type, setType] = useState("SERVICE");
  const [modalOpen, setModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [tooltipOpen, setTooltipOpen] = useState({});

  // ** Fetch transactions using RTK Query
  const { data, error, isLoading, isFetching, refetch } = useGetCategoriesQuery(
    {
      type,
      page: currentPage,
      limit: rowsPerPage,
      token,
    }
  );

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
  };

  const handleAddClick = () => {
    setModalOpen(!modalOpen);
  };

  const handleUpdateClick = (category) => {
    setSelectedCategory(category);
    setUpdateModalOpen(true);
  };

  const handleDeleteClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
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
      const updateId = `update-${row.id}`;
      const deleteId = `delete-${row.id}`;
      return (
        <Fragment>
          <Button
            color="primary"
            size="sm"
            className="me-1"
            onClick={() => handleUpdateClick(row)}
            id={updateId}
          >
            <Edit2 size={14} color="#FFFF" />
          </Button>
          <Tooltip
            placement="top"
            isOpen={tooltipOpen[updateId]}
            target={updateId}
            toggle={() => toggleTooltip(updateId)}
          >
            Edit
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
            Delete
          </Tooltip>
        </Fragment>
      );
    },
  };

  const columns = [...categoriesColumns, actionColumn];

  return (
    <div className="invoice-list-wrapper">
      <Card>
        <CardHeader className="py-1">
          <CardTitle tag="h4">Categories</CardTitle>
          <Button color="primary" onClick={handleAddClick}>
            <Plus size={15} /> <span className="align-middle ml-1">Add</span>
          </Button>
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
              onChangePage={(page) => setCurrentPage(page)}
              paginationRowsPerPageOptions={[10, 25, 50, 100]}
              onChangeRowsPerPage={(newPerPage) => setRowsPerPage(newPerPage)}
              paginationPerPage={rowsPerPage}
            />
          </div>
        )}
      </Card>
      <AddCategoryModal
        isOpen={modalOpen}
        toggle={handleAddClick}
        token={token}
        refetch={refetch}
      />
      <UpdateCategoryModal
        isOpen={updateModalOpen}
        toggle={() => setUpdateModalOpen(!updateModalOpen)}
        token={token}
        refetch={refetch}
        category={selectedCategory}
      />
      <DeleteCategoryModal
        isOpen={deleteModalOpen}
        toggle={() => setDeleteModalOpen(!deleteModalOpen)}
        token={token}
        refetch={refetch}
        categoryId={selectedCategoryId}
      />
    </div>
  );
};

export default Categories;
