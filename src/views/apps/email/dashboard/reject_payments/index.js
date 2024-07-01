import React from "react";
import { getLocalToken } from "../../../../../utility/getLocalToken";
import RejectedReason from "./components/RejectedReasons";

const index = () => {
  const token = getLocalToken();
  return (
    <div>
      <RejectedReason token={token} />
    </div>
  );
};

export default index;
