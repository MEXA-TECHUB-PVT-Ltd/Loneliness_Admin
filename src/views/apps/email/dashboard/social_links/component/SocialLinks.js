import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Table,
  Alert,
  Row,
  Col,
} from "reactstrap";
import {
  useDeleteSocialLinksMutation,
  useGetSocialLinkQuery,
  useToggleSocialLinksMutation,
} from "../../../../../../redux/api";
import LoadingButton from "../../../../../components/buttons/LoadingButton";
import DeleteModal from "./DeleteModal";
import { Trash2 } from "react-feather";

const SocialLinks = ({ token }) => {
  const { data, error, isLoading, refetch } = useGetSocialLinkQuery({ token });
  const [toggleSocialLinks, { isLoading: toggleLoading }] =
    useToggleSocialLinksMutation();
  const [deleteSocialLinks, { isLoading: deleteLoading }] =
    useDeleteSocialLinksMutation();
  const [platform, setPlatform] = useState("");
  const [link, setLink] = useState("");
  const [formErrors, setFormErrors] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    try {
      setFormErrors(null);
      await toggleSocialLinks({ platform, link, token }).unwrap();
      refetch();
      setPlatform("");
      setLink("");
    } catch (error) {
      console.error("Failed to add/update social link:", error);
      if (error.data && error.data.errors && error.data.errors.length > 0) {
        setFormErrors(error.data.errors);
      } else {
        setFormErrors([{ message: "Failed to add/update social link." }]);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSocialLinks({ id, token }).unwrap();
      refetch();
      closeDeleteModal();
    } catch (error) {
      console.error("Failed to delete social link:", error);
    }
  };

  const openDeleteModal = (id) => {
    setDeleteConfirmation(id);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setDeleteConfirmation(null);
  };

  return (
    <Card>
      <CardHeader>
        <h4>Social Links</h4>
      </CardHeader>
      <CardBody>
        <Row>
          <Col sm="6">
            <Table responsive>
              <thead>
                <tr>
                  <th>Platform</th>
                  <th>Link</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.result?.map((link) => (
                  <tr key={link.id}>
                    <td>{link.platform}</td>
                    <td>{link.link}</td>
                    <td>
                      <Button
                        color="danger"
                        onClick={() => openDeleteModal(link.id)}
                        size="sm"
                      >
                        <Trash2 size={12} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          <Col sm="6">
            <Form onSubmit={handleAddOrUpdate}>
              {formErrors && (
                <Alert color="danger">
                  {formErrors.map((errorMsg, index) => (
                    <p key={index}>{errorMsg}</p>
                  ))}
                </Alert>
              )}
              <FormGroup>
                <Label for="platform">Platform</Label>
                <Input
                  type="select"
                  id="platform"
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  required
                >
                  <option value="">Select Platform</option>
                  <option value="FACEBOOK">Facebook</option>
                  <option value="INSTAGRAM">Instagram</option>
                  <option value="TWITTER">Twitter</option>
                  <option value="LINKEDIN">LinkedIn</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="link">Link</Label>
                <Input
                  type="url"
                  id="link"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  required
                />
              </FormGroup>
              <LoadingButton
                color="primary"
                type="submit"
                isLoading={toggleLoading}
              >
                {toggleLoading ? "Saving..." : "Add/Update"}
              </LoadingButton>
            </Form>
          </Col>
        </Row>

        {/* Delete Modal */}
        <DeleteModal
          isOpen={deleteModalOpen}
          toggle={closeDeleteModal}
          onDelete={() => handleDelete(deleteConfirmation)}
          message="Are you sure you want to delete this social link?"
          isLoading={deleteLoading}
        />
      </CardBody>
    </Card>
  );
};

SocialLinks.propTypes = {
  token: PropTypes.string.isRequired,
};

export default SocialLinks;
