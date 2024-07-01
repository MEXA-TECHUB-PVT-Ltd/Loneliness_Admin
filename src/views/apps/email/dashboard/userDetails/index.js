import React from "react";
import { useParams } from "react-router-dom";
import { getLocalToken } from "../../../../../utility/getLocalToken";
import UserDetails from "./components/UserDetails";
import { useGetUserDetailsQuery } from "../../../../../redux/api";
import ComponentSpinner from "../../../../../@core/components/spinner/Loading-spinner";

const index = () => {
  const params = useParams();
  const { id } = params;
  const token = getLocalToken();
  const { data, isLoading, error, refetch } = useGetUserDetailsQuery({
    id,
    token,
  });

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
      <UserDetails data={data} token={token} refetch={refetch} />
    </div>
  );
};

export default index;
