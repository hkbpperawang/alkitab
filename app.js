class AlkitabAPI {
    constructor() {
        this.primaryAPI = 'https://alkitab-api-v3.vercel.app';
        this.fallbackAPI = 'https://api-alkitab.herokuapp.com';
        this.cache = new Map();
        this.retryAttempts = 3;
        this.timeout = 15000;
        this.currentAPI = 'primary';
        this.booksData = null;
    }

    // Cache management
    setCache(key, data, ttl = 3600000) {
        const expiry = Date.now() + ttl;
        this.cache.set(key, { data, expiry });
        // Also save to localStorage for persistence
        try {
            localStorage.setItem(`alkitab_${key}`, JSON.stringify({ data, expiry }));
        } catch (e) {
            console.warn('LocalStorage not available');
        }
    }

    getCache(key) {
        // Try memory cache first
        let cached = this.cache.get(key);
        if (!cached) {
            // Try localStorage
            try {
                const stored = localStorage.getItem(`alkitab_${key}`);
                if (stored) {
                    cached = JSON.parse(stored);
                }
            } catch (e) {
                console.warn('Error reading from localStorage');
            }
        }

        if (cached && cached.expiry > Date.now()) {
            return cached.data;
        }
        
        this.cache.delete(key);
        try {
            localStorage.removeItem(`alkitab_${key}`);
        } catch (e) {
            console.warn('Error clearing localStorage');
        }
        return null;
    }

    clearCache() {
        this.cache.clear();
        try {
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith('alkitab_')) {
                    localStorage.removeItem(key);
                }
            });
        } catch (e) {
            console.warn('Error clearing localStorage');
        }
        showToast('Cache berhasil dihapus', 'success');
    }

    // API request with timeout and retry
    async makeRequest(url, retries = this.retryAttempts) {
        for (let attempt = 0; attempt < retries; attempt++) {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.timeout);

            try {
                const response = await fetch(url, {
                    signal: controller.signal,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    mode: 'cors'
                });

                clearTimeout(timeoutId);

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                return data;
            } catch (error) {
                clearTimeout(timeoutId);
                
                if (attempt === retries - 1) {
                    throw error;
                }
                
                // Wait before retry
                await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
            }
        }
    }

    // Get Bible books data (fallback to hardcoded list if APIs fail)
    getBibleBooksData() {
        return [
            // Old Testament
            { id: 'Genesis', name: 'Kejadian', chapters: 50 },
            { id: 'Exodus', name: 'Keluaran', chapters: 40 },
            { id: 'Leviticus', name: 'Imamat', chapters: 27 },
            { id: 'Numbers', name: 'Bilangan', chapters: 36 },
            { id: 'Deuteronomy', name: 'Ulangan', chapters: 34 },
            { id: 'Joshua', name: 'Yosua', chapters: 24 },
            { id: 'Judges', name: 'Hakim-hakim', chapters: 21 },
            { id: 'Ruth', name: 'Rut', chapters: 4 },
            { id: '1Samuel', name: '1 Samuel', chapters: 31 },
            { id: '2Samuel', name: '2 Samuel', chapters: 24 },
            { id: '1Kings', name: '1 Raja-raja', chapters: 22 },
            { id: '2Kings', name: '2 Raja-raja', chapters: 25 },
            { id: '1Chronicles', name: '1 Tawarikh', chapters: 29 },
            { id: '2Chronicles', name: '2 Tawarikh', chapters: 36 },
            { id: 'Ezra', name: 'Ezra', chapters: 10 },
            { id: 'Nehemiah', name: 'Nehemia', chapters: 13 },
            { id: 'Esther', name: 'Ester', chapters: 10 },
            { id: 'Job', name: 'Ayub', chapters: 42 },
            { id: 'Psalms', name: 'Mazmur', chapters: 150 },
            { id: 'Proverbs', name: 'Amsal', chapters: 31 },
            { id: 'Ecclesiastes', name: 'Pengkhotbah', chapters: 12 },
            { id: 'SongofSongs', name: 'Kidung Agung', chapters: 8 },
            { id: 'Isaiah', name: 'Yesaya', chapters: 66 },
            { id: 'Jeremiah', name: 'Yeremia', chapters: 52 },
            { id: 'Lamentations', name: 'Ratapan', chapters: 5 },
            { id: 'Ezekiel', name: 'Yehezkiel', chapters: 48 },
            { id: 'Daniel', name: 'Daniel', chapters: 12 },
            { id: 'Hosea', name: 'Hosea', chapters: 14 },
            { id: 'Joel', name: 'Yoel', chapters: 3 },
            { id: 'Amos', name: 'Amos', chapters: 9 },
            { id: 'Obadiah', name: 'Obaja', chapters: 1 },
            { id: 'Jonah', name: 'Yunus', chapters: 4 },
            { id: 'Micah', name: 'Mikha', chapters: 7 },
            { id: 'Nahum', name: 'Nahum', chapters: 3 },
            { id: 'Habakkuk', name: 'Habakuk', chapters: 3 },
            { id: 'Zephaniah', name: 'Zefanya', chapters: 3 },
            { id: 'Haggai', name: 'Hagai', chapters: 2 },
            { id: 'Zechariah', name: 'Zakharia', chapters: 14 },
            { id: 'Malachi', name: 'Maleakhi', chapters: 4 },
            // New Testament
            { id: 'Matthew', name: 'Matius', chapters: 28 },
            { id: 'Mark', name: 'Markus', chapters: 16 },
            { id: 'Luke', name: 'Lukas', chapters: 24 },
            { id: 'John', name: 'Yohanes', chapters: 21 },
            { id: 'Acts', name: 'Kisah Para Rasul', chapters: 28 },
            { id: 'Romans', name: 'Roma', chapters: 16 },
            { id: '1Corinthians', name: '1 Korintus', chapters: 16 },
            { id: '2Corinthians', name: '2 Korintus', chapters: 13 },
            { id: 'Galatians', name: 'Galatia', chapters: 6 },
            { id: 'Ephesians', name: 'Efesus', chapters: 6 },
            { id: 'Philippians', name: 'Filipi', chapters: 4 },
            { id: 'Colossians', name: 'Kolose', chapters: 4 },
            { id: '1Thessalonians', name: '1 Tesalonika', chapters: 5 },
            { id: '2Thessalonians', name: '2 Tesalonika', chapters: 3 },
            { id: '1Timothy', name: '1 Timotius', chapters: 6 },
            { id: '2Timothy', name: '2 Timotius', chapters: 4 },
            { id: 'Titus', name: 'Titus', chapters: 3 },
            { id: 'Philemon', name: 'Filemon', chapters: 1 },
            { id: 'Hebrews', name: 'Ibrani', chapters: 13 },
            { id: 'James', name: 'Yakobus', chapters: 5 },
            { id: '1Peter', name: '1 Petrus', chapters: 5 },
            { id: '2Peter', name: '2 Petrus', chapters: 3 },
            { id: '1John', name: '1 Yohanes', chapters: 5 },
            { id: '2John', name: '2 Yohanes', chapters: 1 },
            { id: '3John', name: '3 Yohanes', chapters: 1 },
            { id: 'Jude', name: 'Yudas', chapters: 1 },
            { id: 'Revelation', name: 'Wahyu', chapters: 22 }
        ];
    }

    // Fetch books from API
    async fetchBooks() {
        const cacheKey = 'books_list';
        const cached = this.getCache(cacheKey);
        if (cached) return cached;

        let books = null;
        let apiUsed = null;

        // Try primary API first
        try {
            updateApiStatus('primary', 'loading');
            
            // Try different possible endpoints for primary API
            const endpoints = [
                `${this.primaryAPI}/books`,
                `${this.primaryAPI}/api/books`,
                `${this.primaryAPI}/v1/books`
            ];

            for (const endpoint of endpoints) {
                try {
                    const response = await this.makeRequest(endpoint);
                    books = response.data || response.books || response;
                    if (Array.isArray(books) && books.length > 0) {
                        updateApiStatus('primary', 'online');
                        this.currentAPI = 'primary';
                        apiUsed = 'primary';
                        break;
                    }
                } catch (e) {
                    console.warn(`Failed to fetch from ${endpoint}:`, e.message);
                }
            }
        } catch (error) {
            console.warn('Primary API failed:', error.message);
        }

        // Try fallback API if primary failed
        if (!books) {
            try {
                updateApiStatus('primary', 'offline');
                updateApiStatus('fallback', 'loading');
                
                const endpoints = [
                    `${this.fallbackAPI}/v2/passage/list`,
                    `${this.fallbackAPI}/passage/list`,
                    `${this.fallbackAPI}/books`
                ];

                for (const endpoint of endpoints) {
                    try {
                        const response = await this.makeRequest(endpoint);
                        books = response.data || response.books || response;
                        if (Array.isArray(books) && books.length > 0) {
                            updateApiStatus('fallback', 'online');
                            this.currentAPI = 'fallback';
                            apiUsed = 'fallback';
                            break;
                        }
                    } catch (e) {
                        console.warn(`Failed to fetch from ${endpoint}:`, e.message);
                    }
                }
            } catch (error) {
                console.warn('Fallback API failed:', error.message);
            }
        }

        // Use hardcoded data as last resort
        if (!books) {
            updateApiStatus('fallback', 'offline');
            books = this.getBibleBooksData();
            apiUsed = 'local';
            showToast('Menggunakan data lokal karena API tidak tersedia', 'warning');
        }

        if (books && books.length > 0) {
            this.booksData = books;
            this.setCache(cacheKey, books, 86400000); // 24 hours
            
            if (apiUsed === 'primary') {
                showToast('Berhasil terhubung ke API utama', 'success');
            } else if (apiUsed === 'fallback') {
                showToast('Menggunakan API cadangan', 'warning');
            }
            
            return books;
        }

        throw new Error('Tidak dapat memuat daftar kitab dari semua sumber');
    }

    // Fetch chapters for a book
    async fetchChapters(bookId) {
        const cacheKey = `chapters_${bookId}`;
        const cached = this.getCache(cacheKey);
        if (cached) return cached;

        // Find book data to get chapter count
        const book = this.booksData?.find(b => b.id === bookId || b.name === bookId);
        const chapterCount = book?.chapters || this.getChapterCountFallback(bookId);

        // Generate chapters array
        const chapters = Array.from({ length: chapterCount }, (_, i) => ({
            id: i + 1,
            chapter: i + 1,
            name: `Pasal ${i + 1}`
        }));

        this.setCache(cacheKey, chapters, 3600000); // 1 hour
        return chapters;
    }

    // Fetch verses for a chapter
    async fetchVerses(bookId, chapterId) {
        const cacheKey = `verses_${bookId}_${chapterId}`;
        const cached = this.getCache(cacheKey);
        if (cached) return cached;

        let verses = null;

        // Try to get actual verse content from API
        try {
            if (this.currentAPI === 'fallback') {
                const endpoint = `${this.fallbackAPI}/v2/passage/${bookId}/${chapterId}?ver=tb`;
                const response = await this.makeRequest(endpoint);
                
                if (response?.data?.verses) {
                    verses = response.data.verses.map((verse, index) => ({
                        id: index + 1,
                        verse: index + 1,
                        text: verse.content || verse.text || verse
                    }));
                }
            }
        } catch (error) {
            console.warn('Failed to fetch verses from API:', error.message);
        }

        // Fallback to estimated verse count
        if (!verses) {
            const estimatedVerseCount = this.getVerseCountEstimate(bookId, chapterId);
            verses = Array.from({ length: estimatedVerseCount }, (_, i) => ({
                id: i + 1,
                verse: i + 1,
                text: null // Will be loaded when selected
            }));
        }

        this.setCache(cacheKey, verses, 1800000); // 30 minutes
        return verses;
    }

    // Fetch specific verse content
    async fetchVerseContent(bookId, chapterId, verseId) {
        const cacheKey = `verse_${bookId}_${chapterId}_${verseId}`;
        const cached = this.getCache(cacheKey);
        if (cached) return cached;

        let verseContent = null;

        try {
            if (this.currentAPI === 'fallback') {
                const endpoint = `${this.fallbackAPI}/v2/passage/${bookId}/${chapterId}/${verseId}?ver=tb`;
                const response = await this.makeRequest(endpoint);
                verseContent = response?.data;
            } else {
                // Try primary API endpoints
                const endpoints = [
                    `${this.primaryAPI}/books/${bookId}/chapters/${chapterId}/verses/${verseId}`,
                    `${this.primaryAPI}/verse/${bookId}/${chapterId}/${verseId}`
                ];

                for (const endpoint of endpoints) {
                    try {
                        const response = await this.makeRequest(endpoint);
                        verseContent = response?.data || response;
                        if (verseContent) break;
                    } catch (e) {
                        console.warn(`Failed to fetch from ${endpoint}`);
                    }
                }
            }
        } catch (error) {
            console.warn('Failed to fetch verse content:', error.message);
        }

        // Fallback content if API fails
        if (!verseContent) {
            verseContent = {
                text: `Ayat ${verseId} dari ${bookId} pasal ${chapterId}. Konten tidak tersedia dari API, silakan kunjungi alkitab.hkbpperawang.org untuk membaca ayat lengkap.`,
                content: `Ayat ${verseId} dari ${bookId} pasal ${chapterId}. Konten tidak tersedia dari API.`,
                verse: verseId,
                chapter: chapterId,
                book: bookId
            };
            showToast('Konten ayat tidak tersedia dari API, menampilkan placeholder', 'warning');
        }

        this.setCache(cacheKey, verseContent, 1800000); // 30 minutes
        return verseContent;
    }

    // Get chapter count fallback
    getChapterCountFallback(bookId) {
        const chapterCounts = {
            'Genesis': 50, 'Exodus': 40, 'Leviticus': 27, 'Numbers': 36, 'Deuteronomy': 34,
            'Joshua': 24, 'Judges': 21, 'Ruth': 4, '1Samuel': 31, '2Samuel': 24,
            'Matthew': 28, 'Mark': 16, 'Luke': 24, 'John': 21, 'Acts': 28,
            'Romans': 16, 'Revelation': 22
        };
        return chapterCounts[bookId] || 25; // Default estimate
    }

    // Get estimated verse count
    getVerseCountEstimate(bookId, chapterId) {
        // Simple estimation - most chapters have 20-40 verses
        const chapter = parseInt(chapterId);
        
        if (bookId === 'Psalms') return 15; // Psalms vary widely
        if (bookId.includes('John') && chapter === 1) return 51;
        if (bookId === 'Matthew' && chapter === 1) return 25;
        
        return Math.floor(Math.random() * 20) + 15; // 15-35 verses estimate
    }
}

