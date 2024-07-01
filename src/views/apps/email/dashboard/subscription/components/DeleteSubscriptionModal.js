// ** React Imports
import { useState } from "react";
import PropTypes from "prop-types";

// ** Third Party Components
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { useDeleteSubscriptionMutation } from "../../../../../../redux/api";
import { notify } from "../../../../../../utility/toast";
import LoadingButton from "../../../../../components/buttons/LoadingButton";

const DeleteSubscriptionModal = ({
  isOpen,
  toggle,
  token,
  refetch,
  subscriptionId,
}) => {
  const [deleteSubscription, { isLoading }] = useDeleteSubscriptionMutation();

  const handleDelete = async () => {
    try {
      await deleteSubscription({ id: subscriptionId, token }).unwrap();
      toggle();
      refetch();
      notify("Subscription deleted successfully!");
    } catch (error) {
      console.error("Failed to delete subscription:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Delete Subscription</ModalHeader>
      <ModalBody>Are you sure you want to delete this subscription?</ModalBody>
      <ModalFooter>
        <LoadingButton
          type="submit"
          color="danger"
          onClick={handleDelete}
          isLoading={isLoading}
        >
          Delete
        </LoadingButton>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

DeleteSubscriptionModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  subscriptionId: PropTypes.string.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default DeleteSubscriptionModal;
