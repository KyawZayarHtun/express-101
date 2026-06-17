const express = require('express');
const router = express.Router();

const blogController = require('../controllers/blog.controller');
const {
  blogControllerMiddleware,
  blogRouterMiddleware,
  blogControllerMiddleware2,
  blogRouterMiddleware2
} = require("../middlewares/blog.middleware");

router.use([blogRouterMiddleware, blogRouterMiddleware2]);

router.get("/", blogController.getBlogs);
router.get("/:id", [blogControllerMiddleware, blogControllerMiddleware2], blogController.getBlogById);
router.get("/:id", blogController.getDefaultBlog);


module.exports = router;
