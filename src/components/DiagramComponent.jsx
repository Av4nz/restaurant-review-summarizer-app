import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const DiagramComponent = ({ data }) => {
  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="keyword" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#62748e" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DiagramComponent;
