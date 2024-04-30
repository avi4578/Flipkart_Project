import React, { useState } from 'react'
import Navbar from './Navbar';
import Alert from './Alert';
import TextForm from './TextForm'

function Textmodel() {
  const [mode, setMode] = useState("light"); // Whether dark mode is enabled or not

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type, // Changed 'Type' to 'type' to match the state key
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#042743";
      showAlert("Dark mode has been enabled", "success"); // Corrected the message
      document.title = "TextUtils - Dark Mode";
      setInterval(() => {
        document.title = "TextUtils  is Amazing";
      }, 2000);
      setInterval(() => {
        document.title = "Install TextUtils";
      }, 1500);
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
      showAlert("Light mode has been enabled", "success"); // Corrected the message
    }
  };


  return (
    <div>
          <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode} />
      <div className=" mx-0 bg-light" style={{ width: "100vw",margintop: "141px"}}>
      <TextForm showAlert={showAlert} heading="Enter the text to Analyze below" mode={mode}/>
      </div>
    </div>
  )
}

export default Textmodel
