if (process.env.NODE_ENV !== 'production')
    require('dotenv').config();
const config = JSON.parse(process.env.DB_CONFIG);

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const sequelize = new Sequelize(config.database, config.username, config.password, config);
const Review = require('./review.js')(sequelize, Sequelize.DataTypes);

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.getCourseReviews = (req, res) => {
    // Set CORS headers
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
                [Op.or]: {
                    courseavg: { [Op.between]: [1, 5] },
                    profavg: { [Op.between]: [1, 5] },
                }
            }
        })
        .then(reviews => res.status(200).send(reviews))
        .catch(error => res.status(400).send(error));
};