import { calculateScores, convertIfNecessary, ScoreAccumulator, Scores } from './scores';

const review = {
    course_name: "CSCI 0190",
    edition: "2019.2020.1",
    courseavg: 4.5,
    profavg: 4.7
};

test("accumulator instantiation", () => {
    const acc = new ScoreAccumulator();
    expect(acc.profSum).toBe(0);
    expect(acc.profCount).toBe(0);
    expect(acc.courseSum).toBe(0);
    expect(acc.courseCount).toBe(0);
});

test("no scores in accumulator => undefined score in Scores", () => {
    let acc = new ScoreAccumulator();
    let scores = Scores.fromAccumulator(acc);
    expect(scores).toEqual(new Scores());
    expect(scores.prof).toBeUndefined();
    expect(scores.course).toBeUndefined();

    acc = new ScoreAccumulator();
    acc.courseCount++;
    acc.courseSum += 5;
    scores = Scores.fromAccumulator(acc);
    expect(scores.prof).toBeUndefined();
    expect(scores.course).toBe(5);

    acc = new ScoreAccumulator();
    acc.profCount++;
    acc.profSum += 5;
    scores = Scores.fromAccumulator(acc);
    expect(scores.prof).toBe(5);
    expect(scores.course).toBeUndefined();
});

test("scores averaged from accumulator", () => {
    const acc = new ScoreAccumulator();
    acc.courseSum = 15;
    acc.courseCount = 3;
    acc.profSum = 8;
    acc.profCount = 2;
    expect(Scores.fromAccumulator(acc)).toEqual(new Scores(4, 5));
});

test("no reviews => no scores", () => {
    const scores = calculateScores([]);
    expect(scores).toEqual({});
});

test("valid scores retrieved for single review", async () => {
    const scores = calculateScores([review]);
    expect(scores[review.course_name]).toEqual({
        course: review.courseavg,
        prof: review.profavg
    });
});

test("multiple reviews' scores averaged", async () => {
    const reviews = [
        { ...review, courseavg: 4.6, profavg: 4.4 },
        { ...review, courseavg: 3.4, profavg: 1.3 },
        { ...review, courseavg: 2.5, profavg: 2.6 },
    ];
    const scores = calculateScores(reviews);
    expect(scores).toEqual({
        "CSCI 0190": {
            course: (4.6 + 3.4 + 2.5) / 3,
            prof: (4.4 + 1.3 + 2.6) / 3
        }
    });
});

test("scores calculated for each course in reviews", () => {
    const reviews = [
        { ...review, course_name: "ENGL 0900" },
        { ...review, course_name: "ENGN 0030" },
        { ...review, course_name: "CSCI 1670" },
    ];
    const scores = calculateScores(reviews);
    const expectedScores = { course: review.courseavg, prof: review.profavg };
    expect(scores).toEqual({
        "ENGL 0900": expectedScores,
        "ENGN 0030": expectedScores,
        "CSCI 1670": expectedScores,
    });
});

test("score calculation converts old reviews", () => {
    const review = {


        course_name: "CSCI 1670",
        edition: "2012.2013.1",
        courseavg: 1,
        profavg: 1
    };
    expect(calculateScores([review])).toEqual({
        "CSCI 1670": {
            course: 5,
            prof: 5
        }
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
    expect(convertIfNecessary(atSwitch)).toBe(atSwitch);
    const afterSwitch = {
        ...review,
        edition: "2015.2016.1",
        profavg: 4.7,
        courseavg: 4.2
    };
    expect(convertIfNecessary(afterSwitch)).toBe(afterSwitch);
});