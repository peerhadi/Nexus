"use client";

import { createContext, useContext } from "react";

export type AlertType = "success" | "error" | "warning" | "info";

export type Alert = {
  id: string;
  type: AlertType;
  title: string;
  message?: string;
};

type AlertContextType = {
  showAlert: (type: AlertType, title: string, message?: string) => void;
  removeAlert: (id: string) => void;
};

export const AlertContext = createContext<AlertContextType | null>(null);

export function useAlert() {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error("useAlert must be used inside an AlertProvider");
  }

  return context;
}
