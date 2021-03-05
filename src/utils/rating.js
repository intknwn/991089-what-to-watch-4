export const convertRatingToScore = (value) => {
  switch (true) {
    case value >= 0 && value < 3:
      return `Bad`;
    case value >= 3 && value < 5:
      return `Normal`;
    case value >= 5 && value < 8:
      return `Good`;
    case value >= 8 && value < 10:
      return `Very good`;
    case value === 10:
      return `Awesome`;
    default:
      throw new Error(`Unexpected value`);
  }
};
