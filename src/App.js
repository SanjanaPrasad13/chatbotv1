// App.js

import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import InputBox from './components/InputBox';
import { Container, Paper, Typography, Grid } from '@mui/material';
import './App.css';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [currentOption, setCurrentOption] = useState('All'); // Default option
  const [inputValue, setInputValue] = useState(''); // Added state for input value
  const [isLoading, setIsLoading] = useState(false);
  const options = ["Chit Chat",
    "Novel"]; // Your topics

  const handleSendMessage = (messageText) => {
    if (messageText.trim()) {
      const messagePayload = {
        topic: currentOption, // Include the selected topic
        message: messageText
      };
      setMessages(prevMessages => [...prevMessages, { text: messageText, sender: 'user' }]);
      setIsLoading(true);
      // Fetch call to the Flask server
      console.log('Sending to backend:', messagePayload);
      fetch('http://127.0.0.1:5000/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messagePayload) // Send the payload as JSON
      })
      .then(response => response.json())
      .then(data => {
        setMessages(prevMessages => [...prevMessages, { text: data.text, sender: 'bot' }]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsLoading(false);
      });
      setInputValue(''); // Clear the input after sending the message
    }
  };

  const handleOptionSelect = (option) => {
    setCurrentOption(option); // Update the current option
  };

  return (
    <Container maxWidth="xl" style={{ padding: 0 }}>
      <div className="header">
        <Typography variant="h4" align="center" style={{ color: 'white' }} fontFamily={"Georgia"}>
          Team John Snow
        </Typography>
      </div>
      <Paper style={{ height: '100vh', display: 'flex', flexDirection: 'row' }}>
        <Grid container style={{ height: '100%' }}>
          <Grid item xs={9}>
            <ChatWindow messages={messages} isLoading={isLoading}/>
            <InputBox onSendMessage={handleSendMessage} inputValue={inputValue} setInputValue={setInputValue} />
          </Grid>
          <Grid item xs={3} style={{ overflowY: 'auto' }}>
            <div className="options-panel">
              {options.map((option, index) => (
                <div // Opening div tag was missing here
                  key={index} // `key` prop should be here
                  className={`option ${currentOption === option ? 'selected' : ''}`}
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default App;
