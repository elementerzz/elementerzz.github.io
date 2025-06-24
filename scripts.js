Fancybox.bind("[data-fancybox]", {
    // Your custom options go here.
    // For example, to enable fullscreen and thumbs, you might use:
    // buttons: ["zoom", "slideShow", "fullScreen", "thumbs", "close"]
});

/**
 * Displays the contact modal.
 */
function showContactModal() {
    const modal = document.getElementById('contactModal');
    modal.style.display = 'flex'; // Use flex to center the modal
}

/**
 * Hides the contact modal.
 */
function hideContactModal() {
    const modal = document.getElementById('contactModal');
    modal.style.display = 'none';
}

/**
 * Copies the Discord username to the clipboard and shows a success message.
 */
function copyDiscordUsername() {
    const username = "elementerzz"; // Your Discord username
    const copyMessage = document.getElementById('discordCopyMessage');

    // Use the Clipboard API if available and secure context, fallback to execCommand
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(username)
            .then(() => {
                copyMessage.textContent = 'Copied!';
                copyMessage.classList.add('show');
                setTimeout(() => {
                    copyMessage.classList.remove('show');
                }, 1500); // Hide message after 1.5 seconds
            })
            .catch(err => {
                console.error('Failed to copy text using Clipboard API: ', err);
                // Fallback to execCommand if Clipboard API fails or is not available
                fallbackCopyTextToClipboard(username, copyMessage);
            });
    } else {
        // Fallback for older browsers or insecure contexts
        fallbackCopyTextToClipboard(username, copyMessage);
    }
}

/**
 * Fallback function for copying text to clipboard using document.execCommand.
 * @param {string} textToCopy The text to copy.
 * @param {HTMLElement} messageElement The element to display the message.
 */
function fallbackCopyTextToClipboard(textToCopy, messageElement) {
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        const msg = successful ? 'Copied!' : 'Failed to copy!';
        messageElement.textContent = msg;
        messageElement.classList.add('show');
        setTimeout(() => {
            messageElement.classList.remove('show');
        }, 1500);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
        messageElement.textContent = 'Copy failed!';
        messageElement.classList.add('show');
        setTimeout(() => {
            messageElement.classList.remove('show');
        }, 1500);
    }

    document.body.removeChild(textArea);
}


// Add event listeners once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add 'loaded' class to body for fade-in effect
    document.body.classList.add('loaded');

    // Attach event listener to the "Hire Me" button
    document.getElementById('hireMeBtn').addEventListener('click', showContactModal);

    // Close modal when close button is clicked
    document.querySelector('.close-button').addEventListener('click', hideContactModal);

    // Close modal when clicking outside of the modal content
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('contactModal');
        if (event.target == modal) {
            hideContactModal();
        }
    });

    // Attach event listener for the Discord Copy button
    document.getElementById('copyDiscordBtn').addEventListener('click', copyDiscordUsername);
});
