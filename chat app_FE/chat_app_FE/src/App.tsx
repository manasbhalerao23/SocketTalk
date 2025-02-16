import { useEffect, useState } from "react"


function App() {

  const [messages,setmessages] = useState(["hi", "hiii"]);

  useEffect(() => {
    const ws = new WebSocket("http://localhost:3000");
    ws.onmessage = (event) => {
      setmessages(m => [...m,event.data]);
    }
  },[]);

  return (
    <div className="flex flex-col h-screen bg-black">
      <div className="h-[95vh] ">
        {messages.map(message => <div className=" m-9"> 
          <span className="bg-white text-black rounded p-4">
          {message} 
          </span>
          </div>)}
      </div>
        <div className="p-4 w-full bg-white flex rounded-3xl gap-2">
          <input type="text" className="placeholder-slate-500 flex-1" placeholder="write text here"></input>
          <button className="bg-indigo-600 rounded-xl text-white p-2">Send message</button>
        </div>
    </div>
  )
}

export default App
