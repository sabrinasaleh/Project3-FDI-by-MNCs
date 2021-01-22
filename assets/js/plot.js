// Sort the data
var sortdata= data.sort((a, b) => b.searchdata - a.searchdata);

// Slice the first 10 objects for plotting
slicedData = sortdata.slice(0, 20);

// Reverse the array to accommodate Plotly's defaults
reversedData = slicedData.reverse();

// Trace1 for the Greek Data
var trace1 = {
  x: reversedData.map(object => object.searchdata),
  y: reversedData.map(object => object.countryName),
  text: reversedData.map(object => object.countryName),
  name: "Country",
  type: "bar",
  orientation: "h"
};

// data
var data = [trace1];

// Apply the group bar mode to the layout
var layout = {
  title: "",
  margin: {
    l: 100,
    r: 100,
    t: 100,
    b: 100
  }
};

// Render the plot to the div tag with id "plot"
Plotly.newPlot("plot", data, layout);

  