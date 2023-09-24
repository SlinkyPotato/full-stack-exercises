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

describe('most blogs', () => {
  test('of empty list is empty object', () => {
    const result = listHelper.mostBlogs([]);
    expect(result).toEqual({});
  });

  test('when list has only one blog equals the author of that', () => {
    const listWithOneBlog = [
      {
        title: 'A cool blog Post',
        author: 'Author name',
        url: 'http://brianpatino.dev',
        likes: 1,
        __v: 0,
        _id: '650de774452e0ae77271b141',
      },
    ];

    const result = listHelper.mostBlogs(listWithOneBlog);
    expect(result).toEqual({
      author: 'Author name',
      blogs: 1
    });
  });

  test('of a bigger list is calculated right', () => {
    const blogs = [
      {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      },
      {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
      },
      {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0
      },
      {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0
      },
      {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0
      },
    ];

    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    });
  });
});

describe('most likes', () => {

  test('of empty list is empty object', () => {
    const result = listHelper.mostLikes([]);
    expect(result).toEqual({});
  });

  test('when list has only one blog equals the author of that', () => {
    const listWithOneBlog = [
      {
        title: 'A cool blog Post',
        author: 'Author name',
        url: 'http://brianpatino.dev',
        likes: 1,
        __v: 0,
        _id: '650de774452e0ae77271b141',
      },
    ];

    const result = listHelper.mostLikes(listWithOneBlog);
    expect(result).toEqual({
      author: 'Author name',
      likes: 1,
    });
  });

  test('of a bigger list is calculated right', () => {
    const blogs = [
      {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      },
      {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
      },
      {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0
      },
      {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0
      },
      {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0
      },
    ];

    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    });
  });
});
