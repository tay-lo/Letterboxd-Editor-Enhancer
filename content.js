// content.js

// Find the Letterboxd editor element
const editor = document.getElementById('frm-review');

// Function to insert an anchor link
function insertAnchorLink() {
    const linkUrl = prompt("Enter the URL for the anchor link:");
    if (linkUrl) {
        const anchorLink = document.createElement('a');
        anchorLink.href = linkUrl;
        anchorLink.textContent = "Link Text";
        editor.appendChild(anchorLink);
    }
}

// Function to toggle bold style
function toggleBold() {
    document.execCommand('bold');
}

// Function to toggle italic style
function toggleItalic() {
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
        textarea.selectionStart = textarea.selectionEnd = cursorPos + 4; // Adjust this value if needed
    }

    // Focus back on the textarea
    textarea.focus();
}

function insertHeading(level) {
    const heading = document.createElement('h' + level);
    heading.textContent = "Heading Text";
    editor.appendChild(heading);
}

function insertList(type) {
    const list = document.createElement(type);
    const listItem = document.createElement('li');
    listItem.textContent = "List Item";
    list.appendChild(listItem);
    editor.appendChild(list);
}

function insertImage() {
    const imageUrl = prompt("Enter the URL of the image:");
    if (imageUrl) {
        const image = document.createElement('img');
        image.src = imageUrl;
        editor.appendChild(image);
    }
}

function insertHorizontalRule() {
    const hr = document.createElement('hr');
    editor.appendChild(hr);
}

function insertDiv() {
    const div = document.createElement('div');
    div.textContent = "Div Content";
    editor.appendChild(div);
}

function insertParagraph() {
    const paragraph = document.createElement('p');
    paragraph.textContent = "Paragraph Text";
    editor.appendChild(paragraph);
}

///////////////////CREATE BUTTONS///////////////////

// Create buttons dynamically and insert them after the target element
function createAndInsertButton(text, clickHandler) {
    const button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', clickHandler);

    // Find the target element (textarea with ID "frm-review")
    const targetElement = document.getElementById('frm-review');

    // Find the parent element of the target element (form-row div)
    const parentElement = targetElement.parentElement;

    // Insert the button after the target element
    parentElement.insertBefore(button, targetElement.nextSibling);
}

// Create button for anchor link
createAndInsertButton("Add Anchor Link", insertAnchorLink);

// Create buttons for toggling bold and italic styles
createAndInsertButton("Bold", toggleBold);
createAndInsertButton("Italic", toggleItalic);

// Create buttons for inserting headings
//for (let i = 1; i <= 6; i++) {
//    createAndInsertButton("Heading " + i, () => insertHeading(i));
//}

// Create buttons for inserting lists
//createAndInsertButton("Insert Unordered List", () => insertList('ul'));
//createAndInsertButton("Insert Ordered List", () => insertList('ol'));

// Create button for inserting images
//createAndInsertButton("Insert Image", insertImage);

// Create button for inserting horizontal rule
//createAndInsertButton("Insert Horizontal Rule", insertHorizontalRule);

// Create button for inserting a div
//createAndInsertButton("Insert Div", insertDiv);

// Create button for inserting a paragraph
//createAndInsertButton("Insert Paragraph", insertParagraph);

// Listen for changes in the text area
document.getElementById('frm-review').addEventListener('input', function(event) {
    // Send a message to the background script to trigger content script injection
    chrome.runtime.sendMessage({ action: "injectContentScript" });
});