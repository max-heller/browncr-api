import * as functions from 'firebase-functions';
let config;
if (process.env.GCLOUD_PROJECT === 'brown-critical-review') {
    config = functions.config().db;
} else {
    if (process.env.NODE_ENV !== 'production') require('dotenv').config();
    config = JSON.parse(process.env.DB_CONFIG || "{}");
}
if (config === {}) throw new Error("No database configuration loaded");
config["pool"] = { "max": 100, "min": 0, "idle": 10000 };

import { Sequelize, Op, DataTypes } from 'sequelize';
const sequelize = new Sequelize(config.database, config.username, config.password, config);
const Review = require('./review.js')(sequelize, DataTypes);

export const getAllScores = functions.https.onRequest((req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET");
    res.set("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token");
    res.set("Access-Control-Max-Age", "3600");

    return Review
        .findAll({
            attributes: [
                "department_code", "course_num", "edition",
                "courseavg", "profavg"
            ],
            where: {
                courseavg: { [Op.between]: [1, 5] },
                profavg: { [Op.between]: [1, 5] },
            }
        })
        .then((reviews: any) => res.status(200).send(reviews))
        .catch((error: any) => res.status(400).send(error));
});