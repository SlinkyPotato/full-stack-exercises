import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import CreateBlogForm from './components/CreateBlogForm';
import Notification from './components/Notification';
import Toggable from './components/Toggable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(blogs);
    });

    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON && loggedUserJSON !== '' && loggedUserJSON !== 'null') {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }

  }, []);

  const handleBlogForm = async (event) => {
    event.preventDefault();
    const blogObject = {
      title: title,
      author: author,
      url: url,
    };
    const returnedBlog = await blogService.create(blogObject, setUser);
    if (!returnedBlog) {
      setErrorMessage('error creating blog');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } else {
      setSuccessMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
      setBlogs(blogs.concat(returnedBlog));
      setTitle('');
      setAuthor('');
      setUrl('');
    }
  };

  const updateBlog = async (blog) => {
    setBlogs(blogs.map(b => b.id === blog.id ? blog : b));
  };

  const removeBlog = async (blog) => {
    setBlogs(blogs.filter(b => b.id !== blog.id));
  };

  return (
    <>
      <Notification success={successMessage} error={errorMessage}/>

      {!user &&
      <>
        <h2>Login</h2>
        <LoginForm
          username={username}
          password={password}
          setUser={setUser}
          setUsername={setUsername}
          setPassword={setPassword}
          setErrorMessage={setErrorMessage}
          setSuccessMessage={setSuccessMessage}
        />
      </>
      }

      {user &&
        <>
          <h2>blogs</h2>
          <p>{user.name} logged in</p>
          <button onClick={() => {
            window.localStorage.removeItem('loggedUser');
            setUser(null);
          }}>logout</button>
          <Toggable buttonLabel='new blog'>
            <h2>create new</h2>
            <CreateBlogForm
              handleBlogForm={handleBlogForm}
              setTitle={setTitle}
              setAuthor={setAuthor}
              setUrl={setUrl}
              title={title}
              author={author}
              url={url}
            />
          </Toggable>
          <div>
            <br />
            {blogs.map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                setUser={setUser}
                updateBlog={updateBlog}
                removeBlog={removeBlog}
              />
            )}
          </div>
        </>
      }
    </>
  );
};

export default App;