// Rest of the code remains the same...
// Global variables
let api = new AlkitabAPI();
let currentSelection = {
    book: null,
    chapter: null,
    verse: null,
    bookName: '',
    totalVerses: 0
};

// DOM elements
const elements = {
    globalLoading: document.getElementById('globalLoading'),
    errorState: document.getElementById('errorState'),
    mainContent: document.getElementById('mainContent'),
    errorMessage: document.getElementById('errorMessage'),
    retryBtn: document.getElementById('retryBtn'),
    bookSelect: document.getElementById('bookSelect'),
    chapterSelect: document.getElementById('chapterSelect'),
    verseSelect: document.getElementById('verseSelect'),
    verseDisplay: document.getElementById('verseDisplay'),
    verseLoadingState: document.getElementById('verseLoadingState'),
    verseReference: document.getElementById('verseReference'),
    verseContent: document.getElementById('verseContent'),
    copyBtn: document.getElementById('copyBtn'),
    shareBtn: document.getElementById('shareBtn'),
    prevVerseBtn: document.getElementById('prevVerseBtn'),
    nextVerseBtn: document.getElementById('nextVerseBtn'),
    versePosition: document.getElementById('versePosition'),
    themeToggle: document.getElementById('themeToggle'),
    clearCache: document.getElementById('clearCache'),
    primaryApiStatus: document.getElementById('primaryApiStatus'),
    fallbackApiStatus: document.getElementById('fallbackApiStatus'),
    themeIcon: document.getElementById('themeIcon')
};

