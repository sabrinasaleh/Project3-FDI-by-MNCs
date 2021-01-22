function getPlots(id) {
    
  //Read full_data.json
      d3.json("full_data.json").then (fulldata =>{
          console.log(fulldata)
          var id = fulldata[0].year_id;
          console.log(id)
          var regionID =  fulldata[0].region_id.slice(0,10).reverse();
          console.log(dataValues)
          var countryID =  fulldata[0].country_id.slice(0,10);
          console.log ()

      // top 37 years for the plot
          var top_years = (fulldata[0].year_id.slice(0, 37)).reverse();

      // get the years to the desired form for the plot
          var years_id = top_years.map(d => "Time Series" + d);
          console.log(`Years: ${years_id}`)

       // top 10 labels for the plot
          var labels =  sampledata.samples[0].otu_labels.slice(0,10);
          console.log(`OTU_labels: ${labels}`)
          var trace = {
              x: years_id ,
              y: regionID ,
              text: labels,
              marker: {
              color: 'black'},
              type:"bar",
              orientation: "h",
          };
          // create data variable
          var data = [trace];
  
          // create layout variable to set plots layout
          var layout = {
              title: "FDI",
              yaxis:{
                  tickmode:"linear",
              },
              margin: {
                  l: 100,
                  r: 100,
                  t: 100,
                  b: 30
              }
          };
  
          // create the bar plot
      Plotly.newPlot("bar", data, layout);

          // The bubble chart
          var trace1 = {
              x: fulldata[0].year_id,
              y: fulldata[0].region_id,
              mode: "markers",
              marker: {
                  size: fulldata[0].region_id,
                  color: fulldata[0].year_id
              },
              text:  fulldata[0].country_id
  
          };
  
          // set the layout for the bubble plot
          var layout_2 = {
              xaxis:{title: "Years"},
              height: 600,
              width: 1000
          };
  
          // creating data variable 
          var data1 = [trace1];
  
      // create the bubble plot
      Plotly.newPlot("bubble", data1, layout_2); 
      
      });
  }  
  // create the function to get the necessary data
  function getDemoInfo(id) {

  // read the json file to get data
      d3.json("full_data.json").then((data)=> {

  // get the metadata info for the demographic panel
          var metadata = data.metadata;
  
          console.log(metadata)
  
        // filter meta data info by id
         var result = metadata.filter(meta => meta.id.toString() === id)[0];
         
        // select demographic panel to put data
         var demographicInfo = d3.select("#sample-metadata");
          
       // empty the demographic info panel each time before getting new id info
         demographicInfo.html("");
  
       // grab the necessary demographic data
          Object.entries(result).forEach((key) => {   
              demographicInfo.append("h5").text(key[0].toLowerCase() + ": " + key[1] + "\n");    
          });
      });
  }
  // create the function for the change event
  function optionChanged(id) {
      getPlots(id);
      getDemoInfo(id);
  }
  
  // create the function for the initial data rendering
  function init() {

      // select dropdown menu 
      var dropdown = d3.select("#selDataset");
  
      // read the data 
      d3.json("full_data.json").then((data)=> {
          console.log(data)
  
          // get the id data to the dropdwown menu
          data.names.forEach(function(name) {
              dropdown.append("option").text(name).property("value");
          });
  
          // call the functions to display the data and the plots to the page
          getPlots(data.names[0]);
          getDemoInfo(data.names[0]);
      });
  }
  
  init();

  