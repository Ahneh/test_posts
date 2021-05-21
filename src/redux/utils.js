export const getCountRepeatedWord = (array) => {
  let countWords = {};

  array.forEach((x) => (countWords[x] = (countWords[x] || 0) + 1));

  return countWords;
};
export const getFormatedPost = (id, idPost, post) => ({
  id,
  idPost,
  descriptionsArray: post.body.toLowerCase().split(" "),
  titleArray: post.title.toLowerCase().split(" "),
});
export const getCountSameWordObj = (el) => ({
  idPost: el.idPost,
  countDescriptionWords: getCountRepeatedWord(el.descriptionsArray),
  countTitleWords: getCountRepeatedWord(el.titleArray),
});
export const getIndexSearchableObj = (array, id) =>
  array.findIndex((el) => el.id === id);
