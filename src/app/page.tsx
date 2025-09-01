// src/app/page.tsx - Update dengan multiple proxies
const fetchVerses = async () => {
  if (!selectedBook || !selectedChapter) return;

  try {
    setLoading(true);
    
    const targetUrl = `https://alkitab-api-v3.vercel.app/${selectedVersion}/${selectedBook}/${selectedChapter}`;
    
    // List of CORS proxies to try
    const proxies = [
      // Method 1: allorigins.win
      () => fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`)
        .then(r => r.json())
        .then(data => JSON.parse(data.contents)),
      
      // Method 2: corsproxy.io  
      () => fetch(`https://corsproxy.io/?${encodeURIComponent(targetUrl)}`)
        .then(r => r.json()),
      
      // Method 3: thingproxy
      () => fetch(`https://thingproxy.freeboard.io/fetch/${encodeURIComponent(targetUrl)}`)
        .then(r => r.json()),
      
      // Method 4: Try direct fetch (mungkin works di beberapa browser)
      () => fetch(targetUrl)
        .then(r => r.json()),
    ];
    
    let result = null;
    let lastError = null;
    
    // Try each proxy until one works
    for (const proxyCall of proxies) {
      try {
        result = await proxyCall();
        if (result.verses && Array.isArray(result.verses)) {
          setVerses(result.verses);
          toast.success("Data ayat berhasil dimuat");
          return;
        }
      } catch (error) {
        lastError = error;
        console.log("Proxy failed:", error);
      }
    }
    
    // If all proxies failed, use fallback
    throw lastError || new Error("All proxies failed");
    
  } catch (error) {
    console.error("Error fetching verses:", error);
    const fallbackVerses = getFallbackVerses(selectedBook, selectedChapter);
    setVerses(fallbackVerses);
    toast.warning("Gagal memuat data online, menampilkan data offline");
  } finally {
    setLoading(false);
  }
};