import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Form,
  Alert,
} from "reactstrap";
import { useChangePasswordMutation } from "../../../../redux/api";
import { notify } from "../../../../utility/toast";
import LoadingButton from "../../../../views/components/buttons/LoadingButton";

const ChangePasswordModal = ({ isOpen, toggle, token }) => {
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.new_password !== formData.confirm_password) {
      setMessage("New Password and Confirm Password do not match");
      setIsError(true);
      return;
    }
    try {
      const result = await changePassword({
        old_password: formData.old_password,
        new_password: formData.new_password,
        confirm_password: formData.confirm_password,
        role: "ADMIN",
        token: token,
      }).unwrap();
      setMessage(result.message);
      setIsError(false);
      notify("Password changed successfully!");
      toggle();
    } catch (err) {
      console.log(err);
      setIsError(true);
      if (err.data && err.data.errors) {
        setMessage(err.data.errors.join(" "));
      } else if (err.data && err.data.message) {
        setMessage(err.data.message);
      } else if (err.error) {
        setMessage(err.error);
      } else {
        setMessage("An error occurred");
      }
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Change Password</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="old_password">Old Password</Label>
            <Input
              type="password"
              name="old_password"
              id="old_password"
              value={formData.old_password}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="new_password">New Password</Label>
            <Input
              type="password"
              name="new_password"
              id="new_password"
              value={formData.new_password}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="confirm_password">Confirm New Password</Label>
            <Input
              type="password"
              name="confirm_password"
              id="confirm_password"
              value={formData.confirm_password}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          {message && (
            <Alert color={isError ? "danger" : "success"}>{message}</Alert>
          )}
          <LoadingButton color="primary" type="submit" isLoading={isLoading}>
            Submit
          </LoadingButton>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ChangePasswordModal;
