"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { SignalRService } from "../services/signalRService";

// Define a type for the data
interface DataType {
  apiData: any; // Data fetched from REST API
  socketData: any; // Data received from WebSocket
}

const initialData = {
  data: {
    apiData: [],
    socketData: [],
  },
  setApiData: () => {},
  setSocketData: () => {},
};

// Define the context type
interface DataContextType {
  data: DataType;
  setApiData: (data: any) => void;
  setSocketData: (data: any) => void;
}

// Create the context
export const DataContext = createContext<DataContextType | undefined>(
  initialData
);

// Define the provider props type
interface DataProviderProps {
  children: ReactNode;
}

// DataProvider component
export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [apiData, setApiData] = useState<any>(null); // API data state
  const [socketData, setSocketData] = useState<any>(null); // WebSocket data state

  useEffect(() => {
    // Fetch data from API
    const fetchDataFromApi = async () => {
      try {
        const response = await fetch("/api/data-endpoint"); // Replace with your API endpoint
        const data = await response.json();
        setApiData(data);
      } catch (error) {
        console.error("Failed to fetch API data:", error);
      }
    };

    fetchDataFromApi();

    // Set up SignalR WebSocket service
    const signalRService = new SignalRService(
      "https://your-signalr-server.com/hub"
    );

    signalRService.start();

    const handleSocketData = (incomingData: any) => {
      setSocketData(incomingData); // Update WebSocket data state
    };

    // Subscribe to WebSocket events
    signalRService.on<any>("ReceiveData", handleSocketData);

    // Clean up the WebSocket connection on component unmount
    return () => {
      signalRService.off("ReceiveData", handleSocketData);
      signalRService.stop();
    };
  }, []);

  return (
    <DataContext.Provider
      value={{ data: { apiData, socketData }, setApiData, setSocketData }}
    >
      {children}
    </DataContext.Provider>
  );
};
