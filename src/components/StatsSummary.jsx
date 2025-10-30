import './StatsSummary.css'

const StatsSummary = ({ data }) => {
    // calculate stats
    const totalRevenue = data.reduce((acc, row) => acc + row.revenue, 0);
    const totalQuantity = data.reduce((acc, row) => acc + row.quantity, 0);
    const productsSet = new Set(data.map(d => d.product));
    const numProducts = productsSet.size;
    const numTransactions = data.length;
    const avgRevenuePerProduct = totalRevenue / numProducts;

    return (
        <div className="stats-summary">
        <h2>Summary</h2>
        <div className="stats-row">
            <div className="stat-card">
            <p className="stat-label">Total Revenue</p>
            <p className="stat-value">${totalRevenue.toLocaleString()}</p>
            </div>
            <div className="stat-card">
            <p className="stat-label">Total Quantity</p>
            <p className="stat-value">{totalQuantity}</p>
            </div>
            <div className="stat-card">
            <p className="stat-label">Number of Transactions</p>
            <p className="stat-value">{numTransactions}</p>
            </div>
            <div className="stat-card">
            <p className="stat-label">Number of Products</p>
            <p className="stat-value">{numProducts}</p>
            </div>
            <div className="stat-card">
            <p className="stat-label">Avgerage Revenue per Product</p>
            <p className="stat-value">${avgRevenuePerProduct.toFixed(2)}</p>
            </div>
        </div>
        </div>
    );
};

export default StatsSummary;
