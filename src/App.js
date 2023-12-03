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
  const options = ["chitchat", "novel", "all"]; // Your topics

  const handleSendMessage = async (messageText) => {
    if (messageText.trim()) {
      const messagePayload = {
        "query_type": currentOption,
        "question": messageText
      };
      setMessages(prevMessages => [...prevMessages, { text: messageText, sender: 'user' }]);
      setIsLoading(true);

      try {
        const response = await fetch("http://34.125.9.200:9999/execute_query", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(messagePayload),
        });
        const data = await response.json()
        setMessages(prevMessages => [...prevMessages, { text: data['answer'], sender: 'bot' }]);
      } catch (error) {
        console.error('Error:', error);
        setMessages(prevMessages => [...prevMessages, { text: 'Error fetching response', sender: 'bot' }]);
      } finally {
        setIsLoading(false);
        setInputValue(''); // Clear the input after sending the message
      }
    }
  };

  const handleOptionSelect = (option) => {
    setCurrentOption(option); // Update the current option
  };

  return (
    <Container maxWidth="xl" style={{ padding: 0 }}>
      <div className="header">
        <Typography variant="h4" align="center" style={{ color: 'white' }} fontFamily={"Georgia"}>
          Chatbot
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
                <div
                  key={index}
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