import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
} from "reactstrap";
import {
  useGetPoliciesQuery,
  useTogglePoliciesMutation,
} from "../../../redux/api";
import { notify } from "../../../utility/toast";
import LoadingButton from "../buttons/LoadingButton";
import ComponentSpinner from "../../../@core/components/spinner/Loading-spinner";

const Policies = ({ token, type, title }) => {
  const {
    data,
    error,
    isLoading: isFetching,
    refetch,
  } = useGetPoliciesQuery({ type: type, token });
  const [content, setContent] = useState("");
  const [originalContent, setOriginalContent] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [togglePolicies, { isLoading }] = useTogglePoliciesMutation();

  useEffect(() => {
    if (data && data.result && data.result.content) {
      setContent(data.result.content);
      setOriginalContent(data.result.content);
    }
  }, [data]);

  const handleSave = async () => {
    try {
      await togglePolicies({
        content,
        type: type,
        token,
      }).unwrap();
      refetch();
      setOriginalContent(content); // Update original content on save
      setEditMode(false);
      notify("Terms & Conditions updated successfully!");
    } catch (error) {
      console.error("Failed to update terms & conditions:", error);
    }
  };

  const handleCancel = () => {
    setContent(originalContent); // Revert to original content
    setEditMode(false);
  };

  if (isFetching) {
    return <ComponentSpinner />;
  }

  if (error) {
    return <div>Error fetching policies: {error.message}</div>;
  }

  return (
    <Card>
      <CardHeader>
        <h4>{title}</h4>
        {!editMode && (
          <Button color="primary" onClick={() => setEditMode(true)}>
            Edit
          </Button>
        )}
      </CardHeader>
      <CardBody>
        {editMode ? (
          <Form>
            <FormGroup>
              <Label for="termsContent">Content</Label>
              <ReactQuill
                value={content}
                onChange={setContent}
                theme="snow"
                id="termsContent"
              />
            </FormGroup>
            <LoadingButton
              color="primary"
              onClick={handleSave}
              isLoading={isLoading}
            >
              Save
            </LoadingButton>
            <Button color="secondary" className="ms-2" onClick={handleCancel}>
              Cancel
            </Button>
          </Form>
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            style={{ whiteSpace: "pre-wrap" }}
          />
        )}
      </CardBody>
    </Card>
  );
};

Policies.propTypes = {
  token: PropTypes.string.isRequired,
};

export default Policies;
