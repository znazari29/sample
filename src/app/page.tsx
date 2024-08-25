"use client";

import React from "react";
import { AppProps } from "next/app";
import MyComponent from "./components/myComponent";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <html>
      <body>
        <MyComponent />
      </body>
    </html>
  );
};

export default MyApp;
