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
