"use client";

import { useEffect, useState } from "react";
import {
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import { ChartContainer } from "@/components/ui/chart";
import { Ellipsis } from "lucide-react";
import { User } from "lucide-react";
import { UserX2 } from "lucide-react";
import { Button } from "../ui/button";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
};

export function CircleChart() {
  const [chartData, setChartData] = useState({
    data: [],
    settings: {
      startAngle: 0,
      endAngle: 270,
      innerRadius: 70,
      outerRadius: 120,
    },
  });

  useEffect(() => {
    async function fetchData() {
      try {
        // Uncomment for real fetch
        // const response = await fetch("/api/chart-data");
        // const fetchedData = await response.json();
        // Mocked data
        const mockedData = {
          data: [
            { name: "Inner Circle", value: 200, fill: "hsl(var(--chart-4))" },
            { name: "Outer Circle", value: 400, fill: "hsl(var(--chart-3))" },
          ],
          settings: {
            startAngle: 0,
            endAngle: 270,
            innerRadius: 70,
            outerRadius: 120,
          },
        };
        setChartData(mockedData);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <section className="w-fit min-w-[300px] 2xl:max-w-[400px] border-transparent border-4 rounded-md bg-yellow-50  p-[30px]">
      <div className="relative w-full">
        <div className="flex justify-between items-center">
          <h1 className="text-lg text-black font-semibold">Students</h1>
          <Button variant="ghost" className="hover:bg-transparent">
            <Ellipsis className="text-black" />
          </Button>
        </div>
        <div className="flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <User />
          <UserX2 />
        </div>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData.data}
            startAngle={chartData.settings.startAngle}
            endAngle={chartData.settings.endAngle}
            innerRadius={chartData.settings.innerRadius}
            outerRadius={chartData.settings.outerRadius}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[0, 0]}
            />
            {/* Single RadialBar rendering all data */}
            <RadialBar dataKey="value" background cornerRadius={10} />
            <PolarRadiusAxis
              tick={false}
              tickLine={false}
              axisLine={false}
            ></PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col justify-start">
          <span className="aspect-square rounded-full bg-chart-3 block max-w-8"></span>
          <strong>203</strong>
          <em>boys(59%)</em>
        </div>
        <div className="flex flex-col justify-start">
          <span className="aspect-square rounded-full bg-chart-4 block max-w-8"></span>
          <strong>85</strong>
          <em>girls(41%)</em>
        </div>
      </div>
    </section>
  );
}