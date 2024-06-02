import React, { useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";

export default function LineImplement({ data }) {
  const allYears = Array.from({ length: 35 }, (_, i) => (2016 + i).toString());
  const [startYear, setStartYear] = useState("2016");
  const [endYear, setEndYear] = useState("2050");

  const handleStartYearChange = (event) => {
    setStartYear(event.target.value);
    if (parseInt(event.target.value, 10) > parseInt(endYear, 10)) {
      setEndYear(event.target.value);
    }
  };

  const handleEndYearChange = (event) => {
    setEndYear(event.target.value);
  };

  const filteredYears = allYears.filter(
    (year) => parseInt(year, 10) >= parseInt(startYear, 10)
  );

  const filteredData = data.filter(
    (item) =>
      parseInt(item.start_year, 10) >= parseInt(startYear, 10) &&
      parseInt(item.start_year, 10) <= parseInt(endYear, 10)
  );

  const preprocessedData = filteredYears.map((year) => {
    const dataForYear = filteredData.filter(
      (item) => parseInt(item.start_year, 10) === parseInt(year, 10)
    );
    const intensityAvg = dataForYear.length
      ? dataForYear.reduce((acc, item) => acc + item.intensity, 0) /
        dataForYear.length
      : 0;
    const likelihoodAvg = dataForYear.length
      ? dataForYear.reduce((acc, item) => acc + item.likelihood, 0) /
        dataForYear.length
      : 0;
    const relevanceAvg = dataForYear.length
      ? dataForYear.reduce((acc, item) => acc + item.relevance, 0) /
        dataForYear.length
      : 0;

    return {
      year,
      intensity: intensityAvg,
      likelihood: likelihoodAvg,
      relevance: relevanceAvg,
    };
  });

  const intensityValues = preprocessedData.map((item) => item.intensity);
  const likelihoodValues = preprocessedData.map((item) => item.likelihood);
  const relevanceValues = preprocessedData.map((item) => item.relevance);

  return (
    <div className="w-fit h-fit   p-4">
      <div className="mb-4 flex justify-between">
        <div>
          <label className="text-white text-xl mr-2" htmlFor="startYearFilter">
            Start Year:
          </label>
          <select
            id="startYearFilter"
            value={startYear}
            onChange={handleStartYearChange}
            className="bg-[#2F3349] text-white p-2 rounded"
          >
            {allYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-white text-xl mr-2" htmlFor="endYearFilter">
            End Year:
          </label>
          <select
            id="endYearFilter"
            value={endYear}
            onChange={handleEndYearChange}
            className="bg-[#2F3349] text-white p-2 rounded"
          >
            {filteredYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      <p className="text-white text-center text-xl mb-4">
        Track the Intensity, Likelihood, Relevance
      </p>
      <LineChart
        xAxis={[{ data: filteredYears }]}
        series={[
          {
            data: intensityValues,
            label: "Intensity",
            showMark: false,
          },
          {
            data: likelihoodValues,
            label: "Likelihood",
            showMark: false,
          },
          {
            data: relevanceValues,
            label: "Relevance",
            showMark: false,
          },
        ]}
        width={500}
        height={300}
        leftAxis={null}
        bottomAxis={null}
        slotProps={{
          legend: {
            direction: "row",
            position: {
              vertical: "top",
              horizontal: "middle",
            },
            itemMarkWidth: 20,
            itemMarkHeight: 2,
            markGap: 5,
            itemGap: 10,
            labelStyle: {
              fill: "white",
              fontSize: 15,
            },
          },
        }}
      />
    </div>
  );
}
