import React from "react";
import { getLocalToken } from "../../../../../utility/getLocalToken";
import { useGetRequestQuery } from "../../../../../redux/api";
import { useLocation, useParams } from "react-router-dom";
import ComponentSpinner from "../../../../../@core/components/spinner/Loading-spinner";
import RequestDetails from "./components/RequestDetails";

const index = () => {
  const token = getLocalToken();
  const params = useParams();
  const location = useLocation();
  const id = params.id;
  const { data, error, isLoading, refetch } = useGetRequestQuery({ id, token });
  if (isLoading) {
    return <ComponentSpinner />;
  }

  if (error) {
    return (
      <p className="text-danger">
        Error fetching user details: {error.message}
      </p>
    );
  }
  return (
    <div>
      <RequestDetails
        data={data.result}
        userDetails={location.state || {}}
        refetch={refetch}
        token={token}
      />
    </div>
  );
};

export default index;
