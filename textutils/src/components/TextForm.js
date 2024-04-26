    import React, {useState} from 'react'
    import jsPDF from 'jspdf';
    import '../Textmodel.css'; // Import the CSS file


    export default function TextForm(props) {
        const [text, setText] = useState('');
        const [count,setCount] = useState(0);

        const handleUpClick = ()=>{
            let newText = text.toUpperCase();
            setText(newText)
            props.showAlert("Converted to uppercase!", "success");
        }

        const handleLoClick = ()=>{ 
            let newText = text.toLowerCase();
            setText(newText)
        }

        const handleClearClick = ()=>{ 
            let newText = '';
            setText(newText)
        }

        const handleOnChange = (event)=>{
            // console.log("On change");\
            const val = event.target.value.trimStart();
            setText(val)
        }

        const SpecialCharValidate = (e)=>{
            console.log(e.keyCode);
            let spchar =  /[$&+,:;=?@#|'<>.^*()%!-]$/;
            if(spchar.test(text)){
                alert('Special Char Not Allowed');
                setText('');
            }
            else if(e.keyCode != 32){
                setCount(count+1);
            }
            else{
                //console.log('Allowed');
                //setCount(count+1);
            }
        }

        const handleCopy = () => {
            console.log("I am copy");
            var text = document.getElementById("myBox");
            text.select();
            navigator.clipboard.writeText(text.value);
        }

        const handleExtraSpaces = () => {
            let newText = text.split(/[ ]+/);
            setText(newText.join(" "))
        }

        const handleSpeechToText = () => {
            const recognition = new window.webkitSpeechRecognition(); // For Safari
            //const recognition = new window.SpeechRecognition(); // For other browsers

            recognition.lang = 'en-US';
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setText(transcript);
            };

            recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
            };

            recognition.start();
        };


        const handleConvertToPDF = () => {
            let doc = new jsPDF();
            doc.text(text, 10, 10);
            doc.save('text_to_pdf.pdf');
        };

        const handleCapitalize=()=>{
            let newtext = text.charAt(0).toUpperCase() + text.slice(1);
            setText(newtext)
        }

        

        const downloadTxtFile = () => {
            // text content
            const texts = [text];
            // file object
            const file = new Blob(texts, { type: 'text/plain' });
            // anchor link
            const element = document.createElement("a");
            element.href = URL.createObjectURL(file);
            element.download = "text.txt"; // Specify the filename here
            // simulate link click
            document.body.appendChild(element); // Required for this to work in FireFox
            element.click();
        
            // Remove the anchor element after the download
            setTimeout(() => {
            document.body.removeChild(element);
            URL.revokeObjectURL(element.href);
            }, 100);
        }
        

         
        // text = "new text"; // Wrong way to change the state
        // setText("new text"); // Correct way to change the state

        const handleConvertToWords = () => {
            const words = text.trim().split(/\s+/).filter(Boolean); // Split text by spaces and filter out empty strings
            props.showAlert(`The text contains ${words.length} words.`, "info");
        };


        return (
            <>
            <div className="container" style={{color: props.mode==='dark'?'white':'#042743',width:"100vw", marginTop:'80px'}}> 
                    <h1>{props.heading}</h1>
                    <div className="mb-3"> 
                    <textarea className="form-control" value={text} onChange={handleOnChange} onKeyUp={SpecialCharValidate} style={{backgroundColor: props.mode==='dark'?'grey':'white', color: props.mode==='dark'?'white':'#042743'}} id="myBox" rows="8" placeholder='Enter your text here'></textarea>
                    </div>
                    <button className="btn btn-primary mx-1" onClick={handleUpClick}disabled={!text}>Convert to Uppercase</button>
                    <button className="btn btn-primary mx-1" onClick={handleLoClick}disabled={!text}>Convert to Lowercase</button>
                    <button className="btn btn-primary mx-1" onClick={handleClearClick}disabled={!text}>Clear Text</button>
                    <button className="btn btn-primary mx-1" onClick={handleCopy}disabled={!text}>Copy Text</button>
                    <button className="btn btn-primary mx-1" onClick={handleExtraSpaces}disabled={!text}>Remove Extra Spaces</button>
                    <button className="btn btn-primary mx-1" onClick={handleSpeechToText}disabled={!text}>Speech to Text</button>
                    <button className="btn btn-primary mx-1" onClick={handleConvertToPDF}disabled={!text}>Text Convert to PDF</button>
                    <button type="button" className="btn btn-primary m-1" onClick={downloadTxtFile}disabled={!text}> DownloadTextFile</button>
                    <button type="button" className="btn btn-primary m-2" onClick={handleCapitalize}disabled={!text}>Convert to First Letter Uppercase</button>
                    <button className="btn btn-primary mx-1" onClick={handleConvertToWords}disabled={!text}>Convert to Words</button>
                </div>
                <div className="container my-3" style={{color: props.mode==='dark'?'white':'#042743'}}>
                    <h2>Your text summary</h2>
                    <p>{text.split(" ").filter((element)=>{return element.length!==0}).length} words and {text.length} characters</p>
                    {/* <p>{text.length > 0 ? text.split(" ").length : text.length} words and {text.length} characters</p> */}
                    {/* <p>{count > 0 ? count : 0} words and {count} characters</p> */}
                    <p>{0.008 * text.split(" ").filter((element)=>{return element.length!==0}).length} Minute read </p>                    <h2>Preview</h2>
                    <p>{text.length>0?text:"Enter something in the textbox above to preview it here"}</p>
                </div>
            </>     
        )
    }