import { Request, Response } from 'express';

import { initializeDatabase } from './db';
import { getReviews } from './review';
import { calculateScores } from './scores';

const [db, Review] = initializeDatabase();

exports.api = async (req: Request, res: Response) => {
    // Set CORS headers
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET");
    res.set("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token");
    res.set("Access-Control-Max-Age", "3600");

    // Parse list of desired courses, if present
    let courses: string[] = undefined;
    if (req.query.courses) {
        try {
            courses = JSON.parse(req.query.courses)
        } catch {
            return res.status(400).send("Unable to parse desired courses");
        }
    }

    // Find API request type and respond accordingly
    switch (req.query.type) {
        case "reviews": {
            const reviews = await getReviews(Review, courses);
            return res.status(200).send(reviews);
        }
        case "scores": {
            const reviews = await getReviews(Review, courses);
            const scores = calculateScores(reviews);
            return res.status(200).send(scores);
        }
        default:
            return res.status(400).send("Please specify a request type");
    }
};