"use client";

import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Home, RefreshCw } from "lucide-react";

export default function NotFound() {
  useEffect(() => {
    // Redirect to custom domain after a short delay
    const timer = setTimeout(() => {
      window.location.href = "https://alkitab.hkbpperawang.org";
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <BookOpen className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl">Halaman Tidak Ditemukan</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            Maaf, halaman yang Anda cari tidak ditemukan.
          </p>
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
              onClick={() => window.location.reload()}
              className="w-full"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Coba Lagi
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}