import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "./context/StoreContext";
import { DataProvider } from "./context/DataContext";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <DataProvider>{children}</DataProvider>
    </StoreProvider>
  );
}
