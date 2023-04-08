import logo from './logo.svg';
import {useState, useEffect} from "react";
import './App.css';
import axios from "axios";

function App() {
  const [csvData, setCsvData] = useState();

  /* this handleCsvFileUpload gets called whenever a csv file gets uploaded
    using the onChange event listener */
  const handleCsvFileUpload = (event) => {
    console.log(event)
    const file = event.target.files[0] // should be the file that is being uploaded
    const reader = new FileReader() // built-in javascript object that provides a way to the read contents 

    /* onload event is fired when a file is loaded into a FileReader()
     * 
    */
    reader.onload = (event) => {
      const csvText = event.target.result
      setCsvData(csvText) 
    }

    /* the readAsText() function takes in a file and reads its contents
     * the onload event is fired when the contents of the file have been loaded into memory
     * 
     */
    reader.readAsText(file)
  }
  return (
    <div className="App">
      <input id="csv-file" type="file" accept=".csv" onChange={handleCsvFileUpload}></input>
      <input type = "submit" value="Submit" ></input>
      {csvData && <p>{csvData}</p>}
    </div>
  );
}

export default App;
