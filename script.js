document.addEventListener('DOMContentLoaded', () => {
    const markdownInput = document.getElementById('markdown-input');
    const htmlPreview = document.getElementById('html-preview'); // Added preview element
    const htmlOutput = document.getElementById('html-output'); // This is for the source code
    const themeToggle = document.getElementById('theme-toggle');
    const pasteBtn = document.getElementById('paste-md');
    const clearBtn = document.getElementById('clear-all');
    const copyBtn = document.getElementById('copy-html');
    const downloadBtn = document.getElementById('download-html');
    const body = document.body;
    const tabPreview = document.getElementById('tab-preview');
    const tabSource = document.getElementById('tab-source');
    const htmlOutputContainer = document.getElementById('html-output-container'); // Pane for source code

    // --- Marked.js Setup ---
    // Enable GitHub Flavored Markdown (GFM) features like tables, task lists
    marked.setOptions({
        gfm: true,
        breaks: true, // Add <br> on single line breaks
        pedantic: false,
        smartLists: true,
        smartypants: false,
        xhtml: false // Output plain HTML
    });

    // --- Core Conversion Function ---
    function convertMarkdown() {
        const markdownText = markdownInput.value;
        const htmlText = marked.parse(markdownText);

        // Update Live Preview
        htmlPreview.innerHTML = htmlText;

        // Update HTML Source Code View
        htmlOutput.textContent = htmlText; // Set text content for source view
        Prism.highlightElement(htmlOutput); // Highlight the source code

        autoResizeTextarea();
        saveMarkdownToLocalStorage(markdownText); // Save on change
    }

    // --- Auto-Resize Textarea ---
    function autoResizeTextarea() {
        markdownInput.style.height = 'auto'; // Reset height
        markdownInput.style.height = markdownInput.scrollHeight + 'px'; // Set to scroll height
    }

    // --- LocalStorage Handling ---
    function saveMarkdownToLocalStorage(markdown) {
        localStorage.setItem('markdownInput', markdown);
    }

    function loadMarkdownFromLocalStorage() {
        const savedMarkdown = localStorage.getItem('markdownInput');
        if (savedMarkdown) {
            markdownInput.value = savedMarkdown;
        }
    }

    function saveThemeToLocalStorage(theme) {
        localStorage.setItem('theme', theme);
    }

    function loadThemeFromLocalStorage() {
        const savedTheme = localStorage.getItem('theme') || 'light'; // Default to light
        setTheme(savedTheme);
    }

    // --- Theme Toggling ---
    function setTheme(theme) {
        body.setAttribute('data-theme', theme);
        themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
        saveThemeToLocalStorage(theme);
        // Re-highlight after theme change as Prism styles might depend on it
        Prism.highlightElement(htmlOutput);
    }

    function toggleTheme() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    }

    // --- Button Actions ---
    async function pasteMarkdown() {
        try {
            const text = await navigator.clipboard.readText();
            markdownInput.value += text; // Append or replace? Let's append for now.
            convertMarkdown();
        } catch (err) {
            console.error('Failed to read clipboard contents: ', err);
            alert('Failed to paste from clipboard. Please ensure you have granted permission.');
        }
    }

    function clearAll() {
        markdownInput.value = '';
        htmlPreview.innerHTML = ''; // Clear preview
        htmlOutput.textContent = ''; // Clear source code view
        Prism.highlightElement(htmlOutput); // Re-highlight empty source code view
        autoResizeTextarea();
        saveMarkdownToLocalStorage(''); // Clear saved markdown
    }

    // --- Tab Switching ---
    function switchTab(tabToShow) {
        const isPreview = tabToShow === 'preview';

        // Toggle button active state
        tabPreview.classList.toggle('active', isPreview);
        tabSource.classList.toggle('active', !isPreview);
        tabPreview.setAttribute('aria-selected', isPreview);
        tabSource.setAttribute('aria-selected', !isPreview);


        // Toggle pane visibility
        htmlPreview.classList.toggle('active', isPreview);
        htmlOutputContainer.classList.toggle('active', !isPreview);
        htmlPreview.hidden = !isPreview;
        htmlOutputContainer.hidden = isPreview;

        // Show/hide toolbar buttons based on active tab (optional, but good UX)
        // Let's keep them always visible for simplicity now, but could hide copy/download if preview is active.
    }

    // --- Button Actions --- (Keep existing button actions: pasteMarkdown, clearAll)

    function copyHtml() { // This now copies the source code
        const htmlToCopy = htmlOutput.textContent;
        navigator.clipboard.writeText(htmlToCopy).then(() => {
            // Optional: Provide user feedback (e.g., change button text temporarily)
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 1500);
        }).catch(err => {
            console.error('Failed to copy HTML: ', err);
            alert('Failed to copy HTML to clipboard.');
        });
    }

    function downloadHtml() {
        const htmlContent = htmlOutput.textContent;
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'converted.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // --- Event Listeners ---
    markdownInput.addEventListener('input', convertMarkdown);
    themeToggle.addEventListener('click', toggleTheme);
    pasteBtn.addEventListener('click', pasteMarkdown);
    clearBtn.addEventListener('click', clearAll);
    copyBtn.addEventListener('click', copyHtml); // Still copies source
    downloadBtn.addEventListener('click', downloadHtml); // Still downloads source

    // Tab listeners
    tabPreview.addEventListener('click', () => switchTab('preview'));
    tabSource.addEventListener('click', () => switchTab('source'));


    // --- Initial Load ---
    switchTab('preview'); // Ensure preview is active on load
    loadThemeFromLocalStorage();
    loadMarkdownFromLocalStorage();
    convertMarkdown(); // Initial conversion and resize on load
});
