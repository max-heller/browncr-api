import { Sequelize } from 'sequelize/types';

import { initializeDatabase } from './db';
import { getReviews, ReviewStatic } from './review';

let db: Sequelize, model: ReviewStatic;
beforeAll(() => {
    [db, model] = initializeDatabase();
});

test("authenticates with database", async () => {
    expect(await db.authenticate().thenReturn(true).catchReturn(false)).toBe(true);
});

test("retrieving reviews for empty list of courses", async () => {
    expect(await getReviews(model, [])).toHaveLength(0);
});

test("retrieving all reviews", async () => {
    let reviews = await getReviews(model);
    expect(reviews.length).toBeGreaterThan(0);
    reviews.forEach(review => {
        expect(review.course_name).not.toEqual("");
        expect(review.courseavg).toBeGreaterThanOrEqual(1);
        expect(review.courseavg).toBeLessThanOrEqual(5);
        expect(review.profavg).toBeGreaterThanOrEqual(1);
        expect(review.profavg).toBeLessThanOrEqual(5);
    });
});

test("review retrieval for single course", async () => {
    const reviews = await getReviews(model, ["CSCI 0190"]);
    expect(reviews.length).toBeGreaterThan(0);
    reviews.forEach(review => {
        expect(review.course_name).toEqual("CSCI 0190");
    });
});

test("retrieving reviews for multiple courses", async () => {
    const courses = ["CSCI 1670", "CSCI 1450", "MATH 0540"];
    const reviews = await getReviews(model, courses);
    expect(reviews.length).toBeGreaterThan(0);
    expect(reviews.every(review => courses.includes(review.course_name))).toBe(true);
    expect(courses
        .every(course =>
            reviews.some(review =>
                review.course_name === course)))
        .toBe(true);
});

test("retrieving reviews for nonexistent course", async () => {
    expect(await getReviews(model, ["abc 123"])).toHaveLength(0);
});