import axios from "axios";
import { useState } from "react"
import { ReactSimpleChatbot } from "react-simple-chatbot";
export default function Main() {
    const [postcontent,setPutContent] = useState();
    const [getcontent,setGetContent] = useState();
    const get= async ()=>{
        //setGetContent('hello');
        await axios.get('https://y241z1txmd.execute-api.ap-northeast-2.amazonaws.com/default/TestChoi ',{
            headers:{
                'Accept':'application.json'
            }
        })
        .then(response=>{
            setGetContent(response.data.body);
            console.log(response);
        })
        .catch(error=>{
            console.log(error);
        })
    }
    
    const sendDataToLambda =  () => {
        axios.post('https://y241z1txmd.execute-api.ap-northeast-2.amazonaws.com/default/TestChoi',{
            "first_name":`${postcontent}`,
            "last_name":"어떡게 하지"
        }, {
            headers:{
                'Content-Type':'application/json'
            },
        })
        .then(response=>{
            setGetContent(response.data.body);
            console.log(response);
        })
        .catch(error=>{
            console.log(error);
        })
      };

    return (
        <div className="main-Wrap">
            <div className="get-wrap">
                <p>받아온 정보</p>
                <input type="text" value={getcontent}></input>
                <button onClick={get}>받아오기</button>
            </div>
            <div className="input-Wrap">
                <p>입력</p>
                <input type="text" onChange={(e)=>{setPutContent(e.target.value)}}></input>
                <button onClick={sendDataToLambda}>전송</button>
            </div>
        </div>
    )
}

