document.getElementById('send-btn').addEventListener('click', async () => {
    const userInput = document.getElementById('user-input').value;
    const imageInput = document.getElementById('image-input').files[0];

    if (!userInput && !imageInput) {
        alert("Please provide a message or an image.");
        return;
    }

    // Add user message to the chat box
    addMessageToChat('user', userInput || '[Image]');

    // Prepare form data for API request
    const formData = new FormData();
    formData.append('prompt', userInput);
    formData.append('customId', 'user123'); // You can dynamically assign custom IDs per user
    if (imageInput) {
        const imageBlob = await fileToBase64(imageInput);
        formData.append('link', imageBlob);  // Use base64 encoding for the image
    }

    // Send request to the API
    const response = await fetch('https://gemini-sary-prompt-espa-vercel-api.vercel.app/api/gemini', {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            prompt: userInput,
            customId: 'user123',
            link: imageInput ? URL.createObjectURL(imageInput) : ''
        })
    });

    // Handle API response
    const result = await response.json();
    const botMessage = result.message;

    // Add bot message to the chat box
    addMessageToChat('bot', botMessage);

    // Clear input fields
    document.getElementById('user-input').value = '';
    document.getElementById('image-input').value = '';
});

// Function to add messages to the chat box
function addMessageToChat(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Utility function to convert image to base64 (not mandatory if you are passing URLs)
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
