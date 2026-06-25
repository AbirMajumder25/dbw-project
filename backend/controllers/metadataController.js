exports.getSources = (req, res) => {

  res.json({

    project: "German Road Traffic Accident Analytics",

    datasets: [

      {
        name: "Unfallatlas",
        description: "Official German road accident dataset",
        source: "https://unfallatlas.statistikportal.de/",
        format: "CSV / Shapefile / WMS"
      },

      {
        name: "Regionalatlas",
        description: "Official German regional statistics",
        source: "https://regionalatlas.statistikportal.de/",
        format: "CSV / GeoJSON"
      },

      {
        name: "Traffic Statistics",
        description: "Official German traffic statistics",
        source: "Imported CSV dataset",
        format: "CSV"
      }

    ]

  });

};