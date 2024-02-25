// content.js

// Find the Letterboxd editor element
const editor = document.getElementById('frm-review');

// Create a new container element for your buttons
const buttonContainer = document.createElement('div');
buttonContainer.className = 'button-container';

// Function to insert an anchor link
function addAnchorLink(event) {
    event.preventDefault();
    console.log("Add Anchor Link clicked!");
    const textarea = document.getElementById('frm-review');

    // Check if there's any text selected
    const selection = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);

    let anchorLink;

    let linkUrl = prompt("Enter the URL for the anchor link:");
    if (linkUrl && isValidURL(linkUrl)) {
        // Add protocol if missing
        if (!/^https?:\/\//i.test(linkUrl)) {
            linkUrl = 'https://' + linkUrl;
        }

        const cursorPos = textarea.selectionStart;
        const textBeforeCursor = textarea.value.substring(0, cursorPos);
        const textAfterCursor = textarea.value.substring(cursorPos);

        if (selection) {
            anchorLink = `<a href="${linkUrl}">${selection}</a>`;
            textarea.setRangeText(`${anchorLink}`);

        } else {
            anchorLink = `<a href="${linkUrl}">Link Text</a>`;
            textarea.value = `${textBeforeCursor}${anchorLink}${textAfterCursor}`;
        }

        // Set the cursor position after the inserted anchor link
        textarea.selectionStart = textarea.selectionEnd = cursorPos + anchorLink.length;
        
    } else if (linkUrl) {
        alert("Invalid URL. Please enter a valid URL.");
    }

    // Focus back on the textarea
    textarea.focus();
}

// Function to validate URL
function isValidURL(url) {
    // Add protocol if missing
    if (!/^https?:\/\//i.test(url)) {
        url = 'https://' + url;
    }

    // Validate URL
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return pattern.test(url);
}

// Function to toggle bold style
function toggleBold(event) {
    event.preventDefault();
    console.log("Bold clicked!");
    const textarea = document.getElementById('frm-review');

    // Check if there's any text selected
    const selection = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);

    // Check if there's a selection
    if (selection) {
        // Wrap the selected text with <strong> tags for bold style
        textarea.setRangeText(`<strong>${selection}</strong>`);
    } else {
        // Insert <strong> tags at the cursor position
        const cursorPos = textarea.selectionStart;
        const textBeforeCursor = textarea.value.substring(0, cursorPos);
        const textAfterCursor = textarea.value.substring(cursorPos);

        textarea.value = `${textBeforeCursor}<strong></strong>${textAfterCursor}`;

        // Set the cursor position inside the <strong> tags
        textarea.selectionStart = textarea.selectionEnd = cursorPos + 8; // Adjust this value if needed
    }

    // Focus back on the textarea
    textarea.focus();
}

// Function to toggle italic style
function toggleItalic(event) {
    event.preventDefault();
    console.log("Italic clicked!");
    const textarea = document.getElementById('frm-review');

    // Check if there's any text selected
    const selection = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);

    // Check if there's a selection
    if (selection) {
        // Wrap the selected text with <em> tags for italic style
        textarea.setRangeText(`<em>${selection}</em>`);
    } else {
        // Insert <em> tags at the cursor position
        const cursorPos = textarea.selectionStart;
        const textBeforeCursor = textarea.value.substring(0, cursorPos);
        const textAfterCursor = textarea.value.substring(cursorPos);

        textarea.value = `${textBeforeCursor}<em></em>${textAfterCursor}`;

        // Set the cursor position inside the <em> tags
        textarea.selectionStart = textarea.selectionEnd = cursorPos + 4; 
    }

    // Focus back on the textarea
    textarea.focus();
}

// Function to toggle blockquote
function insertBlockquote(event) {
    event.preventDefault();
    console.log("Blockquote clicked!");
    const textarea = document.getElementById('frm-review');

    // Check if there's any text selected
    const selection = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);

    // Check if there's a selection
    if (selection) {
        // Wrap the selected text with <em> tags for italic style
        textarea.setRangeText(`<blockquote>${selection}</blockquote>`);
    } else {
        const cursorPos = textarea.selectionStart;
        const textBeforeCursor = textarea.value.substring(0, cursorPos);
        const textAfterCursor = textarea.value.substring(cursorPos);

        textarea.value = `${textBeforeCursor}<blockquote></blockquote>${textAfterCursor}`;

        // Set the cursor position inside the <blockquote> tags
        textarea.selectionStart = textarea.selectionEnd = cursorPos + 12;
    }

    // Focus back on the textarea
    textarea.focus();
}

///////////////////CREATE BUTTONS///////////////////

// Create buttons dynamically and insert them after the target element
function createAndInsertButton(text, clickHandler) {
    const button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', clickHandler);
    button.classList.add('button-container');

    // Set styles for the button
    button.style.backgroundColor = '#456';
    button.style.color = '#9ab';
    button.style.padding = '8px 16px';
    button.style.border = 'none';
    button.style.borderRadius = '4px';
    button.style.cursor = 'pointer';
    button.style.fontFamily = 'Graphik-Semibold-Web, sans-serif';
    button.style.fontWeight = '400';
    button.style.textTransform = 'uppercase';
    button.style.letterSpacing = '0.077em';
    button.style.lineHeight = '17px';
    button.style.textDecoration = 'none';
    button.style.transition = 'color 0.3s';

    // Hover effect
    button.addEventListener('mouseover', function() {
        button.style.color = '#fff';
    });

    button.addEventListener('mouseout', function() {
        button.style.color = '#9ab';
    });

    buttonContainer.appendChild(button);

    // Find the target element (textarea with ID "frm-review")
    const targetElement = document.getElementById('frm-review');

    // Find the parent element of the target element (form-row div)
    const parentElement = targetElement.parentElement;

    // Insert the button after the target element
    parentElement.insertBefore(button, targetElement.nextSibling);
}

// Create button for anchor link
createAndInsertButton("Add Anchor Link", (event) => addAnchorLink(event), buttonContainer);

// Create button for Blockquote
createAndInsertButton("Blockquote", (event) => insertBlockquote(event), buttonContainer);

// Create buttons for toggling bold
createAndInsertButton("Bold", (event) => toggleBold(event), buttonContainer);

// Create buttons for toggling italic
createAndInsertButton("Italic", (event) => toggleItalic(event), buttonContainer);

// Listen for changes in the text area
document.getElementById('frm-review').addEventListener('input', function(event) {
    // Send a message to the background script to trigger content script injection
    chrome.runtime.sendMessage({ action: "injectContentScript" });
});