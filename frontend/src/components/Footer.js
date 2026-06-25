function Footer() {

  return (

    <footer className="bg-dark text-white mt-5 p-5 rounded">

      <div className="row">

        <div className="col-md-6">

          <h3>
            🇩🇪 German Accident Analytics Dashboard
          </h3>

          <p>

            Built using React, Express.js,
            MongoDB and Swagger.

          </p>

        </div>

        <div className="col-md-3">

          <h5>Official Data</h5>

          <ul className="list-unstyled">

            <li>✔ Unfallatlas</li>
            <li>✔ Regionalatlas</li>
            <li>✔ Destatis</li>
            <li>✔ Municipality Register</li>

          </ul>

        </div>

        <div className="col-md-3">

          <h5>Features</h5>

          <ul className="list-unstyled">

            <li>Dashboard</li>
            <li>Charts</li>
            <li>Region Explorer</li>
            <li>REST API</li>
            <li>Swagger</li>

          </ul>

        </div>

      </div>

      <hr />

      <div className="text-center">

        © 2026 DBW Project

      </div>

    </footer>

  );

}

export default Footer;