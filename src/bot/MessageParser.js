import axios from "axios";
import { useState } from "react";

let result;
// bot/MessageParser.js
class MessageParser {
  
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }
  //여기서 post를 통해 보낸다. 
   async parse(message) {
    console.log(message);
    try {
      const response=await axios.post('https://y241z1txmd.execute-api.ap-northeast-2.amazonaws.com/default/TestChoi', {
        "first_name": `${message}`,
        "last_name": "어떡게 하지"
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
      })
      result = response;
      console.log(response);
    }catch(error){
      console.log(error);
    }
  };
  
}
  

export default MessageParser;
