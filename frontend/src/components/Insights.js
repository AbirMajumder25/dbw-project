function Insights({ title, points }) {
  return (
    <div className="alert alert-info mt-4">

      <h5 className="mb-3">
        💡 {title}
      </h5>

      <ul className="mb-0">

        {points.map((point, index) => (
          <li key={index}>
            {point}
          </li>
        ))}

      </ul>

    </div>
  );
}

export default Insights;