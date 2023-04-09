import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { CgProfile } from "react-icons/cg";
import {
  calculateCollegeCredit,
  calculateDependentCredits,
  calculateDonationDeductions,
  calculateMedicalDeductions,
  calculateMortgageDeduction,
  calculateTaxDeductions,
  checkTaxBracket,
} from "../taxreturnlogic";
import Navbar from "./Navbar";
import axios from "axios";

import Papa from "papaparse";
import "./Details.css";

const Details = () => {
  // const [result, setResult] = useState("");

  // useEffect(() => {
  //   const myfunc = async () => {
  //     const response = await axios.get("http://localhost:2000/");
  //     setResult(response.data);
  //   };

  //   myfunc();
  // }, []);

  const Status = {
    Single: "Single",
    Separate: "Married filing separately",
    Joint: "Married filing jointly",
    Head: "Head of household",
  };

  const Eligible = {
    Yes: "Yes",
    No: "No",
  };

  const Type = {
    Credit: "Credit",
    Deduction: "Deduction",
  };

  const Category = {
    Education: "Education",
    Medical: "Medical",
    Donation: "Donations",
    Taxes: "Taxes",
    MInterest: "Mortgage Interest",
  };

  const { state } = useLocation();
  const { income, school, dependants, csvData, witholding, status, medical } =
    state;
  const parsedData = Papa.parse(csvData).data;

  const [taxReturn, setTaxReturn] = useState({
    totalIncome: income,
    totalDeductions: 0,
    totalDonationDeductions: 0,
    totalCredits: 0,
    taxLiability: 0,
  });

  /*

  useEffect(() => {
    console.log("TaxReturn", JSON.stringify(taxReturn));
  }, [taxReturn]);
*/

  /* this section below calculates the tax liability if the person were to take a
    standard deduction based instead of itemized, I have not fully tested! */
  /* calculate standard deduction for total Income */
  let standardDeduction = 0;
  if (status === "single") {
    standardDeduction = 12950;
  } else if (status === "Married, filing separtely") {
    standardDeduction = 12950;
  } else if (status === "Married, filing joint") {
    standardDeduction = 25900;
  } else {
    standardDeduction = 19400;
  }

  /* calculate the taxable income after standard deduction */
  let taxableIncome = taxReturn.totalIncome - standardDeduction;

  /* check tax bracket, this should return the tax rate*/
  /* checkTaxBracket returns tax rate */
  let taxRate = checkTaxBracket(status, taxReturn.income);

  /* tax liability after taking standard deduction */
  let taxLiability = taxableIncome * taxRate;

  /* should also compute the credits on the tax liability */

  /* end of standard deduction section */
  /* we should compare the ending tax liability of standard vs itemized and choose the better one! */

  console.log(taxRate);

  // useEffect(() => {
  //   const myfunc = async () => {
  //     const response = await axios.get("http://localhost:2000/");
  //     setResult(response.data);
  //   };

  //   myfunc();
  // }, []);

  /* this will calculate every single payment and determine the final amount */
  useEffect(() => {
    const processResults = async () => {
      console.log("Hello");
      for (let payment of parsedData) {
        let payee = payment[0]; //the payee for each payment, need to send to GPT for them to classify
        /* send info to gpt here and get the array [yes/no, credit/deductions, category]*/
        let response = await axios.post("http://localhost:2000/api", { payee });
        let completePayment = response.data;
        completePayment.push(payment[1]);
        //console.log(completePayment.toString());
        calculate(completePayment.toString());
        //console.log(`total Credits ${taxReturn.totalCredits}`);
      }
    };

    processResults();
  }, []);

  //setTaxReturn({...taxReturn, totalDeductions: 5000}) // create new property

  /* calculate the tax benefit for each payment*/
  function calculate(text) {
    let newDeduction = 0;
    let newCredit = 0;
    //Array with the following properties
    //[isEligble,deduction/credit,category]
    const res = text.split(",");
    if (res[0] === Eligible.Yes) {
      if (res[1] === Type.Credit) {
        if (res[2] === Category.Education) {
          //console.log(taxReturn.totalCredits)
          newCredit =
            taxReturn.totalCredits +
            calculateCollegeCredit(
              status,
              income,
              taxReturn.taxLiability,
              school
            );

          //console.log(`taxReturn.totalCredits: ${taxReturn.totalCredits}`);
          /*console.log(
            `calculate: ${calculateCollegeCredit(
              status,
              income,
              taxReturn.taxLiability,
              school
            )}`
          );*/
          //console.log(`NewCredits: ${newCredit}`);
          //console.log(school)
          const newTaxReturn = { ...taxReturn, totalCredits: newCredit };
          //console.log(`oldTaxReturn: ${JSON.stringify(taxReturn)}`);
          //console.log(`newTaxReturn: ${JSON.stringify(newTaxReturn)}`);
          setTaxReturn((oldTaxReturn) => {
            /*console.log(
              JSON.stringify({ ...oldTaxReturn, totalCredits: newCredit })
            );*/
            return { ...oldTaxReturn, totalCredits: newCredit };
          });
        }
        if (dependants > 0) {
          calculateDependentCredits();
        }
      } else if (res[1] === Type.Deduction) {
        switch (res[2]) {
          case Category.Medical:
            newDeduction =
              taxReturn.totalDeductions +
              calculateMedicalDeductions(income, medical);
            break;
          case Category.Donation:
            newDeduction =
              taxReturn.totalDeductions + calculateDonationDeductions();
            break;
          case Category.Taxes:
            newDeduction = taxReturn.totalDeductions + calculateTaxDeductions(income, );
            break;
          case Category.MInterest:
            newDeduction =
              taxReturn.totalDeductions + calculateMortgageDeduction();
            break;
          default:
            return ["invalid deduction detected"];
        }
        setTaxReturn((oldTaxReturn) => {
          return { ...oldTaxReturn, totalDeductions: newDeduction };
        });
      } else {
        return ["invalid pattern detected"];
      }
    } else if (res[0] === Eligible.No) {
      return ["ineligible"];
    } else {
      return ["invalid pattern detected"];
    }
  }

  return (
    <div className="Details">
      <Navbar />
      <p>{taxReturn.totalCredits}</p>
      <p>{taxReturn.totalDeductions}</p>
      <div className="dashboard">
        <div className="cardProfile">
          <div>
            <CgProfile />
          </div>
          <div>
            <table>
              <tr>
                <td>Gross Annual Income: ${income}</td>
                <td>School: {school}</td>
              </tr>
              <tr>
                <td>Dependants: {dependants}</td>
                <td>Witholding: {witholding}</td>
              </tr>
              <tr>
                <td>Status: {status}</td>
                <td>Medical: {medical}</td>
              </tr>
            </table>
          </div>
        </div>
        <div className="cardItem">
          <p>Gross Annual Income: ${income}</p>
        </div>

        <div className="cardItem">
          <p>School {school}</p>
        </div>
        <div className="cardItem">
          <p>Dependants {dependants}</p>
        </div>
        <div className="cardItem">
          <p>Witholding {witholding}</p>
        </div>
        <div className="cardItem">
          <p>Status {status}</p>
        </div>
        <div className="cardItem">
          <p>Medical {medical}</p>
        </div>

        <div className="cardTable">
          <Table striped>
            <thead>
              <tr>
                {parsedData &&
                  parsedData[0].map((header, i) => (
                    <th key={`header${i}`}>{header}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {parsedData &&
                parsedData.slice(1).map((row, i) => {
                  return (
                    <tr key={`column${i}`}>
                      {row.map((entry, j) => (
                        <td key={`column${i}row${j}`}>{entry}</td>
                      ))}
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Details;
