import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function PieActiveArc({ data }) {
  const pestleCounts = data.reduce((acc, item) => {
    const pestle = item.pestle;
    if (pestle) {
      acc[pestle] = (acc[pestle] || 0) + 1;
    }
    return acc;
  }, {});

  const chartData = Object.keys(pestleCounts).map((key) => ({
    id: key,
    label: key,
    value: pestleCounts[key],
  }));

  return (
    <div className="w-1/2">
      <PieChart
        series={[
          {
            data: chartData,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: { innerRadius: 0, additionalRadius: -2, color: "gray" },
          },
        ]}
        height={400}
        slotProps={{
          legend: {
            direction: "column",
            position: {
              vertical: "middle",
              horizontal: "right",
            },
            itemMarkWidth: 20,
            itemMarkHeight: 2,
            markGap: 5,
            itemGap: 10,
            labelStyle: {
              fill: "white",
              fontSize: 20,
            },
          },
        }}
      />
    </div>
  );
}
