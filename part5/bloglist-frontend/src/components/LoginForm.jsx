const loginService = require('../services/login');
const blogService = require('../services/blogs');

const handleLogin = async (event) => {
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
  } catch (exception) {
    console.log(exception);
  }
};

const LoginForm = ({ handleLogin, username, password, setUsername, setPassword }) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
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