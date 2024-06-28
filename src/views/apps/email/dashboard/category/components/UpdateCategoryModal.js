// ** React Imports
import { useState, useEffect } from "react";
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
import { useUpdateCategoryMutation } from "../../../../../../redux/api";
import { notify } from "../../../../../../utility/toast";

const UpdateCategoryModal = ({ isOpen, toggle, token, refetch, category }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();

  useEffect(() => {
    if (category) {
      setName(category.name);
    }
  }, [category]);

  console.log(category);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCategory({ id: category.id, name, image, token }).unwrap();
      setName("");
      setImage(null);
      toggle();
      refetch();
      notify("Category updated successfully!");
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Update Category</ModalHeader>
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
            />
          </FormGroup>
          <LoadingButton
            type="submit"
            color="primary"
            block
            isLoading={isLoading}
          >
            Update
          </LoadingButton>
        </Form>
      </ModalBody>
    </Modal>
  );
};

UpdateCategoryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  category: PropTypes.object.isRequired,
};

export default UpdateCategoryModal;
