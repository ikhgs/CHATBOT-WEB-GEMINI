const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');

async function sendMessage() {
    const message = userInput.value;
    if (!message) return;

    // Afficher le message de l'utilisateur
    appendMessage('User', message);
    userInput.value = '';

    // Envoyer la requête à l'API Gemini
    const response = await fetch('https://chatbot-web-gemini.onrender.com/api/gemini', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: message,
            customId: '12345',  // Exemple d'ID utilisateur
        }),
    });

    const data = await response.json();

    // Afficher la réponse du chatbot
    appendMessage('Bot', data.message);
}

function appendMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = `${sender}: ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
