from flask import Flask, jsonify
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect, desc
import numpy as np

engine = create_engine("sqlite:///.sqlite")
conn = engine.connect()

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the tables
Measurement = Base.classes.measurement
Station = Base.classes.station

# Create our session (link) from Python to the DB
session = Session(engine)

app = Flask(__name__)


@app.route("/")
def home():
    return "Hello, world!"


@app.route("/api/v1.0/precipitation")
def date():
    return ""


@app.route("/api/v1.0/stations")
def stations():
    return ""


@app.route("/api/v1.0/tobs")
def tobs():
    return jsonify(
        {
            tobs = session.query(Measure.tobs).\
filter(Measure.station == "USC00519281").\
filter(Measure.date >= query_year).all()
        }
    )


if __name__ == "__main__":
    app.run(debug=True)