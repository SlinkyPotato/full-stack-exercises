import { render, screen } from '@testing-library/react';
import Blog from './Blog';

test('renders blog', () => {
  const blog = {
    title: 'test title',
    author: 'test author',
  };

  const { container} = render(<Blog blog={blog} />);
  const div = container.querySelector('.blog-test');
  expect(div).toHaveTextContent('test title by test author');
});
