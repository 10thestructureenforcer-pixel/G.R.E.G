export const planLimits = {
  free: {
    maxClientCount: 1,
    maxSummaryCount: 5,
  },
  start: {
    maxClientCount: 5,
    maxSummaryCount: 25,
  },
  grow: {
    maxClientCount: 15,
    maxSummaryCount: 50,
  },
  scale: {
    maxClientCount: 30,
    maxSummaryCount: 100,
  },
};
