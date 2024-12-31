"use client";
import { Toast } from "@/components/toast";
import { createContext, ReactNode, useContext, useState } from "react";

const ToastContext = createContext(({ message }: { message: string }) => {});

export const useToast = () => {
  return useContext(ToastContext);
};
export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState({ message: "", show: false });
  const showToast = ({ message }: { message: string }) => {
    setToast({ message, show: true });
  };
  const hideToast = () => {
    setToast({ ...toast, show: true });
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {toast.show && <Toast text={toast.message} onClose={hideToast} />}
    </ToastContext.Provider>
  );
};
