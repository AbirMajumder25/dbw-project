import CountUp from "react-countup";

import {
    FaCarCrash,
    FaMapMarkedAlt,
    FaGlobeEurope,
    FaCalendarAlt
} from "react-icons/fa";

function DashboardCards({ count }) {

    return (

        <div className="row g-4 mb-5">

            <div className="col-lg-3">

                <div className="card shadow border-0 text-center h-100">

                    <div className="card-body">

                        <FaCarCrash
                            size={45}
                            className="text-danger mb-3"
                        />

                        <h6>Total Accidents</h6>

                        <h2>

                            <CountUp
                                end={count}
                                duration={2}
                                separator=","
                            />

                        </h2>

                    </div>

                </div>

            </div>

            <div className="col-lg-3">

                <div className="card shadow border-0 text-center h-100">

                    <div className="card-body">

                        <FaMapMarkedAlt
                            size={45}
                            className="text-primary mb-3"
                        />

                        <h6>Municipalities</h6>

                        <h2>10,959</h2>

                    </div>

                </div>

            </div>

            <div className="col-lg-3">

                <div className="card shadow border-0 text-center h-100">

                    <div className="card-body">

                        <FaGlobeEurope
                            size={45}
                            className="text-success mb-3"
                        />

                        <h6>Federal States</h6>

                        <h2>16</h2>

                    </div>

                </div>

            </div>

            <div className="col-lg-3">

                <div className="card shadow border-0 text-center h-100">

                    <div className="card-body">

                        <FaCalendarAlt
                            size={45}
                            className="text-warning mb-3"
                        />

                        <h6>Years Covered</h6>

                        <h2>2016–2024</h2>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default DashboardCards;