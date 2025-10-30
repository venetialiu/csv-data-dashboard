import { ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Scatter } from 'recharts';

const QuantityRevenueChart = ({ data }) => {
    // convert string dates into dates
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));


    return (
        <>
            <h3>Revenue and Quantity Over Time</h3>
            <ComposedChart
                style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
                responsive
                data={sortedData}
                margin={{
                    top: 20,
                    right: 0,
                    bottom: 0,
                    left: 0,
            }}
            >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="date" scale="band" />
                <YAxis width="auto" />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="revenue" fill="#8884d8" stroke="#8884d8" />
                <Bar dataKey="quantity" barSize={20} fill="#413ea0" />
            </ComposedChart>
        </>
    );
};

export default QuantityRevenueChart;
