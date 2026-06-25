# German Accident Analytics Platform

## Overview

This project was developed as part of the Database and Web Techniques (DBW) course at TU Chemnitz.

The goal of the project is to build a complete data integration platform based on official German open data sources. The system extracts, transforms, and loads accident data into a database and provides a REST API together with a web-based analytics dashboard.

The platform integrates German road accident data from 2016 to 2024 and allows users to explore accident statistics, yearly trends, monthly distributions, and state-level rankings.

---

## Technology Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Frontend

* React.js

### Documentation

* Swagger / OpenAPI

---

## Data Sources

### 1. Unfallatlas (German Accident Atlas)

Source:
https://www.opengeodata.nrw.de/produkte/transportverkehr/unfallatlas/

Datasets used:

* Unfallorte_2016_LinRef
* Unfallorte2017_LinRef
* Unfallorte2018_LinRef
* Unfallorte2019_LinRef
* Unfallorte2020_LinRef
* Unfallorte_2021_LinRef
* Unfallorte2022_LinRef
* Unfallorte2023_LinRef
* Unfallorte2024_LinRef

Total imported records:
Approximately 2.1 million accident records.

---

## Project Architecture

Frontend (React Dashboard)
↓
REST API (Express.js)
↓
MongoDB Database
↓
ETL Import Pipeline
↓
Official Open Data Sources

---

## ETL Process

### Extract

Accident datasets were downloaded from the official German Accident Atlas.

### Transform

The import script:

* Reads CSV/TXT files
* Parses semicolon-separated records
* Harmonizes the data structure
* Converts raw files into database records

### Load

The transformed data is imported into MongoDB.

Collection:

accidents

Database:

dbw

---

## Database Design

Database:
dbw

Collection:
accidents

The collection stores accident records from all years (2016–2024).

Example fields:

* UJAHR (Year)
* UMONAT (Month)
* ULAND (State)
* Accident location information
* Additional accident attributes

The schema is flexible and uses MongoDB's document model.

---

## REST API Endpoints

### Accident Data

GET /api/v1/accidents

Returns accident records with optional filtering.

Parameters:

* year
* state
* month

---

### Statistics

#### Total Accident Count

GET /api/v1/stats/count

Optional parameters:

* year
* state

---

#### Monthly Statistics

GET /api/v1/stats/monthly

Optional parameters:

* year

---

#### Top States

GET /api/v1/stats/top-states

Optional parameters:

* year

---

#### Yearly Statistics

GET /api/v1/stats/yearly

Returns accident counts grouped by year.

---

## Swagger Documentation

API documentation is available at:

http://localhost:5000/api-docs

---

## Dashboard Features

The React dashboard provides:

* Total accident count
* Year filter (2016–2024)
* Accident trends by year
* Monthly accident statistics
* Top states by accident count
* Real-time API integration

---

## Installation

### Clone Repository

git clone <repository-url>

### Backend

cd backend

npm install

node server.js

### Frontend

cd frontend

npm install

npm start

---

## Screenshots

Recommended screenshots for submission:

1. Dashboard Overview
2. Year Filter Example
3. MongoDB Compass (2.1M+ records)
4. Swagger Documentation
5. API Responses

---

## Author

Abir Majumder

TU Chemnitz

Database and Web Techniques (DBW)
