// Function to plot CO2 data
function plotCO2Data(data) {
  // SVG size and margins setup
  var margin = { top: 50, right: 50, bottom: 50, left: 50 },
      width = 980 - margin.left - margin.right,
      height = 670 - margin.top - margin.bottom;

  // Convert "years_before_2023" to actual years
  var x = d3.scaleLinear()
      .domain(d3.extent(data, d => 2023 - d["years_before_2023"])) // Convert to calendar years
      .range([0, width]);

  // Filter data
  data = data
      .filter(d => d["years_before_2023"] != null && !isNaN(d["years_before_2023"]) && d["years_before_2023"] >= 0 && d["years_before_2023"] <= 2500)
      .slice(0, 2500);

  // Log data for debugging
  console.log(data)
  console.log("Scale domain:", x.domain());
  console.log("Scale range:", x.range());

  // Scales
  // Years scale
  var x = d3.scaleLinear()
      .domain(d3.extent(data, d => d["years_before_2023"]))
      .range([0, width]);
  // CO2 scale
  var y = d3.scaleLinear()
      .domain(d3.extent(data, d => d["co2_ppmv"]))
      .range([height, 0]);
  // CH4 scale
  var y2 = d3.scaleLinear()
      .domain(d3.extent(data, d => d["ch4_ppb"]))
      .range([height, 0]);
  // Temp scale
  var y3 = d3.scaleLinear()
      .domain(d3.extent(data, d => d["temp_anomaly"]))
      .range([height, 0]);

  // Axes
  var xAxis = d3.axisBottom(x).ticks(3);
  var yAxis = d3.axisLeft(y).ticks(3);

  // Lines
  // Year vs CO2
  var valueLine = d3.line()
      .x(d => x(d["years_before_2023"]))
      .y(d => y(d["co2_ppmv"]));
  // Year vs CH4
  var valueLine2 = d3.line()
      .x(d => x(d["years_before_2023"]))
      .y(d => y2(d["ch4_ppb"]));
  // Year vs Temp
  var valueLine3 = d3.line()
      .x(d => x(d["years_before_2023"]))
      .y(d => y3(d["temp_anomaly"]));

  // Create SVG container
  var svg = d3.select("body")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

  // Define the clipping path
  svg.append("defs").append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("width", width)
      .attr("height", height);

  // Append x-axis
  var xAxisGroup = svg.append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis);

  // Append y-axis
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

  // Append lines with clipping path
  // CO2 vs Years line
  var path = svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 1.5)
      .attr("d", valueLine)
      .attr("clip-path", "url(#clip)");

  // CH4 vs Years line
  var path2 = svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "blue")
      .attr("stroke-width", 1.5)
      .attr("d", valueLine2)
      .attr("clip-path", "url(#clip)");

  // Temp vs Years line
  var path3 = svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", 1.5)
      .attr("d", valueLine3)
      .attr("clip-path", "url(#clip)");

  // Append labels
  // X-axis label (Year)
  svg.append("text")
      .attr("class", "label")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 10)
      .style("text-anchor", "middle")
      .text("Year");

  // Y-axis label (CO2)
  svg.append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -margin.left + 13)
      .style("text-anchor", "middle")
      .attr("stroke", "red")
      .text("CO2 (ppmv)");

  // Y-axis label (CH4)
  svg.append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2 + 75)
      .attr("y", -margin.left + 13)
      .style("text-anchor", "middle")
      .attr("stroke", "blue")
      .text("CH4");

  // Y-axis label (CO2)
  svg.append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2 - 75)
      .attr("y", -margin.left + 13)
      .style("text-anchor", "middle")
      .attr("stroke", "green")
      .text("Temp");

  // Y-axis label (CH4)
  svg.append("text")
      .attr("class", "title")
      .attr("x", width / 2)
      .attr("y", -margin.top / 2)
      .style("text-anchor", "middle")
      .text("CO2, CH4, and Temperature Anomalies Over Time");

  // Zoom functionality
  var zoom = d3.zoom()
      .scaleExtent([1, 10]) // Zoom scale (1x to 10x)
      .translateExtent([[0, 0], [width + 100, height]]) // Limit panning
      .on("zoom", function (event) {
          // Rescale x-axis
          var newX = event.transform.rescaleX(x);
          // Update x-axis
          xAxisGroup.call(d3.axisBottom(newX));

          // Update lines with new x-scale
          path.attr("d", d3.line()
              .x(d => newX(d["years_before_2023"]))
              .y(d => y(d["co2_ppmv"]))
          );

          path2.attr("d", d3.line()
              .x(d => newX(d["years_before_2023"]))
              .y(d => y2(d["ch4_ppb"]))
          );

          path3.attr("d", d3.line()
              .x(d => newX(d["years_before_2023"]))
              .y(d => y3(d["temp_anomaly"]))
          );
      });

  // Add zoom area
  svg.append("rect")
      .attr("width", width)
      .attr("height", height)
      .style("fill", "none")
      .style("pointer-events", "all")
      .call(zoom);
}

// JSON call to api
$.getJSON("https://tinyurl.com/k4chnujx", function (data) {
  // Logs JSON data
  data = data.slice(0, 2500)
  console.log(data);
  // Function call to plot data
  plotCO2Data(data);
});