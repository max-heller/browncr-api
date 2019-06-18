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
    res.status(200).send(Review.findAll({
        where: event.queryStringParameters
    }));
};