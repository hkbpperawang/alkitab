// Alkitab Digital Application - Fully Fixed Version
class AlkitabApp {
    constructor() {
        this.currentTheme = this.getStoredTheme();
        this.currentLanguage = 'tb';
        this.selectedBook = null;
        this.selectedChapter = null;
        this.selectedVerse = null;
        
        // Complete Bible data - built-in, no API dependency
        this.booksData = [
            {"id": 1, "name": "Kejadian", "batak": "Hagenon", "abbr": "Kej", "chapters": 50},
            {"id": 2, "name": "Keluaran", "batak": "Keluar", "abbr": "Kel", "chapters": 40},
            {"id": 3, "name": "Imamat", "batak": "Imamat", "abbr": "Im", "chapters": 27},
            {"id": 4, "name": "Bilangan", "batak": "Bilangan", "abbr": "Bil", "chapters": 36},
            {"id": 5, "name": "Ulangan", "batak": "Ulangan", "abbr": "Ul", "chapters": 34},
            {"id": 6, "name": "Yosua", "batak": "Yosua", "abbr": "Yos", "chapters": 24},
            {"id": 7, "name": "Hakim-hakim", "batak": "Hakim", "abbr": "Hak", "chapters": 21},
            {"id": 8, "name": "Rut", "batak": "Rut", "abbr": "Rut", "chapters": 4},
            {"id": 9, "name": "1 Samuel", "batak": "1 Samuel", "abbr": "1Sam", "chapters": 31},
            {"id": 10, "name": "2 Samuel", "batak": "2 Samuel", "abbr": "2Sam", "chapters": 24},
            {"id": 11, "name": "1 Raja-raja", "batak": "1 Raja", "abbr": "1Raj", "chapters": 22},
            {"id": 12, "name": "2 Raja-raja", "batak": "2 Raja", "abbr": "2Raj", "chapters": 25},
            {"id": 13, "name": "1 Tawarikh", "batak": "1 Tawarikh", "abbr": "1Taw", "chapters": 29},
            {"id": 14, "name": "2 Tawarikh", "batak": "2 Tawarikh", "abbr": "2Taw", "chapters": 36},
            {"id": 15, "name": "Ezra", "batak": "Ezra", "abbr": "Ezr", "chapters": 10},
            {"id": 16, "name": "Nehemia", "batak": "Nehemia", "abbr": "Neh", "chapters": 13},
            {"id": 17, "name": "Ester", "batak": "Ester", "abbr": "Est", "chapters": 10},
            {"id": 18, "name": "Ayub", "batak": "Ayub", "abbr": "Ayb", "chapters": 42},
            {"id": 19, "name": "Mazmur", "batak": "Mazmur", "abbr": "Mzm", "chapters": 150},
            {"id": 20, "name": "Amsal", "batak": "Amsal", "abbr": "Ams", "chapters": 31},
            {"id": 21, "name": "Pengkhotbah", "batak": "Pangkhotbah", "abbr": "Pkh", "chapters": 12},
            {"id": 22, "name": "Kidung Agung", "batak": "Ende", "abbr": "Kid", "chapters": 8},
            {"id": 23, "name": "Yesaya", "batak": "Yesaya", "abbr": "Yes", "chapters": 66},
            {"id": 24, "name": "Yeremia", "batak": "Yeremia", "abbr": "Yer", "chapters": 52},
            {"id": 25, "name": "Ratapan", "batak": "Ratapan", "abbr": "Rat", "chapters": 5},
            {"id": 26, "name": "Yehezkiel", "batak": "Yehezkiel", "abbr": "Yeh", "chapters": 48},
            {"id": 27, "name": "Daniel", "batak": "Daniel", "abbr": "Dan", "chapters": 12},
            {"id": 28, "name": "Hosea", "batak": "Hosea", "abbr": "Hos", "chapters": 14},
            {"id": 29, "name": "Yoel", "batak": "Yoel", "abbr": "Yl", "chapters": 3},
            {"id": 30, "name": "Amos", "batak": "Amos", "abbr": "Am", "chapters": 9},
            {"id": 31, "name": "Obaja", "batak": "Obaja", "abbr": "Ob", "chapters": 1},
            {"id": 32, "name": "Yunus", "batak": "Yunus", "abbr": "Yun", "chapters": 4},
            {"id": 33, "name": "Mikha", "batak": "Mikha", "abbr": "Mi", "chapters": 7},
            {"id": 34, "name": "Nahum", "batak": "Nahum", "abbr": "Nah", "chapters": 3},
            {"id": 35, "name": "Habakuk", "batak": "Habakuk", "abbr": "Hab", "chapters": 3},
            {"id": 36, "name": "Zefanya", "batak": "Zefanya", "abbr": "Zef", "chapters": 3},
            {"id": 37, "name": "Hagai", "batak": "Hagai", "abbr": "Hag", "chapters": 2},
            {"id": 38, "name": "Zakharia", "batak": "Zakharia", "abbr": "Zak", "chapters": 14},
            {"id": 39, "name": "Maleaki", "batak": "Maleaki", "abbr": "Mal", "chapters": 4},
            {"id": 40, "name": "Matius", "batak": "Matius", "abbr": "Mat", "chapters": 28},
            {"id": 41, "name": "Markus", "batak": "Markus", "abbr": "Mar", "chapters": 16},
            {"id": 42, "name": "Lukas", "batak": "Lukas", "abbr": "Luk", "chapters": 24},
            {"id": 43, "name": "Yohanes", "batak": "Johannes", "abbr": "Yoh", "chapters": 21},
            {"id": 44, "name": "Kisah Para Rasul", "batak": "Kisah Rasul", "abbr": "Kis", "chapters": 28},
            {"id": 45, "name": "Roma", "batak": "Roma", "abbr": "Rom", "chapters": 16},
            {"id": 46, "name": "1 Korintus", "batak": "1 Korintus", "abbr": "1Kor", "chapters": 16},
            {"id": 47, "name": "2 Korintus", "batak": "2 Korintus", "abbr": "2Kor", "chapters": 13},
            {"id": 48, "name": "Galatia", "batak": "Galatia", "abbr": "Gal", "chapters": 6},
            {"id": 49, "name": "Efesus", "batak": "Efesus", "abbr": "Ef", "chapters": 6},
            {"id": 50, "name": "Filipi", "batak": "Filipi", "abbr": "Flp", "chapters": 4},
            {"id": 51, "name": "Kolose", "batak": "Kolose", "abbr": "Kol", "chapters": 4},
            {"id": 52, "name": "1 Tesalonika", "batak": "1 Tesalonika", "abbr": "1Tes", "chapters": 5},
            {"id": 53, "name": "2 Tesalonika", "batak": "2 Tesalonika", "abbr": "2Tes", "chapters": 3},
            {"id": 54, "name": "1 Timotius", "batak": "1 Timotius", "abbr": "1Tim", "chapters": 6},
            {"id": 55, "name": "2 Timotius", "batak": "2 Timotius", "abbr": "2Tim", "chapters": 4},
            {"id": 56, "name": "Titus", "batak": "Titus", "abbr": "Tit", "chapters": 3},
            {"id": 57, "name": "Filemon", "batak": "Filemon", "abbr": "Flm", "chapters": 1},
            {"id": 58, "name": "Ibrani", "batak": "Ibrani", "abbr": "Ibr", "chapters": 13},
            {"id": 59, "name": "Yakobus", "batak": "Yakobus", "abbr": "Yak", "chapters": 5},
            {"id": 60, "name": "1 Petrus", "batak": "1 Petrus", "abbr": "1Pet", "chapters": 5},
            {"id": 61, "name": "2 Petrus", "batak": "2 Petrus", "abbr": "2Pet", "chapters": 3},
            {"id": 62, "name": "1 Yohanes", "batak": "1 Johannes", "abbr": "1Yoh", "chapters": 5},
            {"id": 63, "name": "2 Yohanes", "batak": "2 Johannes", "abbr": "2Yoh", "chapters": 1},
            {"id": 64, "name": "3 Yohanes", "batak": "3 Johannes", "abbr": "3Yoh", "chapters": 1},
            {"id": 65, "name": "Yudas", "batak": "Yudas", "abbr": "Yud", "chapters": 1},
            {"id": 66, "name": "Wahyu", "batak": "Pangungkapon", "abbr": "Why", "chapters": 22}
        ];

        // Built-in verse database with popular verses
        this.versesData = {
            "43_3_16": {
                book: "Yohanes",
                chapter: 3,
                verse: 16,
                indonesia: "Karena begitu besar kasih Allah akan dunia ini, sehingga Ia telah mengaruniakan Anak-Nya yang tunggal, supaya setiap orang yang percaya kepada-Nya tidak binasa, melainkan beroleh hidup yang kekal.",
                batak: "Alai dia ma roha ni Debata tu banua on, asa dibahenon-Na Anak-Na na sada, supaya saha hita na mangandung tu Ibana, unang binasa, alai beang hita angka roha na tartahan."
            },
            "40_6_9": {
                book: "Matius",
                chapter: 6,
                verse: 9,
                indonesia: "Karena itu berdoalah demikian: Bapa kami yang di surga, dikuduskanlah nama-Mu.",
                batak: "Ala songon on ma manggabe hamu: Amanta di banua ginjang, pasalanta ma goar-Mu."
            },
            "1_1_1": {
                book: "Kejadian",
                chapter: 1,
                verse: 1,
                indonesia: "Pada mulanya Allah menciptakan langit dan bumi.",
                batak: "Di haporseaon dihagenon Debata langit dohot tano."
            },
            "19_23_1": {
                book: "Mazmur",
                chapter: 23,
                verse: 1,
                indonesia: "Mazmur Daud. TUHAN adalah gembalaku, takkan kekurangan aku.",
                batak: "Debata do angon-ku, alai unang kurang ahu."
            },
            "45_8_28": {
                book: "Roma",
                chapter: 8,
                verse: 28,
                indonesia: "Kita tahu sekarang, bahwa Allah turut bekerja dalam segala sesuatu untuk mendatangkan kebaikan bagi mereka yang mengasihi Dia, yaitu bagi mereka yang terpanggil sesuai dengan rencana Allah.",
                batak: "Olo ta adong songon na marsibahen Debata dohot sude bahen tu jolmana na mangandung tu Ibana, na natongos sesuai dohot panggabean-Na."
            }
        };

        // Chapter verse counts for generating verse options
        this.chapterVerses = {
            "1": [31, 25, 24, 26, 32, 22, 24, 22, 29, 32, 32, 20, 18, 24, 21, 16, 27, 33, 38, 18, 34, 24, 20, 67, 34, 35, 46, 22, 35, 43, 55, 32, 20, 31, 29, 43, 36, 30, 23, 23, 57, 38, 34, 34, 28, 34, 31, 22, 33, 26],
            "40": [25, 23, 17, 25, 48, 34, 29, 34, 38, 42, 30, 50, 58, 36, 39, 28, 27, 35, 30, 34, 46, 46, 39, 51, 46, 75, 66, 20],
            "43": [51, 25, 36, 54, 47, 71, 53, 59, 41, 42, 57, 50, 38, 31, 27, 33, 26, 40, 42, 31, 25],
            "19": [6, 12, 8, 8, 12, 10, 17, 9, 20, 18, 7, 8, 6, 7, 5, 11, 15, 50, 14, 9, 13, 31, 6, 10, 22, 12, 14, 9, 11, 12, 24, 11, 22, 22, 28, 12, 40, 22, 13, 17, 13, 11, 5, 26, 17, 11, 9, 14, 20, 23, 19, 9, 6, 7, 23, 13, 11, 11, 17, 12, 8, 12, 11, 10, 13, 20, 7, 35, 36, 5, 24, 20, 28, 23, 10, 11, 20, 32, 17, 19, 10, 6, 18, 13, 19, 13, 9, 12, 25, 13, 16, 7, 13, 10, 15, 16, 9, 15, 10, 11, 13, 10, 5, 8, 3, 18, 3, 3, 21, 26, 9, 8, 24, 13, 10, 7, 12, 15, 21, 10, 20, 14, 9, 6, 33, 22, 35, 27, 23, 35, 27, 36, 18, 32, 31, 28, 25, 35, 33, 33, 28, 24, 29, 30, 31, 29, 35, 34, 28, 28, 27, 28, 27, 33, 31],
            "45": [32, 29, 31, 25, 21, 23, 25, 39, 33, 21, 36, 21, 14, 23, 33, 27]
        };
        
        this.init();
    }
    