// Initialize app
document.addEventListener('DOMContentLoaded', async () => {
    setupEventListeners();
    loadTheme();
    await initializeApp();
});

// Setup event listeners
function setupEventListeners() {
    elements.retryBtn.addEventListener('click', initializeApp);
    elements.bookSelect.addEventListener('change', handleBookChange);
    elements.chapterSelect.addEventListener('change', handleChapterChange);
    elements.verseSelect.addEventListener('change', handleVerseChange);
    elements.copyBtn.addEventListener('click', copyVerse);
    elements.shareBtn.addEventListener('click', shareVerse);
    elements.prevVerseBtn.addEventListener('click', navigatePreviousVerse);
    elements.nextVerseBtn.addEventListener('click', navigateNextVerse);
    elements.themeToggle.addEventListener('click', toggleTheme);
    elements.clearCache.addEventListener('click', () => api.clearCache());
}

// Initialize application
async function initializeApp() {
    try {
        showGlobalLoading(true);
        hideError();
        
        const books = await api.fetchBooks();
        populateBookSelect(books);
        
        showMainContent();
    } catch (error) {
        showError(error.message);
        console.error('Initialization error:', error);
    } finally {
        showGlobalLoading(false);
    }
}

// Populate book dropdown
function populateBookSelect(books) {
    elements.bookSelect.innerHTML = '<option value="">Pilih kitab...</option>';
    
    books.forEach(book => {
        const option = document.createElement('option');
        option.value = book.id || book.name;
        option.textContent = book.name || book.id;
        elements.bookSelect.appendChild(option);
    });
    
    elements.bookSelect.disabled = false;
}

