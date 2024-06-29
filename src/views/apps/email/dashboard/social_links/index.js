import React from "react";
import SocialLinks from "./component/SocialLinks";
import { getLocalToken } from "../../../../../utility/getLocalToken";

const index = () => {
  const token = getLocalToken();
  return (
    <div>
      <SocialLinks token={token} />{" "}
    </div>
  );
};

export default index;
