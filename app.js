// Alkitab Digital Application
class AlkitabApp {
    constructor() {
        this.API_BASE = 'https://alkitab-api-v3.vercel.app';
        this.currentTheme = this.getStoredTheme();
        this.currentLanguage = 'tb';
        this.selectedBook = null;
        this.selectedChapter = null;
        this.selectedVerse = null;
        
        // Fallback data when API is not available
        this.fallbackData = {
            books: [
                { id: 1, abbreviation: "Kej", name: "Kejadian", batak_name: "Hagenon", total_chapters: 50 },
                { id: 2, abbreviation: "Kel", name: "Keluaran", batak_name: "Keluar", total_chapters: 40 },
                { id: 40, abbreviation: "Mat", name: "Matius", batak_name: "Matius", total_chapters: 28 },
                { id: 43, abbreviation: "Yoh", name: "Yohanes", batak_name: "Johannes", total_chapters: 21 },
                { id: 66, abbreviation: "Why", name: "Wahyu", batak_name: "Pangungkapon", total_chapters: 22 }
            ],
            sampleVerses: {
                "Yoh_3_16": {
                    indonesia: "Karena begitu besar kasih Allah akan dunia ini, sehingga Ia telah mengaruniakan Anak-Nya yang tunggal, supaya setiap orang yang percaya kepada-Nya tidak binasa, melainkan beroleh hidup yang kekal.",
                    batak: "Alai dia ma roha ni Debata tu banua on, asa dibahenon-Na Anak-Na na sada, supaya saha hita na mangandung tu Ibana, unang binasa, alai beang hita angka roha na tartahan."
                },
                "Mat_6_9": {
                    indonesia: "Karena itu berdoalah demikian: Bapa kami yang di sorga, dikuduskanlah nama-Mu.",
                    batak: "Ala songon on ma manggabe hamu: Amanta di banua ginjang, pasalanta ma goar-Mu."
                },
                "Kej_1_1": {
                    indonesia: "Pada mulanya Allah menciptakan langit dan bumi.",
                    batak: "Di haporseaon dihagenon Debata langit dohot tano."
                }
            }
        };
        
        this.init();
    }
    
    init() {
        this.initializeTheme();
        this.bindEvents();
        this.loadBooks();
        this.showEmptyState();
    }
    
    // Theme Management
    getStoredTheme() {
        try {
            return localStorage?.getItem('alkitab-theme') || 'light';
        } catch (error) {
            return 'light';
        }
    }
    
    setStoredTheme(theme) {
        try {
            localStorage?.setItem('alkitab-theme', theme);
        } catch (error) {
            console.warn('Cannot save theme to localStorage:', error);
        }
    }
    
