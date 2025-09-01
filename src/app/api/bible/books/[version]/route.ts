import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = "https://alkitab-api-v3.vercel.app";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ version: string }> }
) {
  try {
    const { version } = await params;
    
    // Validate version
    const validVersions = ["tb", "btb"];
    if (!validVersions.includes(version)) {
      return NextResponse.json(
        { error: "Versi Alkitab tidak valid" },
        { status: 400 }
      );
    }

    const response = await fetch(`${API_BASE_URL}/books/${version}`, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "force-cache", // Cache the books list as it doesn't change often
      next: { revalidate: 86400 }, // Revalidate once per day
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching Bible books:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data kitab" },
      { status: 500 }
    );
  }
}