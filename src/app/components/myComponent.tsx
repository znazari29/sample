"use client";

import React, { useContext } from "react";

import { useStoreContext } from "../context/StoreContext";
import { DataContext } from "../context/DataContext";

const MyComponent: React.FC = () => {
  const {
    data: { apiData, socketData },
  } = useContext(DataContext);
  const {
    storeData: { transformedData },
  } = useStoreContext();

  return (
    <div>
      <h1>Transformed Data for Component:</h1>
      {transformedData && <pre>{JSON.stringify(transformedData, null, 2)}</pre>}

      <h2>Raw API Data:</h2>
      {apiData && <pre>{JSON.stringify(apiData, null, 2)}</pre>}

      <h2>Raw WebSocket Data:</h2>
      {socketData && <pre>{JSON.stringify(socketData, null, 2)}</pre>}
    </div>
  );
};

export default MyComponent;