// Handle book selection
async function handleBookChange() {
    const bookId = elements.bookSelect.value;
    if (!bookId) return;

    currentSelection.book = bookId;
    currentSelection.bookName = elements.bookSelect.selectedOptions[0].textContent;
    
    // Reset dependent dropdowns
    elements.chapterSelect.innerHTML = '<option value="">Memuat pasal...</option>';
    elements.chapterSelect.disabled = true;
    elements.verseSelect.innerHTML = '<option value="">Pilih pasal terlebih dahulu</option>';
    elements.verseSelect.disabled = true;
    hideVerseDisplay();

    try {
        showLoading('chapter', true);
        const chapters = await api.fetchChapters(bookId);
        populateChapterSelect(chapters);
    } catch (error) {
        showToast(`Gagal memuat pasal: ${error.message}`, 'error');
        elements.chapterSelect.innerHTML = '<option value="">Error memuat pasal</option>';
    } finally {
        showLoading('chapter', false);
    }
}

// Populate chapter dropdown
function populateChapterSelect(chapters) {
    elements.chapterSelect.innerHTML = '<option value="">Pilih pasal...</option>';
    
    chapters.forEach(chapter => {
        const option = document.createElement('option');
        option.value = chapter.id || chapter.chapter;
        option.textContent = `Pasal ${chapter.chapter || chapter.id}`;
        elements.chapterSelect.appendChild(option);
    });
    
    elements.chapterSelect.disabled = false;
}

