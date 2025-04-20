import { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = async () => {
    const userMessage = input;
    setMessages([...messages, { sender: 'user', text: userMessage }]);
    setInput('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await res.json();
    setMessages((prev) => [...prev, { sender: 'bot', text: data.reply }]);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          width: 60,
          height: 60,
          borderRadius: '50%',
          backgroundColor: '#4CAF50',
          color: 'white',
          fontSize: 30,
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
        }}
      >
        💬
      </button>

      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: 90,
          right: 20,
          width: 300,
          height: 400,
          background: 'white',
          border: '1px solid #ccc',
          borderRadius: 10,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
          overflow: 'hidden',
          zIndex: 1000
        }}>
          <div style={{ flex: 1, padding: 10, overflowY: 'auto' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                <p><strong>{msg.sender === 'user' ? 'Tú' : 'GPT'}:</strong> {msg.text}</p>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', borderTop: '1px solid #ccc' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{ flex: 1, padding: 10, border: 'none' }}
              placeholder="Escribe tu mensaje..."
            />
            <button onClick={sendMessage} style={{ padding: '10px 15px', background: '#4CAF50', color: 'white', border: 'none' }}>
              Enviar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
