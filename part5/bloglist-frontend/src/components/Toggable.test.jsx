import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Togglable from './Togglable';

describe('<Togglable />', () => {
  let container;

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="view">
        <div className="togglableContent" >
          togglable content
        </div>
      </Togglable>
    ).container;
  });
});