"use client";

import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Home, RefreshCw, AlertTriangle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global application error:", error);
    
    // Redirect to custom domain after a short delay for critical errors
    const timer = setTimeout(() => {
      window.location.href = "https://alkitab.hkbpperawang.org";
    }, 5000);

    return () => clearTimeout(timer);
  }, [error]);

  return (
    <html lang="id">
      <body>
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <AlertTriangle className="h-12 w-12 text-destructive" />
              </div>
              <CardTitle className="text-2xl">Kesalahan Sistem</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                Maaf, terjadi kesalahan sistem yang tidak terduga.
              </p>
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm font-mono text-muted-foreground">
                  {error.message || "Kesalahan sistem tidak diketahui"}
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                Anda akan dialihkan ke alkitab.hkbpperawang.org dalam beberapa saat...
              </p>
              <div className="flex flex-col gap-2">
                <Button 
                  onClick={() => window.location.href = "https://alkitab.hkbpperawang.org"}
                  className="w-full"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Kunjungi Situs Alkitab
                </Button>
                <Button 
                  variant="outline" 
                  onClick={reset}
                  className="w-full"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Coba Lagi
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </body>
    </html>
  );
}