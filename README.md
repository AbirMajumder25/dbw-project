# Germany Road Accident Analytics Platform

## Overview

This project was developed as part of the **Database and Web Technologies (DBW)** course at **Technische Universität Chemnitz**.

The platform integrates official German road accident data (2016–2024), stores it in MongoDB, exposes the data through a RESTful API, and provides an interactive React dashboard for analyzing accident statistics and trends.

---

## Technology Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Frontend
- React.js
- Recharts
- Axios
- Bootstrap
- CSS

### Documentation
- Swagger / OpenAPI

---

## Data Source

### German Accident Atlas (Unfallatlas)

Source:
https://www.opengeodata.nrw.de/produkte/transport_verkehr/unfallatlas/

Datasets used:
- Unfallorte_2016_LinRef
- Unfallorte2017_LinRef
- Unfallorte2018_LinRef
- Unfallorte2019_LinRef
- Unfallorte2020_LinRef
- Unfallorte_2021_LinRef
- Unfallorte2022_LinRef
- Unfallorte2023_LinRef
- Unfallorte2024_LinRef

Approximately **2.1 million** accident records were imported into MongoDB.

---

## Project Architecture

```
React Dashboard
        │
        ▼
REST API (Express.js)
        │
        ▼
MongoDB Database
        │
        ▼
ETL Import Pipeline
        │
        ▼
Official German Open Data
```

---

## Dashboard Features

- Dashboard summary cards
- Year filter (2016–2024)
- Monthly accident trend
- Yearly accident trend
- Top Federal States by accident count
- Accident severity analysis
- Vehicle type analysis
- Lighting condition analysis
- Road surface condition analysis
- Accident rate per 100,000 inhabitants
- Interactive charts
- Responsive design
- Dark mode support

---

## REST API

The backend provides RESTful API endpoints for:

- Accident records
- Dashboard summary
- Monthly statistics
- Yearly statistics
- Top Federal States
- Earliest accident year
- Personal injury accidents
- Pedestrian accidents
- Accident rate per 100,000 inhabitants
- Accident traffic summary
- Metadata

---

## Installation

### Backend

```bash
cd backend
npm install
npm start
```

or

```bash
node server.js
```

(depending on your project configuration)

### Frontend

```bash
cd frontend
npm install
npm start
```

---

## API Documentation

Swagger UI is available at:

```
http://localhost:5000/apidocs
```

(Replace the URL if your Swagger endpoint is different.)

---

## Author

**Abir Majumder**

M.Sc. Computer Science

Technische Universität Chemnitz
