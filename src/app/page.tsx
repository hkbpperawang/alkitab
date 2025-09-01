"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Moon, Sun, BookOpen, Languages } from "lucide-react";
import { toast } from "sonner";

interface Book {
  id: number;
  name: string;
  abbreviation: string;
  chapters: number;
}

interface Verse {
  verse: number;
  text: string;
}

const BIBLE_VERSIONS = {
  tb: "Terjemahan Baru",
  btb: "Bahasa Batak Toba",
} as const;

type BibleVersion = keyof typeof BIBLE_VERSIONS;

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [selectedVersion, setSelectedVersion] = useState<BibleVersion>("tb");
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<string>("");
  const [selectedChapter, setSelectedChapter] = useState<string>("");
  const [selectedVerse, setSelectedVerse] = useState<string>("");
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch books list
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://alkitab-api-v3.vercel.app/books/${selectedVersion}`
        );
        if (!response.ok) throw new Error("Gagal mengambil data kitab");
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        toast.error("Gagal mengambil data kitab");
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [selectedVersion]);

  // Fetch verses when book and chapter are selected
  useEffect(() => {
    const fetchVerses = async () => {
      if (!selectedBook || !selectedChapter) return;

      try {
        setLoading(true);
        const response = await fetch(
          `https://alkitab-api-v3.vercel.app/${selectedVersion}/${selectedBook}/${selectedChapter}`
        );
        if (!response.ok) throw new Error("Gagal mengambil data ayat");
        const data = await response.json();
        setVerses(data.verses || []);
      } catch (error) {
        toast.error("Gagal mengambil data ayat");
        console.error("Error fetching verses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVerses();
  }, [selectedBook, selectedChapter, selectedVersion]);

  const selectedBookData = books.find((book) => book.id.toString() === selectedBook);
  const chapterNumbers = selectedBookData
    ? Array.from({ length: selectedBookData.chapters }, (_, i) => i + 1)
    : [];
  const verseNumbers = verses.map((verse) => verse.verse);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">Alkitab HKBP Perawang</h1>
                <p className="text-sm text-muted-foreground">
                  Terjemahan Baru & Bahasa Batak Toba
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Version Selector */}
              <div className="flex items-center space-x-2">
                <Languages className="h-4 w-4 text-muted-foreground" />
                <Select
                  value={selectedVersion}
                  onValueChange={(value: BibleVersion) => {
                    setSelectedVersion(value);
                    setSelectedBook("");
                    setSelectedChapter("");
                    setSelectedVerse("");
                    setVerses([]);
                  }}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(BIBLE_VERSIONS).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* Theme Toggle */}
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-4">
          {/* Controls */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Pilih Ayat</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Book Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Kitab</label>
                  <Select
                    value={selectedBook}
                    onValueChange={(value) => {
                      setSelectedBook(value);
                      setSelectedChapter("");
                      setSelectedVerse("");
                      setVerses([]);
                    }}
                    disabled={loading || books.length === 0}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kitab" />
                    </SelectTrigger>
                    <SelectContent>
                      <ScrollArea className="max-h-60">
                        {books.map((book) => (
                          <SelectItem key={book.id} value={book.id.toString()}>
                            {book.name}
                          </SelectItem>
                        ))}
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                </div>

                {/* Chapter Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Pasal</label>
                  <Select
                    value={selectedChapter}
                    onValueChange={(value) => {
                      setSelectedChapter(value);
                      setSelectedVerse("");
                    }}
                    disabled={loading || !selectedBook}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih pasal" />
                    </SelectTrigger>
                    <SelectContent>
                      <ScrollArea className="max-h-60">
                        {chapterNumbers.map((chapter) => (
                          <SelectItem key={chapter} value={chapter.toString()}>
                            {chapter}
                          </SelectItem>
                        ))}
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                </div>

                {/* Verse Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Ayat</label>
                  <Select
                    value={selectedVerse}
                    onValueChange={setSelectedVerse}
                    disabled={loading || !selectedChapter}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih ayat" />
                    </SelectTrigger>
                    <SelectContent>
                      <ScrollArea className="max-h-60">
                        {verseNumbers.map((verse) => (
                          <SelectItem key={verse} value={verse.toString()}>
                            {verse}
                          </SelectItem>
                        ))}
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bible Content */}
          <div className="lg:col-span-3">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>
                  {selectedBookData && selectedChapter
                    ? `${selectedBookData.name} ${selectedChapter}${
                        selectedVerse ? `:${selectedVerse}` : ""
                      }`
                    : "Pilih Ayat Alkitab"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  {loading ? (
                    <div className="flex items-center justify-center h-96">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-muted-foreground">Memuat data...</p>
                      </div>
                    </div>
                  ) : verses.length > 0 ? (
                    <div className="space-y-4">
                      {selectedVerse ? (
                        // Show single verse
                        <div className="p-4 bg-muted rounded-lg">
                          <p className="text-lg leading-relaxed">
                            <span className="font-bold text-primary mr-2">
                              {selectedVerse}
                            </span>
                            {verses.find((v) => v.verse.toString() === selectedVerse)
                              ?.text || ""}
                          </p>
                        </div>
                      ) : (
                        // Show all verses in chapter
                        <div className="space-y-3">
                          {verses.map((verse) => (
                            <p
                              key={verse.verse}
                              className="text-lg leading-relaxed"
                            >
                              <span className="font-bold text-primary mr-2">
                                {verse.verse}
                              </span>
                              {verse.text}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-96">
                      <div className="text-center text-muted-foreground">
                        <BookOpen className="h-16 w-16 mx-auto mb-4 opacity-50" />
                        <p>Silakan pilih kitab, pasal, dan ayat untuk membaca Alkitab</p>
                      </div>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 HKBP Perawang. Alkitab Online - Terjemahan Baru & Bahasa Batak Toba</p>
            <p className="mt-1">Dikembangkan dengan ❤️ untuk jemaat</p>
          </div>
        </div>
      </footer>
    </div>
  );
}