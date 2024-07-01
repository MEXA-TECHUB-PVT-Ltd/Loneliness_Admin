// DeleteModal.js
import React from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import LoadingButton from "../../../../../components/buttons/LoadingButton";

const DeleteModal = ({ isOpen, toggle, onDelete, message, isLoading }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Confirm Delete</ModalHeader>
      <ModalBody>{message}</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
        <LoadingButton color="danger" onClick={onDelete} isLoading={isLoading}>
          Delete
        </LoadingButton>{" "}
      </ModalFooter>
    </Modal>
  );
};

DeleteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default DeleteModal;
