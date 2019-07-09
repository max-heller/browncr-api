import { Request, Response } from 'express';
import * as JWTDecode from 'jwt-decode';

import { initializeDatabase } from './db';
import { getReviews } from './review';
import { calculateScores } from './scores';

const [db, Review] = initializeDatabase();
const allReviews = getReviews(Review);
const allScores = allReviews.then(calculateScores);

exports.api = async (req: Request, res: Response) => {
    // Set CORS headers
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET");
    res.set("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token, Authorization");
    res.set("Access-Control-Max-Age", "3600");

    // Check authorization token, slicing off 'Bearer ' from header
    const authError = (status) => res.status(status).send("Please provide an authorization token associated with brown.edu");
    const authHeader = req.headers.authorization;
    if (!authHeader) return authError(401);
    const token = JWTDecode(authHeader.slice(7));
    if (token["hd"] !== "brown.edu") {
        return authError(403);
    }

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
            const reviews = courses ? getReviews(Review, courses) : allReviews;
            return res.status(200).send(await reviews);
        }
        case "scores": {
            const scores = courses ?
                getReviews(Review, courses).then(calculateScores) : allScores;
            return res.status(200).send(await scores);
        }
        default:
            return res.status(400).send("Please specify a request type");
    }
};