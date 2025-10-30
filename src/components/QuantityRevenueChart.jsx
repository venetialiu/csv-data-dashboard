import { ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Scatter } from 'recharts';

const QuantityRevenueChart = ({ data }) => {
    // Convert Date objects -> numeric timestamps 
    // then sort by date ascending
    const processedData = data.map((d) => ({
        ...d,
        date: d.date instanceof Date ? d.date.getTime() : new Date(d.date).getTime(),
    }))
    .sort((a, b) => a.date - b.date);

    return (
        <>
            <h3>Revenue and Quantity Over Time</h3>
            <ComposedChart
                style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
                responsive
                data={processedData}
                margin={{
                    top: 20,
                    right: 0,
                    bottom: 0,
                    left: 0,
            }}
            >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis
                    dataKey="date"
                    type="number"
                    scale="time"
                    domain={['auto', 'auto']}
                    tickFormatter={(tick) =>
                        new Date(tick).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                    }
                />
                <YAxis width="auto" />
                <Tooltip 
                    labelFormatter={(value) =>
                        new Date(value).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        })
                    }
                />
                <Legend />
                <Area type="monotone" dataKey="revenue" fill="#8884d8" stroke="#8884d8" />
                <Bar dataKey="quantity" barSize={Math.max(2, 800 / data.length)}  fill="#413ea0" />
            </ComposedChart>
        </>
    );
};

export default QuantityRevenueChart;
