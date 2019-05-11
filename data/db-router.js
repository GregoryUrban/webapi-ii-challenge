//  this is a soft-server, also a piece of middleware. Its written very similar to server. A router is how you create a component.
const express = require('express');

const Db = require('./db.js');

const router = express.Router();

router.use(express.json());

//Enpoints
// By time we get here  the url already has /api/db because its in server.use in server.js. No url should need /api/db
router.get('/', async (req, res) => {
    try { // try is like "if"
      const db = await Db.find(req.query); // if you know this will never fail, get rid of the try. This is passing the Db.find function in db.
      res.status(200).json(db);
    } catch (error) { // catch is like else
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the db',
      });
    }
  });
  
router.get('/:id', async (req, res) => {
  try {
    const post = await Db.findById(req.params.id);

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'post not found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the post',
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const post = await Db.insert(req.body);
    res.status(201).json(post);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error inserting the post',
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const count = await Db.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: 'The post has been destroyed to oblivion' });
    } else {
      res.status(404).json({ message: 'The post could not be found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error removing the post',
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const post = await Db.update(req.params.id, req.body);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'The post could not be found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error updating the post',
    });
  }
});


// add an endpoint that returns all the messages for a Post
// this is a subroute
router.get('/:id/messages', async (req,res) => {
const { id } = req.params;

try {
    const messages = await
    Db.findPostMessages(req.params.id);
    res.status(200).json(messages);
    // if (messages.length) {
    //     res.json(messages);
    // } else {
    //     res.status(401).json({err: 'no messages for this post'})
    // }
} catch (err) {
  console.log(err);
    res.status(500).json({ message: 'Error getting .put messages for that post', err });
}
})
// add an endpoint for ing new message to a post
router.post('/:id/messages', async (req,res) => {
    const messageInfo = { ...req.body, post_id: req.params.id };
       
    try {
        const saved = await
        Db.Message(messageInfo);
        res.status(210).json(saved);
      } catch (err) {
          console.log(err);
          res.status(500).json({ message: 'Error getting .post messages for the post', err });
    }
    })


module.exports = router;
