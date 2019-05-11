//  this is a soft-server, also a piece of middleware. Its written very similar to server. A router is how you create a component.
const express = require('express');

const Posts = require('./db.js');

const router = express.Router();

router.use(express.json());
// router.use(cors())

//Endpoints
// By time we get here  the url already has /api/db because its in server.use in server.js.
router.get('/', async (req, res) => {
    try { // try is like "if"
      const posts = await Posts.find(req.query); // if you know this will never fail, get rid of the try. This is passing the Posts.find function in db.
      res.status(200).json(posts);
    } catch (error) { // catch is like else
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the posts',
      });
    }
  });
  
router.get('/:id', async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'The post with the specified ID does not exist.' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'The post information could not be retrieved.',
    });
  }
});

router.post('/', async (req, res) => {
    if(req.body.title && req.body.contents){
        try {
            const post = await Posts.insert(req.body);
            res.status(201).json(post);
          } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error while saving the post to the database.',
            });
          }
    } else {
        res.status(400).json({
            errorMessage: "Please provide title and content for the post"
        })
    }
});

router.delete('/:id', async (req, res) => {
  try {
    const count = await Posts.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: 'The post has been destroyed to oblivion' });
    } else {
      res.status(404).json({ message: 'The post with the specified ID does not exist.' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'The post could not be removed',
    });
  }
});

router.put('/:id', async (req, res) => {

    if(req.body.title && req.body.contents){
        try {
            const post = await Posts.update(req.params.id, req.body);
            if (post) {
              res.status(200).json(post);
            } else {
              res.status(404).json({ message: 'The post with the specified ID does not exist.' });
            }
          } catch (error) {
            console.log(error);
            res.status(500).json({
              message: 'The post information could not be modified.',
            });
          }
    } else {
        res.status(400).json({
            errorMessage: "Please provide title and content for the post"
        })
    }



//   try {
//     const post = await Posts.update(req.params.id, req.body);
//     if (post) {
//       res.status(200).json(post);
//     } else {
//       res.status(404).json({ message: 'The post with the specified ID does not exist.' });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: 'The post information could not be modified.',
//     });
//   }
});

module.exports = router;
