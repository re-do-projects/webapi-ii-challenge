const express = require('express');

const db = require('../data/db.js');

const router = express.Router();

//GET
router.get('/', async (req, res) => {
    try {
        const posts = await db.find(req.query);
        res.status(200).json(posts);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Error retrieving the posts'});
    }
});

//GET by ID
router.get('/:id', async (req, res) => {
    try {
        const post = await db.findById(req.params.id);
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({message:"The post with the specified ID does not exist."});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"The post information could not be retrieved."});
    }
});


//DELETE
router.delete('/:id', async (req, res) => {
    try{
        const counter = await db.remove(req.params.id);
        if (counter > 0) {
            res.status(200).json({message: "post has been deleted"});
        } else {
            res.status(404).json({message: 'could not find post'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "error deleting this post"});
    }
});

//POST
router.post('/', async (req, res) => {
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({message: "Please provide title and contents for the post."});
    } else {
        try {
            let newPost = {
                title: req.body.title,
                contents: req.body.contents
            };
            let createdPostId = await db.insert(newPost);
            let createdPost = await db.findById(createdPostId.id)
            res.status(201).json(createdPost);
        } catch (error) {
            console.log(error)
            res.status(500).json({message:"could not be saved to the database"});
        }
    }


});

//PUT
router.put('/:id', async (req, res) => {
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({message: "Please provide title and contents for the post."});
    } else {
        // res.status(201).json(post);
    }
    try {
        const post = await db.update(req.params.id, req.body);
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({message:"The post with the specified ID does not exist."})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"The post information could not be modified." })
    }
})


module.exports = router;