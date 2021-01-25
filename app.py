from flask import Flask, request, jsonify, render_template 
import pandas as pd
import joblib

# app = Flask(__name__, static_folder='static')
app = Flask(__name__)

model = joblib.load("Artifacts/model.joblib")

# def predict_fdi_inflow(year, country_id, region_id, globalization_100):
#     model_input = [year, country_id, region_id, globalization_100]
#     return model.predict([model_input])[0]


@app.route("/")
def index():
    # return "App is Up"
    return render_template("index.html")



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