// Handle chapter selection
async function handleChapterChange() {
    const chapterId = elements.chapterSelect.value;
    if (!chapterId) return;

    currentSelection.chapter = chapterId;
    
    // Reset verse dropdown
    elements.verseSelect.innerHTML = '<option value="">Memuat ayat...</option>';
    elements.verseSelect.disabled = true;
    hideVerseDisplay();

    try {
        showLoading('verse', true);
        const verses = await api.fetchVerses(currentSelection.book, chapterId);
        populateVerseSelect(verses);
        currentSelection.totalVerses = verses.length;
    } catch (error) {
        showToast(`Gagal memuat ayat: ${error.message}`, 'error');
        elements.verseSelect.innerHTML = '<option value="">Error memuat ayat</option>';
    } finally {
        showLoading('verse', false);
    }
}

// Populate verse dropdown
function populateVerseSelect(verses) {
    elements.verseSelect.innerHTML = '<option value="">Pilih ayat...</option>';
    
    verses.forEach(verse => {
        const option = document.createElement('option');
        option.value = verse.id || verse.verse;
        option.textContent = `Ayat ${verse.verse || verse.id}`;
        elements.verseSelect.appendChild(option);
    });
    
    elements.verseSelect.disabled = false;
}

// Handle verse selection
async function handleVerseChange() {
    const verseId = elements.verseSelect.value;
    if (!verseId) return;

    currentSelection.verse = verseId;
    await loadVerseContent(currentSelection.book, currentSelection.chapter, verseId);
}

// Load and display verse content
async function loadVerseContent(bookId, chapterId, verseId) {
    try {
        showVerseLoading(true);
        
        const verseData = await api.fetchVerseContent(bookId, chapterId, verseId);
        displayVerse(verseData, verseId);
        updateNavigationButtons();
        
    } catch (error) {
        showToast(`Gagal memuat ayat: ${error.message}`, 'error');
    } finally {
        showVerseLoading(false);
    }
}

