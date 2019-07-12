import { calculateScores, convertIfNecessary, ScoreAccumulator } from './scores';

const review = {
    course_name: "CSCI 0190",
    professor: "sk",
    edition: "2019.2020.1",
    courseavg: 4.5,
    profavg: 4.7
};

test("accumulator instantiation", () => {
    const acc = new ScoreAccumulator();
    expect(acc.sum).toBe(0);
    expect(acc.count).toBe(0);
});

test("scores averaged from accumulator", () => {
    const acc = new ScoreAccumulator();
    acc.sum = 15;
    acc.count = 3;
    expect(acc.getScore()).toEqual(5);
});

test("no reviews => no scores", () => {
    const scores = calculateScores([]);
    expect(scores).toEqual({});
});

test("valid scores retrieved for single review", async () => {
    const scores = calculateScores([review]);
    expect(scores[review.course_name]).toEqual(review.courseavg);
    expect(scores[review.professor]).toEqual(review.profavg);
});

test("multiple reviews' scores averaged", async () => {
    const reviews = [
        { ...review, courseavg: 4.6, profavg: 4.4 },
        { ...review, courseavg: 3.4, profavg: 1.3 },
        { ...review, courseavg: 2.5, profavg: 2.6 },
    ];
    const scores = calculateScores(reviews);
    expect(scores).toEqual({
        "CSCI 0190": (4.6 + 3.4 + 2.5) / 3,
        "sk": (4.4 + 1.3 + 2.6) / 3
    });
});

test("scores calculated for each course in reviews", () => {
    const reviews = [
        { ...review, course_name: "ENGL 0900", professor: "a" },
        { ...review, course_name: "ENGN 0030", professor: "b" },
        { ...review, course_name: "CSCI 1670", professor: "c" },
    ];
    expect(calculateScores(reviews)).toEqual({
        "ENGL 0900": review.courseavg,
        "ENGN 0030": review.courseavg,
        "CSCI 1670": review.courseavg,
        "a": review.profavg,
        "b": review.profavg,
        "c": review.profavg
    });
});

test("score calculation converts old reviews", () => {
    const review = {
        course_name: "CSCI 1670",
        professor: "twd",
        edition: "2012.2013.1",
        courseavg: 1,
        profavg: 1
    };
    expect(calculateScores([review])).toEqual({
        "CSCI 1670": 5,
        "twd": 5
    });
});

test("score conversion for old reviews", () => {
    const beforeSwitch = {
        ...review,
        edition: "2012.2013.1",
        profavg: 1,
        courseavg: 4
    };
    {
        const converted = convertIfNecessary(beforeSwitch);
        expect(converted.profavg).toBe(5);
        expect(converted.courseavg).toBe(1);
    }
    const rightBeforeSwitch = {
        ...review,
        edition: "2014.2015.1",
        profavg: 4,
        courseavg: 1
    };
    {
        const converted = convertIfNecessary(rightBeforeSwitch);
        expect(converted.profavg).toBe(1);
        expect(converted.courseavg).toBe(5);
    }
});

test("score conversion doesn't affect new reviews", () => {
    const atSwitch = {
        ...review,
        edition: "2014.2015.2",
        profavg: 4.7,
        courseavg: 4.2
    };
    expect(convertIfNecessary(atSwitch)).toEqual(atSwitch);
    const afterSwitch = {
        ...review,
        edition: "2015.2016.1",
        profavg: 4.7,
        courseavg: 4.2
    };
    expect(convertIfNecessary(afterSwitch)).toEqual(afterSwitch);
});