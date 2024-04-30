import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import About from "./components/About";
import Textmodel from "./components/Textmodel";
import Signup from "./components/Signup";
import ResponsiveVideoPlayer from "./components/ResponsiveVideoPlayer";
import Form from "./components/Form";
import NewPage from "./components/NewPage";
import PageNotFound404 from "./components/PageNotFound404";
import MultiCardCarousel from "./components/MultiCardCarousel";
import Curdoperationinform from "./components/Curdoperationinform";
import DocumentTable from "./components/DocumentTable";
import Homepage from "./components/Homepage";
import ProductDetail from "./components/ProductDetail ";
import EcommerceNavbar from "./components/EcommerceNavbar";
import EcommerceCurdoperationinform from './components/EcommerceCurdoperationinform';

function Alert({ message, type }) {
  return (
    <div 
      className={`alert alert-${type}`}
      style={{
        padding: '10px',
        margin: '10px',
        backgroundColor: type === 'success' ? '#28a745' : '#dc3545',
        color: 'white',
        borderRadius: '4px'
      }}
    >
      {message}
    </div>
  );
}

function App() {
  const [mode, setMode] = useState("light");
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    console.log("showAlert called with message:", message, "and type:", type);
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#042743";
      showAlert("Dark mode has been enabled", "success");
      document.title = "TextUtils - Dark Mode";
      setInterval(() => {
        document.title = "TextUtils is Amazing";
      }, 2000);
      setInterval(() => {
        document.title = "Install TextUtils";
      }, 1500);
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
      showAlert("Light mode has been enabled", "success");
    }
  };

  console.log("Current alert state:", alert); // Debugging line

  return (
    <>
      {alert && <Alert message={alert.msg} type={alert.type} />}
    
      {/* Navbar or other layout components can be added here */}
      {/* <button onClick={toggleMode}>Toggle Mode</button> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/ResponsiveVideoPlayer" element={<ResponsiveVideoPlayer />} />
        <Route path="/Textmodel" element={<Textmodel />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/NewPage" element={<NewPage/>} />
        <Route path="/Form" element={<Form />} />
        <Route path="/DocumentTable" element={<DocumentTable />} />
        <Route path="*" element={<PageNotFound404 />} />
        <Route path="/MultiCardCarousel" element={<MultiCardCarousel />} />
        <Route path="/Curdoperationinform" element={<Curdoperationinform />} />
        <Route path="/Homepage" element={<Homepage />} />
        <Route path="/ProductDetail" element={<ProductDetail />} />
        <Route path="/EcommerceNavbar" element={<EcommerceNavbar />} />
        <Route path="/EcommerceCurdoperationinform" element={<EcommerceCurdoperationinform />} />

        
      </Routes>

      {/* Footer or other layout components can be added here */}
    </>
  );
}

export default App;
