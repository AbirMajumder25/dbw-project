function YearFilter({ selectedYear, setSelectedYear }) {

  return (

    <div className="card shadow border-0 mb-5">

      <div className="card-body">

        <h4 className="mb-3">
          📅 Filter by Year
        </h4>

        <select
          className="form-select"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >

          <option value="all">All Years</option>

          <option value="2016">2016</option>
          <option value="2017">2017</option>
          <option value="2018">2018</option>
          <option value="2019">2019</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>

        </select>

      </div>

    </div>

  );

}

export default YearFilter;