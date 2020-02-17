from sqlalchemy import create_engine
from sqlalchemy import create_engine, func
from sqlalchemy.sql import text
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base
import sqlalchemy
import pandas as pd
import numpy as np
import datetime as dt
from flask import Flask, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

engine = create_engine(
    "postgresql://test:test@localhost:5432/ProjectTwo", echo=False)

# engine = create_engine("sqlite:///Resources/hawaii.sqlite")

Base = automap_base()
Base.prepare(engine, reflect=True)
Base.classes.keys()
sac_crime_data = Base.classes.sacramento_crime
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
        f"/api/v1.0/crime_data<br/>"
        f"/api/v1.0/crime_data2<br/>"
        f"/api/v1.0/crime_data3<br/>"
    )


@app.route("/api/v1.0/crime_data")
@cross_origin(origin='*', headers=['Content- Type', 'Authorization'])
def crime_data():
    values = session.query(sac_crime_data.Day_of_Week,
                           sac_crime_data.Occurence_Date).all()
    list = []
    for value in values:
        dict_values = {"Day_of_week": value[0],
                       "Occurence_data": value[1]}
        list.append(dict_values)
    return jsonify(list)
# route for top crime for each district
@app.route("/api/v1.0/crime_data2")
@cross_origin(origin='*', headers=['Content- Type', 'Authorization'])
def crime_data2():

    subqry = session.query(sac_crime_data.Police_District,
                           sac_crime_data.Offense_Category,
                           func.count(sac_crime_data.Offense_Category),
                           func.row_number().over(partition_by=sac_crime_data.Police_District, order_by=func.count(sac_crime_data.Offense_Category).desc()).label("row_num")).\
        group_by(sac_crime_data.Police_District,
                 sac_crime_data.Offense_Category).subquery()

    values = session.query(subqry).filter(subqry.c.row_num == 1).filter(
        subqry.c.Police_District.in_(['1', '2', '3', '4', '5', '6'])).all()
    # values = session.query(sac_crime_data.Police_District,
    #                        sac_crime_data.Offense_Category,
    #                        func.count(sac_crime_data.Offense_Category),
    #                        func.row_number().over(partition_by=sac_crime_data.Police_District, order_by=func.count(sac_crime_data.Offense_Category)).label('row_num')).\
    #                        group_by(sac_crime_data.Police_District, sac_crime_data.Offense_Category).\
    #                        order_by(sac_crime_data.Police_District,func.count(sac_crime_data.Offense_Category).desc()).all()

    # values = session.query(sac_crime_data.Police_District,
    #                        sac_crime_data.Offense_Category,
    #                        func.count(sac_crime_data.Offense_Category)).\
    #                        group_by(sac_crime_data.Police_District, sac_crime_data.Offense_Category).\
    #                        order_by(func.count(sac_crime_data.Offense_Category).desc()).all()
    print(str(values))
    list = []
    for value in values:
        dict_values = {"Police_District": value[0],
                       "Offense_Category": value[1],
                       "Total_Crimes": value[2]}
        list.append(dict_values)
    return jsonify(list)

# route for crime by day of month(Brandon)
# @app.route("/api/v1.0/crime_data3")
# @cross_origin(origin='*', headers=['Content- Type', 'Authorization'])
# def crime_data3():

#     values = session.query(sac_crime_data.Beat,
#                            func.count(sac_crime_data.Offense_Category)).\
#         filter(sac_crime_data.Police_District.in_(['1', '2', '3', '4', '5', '6'])).\
#         group_by(sac_crime_data.Beat).\
#         order_by(func.count(sac_crime_data.Offense_Category).desc()).all()

#     list = []
#     for value in values:
#         dict_values = {"Beat": value[0],
#                        "Total_Crimes": value[1]}

#         list.append(dict_values)
#     return jsonify(list)


@app.route("/api/v1.0/crime_data3")
@cross_origin(origin='*', headers=['Content- Type', 'Authorization'])
def crime_data3():
    subqry3 = session.query(sac_crime_data.Day_of_Week, sac_crime_data.Offense_Category, func.count(
        sac_crime_data.Offense_Category)).group_by(sac_crime_data.Day_of_Week, sac_crime_data.Offense_Category).all()

    list = []
    for value in subqry3:
        dict_values = {"Day_of_week": value[0],
                       "Crimes_number": value[2]
                       }
        list.append(dict_values)
    return jsonify(list)


@app.route("/api/v1.0/crime_data4")
@cross_origin(origin='*', headers=['Content- Type', 'Authorization'])
def crime_data4():
    # subqry4 = session.query(sac_crime_data.Beat, sac_crime_data.Offense_Category, func.count(
    #     sac_crime_data.Offense_Category)).group_by(sac_crime_data.Beat, sac_crime_data.Offense_Category).all()
    subqry4 = session.query(sac_crime_data.Beat, func.count(
        sac_crime_data.Offense_Category)).\
        filter(sac_crime_data.Police_District.in_(['1', '2', '3', '4', '5', '6'])).\
        group_by(sac_crime_data.Beat).\
        order_by(func.count(sac_crime_data.Offense_Category).desc()).all()

    list = []
    for value in subqry4:
        dict_values = {"Beat": value[0],
                       "Crimes_number": value[1]
                       }
        list.append(dict_values)
    return jsonify(list)


if __name__ == "__main__":
    app.run(debug=True)
