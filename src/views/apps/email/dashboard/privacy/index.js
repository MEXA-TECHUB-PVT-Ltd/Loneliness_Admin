import React from "react";
import { getLocalToken } from "../../../../../utility/getLocalToken";
import Policies from "../../../../components/polices";

const index = () => {
  const token = getLocalToken();
  return (
    <div>
      <Policies token={token} type="PRIVACY" title="Privacy" />
    </div>
  );
};

export default index;
