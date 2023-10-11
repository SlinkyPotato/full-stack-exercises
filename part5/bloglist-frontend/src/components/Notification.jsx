const Notification = ({ success, error }) => {
  if (success === null && error === null) {
    return null;
  }

  if (success !== null) {
    const style = {
      color: 'green',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      backgroundColor: 'lightgrey',
    };
  
    return <div style={style}>{success}</div>;
  }

  if (error !== null) {
    const style = {
      color: 'red',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      backgroundColor: 'lightgrey',
    };
  
    return <div style={style}>{error}</div>;
  }

  return null;
};

export default Notification;
