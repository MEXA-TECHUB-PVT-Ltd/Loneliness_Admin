// ** React Imports
import { useState, useEffect } from "react";

// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  Label,
  Input,
  Alert,
} from "reactstrap";

// ** Icons Imports
import { Edit3 } from "react-feather";
import { getLocalToken } from "../../../../../utility/getLocalToken";
import {
  useGetCommissionQuery,
  useSetCommissionMutation,
} from "../../../../../redux/api";
import ComponentSpinner from "../../../../../@core/components/spinner/Loading-spinner";
import SetCommissionModal from "./SetCommissionModal";

const SetCommission = () => {
  const [commission, setCommission] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setError(null);
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
            onClick={toggleModal}
          />
        </CardTitle>
        {isLoading ? (
          <ComponentSpinner />
        ) : (
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
              readOnly
              style={{
                borderColor: "#d8d6de",
                backgroundColor: "#f1f2f6",
                cursor: "not-allowed",
              }}
            />
          </FormGroup>
        )}
        {error && <Alert color="danger">{error}</Alert>}
      </CardBody>

      <SetCommissionModal
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        commission={commission}
        setCommission={setCommission}
        setCommissionMutation={setCommissionMutation}
        token={token}
        refetch={refetch}
        isSetting={isSetting}
      />
    </Card>
  );
};

export default SetCommission;
