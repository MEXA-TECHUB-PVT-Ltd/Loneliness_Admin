import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import ComponentSpinner from "../../../../../../@core/components/spinner/Loading-spinner";
import { useGetWalletQuery } from "../../../../../../redux/api";

const Wallet = ({ token }) => {
  const { data, error, isLoading } = useGetWalletQuery({ token });

  if (isLoading) {
    return (
      <Card>
        <CardBody>
          <ComponentSpinner />
        </CardBody>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardBody>Error fetching wallet data</CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h4">Wallet Information</CardTitle>
        <CardText>
          <strong>Total Amount:</strong> ${data?.result?.amount || 0.0}
        </CardText>
      </CardBody>
    </Card>
  );
};

export default Wallet;
