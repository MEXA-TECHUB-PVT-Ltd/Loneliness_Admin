// ** React Imports
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

// ** Third Party Components
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { useAddSubscriptionMutation } from "../../../../../../redux/api";
import { notify } from "../../../../../../utility/toast";
import LoadingButton from "../../../../../components/buttons/LoadingButton";

const AddUpdateSubscriptionModal = ({
  isOpen,
  toggle,
  token,
  refetch,
  subscription,
}) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [interval, setInterval] = useState("month");
  const [addUpdateSubscription, { isLoading }] = useAddSubscriptionMutation();
  console.log(subscription);
  useEffect(() => {
    if (subscription) {
      setName(subscription.name);
      setAmount(subscription.amount);
      setInterval(subscription.interval || "month"); // Set default if not provided in subscription
    } else {
      setName("");
      setAmount("");
      setInterval("month"); // Reset to default if not updating
    }
  }, [subscription]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await addUpdateSubscription({
        name,
        amount,
        interval_name: interval,
        token,
      }).unwrap();
      toggle();
      refetch();
      notify(
        subscription
          ? "Subscription updated successfully!"
          : "Subscription added successfully!"
      );
    } catch (error) {
      console.error("Failed to add/update subscription:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        {subscription ? "Update Subscription" : "Add Subscription"}
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleFormSubmit}>
          <FormGroup>
            <Label for="subscriptionName">Name</Label>
            <Input
              type="text"
              id="subscriptionName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="subscriptionAmount">Amount</Label>
            <Input
              type="number"
              id="subscriptionAmount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="subscriptionInterval">Billing Interval</Label>
            <Input
              type="select"
              id="subscriptionInterval"
              value={interval}
              onChange={(e) => setInterval(e.target.value)}
              required
            >
              <option value="month">Monthly</option>
              <option value="quarter">Quarterly</option>
              <option value="year">Yearly</option>
            </Input>
          </FormGroup>

          <LoadingButton
            type="submit"
            color="primary"
            isLoading={isLoading}
            block
          >
            {isLoading
              ? subscription
                ? "Updating..."
                : "Adding..."
              : subscription
              ? "Update"
              : "Add"}
          </LoadingButton>
        </Form>
      </ModalBody>
    </Modal>
  );
};

AddUpdateSubscriptionModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  refetch: PropTypes.func.isRequired,
  subscription: PropTypes.object, // subscription is optional for add, required for update
};

export default AddUpdateSubscriptionModal;