    initializeTheme() {
        document.documentElement.setAttribute('data-color-scheme', this.currentTheme);
        this.updateThemeIcon();
    }
    
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-color-scheme', this.currentTheme);
        this.setStoredTheme(this.currentTheme);
        this.updateThemeIcon();
    }
    
    updateThemeIcon() {
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = this.currentTheme === 'light' ? '🌙' : '☀️';
        }
    }
    
    // Event Binding
    bindEvents() {
        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleTheme();
            });
        }
        
        // Language toggle
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = e.target.dataset.lang;
                this.switchLanguage(lang);
            });
        });
        
        // Dropdown selections with proper event handling
        this.bindDropdownEvents();
        
        // Action buttons
        const copyBtn = document.getElementById('copy-verse');
        const shareBtn = document.getElementById('share-verse');
        const retryBtn = document.getElementById('retry-btn');
        
        if (copyBtn) {
            copyBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.copyVerse();
            });
        }
        
        if (shareBtn) {
            shareBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.shareVerse();
            });
        }
        
        if (retryBtn) {
            retryBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.retryLoadVerse();
            });
        }
    }
    
    bindDropdownEvents() {
        const bookSelect = document.getElementById('book-select');
        const chapterSelect = document.getElementById('chapter-select');
        const verseSelect = document.getElementById('verse-select');
        
        if (bookSelect) {
            // Remove existing listeners first
            bookSelect.removeEventListener('change', this.handleBookSelect);
            
            // Add new listener with proper context
            this.handleBookSelect = (e) => {
                const value = e.target.value;
                console.log('Book selected:', value);
                this.onBookSelect(value);
            };
            
            bookSelect.addEventListener('change', this.handleBookSelect);
            
            // Also listen for input events for better compatibility
            bookSelect.addEventListener('input', this.handleBookSelect);
        }
        
        if (chapterSelect) {
            // Remove existing listeners first
            chapterSelect.removeEventListener('change', this.handleChapterSelect);
            
            // Add new listener with proper context
            this.handleChapterSelect = (e) => {
                const value = e.target.value;
                console.log('Chapter selected:', value);
                this.onChapterSelect(value);
            };
            
            chapterSelect.addEventListener('change', this.handleChapterSelect);
            chapterSelect.addEventListener('input', this.handleChapterSelect);
        }
        
        if (verseSelect) {
            // Remove existing listeners first
            verseSelect.removeEventListener('change', this.handleVerseSelect);
            
            // Add new listener with proper context
            this.handleVerseSelect = (e) => {
                const value = e.target.value;
                console.log('Verse selected:', value);
                this.onVerseSelect(value);
            };
            
            verseSelect.addEventListener('change', this.handleVerseSelect);
            verseSelect.addEventListener('input', this.handleVerseSelect);
        }
    }
    
    // Language Management
    switchLanguage(lang) {
        this.currentLanguage = lang;
        
        // Update active button
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const activeBtn = document.querySelector(`[data-lang="${lang}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
        
        // Refresh verse content if available
        if (this.selectedBook && this.selectedChapter && this.selectedVerse) {
            this.loadVerse(this.selectedBook, this.selectedChapter, this.selectedVerse);
        }
    }
    
    // API Methods
    async fetchWithFallback(url, fallbackData) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000);
            
            const response = await fetch(url, { 
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.warn(`API call failed for ${url}:`, error);
            return fallbackData;
        }
    }
    
    // Data Loading Methods
    async loadBooks() {
        try {
            const books = await this.fetchWithFallback(
                `${this.API_BASE}/books`,
                this.fallbackData.books
            );
            
            this.populateBookSelect(books);
        } catch (error) {
            console.error('Error loading books:', error);
            this.populateBookSelect(this.fallbackData.books);
        }
    }
    
    async loadChapters(bookId) {
        try {
            this.showLoading();
            
            // Generate fallback chapters based on book data
            const book = this.fallbackData.books.find(b => b.id == bookId);
            const fallbackChapters = book ? 
                Array.from({length: book.total_chapters}, (_, i) => ({
                    id: i + 1,
                    number: i + 1,
                    book_id: bookId
                })) : [];
            
            const chapters = await this.fetchWithFallback(
                `${this.API_BASE}/books/${bookId}/chapters`,
                fallbackChapters
            );
            
            this.populateChapterSelect(chapters);
            this.hideLoading();
        } catch (error) {
            console.error('Error loading chapters:', error);
            this.showError('Gagal memuat daftar pasal');
        }
    }
    
    async loadVerses(bookId, chapterId) {
        try {
            this.showLoading();
            
            // Generate fallback verses (assume 25-50 verses per chapter)
            const verseCount = Math.floor(Math.random() * 26) + 25;
            const fallbackVerses = Array.from({length: verseCount}, (_, i) => ({
                id: i + 1,
                number: i + 1,
                chapter_id: chapterId,
                book_id: bookId
            }));
            
            const verses = await this.fetchWithFallback(
                `${this.API_BASE}/books/${bookId}/chapters/${chapterId}/verses`,
                fallbackVerses
            );
            
            this.populateVerseSelect(verses);
            this.hideLoading();
        } catch (error) {
            console.error('Error loading verses:', error);
            this.showError('Gagal memuat daftar ayat');
        }
    }
    
    async loadVerse(bookId, chapterId, verseId) {
        try {
            this.showLoading();
            
            // Try to get verse from API first
            let verseData;
            try {
                verseData = await this.fetchWithFallback(
                    `${this.API_BASE}/books/${bookId}/chapters/${chapterId}/verses/${verseId}`,
                    null
                );
            } catch (apiError) {
                console.warn('API failed, using fallback data');
                verseData = null;
            }
            
            // If API fails, use fallback data
            if (!verseData) {
                const bookData = this.fallbackData.books.find(b => b.id == bookId);
                const verseKey = `${bookData?.abbreviation}_${chapterId}_${verseId}`;
                const fallbackVerse = this.fallbackData.sampleVerses[verseKey];
                
                if (fallbackVerse) {
                    verseData = {
                        id: verseId,
                        number: verseId,
                        text: this.currentLanguage === 'tb' ? fallbackVerse.indonesia : fallbackVerse.batak,
                        book: { 
                            name: this.currentLanguage === 'tb' ? bookData.name : bookData.batak_name,
                            abbreviation: bookData.abbreviation 
                        },
                        chapter: { number: chapterId }
                    };
                } else {
                    // Generate sample content for demonstration
                    const bookData = this.fallbackData.books.find(b => b.id == bookId);
                    const bookName = this.currentLanguage === 'tb' ? bookData?.name : bookData?.batak_name;
                    
                    verseData = {
                        id: verseId,
                        number: verseId,
                        text: this.currentLanguage === 'tb' ? 
                            `Ini adalah contoh teks untuk ${bookName} ${chapterId}:${verseId}. API sedang tidak tersedia, sehingga ditampilkan teks contoh.` :
                            `Songon on ma hata ni Debata di ${bookName} ${chapterId}:${verseId}. API ndang sadia, asa ditampilhon hata panundui.`,
                        book: { 
                            name: bookName,
                            abbreviation: bookData?.abbreviation 
                        },
                        chapter: { number: chapterId }
                    };
                }
            }
            
            this.displayVerse(verseData);
            this.hideLoading();
        } catch (error) {
            console.error('Error loading verse:', error);
            this.showError('Gagal memuat ayat. Silakan coba lagi.');
        }
    }
    
    // UI Population Methods
    populateBookSelect(books) {
        const bookSelect = document.getElementById('book-select');
        if (!bookSelect) return;
        
        // Clear existing options except the first one
        bookSelect.innerHTML = '<option value="">-- Pilih Kitab --</option>';
        
        books.forEach(book => {
            const option = document.createElement('option');
            option.value = book.id;
            option.textContent = `${book.abbreviation}. ${this.currentLanguage === 'tb' ? book.name : book.batak_name}`;
            bookSelect.appendChild(option);
        });
    }
    
    populateChapterSelect(chapters) {
        const chapterSelect = document.getElementById('chapter-select');
        if (!chapterSelect) return;
        
        chapterSelect.innerHTML = '<option value="">-- Pilih Pasal --</option>';
        chapterSelect.disabled = false;
        
        chapters.forEach(chapter => {
            const option = document.createElement('option');
            option.value = chapter.number || chapter.id;
            option.textContent = `Pasal ${chapter.number || chapter.id}`;
            chapterSelect.appendChild(option);
        });
        
        // Reset verse select
        const verseSelect = document.getElementById('verse-select');
        if (verseSelect) {
            verseSelect.innerHTML = '<option value="">-- Pilih Ayat --</option>';
            verseSelect.disabled = true;
        }
        
        // Re-bind events after populating
        this.bindDropdownEvents();
    }
    
    populateVerseSelect(verses) {
        const verseSelect = document.getElementById('verse-select');
        if (!verseSelect) return;
        
        verseSelect.innerHTML = '<option value="">-- Pilih Ayat --</option>';
        verseSelect.disabled = false;
        
        verses.forEach(verse => {
            const option = document.createElement('option');
            option.value = verse.number || verse.id;
            option.textContent = `Ayat ${verse.number || verse.id}`;
            verseSelect.appendChild(option);
        });
        
        // Re-bind events after populating
        this.bindDropdownEvents();
    }
    
    // Event Handlers
    async onBookSelect(bookId) {
        console.log('onBookSelect called with:', bookId);
        
        if (!bookId) {
            this.resetSelections();
            return;
        }
        
        this.selectedBook = bookId;
        this.selectedChapter = null;
        this.selectedVerse = null;
        
        // Reset chapter and verse selects
        const chapterSelect = document.getElementById('chapter-select');
        const verseSelect = document.getElementById('verse-select');
        
        if (chapterSelect) {
            chapterSelect.innerHTML = '<option value="">-- Pilih Pasal --</option>';
            chapterSelect.disabled = true;
        }
        
        if (verseSelect) {
            verseSelect.innerHTML = '<option value="">-- Pilih Ayat --</option>';
            verseSelect.disabled = true;
        }
        
        this.showEmptyState();
        await this.loadChapters(bookId);
    }
    
    async onChapterSelect(chapterId) {
        console.log('onChapterSelect called with:', chapterId);
        
        if (!chapterId) {
            this.selectedChapter = null;
            this.selectedVerse = null;
            const verseSelect = document.getElementById('verse-select');
            if (verseSelect) {
                verseSelect.innerHTML = '<option value="">-- Pilih Ayat --</option>';
                verseSelect.disabled = true;
            }
            this.showEmptyState();
            return;
        }
        
        this.selectedChapter = chapterId;
        this.selectedVerse = null;
        
        // Reset verse select
        const verseSelect = document.getElementById('verse-select');
        if (verseSelect) {
            verseSelect.innerHTML = '<option value="">-- Pilih Ayat --</option>';
            verseSelect.disabled = true;
        }
        
        this.showEmptyState();
        await this.loadVerses(this.selectedBook, chapterId);
    }
    
    async onVerseSelect(verseId) {
        console.log('onVerseSelect called with:', verseId);
        
        if (!verseId) {
            this.selectedVerse = null;
            this.showEmptyState();
            return;
        }
        
        this.selectedVerse = verseId;
        await this.loadVerse(this.selectedBook, this.selectedChapter, verseId);
    }
    
    resetSelections() {
        this.selectedBook = null;
        this.selectedChapter = null;
        this.selectedVerse = null;
        
        const chapterSelect = document.getElementById('chapter-select');
        const verseSelect = document.getElementById('verse-select');
        
        if (chapterSelect) {
            chapterSelect.innerHTML = '<option value="">-- Pilih Pasal --</option>';
            chapterSelect.disabled = true;
        }
        
        if (verseSelect) {
            verseSelect.innerHTML = '<option value="">-- Pilih Ayat --</option>';
            verseSelect.disabled = true;
        }
        
        this.showEmptyState();
    }
    
    // Display Methods
    displayVerse(verseData) {
        const verseReference = document.getElementById('verse-reference');
        const verseTextContent = document.getElementById('verse-text-content');
        
        if (verseReference && verseTextContent) {
            const reference = `${verseData.book.name} ${verseData.chapter.number}:${verseData.number}`;
            verseReference.textContent = reference;
            verseTextContent.textContent = verseData.text;
            
            this.hideAllStates();
            this.showElement('verse-content');
            
            // Scroll to content
            setTimeout(() => {
                document.getElementById('verse-content')?.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }, 100);
        }
    }
    
    // State Management
    showLoading() {
        this.hideAllStates();
        this.showElement('loading-state');
    }
    
    hideLoading() {
        this.hideElement('loading-state');
    }
    
    showEmptyState() {
        this.hideAllStates();
        this.showElement('empty-state');
    }
    
    showError(message) {
        const errorMessage = document.getElementById('error-message');
        if (errorMessage) {
            errorMessage.textContent = message;
        }
        
        this.hideAllStates();
        this.showElement('error-state');
    }
    
    hideAllStates() {
        const states = ['loading-state', 'empty-state', 'verse-content', 'error-state'];
        states.forEach(state => this.hideElement(state));
    }
    
    showElement(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.classList.remove('hidden');
        }
    }
    
    hideElement(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.classList.add('hidden');
        }
    }
    
    // Action Methods
    async copyVerse() {
        const verseText = document.getElementById('verse-text-content')?.textContent;
        const verseRef = document.getElementById('verse-reference')?.textContent;
        
        if (!verseText || !verseRef) return;
        
        const fullText = `"${verseText}"\n\n${verseRef}`;
        
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(fullText);
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = fullText;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand('copy');
                textArea.remove();
            }
            
            this.showToast('Ayat berhasil disalin!');
        } catch (error) {
            console.error('Failed to copy verse:', error);
            this.showToast('Gagal menyalin ayat');
        }
    }
    
    shareVerse() {
        const verseText = document.getElementById('verse-text-content')?.textContent;
        const verseRef = document.getElementById('verse-reference')?.textContent;
        
        if (!verseText || !verseRef) return;
        
        const shareText = `"${verseText}"\n\n${verseRef}\n\nDibagikan dari Alkitab Digital`;
        
        if (navigator.share) {
            navigator.share({
                title: `Alkitab Digital - ${verseRef}`,
                text: shareText,
                url: window.location.href
            }).then(() => {
                this.showToast('Berhasil dibagikan!');
            }).catch(error => {
                console.error('Failed to share:', error);
                this.fallbackShare(shareText);
            });
        } else {
            this.fallbackShare(shareText);
        }
    }
    
    fallbackShare(text) {
        // Create shareable URL for WhatsApp
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, '_blank');
        this.showToast('Dibuka di WhatsApp!');
    }
    
    retryLoadVerse() {
        if (this.selectedBook && this.selectedChapter && this.selectedVerse) {
            this.loadVerse(this.selectedBook, this.selectedChapter, this.selectedVerse);
        } else {
            this.showEmptyState();
        }
    }
    
    showToast(message) {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toast-message');
        
        if (toast && toastMessage) {
            toastMessage.textContent = message;
            toast.classList.remove('hidden');
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => {
                    toast.classList.add('hidden');
                }, 300);
            }, 3000);
        }
    }
}

// Global error handler for redirecting to backup domain
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    
    // Check if it's a critical error that should redirect
    if (event.error && (
        event.error.message.includes('network') ||
        event.error.message.includes('fetch') ||
        event.error.message.includes('server')
    )) {
        setTimeout(() => {
            try {
                window.location.href = 'https://alkitab.hkbpperawang.org';
            } catch (redirectError) {
                console.error('Failed to redirect:', redirectError);
            }
        }, 5000);
    }
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    
    if (event.reason && (
        event.reason.message?.includes('network') ||
        event.reason.message?.includes('fetch') ||
        event.reason.message?.includes('server')
    )) {
        setTimeout(() => {
            try {
                window.location.href = 'https://alkitab.hkbpperawang.org';
            } catch (redirectError) {
                console.error('Failed to redirect:', redirectError);
            }
        }, 5000);
    }
});

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.alkitabApp = new AlkitabApp();
        console.log('Alkitab app initialized successfully');
    } catch (error) {
        console.error('Failed to initialize Alkitab app:', error);
        // Redirect to backup domain on critical initialization error
        setTimeout(() => {
            try {
                window.location.href = 'https://alkitab.hkbpperawang.org';
            } catch (redirectError) {
                console.error('Failed to redirect:', redirectError);
            }
        }, 3000);
    }
});

// Service Worker for offline support (if needed)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Register service worker if available
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}