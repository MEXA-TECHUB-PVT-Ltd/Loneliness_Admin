import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Alert,
  Button,
} from "reactstrap";
import LoadingButton from "../../../../components/buttons/LoadingButton";
import { notify } from "../../../../../utility/toast";

const SetCommissionModal = ({
  isModalOpen,
  toggleModal,
  commission,
  setCommission,
  setCommissionMutation,
  token,
  refetch,
  isSetting,
}) => {
  const [error, setError] = useState(null);

  const handleSaveClick = async () => {
    try {
      await setCommissionMutation({
        per_hour_rate: commission,
        token,
      }).unwrap();
      notify("Commission updated successfully!");
      refetch();
      toggleModal();
    } catch (error) {
      setError("Failed to set commission");
    }
  };

  return (
    <Modal isOpen={isModalOpen} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>Set Commission</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="commission" style={{ fontWeight: "bold" }}>
            Commission (%)
          </Label>
          <Input
            type="number"
            name="commission"
            id="commission"
            placeholder="Enter commission"
            value={commission}
            onChange={(e) => setCommission(e.target.value)}
            style={{
              borderColor: "#7367f0",
              backgroundColor: "#ffffff",
              cursor: "text",
            }}
          />
        </FormGroup>
        {error && <Alert color="danger">{error}</Alert>}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggleModal}>
          Cancel
        </Button>
        <LoadingButton
          color="primary"
          onClick={handleSaveClick}
          isLoading={isSetting}
        >
          Save
        </LoadingButton>
      </ModalFooter>
    </Modal>
  );
};

export default SetCommissionModal;
