import React, { useEffect, useRef } from "react";
import "./LinePlot.css";
// @ts-ignore
import * as d3 from "d3";

interface Data {
  net_id: number;
  date: Date;
  created_at: Date;
  water_collected: number;
}

interface LineGraphProps {
  data: Data[];
}

const LinePlot: React.FC<LineGraphProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // set the dimensions and margins of the graph
    var margin = { top: 20, right: 20, bottom: 50, left: 70 },
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
    // append the svg object to the body of the page
    var svg = d3
      .select("body")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Add X axis and Y axis
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);
    x.domain(
      d3.extent(data, (d: { created_at: Date }) => {
        return d.created_at;
      })
    );
    y.domain([
      0,
      d3.max(data, (d: { water_collected: number }) => {
        return d.water_collected;
      }),
    ]);
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));
    svg.append("g").call(d3.axisLeft(y));

    // add the Line
    var valueLine = d3
      .line()
      .x((d: { date: Date }) => {
        return x(d.date);
      })
      .y((d: { water_collected: number }) => {
        return y(d.water_collected);
      });
    svg
      .append("path")
      .data([data])
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", valueLine);
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default LinePlot;
