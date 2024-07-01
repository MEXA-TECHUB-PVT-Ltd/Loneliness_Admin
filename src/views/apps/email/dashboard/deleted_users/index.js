import React from "react";
import { getLocalToken } from "../../../../../utility/getLocalToken";
import DeleteUsers from "./components/DeletedUsers";

const index = () => {
  const token = getLocalToken();
  return (
    <div>
      <DeleteUsers token={token} />
    </div>
  );
};

export default index;
