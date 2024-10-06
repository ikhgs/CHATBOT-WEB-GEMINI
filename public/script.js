document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

function sendMessage() {
  const userInput = document.getElementById('user-input').value;
  if (userInput.trim() === '') return;

  appendMessage(userInput, 'user-message');
  
  // Appel à l'API
  fetch(`https://discussion-continue-gem29.vercel.app/api?ask=${encodeURIComponent(userInput)}`)
    .then(response => response.json())
    .then(data => {
      const botResponse = data.response;
      appendMessage(botResponse, 'bot-message');
    })
    .catch(error => {
      appendMessage("Erreur : Impossible de contacter le serveur", 'bot-message');
    });

  document.getElementById('user-input').value = '';
}

function appendMessage(message, className) {
  const chatBox = document.getElementById('chat-box');
  const messageDiv = document.createElement('div');
  messageDiv.classList.add(className);
  messageDiv.textContent = message;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight; // Faire défiler automatiquement vers le bas
}
