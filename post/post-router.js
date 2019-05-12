const Posts = require("../data/db");

const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Posts.find(req.params);
    res.status(200).json(posts);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "The posts information could not be retrieved"
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (post) {
      res.status(200).json(post);
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "The posts information could not be retrieved"
    });
  }
});

router.post("/", async (req, res) => {
  const { title, contents } = req.body;

  if (!title || !contents) {
    res
      .status(404)
      .json({ error: "Please provide title and contents for the post." });
  }

  try {
    const addPost = await Posts.insert(req.body);
    res.status(201).json(addPost);
  } catch (error) {
    res.status(500).json({
      error: "There was an error while saving the post to the database"
    });
  }
});

router.put("/:id", async (req, res) => {
  const { title, contents } = req.body;

  if (!title || !contents) {
    res
      .status(404)
      .json({ error: "Please provide title and contents for the post." });
  }
  try {
    const updatedPost = await Posts.update(req.params.id, req.body);
    if (updatedPost) {
      res.status(200).json(updatedPost);
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({
      error: "The post information could not be modified."
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletePost = await Posts.remove(req.params.id);
    if (deletePost > 0) {
      res.status(200).json(deletePost);
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({
      error: "The post could not be removed"
    });
  }
});

module.exports = router;
