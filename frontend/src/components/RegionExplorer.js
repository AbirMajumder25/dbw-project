import { useEffect, useState } from "react";

function RegionExplorer({ darkMode }) {
  const [regions, setRegions] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/regions?search=${search}`)
      .then((res) => res.json())
      .then((data) => {
        setRegions(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error(err);
        setRegions([]);
      });
  }, [search]);

  return (
    <div className="container mt-5" id="regions">
      <h2 className="mb-4">Germany Region Explorer (ARS/AGS)</h2>

      <input
        className="form-control mb-4"
        placeholder="Search municipality, state, district or ARS..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="table-responsive">
        <table
          className={`table table-striped table-hover ${
            darkMode ? "table-dark" : ""
          }`}
        >
          <thead>
            <tr>
              <th>ARS</th>
              <th>Municipality</th>
              <th>Population</th>
              <th>Area (km²)</th>
              <th>Postal Code</th>
              <th>Latitude</th>
              <th>Longitude</th>
            </tr>
          </thead>

          <tbody>
            {regions.length > 0 ? (
              regions.map((region) => (
                <tr key={region._id}>
                  <td>{region.ars}</td>
                  <td>{region.municipality}</td>
                  <td>{region.population?.toLocaleString()}</td>
                  <td>{region.area}</td>
                  <td>{region.postalCode}</td>
                  <td>{region.latitude}</td>
                  <td>{region.longitude}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No regions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RegionExplorer;