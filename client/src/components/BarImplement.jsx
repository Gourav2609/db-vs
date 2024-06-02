import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

export default function CountryBarGraph({ data }) {
  const countryData = data.reduce((acc, item) => {
    if (item.country.trim() === "") {
      return acc;
    }
    if (!acc[item.country]) {
      acc[item.country] = 0;
    }
    acc[item.country]++;
    return acc;
  }, {});

  const xAxisData = Object.keys(countryData);
  const seriesData = Object.values(countryData);

  return (
    <BarChart
      xAxis={[{ scaleType: "band", data: xAxisData }]}
      series={[{ data: seriesData }]}
      width={700}
      height={500}
      leftAxis={null}
      bottomAxis={null}
    />
  );
}
