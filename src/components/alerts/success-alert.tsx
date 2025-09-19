// components/alerts/success-alert.tsx

"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface SuccessAlertProps {
  message: string;
  title?: string;
  dismissible?: boolean;
}

export function SuccessAlert({
  message,
  title = "สำเร็จ!",
  dismissible = true,
}: SuccessAlertProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <Alert className="relative border-green-500 bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-100 pr-10">
      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-300" />
      <div className="flex flex-col space-y-1">
        <AlertTitle className="font-semibold">{title}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </div>
      {dismissible && (
        <button
          onClick={() => setVisible(false)}
          className="absolute top-2 right-2 text-green-600 hover:text-green-800 dark:text-green-300 dark:hover:text-green-100 text-xl font-bold"
        >
          ×
        </button>
      )}
    </Alert>
  );
}