    init() {
        console.log('Initializing Alkitab App...');
        this.initializeTheme();
        this.loadBooks();
        this.bindEvents();
        this.showEmptyState();
        console.log('Alkitab App initialized successfully');
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
        console.log('Theme initialized:', this.currentTheme);
    }
    
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-color-scheme', this.currentTheme);
        this.setStoredTheme(this.currentTheme);
        this.updateThemeIcon();
        console.log('Theme toggled to:', this.currentTheme);
    }
    
    updateThemeIcon() {
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = this.currentTheme === 'light' ? '🌙' : '☀️';
        }
    }
    
    // Event Binding - Completely Fixed
    bindEvents() {
        console.log('Binding events...');
        
        // Theme toggle - Fixed
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleTheme();
            });
            console.log('Theme toggle bound');
        }
        
        // Language toggle - Fixed
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const lang = e.target.dataset.lang;
                this.switchLanguage(lang);
            });
        });
        console.log('Language buttons bound');
        
        // Popular verse links - Fixed
        document.querySelectorAll('.verse-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const book = e.target.dataset.book;
                const chapter = e.target.dataset.chapter;
                const verse = e.target.dataset.verse;
                console.log('Popular verse clicked:', book, chapter, verse);
                this.loadPopularVerse(parseInt(book), parseInt(chapter), parseInt(verse));
            });
        });
        console.log('Popular verse links bound');
        
        // Dropdown events - Simplified and Fixed
        const bookSelect = document.getElementById('book-select');
        const chapterSelect = document.getElementById('chapter-select');
        const verseSelect = document.getElementById('verse-select');
        
        if (bookSelect) {
            bookSelect.addEventListener('change', (e) => {
                const bookId = parseInt(e.target.value);
                console.log('Book selected:', bookId);
                if (bookId) {
                    this.onBookSelect(bookId);
                } else {
                    this.resetSelections();
                }
            });
        }
        
        if (chapterSelect) {
            chapterSelect.addEventListener('change', (e) => {
                const chapterId = parseInt(e.target.value);
                console.log('Chapter selected:', chapterId);
                if (chapterId) {
                    this.onChapterSelect(chapterId);
                } else {
                    this.resetChapterAndVerse();
                }
            });
        }
        
        if (verseSelect) {
            verseSelect.addEventListener('change', (e) => {
                const verseId = parseInt(e.target.value);
                console.log('Verse selected:', verseId);
                if (verseId) {
                    this.onVerseSelect(verseId);
                } else {
                    this.showEmptyState();
                }
            });
        }
        
        // Action buttons
        this.bindActionButtons();
        
        console.log('All events bound successfully');
    }
    
    bindActionButtons() {
        const copyBtn = document.getElementById('copy-verse');
        const shareBtn = document.getElementById('share-verse');
        const prevBtn = document.getElementById('prev-verse');
        const nextBtn = document.getElementById('next-verse');
        
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
        
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigateVerse(-1);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigateVerse(1);
            });
        }
    }
    
    // Language Management
    switchLanguage(lang) {
        this.currentLanguage = lang;
        console.log('Language switched to:', lang);
        
        // Update active button
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const activeBtn = document.querySelector(`[data-lang="${lang}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
        
        // Refresh book dropdown
        this.loadBooks();
        
        // Refresh verse content if available
        if (this.selectedBook && this.selectedChapter && this.selectedVerse) {
            this.loadVerse(this.selectedBook, this.selectedChapter, this.selectedVerse);
        }
    }
    
    // Data Loading Methods - Simplified
    loadBooks() {
        console.log('Loading books...');
        const bookSelect = document.getElementById('book-select');
        if (!bookSelect) return;
        
        bookSelect.innerHTML = '<option value="">-- Pilih Kitab --</option>';
        
        this.booksData.forEach(book => {
            const option = document.createElement('option');
            option.value = book.id;
            const displayName = this.currentLanguage === 'tb' ? book.name : book.batak;
            option.textContent = `${book.abbr}. ${displayName}`;
            bookSelect.appendChild(option);
        });
        
        console.log('Books loaded successfully');
    }
    
    loadChapters(bookId) {
        console.log('Loading chapters for book:', bookId);
        const book = this.booksData.find(b => b.id === bookId);
        if (!book) return;
        
        const chapterSelect = document.getElementById('chapter-select');
        if (!chapterSelect) return;
        
        chapterSelect.innerHTML = '<option value="">-- Pilih Pasal --</option>';
        
        for (let i = 1; i <= book.chapters; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `Pasal ${i}`;
            chapterSelect.appendChild(option);
        }
        
        chapterSelect.disabled = false;
        console.log('Chapters loaded:', book.chapters);
    }
    
    loadVerses(bookId, chapterId) {
        console.log('Loading verses for book:', bookId, 'chapter:', chapterId);
        const verseCount = this.getVerseCount(bookId, chapterId);
        
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
        console.log('Verses loaded:', verseCount);
    }
    
    getVerseCount(bookId, chapterId) {
        const bookChapters = this.chapterVerses[bookId.toString()];
        if (bookChapters && bookChapters[chapterId - 1]) {
            return bookChapters[chapterId - 1];
        }
        return 25; // Default
    }
    
    loadVerse(bookId, chapterId, verseId) {
        console.log('Loading verse:', bookId, chapterId, verseId);
        const verseKey = `${bookId}_${chapterId}_${verseId}`;
        const verseData = this.versesData[verseKey];
        
        if (verseData) {
            console.log('Verse data found:', verseKey);
            this.displayVerse(verseData, bookId);
        } else {
            console.log('Verse data not found:', verseKey);
            this.showNoVerseAvailable(bookId, chapterId, verseId);
        }
    }
    
    loadPopularVerse(bookId, chapterId, verseId) {
        console.log('Loading popular verse:', bookId, chapterId, verseId);
        
        // Set the current selection
        this.selectedBook = bookId;
        this.selectedChapter = chapterId;
        this.selectedVerse = verseId;
        
        // Update dropdowns
        const bookSelect = document.getElementById('book-select');
        if (bookSelect) {
            bookSelect.value = bookId;
        }
        
        // Load and populate chapters
        this.loadChapters(bookId);
        
        // Set chapter value
        setTimeout(() => {
            const chapterSelect = document.getElementById('chapter-select');
            if (chapterSelect) {
                chapterSelect.value = chapterId;
            }
            
            // Load and populate verses
            this.loadVerses(bookId, chapterId);
            
            // Set verse value and load content
            setTimeout(() => {
                const verseSelect = document.getElementById('verse-select');
                if (verseSelect) {
                    verseSelect.value = verseId;
                }
                
                // Load the actual verse content
                this.loadVerse(bookId, chapterId, verseId);
            }, 100);
        }, 100);
    }
    
    // Event Handlers - Simplified
    onBookSelect(bookId) {
        console.log('onBookSelect:', bookId);
        this.selectedBook = bookId;
        this.selectedChapter = null;
        this.selectedVerse = null;
        
        // Reset other dropdowns
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
        this.loadChapters(bookId);
    }
    
    onChapterSelect(chapterId) {
        console.log('onChapterSelect:', chapterId);
        this.selectedChapter = chapterId;
        this.selectedVerse = null;
        
        // Reset verse dropdown
        const verseSelect = document.getElementById('verse-select');
        if (verseSelect) {
            verseSelect.innerHTML = '<option value="">-- Pilih Ayat --</option>';
            verseSelect.disabled = true;
        }
        
        this.showEmptyState();
        this.loadVerses(this.selectedBook, chapterId);
    }
    
    onVerseSelect(verseId) {
        console.log('onVerseSelect:', verseId);
        this.selectedVerse = verseId;
        this.loadVerse(this.selectedBook, this.selectedChapter, verseId);
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
    
    resetChapterAndVerse() {
        this.selectedChapter = null;
        this.selectedVerse = null;
        
        const verseSelect = document.getElementById('verse-select');
        if (verseSelect) {
            verseSelect.innerHTML = '<option value="">-- Pilih Ayat --</option>';
            verseSelect.disabled = true;
        }
        
        this.showEmptyState();
    }
    
    // Display Methods
    displayVerse(verseData, bookId) {
        console.log('Displaying verse:', verseData);
        
        const verseReference = document.getElementById('verse-reference');
        const verseTextContent = document.getElementById('verse-text-content');
        
        if (verseReference && verseTextContent) {
            const book = this.booksData.find(b => b.id === bookId);
            const bookName = this.currentLanguage === 'tb' ? book.name : book.batak;
            const reference = `${bookName} ${verseData.chapter}:${verseData.verse}`;
            
            verseReference.textContent = reference;
            
            const text = this.currentLanguage === 'tb' ? verseData.indonesia : verseData.batak;
            verseTextContent.textContent = text;
            
            this.hideAllStates();
            this.showElement('verse-content');
            
            this.updateNavigationButtons();
            console.log('Verse displayed successfully');
        }
    }
    
    showNoVerseAvailable(bookId, chapterId, verseId) {
        const book = this.booksData.find(b => b.id === bookId);
        const bookName = this.currentLanguage === 'tb' ? book.name : book.batak;
        const reference = `${bookName} ${chapterId}:${verseId}`;
        
        const noVerseMessage = document.getElementById('no-verse-message');
        if (noVerseMessage) {
            noVerseMessage.textContent = `Teks untuk ${reference} belum tersedia dalam database.`;
        }
        
        this.hideAllStates();
        this.showElement('no-verse-state');
    }
    
    // Navigation
    navigateVerse(direction) {
        if (!this.selectedBook || !this.selectedChapter || !this.selectedVerse) return;
        
        const currentVerse = this.selectedVerse;
        const newVerse = currentVerse + direction;
        const maxVerses = this.getVerseCount(this.selectedBook, this.selectedChapter);
        
        if (newVerse >= 1 && newVerse <= maxVerses) {
            this.selectedVerse = newVerse;
            
            const verseSelect = document.getElementById('verse-select');
            if (verseSelect) {
                verseSelect.value = newVerse;
            }
            
            this.loadVerse(this.selectedBook, this.selectedChapter, newVerse);
        }
    }
    
    updateNavigationButtons() {
        const prevBtn = document.getElementById('prev-verse');
        const nextBtn = document.getElementById('next-verse');
        
        if (!prevBtn || !nextBtn) return;
        
        const currentVerse = this.selectedVerse;
        const maxVerses = this.getVerseCount(this.selectedBook, this.selectedChapter);
        
        prevBtn.disabled = currentVerse <= 1;
        nextBtn.disabled = currentVerse >= maxVerses;
    }
    
    // State Management
    showEmptyState() {
        this.hideAllStates();
        this.showElement('empty-state');
    }
    
    hideAllStates() {
        const states = ['empty-state', 'verse-content', 'no-verse-state'];
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
    
    // Actions
    copyVerse() {
        const verseText = document.getElementById('verse-text-content')?.textContent;
        const verseRef = document.getElementById('verse-reference')?.textContent;
        
        if (!verseText || !verseRef) return;
        
        const fullText = `"${verseText}"\n\n${verseRef}`;
        
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(fullText).then(() => {
                this.showToast('Ayat berhasil disalin!');
            }).catch(() => {
                this.fallbackCopy(fullText);
            });
        } else {
            this.fallbackCopy(fullText);
        }
    }
    
    fallbackCopy(text) {
        try {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            document.execCommand('copy');
            textArea.remove();
            this.showToast('Ayat berhasil disalin!');
        } catch (error) {
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
            }).catch(() => {
                this.fallbackShare(shareText);
            });
        } else {
            this.fallbackShare(shareText);
        }
    }
    
    fallbackShare(text) {
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, '_blank');
        this.showToast('Dibuka di WhatsApp!');
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

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing app...');
    try {
        window.alkitabApp = new AlkitabApp();
        console.log('Alkitab Digital berhasil dimuat!');
    } catch (error) {
        console.error('Gagal memuat aplikasi:', error);
    }
});