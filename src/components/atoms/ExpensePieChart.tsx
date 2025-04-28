import { getCategoryColor } from "@/lib/utils";
import React, { FC } from "react";
import { PieChart } from "react-minimal-pie-chart";

interface Categories {
    [category: string]: number;
    // ... add other categories if needed
  }

  interface ExpensePieChartProps {
    categories: Categories; 
    width?: string;
  }

const tailwindToHex: Record<string, string> = {
  "bg-blue-500": "#3B82F6",
  "bg-purple-500": "#A855F7",
  "bg-yellow-500": "#EAB308",
  "bg-orange-500": "#F97316",
  "bg-pink-500": "#EC4899",
  "bg-green-500": "#22C55E",
  "bg-red-500": "#EF4444",
  "bg-indigo-500": "#6366F1",
  "bg-teal-500": "#14B8A6",
  "bg-gray-500": "#6B7280",
};

const ExpensePieChart: FC<ExpensePieChartProps> = ({ categories, width = '300px' }) => {
  // Transform data into pie chart format
  const pieData = Object.entries(categories)
    .map(([title, value]) => ({
      title,
      value,
      color: tailwindToHex[getCategoryColor(title)], // Convert Tailwind → HEX
    }))
    .filter((item) => item.value > 0); // Ignore zero values

  return (
    <div style={{ width: width }}>
      {pieData.length === 0 ? (
        <p className="text-gray-500">No data to display.</p>
      ) : (
        <PieChart
          data={pieData}
          label={({ dataEntry }) => `${dataEntry.title}`}
          labelStyle={{ fontSize: "5px", fill: "#333" }}
          animate
        />
      )}
    </div>
  );
};

export default ExpensePieChart;