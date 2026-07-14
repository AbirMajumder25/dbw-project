import React, { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";

import Navbar from "./components/Navbar";
import DashboardCards from "./components/DashboardCards";
import YearFilter from "./components/YearFilter";
import Charts from "./components/Charts";
import AccidentMap from "./components/AccidentMap";
import RegionExplorer from "./components/RegionExplorer";
import Insights from "./components/Insights";
import Footer from "./components/Footer";

function App() {

  const [darkMode, setDarkMode] = useState(false);
  const [selectedYear, setSelectedYear] = useState("all");
  const [count, setCount] = useState(0);

  useEffect(() => {

    let url = "http://localhost:5000/api/v1/stats/count";

    if (selectedYear !== "all") {
      url += `?year=${selectedYear}`;
    }

    axios
      .get(url)
      .then((res) => {
        setCount(res.data.totalAccidents);
      })
      .catch(console.error);

  }, [selectedYear]);

  const insights = [

    selectedYear === "all"
      ? "Showing accident statistics for all available years."
      : `Showing statistics for ${selectedYear}.`,

    "Monthly accident trends update automatically.",

    "Top 5 federal states are ranked by accident count.",

    "Use the Region Explorer below to search municipalities and districts."

  ];

  return (

    <div className={`App ${darkMode ? "dark-mode" : ""}`}>

      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="container py-4">

        {/* Dashboard */}
        <section id="dashboard">

          <h1 className="text-center mb-2">
            🇩🇪 Germany Road Traffic Accident Dashboard
          </h1>

          <p className="text-center text-muted mb-5">
            Interactive analytics dashboard using Germany accident data (2016–2024)
          </p>

          <DashboardCards count={count} />

        </section>

        {/* Statistics */}
        <section id="statistics">

          <YearFilter
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          />

          <Charts
            selectedYear={selectedYear}
            darkMode={darkMode}
          />

        </section>

        {/* Data Sources */}
        <section id="sources">

          <AccidentMap />

        </section>

        {/* Regions */}
        <section id="regions">

          <RegionExplorer darkMode={darkMode} />

        </section>

        {/* Insights */}
        <Insights
          title="Dashboard Insights"
          points={insights}
        />

        <Footer />

      </div>

    </div>

  );

}

export default App;