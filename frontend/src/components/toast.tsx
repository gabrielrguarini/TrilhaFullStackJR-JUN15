"use client";

import { useEffect } from "react";

export const Toast = ({
  text,
  onClose,
  alert,
}: {
  text: string;
  onClose: () => void;
  alert?: boolean;
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    });
    return () => clearTimeout(timer);
  }, [onClose]);
  return (
    <div className={`absolute w-32 ${alert ? "bg-red-600" : "bg-green-600"}`}>
      {text}
    </div>
  );
};
