import React, { useEffect, useState } from 'react';
import { w3cwebsocket as WebSocket } from 'websocket';

function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [client, setClient] = useState(null);

  useEffect(() => {
    const newClient = new WebSocket('ws://localhost:8008/ws?roomID=room1');

    newClient.onopen = () => {
      console.log('WebSocket connected');
    };

    newClient.onmessage = (message) => {
      const parsedMessage = JSON.parse(message.data);
      setMessages((prevMessages) => [...prevMessages, parsedMessage]);
    };

    newClient.onclose = () => {
      console.log('WebSocket disconnected');
    };

    setClient(newClient);

    return () => {
      newClient.close();
    };
  }, []);

  const sendMessage = () => {
    if (inputValue.trim() !== '') {
      client.send(
        JSON.stringify({
          roomID: 'room1',
          text: inputValue,
        })
      );
      setInputValue('');
    }
  };

  return (
    <div>
      <h1>WebSocket Client</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message.text}</li>
        ))}
      </ul>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
