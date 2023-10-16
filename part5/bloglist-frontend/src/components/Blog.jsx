import Toggable from './Toggable'

const Blog = ({ blog }) => (
  <div>
    {blog.title} by {blog.author} <br />
    <Toggable buttonLabel='view'>
      <div style={{border: '2px solid black'}}>
        URL: {blog.url} <br />
        Likes: {blog.likes} <br />
        Author: {blog.user.name} <br />
      </div>
    </Toggable>
  </div>
)

export default Blog