// Display verse content
function displayVerse(verseData, verseId) {
    const reference = `${currentSelection.bookName} ${currentSelection.chapter}:${verseId}`;
    elements.verseReference.textContent = reference;
    
    const content = verseData.text || verseData.content || verseData.verse || 'Konten tidak tersedia';
    elements.verseContent.textContent = content;
    
    elements.versePosition.textContent = `Ayat ${verseId} dari ${currentSelection.totalVerses}`;
    
    showVerseDisplay();
}

// Navigation functions
function updateNavigationButtons() {
    const currentVerseNum = parseInt(currentSelection.verse);
    elements.prevVerseBtn.disabled = currentVerseNum <= 1;
    elements.nextVerseBtn.disabled = currentVerseNum >= currentSelection.totalVerses;
}

async function navigatePreviousVerse() {
    const prevVerse = parseInt(currentSelection.verse) - 1;
    if (prevVerse >= 1) {
        elements.verseSelect.value = prevVerse.toString();
        await handleVerseChange();
    }
}

async function navigateNextVerse() {
    const nextVerse = parseInt(currentSelection.verse) + 1;
    if (nextVerse <= currentSelection.totalVerses) {
        elements.verseSelect.value = nextVerse.toString();
        await handleVerseChange();
    }
}

// Copy and share functions
async function copyVerse() {
    const text = `${elements.verseReference.textContent}\n"${elements.verseContent.textContent}"`;
    
    try {
        await navigator.clipboard.writeText(text);
        showToast('Ayat berhasil disalin', 'success');
        elements.copyBtn.classList.add('btn-animate');
        setTimeout(() => elements.copyBtn.classList.remove('btn-animate'), 150);
    } catch (error) {
        showToast('Gagal menyalin ayat', 'error');
    }
}

async function shareVerse() {
    const text = `${elements.verseReference.textContent}\n"${elements.verseContent.textContent}"`;
    
    if (navigator.share) {
        try {
            await navigator.share({
                title: elements.verseReference.textContent,
                text: text
            });
        } catch (error) {
            if (error.name !== 'AbortError') {
                fallbackShare(text);
            }
        }
    } else {
        fallbackShare(text);
    }
}

function fallbackShare(text) {
    copyVerse();
    showToast('Ayat disalin untuk dibagikan', 'success');
}

// Theme management
function loadTheme() {
    const savedTheme = localStorage.getItem('alkitab_theme') || 'light';
    applyTheme(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-color-scheme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    localStorage.setItem('alkitab_theme', newTheme);
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-color-scheme', theme);
    elements.themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
    elements.themeToggle.innerHTML = `<span>${elements.themeIcon.textContent}</span> ${theme === 'light' ? 'Mode Gelap' : 'Mode Terang'}`;
}

// UI state management
function showGlobalLoading(show) {
    elements.globalLoading.classList.toggle('hidden', !show);
}

function showMainContent() {
    elements.mainContent.classList.remove('hidden');
}

function showError(message) {
    elements.errorMessage.textContent = message;
    elements.errorState.classList.remove('hidden');
}

function hideError() {
    elements.errorState.classList.add('hidden');
}

function showLoading(type, show) {
    const loadingElement = document.getElementById(`${type}Loading`);
    if (loadingElement) {
        loadingElement.classList.toggle('hidden', !show);
    }
}

function showVerseLoading(show) {
    elements.verseLoadingState.classList.toggle('hidden', !show);
    elements.verseDisplay.classList.toggle('hidden', show);
}

function showVerseDisplay() {
    elements.verseDisplay.classList.remove('hidden', 'fade-out');
    elements.verseDisplay.classList.add('fade-in');
}

function hideVerseDisplay() {
    elements.verseDisplay.classList.add('hidden');
}

// API status updates
function updateApiStatus(api, status) {
    const statusElement = api === 'primary' ? elements.primaryApiStatus : elements.fallbackApiStatus;
    statusElement.className = `status-indicator ${status}`;
}

// Toast notifications
function showToast(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    
    toast.innerHTML = `
        <span class="toast-icon">${icons[type]}</span>
        <div class="toast-content">
            <div class="toast-message">${message}</div>
        </div>
    `;
    
    const container = document.getElementById('toastContainer');
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, duration);
}