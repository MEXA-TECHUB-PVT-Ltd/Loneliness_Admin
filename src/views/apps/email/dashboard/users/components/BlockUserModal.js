// ** React Imports
import { useState } from "react";
import PropTypes from "prop-types";

// ** Third Party Components
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { useBlockUsersMutation } from "../../../../../../redux/api";
import { notify } from "../../../../../../utility/toast";
import LoadingButton from "../../../../../components/buttons/LoadingButton";

const BlockUserModal = ({ isOpen, toggle, token, refetch, selectedUser }) => {
  const [blockUsers, { isLoading }] = useBlockUsersMutation();


  const handleBlock = async () => {
    try {
      await blockUsers({
        user_id: selectedUser.id,
        is_block: !selectedUser.is_block,
        token,
      }).unwrap();
      toggle();
      refetch();
      notify(
        `User ${!selectedUser.is_block ? "Block" : "Unblock"} successfully!`
      );
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Block User</ModalHeader>
      <ModalBody>Are you sure you want to block this user?</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
        <LoadingButton
          color={!selectedUser.is_block ? "danger" : "primary"}
          isLoading={isLoading}
          onClick={handleBlock}
        >
          Submit
        </LoadingButton>
      </ModalFooter>
    </Modal>
  );
};

BlockUserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  selectedData: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default BlockUserModal;
