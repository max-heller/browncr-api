import * as dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

import { ReviewStatic, ReviewTable } from './review';

export function initializeDatabase(): [Sequelize, ReviewStatic] {
    if (process.env.NODE_ENV !== 'production')
        dotenv.config();
    try {
        const config = JSON.parse(process.env.DB_CONFIG);
        const db = new Sequelize(config.database, config.username, config.password, config);
        return [db, ReviewTable(db)];
    } catch (err) {
        throw new Error(`Unable to connect to database with config '${process.env.DB_CONFIG}': ${err}`);
    }
}