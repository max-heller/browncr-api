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

export function calculateScores(reviews: Review[]): { [s: string]: number } {
    const accumulators: { [s: string]: ScoreAccumulator } = {};
    reviews.map(convertIfNecessary).forEach(review => {
        [["course_name", "courseavg"], ["professor", "profavg"]].forEach(([key, score]) => {
            // Locate or initialize score accumulator
            let acc = accumulators[review[key]];
            if (!acc) acc = accumulators[review[key]] = new ScoreAccumulator();

            // Update accumulator
            acc.sum += review[score];
            acc.count++;
        });
    });

    const allScores = {};
    Object.entries(accumulators).forEach(([key, acc]) => {
        allScores[key] = acc.getScore();
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