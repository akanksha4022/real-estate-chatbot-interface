import { useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip
} from "chart.js";

ChartJs.register(CategoryScale, LinearScale, PointElement, LineElement, Legend, Tooltip);

function App() {
  const [query, setQuery] = useState("");
  const [summary, setSummary] = useState("");
  const [chartData, setChartData] = useState(null);
  const [table, setTable] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const askBot = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setSummary("");
    setChartData(null);
    setTable({});
    setErrorMsg("");

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/query/", {
        query,
      });

      setSummary(res.data.summary);
      setChartData(res.data.chart);
      setTable(res.data.table);
    } catch (err) {
      setErrorMsg(
        err.response?.data?.error || "⚠ Something went wrong. Try again."
      );
    }

    setLoading(false);
  };

  // Chart Builder
  const buildChart = () => {
    if (!chartData) return null;

    const colors = ["blue", "green", "red", "purple", "orange"];

    const datasets = Object.keys(chartData).map((loc, idx) => ({
      label: loc.toUpperCase(),
      data: chartData[loc].prices,
      borderColor: colors[idx % colors.length],
      borderWidth: 2,
      tension: 0.3,
      fill: false
    }));

    const firstLoc = Object.keys(chartData)[0];
    const years = chartData[firstLoc].years;

    return {
      labels: years,
      datasets
    };
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Real Estate Analysis Chatbot</h2>

      {/* Input */}
      <div className="input-group">
        <input
          className="form-control"
          placeholder="Try: analysis of wakad"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="btn"
          style={{
            backgroundColor: "#2D3236",
            color: "white",
            border: "none"
          }}
          onClick={askBot}
        >
          Ask
        </button>
      </div>

      {loading && <p className="text-center mt-3">Processing…</p>}

      {/* Error */}
      {errorMsg && (
        <div className="alert alert-danger mt-4">
          <strong>{errorMsg}</strong>
        </div>
      )}

      {/* Summary */}
      {summary && (
        <>
          <div className="alert alert-info mt-4">
            <strong>Summary:</strong>
            <br />
            {summary}
          </div>

          <button
            className="btn btn-success mt-2"
            onClick={() =>
              window.open("http://127.0.0.1:8000/api/download/", "_blank")
            }
          >
            Download Full Dataset (CSV)
          </button>
        </>
      )}

      {/* Chart */}
      {chartData && (
        <div className="card p-3 mt-4">
          <h5>Price Trend Chart</h5>
          <Line data={buildChart()} />
        </div>
      )}

      {/* Table */}
      {Object.keys(table).length > 0 && (
        <div className="mt-4">
          <h4>Filtered Data</h4>

          {Object.keys(table).map((loc, idx) => (
            <div key={idx} className="mt-4">
              <h5 className="text-primary">{loc.toUpperCase()}</h5>

              <table className="table table-bordered">
                <thead>
                  <tr>
                    {Object.keys(table[loc][0]).map((col, i) => (
                      <th key={i}>{col.toUpperCase()}</th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {table[loc].map((row, r) => (
                    <tr key={r}>
                      {Object.values(row).map((val, c) => (
                        <td key={c}>{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
