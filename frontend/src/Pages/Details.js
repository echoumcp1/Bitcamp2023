import React from "react";
import { useLocation } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Navbar from "./Navbar";

import Papa from "papaparse";
import "./Details.css";

const Details = () => {
  const { state } = useLocation();
  const { income, school, dependants, csvData, witholding, status, medical } =
    state;
  const parsedData = Papa.parse(csvData).data;

  return (
    <div className="Details">
      <Navbar />
      <div className="dashboard">
        <div className="cardProfile">
          <div></div>
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
