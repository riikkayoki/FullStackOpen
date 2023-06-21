const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const mostBlogs = (blogs) => {
  const authors = _.countBy(blogs, "author");

  const author_with_most_blogs = _.findKey(authors, (value, key) => {
    return value === _.max(_.values(authors));
  });

  const number_of_blogs = _.find(authors, (value, key) => {
    return value === _.max(_.values(authors));
  });

  return { author: author_with_most_blogs, blogs: number_of_blogs };
};

const mostLikes = (blogs) => {
  const group_by_author = _.groupBy(blogs, "author");
  const find_all_likes_by_author = _.mapValues(
    group_by_author,
    (value, key) => {
      return _.sumBy(value, "likes");
    }
  );
  const author_with_most_likes = _.findKey(
    find_all_likes_by_author,
    (value, key) => {
      return value === _.max(_.values(find_all_likes_by_author));
    }
  );
  const number_of_likes = _.find(find_all_likes_by_author, (value, key) => {
    return value === _.max(_.values(find_all_likes_by_author));
  });
  return { author: author_with_most_likes, likes: number_of_likes };
};

module.exports = {
  dummy,
  totalLikes,
  mostBlogs,
  mostLikes,
};
