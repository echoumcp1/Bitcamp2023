import logo from './logo.svg';
import {useState, useEffect} from "react";
import './App.css';
import axios from "axios";

function App() {
  const [result, setResult] = useState("");
  useEffect(() => {
    const myfunc = async () => {
      const test = await axios.get("http://localhost:2000/");
      setResult(test.data);
    }
    
    myfunc();
  }, []);

  return (
    <div className="App">
        <h1>{result}</h1>
    </div>
  );
}

export default App;
