import React, { useEffect } from "react";
import { XAxis, YAxis, Tooltip, AreaChart, Area } from "recharts";

const BreakdownLineChart = ({ data, prevData }) => {
  const maxLength = Math.max(data?.length, prevData?.length);

  const combinedData = Array?.from({ length: maxLength }).map((_, index) => ({
    id: index + 1,
    length: data[index] ? data[index].length : null,
    prevLength: prevData[index] ? prevData[index].length : null,
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-white rounded-lg shadow-md shadow-gray-400 p-2">
          <p className="text-sm font-bold">{`Sentence ${label}`}</p>
          <p className="text-xs text-[#8884d8]">{`Current Length = ${payload[0]?.value}`}</p>
          {payload?.[1] && (
            <p className="text-xs text-[#82ca9d]">{`Previous Length = ${payload[1]?.value}`}</p>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="w-1/2">
      <AreaChart
        width={270}
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
          <linearGradient id="colorData" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPrevData" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="id" tick={{ fontSize: 10 }} tickLine={false} />
        <YAxis tick={{ fontSize: 10 }} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="length"
          stroke="#8884d8"
          fill="url(#colorData)"
          dot={{ r: 3 }}
        />
        <Area
          type="monotone"
          dataKey="prevLength"
          stroke="#82ca9d"
          fill="url(#colorPrevData)"
          dot={{ r: 3 }}
        />
      </AreaChart>
    </div>
  );
};

export default BreakdownLineChart;
