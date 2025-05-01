export const planLimits = {
  free: {
    maxClientCount: 1,
    maxSummaryCount: 3,
    maxChallengeWorkCount: 3,
  },
  start: {
    maxClientCount: 5,
    maxSummaryCount: 20,
    maxChallengeWorkCount: 20,
  },
  grow: {
    maxClientCount: 15,
    maxSummaryCount: 50,
    maxChallengeWorkCount: 50,
  },
  scale: {
    maxClientCount: 30,
    maxSummaryCount: 100,
    maxChallengeWorkCount: 100,
  },
};
