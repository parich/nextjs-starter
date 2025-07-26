"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

export function TestProtectionClient() {
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const testProtectedAPI = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/protected");
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "เกิดข้อผิดพลาด");
      } else {
        setResult(data);
      }
    } catch (err) {
      console.log("🚀 ~ testProtectedAPI ~ err:", err);
      setError("เกิดข้อผิดพลาดในการเชื่อมต่อ");
    } finally {
      setLoading(false);
    }
  };

  const testAdminAPI = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/admin/users");
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "เกิดข้อผิดพลาด");
      } else {
        setResult(data);
      }
    } catch (err) {
      console.log("🚀 ~ testAdminAPI ~ err:", err);
      setError("เกิดข้อผิดพลาดในการเชื่อมต่อ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button onClick={testProtectedAPI} disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          ทดสอบ Protected API
        </Button>
        <Button onClick={testAdminAPI} disabled={loading} variant="destructive">
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          ทดสอบ Admin API
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <Alert>
          <AlertDescription>
            <strong>ผลลัพธ์:</strong>
            <pre className="mt-2 text-xs overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
