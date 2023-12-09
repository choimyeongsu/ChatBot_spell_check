import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatBot = () => {
    const [userInput, setUserInput] = useState('');
    const [messages, setMessages] = useState([]);
 
    useEffect(() => {
        // 초기 챗봇 메시지
        setMessages([
            { type: 'bot', text: '안녕하세요! 맞춤법검사를 원하는 문장을 입력하세요' }
        ]);
    }, []);

    const get = async () => {
        await axios.get('https://y241z1txmd.execute-api.ap-northeast-2.amazonaws.com/default/TestChoi ', {
            headers: {
                'Accept': 'application.json'
            }
        })
            .then(response => {
                setMessages([...messages, { type: 'bot', text: response.data.body }]);
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleUserInput = (e) => {
        setUserInput(e.target.value);
    };

    const handleSubmit = async () => {
        // 사용자 입력 메시지 추가
        setMessages(prevMessages => [...prevMessages, { type: 'user', text: userInput }]);
        console.log(userInput);
        try {
            // 사용자 입력을 서버에 POST 요청으로 전송
            const postResponse = await axios.post('https://y241z1txmd.execute-api.ap-northeast-2.amazonaws.com/default/TestChoi', {
                "first_name": `${userInput}`,
                "last_name": "어떡게 하지"
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            console.log(postResponse.data);
            let strarr = postResponse.data.body.split(':');
            let strarr2 = strarr[1].split('"');
            let result = strarr2[1];
            setMessages(prevMessages => [...prevMessages, { type: 'bot', text: result }]);
        } catch (error) {
            console.error('Error:', error);
            // 에러 메시지 추가
            setMessages([...messages, { type: 'bot', text: '죄송합니다. 오류가 발생했습니다.' }]);
        }
        // 사용자 입력 초기화
        setUserInput('');
    };

    return (
        <div className='chatbot-wrap'>
            <div className='chat-container'>
                {messages.map((message, index) => (
                    <div key={index} style={{ marginBottom: '30px', textAlign: message.type === 'bot' ? 'left' : 'right' }}>
                       {message.type==='bot'? <p className='copy-span' onClick={()=>{
                        navigator.clipboard.writeText(message.text);
                       }}>복사하기</p>:null}
                        <span className='chat-span' style={{ background: message.type === 'bot' ? 'rgb(242, 247, 255)' : 'rgb(100, 70, 255)', color: message.type === 'bot' ? 'black' : 'white' }}>
                            <span> {message.text} </span>
                            {/* {message.type==='bot'? <p className='copy-span'>복사하기</p>:null} */}
                        </span>
                        
                        
                    </div>
                ))}
            </div>
            <div className='user-input-wrap'>
                <textarea placeholder='내용을 입력해주세요' className='user-input' type="text" value={userInput} onKeyUp={() => {
                    if (userInput) {
                        if (window.event.keyCode == 13) {
                            handleSubmit();
                            setUserInput('');
                        }
                    }
                }} onChange={handleUserInput} />
                <button className='post-btn' onClick={() => {
                    if (userInput) handleSubmit()
                }}>전송</button>
                {/* <button className='reget-btn' onClick={get}>다시요청</button> */}
            </div>
        </div>
    );
};

export default ChatBot;