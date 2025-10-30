import DataTable from '../components/DataTable';
import StatsSummary from '../components/StatsSummary';
import QuantityRevenueChart from '../components/QuantityRevenueChart';
import ProductChart from '../components/ProductChart';
import './ResultsPage.css';

const ResultsPage = ({ data, onBack }) => {
  return (
    <div className="results-page">
        <button onClick={onBack} className="back-btn">Back</button>
        <h1 className="title">Dashboard</h1>  

        <div className="stats-section">
            <StatsSummary data={data} />
        </div>

        <div className="bottom-grid">
            <div className="table-section">
            <DataTable data={data} />
            </div>
            <div className="charts-section">
            <QuantityRevenueChart data={data} />
            <ProductChart data={data} />
            </div>
        </div>
    </div>
  );
};

export default ResultsPage;
