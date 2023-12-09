// bot/config.js
import { createChatBotMessage } from "react-chatbot-kit";

const config = {
  initialMessages: [
    createChatBotMessage(
      "안녕하세요! 교정을 원하시는 문장을 입력해주세요."
    ),
  ],
};
console.log(config);
export default config;