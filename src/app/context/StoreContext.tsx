"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { DataContext } from "./DataContext";

// Define a type for the transformed data
interface StoreDataType {
  transformedData: any; // Transformed data from API and WebSocket
}

// Define the context type
interface StoreContextType {
  storeData: StoreDataType;
}

// Create the context
const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Custom hook to use the StoreContext
export const useStoreContext = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStoreContext must be used within a StoreProvider");
  }
  return context;
};

// Define the provider props type
interface StoreProviderProps {
  children: ReactNode;
}

// Function to transform data into the required format for components
const transformData = (apiData: any, socketData: any): any => {
  // Example transformation logic: merge or convert apiData and socketData
  const transformedData = { ...apiData, ...socketData }; // Replace with actual transformation logic
  return transformedData;
};

// StoreProvider component
export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const { data } = useContext(DataContext); // Get data from DataContext
  const [storeData, setStoreData] = useState<StoreDataType>({
    transformedData: null,
  });

  useEffect(() => {
    if (data.apiData || data.socketData) {
      const transformed = transformData(data.apiData, data.socketData);
      setStoreData({ transformedData: transformed });
    }
  }, [data.apiData, data.socketData]); // Update transformed data when source data changes

  return (
    <StoreContext.Provider value={{ storeData }}>
      {children}
    </StoreContext.Provider>
  );
};
