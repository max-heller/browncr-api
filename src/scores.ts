import { Review } from './review';

export class Scores {
    constructor(public prof?: number, public course?: number) { }

    public static fromAccumulator(acc: ScoreAccumulator): Scores {
        const scores = new Scores();
        if (acc.profCount > 0) scores.prof = acc.profSum / acc.profCount;
        if (acc.courseCount > 0) scores.course = acc.courseSum / acc.courseCount;
        return scores;
    }
}

export class ScoreAccumulator {
    profSum: number;
    profCount: number;
    courseSum: number;
    courseCount: number;

    constructor() {
        this.profSum = this.profCount = this.courseSum = this.courseCount = 0;
    }
}

export function calculateScores(reviews: Review[]): { [s: string]: Scores } {
    const accumulators: { [s: string]: ScoreAccumulator } = {};
    reviews.map(convertIfNecessary).forEach(review => {
        // Locate or initialize scores accumulator for the review's course
        let acc = accumulators[review.course_name];
        if (!acc) acc = accumulators[review.course_name] = new ScoreAccumulator();

        // Update course's scores accumulator
        acc.profSum += review.profavg;
        acc.profCount++;
        acc.courseSum += review.courseavg;
        acc.courseCount++;
    });

    const allScores = {};
    Object.entries(accumulators).forEach(([course, acc]) => {
        allScores[course] = Scores.fromAccumulator(acc);
    });
    return allScores;
}

export function convertIfNecessary(review: Review): Review {
    function shouldConvert(edition: string): boolean {
        var arr = edition.split('.').map(Number.parseInt);
        return (arr[0] < 2014 || (arr[0] === 2014 && arr[2] !== 2));
    }

    function convert(score: number): number {
        return (-4 / 3) * score + (19 / 3);
    }

    if (shouldConvert(review.edition)) {
        review.profavg = convert(review.profavg);
        review.courseavg = convert(review.courseavg);
    }
    return review;
}