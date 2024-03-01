import React, { useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const SentenceLengthChart = ({ data, prevData }) => {
  const colorMap = {
    LONG: "#FFB3B3",
    MEDIUM: "#FFEA79",
    SHORT: "#ACE986",
  };

  const combinedData = data.map((item, index) => ({
    ...item,
    prevCount: prevData[index] && prevData[index].count,
  }));

  for (const entry of combinedData) {
    const color = colorMap[entry.type];
    entry.fill = `url(#color${color})`;
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-white rounded-lg shadow-md shadow-gray-400 p-2">
          <p className="text-xs font-semibold">
            Type{" "}
            <span
              className={`text-sm font-bold ${
                label === "LONG"
                  ? "text-[#FFB3B3]"
                  : label === "MEDIUM"
                  ? "text-[#FFEA79]"
                  : "text-[#ACE986]"
              }`}
            >{`${label}`}</span>
          </p>
          <p className="text-xs text-[#8884d8]">{`Current Count = ${payload[0]?.value}`}</p>
          {payload?.[1] && (
            <p className="text-xs text-[#82ca9d]">{`Previous Count = ${payload[1]?.value}`}</p>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div>
      <BarChart
        width={250}
        height={200}
        data={combinedData}
        margin={{
          top: 15,
          right: 25,
          left: -10,
          bottom: 15,
        }}
      >
        <defs>
          {Object.values(colorMap).map((color) => (
            <linearGradient
              key={color}
              id={`color${color}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="5%" stopColor={color} stopOpacity={0.75} />
              <stop offset="95%" stopColor={color} stopOpacity={0.5} />
            </linearGradient>
          ))}
        </defs>
        <XAxis tick={{ fontSize: 10 }} dataKey="type" tickLine={false} />
        <YAxis tick={{ fontSize: 10 }} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="count" fill="url(#colorData)" />
        <Bar dataKey="prevCount" fill="url(#colorPrevData)" />
      </BarChart>
    </div>
  );
};

export default SentenceLengthChart;
