const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');

async function sendMessage() {
    const message = userInput.value;
    if (!message) return;

    // Afficher le message de l'utilisateur
    appendMessage('Vous', message);
    userInput.value = '';

    try {
        // Envoyer la requête à l'API Gemini
        const response = await fetch('https://gemini-sary-prompt-espa-vercel-api.vercel.app/api/gemini', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: message,
                customId: 'user123',  // Vous pouvez utiliser un identifiant unique par utilisateur
            }),
        });

        if (!response.ok) {
            throw new Error(`Erreur du serveur: ${response.status}`);
        }

        const data = await response.json();

        // Afficher la réponse du chatbot
        appendMessage('Bot', data.message);

    } catch (error) {
        console.error('Erreur lors de la requête:', error);
        appendMessage('Bot', 'Désolé, une erreur est survenue.');
    }
}

function appendMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = `${sender}: ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
