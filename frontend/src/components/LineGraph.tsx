// import React from "react";
// @ts-ignore
import * as d3 from "d3";
// import * as data from "../../../backend/src/customers/models.ts";
import React, { useEffect, useRef } from "react";

interface DataObject {
  date: string;
  waterQuantity: number;
  variable1: number;
  variable2: number;
}

interface LineGraphProps {
  data: DataObject[];
}

const LineGraph: React.FC<LineGraphProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Set up dimensions
    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 30, left: 50 };

    // Set up SVG container
    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Set up scales
    const xScale = d3
      .scaleUtc()
      .domain(
        d3.extent(
          data,
          (d: { date: string | number | Date }) => new Date(d.date)
        ) as [Date, Date]
      )
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, (d: { waterQuantity: any }) => d.waterQuantity) as number,
      ])
      .range([height, 0]);

    // Set up axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // Append axes to the SVG
    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    svg.append("g").attr("class", "y-axis").call(yAxis);

    // Create line generator
    const line = d3
      .line<DataObject>()
      .x(
        (d: { date: string | number | Date }) =>
          xScale(new Date(d.date)) as number
      )
      .y((d: { waterQuantity: any }) => yScale(d.waterQuantity) as number);

    // Append line to the SVG
    svg.append("path").data([data]).attr("class", "line").attr("d", line);
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default LineGraph;
