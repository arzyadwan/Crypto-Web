"use client"

import * as React from "react"
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const GAUGE_VALUE = 38; // Fear
const GAUGE_MAX = 100;
const GAUGE_COLOR = "#FFD700";

const getSentiment = (value: number) => {
    if (value <= 25) return "Extreme Fear";
    if (value <= 45) return "Fear";
    if (value <= 55) return "Neutral";
    if (value <= 75) return "Greed";
    return "Extreme Greed";
}

export function FearGreedIndex() {
  const chartData = [{ name: "Fear & Greed", value: GAUGE_VALUE, fill: GAUGE_COLOR }];
  const sentiment = getSentiment(GAUGE_VALUE);

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="font-headline text-xl text-primary">Fear & Greed Index</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center">
        <div className="h-40 w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              innerRadius="70%"
              outerRadius="100%"
              barSize={20}
              data={chartData}
              startAngle={180}
              endAngle={0}
            >
              <PolarAngleAxis
                type="number"
                domain={[0, GAUGE_MAX]}
                angleAxisId={0}
                tick={false}
              />
              <RadialBar
                background
                dataKey="value"
                cornerRadius={10}
                className="fill-primary"
              />
            </RadialBarChart>
          </ResponsiveContainer>
           <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold font-code text-primary">{GAUGE_VALUE}</span>
                <span className="text-sm font-semibold text-muted-foreground">{sentiment}</span>
            </div>
        </div>
      </CardContent>
    </Card>
  )
}
