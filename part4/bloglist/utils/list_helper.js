
const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };

  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const reducer = (favorite, item) => {
    return favorite.likes > item.likes ? favorite : item;
  };

  return blogs.reduce(reducer, {});
};

const mostBlogs = (blogs) => {
  const reducer = (most, item) => {
    const i = most.findIndex((i) => i.author === item.author);
    (i !== -1) ? most[i].blogs += 1 : most.push({ author: item.author, blogs: 1 });
    return most;
  };

  const finalReducer = (most, item) => {
    return most.blogs > item.blogs ? most : item;
  };

  const most = blogs.reduce(reducer, []);
  return most.reduce(finalReducer, {});
};

const mostLikes = (blogs) => {
  const reducer = (most, item) => {
    const i = most.findIndex((i) => i.author === item.author);
    (i !== -1) ? most[i].likes += item.likes : most.push({ author: item.author, likes: item.likes });
    return most;
  };

  const finalReducer = (most, item) => {
    return most.likes > item.likes ? most : item;
  };

  const most = blogs.reduce(reducer, []);
  return most.reduce(finalReducer, {});
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
