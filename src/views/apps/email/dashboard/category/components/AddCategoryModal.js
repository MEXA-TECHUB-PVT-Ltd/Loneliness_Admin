// ** React Imports
import { useState } from "react";
import PropTypes from "prop-types";

// ** Third Party Components
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import LoadingButton from "../../../../../components/buttons/LoadingButton";

// ** Custom Hooks
import { useAddCategoryMutation } from "../../../../../../redux/api";
import { notify } from "../../../../../../utility/toast";

const AddCategoryModal = ({ isOpen, toggle, token, refetch }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [addCategory, { isLoading }] = useAddCategoryMutation();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCategory({ name, image, token }).unwrap();
      setName("");
      setImage(null);
      toggle();
      refetch();
      notify("Category added successfully!")
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add Category</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleFormSubmit}>
          <FormGroup>
            <Label for="categoryName">Name</Label>
            <Input
              type="text"
              id="categoryName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="categoryImage">Image</Label>
            <Input
              type="file"
              id="categoryImage"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </FormGroup>
          <LoadingButton
            type="submit"
            color="primary"
            block
            isLoading={isLoading}
          >
            Add
          </LoadingButton>
        </Form>
      </ModalBody>
    </Modal>
  );
};

AddCategoryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

export default AddCategoryModal;
