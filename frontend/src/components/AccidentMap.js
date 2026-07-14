import React from "react";

function AccidentMap() {
  return (
    <div className="container mt-4">

      <h2 className="mb-4">
        Official Germany Accident Atlas
      </h2>

      <iframe
        title="Germany Accident Atlas"
        src="https://unfallatlas.statistikportal.de/?BL=DE&Beteiligung=Fahrrad&Jahr=2017"
        width="100%"
        height="800"
        style={{
          border: "1px solid #ccc",
          borderRadius: "10px"
        }}
      />

    </div>
  );
}

export default AccidentMap;