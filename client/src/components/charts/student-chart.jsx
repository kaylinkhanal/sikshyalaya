"use client";

import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";

const chartData = [
  { month: "January", present: 186, absent: 80 },
  { month: "February", present: 305, absent: 200 },
  { month: "March", present: 237, absent: 120 },
  { month: "April", present: 73, absent: 190 },
  { month: "May", present: 209, absent: 130 },
  { month: "June", present: 214, absent: 140 },
];

const chartConfig = {
  absent: {
    label: "Absent",
    color: "hsl(var(--chart-1))",
  },
  present: {
    label: "Present",
    color: "hsl(var(--chart-2))",
  },
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-600 p-2 border border-transparent rounded shadow">
        <p className="font-semibold">{label}</p>
        {payload.map((pld) => (
          <p key={pld.dataKey} style={{ color: pld.fill }}>
            {pld.name}: {pld.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function StudentAttendance() {
  return (
    <Card className="w-full max-w-3xl mx-auto bg-slate-100">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-black text-lg">Attendance</CardTitle>
        <Button variant="ghost" size="icon">
          <Ellipsis className="h-4 w-4 text-black" />
        </Button>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <Tooltip
                cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
                content={<CustomTooltip />}
              />
              <Bar
                dataKey="absent"
                fill={chartConfig.absent.color}
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="present"
                fill={chartConfig.present.color}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
