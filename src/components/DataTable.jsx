import './DataTable.css'

const DataTable = ({ data }) => {
  return (
    <div className="data-table">
        <h3>Table</h3>
        <table>
            <thead>
            <tr>
                {Object.keys(data[0]).map((key) => (
                <th key={key}>{key.toUpperCase()}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map((row, i) => (
                <tr key={i}>
                <td>{row.date}</td>
                <td>{row.product}</td>
                <td>{row.quantity}</td>
                <td>
                    {row.revenue.toFixed ? row.revenue.toFixed(2) : row.revenue}
                </td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
  );
};

export default DataTable;
