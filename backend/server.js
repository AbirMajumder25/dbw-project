const express = require("express");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const connectDB = require("./config/db");

const accidentRoutes = require("./routes/accidentRoutes");
const statsRoutes = require("./routes/statsRoutes");
const trafficStatisticsRoutes = require("./routes/trafficStatisticsRoutes");
const regionRoutes = require("./routes/regionRoutes");
const metadataRoutes = require("./routes/metadataRoutes");

const app = express();

// Connect MongoDB
connectDB();

app.use(cors());
app.use(express.json());

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/v1/accidents", accidentRoutes);
app.use("/api/v1/stats", statsRoutes);
app.use("/api/v1/traffic-statistics", trafficStatisticsRoutes);
app.use("/api/v1/regions", regionRoutes);
app.use("/api/v1/metadata", metadataRoutes);

// Home
app.get("/", (req, res) => {
  res.send("DBW API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});