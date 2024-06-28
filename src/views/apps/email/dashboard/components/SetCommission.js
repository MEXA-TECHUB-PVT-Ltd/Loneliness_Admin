// ** React Imports
import { useState, useEffect } from "react";

// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
} from "reactstrap";

// ** Icons Imports
import { Edit3 } from "react-feather";
import { getLocalToken } from "../../../../../utility/getLocalToken";
import {
  useGetCommissionQuery,
  useSetCommissionMutation,
} from "../../../../../redux/api";
import LoadingButton from "../../../../components/buttons/LoadingButton";
import { notify } from "../../../../../utility/toast";
import ComponentSpinner from "../../../../../@core/components/spinner/Loading-spinner";


const SetCommission = () => {
  const [commission, setCommission] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const token = getLocalToken();

  // Fetch commission data
  const {
    data,
    error: getError,
    isLoading,
    refetch,
  } = useGetCommissionQuery(token);

  // Set commission mutation
  const [setCommissionMutation, { isLoading: isSetting }] =
    useSetCommissionMutation();

  useEffect(() => {
    if (data) {
      setCommission(data?.result?.per_hour_rate);
    }
    if (getError) {
      setError("Failed to fetch commission data");
    }
  }, [data, getError]);

  const handleEditClick = () => {
    setIsEditing(true);
    setError(null);
  };

  const handleSaveClick = async () => {
    try {
      await setCommissionMutation({
        per_hour_rate: commission,
        token,
      }).unwrap();
      notify("Commission updated successfully!");
      refetch();
      setIsEditing(false);
      setError(null);
    } catch (error) {
      // Corrected from setError2 to error
      setError("Failed to set commission");
    }
  };

  return (
    <Card
      style={{
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
      }}
    >
      <CardBody style={{ padding: "20px" }}>
        <CardTitle
          tag="h5"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Set Commission
          <Edit3
            size={20}
            style={{ cursor: "pointer", color: "#7367f0" }}
            onClick={handleEditClick}
          />
        </CardTitle>
        {isLoading ? (
          <ComponentSpinner />
        ) : (
          <Form>
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
                disabled={!isEditing}
                style={{
                  borderColor: isEditing ? "#7367f0" : "#d8d6de",
                  backgroundColor: isEditing ? "#ffffff" : "#f1f2f6",
                  cursor: isEditing ? "text" : "not-allowed",
                }}
              />
            </FormGroup>
            {isEditing && (
              <LoadingButton
                type="submit"
                color="primary"
                onClick={handleSaveClick}
                isLoading={isSetting}
              >
                Save
              </LoadingButton>
            )}
          </Form>
        )}
        {error && <Alert color="danger">{error}</Alert>}
        <p style={{ visibility: "hidden" }}>
          You have done <strong>57.6%</strong> more sales today. Check your new
          badge in your profile.
        </p>
      </CardBody>
    </Card>
  );
};

export default SetCommission;
