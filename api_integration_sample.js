// Fungsi untuk integrasi API alkitab-api-v3
class AlkitabAPIIntegration {
    constructor(app) {
        this.app = app;
        this.API_BASE = 'https://alkitab-api-v3.vercel.app';
        this.cache = new Map(); // Cache untuk performa
    }

    async fetchVerse(bookId, chapter, verse) {
        const cacheKey = `${bookId}_${chapter}_${verse}`;

        // Cek cache dulu
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        try {
            // Tampilkan loading
            this.showLoading();

            // Fetch dari API
            const response = await fetch(`${this.API_BASE}/books/${bookId}/chapters/${chapter}/verses/${verse}`);

            if (!response.ok) throw new Error('API Error');

            const data = await response.json();

            // Cache hasil
            this.cache.set(cacheKey, data);

            return data;
        } catch (error) {
            console.error('API Error:', error);

            // Fallback ke data manual
            return this.app.sampleVerses[cacheKey] || null;
        } finally {
            this.hideLoading();
        }
    }

    showLoading() {
        const loading = document.getElementById('loading');
        if (loading) loading.style.display = 'block';
    }

    hideLoading() {
        const loading = document.getElementById('loading');
        if (loading) loading.style.display = 'none';
    }
}

// Modified displayVerse method dengan API integration
async displayVerse() {
    const contentElement = document.getElementById('verse-content');
    const actionsElement = document.getElementById('verse-actions');

    if (!contentElement || !this.selectedBook || !this.selectedChapter || !this.selectedVerse) {
        return;
    }

    try {
        // Coba ambil dari API dulu
        const apiData = await this.apiIntegration.fetchVerse(
            this.selectedBook.id, 
            this.selectedChapter, 
            this.selectedVerse
        );

        let content;
        if (apiData) {
            // Gunakan data dari API
            const text = this.currentLanguage === 'indonesia' ? 
                apiData.text_indonesia : apiData.text_batak || 'Teks Batak tidak tersedia';

            const bookName = this.currentLanguage === 'indonesia' ? 
                this.selectedBook.name : this.selectedBook.batak;

            content = `
                <div class="verse-reference">
                    ${bookName} ${this.selectedChapter}:${this.selectedVerse}
                </div>
                <div class="verse-text">
                    ${text}
                </div>
                <div class="verse-source">
                    <small>📡 Data dari API alkitab-api-v3</small>
                </div>
            `;

            actionsElement.style.display = 'flex';
        } else {
            // Fallback ke data manual
            this.displayManualVerse();
        }

        contentElement.innerHTML = content;
    } catch (error) {
        console.error('Error displaying verse:', error);
        this.displayManualVerse(); // Fallback
    }
}