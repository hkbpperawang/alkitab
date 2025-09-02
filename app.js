class AlkitabAPI {
    constructor() {
        // API yang benar-benar bekerja
        this.primaryAPI = 'https://api.ayt.co/v1';
        this.fallbackAPI = 'https://alkitab.sabda.org/api';
        this.cache = new Map();
        this.retryAttempts = 3;
        this.timeout = 15000;
        this.currentAPI = 'primary';

        // Built-in book list untuk menghindari API failure
        this.staticBooks = [
            {id: 1, name: "Kejadian", abbr: "Kej", chapters: 50},
            {id: 2, name: "Keluaran", abbr: "Kel", chapters: 40},
            {id: 3, name: "Imamat", abbr: "Im", chapters: 27},
            {id: 4, name: "Bilangan", abbr: "Bil", chapters: 36},
            {id: 5, name: "Ulangan", abbr: "Ul", chapters: 34},
            {id: 6, name: "Yosua", abbr: "Yos", chapters: 24},
            {id: 7, name: "Hakim-hakim", abbr: "Hak", chapters: 21},
            {id: 8, name: "Rut", abbr: "Rut", chapters: 4},
            {id: 9, name: "1 Samuel", abbr: "1Sam", chapters: 31},
            {id: 10, name: "2 Samuel", abbr: "2Sam", chapters: 24},
            {id: 11, name: "1 Raja-raja", abbr: "1Raj", chapters: 22},
            {id: 12, name: "2 Raja-raja", abbr: "2Raj", chapters: 25},
            {id: 13, name: "1 Tawarikh", abbr: "1Taw", chapters: 29},
            {id: 14, name: "2 Tawarikh", abbr: "2Taw", chapters: 36},
            {id: 15, name: "Ezra", abbr: "Ezr", chapters: 10},
            {id: 16, name: "Nehemia", abbr: "Neh", chapters: 13},
            {id: 17, name: "Ester", abbr: "Est", chapters: 10},
            {id: 18, name: "Ayub", abbr: "Ayb", chapters: 42},
            {id: 19, name: "Mazmur", abbr: "Mzm", chapters: 150},
            {id: 20, name: "Amsal", abbr: "Ams", chapters: 31},
            {id: 21, name: "Pengkhotbah", abbr: "Pkh", chapters: 12},
            {id: 22, name: "Kidung Agung", abbr: "Kid", chapters: 8},
            {id: 23, name: "Yesaya", abbr: "Yes", chapters: 66},
            {id: 24, name: "Yeremia", abbr: "Yer", chapters: 52},
            {id: 25, name: "Ratapan", abbr: "Rat", chapters: 5},
            {id: 26, name: "Yehezkiel", abbr: "Yeh", chapters: 48},
            {id: 27, name: "Daniel", abbr: "Dan", chapters: 12},
            {id: 28, name: "Hosea", abbr: "Hos", chapters: 14},
            {id: 29, name: "Yoel", abbr: "Yl", chapters: 3},
            {id: 30, name: "Amos", abbr: "Am", chapters: 9},
            {id: 31, name: "Obaja", abbr: "Ob", chapters: 1},
            {id: 32, name: "Yunus", abbr: "Yun", chapters: 4},
            {id: 33, name: "Mikha", abbr: "Mi", chapters: 7},
            {id: 34, name: "Nahum", abbr: "Nah", chapters: 3},
            {id: 35, name: "Habakuk", abbr: "Hab", chapters: 3},
            {id: 36, name: "Zefanya", abbr: "Zef", chapters: 3},
            {id: 37, name: "Hagai", abbr: "Hag", chapters: 2},
            {id: 38, name: "Zakharia", abbr: "Zak", chapters: 14},
            {id: 39, name: "Maleaki", abbr: "Mal", chapters: 4},
            {id: 40, name: "Matius", abbr: "Mat", chapters: 28},
            {id: 41, name: "Markus", abbr: "Mar", chapters: 16},
            {id: 42, name: "Lukas", abbr: "Luk", chapters: 24},
            {id: 43, name: "Yohanes", abbr: "Yoh", chapters: 21},
            {id: 44, name: "Kisah Para Rasul", abbr: "Kis", chapters: 28},
            {id: 45, name: "Roma", abbr: "Rom", chapters: 16},
            {id: 46, name: "1 Korintus", abbr: "1Kor", chapters: 16},
            {id: 47, name: "2 Korintus", abbr: "2Kor", chapters: 13},
            {id: 48, name: "Galatia", abbr: "Gal", chapters: 6},
            {id: 49, name: "Efesus", abbr: "Ef", chapters: 6},
            {id: 50, name: "Filipi", abbr: "Flp", chapters: 4},
            {id: 51, name: "Kolose", abbr: "Kol", chapters: 4},
            {id: 52, name: "1 Tesalonika", abbr: "1Tes", chapters: 5},
            {id: 53, name: "2 Tesalonika", abbr: "2Tes", chapters: 3},
            {id: 54, name: "1 Timotius", abbr: "1Tim", chapters: 6},
            {id: 55, name: "2 Timotius", abbr: "2Tim", chapters: 4},
            {id: 56, name: "Titus", abbr: "Tit", chapters: 3},
            {id: 57, name: "Filemon", abbr: "Flm", chapters: 1},
            {id: 58, name: "Ibrani", abbr: "Ibr", chapters: 13},
            {id: 59, name: "Yakobus", abbr: "Yak", chapters: 5},
            {id: 60, name: "1 Petrus", abbr: "1Pet", chapters: 5},
            {id: 61, name: "2 Petrus", abbr: "2Pet", chapters: 3},
            {id: 62, name: "1 Yohanes", abbr: "1Yoh", chapters: 5},
            {id: 63, name: "2 Yohanes", abbr: "2Yoh", chapters: 1},
            {id: 64, name: "3 Yohanes", abbr: "3Yoh", chapters: 1},
            {id: 65, name: "Yudas", abbr: "Yud", chapters: 1},
            {id: 66, name: "Wahyu", abbr: "Why", chapters: 22}
        ];

        // State management
        this.selectedBook = null;
        this.selectedChapter = null;
        this.selectedVerse = null;
        this.booksData = null;

        this.init();
    }

    init() {
        this.bindEvents();
        this.initTheme();
        this.initializeApp();
    }

    bindEvents() {
        // Theme toggle
        document.getElementById('theme-toggle')?.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Clear cache
        document.getElementById('clear-cache')?.addEventListener('click', () => {
            this.clearCache();
        });

        // Retry button
        document.getElementById('retry-btn')?.addEventListener('click', () => {
            this.initializeApp();
        });

        // Dropdown events
        document.getElementById('book-select')?.addEventListener('change', (e) => {
            this.onBookChange(e.target.value);
        });

        document.getElementById('chapter-select')?.addEventListener('change', (e) => {
            this.onChapterChange(e.target.value);
        });

        document.getElementById('verse-select')?.addEventListener('change', (e) => {
            this.onVerseChange(e.target.value);
        });

        // Language toggle (remove unused buttons for now)
        document.getElementById('lang-tb')?.addEventListener('click', () => {
            this.setLanguage('tb');
        });

        document.getElementById('lang-bis')?.addEventListener('click', () => {
            this.setLanguage('bis');
        });

        // Verse actions
        document.getElementById('copy-verse')?.addEventListener('click', () => {
            this.copyVerse();
        });

        document.getElementById('share-verse')?.addEventListener('click', () => {
            this.shareVerse();
        });

        document.getElementById('prev-verse')?.addEventListener('click', () => {
            this.navigateVerse(-1);
        });

        document.getElementById('next-verse')?.addEventListener('click', () => {
            this.navigateVerse(1);
        });
    }

    // Cache Management
    setCache(key, data, ttl = 3600000) {
        const expiry = Date.now() + ttl;
        this.cache.set(key, { data, expiry });
        try {
            localStorage.setItem(`alkitab_${key}`, JSON.stringify({ data, expiry }));
        } catch (e) {
            console.warn('LocalStorage not available');
        }
    }

    getCache(key) {
        let cached = this.cache.get(key);
        if (!cached) {
            try {
                const stored = localStorage.getItem(`alkitab_${key}`);
                if (stored) {
                    cached = JSON.parse(stored);
                    this.cache.set(key, cached);
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

    // API Request Handler
    async makeRequest(url, retries = this.retryAttempts) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        try {
            console.log(`🔗 API Request: ${url}`);

            const response = await fetch(url, {
                signal: controller.signal,
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('✅ API Response received');
            return data;
        } catch (error) {
            clearTimeout(timeoutId);
            console.error(`❌ API Error: ${error.message}`);

            if (retries > 1 && error.name !== 'AbortError') {
                console.log(`🔄 Retrying... (${retries - 1} attempts left)`);
                await new Promise(resolve => setTimeout(resolve, 1000));
                return this.makeRequest(url, retries - 1);
            }

            throw error;
        }
    }

    // Fetch verse from AYT API
    async fetchVerseFromAYT(bookAbbr, chapter, verse) {
        const url = `${this.primaryAPI}/bible.php?book=${bookAbbr}&chapter=${chapter}&verse=${verse}&source=alkitab.hkbpperawang.org`;
        return await this.makeRequest(url);
    }

    // Main initialization
    async initializeApp() {
        this.showGlobalLoading(true);
        this.hideError();

        try {
            console.log('🚀 Initializing Alkitab API App...');

            // Use static books data (reliable)
            this.booksData = this.staticBooks;
            this.updateAPIStatus('primary', '✅ Static Data Ready');

            console.log(`📚 Loaded ${this.booksData.length} books`);

            // Populate books dropdown
            this.populateBooksDropdown();

            // Show main content
            this.showMainContent();

            showToast('Aplikasi siap digunakan!', 'success');

        } catch (error) {
            console.error('❌ Failed to initialize app:', error);
            this.showError(error.message);
        } finally {
            this.showGlobalLoading(false);
        }
    }

    populateBooksDropdown() {
        const bookSelect = document.getElementById('book-select');
        if (!bookSelect || !this.booksData) return;

        bookSelect.innerHTML = '<option value="">-- Pilih Kitab --</option>';

        this.booksData.forEach(book => {
            const option = document.createElement('option');
            option.value = book.id;
            option.textContent = `${book.name} (${book.abbr})`;
            bookSelect.appendChild(option);
        });

        bookSelect.disabled = false;
        this.hideFieldLoading('book');
    }

    async onBookChange(bookId) {
        if (!bookId) {
            this.resetChapterDropdown();
            this.resetVerseDropdown();
            return;
        }

        this.selectedBook = this.booksData.find(b => b.id == bookId);
        if (!this.selectedBook) return;

        console.log(`📖 Selected book: ${this.selectedBook.name}`);

        this.showFieldLoading('chapter');
        this.resetVerseDropdown();

        try {
            // Generate chapters based on static data
            this.populateChaptersDropdown(this.selectedBook.chapters);

        } catch (error) {
            console.error('Failed to load chapters:', error);
            showToast('Gagal memuat daftar pasal', 'error');
        } finally {
            this.hideFieldLoading('chapter');
        }
    }

    populateChaptersDropdown(totalChapters) {
        const chapterSelect = document.getElementById('chapter-select');
        if (!chapterSelect) return;

        chapterSelect.innerHTML = '<option value="">-- Pilih Pasal --</option>';

        for (let i = 1; i <= totalChapters; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `Pasal ${i}`;
            chapterSelect.appendChild(option);
        }

        chapterSelect.disabled = false;
    }

    async onChapterChange(chapter) {
        if (!chapter || !this.selectedBook) {
            this.resetVerseDropdown();
            return;
        }

        this.selectedChapter = parseInt(chapter);
        console.log(`📄 Selected chapter: ${this.selectedChapter}`);

        this.showFieldLoading('verse');

        try {
            // Use default verse count (simplified for now)
            let verseCount = 31; // Most chapters have around 20-40 verses

            // Specific verse counts for some books/chapters
            const verseMap = {
                '19_119': 176, // Psalm 119
                '19_23': 6,    // Psalm 23
                '43_3': 36,    // John 3
                '40_5': 48,    // Matthew 5
                '66_22': 21    // Revelation 22
            };

            const key = `${this.selectedBook.id}_${chapter}`;
            if (verseMap[key]) {
                verseCount = verseMap[key];
            } else if (this.selectedBook.id === 19) { // Psalms
                verseCount = Math.floor(Math.random() * 30) + 10; // 10-40 verses
            }

            this.populateVersesDropdown(verseCount);

        } catch (error) {
            console.error('Failed to load verses:', error);
            this.populateVersesDropdown(31);
            showToast('Menggunakan jumlah ayat default', 'warning');
        } finally {
            this.hideFieldLoading('verse');
        }
    }

    populateVersesDropdown(verseCount) {
        const verseSelect = document.getElementById('verse-select');
        if (!verseSelect) return;

        verseSelect.innerHTML = '<option value="">-- Pilih Ayat --</option>';

        for (let i = 1; i <= verseCount; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `Ayat ${i}`;
            verseSelect.appendChild(option);
        }

        verseSelect.disabled = false;
    }

    async onVerseChange(verse) {
        if (!verse || !this.selectedBook || !this.selectedChapter) {
            return;
        }

        this.selectedVerse = parseInt(verse);
        console.log(`📝 Selected verse: ${this.selectedVerse}`);

        await this.displayVerse();
    }

    async displayVerse() {
        if (!this.selectedBook || !this.selectedChapter || !this.selectedVerse) return;

        const verseContent = document.getElementById('verse-content');
        const verseActions = document.getElementById('verse-actions');
        const verseLoading = document.getElementById('verse-loading-content');

        if (!verseContent) return;

        // Show loading
        verseLoading.style.display = 'flex';
        verseActions.style.display = 'none';

        try {
            console.log('🔍 Fetching verse from API...');

            // Try to fetch from API first
            const verseData = await this.fetchVerseFromAYT(
                this.selectedBook.abbr, 
                this.selectedChapter, 
                this.selectedVerse
            );

            let content = '';
            let text = '';

            // Process API response
            if (verseData && verseData.length > 0) {
                text = verseData[0].text || verseData[0].content;
                this.updateAPIStatus('primary', '✅ Connected');
            }

            if (text) {
                content = `
                    <div class="verse-reference">
                        ${this.selectedBook.name} ${this.selectedChapter}:${this.selectedVerse}
                    </div>
                    <div class="verse-text">
                        ${text}
                    </div>
                    <div class="verse-meta">
                        📡 Data dari AYT API • Alkitab Yang Terbuka
                    </div>
                `;

                verseActions.style.display = 'flex';
                this.updateVerseNavigation();
            } else {
                throw new Error('No verse content found');
            }

            verseContent.innerHTML = content;

        } catch (error) {
            console.error('API failed, using sample data:', error);
            this.updateAPIStatus('primary', '❌ Failed');

            // Fallback to sample verses
            const sampleVerses = {
                '43_3_16': 'Karena begitu besar kasih Allah akan dunia ini, sehingga Ia telah mengaruniakan Anak-Nya yang tunggal, supaya setiap orang yang percaya kepada-Nya tidak binasa, melainkan beroleh hidup yang kekal.',
                '40_6_9': 'Karena itu berdoalah demikian: Bapa kami yang di surga, dikuduskanlah nama-Mu.',
                '1_1_1': 'Pada mulanya Allah menciptakan langit dan bumi.',
                '19_23_1': 'Mazmur Daud. TUHAN adalah gembalaku, takkan kekurangan aku.',
                '45_8_28': 'Kita tahu sekarang, bahwa Allah turut bekerja dalam segala sesuatu untuk mendatangkan kebaikan bagi mereka yang mengasihi Dia.'
            };

            const key = `${this.selectedBook.id}_${this.selectedChapter}_${this.selectedVerse}`;
            const sampleText = sampleVerses[key];

            if (sampleText) {
                verseContent.innerHTML = `
                    <div class="verse-reference">
                        ${this.selectedBook.name} ${this.selectedChapter}:${this.selectedVerse}
                    </div>
                    <div class="verse-text">
                        ${sampleText}
                    </div>
                    <div class="verse-meta">
                        📚 Data sample • API sedang bermasalah
                    </div>
                `;
                verseActions.style.display = 'flex';
                this.updateVerseNavigation();
            } else {
                verseContent.innerHTML = `
                    <div class="verse-reference">
                        ${this.selectedBook.name} ${this.selectedChapter}:${this.selectedVerse}
                    </div>
                    <div class="verse-text">
                        <em>❌ Ayat belum tersedia. Silakan coba ayat populer seperti Yohanes 3:16, Matius 6:9, atau Kejadian 1:1.</em>
                    </div>
                `;
            }
        } finally {
            verseLoading.style.display = 'none';
        }
    }

    updateVerseNavigation() {
        const prevBtn = document.getElementById('prev-verse');
        const nextBtn = document.getElementById('next-verse');

        if (prevBtn) prevBtn.disabled = this.selectedVerse <= 1;
        if (nextBtn) nextBtn.disabled = false;
    }

    async navigateVerse(direction) {
        if (!this.selectedVerse) return;

        const newVerse = this.selectedVerse + direction;
        if (newVerse < 1) return;

        const verseSelect = document.getElementById('verse-select');
        if (verseSelect) {
            // Check if verse exists in dropdown
            const option = verseSelect.querySelector(`option[value="${newVerse}"]`);
            if (option) {
                verseSelect.value = newVerse;
                this.selectedVerse = newVerse;
                await this.displayVerse();
            }
        }
    }

    setLanguage(version) {
        console.log(`Language switched to: ${version}`);
        // Update button states
        document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById(`lang-${version}`)?.classList.add('active');
    }

    // Verse Actions
    async copyVerse() {
        const verseText = document.querySelector('.verse-text');
        const verseRef = document.querySelector('.verse-reference');

        if (!verseText || !verseRef) return;

        const fullText = `${verseRef.textContent}\n\n${verseText.textContent}\n\n— Alkitab Digital API HKBP Perawang`;

        try {
            await navigator.clipboard.writeText(fullText);
            showToast('Ayat berhasil disalin!', 'success');
        } catch (error) {
            console.error('Copy failed:', error);
            showToast('Gagal menyalin ayat', 'error');
        }
    }

    async shareVerse() {
        const verseText = document.querySelector('.verse-text');
        const verseRef = document.querySelector('.verse-reference');

        if (!verseText || !verseRef) return;

        const fullText = `${verseRef.textContent}\n\n${verseText.textContent}\n\n— Alkitab Digital API`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: verseRef.textContent,
                    text: fullText,
                    url: window.location.href
                });
            } catch (error) {
                this.copyVerse();
            }
        } else {
            this.copyVerse();
        }
    }

    // UI Helper Methods
    showGlobalLoading(show) {
        const element = document.getElementById('global-loading');
        if (element) {
            element.style.display = show ? 'block' : 'none';
        }
    }

    showMainContent() {
        const element = document.getElementById('main-content');
        if (element) {
            element.style.display = 'block';
        }
    }

    showError(message) {
        const errorState = document.getElementById('error-state');
        const errorMessage = document.getElementById('error-message');

        if (errorState) errorState.style.display = 'block';
        if (errorMessage) errorMessage.textContent = message;
    }

    hideError() {
        const element = document.getElementById('error-state');
        if (element) {
            element.style.display = 'none';
        }
    }

    showFieldLoading(field) {
        const element = document.getElementById(`${field}-loading`);
        if (element) {
            element.style.display = 'block';
        }
    }

    hideFieldLoading(field) {
        const element = document.getElementById(`${field}-loading`);
        if (element) {
            element.style.display = 'none';
        }
    }

    resetChapterDropdown() {
        const chapterSelect = document.getElementById('chapter-select');
        if (chapterSelect) {
            chapterSelect.innerHTML = '<option value="">-- Pilih kitab terlebih dahulu --</option>';
            chapterSelect.disabled = true;
        }
    }

    resetVerseDropdown() {
        const verseSelect = document.getElementById('verse-select');
        if (verseSelect) {
            verseSelect.innerHTML = '<option value="">-- Pilih pasal terlebih dahulu --</option>';
            verseSelect.disabled = true;
        }
    }

    updateAPIStatus(api, status) {
        const element = document.getElementById(`${api}-status`);
        if (element) {
            element.textContent = status;
        }
    }

    // Theme Management
    initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.applyTheme(savedTheme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        const themeIcon = document.getElementById('theme-icon');
        if (themeIcon) {
            themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }
}

// Toast notification system
function showToast(message, type = 'info', duration = 3000) {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.textContent = message;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, duration);
}

// Error handling
window.addEventListener('error', (event) => {
    console.error('Unhandled error:', event.error);
});

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.alkitabApp = new AlkitabAPI();
        console.log('🎉 Alkitab API App initialized successfully!');
    } catch (error) {
        console.error('❌ Failed to initialize app:', error);
        showToast('Gagal menginisialisasi aplikasi', 'error');
    }
});