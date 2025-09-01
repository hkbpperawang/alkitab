import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = "https://alkitab-api-v3.vercel.app";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ version: string; book: string; chapter: string }> }
) {
  try {
    const { version, book, chapter } = await params;
    
    // Validate version
    const validVersions = ["tb", "btb"];
    if (!validVersions.includes(version)) {
      return NextResponse.json(
        { error: "Versi Alkitab tidak valid" },
        { status: 400 }
      );
    }

    // Validate book and chapter (should be numbers)
    if (!/^\d+$/.test(book) || !/^\d+$/.test(chapter)) {
      return NextResponse.json(
        { error: "Format kitab atau pasal tidak valid" },
        { status: 400 }
      );
    }

    const response = await fetch(`${API_BASE_URL}/${version}/${book}/${chapter}`, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "force-cache", // Cache verses as Bible content doesn't change
      next: { revalidate: 604800 }, // Revalidate once per week
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching Bible verses:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data ayat" },
      { status: 500 }
    );
  }
}