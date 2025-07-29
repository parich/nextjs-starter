"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";

interface DestructiveAlertProps {
  message: string;
  title?: string;
  dismissible?: boolean;
}

export function DestructiveAlert({
  message,
  title = "เกิดข้อผิดพลาด!",
  dismissible = true,
}: DestructiveAlertProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <Alert variant="destructive" className="relative pr-10">
      <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-300" />
      <div className="flex flex-col space-y-1">
        <AlertTitle className="font-semibold">{title}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </div>
      {dismissible && (
        <button
          onClick={() => setVisible(false)}
          className="absolute top-2 right-2 text-red-600 hover:text-red-800 dark:text-red-300 dark:hover:text-red-100 text-xl font-bold"
        >
          ×
        </button>
      )}
    </Alert>
  );
}
