import React from "react";
import { useLocation } from "react-router-dom";
import Table from "react-bootstrap/Table";

import Papa from "papaparse";
import "./Details.css";

const Details = () => {
  const { state } = useLocation();
  const { income, school, dependants, csvData } = state;
  const parsedData = Papa.parse(csvData).data;

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
