// Connect to json data and create initial plots
function init_build() {
    // d3.json("https://project2-petselect.herokuapp.com/visualization-data").then((data) => {
    d3.json("full_data.json").then((data) => {
            // Extract list of breed from json data
            var breed_data = data[0].primary_breed;
            console.log(breed_data);
  
            var breed_data_clean = Object.values(breed_data);
            console.log(breed_data_clean);
  
            let unique = breed_data_clean.filter(onlyUnique);
            console.log(unique);
            let unique_sorted = unique.sort(); // works for strings or only for numbers?
            console.log(unique_sorted);
  
            // Assign list of breeds to dropdown
            var dropDown = d3.select("#selDataset");
            unique_sorted.forEach((breed) => {
              dropDown.append("option").text(breed).property("value", breed);
            })
  
            console.log(data)
            populate_charts(data)
            let choose_subject = d3.select("#selDataset")
            let breeds = Object.values(data[0].primary_breed)
            console.log(breeds)
            unique.forEach((breed) => {
                choose_subject.append("option").attr("value", breed).text(breed)
            })
            return ""
        })
    }
  
  // Define function for Breed selector; unique 108 breeds
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  function populate_charts(data) {
    
 // Plot 0: Create plotly bar plot for dog breed; extract list of dog breed from json dataset
    var breed_data = data[0].primary_breed;
    console.log(breed_data);
    var breed_data_clean = Object.values(breed_data);
    console.log(breed_data_clean);    

    // Calculate count by breed
    let occurrences_breed = { };
    for (var i = 0, j = breed_data_clean.length; i < j; i++) {
      occurrences_breed[breed_data_clean[i]] = (occurrences_breed[breed_data_clean[i]] || 0) + 1;
    }
      console.log(occurrences_breed);     
     
    var trace1 = {
      x: Object.keys(occurrences_breed),
      y: Object.values(occurrences_breed),
      type: 'bar',
      transforms: [{
      type: 'sort',
      target: 'y',
      order: 'descending'
    // }]
    }, {
      type: 'filter',
      target: 'y',
      operation: '>',
      value: 5
    }]
    };  


    var dataBreed = [trace1];

    var layoutBreed = {
      title: 'Count of Dogs by Breed',
      };

    Plotly.newPlot('myPlotBreed', dataBreed, layoutBreed);
    ///// THIS }) below is necessary to read data
    // });


    // Plot#1: Connect to json data for dog sex **How to do this with data passed through "data" variable?**
    d3.json("https://project2-petselect.herokuapp.com/visualization-data").then((data) => {
    //   console.log(data)

    // Create plotly bar plot for dog sex; extract list of dog sex from json dataset
    var sex_data = data[0].sex;
    console.log(sex_data);
    var sex_data_clean = Object.values(sex_data);
    console.log(sex_data_clean);
    // var occurrences= sex_data_clean.filter(x=>x == "Male").length;  //// This Works
    // Calculate count by sex

    let occurrences = { };
    for (var i = 0, j = sex_data_clean.length; i < j; i++) {
      occurrences[sex_data_clean[i]] = (occurrences[sex_data_clean[i]] || 0) + 1;
    }
      console.log(occurrences); 
      
      // var xValues= Object.keys(occurrences);
      // console.log(xValues);

    // var xSex = ['Male', 'Female'];
    // // var ySex = [533, 430];

    var trace1 = {
      x: Object.keys(occurrences),
      y: Object.values(occurrences),
      type: 'bar',
      transforms: [{
      type: 'sort',
      target: 'y',
      order: 'descending'
     }]
     };  


    var dataSex = [trace1];

    var layoutSex = {
      title: 'Count of Dogs by Sex',
      // barmode: 'stack'
    };

    Plotly.newPlot('myPlotSex', dataSex, layoutSex);
    ///// THIS }) below is necessary to read data
    // });

// Plot#2: Connect to json data for dog age
d3.json("https://project2-petselect.herokuapp.com/visualization-data").then((data) => {
    // console.log(data)

    // Create plotly bar plot for dog sex; extract list of dog sex from json dataset
    var age_data = data[0].age_years;
    console.log(age_data);
    var age_data_clean = Object.values(age_data);
    console.log(age_data_clean);
    // var occurrences= sex_data_clean.filter(x=>x == "Male").length;  //// This Works

    // Calculate count by sex
  let occurrences_age = { };
  for (var i = 0, j = age_data_clean.length; i < j; i++) {
    occurrences_age[age_data_clean[i]] = (occurrences_age[age_data_clean[i]] || 0) + 1;
    }
    console.log(occurrences_age); 
    

  var trace2 = {
    x: Object.keys(occurrences_age),
    y: Object.values(occurrences_age),
    type: 'bar',
    };  


  var dataAge = [trace2];

  var layoutAge = {
    title: 'Count of Dogs by Age(Year)',
    // barmode: 'stack'
  };

  Plotly.newPlot('myPlotAge', dataAge, layoutAge);
  ///// THIS }) below is necessary to read data
  });




  

// // // Michelle's work starts here:
// function getPlots(id) {
    
//   //Read full_data.json
//       d3.json("full_data.json").then (fulldata =>{
//           console.log(fulldata)
//           var id = fulldata[0].year_id;
//           console.log(id)
//           var regionID =  fulldata[0].region_id.slice(0,10).reverse();
//           console.log(dataValues)
//           var countryID =  fulldata[0].country_id.slice(0,10);
//           console.log ()

//       // top 37 years for the plot
//           var top_years = (fulldata[0].year_id.slice(0, 37)).reverse();

//       // get the years to the desired form for the plot
//           var years_id = top_years.map(d => "Time Series" + d);
//           console.log(`Years: ${years_id}`)

//        // top 10 labels for the plot
//           var labels =  sampledata.samples[0].otu_labels.slice(0,10);
//           console.log(`OTU_labels: ${labels}`)
//           var trace = {
//               x: years_id ,
//               y: regionID ,
//               text: labels,
//               marker: {
//               color: 'black'},
//               type:"bar",
//               orientation: "h",
//           };
//           // create data variable
//           var data = [trace];
  
//           // create layout variable to set plots layout
//           var layout = {
//               title: "FDI",
//               yaxis:{
//                   tickmode:"linear",
//               },
//               margin: {
//                   l: 100,
//                   r: 100,
//                   t: 100,
//                   b: 30
//               }
//           };
  
//           // create the bar plot
//       Plotly.newPlot("bar", data, layout);

//           // The bubble chart
//           var trace1 = {
//               x: fulldata[0].year_id,
//               y: fulldata[0].region_id,
//               mode: "markers",
//               marker: {
//                   size: fulldata[0].region_id,
//                   color: fulldata[0].year_id
//               },
//               text:  fulldata[0].country_id
  
//           };
  
//           // set the layout for the bubble plot
//           var layout_2 = {
//               xaxis:{title: "Years"},
//               height: 600,
//               width: 1000
//           };
  
//           // creating data variable 
//           var data1 = [trace1];
  
//       // create the bubble plot
//       Plotly.newPlot("bubble", data1, layout_2); 
      
//       });
//   }  
//   // create the function to get the necessary data
//   function getDemoInfo(id) {

//   // read the json file to get data
//       d3.json("full_data.json").then((data)=> {

//   // get the metadata info for the demographic panel
//           var metadata = data.metadata;
  
//           console.log(metadata)
  
//         // filter meta data info by id
//          var result = metadata.filter(meta => meta.id.toString() === id)[0];
         
//         // select demographic panel to put data
//          var demographicInfo = d3.select("#sample-metadata");
          
//        // empty the demographic info panel each time before getting new id info
//          demographicInfo.html("");
  
//        // grab the necessary demographic data
//           Object.entries(result).forEach((key) => {   
//               demographicInfo.append("h5").text(key[0].toLowerCase() + ": " + key[1] + "\n");    
//           });
//       });
//   }
//   // create the function for the change event
//   function optionChanged(id) {
//       getPlots(id);
//       getDemoInfo(id);
//   }
  
//   // create the function for the initial data rendering
//   function init() {

//       // select dropdown menu 
//       var dropdown = d3.select("#selDataset");
  
//       // read the data 
//       d3.json("full_data.json").then((data)=> {
//           console.log(data)
  
//           // get the id data to the dropdwown menu
//           data.names.forEach(function(name) {
//               dropdown.append("option").text(name).property("value");
//           });
  
//           // call the functions to display the data and the plots to the page
//           getPlots(data.names[0]);
//           getDemoInfo(data.names[0]);
//       });
//   }
  
//   init();

  