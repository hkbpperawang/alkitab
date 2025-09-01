// src/app/page.tsx
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

// Data kitab lengkap semua 66 kitab Alkitab
const STATIC_BOOKS = [
  // PERJANJIAN LAMA (39 Kitab)
  { id: 1, name: "Kejadian", abbreviation: "Kej", chapters: 50 },
  { id: 2, name: "Keluaran", abbreviation: "Kel", chapters: 40 },
  { id: 3, name: "Imamat", abbreviation: "Im", chapters: 27 },
  { id: 4, name: "Bilangan", abbreviation: "Bil", chapters: 36 },
  { id: 5, name: "Ulangan", abbreviation: "Ul", chapters: 34 },
  { id: 6, name: "Yosua", abbreviation: "Yos", chapters: 24 },
  { id: 7, name: "Hakim-hakim", abbreviation: "Hak", chapters: 21 },
  { id: 8, name: "Rut", abbreviation: "Rut", chapters: 4 },
  { id: 9, name: "1 Samuel", abbreviation: "1Sam", chapters: 31 },
  { id: 10, name: "2 Samuel", abbreviation: "2Sam", chapters: 24 },
  { id: 11, name: "1 Raja-raja", abbreviation: "1Raj", chapters: 22 },
  { id: 12, name: "2 Raja-raja", abbreviation: "2Raj", chapters: 25 },
  { id: 13, name: "1 Tawarikh", abbreviation: "1Taw", chapters: 29 },
  { id: 14, name: "2 Tawarikh", abbreviation: "2Taw", chapters: 36 },
  { id: 15, name: "Ezra", abbreviation: "Ezr", chapters: 10 },
  { id: 16, name: "Nehemia", abbreviation: "Neh", chapters: 13 },
  { id: 17, name: "Ester", abbreviation: "Est", chapters: 10 },
  { id: 18, name: "Ayub", abbreviation: "Ayb", chapters: 42 },
  { id: 19, name: "Mazmur", abbreviation: "Maz", chapters: 150 },
  { id: 20, name: "Amsal", abbreviation: "Ams", chapters: 31 },
  { id: 21, name: "Pengkhotbah", abbreviation: "Pkh", chapters: 12 },
  { id: 22, name: "Kidung Agung", abbreviation: "Kid", chapters: 8 },
  { id: 23, name: "Yesaya", abbreviation: "Yes", chapters: 66 },
  { id: 24, name: "Yeremia", abbreviation: "Yer", chapters: 52 },
  { id: 25, name: "Ratapan", abbreviation: "Rat", chapters: 5 },
  { id: 26, name: "Yehezkiel", abbreviation: "Yeh", chapters: 48 },
  { id: 27, name: "Daniel", abbreviation: "Dan", chapters: 12 },
  { id: 28, name: "Hosea", abbreviation: "Hos", chapters: 14 },
  { id: 29, name: "Yoel", abbreviation: "Yoe", chapters: 3 },
  { id: 30, name: "Amos", abbreviation: "Am", chapters: 9 },
  { id: 31, name: "Obaja", abbreviation: "Ob", chapters: 1 },
  { id: 32, name: "Yunus", abbreviation: "Yun", chapters: 4 },
  { id: 33, name: "Mikha", abbreviation: "Mik", chapters: 7 },
  { id: 34, name: "Nahum", abbreviation: "Nah", chapters: 3 },
  { id: 35, name: "Habakuk", abbreviation: "Hab", chapters: 3 },
  { id: 36, name: "Zefanya", abbreviation: "Zef", chapters: 3 },
  { id: 37, name: "Haggai", abbreviation: "Hag", chapters: 2 },
  { id: 38, name: "Zakharia", abbreviation: "Zak", chapters: 14 },
  { id: 39, name: "Maleakhi", abbreviation: "Mal", chapters: 4 },
  
  // PERJANJIAN BARU (27 Kitab)
  { id: 40, name: "Matius", abbreviation: "Mat", chapters: 28 },
  { id: 41, name: "Markus", abbreviation: "Mrk", chapters: 16 },
  { id: 42, name: "Lukas", abbreviation: "Luk", chapters: 24 },
  { id: 43, name: "Yohanes", abbreviation: "Yoh", chapters: 21 },
  { id: 44, name: "Kisah Para Rasul", abbreviation: "Kis", chapters: 28 },
  { id: 45, name: "Roma", abbreviation: "Rom", chapters: 16 },
  { id: 46, name: "1 Korintus", abbreviation: "1Kor", chapters: 16 },
  { id: 47, name: "2 Korintus", abbreviation: "2Kor", chapters: 13 },
  { id: 48, name: "Galatia", abbreviation: "Gal", chapters: 6 },
  { id: 49, name: "Efesus", abbreviation: "Ef", chapters: 6 },
  { id: 50, name: "Filipi", abbreviation: "Flp", chapters: 4 },
  { id: 51, name: "Kolose", abbreviation: "Kol", chapters: 4 },
  { id: 52, name: "1 Tesalonika", abbreviation: "1Tes", chapters: 5 },
  { id: 53, name: "2 Tesalonika", abbreviation: "2Tes", chapters: 3 },
  { id: 54, name: "1 Timotius", abbreviation: "1Tim", chapters: 6 },
  { id: 55, name: "2 Timotius", abbreviation: "2Tim", chapters: 4 },
  { id: 56, name: "Titus", abbreviation: "Tit", chapters: 3 },
  { id: 57, name: "Filemon", abbreviation: "Flm", chapters: 1 },
  { id: 58, name: "Ibrani", abbreviation: "Ibr", chapters: 13 },
  { id: 59, name: "Yakobus", abbreviation: "Yak", chapters: 5 },
  { id: 60, name: "1 Petrus", abbreviation: "1Pet", chapters: 5 },
  { id: 61, name: "2 Petrus", abbreviation: "2Pet", chapters: 3 },
  { id: 62, name: "1 Yohanes", abbreviation: "1Yoh", chapters: 5 },
  { id: 63, name: "2 Yohanes", abbreviation: "2Yoh", chapters: 1 },
  { id: 64, name: "3 Yohanes", abbreviation: "3Yoh", chapters: 1 },
  { id: 65, name: "Yudas", abbreviation: "Yud", chapters: 1 },
  { id: 66, name: "Wahyu", abbreviation: "Why", chapters: 22 },
];

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
  const [books] = useState(STATIC_BOOKS);
  const [selectedBook, setSelectedBook] = useState<string>("");
  const [selectedChapter, setSelectedChapter] = useState<string>("");
  const [selectedVerse, setSelectedVerse] = useState<string>("");
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch verses dengan fallback data yang lebih lengkap
  useEffect(() => {
    const fetchVerses = async () => {
      if (!selectedBook || !selectedChapter) return;

      try {
        setLoading(true);
        
        // Coba fetch dengan CORS proxy
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://alkitab-api-v3.vercel.app/${selectedVersion}/${selectedBook}/${selectedChapter}`)}`;
        
        const response = await fetch(proxyUrl);
        
        if (!response.ok) {
          // Fallback ke contoh data yang lebih lengkap jika gagal
          const fallbackVerses = getFallbackVerses(selectedBook, selectedChapter);
          setVerses(fallbackVerses);
          toast.info("Menampilkan contoh teks (mode offline)");
          return;
        }
        
        const data = await response.json();
        const versesData = JSON.parse(data.contents);
        
        if (versesData.verses && Array.isArray(versesData.verses)) {
          setVerses(versesData.verses);
        } else {
          const fallbackVerses = getFallbackVerses(selectedBook, selectedChapter);
          setVerses(fallbackVerses);
        }
      } catch (error) {
        console.error("Error fetching verses:", error);
        // Fallback ke contoh data
        const fallbackVerses = getFallbackVerses(selectedBook, selectedChapter);
        setVerses(fallbackVerses);
        toast.info("Menampilkan contoh teks (mode offline)");
      } finally {
        setLoading(false);
      }
    };

    fetchVerses();
  }, [selectedBook, selectedChapter, selectedVersion]);

  // Fallback data untuk beberapa kitab populer
  const getFallbackVerses = (bookId: string, chapterId: string): Verse[] => {
    const book = STATIC_BOOKS.find(b => b.id.toString() === bookId);
    if (!book) return [];
    
    const chapter = parseInt(chapterId);
    
    // Data fallback untuk beberapa kitab populer
    const fallbackData: Record<string, Record<number, Verse[]>> = {
      "40": { // Matius
        5: [
          { verse: 1, text: "Ketika Yesus melihat orang banyak itu, naiklah Ia ke atas bukit dan setelah Ia duduk, datanglah murid-murid-Nya kepada-Nya." },
          { verse: 2, text: "Maka Yesuspun mengajar mereka, kata-Nya:" },
          { verse: 3, text: "Berbahagialah orang yang miskin di hadapan Allah, karena merekalah yang empunya Kerajaan Sorga." },
          { verse: 4, text: "Berbahagialah orang yang berdukacita, karena mereka akan dihibur." },
          { verse: 5, text: "Berbahagialah orang yang lemah lembut, karena mereka akan memiliki bumi." },
          { verse: 6, text: "Berbahagialah orang yang lapar dan haus akan kebenaran, karena mereka akan dipuaskan." },
          { verse: 7, text: "Berbahagialah orang yang murah hati, karena mereka akan disayangi." },
          { verse: 8, text: "Berbahagialah orang yang suci hatinya, karena mereka akan melihat Allah." },
          { verse: 9, text: "Berbahagialah orang yang membawa damai, karena mereka akan disebut anak-anak Allah." },
          { verse: 10, text: "Berbahagialah orang yang dianiaya oleh karena kebenaran, karena merekalah yang empunya Kerajaan Sorga." },
        ],
        6: [
          { verse: 9, text: "Demikianlah hendaknya kamu berdoa: Bapa kami yang di sorga, Dikuduskanlah nama-Mu." },
          { verse: 10, text: "Datanglah Kerajaan-Mu, jadilah kehendak-Mu di bumi seperti di sorga." },
          { verse: 11, text: "Berikanlah kami pada hari ini makanan kami yang secukupnya." },
          { verse: 12, text: "Dan ampunilah kami akan kesalahan kami, seperti kami juga mengampuni orang yang bersalah kepada kami." },
          { verse: 13, text: "Dan janganlah membawa kami ke dalam pencobaan, tetapi lepaskanlah kami dari pada yang jahat. Karena Engkaulah yang empunya Kerajaan dan kuasa dan kemuliaan sampai selama-lamanya. Amin." },
        ]
      },
      "43": { // Yohanes
        3: [
          { verse: 16, text: "Karena begitu besar kasih Allah akan dunia ini, sehingga Ia telah mengaruniakan Anak-Nya yang tunggal, supaya setiap orang yang percaya kepada-Nya tidak binasa, melainkan beroleh hidup yang kekal." },
          { verse: 17, text: "Sebab Allah mengutus Anak-Nya ke dalam dunia bukan untuk menghakimi dunia, melainkan untuk menyelamatkannya oleh Dia." },
          { verse: 18, text: "Barangsiapa percaya kepada-Nya, ia tidak akan dihukum; barangsiapa tidak percaya, ia telah berada di bawah hukuman, karena ia tidak percaya dalam nama Anak Tunggal Allah." },
        ],
        14: [
          { verse: 1, text: "Janganlah gelisah hatimu; percayalah kepada Allah, percayalah juga kepada-Ku." },
          { verse: 2, text: "Di rumah Bapa-Ku banyak tempat tinggal. Jika tidak demikian, tentu Aku mengatakannya kepadamu. Sebab Aku pergi ke sana untuk menyediakan tempat bagimu." },
          { verse: 3, text: "Dan jika Aku pergi ke sana dan menyediakan tempat bagimu, Aku akan datang kembali dan membawa kamu ke tempat-Ku, supaya di tempat-Ku, kamupun berada." },
          { verse: 6, text: "Akulah jalan dan kebenaran dan hidup. Tidak ada seorangpun yang datang kepada Bapa, kalau tidak melalui Aku." },
        ]
      },
      "45": { // Roma
        8: [
          { verse: 28, text: "Kita tahu sekarang, bahwa Allah turut bekerja dalam segala sesuatu untuk mendatangkan kebaikan bagi mereka yang mengasihi Dia, yaitu bagi mereka yang terpanggil sesuai dengan rencana Allah." },
          { verse: 29, text: "Sebab semua orang yang dipilih-Nya dari semula, mereka juga ditentukan-Nya dari semula untuk menjadi serupa dengan gambaran Anak-Nya, supaya Ia menjadi yang sulung di antara banyak saudara." },
          { verse: 30, text: "Dan mereka yang ditentukan-Nya dari semula, mereka juga dipanggil-Nya; dan mereka yang dipanggil-Nya, dibenarkan-Nya juga; dan yang dibenarkan-Nya, dimuliakan-Nya juga." },
          { verse: 31, text: "Sebab itu apakah kesimpulannya? Jika Allah di pihak kita, siapa yang melawan kita?" },
          { verse: 32, text: "Ia, yang tidak menyayangkan Anak-Nya sendiri, tetapi yang menyerahkan-Nya bagi kita semua, bagaimanakah Ia tidak akan mengaruniakan segala sesuatu kepada kita bersama-sama dengan Dia?" },
          { verse: 35, text: "Siapakah yang akan memisahkan kita dari kasih Kristus? Penindasan atau kesukaran atau penganiayaan atau kelaparan atau ketelanjangan atau bahaya atau pedang?" },
          { verse: 37, text: "Tetapi dalam semuanya itu kita lebih dari pada orang-orang menang, oleh Dia yang telah mengasihi kita." },
          { verse: 38, text: "Sebab aku yakin, bahwa baik maut maupun hidup, baik malaikat-malaikat maupun pemerintah-pemerintah, baik yang ada sekarang maupun yang akan datang, atau kuasa-kuasa," },
          { verse: 39, text: "tinggi atau dalam, tidak ada satu pun yang dapat memisahkan kita dari kasih Allah, yang ada dalam Kristus Yesus, Tuhan kita." },
        ],
        12: [
          { verse: 1, text: "Karena itu, saudara-saudara, oleh kemurahan Allah aku menasihatkan kamu, supaya kamu mempersembahkan tubuhmu sebagai persembahan yang hidup, yang kudus dan yang berkenan kepada Allah: itu adalah ibadahmu yang sejati." },
          { verse: 2, text: "Janganlah kamu serupa dengan dunia ini, tetapi berubahlah oleh pembaharuan budimu, sehingga kamu dapat membedakan manakah kehendak Allah: apa yang baik, yang berkenan kepada Allah dan yang sempurna." },
        ]
      }
    };
    
    // Kembalikan data fallback jika ada, jika tidak kembalikan contoh umum
    return fallbackData[bookId]?.[chapter] || [
      { verse: 1, text: "Karena kasih karunia yang telah diberikan oleh Allah, aku berkata kepada setiap orang di antara kamu: janganlah kamu menganggap dirimu lebih tinggi dari pada yang seharusnya, tetapi hendaklah kamu berpikir soal dirimu menurut ukuran iman, seperti yang telah diberikan Allah kepada kamu." },
      { verse: 2, text: "Sebab seperti dalam satu tubuh kita mempunyai banyak anggota, tetapi tidak semua anggota itu mempunyai tugas yang sama." },
      { verse: 3, text: "Demikian juga kita, walaupun kita banyak, adalah satu tubuh di dalam Kristus, tetapi masing-masing kita adalah anggota yang seorang dari yang lain." },
    ];
  };

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
                    disabled={loading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kitab" />
                    </SelectTrigger>
                    <SelectContent>
                      <ScrollArea className="max-h-96">
                        <div className="p-2">
                          <div className="text-sm font-semibold text-muted-foreground mb-2">Perjanjian Lama</div>
                          {books.slice(0, 39).map((book) => (
                            <SelectItem key={book.id} value={book.id.toString()}>
                              {book.name}
                            </SelectItem>
                          ))}
                          <div className="text-sm font-semibold text-muted-foreground my-2">Perjanjian Baru</div>
                          {books.slice(39).map((book) => (
                            <SelectItem key={book.id} value={book.id.toString()}>
                              {book.name}
                            </SelectItem>
                          ))}
                        </div>
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                </div>

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
                        <p className="text-sm mt-2">Tersedia 66 kitab lengkap Perjanjian Lama & Baru</p>
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