const currentSumObj = (obj, el) => {
  let currentSum = 0;
  for (const [key, value] of Object.entries(obj)) {
    const currentWord = el[key];

    if (!!currentWord) {
      currentSum += Math.min(currentWord, value);
    }
  }
  return currentSum;
};

export const compareCounts = (currentItemPost, arrayFromCompare) => ({
  itemDescription: arrayFromCompare.map((el) => {
    let compareItemsValue = currentSumObj(
      currentItemPost.countDescriptionWords,
      el.countDescriptionWords,
    );
    compareItemsValue += currentSumObj(
      currentItemPost.countTitleWords,
      el.countTitleWords,
    );
    return { idPost: el.idPost, compareSum: compareItemsValue };
  }),
});

export const topThreeSame = (compareObj, compareCounts) => {
  const getThreeSamePost = compareCounts.itemDescription
    .filter((item) => item.compareSum)
    .sort((sum1, sum2) => sum2.compareSum - sum1.compareSum)
    .slice(0, 2);

  return compareObj.filter((el) =>
    getThreeSamePost.find((item) => item.idPost === el.id),
  );
};
