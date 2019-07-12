import { Review } from './review';

export class ScoreAccumulator {
    sum: number;
    count: number;

    constructor() {
        this.sum = this.count = 0;
    }

    public getScore(): number {
        return this.sum / this.count;
    }
}

type NestedMap<T> = { [s: string]: { [s: string]: T } };

export function calculateScores(reviews: Review[]): NestedMap<number> {
    const accumulators: NestedMap<ScoreAccumulator> = { course: {}, prof: {} };
    const updateAcc = (accs, key, score) => {
        const acc = accs[key] || (accs[key] = new ScoreAccumulator());
        acc.sum += score;
        acc.count++;
    }
    reviews.map(convertIfNecessary).forEach(review => {
        updateAcc(accumulators.course, review.course_name, review.courseavg);
        updateAcc(accumulators.prof, review.professor, review.profavg);
    });

    const allScores = {};
    Object.entries(accumulators).forEach(([type, nested]) => {
        allScores[type] = {};
        Object.entries(nested).forEach(([key, acc]) => {
            allScores[type][key] = acc.getScore();
        })
    });
    return allScores;
}

export function convertIfNecessary(review: Review): Review {
    function shouldConvert(edition: string): boolean {
        const arr = edition.split('.').map(s => Number.parseInt(s));
        return (arr[0] < 2014 || (arr[0] === 2014 && arr[2] !== 2));
    }

    function convert(score: number): number {
        return (-4 / 3) * score + (19 / 3);
    }

    if (shouldConvert(review.edition)) {
        return {
            ...review,
            profavg: convert(review.profavg),
            courseavg: convert(review.courseavg),
        };
    }
    return review;
}