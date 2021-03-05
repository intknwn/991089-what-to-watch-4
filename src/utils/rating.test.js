import {convertRatingToScore} from './rating.js';

describe(`convertRatingToScore function`, () => {
  it(`Called with rating between 0 and 2 should return "Bad"`, () => {
    expect(convertRatingToScore(0)).toBe(`Bad`);
    expect(convertRatingToScore(1)).toBe(`Bad`);
    expect(convertRatingToScore(2)).toBe(`Bad`);
    expect(convertRatingToScore(2.9)).toBe(`Bad`);
  });

  it(`Called with rating between 3 and 4 should return "Normal"`, () => {
    expect(convertRatingToScore(3)).toBe(`Normal`);
    expect(convertRatingToScore(4)).toBe(`Normal`);
    expect(convertRatingToScore(4.9)).toBe(`Normal`);
  });

  it(`Called with rating between 5 and 7 should return "Good"`, () => {
    expect(convertRatingToScore(5)).toBe(`Good`);
    expect(convertRatingToScore(6)).toBe(`Good`);
    expect(convertRatingToScore(7)).toBe(`Good`);
    expect(convertRatingToScore(7.9)).toBe(`Good`);
  });

  it(`Called with rating between 8 and 9 should return "Very good"`, () => {
    expect(convertRatingToScore(8)).toBe(`Very good`);
    expect(convertRatingToScore(9)).toBe(`Very good`);
    expect(convertRatingToScore(9.9)).toBe(`Very good`);
  });

  it(`Called with rating 10 should return "Awesome"`, () => {
    expect(convertRatingToScore(10)).toBe(`Awesome`);
  });

  it(`Called with unexpected values should throw error`, () => {
    expect(() => {
      convertRatingToScore(-1);
    }).toThrow();
    expect(() => {
      convertRatingToScore(11);
    }).toThrow();
  });
});
