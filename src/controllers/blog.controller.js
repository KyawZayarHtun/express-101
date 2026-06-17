const blogService = require('../services/blog.service');


const getBlogs = (req, res) => {
  let allBlogs = blogService.getAllBlogs();
  res.send(allBlogs);
}

const getBlogById = (req, res) => {
  let id = req.params.id;
  let blog = blogService.getBlogById(id);
  res.send(blog);
}

const getDefaultBlog = (req, res) => {
  let id = req.params.id;
  res.send("this is default blog");
}

module.exports = {
  getBlogs,
  getBlogById,
  getDefaultBlog,
}