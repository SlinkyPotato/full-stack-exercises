import loginService from '../services/login';
import blogService from '../services/blogs';

const handleLogin = async (
  event,
  username,
  password,
  setUser,
  setUsername,
  setPassword,
  setErrorMessage,
  setSuccessMessage,
) => {
  event.preventDefault();
  try {
    const user = await loginService.login({
      username, password,
    });
    window.localStorage.setItem(
      'loggedUser', JSON.stringify(user)
    );
    blogService.setToken(user.token);
    setUser(user);
    setUsername('');
    setPassword('');
    setSuccessMessage('login successful');
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  } catch (exception) {
    console.log(exception);
    setErrorMessage(exception.response.data.error);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  }
};

const LoginForm = ({
  username,
  password,
  setUsername,
  setPassword,
  setUser,
  setErrorMessage,
  setSuccessMessage,
}) => {
  return (
    <form onSubmit={(event) => {
      handleLogin(event, username, password, setUser, setUsername, setPassword, setErrorMessage, setSuccessMessage);
    }}>
      <div>
        username&nbsp;
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password&nbsp;
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;