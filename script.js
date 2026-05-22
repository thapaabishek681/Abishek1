document.addEventListener('DOMContentLoaded', () => {
    // 1. DYNAMIC CHATBOT INJECTION
    if (!document.querySelector('.chatbot-wrapper')) {
        const botHTML = `
            <div class="chatbot-wrapper">
                <button id="chatbotToggle" class="chatbot-btn">✨ Ask PathPort AI</button>
                <div id="chatbotBox" class="chatbot-box hidden">
                    <div class="chatbot-header">
                        <h3 style="font-size:1.1rem; font-weight:700;">PathPort AI Guide</h3>
                        <button id="closeChat" style="background:none; border:none; color:white; font-size:1.4rem; cursor:pointer;">&times;</button>
                    </div>
                    <div id="chatHistory" class="chat-history">
                        <div class="bot-msg">Hello! I'm your AI travel partner. Ask me about 'Seoul', 'Kathmandu', or 'Kyoto'!</div>
                    </div>
                    <div class="chat-input-area">
                        <input type="text" id="chatInput" placeholder="Type a message..." style="flex:1; padding:0.6rem; background:rgba(0,0,0,0.2); border:1px solid rgba(255,255,255,0.1); border-radius:6px; color:white; margin-right:0.5rem;">
                        <button id="sendChat" class="btn" style="padding:0.6rem 1rem; font-size:0.9rem; box-shadow:none; border-radius:6px;">Send</button>
                    </div>
                </div>
            </div>`;
        document.body.insertAdjacentHTML('beforeend', botHTML);
    }

    // 2. CHATBOT CORE LOGIC
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotBox = document.getElementById('chatbotBox');
    const closeChat = document.getElementById('closeChat');
    const chatInput = document.getElementById('chatInput');
    const sendChat = document.getElementById('sendChat');
    const chatHistory = document.getElementById('chatHistory');

    chatbotToggle.addEventListener('click', () => chatbotBox.classList.toggle('hidden'));
    closeChat.addEventListener('click', () => chatbotBox.classList.add('hidden'));

    sendChat.addEventListener('click', processChatInput);
    chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') processChatInput(); });

    function processChatInput() {
        const text = chatInput.value.trim();
        if (!text) return;

        appendMessage(text, 'user-msg');
        chatInput.value = '';

        setTimeout(() => {
            let reply = "I'm still learning about that place! Try asking me about 'Seoul', 'Kathmandu', or 'Kyoto'.";
            const query = text.toLowerCase();

            if (query.includes('seoul')) {
                reply = "✨ AI Guide: Seoul is fantastic! Tip: Use a Shinhan transport card for seamless subway navigation, and visit Hongdae for nightlife.";
            } else if (query.includes('kathmandu')) {
                reply = "✨ AI Guide: Kathmandu offers rich heritage. Try exploring Thamel for local crafts and visit the ancient monkey temple.";
            } else if (query.includes('kyoto')) {
                reply = "✨ AI Guide: In Kyoto, rent a standard bicycle. It is the absolute prettiest way to see the ancient shrines and avoids all crowd buses!";
            }
            appendMessage(reply, 'bot-msg');
        }, 500);
    }

    function appendMessage(text, className) {
        const msgDiv = document.createElement('div');
        msgDiv.className = className;
        msgDiv.textContent = text;
        chatHistory.appendChild(msgDiv);
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    // 3. SMART BOOKING ENGINE LOGIC (Anita's Role)
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const dateInput = document.getElementById('travelDate').value;
            const dest = document.getElementById('destination').value;
            const bookingMessage = document.getElementById('bookingMessage');

            bookingMessage.className = 'message hidden';

            // Smart Validation
            const today = new Date();
            today.setHours(0,0,0,0);
            if (new Date(dateInput) < today) {
                bookingMessage.textContent = "🤖 AI Validation Error: Departure dates cannot exist in past timelines. Please select a valid date.";
                bookingMessage.className = 'message error';
                return;
            }

            // Storage Save Execution
            const record = { name, email, destination: dest, date: dateInput, timestamp: new Date().toISOString() };
            localStorage.setItem('pathport_booking', JSON.stringify(record));

            bookingMessage.textContent = `🎉 System Confirmed: Excellent choice, ${name}! Your smart schedule to ${dest} is securely logged.`;
            bookingMessage.className = 'message success';
            bookingForm.reset();
        });
    }
});