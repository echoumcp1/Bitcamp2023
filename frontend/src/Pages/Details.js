import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Table from "react-bootstrap/Table";
import {calculateCollegeCredit, 
        calculateDependentCredits,
        calculateDonationDeductions,
        calculateMedicalDeductions,
        calculateMortgageDeduction,
        calculateTaxDeductions} from "../taxreturnlogic"
import Navbar from "./Navbar";
import axios from "axios"

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
  const { income, school, dependants, csvData, witholding, status, medical } =
    state;
  const parsedData = Papa.parse(csvData).data;

  const [taxReturn, setTaxReturn] = 
  useState({totalIncome: income, 
            totalDeductions: 0, 
            totalDonationDeductions: 0,
            totalCredits: 0, 
            taxLiability: 0 })

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
      for(let payment of parsedData) {
        let payee = payment[0]    //the payee for each payment, need to send to GPT for them to classify
         /* send info to gpt here and get the array [yes/no, credit/deductions, category]*/
        let response = await axios.post('http://localhost:2000/api', {payee})
        console.log(response.data);
        let completePayment = response.data.push(payment[0])
        calculate(completePayment.toString())
      }
    } 

    processResults();
  }, [])


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
                newCredit = taxReturn.totalCredits + calculateCollegeCredit(status, income, school)
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
      <Navbar />
      <div className="dashboard">
        <p>Income {income}</p>
        <p>School {school}</p>
        <p>Dependants {dependants}</p>
        <p>Witholding {witholding}</p>
        <p>Status {status}</p>
        <p>Medical {medical}</p>

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
  );
};

export default Details;
