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
    // Set CORS headers
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token");
    res.set("Access-Control-Max-Age", "3600");

    return Review
        .findAll({
            where: {
                department_code: req.query.department_code,
                course_num: req.query.course_num
            }
        })
        .then(reviews => {
            if (!reviews) {
                return res.status(404).send("Course not found");
            }
            return res.status(200).send(reviews);
        })
        .catch(error => res.status(400).send({ err: error, req: req }));
};