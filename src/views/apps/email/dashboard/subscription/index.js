import React from "react";
import Subscription from "./components/Subscription";
import { getLocalToken } from "../../../../../utility/getLocalToken";

const index = () => {
  const token = getLocalToken();
  return (
    <div>
      <Subscription token={token} />
    </div>
  );
};

export default index;
