import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Togglable from './Toggable';

describe('Toggle tests', () => {
  test('5.14', async () => {
    const { container } = render(
      <Togglable buttonLabel='view'>
        <div className='testDiv'>
          toggable content
        </div>
      </Togglable>
    );

    const user = userEvent.setup();
    const button = screen.getByText('view');
    await user.click(button);

    const div = container.querySelector('.togglableContent');
    expect(div).not.toHaveStyle('display: none');
  });
});
