const express = require("express");
const router = express.Router();
const postController = require("../../controller/postController");
const verifyToken = require("../../middleware/verifyToken");

router.delete("/:id", verifyToken, postController.deletePost);
router.put("/:id", verifyToken, postController.updatePosts);
router.get("/:id", verifyToken, postController.getPost);
router.get("/", verifyToken, postController.getPosts);
router.post("/", verifyToken, postController.createPosts);

module.exports = router;
