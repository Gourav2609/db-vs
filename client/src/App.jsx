import React, { useState, useEffect } from "react";
import axios from "axios";
import LineChart from "./components/LineImplement";
import PieActiveArc from "./components/PieActiveArc";
import CountryBarGraph from "./components/BarImplement";
import DataList from "./components/DataList";
import "./index.css";

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [viewOption, setViewOption] = useState("visualize"); // Default option

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/data");
      console.log("response", response);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const handleViewOptionChange = (option) => {
    setViewOption(option);
  };

  return (
    <div className="bg-[#0F1214] min-h-screen px-4 text-white flex flex-col">
      <header className="py-8 flex justify-center">
        <button
          onClick={() => handleViewOptionChange("visualize")}
          className={`mx-4 px-4 py-2 rounded ${
            viewOption === "visualize"
              ? "bg-blue-600 text-white"
              : "bg-gray-600 text-gray-300"
          }`}
        >
          Visualize Data
        </button>
        <button
          onClick={() => handleViewOptionChange("view")}
          className={`mx-4 px-4 py-2 rounded ${
            viewOption === "view"
              ? "bg-blue-600 text-white"
              : "bg-gray-600 text-gray-300"
          }`}
        >
          View Data
        </button>
      </header>
      {viewOption === "visualize" ? (
        <div className="sticky top-0 w-full p-4 bg-[#1A1C1E] rounded-lg shadow-lg flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4 text-center pt-4">
            Line Chart
          </h2>
          <LineChart data={data} />
          <h2 className="text-2xl font-semibold mb-4 text-center pt-4">
            PESTLE Pie Chart
          </h2>
          <PieActiveArc data={data} />
          <h2 className="text-2xl font-semibold mb-4 text-center pt-4">
            Country Bar Graph
          </h2>
          <CountryBarGraph data={data} />
        </div>
      ) : (
        <DataList
          data={data}
          currentPage={currentPage}
          handlePageClick={handlePageClick}
        />
      )}
    </div>
  );
}

export default App;
