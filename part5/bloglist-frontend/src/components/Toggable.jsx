import { useState } from 'react';
import PropTypes from 'prop-types';

const Toggable = (props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setVisible(true)}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={() => setVisible(false)}>cancel</button>
      </div>
    </div>
  );
};

Toggable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
};

export default Toggable;
