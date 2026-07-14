import React, { useEffect, useState } from "react";
import axios from "axios";

function MandatoryQuestions() {

  const [answers, setAnswers] = useState({});

  useEffect(() => {

    async function loadAnswers() {

      try {

        const [
          q1,
          q2,
          q3,
          q4,
          q5,
          q6,
          q7
        ] = await Promise.all([

          axios.get("http://localhost:5000/api/v1/stats/earliest-year"),

          axios.get(
            "http://localhost:5000/api/v1/stats/personal-injury?state=Saxony&year=2023"
          ),

          axios.get(
            "http://localhost:5000/api/v1/stats/earliest-year?state=North-Rhine-Westphalia"
          ),

          axios.get(
            "http://localhost:5000/api/v1/stats/earliest-year?state=Mecklenburg-Western-Pomerania"
          ),

          axios.get(
            "http://localhost:5000/api/v1/stats/pedestrian-accidents?state=Berlin&year=2023"
          ),

          axios.get(
            "http://localhost:5000/api/v1/stats/accidents-per-population?state=Saxony&year=2023"
          ),

          axios.get(
            "http://localhost:5000/api/v1/stats/accident-traffic-summary?year=2023"
          )

        ]);

        setAnswers({

          q1: q1.data,

          q2: q2.data,

          q3: q3.data,

          q4: q4.data,

          q5: q5.data,

          q6: q6.data,

          q7: q7.data

        });

      }

      catch (err) {

        console.error(err);

      }

    }

    loadAnswers();

  }, []);

    return (

    <div className="mt-5">

      <h2 className="text-center mb-4">
        📋 Mandatory Questions
      </h2>

      <div className="row g-4">

        <div className="col-md-6">

          <div className="card shadow h-100">

            <div className="card-body">

              <h5>1. Earliest accident year</h5>

              <p className="display-6 text-primary">
                {answers.q1?.earliestYear || "..."}
              </p>

            </div>

          </div>

        </div>

        <div className="col-md-6">

          <div className="card shadow h-100">

            <div className="card-body">

              <h5>2. Personal injury accidents in Saxony (2023)</h5>

              <p className="display-6 text-danger">
                {answers.q2?.personalInjuryAccidents?.toLocaleString() || "..."}
              </p>

            </div>

          </div>

        </div>

        <div className="col-md-6">

          <div className="card shadow h-100">

            <div className="card-body">

              <h5>3. Earliest year in North Rhine-Westphalia</h5>

              <p className="display-6 text-success">
                {answers.q3?.earliestYear || "..."}
              </p>

            </div>

          </div>

        </div>

        <div className="col-md-6">

          <div className="card shadow h-100">

            <div className="card-body">

              <h5>4. Earliest year in Mecklenburg-Western Pomerania</h5>

              <p className="display-6 text-success">
                {answers.q4?.earliestYear || "..."}
              </p>

            </div>

          </div>

        </div>

        <div className="col-md-6">

          <div className="card shadow h-100">

            <div className="card-body">

              <h5>5. Pedestrian accidents in Berlin (2023)</h5>

              <p className="display-6 text-warning">
                {answers.q5?.pedestrianAccidents?.toLocaleString() || "..."}
              </p>

            </div>

          </div>

        </div>


                <div className="col-md-6">

          <div className="card shadow h-100">

            <div className="card-body">

              <h5>6. Accidents per 100,000 Population (Saxony, 2023)</h5>

              <p className="display-6 text-info">
                {answers.q6?.accidentsPer100000 || "..."}
              </p>

              <small className="text-muted">
                Population: {answers.q6?.population?.toLocaleString()}
              </small>

            </div>

          </div>

        </div>

        <div className="col-md-6">

          <div className="card shadow h-100">

            <div className="card-body">

              <h5>7. Accident & Traffic Statistics (2023)</h5>

              <p>
                <strong>Accidents:</strong>{" "}
                {answers.q7?.accidentCount?.toLocaleString()}
              </p>

              <p>
                <strong>Traffic Statistic:</strong>{" "}
                {answers.q7?.trafficStatisticTotal?.toLocaleString()}
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default MandatoryQuestions;