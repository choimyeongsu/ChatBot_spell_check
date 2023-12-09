import React, { createContext, useState } from 'react';
import Main from './pages/Main';
import "react-chatbot-kit/build/main.css";
import ChatBot from './ChatBot';
import "./font.css";


function App() {
  
  return (
    <div className='Wrap'>
      {/* <Main/> */}
      <ChatBot/>
    </div>
  );
}

export default App;
