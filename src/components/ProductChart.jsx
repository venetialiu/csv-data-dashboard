import { Area, Line, ComposedChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ProductChart = ({ data }) => {
  // calculate totalQuantity & totalRevenue by product
  const aggregatedData = Object.values(
    data.reduce((acc, row) => {
      const key = row.product;
      // if key is not in acc -> create item with empty values
      if (!acc[key]) {
        acc[key] = { product: key, totalQuantity: 0, totalRevenue: 0 };
      }
      acc[key].totalQuantity += Number(row.quantity);
      acc[key].totalRevenue += Number(row.revenue);
      return acc;
    }, {})
  ).map(item => ({
    ...item,
    avgRevenuePerUnit: item.totalQuantity
      ? item.totalRevenue / item.totalQuantity
      : 0,
  }));

  return (
    <>
      <h3>Revenue and Quantity Over Time</h3>
      <ComposedChart
        style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
        responsive
        data={aggregatedData}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="product" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalQuantity" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        <Area type="monotone" dataKey="totalRevenue" fill="#8884d8" stroke="#8884d8" />
        <Line type="monotone" dataKey="avgRevenuePerUnit" stroke="#ff7300" />
      </ComposedChart>
    </>
  );
};

export default ProductChart;
