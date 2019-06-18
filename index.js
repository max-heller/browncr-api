if (process.env.NODE_ENV !== 'production')
    require('dotenv').config();
const Sequelize = require('sequelize');

let config = JSON.parse(process.env.DB_CONFIG);
let sequelize = new Sequelize(config.database, config.username, config.password, config);
let Review = require('./review.js')(sequelize, Sequelize.DataTypes);

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.getCourseReviews = (req, res) => {
    // Set CORS headers to allow GETs from any origin with the Content-Type header
    // and cache preflight response for an 3600s
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Max-Age", "3600");

    console.log(req.body);
    res.status(200).send(Review.findAll({
        where: {
            department_code: req.body.department_code,
            course_num: req.body.course_num
        }
    }));
};