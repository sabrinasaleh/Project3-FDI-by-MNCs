from flask import Flask, request, jsonify, render_template 
import pandas as pd
import joblib

app = Flask(__name__)

model = joblib.load("Artifacts/model.joblib")

# def predict_fdi_inflow(year, country_id, region_id, globalization_100):
#     model_input = [year, country_id, region_id, globalization_100]
#     return model.predict([model_input])[0]

globalization_dict = {"United Kingdom": 89,
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

country_list = globalization_dict.keys()

def predict_y(data_dict):

    year = data_dict["year"]
    country_id = data_dict["country_id"] 
    region_id = data_dict["region_id"]
    globalization_100 = globalization_dict[country_id]
    input_df = pd.DataFrame(
        {
            "year": [year],
            "country_id": [country_id],
            "region_id": [region_id],
            "globalization_100": [globalization_100],
        }
    )

    fdi_prediction = model.predict(input_df)[0]
    return fdi_prediction


@app.route("/")
@app.route("/index")
def index():
    # return "App is Up"
    return render_template("index.html", title="FDI in the US")


@app.route("/test/<variable>")
def index_test(variable):
    title=variable+" my variable"
    return render_template("index.html", title=title)



@app.route("/model_analysis")
def model_analysis():
    return render_template("model_analysis.html")


@app.route("/prediction", methods=["POST"])
def prediction():
    data_dict = request.get_json()

    year = data_dict["year"]
    country_id = data_dict["country_id"] 
    region_id = data_dict["region_id"]
    globalization_100 = data_dict["globalization_100"]
    input_df = pd.DataFrame(
        {
            "year": [year],
            "country_id": [country_id],
            "region_id": [region_id],
            "globalization_100": [globalization_100],
        }
    )

    fdi_prediction = model.predict(input_df)[0]

    # fdi_prediction = predict_fdi_inflow(year, country_id, region_id, globalization_100)  

    return jsonify({
        "year": year,
        "country_id": country_id, 
        "region_id": region_id,
        "globalization_100": globalization_100, 
        "fdi_prediction": fdi_prediction
    })


@app.route("/fdi_prediction", methods=["GET", "POST"])
def fdi_prediction():
    if request.method == "POST":
        data_dict = request.form
        print(data_dict)
        fdi_prediction = predict_y(data_dict)
        prediction_content = fdi_prediction
        # here is where we will generate the prediction and plotly plot 
        title = "Predicted FDI"
        return render_template("predictions.html", prediction_content=prediction_content, title=title, region_list=region_list, country_list=country_list, placeholder_values=data_dict)
    else:
        title = "Select your prediction"
        placeholders = {"year": 2019,
                        "country_id": "Select a country", 
                        "region_id": "Select a region"}

        return render_template("predictions.html", title=title, region_list=region_list, country_list=country_list, placeholder_values=placeholders)
    
    # jsonify({
    #     "year": year,
    #     "country_id": country_id, 
    #     "region_id": region_id,
    #     "globalization_100": globalization_100, 
    #     "fdi_prediction": fdi_prediction
    # })

# Questions for "prediction" route:
## How to connect "model.joblib" and "full_data.json"/"drop_down.json" to assign the value of Xs and give fdi prediction?
## How to connect the "drop-down javascript" of regions, countries, and year to give fdi prection for the selection?
## How to connect the "plotly-plot javascript" - specific plot for the selected country and one common global map? 

## How to do "return render_template("predictions.html")? 


@app.route("/observations_insights")
def observations_insights():
    return render_template("observations_insights.html")


if __name__ == "__main__":
        app.run(debug=True)