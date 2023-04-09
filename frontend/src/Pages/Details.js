import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { CgProfile } from "react-icons/cg";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import detective from "../detective.png";

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
  ChartJS.register(...registerables);
  // const [result, setResult] = useState("");

  // useEffect(() => {
  //   const myfunc = async () => {
  //     const response = await axios.get("http://localhost:2000/");
  //     setResult(response.data);
  //   };

  //   myfunc();
  // }, []);

  const Status = {
    Single: "single",
    Separate: "seperately",
    Joint: "jointly",
    Head: "head",
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
    Donation: "Donation",
    Taxes: "Taxes",
    MInterest: "MInterest",
  };

  const { state } = useLocation();
  const { income, school, dependants, csvData, witholding, status, medical } =
    state;

  const parsedData = Papa.parse(csvData).data;
  const [completeData, setCompleteData] = useState([...parsedData]);
  const [barData, setBarData] = useState([0, 0, 0, 0, 0]);
  const [pieData, setPieData] = useState([0, 0, 0]);

  console.log("withholding " + witholding);
  console.log("income " + income);
  console.log(`withheld: ${income * (witholding / 100)}`);

  const [doneParsing, setDoneParsing] = useState(false);

  let taxesPaid = income * (witholding / 100);
  let taxRateOriginal = checkTaxBracket(status, income);
  console.log("taxesPaid " + taxesPaid);
  console.log("taxRateOriginal " + taxRateOriginal);
  console.log("status" + status);

  let taxesOwed = taxRateOriginal * income - taxesPaid;
  console.log("taxesOwed" + taxesOwed);

  const [taxReturn, setTaxReturn] = useState({
    totalIncome: income * (1 - witholding / 100),
    totalDeductions: 0,
    totalDonationDeductions: 0,
    totalCredits: 0,
    taxLiability: taxesOwed,
  });

  useEffect(() => {
    console.log(`Actual tax return: ${JSON.stringify(taxReturn)}`);
  }, [taxReturn]);

  /* this section below calculates the tax liability if the person were to take a
    standard deduction based instead of itemized, I have not fully tested! */
  /* calculate standard deduction for total Income */
  let standardDeduction = 0;
  if (status === "single") {
    standardDeduction = 12950;
  } else if (status === "seperately") {
    standardDeduction = 12950;
  } else if (status === "jointly") {
    standardDeduction = 25900;
  } else {
    standardDeduction = 19400;
  }

  /* calculate the taxable income after standard deduction */
  let taxableIncome = taxReturn.totalIncome - standardDeduction;

  /* check tax bracket, this should return the tax rate*/
  /* checkTaxBracket returns tax rate */
  let taxRate = checkTaxBracket(status, income);

  /* tax liability after taking standard deduction */
  let standardTaxLiability = taxableIncome * taxRate;

  /* should also compute the credits on the tax liability */

  /* end of standard deduction section */
  /* we should compare the ending tax liability of standard vs itemized and choose the better one! */

  console.log(taxRate);

  useEffect(() => {
    console.log(`Current value of taxReturns: ${JSON.stringify(taxReturn)}`);
  }, [taxReturn]);

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
      let collegePayments = [];
      console.log("Hello");
      for (let [i, payment] of parsedData.entries()) {
        let payee = payment[0]; //the payee for each payment, need to send to GPT for them to classify
        /* send info to gpt here and get the array [yes/no, credit/deductions, category]*/
        let response = await axios.post("http://localhost:2000/api", { payee });
        console.log("completePayment " + response.data);
        let completePayment = response.data;
        completePayment.push(payment[1]);
        let newData = [...parsedData];
        if (response.data[1] == "Credit" || response.data[1] == "Deduction") {
          newData[i].push(response.data[1]);
          newData[i].push(response.data[2]);
        }
        console.log(`newData: ${newData}`);
        setCompleteData(newData);
        //console.log(completePayment.toString());
        calculate(completePayment.toString(), collegePayments);
      }
      console.log("total Deductions after " + taxReturn.totalDeductions);
      //TO-DO: Calculate the tax liability (subtract deductions -> find tax -> minus credits)
      // if (taxReturn.taxLiability > 0) {
      //   const taxableIncome = taxReturn.totalIncome - taxReturn.totalDeductions;
      //   console.log(`Taxable Income: ${taxableIncome}`);
      //   const taxRate = checkTaxBracket(status, taxableIncome);
      //   console.log(`Tax Rate: ${taxRate}`);
      //   const preCreditTaxLiability = taxableIncome * taxRate;
      //   console.log(`Pre Credit Tax Liability: ${preCreditTaxLiability}`);
      // }

      // this checks if we owe money compute the preCreditTaxLiability
      let preCreditTaxLiability = 0;
      if (taxReturn.taxLiability > 0) {
        const taxableIncome = taxReturn.totalIncome - taxReturn.totalDeductions;
        console.log(`Taxable Income: ${taxableIncome}`);
        const taxRate = checkTaxBracket(status, taxableIncome);
        console.log(`Tax Rate: ${taxRate}`);
        preCreditTaxLiability = taxableIncome * taxRate;
        console.log(`Pre Credit Tax Liability: ${preCreditTaxLiability}`);
      } else {
        preCreditTaxLiability = taxReturn.taxLiability;
      }
      let taxLiability = preCreditTaxLiability;
      console.log(`taxLiability: ${taxLiability}`);
      if (dependants > 0) {
        //calculateDependentCredits(status, income, dependants, taxLiability);
      }
      console.log("status " + status);

      let newCredits = 0;
      console.log(`College Payments: ${collegePayments}`);
      collegePayments.forEach((amount) => {
        newCredits = calculateCollegeCredit(
          status,
          taxReturn.totalIncome,
          taxLiability,
          school,
          amount
        );
        console.log(`NewCredit: ${newCredits}`);
        console.log(`existing TaxReturn: ${JSON.stringify(taxReturn)}`);
        taxLiability = taxLiability - newCredits;
        console.log(
          `new taxLiability after subtracting college: ${taxLiability}`
        );
        setTaxReturn((oldTaxReturn) => {
          return {
            ...oldTaxReturn,
            totalCredits: oldTaxReturn.totalCredits + newCredits,
          };
        });
      });

      setTaxReturn((oldTaxReturn) => {
        return { ...oldTaxReturn, taxLiability: taxLiability };
      });
      setDoneParsing(true);

      let newBarData = [0, 0, 0, 0, 0];
      let newPieData = [0, 0, 0];

      console.log(`completeData: ${JSON.stringify(completeData)}`);
      completeData.forEach((row) => {
        console.log(`Complete Row: ${row}`);
        for (let [i, category] of [
          "Education",
          "MInterest",
          "Donation",
          "Taxes",
          "Medical",
        ].entries()) {
          if (row[3] == category) {
            newBarData[i] += 1;
          }
        }

        let add = 0;
        if (row[2] == "Credit") {
          if (school) {
            newPieData[1] += 1;
            add += 1;
          }
        } else if (row[2] == "Deduction") {
          newPieData[2] += 1;
        } else {
          newPieData[0] += 1;
          newPieData[0] += add;
        }
      });

      setBarData(newBarData);
      setPieData(newPieData);
      console.log(`New Bar Data: ${newBarData}`);
      console.log(`New Pie Data: ${newPieData}`);
    };

    processResults();
  }, []);

  //setTaxReturn({...taxReturn, totalDeductions: 5000}) // create new property

  /* calculate the tax benefit for each payment*/
  function calculate(text, collegePayments) {
    let newDeduction = 0;
    let newCredit = 0;
    //Array with the following properties
    //[isEligble,deduction/credit,category]
    const res = text.split(",");
    if (res[0] === Eligible.Yes) {
      let amount = Number(res[3]);

      if (res[1] === Type.Credit) {
        if (res[2] === Category.Education) {
          //console.log(taxReturn.totalCredits)
          collegePayments.push(amount);

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
          //const newTaxReturn = { ...taxReturn, totalCredits: newCredit };
          //console.log(`oldTaxReturn: ${JSON.stringify(taxReturn)}`);
          //console.log(`newTaxReturn: ${JSON.stringify(newTaxReturn)}`);
          /*setTaxReturn((oldTaxReturn) => {
            console.log(
              JSON.stringify({ ...oldTaxReturn, totalCredits: newCredit })
            );
            return { ...oldTaxReturn, totalCredits: newCredit };
          });*/
        }
      } else if (res[1] === Type.Deduction && taxReturn.taxLiability > 0) {
        switch (res[2]) {
          case Category.Medical:
            newDeduction =
              taxReturn.totalDeductions +
              calculateMedicalDeductions(taxReturn.totalIncome, medical);
            setTaxReturn((oldTaxReturn) => {
              let newObj = {
                ...oldTaxReturn,
                totalDeductions: oldTaxReturn.totalDeductions + newDeduction,
              };
              return newObj;
            });
            break;
          case Category.Donation:
            let currDonationDeduction = calculateDonationDeductions(
              taxReturn.totalIncome,
              taxReturn.totalDonationDeductions,
              amount
            );
            //console.log("pre Deduction " + taxReturn.totalDeductions);

            //newDeduction = taxReturn.totalDeductions + currDonationDeduction;
            //console.log("new Deduction " + newDeduction)
            setTaxReturn((oldTaxReturn) => {
              let newObj = {
                ...oldTaxReturn,
                totalDonationDeductions:
                  oldTaxReturn.totalDonationDeductions + currDonationDeduction,
                totalDeductions:
                  oldTaxReturn.totalDeductions + currDonationDeduction,
              };
              console.log(`Setting to newObj: ${JSON.stringify(newObj)}`);
              return newObj;
            });
            break;
          case Category.Taxes:
            newDeduction =
              taxReturn.totalDeductions +
              calculateTaxDeductions(status, amount);
            break;
          case Category.MInterest:
            console.log("MInterest");
            newDeduction =
              taxReturn.totalDeductions + calculateMortgageDeduction(amount);

            console.log("MInterest " + newDeduction);
            newDeduction = Number(newDeduction);
            setTaxReturn((oldTaxReturn) => {
              console.log(
                `New Deduction: ${
                  oldTaxReturn.totalDeductions + Number(amount)
                }`
              );
              return {
                ...oldTaxReturn,
                totalDeductions: oldTaxReturn.totalDeductions + Number(amount),
              };
            });

            console.log(
              "total Deductions after MInterest" + taxReturn.totalDeductions
            );

            break;
          default:
            return ["invalid deduction detected"];
        }
        /*
        setTaxReturn((oldTaxReturn) => {
          return { ...oldTaxReturn, totalDeductions: newDeduction };
        });*/
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
      {doneParsing ? (
        <div className="dashboard">
          <div className="cardProfile">
            <div className="profileWrapper">
              <CgProfile size={150} />
            </div>
            <div className="grow">
              <table>
                <tr>
                  <td>Gross Annual Income: ${income}</td>
                  <td>Is in School: {school ? "Yes" : "No"}</td>
                </tr>
                <tr>
                  <td>Number of Dependants: {dependants}</td>
                  <td>Witholding Percentage: {witholding}</td>
                </tr>
                <tr>
                  <td>Status: {status}</td>
                  <td>Out-of-pocket Medical Expenditures: {medical}</td>
                </tr>
              </table>
            </div>
          </div>
          <div className="cardSummary">
            <h2>Total Deductions:</h2>
            <h3>{taxReturn.totalDeductions}</h3>
            <h2>Total Credits:</h2>
            <h3>{taxReturn.totalCredits}</h3>
            <h2>Total Tax Liability:</h2>
            <h3>{taxReturn.taxLiability}</h3>
          </div>
          <div className="cardBar">
            <Bar
              data={{
                labels: [
                  "College",
                  "Mortgage Interest",
                  "Donations",
                  "Taxes",
                  "Medical",
                ],
                datasets: [
                  {
                    label: "Distribution of Credits/Deductions",
                    backgroundColor: "rgba(75,192,192,1)",
                    borderColor: "rgba(0,0,0,1)",
                    borderWidth: 2,
                    data: barData,
                  },
                ],
              }}
              options={{
                title: {
                  display: true,
                  text: "Distribution of Credits/Deductions",
                  fontSize: 20,
                },
                legend: {
                  display: true,
                  position: "right",
                },
              }}
            />
          </div>

          <div className="cardPie">
            <div>
              <Pie
                data={{
                  labels: ["Ineligible", "Credit", "Deduction"],
                  datasets: [
                    {
                      label: "Distribution of Transactions",
                      data: pieData,
                      backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                      ],
                      borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
              />
            </div>
          </div>

          <div className="cardTable">
            <Table striped>
              <thead>
                <tr>
                  {["Source", "Payment", "Credit/Deduction", "Category"].map(
                    (header, i) => (
                      <th key={`header${i}`}>{header}</th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {completeData &&
                  completeData.map((row, i) => {
                    return (
                      <tr key={`column${i}`}>
                        {row.slice(0, 4).map((entry, j) => (
                          <td key={`column${i}row${j}`}>{entry}</td>
                        ))}
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </div>
        </div>
      ) : (
        <div className="loadingPage">
          <div>I am loading, please give me a moment!</div>
          <img id="detective" src={detective} alt="mascot" />
        </div>
      )}
    </div>
  );
};

export default Details;
