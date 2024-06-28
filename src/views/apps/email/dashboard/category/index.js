import React from "react";
import Categories from "./components/Categories";
import { getLocalToken } from "../../../../../utility/getLocalToken";

const index = () => {
  const token = getLocalToken();
  return (
    <>
      <Categories token={token} />
    </>
  );
};

export default index;
