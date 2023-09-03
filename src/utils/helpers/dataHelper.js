const filterAndMerge = (
  arrayToFilter,
  filterWord,
  keyword,
  additionalArrayToMerge = [],
) => [
  ...new Set([
    ...additionalArrayToMerge,
    ...arrayToFilter.filter((val) => val !== filterWord),
    keyword,
  ]),
];

const arrayDiff = (arr1, arr2) => arr1.filter((val) => !arr2.includes(val));

export { filterAndMerge, arrayDiff };
