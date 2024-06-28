// ** React Imports
import { useState } from "react";
import PropTypes from "prop-types";

// ** Third Party Components
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { useDeleteCategoryMutation } from "../../../../../../redux/api";
import { notify } from "../../../../../../utility/toast";
import LoadingButton from "../../../../../components/buttons/LoadingButton";

const DeleteCategoryModal = ({
  isOpen,
  toggle,
  token,
  refetch,
  categoryId,
}) => {
  const [deleteCategory, { isLoading }] = useDeleteCategoryMutation();

  const handleDelete = async () => {
    try {
      await deleteCategory({ id: categoryId, token }).unwrap();
      toggle();
      refetch();
      notify("Category deleted successfully!");
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Delete Category</ModalHeader>
      <ModalBody>Are you sure you want to delete this category?</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
        <LoadingButton
          color="danger"
          isLoading={isLoading}
          onClick={handleDelete}
        >
          Delete
        </LoadingButton>
      </ModalFooter>
    </Modal>
  );
};

DeleteCategoryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  categoryId: PropTypes.string.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default DeleteCategoryModal;
