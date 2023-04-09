import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import "./Form.css";

const Form = () => {
  const navigate = useNavigate();
  const [income, setIncome] = useState(60000);
  const [medical, setMedical] = useState(0);
  const [witholding, setWitholding] = useState(0);
  const [slide, setSlide] = useState(0);
  const [school, setSchool] = useState(false);
  const [status, setStatus] = useState("single");
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
      const state = {
        income,
        school,
        dependants,
        csvData,
        medical,
        witholding,
        status,
      };
      navigate("/details", { replace: false, state });
    } else {
      setCsvError("Please insert a file");
    }
  };

  const handleSelect = (e) => {
    console.log(e.target.value);
    setStatus(e.target.value);
  };

  const handleIncrement = () => {
    setSlide((slide + 1) % 7);
  };

  const handleDecrement = () => {
    setSlide((slide - 1) % 7);
  };

  return (
    <div className="Form">
      {slide == 0 && (
        <div className="background">
          <div>
            <label for="status">What is your filing status?</label>

            <select
              name="status"
              className="smallerText"
              id="status"
              onChange={handleSelect}
            >
              <option value="single">Single</option>
              <option value="head">Head of Household</option>
              <option value="separately">Married, filing seperately</option>
              <option value="jointly">Married, filing jointly</option>
            </select>
          </div>

          <div className="control">
            <span class="frontControl">
              <button className="moveButton" onClick={handleIncrement}>
                {">"}
              </button>
            </span>
          </div>
          <br />
          <br />
        </div>
      )}
      {slide == 1 && (
        <div className="background">
          <div>
            <p>Are you currently in school? </p>
            <span id="school">
              <label for="yesSchool" className="smallerText">
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

              <label for="noSchool" className="smallerText">
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
            </span>
          </div>
          <div className="control">
            <span class="frontControl">
              <button className="moveButton" onClick={handleDecrement}>
                {"<"}
              </button>
            </span>
            <span class="frontControl">
              <button className="moveButton" onClick={handleIncrement}>
                {">"}
              </button>
            </span>
          </div>
          <br />
          <br />
        </div>
      )}
      {slide == 2 && (
        <div className="background">
          <label htmlFor="dependants">
            Do you have any dependants under 17, and if so, how many? <br />
            <input
              id="dependants"
              type="number"
              value={dependants}
              onChange={(e) => setDependants(e.target.value)}
              className="smallerText"
            ></input>
          </label>
          <br />
          <div className="control">
            <span class="frontControl">
              <button className="moveButton" onClick={handleDecrement}>
                {"<"}
              </button>
            </span>
            <span class="frontControl">
              <button className="moveButton" onClick={handleIncrement}>
                {">"}
              </button>
            </span>
          </div>
          <br />
        </div>
      )}
      {slide == 3 && (
        <div className="background">
          <label htmlFor="income">
            What is your annual gross income? (USD): <br />
            <input
              id="income"
              type="number"
              value={income}
              step="10000"
              onChange={(e) => setIncome(e.target.value)}
              className="smallerText"
            ></input>
          </label>
          <br />
          <div className="control">
            <span class="frontControl">
              <button className="moveButton" onClick={handleDecrement}>
                {"<"}
              </button>
            </span>
            <span class="frontControl">
              <button className="moveButton" onClick={handleIncrement}>
                {">"}
              </button>
            </span>
          </div>
          <br />
        </div>
      )}
      {slide == 4 && (
        <div className="background">
          <label htmlFor="medical">
            Total medical expenses paid out of pocket this year (USD): <br />
            <input
              id="medical"
              type="number"
              value={medical}
              step="100"
              className="smallerText"
              onChange={(e) => setMedical(e.target.value)}
            ></input>
          </label>
          <br />
          <div className="control">
            <span class="frontControl">
              <button className="moveButton" onClick={handleDecrement}>
                {"<"}
              </button>
            </span>
            <span class="frontControl">
              <button className="moveButton" onClick={handleIncrement}>
                {">"}
              </button>
            </span>
          </div>
          <br />
        </div>
      )}
      {slide == 5 && (
        <div className="background">
          <label htmlFor="witholding">
            What is your current federal witholding percentage? <br />
            <input
              id="witholding"
              type="number"
              value={witholding}
              step="1"
              min="0"
              max="100"
              onChange={(e) => setWitholding(e.target.value)}
              className="smallerText"
            ></input>
          </label>
          <br />
          <div className="control">
            <span class="frontControl">
              <button className="moveButton" onClick={handleDecrement}>
                {"<"}
              </button>
            </span>
            <span class="frontControl">
              <button className="moveButton" onClick={handleIncrement}>
                {">"}
              </button>
            </span>
          </div>
          <br />
        </div>
      )}
      {slide == 6 && (
        <div className="background">
          <div className="smallerText">
            {" "}
            Insert a .csv file containing your transactions for this year.
            Format: [Payment Destination, Payment Amount]
            <input
              id="csv-file"
              type="file"
              accept=".csv"
              onChange={handleCsvFileUpload}
            ></input>
            <p id="csvError">{csvError}</p>
          </div>

          <br />
          <br />
          <div className="control">
            <span class="frontControl">
              <button className="moveButton" onClick={handleDecrement}>
                {"<"}
              </button>
            </span>
            <span class="front">
              <input
                id="submit"
                type="button"
                value="Submit"
                onClick={handleSubmit}
              ></input>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
