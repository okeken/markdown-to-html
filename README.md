# Markdown to HTML Converter

A simple, responsive, and feature-rich online tool to convert Markdown text into HTML in real-time. Built purely with HTML, CSS, and Vanilla JavaScript.

## Features

*   **Live Preview & Source Code Tabs:** View either the rendered HTML preview or the syntax-highlighted HTML source code in the output panel using tabs. Preview is shown by default.
*   **Two-Column Layout:** Efficient layout on desktop (Markdown Input | Output Panel), stacking vertically on mobile.
*   **Markdown Support:** Handles common Markdown syntax including:
    *   Headings (`#`, `##`, ...)
    *   Bold (`**bold**`), Italic (`*italic*`), Bold & Italic (`***bold italic***`)
    *   Links (`[text](url)`)
    *   Images (`![alt](url)`)
    *   Unordered (`- item`) and Ordered (`1. item`) Lists
    *   Blockquotes (`> quote`)
    *   Inline Code (`` `code` ``)
    *   Code Blocks (``` ```)
    *   Horizontal Rules (`---`)
    *   Tables (GFM)
    *   Task Lists (`- [x] task`) (GFM)
*   **Syntax Highlighting:** HTML *source code* is beautifully highlighted using Prism.js (Okaidia theme).
*   **Light/Dark Mode:** Toggle between light and dark themes. Your preference is saved in `localStorage`.
*   **Auto-Save:** Your last Markdown input is saved in `localStorage` and restored when you reopen the tool.
*   **Auto-Resizing Input:** The Markdown input area grows automatically as you type.
*   **Utility Buttons:**
    *   Paste Markdown from clipboard.
    *   Copy generated HTML *source code* to clipboard.
    *   Download generated HTML *source code* as a `.html` file.
    *   Clear input, preview, and source code areas.
*   **Responsive Design:** Adapts smoothly to different screen sizes.
*   **Accessibility:** Basic ARIA labels included for better screen reader support.
*   **Modern Look:** Uses the 'Inter' font and clean button styles.

## Technologies Used

*   **HTML5:** Structure of the web page.
*   **CSS3:** Styling, layout (Flexbox), responsive design, and theming (CSS Variables).
*   **Vanilla JavaScript:** All client-side logic, DOM manipulation, event handling, and `localStorage` interactions.
*   **marked.js:** A fast, lightweight Markdown parser library for converting Markdown to HTML.
*   **Prism.js:** A lightweight, extensible syntax highlighter for the HTML output.

## How to Use

1.  Open the `index.html` file in your web browser.
2.  Start typing Markdown text in the left "Markdown Input" textarea.
3.  The right "Output Panel" will show the rendered "Live Preview" by default.
4.  Click the "Source" tab in the Output Panel to view the generated HTML source code, syntax-highlighted. Click "Preview" to switch back.
5.  Use the buttons in the toolbars for actions like pasting, clearing, copying source code, or downloading source code (Copy/Download buttons are in the Output Panel toolbar).
6.  Use the theme toggle button (🌙/☀️) in the header to switch between light and dark modes.

## File Structure

```
.
├── index.html        # Main HTML file
├── style.css         # CSS styles
├── script.js         # JavaScript logic
├── instruction.md    # Original project requirements
└── README.md         # This file
