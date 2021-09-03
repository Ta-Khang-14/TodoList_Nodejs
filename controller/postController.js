const user = require("../models/user");
const post = require("../models/post");

class PostController {
    //@route [GET] /api/me/posts/
    //@desc get posts
    //@access private
    async getPosts(req, res, next) {
        try {
            let postsFound = await post.find({ user: req.userId });
            if (postsFound) {
                res.json({
                    success: true,
                    message: "Get posts successfully",
                    posts: postsFound,
                });
            } else {
                return res.status(403).json({
                    success: false,
                    message: "Posts not found or user not authorised!",
                });
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "Connect falure!",
            });
        }
    }
    //@route [GET] /api/me/posts/:id
    //@desc get post
    //@access private
    async getPost(req, res, next) {
        try {
            let condition = {
                _id: req.params.id,
                user: req.userId,
            };
            let postFound = await post.findOne(condition);
            if (postFound) {
                res.json({
                    success: true,
                    message: "Get post successfully",
                    post: postFound,
                });
            } else {
                return res.status(403).json({
                    success: false,
                    message: "Post not found or user not authorised!",
                });
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "Connect falure!",
            });
        }
    }
    //@route [POST] /api/me/posts/
    //@desc create post
    //@access private
    async createPosts(req, res, next) {
        try {
            let newPost = new post({
                ...req.body,
                user: req.userId,
            });
            await newPost.save();
            res.json({
                success: true,
                message: "Created new post!",
                post: newPost,
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "Connect falure!",
            });
        }
    }
    //@route [PUT] /api/me/posts/:id
    //@desc update post
    //@access private
    async updatePosts(req, res, next) {
        try {
            let condition = {
                _id: req.params.id,
                user: req.userId,
            };
            let updatePost = {
                ...req.body,
                user: req.userId,
            };
            let updatedPost = await post.findOneAndUpdate(
                condition,
                updatePost,
                { new: true }
            );
            if (updatedPost) {
                res.json({
                    success: true,
                    message: "Updated post successfully!",
                    post: updatedPost,
                });
            } else {
                return res.status(403).json({
                    success: true,
                    message: "Post not found or user not authorised!",
                });
            }
        } catch (err) {
            console.log(err);

            return res.status(500).json({
                success: false,
                message: "Connect falure!",
            });
        }
    }
    //@route [DELETE] /api/me/posts/:id
    //@desc delete post
    //@access private
    async deletePost(req, res, next) {
        try {
            let condition = {
                _id: req.params.id,
                user: req.userId,
            };
            let deletedPost = await post.findByIdAndDelete(condition);

            if (deletedPost) {
                res.json({
                    success: true,
                    message: "Deleted post successfully!",
                    post: deletedPost,
                });
            } else {
                res.status(403).json({
                    success: false,
                    message: "Post not found or user not authorised!",
                });
            }
        } catch (err) {
            console.log(err);

            return res.status(500).json({
                success: false,
                message: "Connect falure!",
            });
        }
    }
}

module.exports = new PostController();
