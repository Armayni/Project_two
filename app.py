from flask import Flask, jsonify
import datetime as dt


import numpy as np
import pandas as pd

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from sqlalchemy import create_engine
engine = create_engine(
    "postgresql://test:test@localhost:5432/ProjectTwo", echo=False)

# engine = create_engine("sqlite:///Resources/hawaii.sqlite")

Base = automap_base()
Base.prepare(engine, reflect=True)
Base.classes.keys()
Sac_crime_data = Base.classes.Sacramento_crime
# Station = Base.classes.station
session = Session(engine)


app = Flask(__name__)


@app.route("/")
def welcome():
    return (
        f"Routes that are available:<br/>"
        f"/api/v1.0/precipitation<br/>"
        f"/api/v1.0/stations<br/>"
        f"/api/v1.0/tobs<br/>"
        f"/api/v1.0/start<br/>"
        f"/api/v1.0/start/end<br/>"
    )


@app.route("/api/v1.0/crime_data")
def crime_data():
    values = session.query(Sac_crime_data.Day_of_Week,
                           Sac_crime_data.Occurence_Date).all()
    list = []
    for value in values:
        dict_values = {"Day of week": value[0], "Occurence data": value[1]}
        list.append(dict_values)
    return jsonify(list)


if __name__ == "__main__":
    app.run(debug=True)
