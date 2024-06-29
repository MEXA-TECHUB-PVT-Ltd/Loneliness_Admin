import React from "react";
import Reported from "./components/Reported";
import { getLocalToken } from "../../../../../utility/getLocalToken";

const index = () => {
  const token = getLocalToken();
  return (
    <div>
      <Reported token={token} />{" "}
    </div>
  );
};

export default index;
