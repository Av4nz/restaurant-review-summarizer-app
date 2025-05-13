import React, { useEffect, useRef } from "react";
import cloud from "d3-cloud";
import * as d3 from "d3";

const WordCloud = ({
  words,
  width = 800,
  height = 600,
  minFont = 14,
  maxFont = 50,
  maxWords = 50,
}) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!words || words.length === 0) return;

    const fontScale = d3
      .scaleLinear()
      .domain([
        Math.min(...words.map((w) => w.value)),
        Math.max(...words.map((w) => w.value)),
      ])
      .range([minFont, maxFont]);

    const layout = cloud()
      .size([width, height])
      .words(
        words
          .slice(0, maxWords)
          .map((d) => ({ text: d.text, value: d.value, size: fontScale(d.value) }))
      ) 
      .padding(5)
      .rotate(() => ~~(Math.random() * 2) * 90)
      .fontSize((d) => d.size)
      .on("end", draw);

    layout.start();

    function draw(words) {
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove(); // Clear previous SVG content

      const group = svg
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`); // Center word cloud

      group
        .selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-size", (d) => `${d.size}px`)
        .style(
          "fill",
          () => d3.schemeCategory10[Math.floor(Math.random() * 10)]
        )
        .attr("text-anchor", "middle")
        .attr(
          "transform",
          (d) => `translate(${d.x},${d.y}) rotate(${d.rotate})`
        )
        .text((d) => d.text)
        .append("title")
        .text((d) => `${d.text}: ${d.value}`)
        .style("pointer-events", "all");

      group
        .selectAll("text")
        .on("mouseover", function (event, d) {
          d3.select(this)
            .transition()
            .duration(200)
            .style("font-size", `${d.size * 1.3}px`) // Enlarges on hover
            .style("fill", "#ff5733"); // Color change on hover
        })
        .on("mouseout", function (event, d) {
          d3.select(this)
            .transition()
            .duration(200)
            .style("font-size", `${d.size}px`) // Returns to original size
            .style(
              "fill",
              () => d3.schemeCategory10[Math.floor(Math.random() * 10)]
            ); // Reverts to original color
        });
    }
  }, [words, width, height, minFont, maxFont, maxWords]);

  return <svg ref={svgRef}></svg>;
};

export default WordCloud;
