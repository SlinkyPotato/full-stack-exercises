const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes', () => {
  const emptyList = [];

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(emptyList);
    expect(result).toBe(0);
  });

  test('when list has only one blog equals the likes of that', () => {
    const listWithOneBlog = [
      {
        title: 'A cool blog Post',
        author: 'Author name',
        url: 'http://brianpatino.dev',
        likes: 1,
        __v: 0,
        _id: '650de774452e0ae77271b141',
      }
    ];

    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(1);
  });

  test('of a bigger list is calculated right', () => {
    const listWithOneBlog = [
      {
        title: 'A cool blog Post',
        author: 'Author name',
        url: 'http://brianpatino.dev',
        likes: 1,
        __v: 0,
        _id: '650de774452e0ae77271b141',
      },
      {
        title: 'A cool blog Post2',
        author: 'Author name',
        url: 'http://brianpatino.dev',
        likes: 5,
        __v: 0,
        _id: '65107b30dab24d6146b31342',
      },
      {
        title: 'A cool blog Post3',
        author: 'Author name',
        url: 'http://brianpatino.dev',
        likes: 3,
        __v: 0,
        _id: '65107b33dab24d6146b31344',
      },
      {
        title: 'A cool blog Post4',
        author: 'Author name',
        url: 'http://brianpatino.dev',
        likes: 18,
        __v: 0,
        _id: '65107b36dab24d6146b31346',
      },
    ];

    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(27);
  });
});

describe('favorite blog', () => {

  test('of empty list is empty object', () => {
    const result = listHelper.favoriteBlog([]);
    expect(result).toEqual({});
  });

  test('when list has only one blog equals the blog', () => {
    const listWithOneBlog = [
      {
        title: 'A cool blog Post',
        author: 'Author name',
        url: 'http://brianpatino.dev',
        likes: 1,
        __v: 0,
        _id: '650de774452e0ae77271b141',
      }
    ];

    const result = listHelper.favoriteBlog(listWithOneBlog);
    expect(result).toEqual(listWithOneBlog[0]);
  });

  test('of a bigger list is calculated right', () => {
    const listWithOneBlog = [
      {
        title: 'A cool blog Post',
        author: 'Author name',
        url: 'http://brianpatino.dev',
        likes: 1,
        __v: 0,
        _id: '650de774452e0ae77271b141',
      },
      {
        title: 'A cool blog Post2',
        author: 'Author name',
        url: 'http://brianpatino.dev',
        likes: 5,
        __v: 0,
        _id: '65107b30dab24d6146b31342',
      },
      {
        title: 'A cool blog Post3',
        author: 'Author name',
        url: 'http://brianpatino.dev',
        likes: 3,
        __v: 0,
        _id: '65107b33dab24d6146b31344',
      },
      {
        title: 'A cool blog Post4',
        author: 'Author name',
        url: 'http://brianpatino.dev',
        likes: 18,
        __v: 0,
        _id: '65107b36dab24d6146b31346',
      },
    ];
    const result = listHelper.favoriteBlog(listWithOneBlog);
    expect(result).toEqual(listWithOneBlog[3]);
  });
});