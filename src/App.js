import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Timeline } from 'primereact/timeline';
import { useState } from "react";

function App() {
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { author: "Bot", message: "Hello" },
  ]);

  const addMessage = () => {
    const send = { author, message }; // using the shorthand, else { author: author, message: message }
    setMessages([...messages, send]);
    setMessage("");
    console.log(send);
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
    </div>
  );
}

export default App;
