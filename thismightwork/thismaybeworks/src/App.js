import Tesseract from 'tesseract.js';
import React, { Component } from 'react';
 
class App extends Component {
    ocrconvert = (fileurl, lang) => {
      Tesseract.recognize(
        fileurl,
        lang,
        //{ logger: m => console.log(m) }
      ).then(({ data: { text } }) => {
        console.log("finished")
        console.log(text)
      })      
    }
     state = {
        selectedFile: null
    };
    onFileChange = event => {
        this.setState({ selectedFile: event.target.files[0] });
 
    };
    onFileUpload = () => {       
        console.log(this.state.selectedFile);
        this.fileurl = URL.createObjectURL(this.state.selectedFile);
        console.log(this.ocrconvert(this.fileurl, "eng"));
        
    };
 
    render() {
        return (
            <div>
                <h1>
                    A very basic test
                </h1>
                <h3>
                    File Upload using React!
                </h3>
                <div>
                    <input type="file" onChange={this.onFileChange} />
                    <button onClick={this.onFileUpload}>
                        Upload!
                    </button>
                </div>
                
            </div>
        );
    }
}
 
export default App;