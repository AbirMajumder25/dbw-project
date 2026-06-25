import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";

function Charts({ selectedYear, darkMode }) {

  const [monthly, setMonthly] = useState([]);
  const [yearly, setYearly] = useState([]);
  const [topStates, setTopStates] = useState([]);

  const [summary, setSummary] = useState({
    severity: [],
    vehicles: [],
    lighting: [],
    roadSurface: []
  });

  useEffect(() => {

    const yearQuery =
      selectedYear !== "all"
        ? `?year=${selectedYear}`
        : "";

    axios
      .get(`http://localhost:5000/api/v1/stats/monthly${yearQuery}`)
      .then(res => setMonthly(res.data));

    axios
      .get(`http://localhost:5000/api/v1/stats/yearly`)
      .then(res => setYearly(res.data));

    axios
      .get(`http://localhost:5000/api/v1/stats/top-states${yearQuery}`)
      .then(res => setTopStates(res.data));

    axios
      .get("http://localhost:5000/api/v1/stats/dashboard-summary")
      .then(res => setSummary(res.data));

  }, [selectedYear]);

  const monthlyData = monthly.map(item => ({
    month: item._id,
    accidents: item.totalAccidents
  }));

  const yearlyData = yearly.map(item => ({
    year: item._id,
    accidents: item.totalAccidents
  }));

  const stateNames = {
  "01": "Schleswig-Holstein",
  "02": "Hamburg",
  "03": "Lower Saxony",
  "04": "Bremen",
  "05": "North Rhine-Westphalia",
  "06": "Hesse",
  "07": "Rhineland-Palatinate",
  "08": "Baden-Württemberg",
  "09": "Bavaria",
  "10": "Saarland",
  "11": "Berlin",
  "12": "Brandenburg",
  "13": "Mecklenburg-Western Pomerania",
  "14": "Saxony",
  "15": "Saxony-Anhalt",
  "16": "Thuringia"
};

const stateData = topStates.map(item => ({
  state: stateNames[item._id] || item._id,
  accidents: item.totalAccidents
}));

  const axisColor = darkMode ? "#ffffff" : "#333333";
  const gridColor = darkMode ? "#444444" : "#dddddd";
  const tooltipStyle = {
    backgroundColor: darkMode ? "#1e1e1e" : "#ffffff",
    color: darkMode ? "#ffffff" : "#000000",
    border: "1px solid #555"
  };

  return (
    <>
      <div className="charts-grid">

        <div className="chart-card">
          <h3>Monthly Accident Trend</h3>

          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={monthlyData}>
              <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke={axisColor} />
              <YAxis stroke={axisColor} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ color: axisColor }} />
              <Line
                type="monotone"
                dataKey="accidents"
                stroke="#2563eb"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Top 5 Federal States</h3>

          <ResponsiveContainer width="100%" height={400}>
  <BarChart
    data={stateData}
    margin={{
      top: 20,
      right: 20,
      left: 20,
      bottom: 90
    }}
  >
    <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />

    <XAxis
      dataKey="state"
      stroke={axisColor}
      angle={-45}
      textAnchor="end"
      interval={0}
      height={90}
    />

    <YAxis stroke={axisColor} />
    <Tooltip contentStyle={tooltipStyle} />
    <Legend wrapperStyle={{ color: axisColor }} />
    <Bar dataKey="accidents" fill="#2563eb" />
  </BarChart>
</ResponsiveContainer>
        </div>

      </div>

      <div className="charts-grid">

        <div className="chart-card">
          <h3>Yearly Accident Trend</h3>

          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={yearlyData}>
              <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
              <XAxis dataKey="year" stroke={axisColor} />
              <YAxis stroke={axisColor} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ color: axisColor }} />
              <Line
                type="monotone"
                dataKey="accidents"
                stroke="#10b981"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Accident Severity</h3>

          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={summary.severity}>
              <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
              <XAxis dataKey="label" stroke={axisColor} />
              <YAxis stroke={axisColor} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ color: axisColor }} />
              <Bar dataKey="value" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      <div className="charts-grid">

        <div className="chart-card">
          <h3>Vehicle Types</h3>

          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={summary.vehicles}>
              <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
              <XAxis dataKey="label" stroke={axisColor} />
              <YAxis stroke={axisColor} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ color: axisColor }} />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Lighting Conditions</h3>

          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={summary.lighting}>
              <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
              <XAxis dataKey="label" stroke={axisColor} />
              <YAxis stroke={axisColor} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ color: axisColor }} />
              <Bar dataKey="value" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      <div className="chart-card">
        <h3>Road Surface Conditions</h3>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={summary.roadSurface}>
            <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
            <XAxis dataKey="label" stroke={axisColor} />
            <YAxis stroke={axisColor} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ color: axisColor }} />
            <Bar dataKey="value" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </>
  );
}

export default Charts;