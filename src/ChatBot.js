import React, { useState, useEffect } from "react";
import axios from "axios";

const ChatBot = () => {
	const [userInput, setUserInput] = useState("");
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		// 초기 챗봇 메시지
		setMessages([{ type: "bot", text: "안녕하세요! 맞춤법검사를 원하는 문장을 입력하세요" }]);
	}, []);

	const handleUserInput = (e) => {
		setUserInput(e.target.value);
	};

	const handleSubmit = async () => {
		// 사용자 입력 메시지 추가
		setMessages((prevMessages) => [...prevMessages, { type: "user", text: userInput }]);
		console.log(userInput);
		try {
			// 사용자 입력을 서버에 POST 요청으로 전송
			const postResponse = await axios.post(
				"https://y241z1txmd.execute-api.ap-northeast-2.amazonaws.com/default/TestChoi",
				{
					first_name: `${userInput}`,
					last_name: ".",
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			console.log(postResponse);
			//console.log(postResponse);
			console.log(postResponse.data.body);
			let result = "";
			//맞춤법 교정 메시지
			if (postResponse.data.body.includes("suggestions")) {
				let strarr1 = postResponse.data.body.split(",");
				//console.log(strarr1);
				let strarr2 = strarr1[1].split("[");
				//console.log(strarr2);
				let strarr3 = strarr2[1].split('"');
				//console.log(strarr3);
				result = strarr3[1];
			}
			//맞춤법 교정이 필요없는 메시지
			else {
				//console.log("else");
				let correct1 = postResponse.data.body.split(":");
				//console.log(correct1);
				let correct2 = correct1[1].split('"');
				//console.log(correct2);
				result = correct2[1];
				// '\n' 자르기
				result = result.slice(0, -2);
			}

			//console.log("result : "+result);
			setMessages((prevMessages) => [...prevMessages, { type: "bot", text: result }]);
		} catch (error) {
			console.log(error);
			// 에러 메시지 추가
			setMessages([...messages, { type: "bot", text: "죄송합니다. 오류가 발생했습니다." }]);
		}
		// 사용자 입력 초기화
		setUserInput("");
	};

	return (
		<div className="chatbot-wrap">
			<div className="chat-container">
				{messages.map((message, index) => (
					<div key={index} style={{ marginBottom: "30px", textAlign: message.type === "bot" ? "left" : "right" }}>
						{message.type === "bot" ? (
							<p
								className="copy-span"
								onClick={() => {
									navigator.clipboard.writeText(message.text);
								}}
							>
								복사하기
							</p>
						) : null}
						<span
							className="chat-span"
							style={{
								background: message.type === "bot" ? "rgb(242, 247, 255)" : "rgb(100, 70, 255)",
								color: message.type === "bot" ? "black" : "white",
							}}
						>
							<span> {message.text} </span>
							{/* {message.type==='bot'? <p className='copy-span'>복사하기</p>:null} */}
						</span>
					</div>
				))}
			</div>
			<div className="user-input-wrap">
				<textarea
					placeholder="내용을 입력해주세요"
					className="user-input"
					type="text"
					value={userInput}
					onKeyUp={() => {
						if (userInput) {
							if (window.event.keyCode == 13) {
								handleSubmit();
								setUserInput("");
							}
						}
					}}
					onChange={handleUserInput}
				/>
				<button
					className="post-btn"
					onClick={() => {
						if (userInput) handleSubmit();
					}}
				>
					전송
				</button>
				{/* <button className='reget-btn' onClick={get}>다시요청</button> */}
			</div>
		</div>
	);
};

export default ChatBot;
