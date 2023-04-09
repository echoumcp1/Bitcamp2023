import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Table from "react-bootstrap/Table";
import {calculateCollegeCredit, 
        calculateDependentCredits,
        calculateDonationDeductions,
        calculateMedicalDeductions,
        calculateMortgageDeduction,
        calculateTaxDeductions} from "../taxreturnlogic"

import Papa from "papaparse";
import "./Details.css";

const Details = () => {
  const [result, setResult] = useState("");

  
  useEffect(() => {
    const myfunc = async () => {
      const response = await axios.get("http://localhost:2000/");
      setResult(response.data);
    };

    myfunc();
  }, []);

  const [taxReturn, setTaxReturn] = 
  useState({totalIncome: income, 
            totalDeductions: 0, 
            totalDonationDeductions: 0,
            totalCredits: 0, 
            taxLiability: 0 })


  const Status = {
    Single : "Single",
    Separate : "Married filing separately",
    Joint : "Married filing jointly",
    Head : "Head of household"
  }

  const Eligible = {
    Yes : "Yes",
    No : "No"
  }

  const Type = {
    Credit : "Credit",
    Deduction : "Deduction"
  }

  const Category = {
    Education : "Education",
    Medical : "Medical",
    Donation : "Donations",
    Taxes : "Taxes",
    MInterest : "Mortgage Interest"
  }

  const { state } = useLocation();
  // need to add filing status, witholding, medical payments paid out of pocket, 
  const { filingStatus, medicalPayments, income, school, dependants, csvData } = state;
  const parsedData = Papa.parse(csvData).data;

  /* this will calculate every single payment and determine the final amount */
  for(let payment of parsedData) {
    let payee = payment[1]    //the payee for each payment, need to send to GPT for them to classify
    response = /* send info to gpt here and get the resulting array*/
    let completePayment = response.push(payment[2])
    calculate(completePayment.toString())
  }
  //setTaxReturn({...taxReturn, totalDeductions: 5000}) // create new property

  /* calculate the tax benefit for each payment*/
  function calculate(text) {
    let newDeduction = 0
    let newCredit = 0
    //Array with the following properties
    //[isEligble,deduction/credit,category]
    const res = text.split(",");
    
    if (res[0] === Eligible.Yes) {
        if (res[1] === Type.Credit) {
            if (res[2] === Category.Education) {
                newCredit = taxReturn.totalCredits + calculateCollegeCredit(filingStatus, income, school)
                setTaxReturn = ({...taxReturn, totalCredits: newCredit})
            }
            if (dependants > 0) {
                calculateDependentCredits()
            }
        }
        else if (res[1] === Type.Deduction) {
            switch (res[2]) {
                case Category.Medical:
                    newDeduction = taxReturn.totalDeductions + calculateMedicalDeductions()
                    break;
                case Category.Donation:
                    newDeduction = taxReturn.totalDeductions + calculateDonationDeductions()
                    break;
                case Category.Taxes:
                    newDeduction = taxReturn.totalDeductions + calculateTaxDeductions()
                    break;
                case Category.MInterest:
                    newDeduction = taxReturn.totalDeductions + calculateMortgageDeduction()
                    break;
                default:
                    return ["invalid deduction detected"];
            }
            setTaxReturn({...taxReturn, totalDeductions: newDeduction})
        }
        else {
            return ["invalid pattern detected"];
        }
    }
    else if (res[0] === Eligible.No){
        return ["ineligible"];
    }
    else {
        return ["invalid pattern detected"];
    }
}




  return (
    <div className="Details">
      Details
      <p>{income}</p>
      <p>{school}</p>
      <p>{dependants}</p>
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
  );
};

export default Details;
