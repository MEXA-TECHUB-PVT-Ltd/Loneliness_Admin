import React from "react";
import { Button, Spinner } from "reactstrap";

const LoadingButton = ({ isLoading, children, ...props }) => {
  return (
    <Button disabled={isLoading} {...props}>
      {isLoading && <Spinner size="sm" className="me-1" />}
      {children}
    </Button>
  );
};

export default LoadingButton;
