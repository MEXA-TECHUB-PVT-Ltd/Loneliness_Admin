import React from "react";
import { getLocalToken } from "../../../../../utility/getLocalToken";
import Users from "./components/Users";

const index = () => {
  const token = getLocalToken();
  return (
    <div>
      <Users token={token} />
    </div>
  );
};

export default index;
