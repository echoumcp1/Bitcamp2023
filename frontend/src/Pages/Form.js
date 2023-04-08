import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import "./Form.css";

const Form = () => {
  const navigate = useNavigate();
  const [income, setIncome] = useState(60000);
  const [school, setSchool] = useState(false);
  const [dependants, setDependants] = useState(0);
  const [csvData, setCsvData] = useState();
  const [csvError, setCsvError] = useState("");

  /* this handleCsvFileUpload gets called whenever a csv file gets uploaded
      using the onChange event listener */
  const handleCsvFileUpload = (event) => {
    const file = event.target.files[0]; // should be the file that is being uploaded
    const reader = new FileReader(); // built-in javascript object that provides a way to the read contents

    /* onload event is fired when a file is loaded into a FileReader()
     *
     */
    reader.onload = (event) => {
      const csvText = event.target.result;
      setCsvData(csvText);
    };

    /* the readAsText() function takes in a file and reads its contents
     * the onload event is fired when the contents of the file have been loaded into memory
     *
     */
    reader.readAsText(file);
  };

  const handleSubmit = () => {
    // TO-DO: Insert fetch request to process data
    if (csvData) {
      setCsvError("");
      const state = { income, school, dependants, csvData };
      navigate("/details", { replace: false, state });
    } else {
      setCsvError("Please insert a file");
    }
  };
  return (
    <div className="Form">
      <div className="background">
        <span id="school">
          Are you currently in school?{" "}
          <div>
            <label for="html">
              <input
                type="radio"
                id="yesSchool"
                name="school"
                value="yes"
                checked={school}
                onChange={(e) => {
                  console.log(e.target.value == "yes");
                  setSchool(e.target.value == "yes");
                }}
              ></input>
              Yes
            </label>
            <br />
            <label for="css">
              <input
                type="radio"
                id="noSchool"
                name="school"
                value="no"
                checked={!school}
                onChange={(e) => {
                  console.log(e.target.value == "yes");
                  setSchool(e.target.value == "yes");
                }}
              ></input>
              No
            </label>
          </div>
        </span>
        <br />
        <br />
        <label htmlFor="dependants">
          Do you have any dependants under 17, and if so, how many?{" "}
          <input
            id="dependants"
            type="number"
            value={dependants}
            onChange={(e) => setDependants(e.target.value)}
          ></input>
        </label>
        <br />
        <br />
        <label htmlFor="income">
          Gross Income ($):{" "}
          <input
            id="income"
            type="number"
            value={income}
            step="10000"
            onChange={(e) => setIncome(e.target.value)}
          ></input>
        </label>
        <br />
        <br />
        <input
          id="csv-file"
          type="file"
          accept=".csv"
          onChange={handleCsvFileUpload}
        ></input>
        <p id="csvError">{csvError}</p>
        <br />
        <br />
        <span class="front">
          <input
            id="submit"
            type="button"
            value="Submit"
            onClick={handleSubmit}
          ></input>
        </span>

        {csvData && <p>{csvData}</p>}
      </div>
    </div>
  );
};

export default Form;
