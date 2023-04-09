import logo from "./logo.svg";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";
import Form from "./Pages/Form";
import Details from "./Pages/Details";

function App() {
  const [result, setResult] = useState("");
  /*
  useEffect(() => {
    const myfunc = async () => {
      const test = await axios.get("http://localhost:2000/");
      setResult(test.data);
    };

    myfunc();
  }, []);*/

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form />}></Route>
          <Route path="/details" element={<Details />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

/*
Are you currently in school?
Do you have any dependants under 17, and if so, how many?
*/
