import { render, screen } from '@testing-library/react';
import Blog from './Blog';
import userEvent from '@testing-library/user-event';

test('renders blog', () => {
  const blog = {
    title: 'test title',
    author: 'test author',
  };

  const { container } = render(
    <Blog blog={blog} />
  );
  const div = container.querySelector('.blog-test');
  expect(div).toHaveTextContent('test title by test author');
});

test('renders blog with toggable content', async () => {
  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'test url',
    likes: 0,
  };

  const { container } = render(
    <Blog blog={blog} />
  );

  const user = userEvent.setup();
  const button = screen.getByText('view');
  await user.click(button);

  const div = container.querySelector('.togglableContent');
  expect(div).not.toHaveStyle('display: none');
  expect(div).toHaveTextContent('URL: test url');
  expect(div).toHaveTextContent('Likes: 0');
});