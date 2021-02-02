var globalizationList = {"United Kingdom": 89,
"Austria": 89,
"Belgium": 90,
"Denmark": 88,
"Finland": 88,
"France": 88,
"Germany": 89,
"Ireland": 86,
"Italy": 83,
"Luxembourg": 83,
"Netherlands": 91,
"Norway": 85,
"Portugal": 85,
"Russia": 72,
"Spain": 84,
"Sweden": 89,
"Switzerland": 91,
"Greece": 83,
"Hungary": 84,
"Turkey": 71,
"Canada": 84,
"Australia": 82,
"New Zealand": 77,
"Japan": 78,
"China": 64,
"Hong Kong": 67,
"India": 62,
"Malaysia": 82,
"Philippines": 67,
"Singapore": 83,
"South Korea": 78,
"Israel": 77,
"Indonesia": 63,
"Pakistan": 54,
"Thailand": 72,
"Kuwait": 72,
"United Arab Emirates": 76,
"Argentina": 71,
"Brazil": 64,
"Chile": 76,
"Mexico": 72,
"Panama": 71,
"Venezuela": 52,
"South Africa": 71,
"Liberia": 48
}  




d3.select("input").on("click",
    () => {

        region_id = d3.select("#level1").property("value")
        country_id = d3.select("#level2").property("value")
        year = d3.select("#level3").property("value")

        // WIP
        predict_query = {
            "region_id": region_id,
            // right now country_id is the name
            "country_id": country_id,
            "year": year,
            "globalization_100": globalizationList[country_id]
        };

        console.log(globalizationList[country_id])

        d3.json("http://127.0.0.1:5000/prediction", {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(predict_query)
        }
        ).then(data => {
            console.log(data)
            document.getElementById("predictions_content_box").innerHTML = "$" + data['fdi_prediction'] + " (million)";
            // modify the element that has the prediction
        })

        data_query = {
            "country": country_id
        }

        // console.log(data_query)

        d3.json("http://127.0.0.1:5000/country_data", {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              },
            body: JSON.stringify(data_query)
        }).then(
            data => {
                console.log(data)
                // make the plot restyle
            }
        )

        
        let filter_country = data.filter(d => d.countries == data_query['country'])

        let x_country = filter_country.map(d => d.year);
        console.log(x_country);

        let y_country = filter_country.map(d => d.fdi_in_usa_million);
        console.log(y_country);

        var traceCountry = {
            x: x_country,
            y: y_country,        
            type: 'bar'
        };

        var dataCountry = [traceCountry]

        var layoutCountry = {
            title: 'Investment by MNCs from ' + data_query['country'],
            titlefont: {color: 'red'}, 
            xaxis: {
                automargin: true,            
                title: {
                text: "Years (1982-2019)",            
                }},
            yaxis: {
                automargin: true,           
                title: {
                text: "FDI ($ million)",
                standoff: 10             
                }}
            }
            
        Plotly.newPlot("plotCountry", dataCountry, layoutCountry)


    }
)


d3.select("reset").on("click",
    () => {
        console.log('selections reset');
        document.getElementById("level1").selectedIndex = 0;
        document.getElementById("level2").selectedIndex = 0;
        document.getElementById("level3").selectedIndex = 0;
        document.getElementById("predictions_content_box").innerHTML = "$ (million)";


        var plotDiv = document.getElementById('plotCountry');
        while(plotDiv.firstChild){
            plotDiv.removeChild(plotDiv.firstChild);
        }

    }
)


