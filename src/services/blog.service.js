const blogController = require("./blog.service");

exports.getAllBlogs = () => {
  return "All Blogs";
}

exports.getBlogById = (id) => {
  return 'Blog ' + id;
}