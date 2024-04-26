// import { useState } from "react";

// export const toggleMode = () => {
//     const showAlert = (message, type) => {
//         console.log("showAlert called with message:", message, "and type:", type);
//         setAlert({
//           msg: message,
//           type: type,
//         });
//         setTimeout(() => {
//           setAlert(null);
//         }, 1500);
//     };

//     if (mode === "light") {
//       setMode("dark");
//       document.body.style.backgroundColor = "#042743";
//       showAlert("Dark mode has been enabled", "success");
//       document.title = "TextUtils - Dark Mode";
//       setInterval(() => {
//         document.title = "TextUtils is Amazing";
//       }, 2000);
//       setInterval(() => {
//         document.title = "Install TextUtils";
//       }, 1500);
//     } else {
//       setMode("light");
//       document.body.style.backgroundColor = "white";
//       showAlert("Light mode has been enabled", "success");
//     }
//   };