import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Timeline } from 'primereact/timeline';
import React, { useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://locahost:3001"); // connect to server

function App() {
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { author: "Bot", message: "Hello" },
  ]);

  socket.on("chat", (arg) => setMessages([...messages, arg]));
  
  const addMessage = () => {
    const send = { author, message }; // using the shorthand, else { author: author, message: message }
    setMessages([...messages, send]);
    setMessage("");
    socket.emit("chat", send); // emit the message back to the server to the channel "chat"
  };
  return (
    <div>
      <div className="p-col-12">
        <div className="p-inputgroup">
          <span className="p-inputgroup-addon">
            <i className="pi pi-user"></i>
          </span>
          <InputText placeholder="Name" value={author} onChange={(e) => setAuthor(e.target.value)}/>
          <InputText placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)}/>
          <Button label="Send" onClick={() => addMessage()}/>
        </div>
      </div> 

        <div className="card">
          <h5>Conversation</h5>
          <Timeline value={messages} opposite = {(item) => item.author} content={ (item) => (<small className="p-text-secondary">{item.message}</small>)} />
        </div>
    </div>
  );
}

export default App;
