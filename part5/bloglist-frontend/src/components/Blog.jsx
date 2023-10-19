import Toggable from './Toggable';
import blogService from '../services/blogs';

const Blog = ({ blog, setUser, updateBlog, removeBlog }) => {
  
  const handleLike = async (event) => {
    event.preventDefault();
    try {
      const responseData = await blogService.updateLikesForBlog(blog, blog.user, setUser);
      if (!responseData) {
        console.error('error updating likes');
        return;
      }
      blog.likes = responseData.likes;
      updateBlog(blog);
    } catch (e) {
      console.error(e);
    }
  };

  const handleRemove = async (event) => {
    event.preventDefault();

    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      return;
    }

    try {
      await blogService.deleteBlog(blog, setUser);
      removeBlog(blog);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      {blog.title} by {blog.author} <br />
      <Toggable buttonLabel='view'>
        <div style={{border: '2px solid black'}}>
          URL: {blog.url} <br />
          Likes: {blog.likes} <button onClick={handleLike}>like</button> <br />
          Author: {blog.user.name} <br />
        </div>
        <button onClick={handleRemove}>remove</button>
      </Toggable>
    </div>
  );
}

export default Blog