import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import LoadingButton from "../../../../../components/buttons/LoadingButton";
import { notify } from "../../../../../../utility/toast";

const ReleasePaymentModal = ({ isOpen, toggle, onConfirm, isLoading }) => {
  const [releaseTo, setReleaseTo] = useState("USER");

  const handleConfirm = () => {
    onConfirm(releaseTo);
    notify("Payment has been released successfully!");
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Release Payment</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="releaseTo">Release Payment To:</Label>
          <Input
            type="select"
            name="releaseTo"
            id="releaseTo"
            value={releaseTo}
            onChange={(e) => setReleaseTo(e.target.value)}
          >
            <option value="USER">User</option>
            <option value="BUDDY">Buddy</option>
          </Input>
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
        <LoadingButton
          color="primary"
          onClick={handleConfirm}
          isLoading={isLoading}
        >
          Confirm
        </LoadingButton>{" "}
      </ModalFooter>
    </Modal>
  );
};

export default ReleasePaymentModal;
