import React, { useState } from "react";
import ReactPaginate from "react-paginate";

function DataList({ data, currentPage, handlePageClick }) {
  const [filters, setFilters] = useState({
    endYear: "",
    topics: "",
    sector: "",
    region: "",
    PESTLE: "",
    source: "",
    country: "",
    city: "",
  });

  const getUniqueValues = (key) => {
    const uniqueValues = [...new Set(data.map((item) => item[key]))];
    return uniqueValues.filter(Boolean);
  };

  const itemsPerPage = 10;
  const offset = currentPage * itemsPerPage;

  const filteredData = data.filter((item) => {
    return (
      (!filters.endYear || item.end_year === filters.endYear) &&
      (!filters.topics || item.topic === filters.topics) &&
      (!filters.sector || item.sector === filters.sector) &&
      (!filters.region || item.region === filters.region) &&
      (!filters.PESTLE || item.pestle === filters.PESTLE) &&
      (!filters.source || item.source === filters.source) &&
      (!filters.SWOT || item.SWOT === filters.SWOT) &&
      (!filters.country || item.country === filters.country) &&
      (!filters.city || item.city === filters.city)
    );
  });

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div className="w-full p-4 bg-[#1A1C1E] rounded-lg shadow-lg flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-4 text-center">Data List</h2>
      <div className="flex justify-center mb-4">
        {/* End Year Dropdown */}
        <select
          name="endYear"
          value={filters.endYear}
          onChange={handleFilterChange}
          className="mr-2 px-2 py-1 rounded text-black"
        >
          <option value="" className="text-black">
            Select End Year
          </option>
          {getUniqueValues("end_year").map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <select
          name="sector"
          value={filters.sector}
          onChange={handleFilterChange}
          className="mr-2 px-2 py-1 rounded text-black"
        >
          <option value="" className="text-black">
            Select Sector
          </option>
          {getUniqueValues("sector").map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <select
          name="country"
          value={filters.country}
          onChange={handleFilterChange}
          className="mr-2 px-2 py-1 rounded text-black"
        >
          <option value="" className="text-black">
            Select country
          </option>
          {getUniqueValues("country").map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <select
          name="pestle"
          value={filters.pestle}
          onChange={handleFilterChange}
          className="mr-2 px-2 py-1 rounded text-black"
        >
          <option value="" className="text-black">
            Select pestle
          </option>
          {getUniqueValues("pestle").map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-1 overflow-auto">
        {filteredData.slice(offset, offset + itemsPerPage).map((item) => (
          <div key={item._id} className="mb-4 p-4 bg-[#2F3349] rounded">
            <p>
              <strong>Title:</strong> {item.title}
            </p>
            <p>
              <strong>Insight:</strong> {item.insight}
            </p>
            <p>
              <strong>Source:</strong> {item.source}
            </p>
            <p>
              <strong>Pestle:</strong> {item.pestle}
            </p>
            <p>
              <strong>Country:</strong> {item.country}
            </p>
            <p>
              <strong>Topic:</strong> {item.topic}
            </p>
            <p>
              <strong>Region:</strong> {item.region}
            </p>
            <p>
              <strong>End Year:</strong> {item.end_year}
            </p>
            <p>
              <strong>Learn More:</strong>{" "}
              <a href={item.url}>Click to Read More</a>
            </p>
          </div>
        ))}
      </div>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
        className="flex justify-center mt-4"
        pageClassName="px-2"
        pageLinkClassName="text-white"
        activeLinkClassName="font-bold font-white"
        previousLinkClassName="text-white mr-2"
        nextLinkClassName="text-white ml-2"
      />
    </div>
  );
}

export default DataList;
